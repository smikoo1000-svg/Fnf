import test from 'node:test';
import assert from 'node:assert/strict';
import { denoise } from '../js/eval/denoise.js';
import { addNoise, meanPower } from '../js/eval/noise.js';

const FS = 22050;
function tones(sec = 4) {
  const x = new Float32Array(FS * sec);
  for (let i = 0; i < x.length; i++) {
    const t = i / FS;
    const on = (t % 1) < 0.6 ? Math.exp(-(t % 1) * 3) : 0; // 1초마다 울리는 음 (중간에 쉼)
    x[i] = on * (0.3 * Math.sin(2 * Math.PI * 440 * t) + 0.15 * Math.sin(2 * Math.PI * 880 * t));
  }
  return x;
}
const err = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return s / a.length;
};

test('잡음 추가: 요청한 SNR 로 섞인다', () => {
  const x = tones();
  for (const snr of [20, 10, 0]) {
    for (const type of ['white', 'pink']) {
      const [y] = addNoise([x], snr, type);
      const n = y.map((v, i) => v - x[i]);
      const got = 10 * Math.log10(meanPower(x) / meanPower(n));
      assert.ok(Math.abs(got - snr) < 0.01, `${type} ${snr}dB → ${got.toFixed(2)}`);
    }
  }
});

test('잡음 제거: 깨끗한 신호는 거의 그대로 두고, 정상 잡음은 줄인다', () => {
  const x = tones();
  const clean = denoise(x).signal;
  assert.ok(10 * Math.log10(meanPower(x) / err(clean, x)) > 20, '깨끗한 신호 왜곡 20dB 이상 작아야 함');
  for (const type of ['white', 'pink']) {
    const [y] = addNoise([x], 5, type);
    const before = 10 * Math.log10(meanPower(x) / err(y, x));
    const after = 10 * Math.log10(meanPower(x) / err(denoise(y).signal, x));
    assert.ok(after > before + 3, `${type}: SNR ${before.toFixed(1)} → ${after.toFixed(1)}dB`);
  }
});
