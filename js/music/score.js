// 노트(초) → 박 격자 양자화 → 양손 분리 → 마디/음가/붙임줄로 이루어진 악보 모델.
import { routeOrnaments } from './ornaments.js';

// 모든 시간 단위는 "유닛" = 16분음표. (6/8 같은 겹박자는 박 1개 = 6유닛)

/** 표기 가능한 음가(유닛) 와, 그 음가가 시작할 수 있는 위치의 정렬 단위 */
const SIZES = [16, 12, 8, 6, 4, 3, 2, 1];
const ALIGN = { 16: 16, 12: 8, 8: 4, 6: 4, 4: 2, 3: 2, 2: 1, 1: 1 };

export const TIME_SIGNATURES = {
  '4/4': { num: 4, den: 4 },
  '3/4': { num: 3, den: 4 },
  '2/4': { num: 2, den: 4 },
  '6/8': { num: 6, den: 8 },
};

export function meterInfo(timeSig) {
  const compound = timeSig.den === 8 && timeSig.num % 3 === 0;
  const unitsPerBeat = compound ? 6 : 4;
  const unitsPerBar = (timeSig.num * 16) / timeSig.den;
  return { compound, unitsPerBeat, unitsPerBar, beatsPerBar: unitsPerBar / unitsPerBeat };
}

/**
 * 한 구간(마디 안)을 표기 가능한 음가 조각으로 분할한다.
 * @returns {{pos:number,dur:number}[]}
 */
export function splitSpan(pos, dur, barLen, compound = false) {
  const out = [];
  while (dur > 0) {
    let chosen = 1;
    for (const s of SIZES) {
      if (s > dur || pos + s > barLen) continue;
      if (pos % ALIGN[s] !== 0) continue;
      if (compound && s < 12 && crossesGroup(pos, s)) continue;
      chosen = s;
      break;
    }
    out.push({ pos, dur: chosen });
    pos += chosen;
    dur -= chosen;
  }
  return out;
}

function crossesGroup(pos, s) {
  for (let g = 6; g < pos + s; g += 6) if (pos < g && g < pos + s) return !(pos % 6 === 0 && s % 6 === 0);
  return false;
}

/**
 * 오른손/왼손 배정.
 * 1) 같은 시점에 시작하는 음을 "끝나는 시점"이 비슷한 것끼리 묶는다(멜로디는 짧게, 반주 화음은 길게 이어지는 경우가 많다).
 * 2) 각 묶음을 음높이순으로 놓고 인접 간격이 MAX_STACK_GAP 이하인 음끼리 한 손의 화음 덩어리로 본다.
 * 3) 덩어리의 폭이 한 손 범위(MAX_HAND_SPAN) 이하이면 통째로 한 손에 배정(평균 음높이 ≥ 경계 → 오른손),
 *    넘으면 음별로 경계 기준 배정한다.
 * 이렇게 하면 왼손 화음의 윗음이 오른손 악보로 새어 나가는 일이 크게 줄어든다.
 */
const MAX_STACK_GAP = 9;
const MAX_HAND_SPAN = 16;
const END_TOLERANCE = 2; // 유닛 (최소값)
const END_TOLERANCE_RATIO = 0.3; // 기준 음길이 대비 허용 비율: 길게 끄는 화음일수록 끝 시점이 더 흔들린다
export function assignHands(notes, splitPoint) {
  const byStart = new Map();
  for (const n of notes) {
    if (!byStart.has(n.start)) byStart.set(n.start, []);
    byStart.get(n.start).push(n);
  }
  const place = (cluster) => {
    if (!cluster.length) return;
    const span = cluster.at(-1).midi - cluster[0].midi;
    if (span <= MAX_HAND_SPAN) {
      const mean = cluster.reduce((a, n) => a + n.midi, 0) / cluster.length;
      for (const n of cluster) n.treble = mean >= splitPoint;
    } else {
      for (const n of cluster) n.treble = n.midi >= splitPoint;
    }
  };
  for (const group of byStart.values()) {
    const byEnd = [...group].sort((a, b) => a.end - b.end);
    const blocks = [];
    for (const n of byEnd) {
      const blk = blocks.at(-1);
      const tol = blk ? Math.max(END_TOLERANCE, END_TOLERANCE_RATIO * (blk[0].end - blk[0].start)) : 0;
      if (blk && n.end - blk[0].end <= tol) blk.push(n);
      else blocks.push([n]);
    }
    for (const blk of blocks) {
      blk.sort((a, b) => a.midi - b.midi);
      let cluster = [];
      for (const n of blk) {
        if (cluster.length && n.midi - cluster.at(-1).midi > MAX_STACK_GAP) {
          place(cluster);
          cluster = [];
        }
        cluster.push(n);
      }
      place(cluster);
    }
  }
}

