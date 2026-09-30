// 운지(손가락 번호) 제안: 인체공학 비용 + 동적계획법.
// 비용은 Parncutt 외(1997) 계열의 손가락 쌍별 간격표와 규칙(뻗기·좁힘·약한 손가락·검은건반 엄지·엄지 넘기기 등)을
// 단순화해 쓴다. 학습된 모델이 아니므로 "제안"이며, 음마다 신뢰도(가능한 운지들 사이의 사후확률)를 함께 준다.
//
// 상태 = 한 시점(화음 포함)의 손가락 배정. 오른손은 음이 높을수록 번호가 커지고, 왼손은 반대(엄지가 위).

/** 손가락 쌍(a<b) → [MinPrac, MinComf, MinRel, MaxRel, MaxComf, MaxPrac] (반음, 오른손 기준: b 쪽 음 - a 쪽 음) */
const SPAN = {
  '1-2': [-5, -3, 1, 5, 8, 10],
  '1-3': [-4, -2, 3, 7, 10, 12],
  '1-4': [-3, -1, 5, 9, 12, 14],
  '1-5': [-1, 1, 7, 10, 13, 15],
  '2-3': [1, 1, 1, 2, 3, 5],
  '2-4': [1, 1, 3, 4, 5, 7],
  '2-5': [2, 2, 5, 6, 8, 10],
  '3-4': [1, 1, 1, 2, 2, 4],
  '3-5': [1, 1, 3, 4, 5, 7],
  '4-5': [1, 1, 1, 2, 3, 5],
};
const BLACK = new Set([1, 3, 6, 8, 10]);
const isBlack = (m) => BLACK.has(((m % 12) + 12) % 12);
const TEMPERATURE = 2; // 신뢰도(사후확률) 계산용: 클수록 비용 차이에 덜 민감
/** 손을 편하게 놓았을 때 엄지로부터 각 손가락까지의 대략적 거리(반음): 흰건반 하나씩 */
const NATURAL = [0, 0, 2, 4, 5.5, 7.5];
const SHAPE_WEIGHT = 0.15;
/** 엄지와 교차하는 손가락별 기본 비용 */
const CROSS_BASE = [0, 0, 4, 2.5, 2.8, 10];

/** 손가락 fa 로 pa, fb 로 pb 를 짚을 때의 간격 비용 (hand: +1 오른손, -1 왼손) */
function spanCost(fa, pa, fb, pb, hand) {
  if (fa === fb) return pa === pb ? 0 : 6 + Math.abs(pb - pa); // 같은 손가락으로 다른 음: 매우 불편
  const lo = Math.min(fa, fb);
  const hi = Math.max(fa, fb);
  const [minPrac, minComf, minRel, maxRel, maxComf, maxPrac] = SPAN[`${lo}-${hi}`];
  // 번호가 큰 손가락 쪽 음 - 작은 손가락 쪽 음 (왼손은 방향이 반대)
  const d = hand * (fa === lo ? pb - pa : pa - pb);
  const thumb = lo === 1;
  let c = 0;
  if (d > maxComf) c += 2 * (d - maxComf);
  if (d < minComf) c += 2 * (minComf - d);
  // 좁힘 벌점은 교차가 아닐 때만 (엄지 넣기·넘기기처럼 d<0 인 교차는 뻗기 규칙과 엄지 넘기기 규칙이 다룬다)
  if (d < minRel && d >= 0) c += (minRel - d) * (thumb ? 2 : 1);
  if (d > maxRel) c += (d - maxRel) * (thumb ? 1 : 2);
  if (d > maxPrac || d < minPrac) c += 10;
  return c;
}

