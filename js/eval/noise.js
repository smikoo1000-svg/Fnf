// 잡음 강건성 실험용: 지정한 SNR(dB)로 백색/분홍 잡음을 섞는다. (결정적 난수)

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 표준정규 근사 잡음 (Box–Muller) */
function gaussian(n, seed) {
  const r = rng(seed);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i += 2) {
    const u = Math.max(r(), 1e-12);
    const v = r();
    const m = Math.sqrt(-2 * Math.log(u));
    out[i] = m * Math.cos(2 * Math.PI * v);
    if (i + 1 < n) out[i + 1] = m * Math.sin(2 * Math.PI * v);
  }
  return out;
}

/** 분홍 잡음(1/f): 백색 잡음에 Paul Kellet 의 근사 필터 적용 */
function pink(n, seed) {
  const w = gaussian(n, seed);
  const out = new Float32Array(n);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < n; i++) {
    const x = w[i];
    b0 = 0.99886 * b0 + x * 0.0555179;
    b1 = 0.99332 * b1 + x * 0.0750759;
    b2 = 0.969 * b2 + x * 0.153852;
    b3 = 0.8665 * b3 + x * 0.3104856;
    b4 = 0.55 * b4 + x * 0.5329522;
    b5 = -0.7616 * b5 - x * 0.016898;
    out[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + x * 0.5362;
    b6 = x * 0.115926;
  }
  return out;
}

const power = (x) => {
  let s = 0;
  for (let i = 0; i < x.length; i++) s += x[i] * x[i];
  return s / Math.max(1, x.length);
};

/**
 * @param {Float32Array[]} channels
 * @param {number} snrDb 신호 대 잡음비 (신호 전체 평균 전력 기준)
 * @param {'white'|'pink'} type
 */
export function addNoise(channels, snrDb, type = 'white', seed = 1) {
  return channels.map((x, c) => {
    const n = type === 'pink' ? pink(x.length, seed + c) : gaussian(x.length, seed + c);
    const g = Math.sqrt(power(x) / (power(n) * 10 ** (snrDb / 10)));
    const out = new Float32Array(x.length);
    for (let i = 0; i < x.length; i++) out[i] = x[i] + g * n[i];
    return out;
  });
}

export { power as meanPower };