/** 한 화음 그룹의 음 수를 제한한다 (연주 가능성/가독성). 최상음(오른손)·최저음(왼손)은 항상 보존. */
function capChord(notes, treble, maxChord) {
  if (notes.length <= maxChord) return notes;
  const extreme = notes.reduce((a, b) => (treble ? (b.midi > a.midi ? b : a) : b.midi < a.midi ? b : a));
  const rest = notes.filter((n) => n !== extreme).sort((a, b) => b.vel - a.vel);
  const kept = [extreme, ...rest.slice(0, maxChord - 1)];
  for (const n of rest.slice(maxChord - 1)) n.capped = true; // 악보에서 뺀 음: MIDI·재생에서도 빼서 악보와 일치시킨다
  return kept;
}

/**
 * 한 손(스태프)의 노트들을 겹치지 않는 화음/쉼표 이벤트열로 정리한다.
 * 같은 시작 위치의 음은 하나의 화음이 되고, 다음 화음이 시작하면 앞 화음은 끝난 것으로 본다.
 * @param {{start:number,end:number,midi:number,vel:number}[]} notes 유닛 단위
 * @returns {{start:number,dur:number,midis:number[],vel:number}[]}
 */
function chordify(notes, { treble, maxChord, legatoGap, quantum }) {
  const groups = new Map();
  for (const n of notes) {
    if (!groups.has(n.start)) groups.set(n.start, []);
    groups.get(n.start).push(n);
  }
  const starts = [...groups.keys()].sort((a, b) => a - b);
  const events = [];
  starts.forEach((start, i) => {
    const group = capChord(groups.get(start), treble, maxChord);
    const next = i + 1 < starts.length ? starts[i + 1] : Infinity;
    const maxEnd = Math.max(...group.map((n) => n.end));
    let dur = Math.min(maxEnd, next) - start;
    if (next !== Infinity && next - (start + dur) > 0 && next - (start + dur) <= legatoGap) dur = next - start; // 짧은 틈은 이음새로 메움
    dur = Math.max(quantum, dur);
    const trill = group.find((n) => n.ornament === 'trill');
    events.push({
      start,
      dur,
      midis: [...new Set(group.map((n) => n.midi))].sort((a, b) => a - b),
      vel: Math.max(...group.map((n) => n.vel)),
      graces: group.flatMap((n) => n.graces ?? []),
      ornament: trill ? 'trill' : undefined,
    });
  });
  return events;
}

/** 같은 이벤트(__evId)에서 갈라진 연속 조각끼리 붙임줄로 연결한다. */
function linkTies(measures, key) {
  let prev = null;
  let prevEndAbs = -1;
  measures.forEach((m, bi) => {
    for (const p of m[key]) {
      const abs = bi * m.barLen + p.start;
      if (prev && !p.rest && !prev.rest && p.__evId === prev.__evId && abs === prevEndAbs) {
        prev.tieNext = true;
        p.tiePrev = true;
      }
      prev = p;
      prevEndAbs = abs + p.dur;
    }
  });
}

/**
 * @param {{start:number,end:number,midi:number,velocity:number}[]} notes 초 단위 노트
 * @param {import('../analysis/rhythm.js').BeatGrid} grid
 * @param {object} o
 * @param {number} o.phase          박 격자 중 1박 위상(0..beatsPerBar-1)
 * @param {{num:number,den:number}} o.timeSig
 * @param {number} [o.quantum=1]    양자화 단위(유닛). 1=16분음표, 2=8분음표
 * @param {number} [o.splitPoint=60] 오른손/왼손 경계 MIDI
 * @param {number} [o.fifths=0]     조표(#:+, b:-)
 * @param {'major'|'minor'} [o.mode='major']
 * @param {boolean} [o.legato=true]
 * @param {number} [o.maxChord=4]   한 손 화음 최대 음 수
 * @param {number} [o.minVelocity=0] 이 벨로시티 미만 노트는 악보에서 제외
 * @param {{start:number,end:number}[]} [o.pedals] 서스테인 페달 구간(초)
 * @param {boolean} [o.ornaments=true] 꾸밈음(앞꾸밈음·트릴)을 감지해 격자 양자화에서 빼고 주음에 붙인다
 */
