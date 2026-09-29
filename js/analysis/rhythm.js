// 온셋 강도 곡선 → 템포 추정 → 동적계획법 비트 트래킹(Ellis 2007) → 마디 시작(다운비트) 추정.
// 템포가 조금씩 흔들리는 실제 연주도 비트 위치를 따라가며, 이후 양자화는 이 비트 격자를 기준으로 한다.

/** 이동평균 제거 + 반파 정류 + 표준화 */
function normalizeEnvelope(env, frameRate) {
  const n = env.length;
  const w = Math.max(3, Math.round(frameRate * 0.6));
  const out = new Float32Array(n);
  const prefix = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + env[i];
  for (let i = 0; i < n; i++) {
    const a = Math.max(0, i - w);
    const b = Math.min(n, i + w + 1);
    const mean = (prefix[b] - prefix[a]) / (b - a);
    out[i] = Math.max(0, env[i] - mean);
  }
  let s = 0;
  for (let i = 0; i < n; i++) s += out[i] * out[i];
  const std = Math.sqrt(s / Math.max(1, n)) || 1;
  for (let i = 0; i < n; i++) out[i] /= std;
  return out;
}

/** 자기상관 기반 전역 템포 후보 (BPM) */
export function estimateTempo(envRaw, frameRate, { minBpm = 55, maxBpm = 190, prior = 118 } = {}) {
  const env = normalizeEnvelope(envRaw, frameRate);
  const n = env.length;
  const minLag = Math.floor((60 / maxBpm) * frameRate);
  const maxLag = Math.min(n - 1, Math.ceil((60 / minBpm) * frameRate));
  if (n < maxLag * 2 || maxLag <= minLag) return { bpm: prior, confidence: 0 };
  const ac = new Float64Array(maxLag + 1);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let s = 0;
    for (let i = lag; i < n; i++) s += env[i] * env[i - lag];
    ac[lag] = s / (n - lag);
  }
  const lagOf = (bpm) => (60 / bpm) * frameRate;
  const at = (lag) => {
    const l = Math.round(lag);
    return l >= minLag && l <= maxLag ? ac[l] : 0;
  };
  let best = { score: -Infinity, bpm: prior };
  let second = -Infinity;
  for (let bpm = minBpm; bpm <= maxBpm; bpm += 0.5) {
    const L = lagOf(bpm);
    // 박 주기 + 절반 주기(8분음표 분할)에서의 상관에 로그-가우시안 템포 선호 분포를 곱한다.
    // (합성 음원 9곡 스윕으로 고른 값. 배수 주기를 더하면 느린 템포로 치우친다)
    const s0 = at(L) + 0.3 * at(L / 2);
    const oct = Math.log2(bpm / prior);
    const s = s0 * Math.exp(-0.5 * (oct / 0.5) ** 2);
    if (s > best.score) {
      second = best.score;
      best = { score: s, bpm };
    } else if (s > second && Math.abs(bpm - best.bpm) > 6) second = s;
  }
  const confidence = best.score > 0 ? Math.min(1, Math.max(0, (best.score - Math.max(0, second)) / best.score + 0.2)) : 0;
  return { bpm: best.bpm, confidence };
}

/**
 * 비트 시각 배열을 구한다.
 * @param {Float32Array} envRaw 온셋 강도
 * @param {number} frameRate  프레임/초
 * @param {{bpm?:number, tightness?:number, prior?:number}} opt bpm을 주면 해당 템포로 고정, prior는 템포 사전분포 중심(BPM)
 * @returns {{beats:Float64Array, bpm:number, confidence:number}}
 */
export function trackBeats(envRaw, frameRate, { bpm = null, tightness = null, prior = 118 } = {}) {
  const n = envRaw.length;
  const est = bpm ? { bpm, confidence: 1 } : estimateTempo(envRaw, frameRate, { prior });
  const T = (60 / est.bpm) * frameRate; // 박 주기(프레임)
  const env = normalizeEnvelope(envRaw, frameRate);
  if (n < T * 3) return { beats: constantGrid(0, 60 / est.bpm, n / frameRate), bpm: est.bpm, confidence: 0 };

  // 가우시안 평활화
  const half = Math.max(2, Math.round(T));
  const win = new Float32Array(2 * half + 1);
  for (let i = -half; i <= half; i++) win[i + half] = Math.exp(-0.5 * ((i * 32) / T) ** 2);
  const local = new Float32Array(n);
  for (let t = 0; t < n; t++) {
    let s = 0;
    for (let i = -half; i <= half; i++) {
      const j = t + i;
      if (j >= 0 && j < n) s += env[j] * win[i + half];
    }
    local[t] = s;
  }

  const alpha = tightness ?? (bpm ? 680 : 100);
  const score = new Float32Array(n);
  const back = new Int32Array(n).fill(-1);
  const lo = Math.round(T / 2);
  const hi = Math.round(2 * T);
  for (let t = 0; t < n; t++) {
    let bestS = -1e9;
    let bestP = -1;
    for (let d = lo; d <= hi; d++) {
      const p = t - d;
      if (p < 0) break;
      const pen = alpha * Math.log(d / T) ** 2;
      const s = score[p] - pen;
      if (s > bestS) {
        bestS = s;
        bestP = p;
      }
    }
    if (bestP >= 0) {
      score[t] = local[t] + bestS;
      back[t] = bestP;
    } else {
      score[t] = local[t];
    }
  }
  // 종료 지점: 마지막 한 박 구간에서 최고점 (국소 최대)
  let end = n - 1;
  let bestEnd = -1e9;
  for (let t = Math.max(0, n - Math.round(T)); t < n; t++) {
    if (score[t] > bestEnd) {
      bestEnd = score[t];
      end = t;
    }
  }
  const frames = [];
  for (let t = end; t >= 0; t = back[t]) {
    frames.push(t);
    if (back[t] < 0) break;
  }
  frames.reverse();
  const beats = Float64Array.from(frames, (f) => f / frameRate);
  if (beats.length < 4) return { beats: constantGrid(0, 60 / est.bpm, n / frameRate), bpm: est.bpm, confidence: 0 };
  const period = (beats[beats.length - 1] - beats[0]) / (beats.length - 1);
  return { beats, bpm: 60 / period, confidence: est.confidence };
}

