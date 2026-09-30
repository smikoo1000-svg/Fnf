// 벤치마크용 WAV 읽기 (44.1kHz 16bit PCM) 와 22.05kHz 모노 변환
import fs from 'node:fs';

/** @returns {Float32Array[]} 채널별 샘플 (-1~1) */
export function readWav(file) {
  const b = fs.readFileSync(file);
  const ch = b.readUInt16LE(22);
  const rate = b.readUInt32LE(24);
  const bits = b.readUInt16LE(34);
  if (bits !== 16 || rate !== 44100) throw new Error(`44.1kHz 16bit WAV 만 지원: ${file}`);
  let p = 12;
  while (b.toString('ascii', p, p + 4) !== 'data') p += 8 + b.readUInt32LE(p + 4);
  const n = b.readUInt32LE(p + 4) / 2 / ch;
  const out = Array.from({ length: ch }, () => new Float32Array(n));
  for (let i = 0, q = p + 8; i < n; i++) for (let c = 0; c < ch; c++, q += 2) out[c][i] = b.readInt16LE(q) / 32768;
  return out;
}

/** 44.1kHz 채널들 → 22.05kHz 모노 (채널 평균 후 저역통과 FIR 로 1/2 다운샘플) */
export function toMono22k(channels) {
  const n = channels[0].length;
  const mono = new Float32Array(n);
  for (const c of channels) for (let i = 0; i < n; i++) mono[i] += c[i] / channels.length;
  const taps = 64;
  const h = new Float32Array(taps + 1);
  let sum = 0;
  for (let i = 0; i <= taps; i++) {
    const k = i - taps / 2;
    const sinc = k === 0 ? 0.45 * 2 : Math.sin(2 * Math.PI * 0.225 * k) / (Math.PI * k);
    h[i] = sinc * (0.42 - 0.5 * Math.cos((2 * Math.PI * i) / taps) + 0.08 * Math.cos((4 * Math.PI * i) / taps));
    sum += h[i];
  }
  const out = new Float32Array(Math.floor(n / 2));
  for (let o = 0; o < out.length; o++) {
    let acc = 0;
    for (let j = 0; j <= taps; j++) {
      const idx = 2 * o + j - taps / 2;
      if (idx >= 0 && idx < n) acc += h[j] * mono[idx];
    }
    out[o] = acc / sum;
  }
  return out;
}
