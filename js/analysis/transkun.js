// 피아노 전용 엔진: Transkun v2 (Yan & Duan, MIT 라이선스) 를 ONNX Runtime Web 으로 실행한다.
// 신경망(프레임 → 구간 점수, 문맥 벡터)은 ONNX 로 내보냈고, 원본의 파이썬 후처리
// (semi-CRF 비터비 역방향 디코딩, 16초 구간 이어 붙이기, 겹침 정리)는 이 파일에서 그대로 옮겼다.
//   원본: transkun/ModelTransformer.py  TransKun.transcribe / transcribeFrames
//         transkun/CRF/NeuralSemiCRFInterval.py  viterbiBackward
//         transkun/Data.py  resolveOverlapping
// 변환 스크립트: scripts/transkun/export_onnx.py

export const TK_FS = 44100;
const HOP = 1024;
const WIN = 4096;
/** 출력 기호 순서: 서스테인 페달(CC64), 소프트 페달(CC67), 피아노 88건 */
export const TK_SYMBOLS = [-64, -67, ...Array.from({ length: 88 }, (_, i) => 21 + i)];
const N_SYM = TK_SYMBOLS.length;
const CTX_DIM = 256;
/** 앱 기본 페달 구간 보너스 (scripts/eval/tune-pedal.mjs 로 MAESTRO 검증 세트에서 고른 값) */
export const TK_PEDAL_BONUS = 0;

/** transkun/Util.py makeFrame: 앞에 반 창 패딩, hop 간격으로 창 길이만큼 자른다. → [C, nFrame, WIN] */
export function makeFrames(channels, start, length) {
  const nFrame = Math.ceil(length / HOP) + 1;
  const C = channels.length;
  const out = new Float32Array(C * nFrame * WIN);
  for (let c = 0; c < C; c++) {
    const x = channels[c];
    for (let t = 0; t < nFrame; t++) {
      const base = (c * nFrame + t) * WIN;
      const s0 = t * HOP - WIN / 2; // 구간 내 위치
      for (let i = 0; i < WIN; i++) {
        const p = s0 + i;
        if (p >= 0 && p < length) {
          const q = start + p;
          if (q >= 0 && q < x.length) out[base + i] = x[q];
        }
      }
    }
  }
  return { data: out, dims: [C, nFrame, WIN], nFrame };
}

/**
 * 희소 semi-CRF 비터비(역방향). 원본 viterbiBackward 와 같은 결과를 낸다.
 * 스킵 점수가 0이고 q 가 인덱스에 대해 비증가이므로, 점수가 0 이하인 구간은 스킵보다 나을 수 없다.
 * 따라서 양수 점수 구간만으로 정확히 같은 경로가 나온다(동점 시 원본처럼 스킵 → 가장 짧은 구간 순).
 * @param {number} T 프레임 수
 * @param {Float64Array} diag 길이 T, 단일 프레임 구간 점수(양수만, 나머지 0)
 * @param {{begin:number,end:number,score:number}[]} intervals begin<end, score>0
 * @param {number} forcedStart 역추적 시작 위치(이전 구간에서 이어짐)
 * @returns {[number, number][]} (begin, end) 목록
 */
export function viterbiBackwardSparse(T, diag, intervals, forcedStart = 0) {
  const byBegin = new Map();
  for (const iv of intervals) {
    if (!byBegin.has(iv.begin)) byBegin.set(iv.begin, []);
    byBegin.get(iv.begin).push(iv);
  }
  for (const list of byBegin.values()) list.sort((a, b) => a.end - b.end);
  const q = new Float64Array(T);
  const ptr = new Int32Array(T).fill(-1);
  q[T - 1] = diag[T - 1] > 0 ? diag[T - 1] : 0;
  for (let p = T - 2; p >= 0; p--) {
    let best = q[p + 1]; // 스킵
    let sel = -1;
    const list = byBegin.get(p);
    if (list) {
      for (const iv of list) {
        const v = q[iv.end] + iv.score;
        if (v > best) {
          best = v;
          sel = iv.end;
        }
      }
    }
    ptr[p] = sel;
    q[p] = best + (diag[p] > 0 ? diag[p] : 0);
  }
  const path = [];
  let j = forcedStart;
  while (j < T - 1) {
    if (diag[j] > 0) path.push([j, j]);
    if (ptr[j] < 0) j += 1;
    else {
      path.push([j, ptr[j]]);
      j = ptr[j];
    }
  }
  if (diag[T - 1] > 0) path.push([T - 1, T - 1]);
  return path;
}

