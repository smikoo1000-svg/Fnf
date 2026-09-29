// 고정 하모닉 템플릿 사전을 이용한 프레임별 NMF(KL 발산, 곱셈 갱신).
// 각 프레임의 CQT 크기 스펙트럼을 "음 하나(기음+배음 패턴)들의 합 + 잡음 성분"으로 분해한다.
// 배음이 겹치는 화음에서도 옥타브/5도 오검출을 줄이는 것이 핵심이다.

import { NUM_NOTES, NOTE_MIN, midiToFreq } from './cqt.js';

/** Hann 창의 주파수 응답 크기 (x = 주파수 차이 × 창 길이[샘플] / fs) */
function hannResponse(x) {
  const ax = Math.abs(x);
  if (ax < 1e-6) return 1;
  if (Math.abs(ax - 1) < 1e-6) return 0.5;
  return Math.abs(Math.sin(Math.PI * ax) / (Math.PI * ax * (1 - ax * ax)));
}

/** 음색 프로파일: 배음 h의 상대 진폭 (기음 = 1) */
const PROFILES = [
  (h) => 1 / h ** 0.6, // 밝은(일반)
  (h) => (h === 1 ? 1 : 0.9 / h ** 1.6), // 어두운/사인파에 가까운(플루트, 보컬, 저음 피아노)
  (h) => (h === 1 ? 0.7 : h === 2 ? 1 : 0.8 / h ** 0.9), // 2배음이 강한(피아노 저음~중음)
];
const MAX_HARMONIC = 14;
const NUM_NOISE = 2;

/**
 * @param {import('./cqt.js').VariableQ} vq
 */
export function buildDictionary(vq) {
  const nProf = PROFILES.length;
  const nCols = NUM_NOTES * nProf + NUM_NOISE;
  // CSC 희소 표현
  const colStart = new Int32Array(nCols + 1);
  const rows = [];
  const vals = [];
  const colNote = new Int32Array(nCols).fill(-1);
  let col = 0;
  for (let p = 0; p < nProf; p++) {
    for (let j = 0; j < NUM_NOTES; j++) {
      colNote[col] = j;
      colStart[col] = rows.length;
      const f0 = midiToFreq(NOTE_MIN + j, vq.a4);
      const acc = new Float32Array(NUM_NOTES);
      for (let h = 1; h <= MAX_HARMONIC; h++) {
        const fh = f0 * h * Math.sqrt(1 + 0.00015 * h * h);
        if (fh > vq.fs * 0.45) break;
        const amp = PROFILES[p](h);
        // 이 배음이 영향을 주는 bin 범위
        const kc = Math.round(12 * Math.log2(fh / midiToFreq(NOTE_MIN, vq.a4)));
        for (let k = Math.max(0, kc - 2); k <= Math.min(NUM_NOTES - 1, kc + 2); k++) {
          const ker = vq.kernels[k];
          const x = ((fh - ker.f) * ker.nFull) / vq.fs;
          acc[k] += amp * hannResponse(x);
        }
      }
      for (let k = 0; k < NUM_NOTES; k++) {
        if (acc[k] > 0.02) {
          rows.push(k);
          vals.push(acc[k]);
        }
      }
      col++;
    }
  }
  // 잡음 성분: 평탄, 저역 기울기
  for (let n = 0; n < NUM_NOISE; n++) {
    colStart[col] = rows.length;
    for (let k = 0; k < NUM_NOTES; k++) {
      rows.push(k);
      vals.push(n === 0 ? 0.25 : 0.4 * Math.exp(-k / 18));
    }
    col++;
  }
  colStart[nCols] = rows.length;
  const rowsA = Int32Array.from(rows);
  const valsA = Float32Array.from(vals);
  // 열 합계 (분모 항)
  const colSum = new Float32Array(nCols);
  for (let c = 0; c < nCols; c++) {
    let s = 0;
    for (let i = colStart[c]; i < colStart[c + 1]; i++) s += valsA[i];
    colSum[c] = s;
  }
  return { nCols, nProf, colStart, rows: rowsA, vals: valsA, colSum, colNote };
}

/**
 * 프레임 전체에 대해 음별 활성도를 계산한다.
 * @param {Float32Array} mag  nFrames × NUM_NOTES
 * @returns {Float32Array} 활성도 nFrames × NUM_NOTES (기음 진폭 단위)
 */
export function factorize(mag, nFrames, dict, { iterations = 14, sparsity = 0.04, onProgress = null } = {}) {
  const { nCols, nProf, colStart, rows, vals, colSum } = dict;
  const act = new Float32Array(nFrames * NUM_NOTES);
  const x = new Float32Array(nCols);
  const model = new Float32Array(NUM_NOTES);
  const ratio = new Float32Array(NUM_NOTES);
  const v = new Float32Array(NUM_NOTES);
  const EPS = 1e-6;

  // 전체 정규화 기준 (상위 프레임의 최대 진폭)
  const peaks = [];
  for (let t = 0; t < nFrames; t++) {
    let m = 0;
    for (let k = 0; k < NUM_NOTES; k++) m = Math.max(m, mag[t * NUM_NOTES + k]);
    peaks.push(m);
  }
  const sorted = Float32Array.from(peaks).sort();
  const ref = Math.max(sorted[Math.floor(sorted.length * 0.98)] ?? 0, 1e-5);
  const silence = ref * 0.006;

  x.fill(0.1);
  for (let t = 0; t < nFrames; t++) {
    if (peaks[t] < silence) {
      x.fill(0.01);
      continue;
    }
    const scale = 1 / ref;
    for (let k = 0; k < NUM_NOTES; k++) v[k] = mag[t * NUM_NOTES + k] * scale + EPS;
    // 웜스타트: 이전 프레임 결과 + 작은 바닥값
    for (let c = 0; c < nCols; c++) x[c] = Math.max(x[c], 0.02);

    for (let it = 0; it < iterations; it++) {
      model.fill(EPS);
      for (let c = 0; c < nCols; c++) {
        const xc = x[c];
        if (xc < 1e-9) continue;
        for (let i = colStart[c]; i < colStart[c + 1]; i++) model[rows[i]] += vals[i] * xc;
      }
      for (let k = 0; k < NUM_NOTES; k++) ratio[k] = v[k] / model[k];
      for (let c = 0; c < nCols; c++) {
        let num = 0;
        for (let i = colStart[c]; i < colStart[c + 1]; i++) num += vals[i] * ratio[rows[i]];
        x[c] *= num / (colSum[c] + sparsity);
      }
    }
    for (let j = 0; j < NUM_NOTES; j++) {
      let s = 0;
      for (let p = 0; p < nProf; p++) s += x[p * NUM_NOTES + j];
      act[t * NUM_NOTES + j] = s * ref;
    }
    if (onProgress && (t & 127) === 0) onProgress(t / nFrames);
  }
  return act;
}