export function buildScore(notes, grid, o) {
  const { timeSig, phase = 0, quantum = 1, splitPoint = 60, fifths = 0, mode = 'major', legato = true, maxChord = 4, minVelocity = 0, pedals = [], ornaments = true } = o;
  const { compound, unitsPerBeat, unitsPerBar, beatsPerBar } = meterInfo(timeSig);
  const usable = notes.filter((n) => n.velocity >= minVelocity);
  const period = (grid.beats[grid.beats.length - 1] - grid.beats[0]) / Math.max(1, grid.beats.length - 1);
  const secondsPerUnit = period / unitsPerBeat;

  const empty = {
    timeSig,
    fifths,
    mode,
    unitsPerBeat,
    unitsPerBar,
    beatsPerBar,
    compound,
    secondsPerUnit,
    origin: 0,
    quarterBpm: 60 / (secondsPerUnit * 4),
    measures: [],
    notes: [],
    pedals: [],
    ornaments: [],
    stats: { input: notes.length, velocityFiltered: notes.length - usable.length, ornamentMerged: 0, duplicatesMerged: 0, zeroLength: 0, chordCapped: 0, engraved: 0 },
    totalUnits: 0,
  };
  if (!usable.length) return empty;

  // 꾸밈음 라우팅: 16분음표 격자로는 표현할 수 없는 빠른 꾸밈 음들을 양자화 전에 주음의 속성으로 옮긴다
  const routing = ornaments ? routeOrnaments(usable, secondsPerUnit) : { notes: usable, found: [] };

  // 마디 1의 시작 박 인덱스: 첫 음 이전(또는 같은)의 다운비트
  const p0 = grid.posOf(Math.min(...routing.notes.map((n) => n.start)));
  const first = Math.floor(p0 + 0.25);
  const origin = phase + beatsPerBar * Math.floor((first - phase) / beatsPerBar);

  const toUnits = (t) => (grid.posOf(t) - origin) * unitsPerBeat;
  const snap = (u) => Math.max(0, Math.round(u / quantum) * quantum);

  /** @type {{start:number,end:number,midi:number,vel:number,treble:boolean}[]} */
  let q = [];
  for (const n of routing.notes) {
    const s = snap(toUnits(n.start));
    let e = snap(toUnits(n.end));
    if (e <= s) e = s + quantum;
    // 꾸밈음·트릴 구간의 원시 전사 음은 격자에 맞추지 않고 박 위치(소수 유닛)로만 옮긴다 → MIDI·재생에서 실제 연주 타이밍 유지
    const raw = (evs) => evs?.map((x) => ({ start: Math.max(0, toUnits(x.start)), end: Math.max(0, toUnits(x.end)), midi: x.midi, vel: x.velocity }));
    q.push({
      start: s,
      end: e,
      midi: n.midi,
      vel: n.velocity,
      treble: n.midi >= splitPoint,
      graces: n.graces,
      graceEvents: raw(n.graceEvents),
      ornament: n.ornament,
      trillUpper: n.trillUpper,
      rawEvents: raw(n.rawEvents),
    });
  }
  q.sort((a, b) => a.start - b.start || a.midi - b.midi);
  assignHands(q, splitPoint);
  // 같은 음이 겹치면 뒤 음이 시작할 때 앞 음을 끊고, 완전 중복은 합친다
  const lastByMidi = new Map();
  const merged = [];
  for (const n of q) {
    const prev = lastByMidi.get(n.midi);
    if (prev && n.start < prev.end) {
      if (n.start === prev.start) {
        prev.end = Math.max(prev.end, n.end);
        prev.vel = Math.max(prev.vel, n.vel);
        if (n.graces) {
          prev.graces = [...(prev.graces ?? []), ...n.graces];
          prev.graceEvents = [...(prev.graceEvents ?? []), ...(n.graceEvents ?? [])];
        }
        continue;
      }
      prev.end = n.start;
    }
    lastByMidi.set(n.midi, n);
    merged.push(n);
  }
  const zeroLength = merged.filter((n) => !(n.end > n.start)).length;
  q = merged.filter((n) => n.end > n.start);

  const totalUnits = Math.max(...q.map((n) => n.end));
  const nMeasures = Math.max(1, Math.ceil(totalUnits / unitsPerBar));
  const legatoGap = legato ? Math.floor(unitsPerBeat * 0.75) : 0;

  const staffEvents = {};
  for (const [key, treble] of [['treble', true], ['bass', false]]) {
    const hand = q.filter((n) => n.treble === treble);
    staffEvents[key] = chordify(hand, { treble, maxChord, legatoGap, quantum });
  }
  const capped = q.filter((n) => n.capped);
  q = q.filter((n) => !n.capped);

  // 마디 조립 (이벤트마다 식별자를 붙여 붙임줄을 정확히 연결)
  const measures = Array.from({ length: nMeasures }, (_, i) => ({ index: i, barLen: unitsPerBar, treble: [], bass: [] }));
  for (const key of ['treble', 'bass']) {
    let evId = 0;
    const bars = Array.from({ length: nMeasures }, () => []);
    let cursor = 0;
    const emit = (bar, pos, dur, ev, id, first = false) => {
      splitSpan(pos, dur, unitsPerBar, compound).forEach((p, k) => {
        const head = first && k === 0; // 꾸밈음·트릴 표시는 이벤트의 첫 조각에만
        bars[bar].push({
          start: p.pos,
          dur: p.dur,
          rest: !ev,
          midis: ev ? ev.midis : [],
          vel: ev ? ev.vel : 0,
          tieNext: false,
          tiePrev: false,
          graces: head && ev.graces?.length ? ev.graces : undefined,
          ornament: head ? ev.ornament : undefined,
          __evId: id,
        });
      });
    };
    const fill = (from, to) => {
      let t = from;
      while (t < to) {
        const bar = Math.floor(t / unitsPerBar);
        const end = Math.min(to, (bar + 1) * unitsPerBar);
        emit(bar, t - bar * unitsPerBar, end - t, null, -1);
        t = end;
      }
    };
    for (const ev of staffEvents[key]) {
      if (ev.start > cursor) fill(cursor, ev.start);
      const id = evId++;
      let t = ev.start;
      const end = ev.start + ev.dur;
      while (t < end) {
        const bar = Math.floor(t / unitsPerBar);
        const segEnd = Math.min(end, (bar + 1) * unitsPerBar);
        emit(bar, t - bar * unitsPerBar, segEnd - t, ev, id, t === ev.start);
        t = segEnd;
      }
      cursor = end;
    }
    fill(cursor, nMeasures * unitsPerBar);
    bars.forEach((b, i) => (measures[i][key] = b));
    linkTies(measures, key);
  }
  for (const m of measures) for (const key of ['treble', 'bass']) for (const p of m[key]) delete p.__evId;

  return {
    timeSig,
    fifths,
    mode,
    unitsPerBeat,
    unitsPerBar,
    beatsPerBar,
    compound,
    secondsPerUnit,
    origin,
    quarterBpm: 60 / (secondsPerUnit * 4),
    measures,
    notes: q.map((n) => ({
      start: n.start,
      end: n.end,
      midi: n.midi,
      vel: n.vel,
      hand: n.treble ? 'treble' : 'bass',
      ...(n.graces?.length ? { graces: n.graces, graceEvents: n.graceEvents } : {}),
      ...(n.ornament ? { ornament: n.ornament, trillUpper: n.trillUpper, rawEvents: n.rawEvents } : {}),
    })),
    pedals: quantizePedals(pedals, toUnits, snap, nMeasures * unitsPerBar),
    ornaments: routing.found,
    // 단계별로 음이 어디서 몇 개 빠지거나 합쳐졌는지 (메타 검증의 "음 보존" 검사에 쓴다)
    stats: {
      input: notes.length,
      velocityFiltered: notes.length - usable.length,
      ornamentMerged: usable.length - routing.notes.length,
      duplicatesMerged: routing.notes.length - merged.length,
      zeroLength,
      chordCapped: capped.length,
      engraved: q.length,
    },
    totalUnits: nMeasures * unitsPerBar,
  };
}

