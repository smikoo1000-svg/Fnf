// 정상(stationary) 잡음 억제 전처리: 최소 통계로 주파수별 잡음 크기를 추정하고 위너(Wiener) 이득으로 줄인다.
// 녹음 잡음(히스, 에어컨·팬 소음, 험)처럼 시간에 따라 크게 변하지 않는 잡음에만 효과가 있다.
// 사람 말소리·박수처럼 변하는 잡음에는 효과가 거의 없고, 과하면 여린 음을 지울 수 있다.
// 실험용 모듈: scripts/eval/bench.mjs --denoise 로 SNR 별 효과를 측정했으나, 피아노 전용 엔진(Transkun)의 정확도를
// 모든 조건(SNR 20·10·0dB)에서 오히려 낮춰서 앱에는 넣지 않았다 (docs/benchmarks.md).

const N = 2048;
/** 표준정규 분위수 (감마 분위수 근사용) */
const QUANTILE_Z = { 0.05: -1.6449, 0.1: -1.2816, 0.2: -0.8416, 0.3: -0.5244 };
const HOP = 512;

/** 제자리 반복 radix-2 FFT (re, im 길이 N) */
function fft(re, im, inverse = false) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = ((inverse ? 2 : -2) * Math.PI) / len;
    const wr = Math.cos(ang);
    const wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1;
      let ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * cr - im[b] * ci;
        const ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
        const t = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = t;
      }
    }
  }
  if (inverse) for (let i = 0; i < n; i++) (re[i] /= n), (im[i] /= n);
}

/**
 * @param {Float32Array} x 모노 신호
 * @param {{strength?:number, floorDb?:number, quantile?:number}} [opt]
 *   strength: 잡음 과대추정 계수(1=표준), floorDb: 최대 감쇠량, quantile: 잡음으로 볼 프레임 에너지 분위
 * @returns {{signal:Float32Array, noiseDb:number, snrDb:number}} 추정 잡음 레벨과 대략적 SNR 을 함께 반환
 */
export function denoise(x, { strength = 1.5, floorDb = -18, quantile = 0.1 } = {}) {
  const nFrames = Math.max(1, Math.ceil((x.length + N) / HOP));
  const win = new Float32Array(N);
  for (let i = 0; i < N; i++) win[i] = Math.sqrt(0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N)); // sqrt-Hann (분석·합성)
  const bins = N / 2 + 1;
  const power = new Float32Array(nFrames * bins);
  const specRe = new Float32Array(nFrames * bins);
  const specIm = new Float32Array(nFrames * bins);
  const re = new Float64Array(N);
  const im = new Float64Array(N);
  for (let f = 0; f < nFrames; f++) {
    const s0 = f * HOP - N / 2;
    for (let i = 0; i < N; i++) {
      const p = s0 + i;
      re[i] = p >= 0 && p < x.length ? x[p] * win[i] : 0;
      im[i] = 0;
    }
    fft(re, im);
    for (let k = 0; k < bins; k++) {
      specRe[f * bins + k] = re[k];
      specIm[f * bins + k] = im[k];
      power[f * bins + k] = re[k] * re[k] + im[k] * im[k];
    }
  }
  // 주파수별 잡음 전력 = (이웃 bin ±1, 프레임 ±2 로 평균한) 프레임 전력의 하위 분위수.
  // 잡음만 있는 bin 의 전력은 지수분포라 분위수가 평균보다 작다 → 평균 15개 표본의 감마분포 분위수로 편향을 보정한다.
  const K_AVG = 15;
  const z = QUANTILE_Z[quantile] ?? -1.2816;
  const wh = 1 - 1 / (9 * K_AVG) + z * Math.sqrt(1 / (9 * K_AVG)); // Wilson–Hilferty 근사
  const bias = wh * wh * wh;
  const noise = new Float32Array(bins);
  const col = new Float32Array(nFrames);
  for (let k = 0; k < bins; k++) {
    for (let f = 0; f < nFrames; f++) {
      let sum = 0;
      let cnt = 0;
      for (let df = -2; df <= 2; df++) {
        const ff = f + df;
        if (ff < 0 || ff >= nFrames) continue;
        for (let dk = -1; dk <= 1; dk++) {
          const kk = k + dk;
          if (kk < 0 || kk >= bins) continue;
          sum += power[ff * bins + kk];
          cnt++;
        }
      }
      col[f] = sum / cnt;
    }
    col.sort();
    noise[k] = col[Math.floor(quantile * (nFrames - 1))] / bias;
  }
  const gMin = 10 ** (floorDb / 20);
  const out = new Float32Array(x.length);
  const prevGain = new Float32Array(bins).fill(1);
  let sigPow = 0;
  let noisePow = 0;
  for (let f = 0; f < nFrames; f++) {
    for (let k = 0; k < bins; k++) {
      const P = power[f * bins + k];
      const snrPost = P / (noise[k] * strength + 1e-20);
      // 결정 지향(decision-directed) 사전 SNR 로 음악 잡음(musical noise)을 줄인다
      const snrPrio = 0.9 * prevGain[k] * prevGain[k] * snrPost + 0.1 * Math.max(snrPost - 1, 0);
      const g = Math.max(gMin, snrPrio / (1 + snrPrio));
      prevGain[k] = g;
      sigPow += P;
      noisePow += noise[k];
      re[k] = specRe[f * bins + k] * g;
      im[k] = specIm[f * bins + k] * g;
      if (k > 0 && k < N / 2) {
        re[N - k] = re[k];
        im[N - k] = -im[k];
      }
    }
    fft(re, im, true);
    const s0 = f * HOP - N / 2;
    for (let i = 0; i < N; i++) {
      const p = s0 + i;
      if (p >= 0 && p < x.length) out[p] += re[i] * win[i];
    }
  }
  // sqrt-Hann² 의 겹침 합(hop=N/4)은 2 이므로 보정
  for (let i = 0; i < out.length; i++) out[i] *= 0.5;
  const snrDb = 10 * Math.log10(Math.max(sigPow - noisePow, 1e-12) / Math.max(noisePow, 1e-12));
  return { signal: out, noiseDb: 10 * Math.log10(noisePow / nFrames / bins + 1e-20), snrDb };
}
