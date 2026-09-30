import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { transcriptionReport, extendByPedal } from '../js/eval/metrics.js';
import { viterbiBackwardSparse, resolveOverlapping } from '../js/analysis/transkun.js';

const fx = JSON.parse(fs.readFileSync(new URL('./fixtures/metric_cases.json', import.meta.url)));

test('채점: 파이썬 mir_eval 과 같은 정밀도/재현율/F1 (onset, onset+offset)', () => {
  for (const c of fx.cases) {
    const r = transcriptionReport(c.ref, c.est);
    for (const key of ['onset', 'onsetOffset']) {
      const [p, rc, f] = c.expected[key];
      assert.ok(Math.abs(r[key].precision - p) < 1e-12, `${c.name} ${key} precision ${r[key].precision} vs ${p}`);
      assert.ok(Math.abs(r[key].recall - rc) < 1e-12, `${c.name} ${key} recall`);
      assert.ok(Math.abs(r[key].f1 - f) < 1e-12, `${c.name} ${key} f1`);
    }
  }
});

test('페달 연장: Transkun extendPedal 과 같은 결과', () => {
  for (const c of fx.pedalCases) {
    const got = extendByPedal(c.notes, c.pedals).map(({ start, end, pitch }) => ({ start, end, pitch }));
    assert.equal(got.length, c.expected.length);
    got.forEach((n, i) => {
      const e = c.expected[i];
      assert.equal(n.pitch, e.pitch);
      assert.ok(Math.abs(n.start - e.start) < 1e-9 && Math.abs(n.end - e.end) < 1e-9, JSON.stringify([n, e]));
    });
  }
});

/** 원본(조밀한 점수 행렬) viterbiBackward 를 그대로 옮긴 기준 구현 */
function viterbiDense(S, forcedStart) {
  const T = S.length;
  const q = new Float64Array(T);
  const ptr = new Int32Array(T);
  q[T - 1] = S[T - 1][T - 1] > 0 ? S[T - 1][T - 1] : 0;
  for (let p = T - 2; p >= 0; p--) {
    let best = q[p + 1];
    let sel = -1;
    for (let e = p + 1; e < T; e++) {
      const v = q[e] + S[e][p];
      if (v > best) {
        best = v;
        sel = e;
      }
    }
    ptr[p] = sel;
    q[p] = best + (S[p][p] > 0 ? S[p][p] : 0);
  }
  const path = [];
  let j = forcedStart;
  while (j < T - 1) {
    if (S[j][j] > 0) path.push([j, j]);
    if (ptr[j] < 0) j++;
    else {
      path.push([j, ptr[j]]);
      j = ptr[j];
    }
  }
  if (S[T - 1][T - 1] > 0) path.push([T - 1, T - 1]);
  return path;
}

test('희소 비터비: 양수 구간만으로 조밀한 원본 비터비와 같은 경로를 낸다', () => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let trial = 0; trial < 200; trial++) {
    const T = 5 + Math.floor(rnd() * 40);
    const S = Array.from({ length: T }, () => new Float64Array(T));
    for (let e = 0; e < T; e++) for (let b = 0; b <= e; b++) S[e][b] = rnd() < 0.08 ? rnd() * 5 : -rnd() * 5;
    const diag = new Float64Array(T);
    const ivs = [];
    for (let e = 0; e < T; e++) {
      if (S[e][e] > 0) diag[e] = S[e][e];
      for (let b = 0; b < e; b++) if (S[e][b] > 0) ivs.push({ begin: b, end: e, score: S[e][b] });
    }
    const fs = Math.floor(rnd() * 3);
    assert.deepEqual(viterbiBackwardSparse(T, diag, ivs, fs), viterbiDense(S, fs), `trial ${trial}`);
  }
});

test('겹침 정리: 같은 음이 겹치면 앞 음을 끊고 길이 0 음은 버린다', () => {
  const out = resolveOverlapping([
    { start: 0, end: 2, pitch: 60 },
    { start: 1, end: 3, pitch: 60 },
    { start: 1, end: 1, pitch: 62 },
    { start: 0.5, end: 1, pitch: 64 },
  ]);
  assert.deepEqual(out.map((n) => [n.start, n.end, n.pitch]), [[0, 1, 60], [0.5, 1, 64], [1, 3, 60]]);
});