/** 연속한 두 음(단선율) 사이의 규칙 비용 */
function stepCost(fa, pa, fb, pb, hand) {
  let c = spanCost(fa, pa, fb, pb, hand);
  if (fa === 3 && fb === 4) c += 0.5; // 3→4 는 약간 불편
  if (((fa === 3 && fb === 4) || (fa === 4 && fb === 3)) && isBlack(fa === 4 ? pa : pb) && !isBlack(fa === 3 ? pa : pb)) c += 0.5; // 4번이 검은건반, 3번이 흰건반
  const thumbIsA = fa === 1;
  if ((fa === 1 || fb === 1) && fa !== fb) {
    const tp = thumbIsA ? pa : pb;
    const op = thumbIsA ? pb : pa;
    if (isBlack(tp) && !isBlack(op)) c += 2; // 검은건반 엄지 옆 흰건반
    // 엄지 넣기/넘기기(엄지가 다른 손가락보다 바깥쪽): 3·4번과의 교차는 자연스럽고, 2번은 어색하며, 5번은 사실상 불가
    const crossed = hand * (thumbIsA ? pa - pb : pb - pa) > 0;
    if (crossed) {
      const other = thumbIsA ? fb : fa;
      c += CROSS_BASE[other] + 0.5 * Math.max(0, Math.abs(pb - pa) - 2);
      if (isBlack(tp) && !isBlack(op)) c += 1;
    }
  }
  if ((fa === 5 || fb === 5) && fa !== fb && isBlack(fa === 5 ? pa : pb) && !isBlack(fa === 5 ? pb : pa)) c += 2; // 5번 검은건반
  return c;
}

/** 화음 하나에 가능한 손가락 배정들 (음 오름차순 기준) */
function chordStates(midis, hand) {
  const k = midis.length;
  const out = [];
  const pick = (start, acc) => {
    if (acc.length === k) {
      const fingers = hand > 0 ? acc : [...acc].reverse(); // 왼손: 낮은 음일수록 큰 번호
      let cost = 0;
      for (let i = 0; i + 1 < k; i++) {
        const c = spanCost(fingers[i], midis[i], fingers[i + 1], midis[i + 1], hand);
        if (c >= 10) return; // 손이 닿지 않는 배정
        cost += c;
      }
      for (let i = 0; i < k; i++) {
        if (fingers[i] >= 4) cost += k > 1 ? 0.5 : 0.3; // 약한 손가락
        if (fingers[i] === 1 && isBlack(midis[i]) && k > 1) cost += 1;
      }
      // 화음 손 모양: 가장 작은 번호 손가락을 기준으로, 각 손가락이 편한 위치에서 얼마나 벗어났는지
      if (k > 1) {
        const r = fingers.indexOf(Math.min(...fingers));
        for (let i = 0; i < k; i++) cost += SHAPE_WEIGHT * Math.abs(hand * (midis[i] - midis[r]) - (NATURAL[fingers[i]] - NATURAL[fingers[r]]));
      }
      out.push({ fingers, cost });
      return;
    }
    for (let f = start; f <= 5; f++) pick(f + 1, [...acc, f]);
  };
  pick(1, []);
  return out;
}

/**
 * 한 손의 운지를 구한다.
 * @param {{start:number, midis:number[]}[]} events 시간순 (start 는 유닛), midis 오름차순, 최대 5음
 * @param {'treble'|'bass'} handName
 * @param {number} unitsPerBeat 박 길이(유닛) — 쉼이 길면 손 위치를 자유롭게 옮길 수 있다고 본다
 * @returns {{fingers:number[], confidence:number[]}[]} events 와 같은 순서
 */
