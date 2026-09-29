// 엔진 공통 후처리: 배음 유령음 제거.
// 어떤 음의 하위 배음 위치(-12, -19, -24, -28, -31 반음)에 같은 시간대에 훨씬 강한 음이 있으면
// 그 음은 하위 음의 배음이 만든 유령일 가능성이 높아 제거한다. (실제 옥타브 중복 연주는 세기가 비슷해 남는다)

/** 하위 배음 간격(반음) → 하위 음의 세기가 이 배수 이상일 때 상위 음을 유령으로 간주 */
export const GHOST_RATIOS = [[12, 1.7], [19, 1.4], [24, 1.4], [28, 1.3], [31, 1.3]];

/**
 * @template {{start:number,end:number,midi:number}} N
 * @param {N[]} notes
 * @param {(n:N)=>number} strength 음의 세기(진폭 등)
 * @param {[number,number][]} [ratios]
 * @returns {N[]}
 */
export function pruneHarmonicGhosts(notes, strength, ratios = GHOST_RATIOS) {
  const byMidi = new Map();
  for (const n of notes) {
    if (!byMidi.has(n.midi)) byMidi.set(n.midi, []);
    byMidi.get(n.midi).push(n);
  }
  return notes.filter((n) => {
    const sn = strength(n);
    for (const [d, ratio] of ratios) {
      const lows = byMidi.get(n.midi - d);
      if (!lows) continue;
      for (const l of lows) {
        const overlap = Math.min(l.end, n.end) - Math.max(l.start, n.start);
        if (overlap >= 0.7 * (n.end - n.start) && strength(l) >= ratio * sn) return false;
      }
    }
    return true;
  });
}
