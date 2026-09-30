// mir_eval.transcription 호환 음 단위 채점 (onset / onset+offset).
// 규칙은 mir_eval 0.8 과 같다:
//  - onset: |ref_on - est_on| <= onsetTolerance(50ms), 음높이 차 <= 50센트
//  - offset: |ref_off - est_off| <= max(offsetRatio × 정답 음길이, offsetMinTolerance(50ms))
//  - 거리는 소수 7자리로 반올림한 뒤 비교
//  - 짝짓기는 최대 이분 매칭(Hopcroft–Karp)
// tests/metrics.test.js 에서 파이썬 mir_eval 결과와 교차 검증한다.

import { resolveOverlapping } from '../analysis/transkun.js';

const N_DECIMALS = 7;
const round7 = (x) => Math.round(x * 10 ** N_DECIMALS) / 10 ** N_DECIMALS;
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

/** Hopcroft–Karp 최대 이분 매칭. adj[i] = i번째 정답과 짝지을 수 있는 추정 인덱스 목록 */
function maxMatching(nLeft, nRight, adj) {
  const matchL = new Int32Array(nLeft).fill(-1);
  const matchR = new Int32Array(nRight).fill(-1);
  const dist = new Int32Array(nLeft);
  const INF = 1 << 30;
  const bfs = () => {
    const queue = [];
    let found = false;
    for (let u = 0; u < nLeft; u++) {
      if (matchL[u] < 0) {
        dist[u] = 0;
        queue.push(u);
      } else dist[u] = INF;
    }
    for (let h = 0; h < queue.length; h++) {
      const u = queue[h];
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w < 0) found = true;
        else if (dist[w] === INF) {
          dist[w] = dist[u] + 1;
          queue.push(w);
        }
      }
    }
    return found;
  };
  const dfs = (u) => {
    for (const v of adj[u]) {
      const w = matchR[v];
      if (w < 0 || (dist[w] === dist[u] + 1 && dfs(w))) {
        matchL[u] = v;
        matchR[v] = u;
        return true;
      }
    }
    dist[u] = INF;
    return false;
  };
  let count = 0;
  while (bfs()) for (let u = 0; u < nLeft; u++) if (matchL[u] < 0 && dfs(u)) count++;
  return { count, matchL };
}

/**
 * @param {{start:number,end:number,pitch:number}[]} ref  정답 (pitch 는 MIDI 번호)
 * @param {{start:number,end:number,pitch:number}[]} est  추정
 * @param {{onsetTolerance?:number, pitchTolerance?:number, offsetRatio?:number|null, offsetMinTolerance?:number}} [opt]
 *   offsetRatio=null 이면 onset 만 채점
 */
export function noteScores(ref, est, { onsetTolerance = 0.05, pitchTolerance = 50, offsetRatio = 0.2, offsetMinTolerance = 0.05 } = {}) {
  const order = est.map((_, i) => i).sort((a, b) => est[a].start - est[b].start);
  const starts = order.map((i) => est[i].start);
  const lowerBound = (x) => {
    let lo = 0;
    let hi = starts.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (starts[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const adj = ref.map((r) => {
    const out = [];
    const rHz = hz(r.pitch);
    for (let k = lowerBound(r.start - onsetTolerance - 1e-6); k < order.length && starts[k] <= r.start + onsetTolerance + 1e-6; k++) {
      const e = est[order[k]];
      if (round7(Math.abs(r.start - e.start)) > onsetTolerance) continue;
      if (1200 * Math.abs(Math.log2(hz(e.pitch) / rHz)) > pitchTolerance) continue; // mir_eval 도 음높이는 반올림하지 않음
      if (offsetRatio != null) {
        const tol = Math.max(offsetRatio * (r.end - r.start), offsetMinTolerance);
        if (round7(Math.abs(r.end - e.end)) > tol) continue;
      }
      out.push(order[k]);
    }
    return out;
  });
  const { count } = maxMatching(ref.length, est.length, adj);
  const precision = est.length ? count / est.length : 0;
  const recall = ref.length ? count / ref.length : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  return { precision, recall, f1, matched: count, nRef: ref.length, nEst: est.length };
}

/** onset 기준과 onset+offset 기준을 한 번에 */
export function transcriptionReport(ref, est, opt = {}) {
  return { onset: noteScores(ref, est, { ...opt, offsetRatio: null }), onsetOffset: noteScores(ref, est, opt) };
}

/**
 * 서스테인 페달 구간으로 음 길이를 연장한다 (MAESTRO 표준 채점: 페달을 밟은 채 건반을 떼면 페달을 뗄 때까지 울린다).
 * transkun/Data.py extendPedal 과 같은 순서로 처리한다: 같은 음이 다시 눌리면 앞 음을 끊고, 끝으로 겹침을 정리한다.
 */
export function extendByPedal(notes, pedals) {
  const cmp = (a, b) => a.start - b.start || a.end - b.end || a.pitch - b.pitch;
  const ped = [...pedals].sort(cmp);
  const out = notes.map((n) => ({ ...n })).sort(cmp);
  const lastByPitch = new Map();
  for (const n of out) {
    const prev = lastByPitch.get(n.pitch);
    if (prev && prev.end > n.start) prev.end = n.start;
    for (const p of ped) if (n.end < p.end && n.end > p.start) n.end = p.end;
    lastByPitch.set(n.pitch, n);
  }
  return resolveOverlapping(out);
}
