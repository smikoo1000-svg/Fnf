// 내장 DSP 엔진: CQT → NMF 활성도 → 노트 트래킹.
// 학습 모델 없이 동작하는 폴백/빠른 모드다.

import { VariableQ, estimateTuning, NUM_NOTES, NOTE_MIN, HOP } from './cqt.js';
import { buildDictionary, factorize } from './nmf.js';
import { pruneHarmonicGhosts } from './note-filters.js';

// 반-상승 시점 기반 온셋 추정의 잔여 지연(합성 피아노 실측 ≈ 15ms)
const ONSET_BIAS_SEC = 0.015;
// 재타건 판정 기준: 골 깊이(피크 대비), 골 대비 상승률, 피크 대비 상승폭
const REATTACK = { valley: 0.88, ratio: 1.2, rise: 0.25 };

/**
 * @typedef {{start:number,end:number,midi:number,velocity:number}} NoteEvent  (초 단위)
 */

/** 활성도 행렬 → 노트 목록 */
export function trackNotes(act, nFrames, hopSec, vq, { sensitivity = 0.5, minNoteSec = 0.07, reattack = REATTACK } = {}) {
  const K = NUM_NOTES;
  const P = new Float32Array(nFrames);
  for (let t = 0; t < nFrames; t++) {
    let m = 0;
    for (let k = 0; k < K; k++) m = Math.max(m, act[t * K + k]);
    P[t] = m;
  }
  const sortedP = Float32Array.from(P).sort();
  const globalRef = Math.max(sortedP[Math.floor(nFrames * 0.95)] || 0, 1e-6);

  // 국소 최대(±1.5초) 기반 기준선
  const half = Math.round(1.5 / hopSec);
  const ref = new Float32Array(nFrames);
  for (let t = 0; t < nFrames; t++) {
    let m = 0;
    const a = Math.max(0, t - half);
    const b = Math.min(nFrames - 1, t + half);
    for (let i = a; i <= b; i += 2) m = Math.max(m, P[i]);
    ref[t] = Math.max(m, 0.2 * globalRef);
  }
  const relThr = 0.34 - 0.28 * Math.min(1, Math.max(0, sensitivity)); // 민감도 0→0.34, 1→0.06
  const minFrames = Math.max(2, Math.round(minNoteSec / hopSec));
  const maxGap = 2;

  /** @type {{k:number,a:number,b:number}[]} */
  const runs = [];
  for (let k = 0; k < K; k++) {
    let on = false;
    let a = 0;
    let gap = 0;
    for (let t = 0; t < nFrames; t++) {
      const v = act[t * K + k];
      const thr = relThr * ref[t];
      const active = on ? v >= 0.6 * thr : v >= thr;
      if (active) {
        if (!on) {
          on = true;
          a = t;
        }
        gap = 0;
      } else if (on) {
        gap++;
        if (gap > maxGap) {
          runs.push({ k, a, b: t - gap });
          on = false;
        }
      }
    }
    if (on) runs.push({ k, a, b: nFrames - 1 - gap });
  }

  // 같은 음의 재타건 분리 + 온셋 정밀화
  /** @type {{k:number,s:number,e:number,peak:number}[]} */
  const segs = [];
  for (const run of runs) {
    const { k, a, b } = run;
    const e = (t) => act[t * K + k];
    let segStart = a;
    let peak = e(a);
    let valley = Infinity;
    let valleyT = -1;
    const cut = (from, to) => {
      if (to - from + 1 >= minFrames) segs.push({ k, s: from, e: to, peak: 0 });
    };
    for (let t = a + 1; t <= b; t++) {
      const v = e(t);
      if (v > peak) {
        peak = v;
        valley = Infinity;
      } else {
        if (v < valley) {
          valley = v;
          valleyT = t;
        }
        // 골에서 뚜렷하게 다시 올라오면 재타건으로 본다 (골이 깊거나, 얕아도 상승폭이 충분할 때)
        const rise = v - valley;
        const isReattack =
          valleyT - segStart >= 3 &&
          v > 0.2 * peak &&
          ((valley < 0.55 * peak && v > valley * 1.8) ||
            (valley < reattack.valley * peak && v > valley * reattack.ratio && rise > reattack.rise * peak));
        if (isReattack) {
          cut(segStart, valleyT - 1);
          segStart = valleyT;
          peak = v;
          valley = Infinity;
        }
      }
    }
    cut(segStart, b);
  }

  /** @type {NoteEvent[]} */
  const raw = [];
  for (const sg of segs) {
    const { k, s, e } = sg;
    const win = Math.max(2, Math.round(vq.windowSec(k) / hopSec / 2));
    let tp = s;
    let pv = act[s * K + k];
    for (let t = s; t <= Math.min(e, s + win); t++) {
      const v = act[t * K + k];
      if (v > pv) {
        pv = v;
        tp = t;
      }
    }
    // 임계치를 넘은 시점(s)보다 앞서 이미 상승이 시작됐으므로, 단조 증가 구간의 시작점까지 되짚어 기준값을 잡는다.
    let t0 = s;
    while (t0 > 0 && s - t0 < win + 2 && act[(t0 - 1) * K + k] <= act[t0 * K + k]) t0--;
    let base = pv;
    for (let t = t0; t <= tp; t++) base = Math.min(base, act[t * K + k]);
    const level = base + 0.5 * (pv - base);
    let ts = tp;
    for (let t = t0; t <= tp; t++) {
      if (act[t * K + k] >= level) {
        ts = t;
        break;
      }
    }
    let peak = 0;
    for (let t = s; t <= e; t++) peak = Math.max(peak, act[t * K + k]);
    // 고음역(E6 이상)은 실제 곡에서 드물고 배음 유령이 잘 생기므로 문턱을 올린다
    const registerPenalty = 1 + Math.max(0, NOTE_MIN + k - 88) / 6;
    if (peak < 0.05 * globalRef * registerPenalty * 2) continue;
    raw.push({ start: Math.max(0, ts * hopSec - ONSET_BIAS_SEC), end: (e + 1) * hopSec, midi: NOTE_MIN + k, velocity: peak });
  }

  // 배음 유령음 제거 (진폭은 이 시점에서 velocity 필드에 들어 있다)
  const notes = pruneHarmonicGhosts(raw, (n) => n.velocity);

  // 진폭 → MIDI 벨로시티
  let gp = 0;
  for (const n of notes) gp = Math.max(gp, n.velocity);
  for (const n of notes) {
    const db = 20 * Math.log10(Math.max(n.velocity / (gp || 1), 1e-4));
    n.velocity = Math.round(Math.min(127, Math.max(25, 105 + 2.2 * db)));
  }
  notes.sort((a, b) => a.start - b.start || a.midi - b.midi);
  return notes;
}