/** 페달 구간(초) → 유닛. 겹치면 합치고, 끝과 시작이 같은 지점(페달 바꿔 밟기)은 따로 둔다. */
function quantizePedals(pedals, toUnits, snap, total) {
  const out = [];
  const list = pedals
    .map((p) => ({ start: snap(toUnits(p.start)), end: Math.min(total, snap(toUnits(p.end))) }))
    .filter((p) => p.end > p.start)
    .sort((a, b) => a.start - b.start);
  for (const p of list) {
    const last = out[out.length - 1];
    if (last && p.start < last.end) last.end = Math.max(last.end, p.end);
    else out.push(p);
  }
  return out;
}

/** 조각 길이(유닛) → 표기 정보 */
export const DURATION_TYPES = {
  16: { type: 'w', dots: 0 },
  12: { type: 'h', dots: 1 },
  8: { type: 'h', dots: 0 },
  6: { type: 'q', dots: 1 },
  4: { type: 'q', dots: 0 },
  3: { type: '8', dots: 1 },
  2: { type: '8', dots: 0 },
  1: { type: '16', dots: 0 },
};

/** 악보 유닛(16분음표) → 원본 오디오의 시각(초). 비트 추적 결과를 따라가므로 템포가 흔들리는 연주에도 맞는다. */
export function unitToOriginalSeconds(score, grid, unit) {
  return Math.max(0, grid.timeOf(score.origin + unit / score.unitsPerBeat));
}