/** transkun/Data.py resolveOverlapping: 같은 음이 겹치면 앞 음을 뒤 음 시작에서 끊고, 길이 0 인 음은 버린다. */
export function resolveOverlapping(events) {
  const cmp = (a, b) => a.start - b.start || a.end - b.end || a.pitch - b.pitch;
  events.sort(cmp);
  const last = new Map();
  for (const e of events) {
    const prev = last.get(e.pitch);
    if (prev && prev.end > e.start) prev.end = e.start;
    last.set(e.pitch, e);
  }
  return events.filter((e) => e.start < e.end).sort(cmp);
}

/**
 * ONNX 출력(양수 구간 목록) → 기호별 비터비 경로.
 * pedalBonus > 0 이면 서스테인 페달 구간마다 점수를 더해, 짧게 떼었다 다시 밟는 페달(리페달링)을
 * 한 구간으로 합쳐 버리는 경향을 줄인다(원본에 없는 후처리, 0 이면 원본과 같다).
 */
function decodeSegment(posIdx, posVal, T, forcedStartPos, pedalBonus = 0) {
  const diag = Array.from({ length: N_SYM }, () => new Float64Array(T));
  const ivs = Array.from({ length: N_SYM }, () => []);
  const K = posVal.length;
  for (let k = 0; k < K; k++) {
    const end = Number(posIdx[3 * k]);
    const begin = Number(posIdx[3 * k + 1]);
    const sym = Number(posIdx[3 * k + 2]);
    const score = posVal[k] + (sym === 0 ? pedalBonus : 0);
    if (end === begin) diag[sym][end] = score;
    else ivs[sym].push({ begin, end, score });
  }
  return ivs.map((list, s) => viterbiBackwardSparse(T, diag[s], list, forcedStartPos[s]));
}

/**
 * @param {Float32Array[]} channels 44.1kHz, 1~2 채널
 * @param {object} rt { ort, core, attr } — onnxruntime-web 모듈과 두 세션
 * @param {{segmentSec?:number, stepSec?:number, pedalBonus?:number, onProgress?:Function, shouldCancel?:Function}} [opt]
 * @returns {Promise<{notes:{start:number,end:number,pitch:number,velocity:number}[], pedals:{start:number,end:number,pitch:number,velocity:number}[]}>}
 */