/** 로그 압축 스펙트럼 플럭스로 온셋 강도 곡선 생성 */
export function onsetEnvelopeFromCqt(mag, nFrames) {
  const K = NUM_NOTES;
  const env = new Float32Array(nFrames);
  let ref = 0;
  for (let i = 0; i < mag.length; i++) ref = Math.max(ref, mag[i]);
  const g = 200 / (ref || 1);
  const prev = new Float32Array(K);
  for (let t = 0; t < nFrames; t++) {
    let s = 0;
    for (let k = 0; k < K; k++) {
      const v = Math.log1p(g * mag[t * K + k]);
      const d = v - prev[k];
      if (d > 0) s += d;
      prev[k] = v;
    }
    env[t] = s;
  }
  return env;
}

/**
 * @param {Float32Array} signal 22050Hz 모노
 * @returns {{notes:NoteEvent[], onsetEnv:Float32Array, frameRate:number, tuningCents:number}}
 */
export function transcribeDsp(signal, sampleRate = 22050, { sensitivity = 0.5, minNoteSec = 0.07, onProgress = () => {} } = {}) {
  onProgress(0.02, '튜닝 추정');
  const tuning = estimateTuning(signal, sampleRate);
  const vq = new VariableQ({ sampleRate, a4: tuning.a4 });
  onProgress(0.05, '스펙트럼 분석');
  const { mag, nFrames, hopSec } = vq.compute(signal, { hop: HOP, onProgress: (p) => onProgress(0.05 + 0.4 * p, '스펙트럼 분석') });
  const dict = buildDictionary(vq);
  onProgress(0.45, '음 분리');
  const act = factorize(mag, nFrames, dict, { onProgress: (p) => onProgress(0.45 + 0.45 * p, '음 분리') });
  onProgress(0.92, '노트 추적');
  const notes = trackNotes(act, nFrames, hopSec, vq, { sensitivity, minNoteSec });
  const onsetEnv = onsetEnvelopeFromCqt(mag, nFrames);
  onProgress(1, '완료');
  return { notes, onsetEnv, frameRate: 1 / hopSec, tuningCents: tuning.cents };
}