/**
 * 연주용 음 목록(유닛, 소수 가능). 꾸밈음·트릴 구간은 **전사 모델의 원시 출력**(격자에 맞추지 않은 실제 연주 음·시각)을
 * 우선 쓰고, 원시 출력이 없으면(악보만 있는 경우) 꾸밈음은 주음 바로 앞 짧은 음, 트릴은 두 음의 빠른 교대로 풀어 쓴다.
 * MIDI 내보내기·재생·메타 검증이 같은 결과를 쓰도록 한 곳에서 계산한다.
 */
export function performanceNotes(score) {
  const sp = score.secondsPerUnit;
  const graceU = Math.min(0.07 / sp, 0.5); // 꾸밈음 하나 길이: 약 70ms (16분음표 절반 이하)
  const trillU = Math.min(Math.max(0.06 / sp, 0.25), 1); // 트릴 한 음: 60ms 이상, 16분음표 이하
  const out = [];
  for (const n of score.notes) {
    const base = { vel: n.vel, hand: n.hand };
    if (n.graceEvents?.length) {
      for (const g of n.graceEvents) out.push({ ...base, start: g.start, end: Math.max(g.start + 0.05, g.end), midi: g.midi, vel: g.vel ?? n.vel });
    } else {
      (n.graces ?? []).forEach((g, k, arr) => {
        const s = n.start - (arr.length - k) * graceU;
        out.push({ ...base, start: Math.max(0, s), end: Math.max(0, s) + graceU, midi: g, vel: Math.max(1, n.vel - 10) });
      });
    }
    if (n.ornament === 'trill' && n.rawEvents?.length) {
      for (const e of n.rawEvents) out.push({ ...base, start: e.start, end: Math.max(e.start + 0.05, e.end), midi: e.midi, vel: e.vel ?? n.vel });
    } else if (n.ornament === 'trill' && n.trillUpper) {
      let t = n.start;
      let up = false;
      while (t < n.end - 1e-9) {
        out.push({ ...base, start: t, end: Math.min(n.end, t + trillU), midi: up ? n.trillUpper : n.midi });
        t += trillU;
        up = !up;
      }
    } else out.push({ ...base, start: n.start, end: n.end, midi: n.midi });
  }
  return out.sort((a, b) => a.start - b.start || a.midi - b.midi);
}

/**
 * 피아노 재생/내보내기용 노트 목록(초). 양자화된 악보를 일정한 템포로 연주한다.
 * 서스테인 페달 구간이 있으면, 페달을 밟은 채 뗀 음은 페달을 뗄 때까지 울리게 한다 (같은 음을 다시 치면 거기서 끊음).
 */
export function scoreToPlayback(score) {
  const sp = score.secondsPerUnit;
  const pedals = score.pedals ?? [];
  const notes = performanceNotes(score).map((n) => {
    let end = n.end;
    for (const p of pedals) if (end > p.start && end < p.end) end = p.end;
    return { ...n, end };
  });
  const byPitch = new Map();
  for (const n of notes) {
    const prev = byPitch.get(n.midi);
    if (prev && prev.end > n.start) prev.end = Math.max(prev.start + 0.25, n.start);
    byPitch.set(n.midi, n);
  }
  return notes.map((n) => ({ time: n.start * sp, dur: Math.max(0.03, (n.end - n.start) * sp), midi: n.midi, vel: n.vel, hand: n.hand }));
}