export function constantGrid(offset, period, duration) {
  const out = [];
  for (let t = offset; t <= duration + period; t += period) out.push(t);
  return Float64Array.from(out);
}

/** 사용자가 BPM을 직접 지정했을 때: 온셋 곡선에 가장 잘 맞는 위상의 등간격 격자 */
export function fixedTempoGrid(envRaw, frameRate, bpm) {
  const env = normalizeEnvelope(envRaw, frameRate);
  const period = 60 / bpm;
  const dur = env.length / frameRate;
  let best = { s: -1, off: 0 };
  const steps = 48;
  for (let i = 0; i < steps; i++) {
    const off = (i / steps) * period;
    let s = 0;
    for (let t = off; t < dur; t += period) {
      const f = t * frameRate;
      const a = Math.floor(f);
      const fr = f - a;
      s += (env[a] ?? 0) * (1 - fr) + (env[a + 1] ?? 0) * fr;
    }
    if (s > best.s) best = { s, off };
  }
  return { beats: constantGrid(best.off, period, dur), bpm, confidence: 1 };
}

/** 초 ↔ 박 위치 변환 (비트 배열 사이 선형보간, 양 끝은 외삽) */
export class BeatGrid {
  /** @param {Float64Array|number[]} beats */
  constructor(beats) {
    this.beats = beats;
    const n = beats.length;
    this.firstPeriod = n > 1 ? beats[1] - beats[0] : 0.5;
    this.lastPeriod = n > 1 ? beats[n - 1] - beats[n - 2] : 0.5;
  }

  /** 시각(초) → 박 인덱스(실수, beats[0]=0) */
  posOf(t) {
    const b = this.beats;
    const n = b.length;
    if (t <= b[0]) return (t - b[0]) / this.firstPeriod;
    if (t >= b[n - 1]) return n - 1 + (t - b[n - 1]) / this.lastPeriod;
    let lo = 0;
    let hi = n - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (b[mid] <= t) lo = mid;
      else hi = mid;
    }
    return lo + (t - b[lo]) / (b[hi] - b[lo]);
  }

  /** 박 인덱스(실수) → 시각(초) */
  timeOf(pos) {
    const b = this.beats;
    const n = b.length;
    if (pos <= 0) return b[0] + pos * this.firstPeriod;
    if (pos >= n - 1) return b[n - 1] + (pos - (n - 1)) * this.lastPeriod;
    const i = Math.floor(pos);
    return b[i] + (pos - i) * (b[i + 1] - b[i]);
  }
}

/**
 * 마디 첫 박(다운비트) 위치 추정.
 * 각 박에 놓인 음의 세기(저음 가중)를 박자 위상별로 합산해 가장 강한 위상을 고른다.
 * @returns {number} 0..beatsPerBar-1  (beats[phase]가 1박)
 */
export function chooseDownbeatPhase(grid, notes, beatsPerBar) {
  if (beatsPerBar <= 1) return 0;
  const acc = new Float64Array(beatsPerBar);
  for (const n of notes) {
    const pos = grid.posOf(n.start);
    const i = Math.round(pos);
    if (Math.abs(pos - i) > 0.2) continue; // 박 위에 놓인 음만
    const bassBonus = n.midi < 55 ? 1.6 : 1;
    const w = (n.velocity / 127) * bassBonus;
    acc[((i % beatsPerBar) + beatsPerBar) % beatsPerBar] += w;
  }
  // 첫 음이 놓인 위상에 약한 가산점 (곡이 1박에서 시작하는 경우가 흔함)
  if (notes.length) {
    const first = Math.round(grid.posOf(notes[0].start));
    acc[((first % beatsPerBar) + beatsPerBar) % beatsPerBar] *= 1.15;
  }
  let best = 0;
  for (let i = 1; i < beatsPerBar; i++) if (acc[i] > acc[best]) best = i;
  return best;
}
