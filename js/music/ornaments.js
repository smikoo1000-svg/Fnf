// 꾸밈음 감지와 라우팅 (규칙 기반).
// 연주된 음(초 단위)에서 앞꾸밈음과 트릴을 찾아, 그 음들은 박 격자 양자화를 거치지 않게 주음에 붙인다.
//  - 앞꾸밈음(acciaccatura): 다음 음 바로 앞에서 짧게 눌렀다 뗀 음. 음정은 1~5반음, 주음이 더 길다.
//    펼친화음(아르페지오)은 아래 음을 계속 누르고 있으므로 "짧게 뗀다" 조건으로 걸러진다.
//  - 트릴: 1~2반음 차이의 두 음이 16분음표보다 빠르게 4번 이상 번갈아 나오는 구간 → 아래 음(주음) 하나 + tr 표시.
// 학습된 모델이 아니라 규칙이므로, 겹꾸밈음·턴·모르덴트 등은 감지하지 않고 빠른 음형을 잘못 볼 수도 있다.

const TRILL_MIN_NOTES = 4;

/**
 * @template {{start:number,end:number,midi:number,velocity:number}} N
 * @param {N[]} notes 초 단위 (정렬 불필요)
 * @param {number} secondsPerUnit 16분음표 길이(초)
 * @returns {{notes:(N & {graces?:number[], graceEvents?:object[], ornament?:'trill', trillUpper?:number, rawEvents?:object[]})[], found:{type:'grace'|'trill', start:number, end:number, midi:number}[]}}
 *   graceEvents / rawEvents: 꾸밈음·트릴 구간의 원시 전사 음(초). 격자 양자화를 거치지 않는 "원시 출력 우선" 경로에 쓰인다.
 */
export function routeOrnaments(notes, secondsPerUnit) {
  const sorted = [...notes].sort((a, b) => a.start - b.start || a.midi - b.midi);
  const used = new Set();
  const found = [];
  const out = new Map(); // 원래 노트 → 결과 노트

  // 1) 트릴: 두 음이 번갈아 나오는 빠른 사슬
  const maxIoi = Math.min(0.14, 0.7 * secondsPerUnit);
  for (let i = 0; i < sorted.length; i++) {
    if (used.has(i)) continue;
    const chain = [i];
    let other = null;
    let j = i + 1;
    while (j < sorted.length) {
      const last = sorted[chain[chain.length - 1]];
      const cand = sorted[j];
      if (cand.start - last.start > maxIoi) break;
      const want = other ?? (Math.abs(cand.midi - last.midi) >= 1 && Math.abs(cand.midi - last.midi) <= 2 ? cand.midi : null);
      const expected = chain.length % 2 === 1 ? want : sorted[i].midi;
      if (!used.has(j) && expected != null && cand.midi === expected && cand.start - last.start > 0.02 && cand.end - cand.start < 2.5 * maxIoi) {
        other ??= cand.midi;
        chain.push(j);
      }
      j++;
    }
    if (chain.length >= TRILL_MIN_NOTES) {
      const members = chain.map((k) => sorted[k]);
      const lower = Math.min(sorted[i].midi, other);
      const upper = Math.max(sorted[i].midi, other);
      const principal = {
        ...members[0],
        midi: lower,
        end: Math.max(...members.map((m) => m.end)),
        velocity: Math.max(...members.map((m) => m.velocity)),
        ornament: 'trill',
        trillUpper: upper,
        // 전사 모델이 실제로 낸 트릴 음들(원시 시각). 악보는 tr 로 줄여 적지만 MIDI·재생·검증은 이것을 우선 쓴다
        rawEvents: members.map(({ start, end, midi, velocity }) => ({ start, end, midi, velocity })),
      };
      chain.forEach((k) => used.add(k));
      out.set(sorted[i], principal);
      found.push({ type: 'trill', start: principal.start, end: principal.end, midi: lower });
    }
  }

  // 2) 앞꾸밈음: 짧게 뗀 음 → 곧 이어지는 가까운 주음에 붙인다.
  //    뒤에서부터 처리해, 꾸밈음이 사슬(g1→g2→주음)로 이어지면 앞의 꾸밈음도 같은 주음에 붙인다.
  const maxGap = Math.min(0.12, 0.5 * secondsPerUnit);
  const graceTarget = new Map(); // 꾸밈음 인덱스 → 주음 인덱스
  const attach = (i, target) => {
    const t = sorted[target];
    const base = out.get(t) ?? { ...t };
    base.graces = [sorted[i].midi, ...(base.graces ?? [])];
    out.set(t, base);
    graceTarget.set(i, target);
    used.add(i);
    base.graceEvents = [{ start: sorted[i].start, end: sorted[i].end, midi: sorted[i].midi, velocity: sorted[i].velocity }, ...(base.graceEvents ?? [])];
    found.push({ type: 'grace', start: sorted[i].start, end: sorted[i].end, midi: sorted[i].midi });
  };
  /**
   * g 앞(같은 음역 ±7반음)에서 시작한 음과의 간격. 꾸밈음은 "끼워 넣은" 음이라 이 간격이 꾸밈음→주음 간격보다 훨씬 길다.
   * 꾸밈음 사슬(g1→g2)일 수 있으므로 짧은 음을 최대 2개까지 거슬러 올라가 사슬 앞의 간격을 본다.
   * (빠른 음계라면 더 앞에도 짧은 간격이 이어지므로 여전히 짧게 나온다)
   */
  const prevGap = (i) => {
    let cur = i;
    for (let hops = 0; ; ) {
      let k = cur - 1;
      while (k >= 0 && !(sorted[cur].start - sorted[k].start > 0.01 && Math.abs(sorted[k].midi - sorted[cur].midi) <= 7)) k--;
      if (k < 0) return Infinity;
      const d = sorted[cur].start - sorted[k].start;
      if (d > 1) return Infinity;
      if (hops < 2 && d <= maxGap && sorted[k].end - sorted[k].start < 0.1) {
        cur = k;
        hops++;
        continue;
      }
      return d;
    }
  };
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (used.has(i)) continue;
    const g = sorted[i];
    const gDur = g.end - g.start;
    const before = prevGap(i);
    for (let j = i + 1; j < sorted.length && sorted[j].start - g.start <= maxGap; j++) {
      const m = sorted[j];
      const iv = Math.abs(m.midi - g.midi);
      if (m.start - g.start < 0.015 || iv < 1 || iv > 5) continue;
      if (before < 2.5 * (m.start - g.start) && !graceTarget.has(j)) continue; // 고른 간격의 빠른 음형(음계·반음계)은 제외
      if (g.end > m.start + 0.06) continue; // 꾸밈음은 다음 음 직후 곧 뗀다 (펼친화음 제외)
      if (graceTarget.has(j)) {
        attach(i, graceTarget.get(j)); // 사슬: 뒤의 꾸밈음이 붙은 주음으로
        break;
      }
      if (used.has(j) || m.end - m.start < 1.5 * gDur) continue; // 주음이 더 길어야 함
      attach(i, j);
      break;
    }
  }

  const result = [];
  sorted.forEach((n, i) => {
    if (used.has(i) && !out.has(n)) return;
    result.push(out.get(n) ?? n);
  });
  return { notes: result, found };
}