export async function transkunTranscribe(channels, rt, { segmentSec = 16, stepSec = 8, pedalBonus = TK_PEDAL_BONUS, onProgress = () => {}, shouldCancel = () => false } = {}) {
  const { ort, core, attr } = rt;
  const len = channels[0].length;
  const padTimeBegin = segmentSec - stepSec;
  const pad = Math.ceil(padTimeBegin * TK_FS);
  const nSample = len + 2 * pad; // 앞뒤로 같은 길이만큼 0 패딩 (원본과 동일)
  const stepSize = Math.ceil((stepSec * TK_FS) / HOP) * HOP;
  const segmentSize = Math.ceil(segmentSec * TK_FS);
  const stepFrames = Math.floor(stepSize / HOP);
  const lastFrameIdx = Math.round(segmentSize / HOP);
  const frameDur = HOP / TK_FS;
  let startPos = new Array(N_SYM).fill(Math.floor((padTimeBegin * TK_FS) / HOP));
  const byType = new Map();
  const nSeg = Math.ceil(nSample / stepSize);

  for (let si = 0, i = 0; i < nSample; si++, i += stepSize) {
    if (shouldCancel()) throw new Error('취소됨');
    onProgress(si / nSeg);
    const beginTime = i / TK_FS - padTimeBegin;
    // 패딩된 신호의 [i, i+segmentSize) = 원 신호의 [i-pad, ...)
    // 원 신호 밖(앞뒤 패딩)은 makeFrames 가 0으로 채운다
    const { data, dims, nFrame } = makeFrames(channels, i - pad, segmentSize);
    const out = await core.run({ frames: new ort.Tensor('float32', data, dims) });
    const T = nFrame;
    const paths = decodeSegment(out.posIdx.data, out.posVal.data, T, startPos, pedalBonus);
    const ctx = out.ctx.data;
    const nIv = paths.reduce((a, p) => a + p.length, 0);

    const lastP = new Array(N_SYM).fill(0);
    const events = [];
    if (nIv > 0) {
      const A = new Float32Array(nIv * CTX_DIM);
      const B = new Float32Array(nIv * CTX_DIM);
      let n = 0;
      paths.forEach((path, s) => {
        for (const [b, e] of path) {
          A.set(ctx.subarray((s * T + b) * CTX_DIM, (s * T + b + 1) * CTX_DIM), n * CTX_DIM);
          B.set(ctx.subarray((s * T + e) * CTX_DIM, (s * T + e + 1) * CTX_DIM), n * CTX_DIM);
          n++;
        }
      });
      const at = await attr.run({
        ctxBegin: new ort.Tensor('float32', A, [nIv, CTX_DIM]),
        ctxEnd: new ort.Tensor('float32', B, [nIv, CTX_DIM]),
      });
      const vel = at.velocity.data;
      const of = at.ofValue.data;
      const pres = at.presence.data;
      n = 0;
      paths.forEach((path, s) => {
        let lastEnd = 0;
        let curLastP = 0;
        for (const [b, e] of path) {
          let start = (b + of[2 * n]) * frameDur;
          let end = (e + of[2 * n + 1]) * frameDur;
          const hasOnset = b > 0 || !!pres[2 * n];
          const hasOffset = e < lastFrameIdx || !!pres[2 * n + 1];
          start = Math.max(start, lastEnd);
          end = Math.max(end, start + 1e-8);
          lastEnd = end;
          events.push({ start, end, pitch: TK_SYMBOLS[s], velocity: Number(vel[n]), hasOnset, hasOffset });
          if (hasOffset) curLastP = e;
          n++;
        }
        lastP[s] = curLastP;
      });
      events.sort((a, b) => a.start - b.start || a.end - b.end || a.pitch - b.pitch);
    }
    startPos = lastP.map((k) => Math.max(k - stepFrames, 0));

    for (const e of events) {
      e.start = Math.max(e.start + beginTime, 0);
      e.end = Math.max(e.end + beginTime, e.start);
      const list = byType.get(e.pitch);
      if (list && list.length) {
        const last = list[list.length - 1];
        if (e.start < last.end) {
          if (e.hasOnset) list[list.length - 1] = e;
          else {
            last.hasOffset = e.hasOffset;
            last.end = Math.max(e.end, last.end);
          }
          continue;
        }
      }
      if (e.hasOnset) {
        if (!list) byType.set(e.pitch, [e]);
        else list.push(e);
      }
    }
  }
  onProgress(1);
  for (const list of byType.values()) if (list.length) list[list.length - 1].hasOffset = true;
  const all = resolveOverlapping([...byType.values()].flat().filter((e) => e.hasOffset));
  const strip = ({ start, end, pitch, velocity }) => ({ start, end, pitch, velocity });
  return { notes: all.filter((e) => e.pitch > 0).map(strip), pedals: all.filter((e) => e.pitch < 0).map(strip) };
}