export function fingerHand(events, handName, unitsPerBeat = 4) {
  const hand = handName === 'treble' ? 1 : -1;
  const states = events.map((e) => {
    const s = chordStates(e.midis, hand);
    return s.length ? s : [{ fingers: e.midis.map((_, i) => (hand > 0 ? Math.min(5, i + 1) : Math.max(1, 5 - i))), cost: 20 }];
  });
  const n = events.length;
  if (!n) return [];
  const trans = (i, a, b) => {
    const prev = events[i - 1];
    const cur = events[i];
    const A = states[i - 1][a];
    const B = states[i][b];
    let c;
    if (prev.midis.length === 1 && cur.midis.length === 1) c = stepCost(A.fingers[0], prev.midis[0], B.fingers[0], cur.midis[0], hand);
    else {
      // 화음이 끼면: 손 위치(엄지 기준)의 이동량. 한 손 폭(약 2반음) 안의 이동은 거의 공짜
      const shift = Math.abs(handPos(B.fingers, cur.midis, hand) - handPos(A.fingers, prev.midis, hand));
      c = 0.25 * Math.max(0, shift - 2);
    }
    const gap = cur.start - prev.start;
    return gap >= 2 * unitsPerBeat ? c * 0.3 : c; // 긴 쉼 뒤에는 손 위치를 새로 잡기 쉬움
  };
  // 비터비 (최소 비용) + 전방·후방 (신뢰도)
  const best = [states[0].map((s) => s.cost)];
  const back = [states[0].map(() => -1)];
  const logF = [states[0].map((s) => -s.cost / TEMPERATURE)];
  for (let i = 1; i < n; i++) {
    const bi = [];
    const bk = [];
    const lf = [];
    states[i].forEach((s, b) => {
      let m = Infinity;
      let arg = 0;
      const terms = [];
      states[i - 1].forEach((_, a) => {
        const t = trans(i, a, b);
        const v = best[i - 1][a] + t;
        if (v < m) {
          m = v;
          arg = a;
        }
        terms.push(logF[i - 1][a] - t / TEMPERATURE);
      });
      bi.push(m + s.cost);
      bk.push(arg);
      lf.push(logSumExp(terms) - s.cost / TEMPERATURE);
    });
    best.push(bi);
    back.push(bk);
    logF.push(lf);
  }
  const logB = Array.from({ length: n }, (_, i) => new Array(states[i].length).fill(0));
  for (let i = n - 2; i >= 0; i--) {
    states[i].forEach((_, a) => {
      logB[i][a] = logSumExp(states[i + 1].map((s, b) => logB[i + 1][b] - trans(i + 1, a, b) / TEMPERATURE - s.cost / TEMPERATURE));
    });
  }
  const logZ = logSumExp(logF[n - 1]);
  let cur = best[n - 1].indexOf(Math.min(...best[n - 1]));
  const path = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    path[i] = cur;
    cur = back[i][cur];
  }
  return path.map((si, i) => {
    const post = Math.exp(logF[i][si] + logB[i][si] - logZ);
    return { fingers: states[i][si].fingers, confidence: Math.min(1, Math.max(0, post)) };
  });
}

/** 배정에서 추정한 손 위치: 각 손가락이 편한 자리에 있다고 볼 때 엄지가 놓일 음높이의 평균 */
function handPos(fingers, midis, hand) {
  let s = 0;
  for (let i = 0; i < midis.length; i++) s += midis[i] - hand * NATURAL[fingers[i]];
  return s / midis.length;
}

function logSumExp(xs) {
  const m = Math.max(...xs);
  if (m === -Infinity) return -Infinity;
  let s = 0;
  for (const x of xs) s += Math.exp(x - m);
  return m + Math.log(s);
}

/**
 * 악보의 모든 마디 조각에 운지를 붙인다: piece.fingers[i] (midis[i] 에 대응), piece.fingerConfidence (0~1).
 * 붙임줄로 이어진 조각은 앞 조각과 같은 운지를 쓴다 (새로 누르지 않음).
 * @returns {{mean:number, low:number, count:number}} 신뢰도 요약 (low: 신뢰도 0.5 미만 개수)
 */
export function applyFingering(score) {
  let sum = 0;
  let count = 0;
  let low = 0;
  for (const key of ['treble', 'bass']) {
    const pieces = [];
    score.measures.forEach((m, mi) => {
      for (const p of m[key]) if (!p.rest && !p.tiePrev) pieces.push({ p, start: mi * score.unitsPerBar + p.start });
    });
    // 한 손에 5음이 넘는 화음은 위(오른손)/아래(왼손) 5음만
    const events = pieces.map(({ p, start }) => ({ start, midis: key === 'treble' ? p.midis.slice(-5) : p.midis.slice(0, 5) }));
    const res = fingerHand(events, key, score.unitsPerBeat);
    pieces.forEach(({ p }, i) => {
      const r = res[i];
      p.fingers = key === 'treble' ? [...new Array(p.midis.length - events[i].midis.length).fill(null), ...r.fingers] : [...r.fingers, ...new Array(p.midis.length - events[i].midis.length).fill(null)];
      p.fingerConfidence = r.confidence;
      sum += r.confidence;
      count++;
      if (r.confidence < 0.5) low++;
    });
    // 붙임줄 뒤 조각은 앞 조각의 운지를 물려받는다
    let prev = null;
    score.measures.forEach((m) => {
      for (const p of m[key]) {
        if (p.tiePrev && prev) {
          p.fingers = prev.fingers;
          p.fingerConfidence = prev.fingerConfidence;
          p.fingerTied = true;
        }
        if (!p.rest) prev = p;
      }
    });
  }
  return { mean: count ? sum / count : 0, low, count };
}
