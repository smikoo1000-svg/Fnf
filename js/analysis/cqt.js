// 가변-Q 변환(반음 1개 = 1 bin). 음높이마다 창 길이를 달리해 저음은 주파수 분해능을,
// 고음은 시간 분해능을 확보한다. 출력은 "사인파 진폭" 단위의 크기(magnitude).

export const NOTE_MIN = 33; // A1 (55 Hz)
export const NOTE_MAX = 103; // G7 (3136 Hz)
export const NUM_NOTES = NOTE_MAX - NOTE_MIN + 1;
export const HOP = 512; // 22050Hz 기준 약 23ms

export const midiToFreq = (m, a4 = 440) => a4 * 2 ** ((m - 69) / 12);

const DECIM = 4;
const DECIM_BELOW_HZ = 600;

/** 저역통과 + 1/DECIM 다운샘플 (선형위상 FIR, 필터 지연 보정) */
function decimate(x, factor) {
  const taps = 96;
  const half = taps >> 1;
  const cutoff = 0.42 / factor; // 정규화 주파수(샘플레이트 대비), 새 나이퀴스트의 ~84%
  const h = new Float32Array(taps + 1);
  let sum = 0;
  for (let i = 0; i <= taps; i++) {
    const n = i - half;
    const sinc = n === 0 ? 2 * cutoff : Math.sin(2 * Math.PI * cutoff * n) / (Math.PI * n);
    const w = 0.42 - 0.5 * Math.cos((2 * Math.PI * i) / taps) + 0.08 * Math.cos((4 * Math.PI * i) / taps);
    h[i] = sinc * w;
    sum += h[i];
  }
  for (let i = 0; i <= taps; i++) h[i] /= sum;
  const m = Math.floor(x.length / factor);
  const y = new Float32Array(m);
  for (let o = 0; o < m; o++) {
    const c = o * factor;
    let acc = 0;
    for (let j = 0; j <= taps; j++) {
      const idx = c + j - half;
      if (idx >= 0 && idx < x.length) acc += h[j] * x[idx];
    }
    y[o] = acc;
  }
  return y;
}

export class VariableQ {
  /**
   * @param {{sampleRate?:number, a4?:number, q?:number, maxWindowSec?:number}} opt
   */
  constructor({ sampleRate = 22050, a4 = 440, q = 30, maxWindowSec = 0.4 } = {}) {
    this.fs = sampleRate;
    this.a4 = a4;
    this.q = q;
    this.maxWindowSec = maxWindowSec;
    /** 노트별 커널 정보 */
    this.kernels = [];
    for (let k = 0; k < NUM_NOTES; k++) {
      const midi = NOTE_MIN + k;
      const f = midiToFreq(midi, a4);
      const decim = f < DECIM_BELOW_HZ ? DECIM : 1;
      const fsBand = sampleRate / decim;
      // 창 길이(원 샘플레이트 기준)
      const nFull = Math.min(Math.round((q * sampleRate) / f), Math.round(maxWindowSec * sampleRate));
      const n = Math.max(8, Math.round(nFull / decim));
      const re = new Float32Array(n);
      const im = new Float32Array(n);
      let wsum = 0;
      for (let i = 0; i < n; i++) {
        const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * (i + 0.5)) / n); // Hann
        wsum += w;
        const ph = (-2 * Math.PI * f * (i - n / 2)) / fsBand;
        re[i] = w * Math.cos(ph);
        im[i] = w * Math.sin(ph);
      }
      const norm = 2 / wsum;
      for (let i = 0; i < n; i++) {
        re[i] *= norm;
        im[i] *= norm;
      }
      this.kernels.push({ midi, f, decim, n, nFull: n * decim, re, im });
    }
  }

  /** 노트 k 커널의 유효 창 길이(초) */
  windowSec(k) {
    return this.kernels[k].nFull / this.fs;
  }

  /**
   * @param {Float32Array} signal  sampleRate와 동일한 모노 신호
   * @param {{hop?:number, frames?:number[]|null, onProgress?:(p:number)=>void}} opt
   *   frames를 주면 해당 프레임 인덱스만 계산(튜닝 추정용)
   */
  compute(signal, { hop = HOP, frames = null, onProgress = null } = {}) {
    const total = Math.floor(signal.length / hop) + 1;
    const list = frames ?? null;
    const nOut = list ? list.length : total;
    const mag = new Float32Array(nOut * NUM_NOTES);

    // 밴드별 패딩된 신호 준비
    const maxFull = Math.max(...this.kernels.map((k) => k.n * k.decim));
    const pad = Math.ceil(maxFull / 2) + 8;
    const bands = new Map();
    const getBand = (decim) => {
      if (bands.has(decim)) return bands.get(decim);
      const src = decim === 1 ? signal : decimate(signal, decim);
      const p = Math.ceil(pad / decim);
      const padded = new Float32Array(src.length + 2 * p);
      padded.set(src, p);
      const b = { x: padded, pad: p, hop: hop / decim };
      bands.set(decim, b);
      return b;
    };

    for (let idx = 0; idx < nOut; idx++) {
      const t = list ? list[idx] : idx;
      for (let k = 0; k < NUM_NOTES; k++) {
        const ker = this.kernels[k];
        const b = getBand(ker.decim);
        const center = Math.round(t * b.hop);
        const start = center - (ker.n >> 1) + b.pad;
        const x = b.x;
        let sr = 0;
        let si = 0;
        const { re, im, n } = ker;
        for (let i = 0; i < n; i++) {
          const v = x[start + i];
          sr += v * re[i];
          si += v * im[i];
        }
        mag[idx * NUM_NOTES + k] = Math.sqrt(sr * sr + si * si);
      }
      if (onProgress && (idx & 63) === 0) onProgress(idx / nOut);
    }
    return { mag, nFrames: nOut, hopSec: hop / this.fs };
  }
}

/**
 * 튜닝(A4 기준 주파수) 추정. 후보 세트에 대해 "봉우리 정도"(L4 노름)가 최대가 되는 편차를 고른다.
 * @returns {{cents:number, a4:number}}
 */
export function estimateTuning(signal, sampleRate = 22050) {
  const totalFrames = Math.floor(signal.length / HOP) + 1;
  // 에너지가 큰 프레임 최대 48개 선택
  const stride = 8;
  const energies = [];
  for (let t = 4; t < totalFrames - 4; t += stride) {
    let e = 0;
    const c = t * HOP;
    for (let i = -512; i < 512; i += 4) e += (signal[c + i] ?? 0) ** 2;
    energies.push([t, e]);
  }
  energies.sort((a, b) => b[1] - a[1]);
  const picks = energies
    .slice(0, 48)
    .filter((p) => p[1] > 1e-7)
    .map((p) => p[0])
    .sort((a, b) => a - b);
  if (picks.length < 4) return { cents: 0, a4: 440 };

  const cands = [];
  for (let c = -50; c < 50; c += 10) cands.push(c);
  const scores = cands.map((cents) => {
    const vq = new VariableQ({ sampleRate, a4: 440 * 2 ** (cents / 1200), maxWindowSec: 0.3 });
    const { mag } = vq.compute(signal, { frames: picks });
    let s = 0;
    for (let i = 0; i < mag.length; i++) s += mag[i] ** 4;
    return s;
  });
  let bi = 0;
  for (let i = 1; i < scores.length; i++) if (scores[i] > scores[bi]) bi = i;
  // 포물선 보간 (순환)
  const n = scores.length;
  const l = scores[(bi + n - 1) % n];
  const r = scores[(bi + 1) % n];
  const c0 = scores[bi];
  const denom = l - 2 * c0 + r;
  let cents = cands[bi] + (denom !== 0 ? (0.5 * (l - r)) / denom : 0) * 10;
  // 개선 폭이 미미하면 튜닝 보정 안 함 (무조음 신호 등)
  const mean = scores.reduce((a, b) => a + b, 0) / n;
  if (c0 < mean * 1.15) cents = 0;
  cents = Math.max(-50, Math.min(50, cents));
  return { cents, a4: 440 * 2 ** (cents / 1200) };
}
