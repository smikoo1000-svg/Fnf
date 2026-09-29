// WebAudio 가산합성 피아노. 샘플 파일 없이 동작하며, 같은 코드로 실시간 재생과 오프라인 WAV 렌더를 모두 처리한다.

const waveCache = new WeakMap();

/** 음역별 배음 구성(밝기)을 가진 PeriodicWave */
function getWave(ctx, midi) {
  let byBand = waveCache.get(ctx);
  if (!byBand) waveCache.set(ctx, (byBand = new Map()));
  const band = Math.floor(midi / 4);
  let wave = byBand.get(band);
  if (!wave) {
    const n = 24;
    const real = new Float32Array(n);
    const imag = new Float32Array(n);
    // 고음일수록 배음이 적고, 저음은 2~4배음이 강해 풍성한 소리
    const rolloff = 1.05 + Math.max(0, midi - 60) / 40;
    for (let h = 1; h < n; h++) {
      const bump = h === 2 ? 1.25 : h === 3 ? 1.1 : 1;
      imag[h] = (bump / h ** rolloff) * Math.exp(-h / (14 - Math.min(8, Math.max(0, midi - 48) / 8)));
    }
    wave = ctx.createPeriodicWave(real, imag);
    byBand.set(band, wave);
  }
  return wave;
}

const midiToHz = (m) => 440 * 2 ** ((m - 69) / 12);

/** 리버브용 임펄스 응답(지수 감쇠 잡음) */
function makeImpulse(ctx, seconds = 1.6) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let seed = 12345 + c * 999;
    for (let i = 0; i < len; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      d[i] = ((seed / 4294967296) * 2 - 1) * Math.exp((-3.2 * i) / len);
    }
  }
  return buf;
}

/** 마스터 체인(컴프레서 + 약한 리버브)을 만들어 입력 노드를 반환 */
export function createPianoBus(ctx, { reverb = 0.16, destination = ctx.destination } = {}) {
  const input = ctx.createGain();
  input.gain.value = 0.55;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 5;
  comp.attack.value = 0.005;
  comp.release.value = 0.25;
  input.connect(comp);
  comp.connect(destination);
  if (reverb > 0) {
    const conv = ctx.createConvolver();
    conv.buffer = makeImpulse(ctx);
    const wet = ctx.createGain();
    wet.gain.value = reverb;
    input.connect(conv);
    conv.connect(wet);
    wet.connect(destination);
  }
  return { input, output: comp };
}

/**
 * 한 음을 예약한다.
 * @param {BaseAudioContext} ctx
 * @param {AudioNode} bus
 * @param {{midi:number, vel?:number}} note
 * @param {number} when 시작 시각(ctx 시간)
 * @param {number} dur  건반을 누르고 있는 시간(초)
 */
export function playNote(ctx, bus, { midi, vel = 80 }, when, dur) {
  const f = midiToHz(midi);
  const amp = 0.06 + 0.32 * (vel / 127) ** 1.6;
  const tau = 0.55 * 2 ** ((60 - midi) / 28) * (1.4 - 0.4 * (vel / 127)) + 0.25; // 저음일수록 오래 울림
  const hold = Math.max(0.06, dur);
  const end = when + hold;
  const release = 0.09 + Math.min(0.5, tau * 0.15);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(amp, when + 0.004);
  gain.gain.setTargetAtTime(amp * 0.05, when + 0.004, tau);
  // 건반을 뗄 때 댐퍼로 빠르게 감쇠
  gain.gain.setTargetAtTime(0, end, release * 0.35);

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  const bright = Math.min(14000, f * (5 + 12 * (vel / 127)));
  lp.frequency.setValueAtTime(bright, when);
  lp.frequency.setTargetAtTime(Math.max(600, f * 2.5), when, 0.5);
  lp.Q.value = 0.3;

  lp.connect(gain);
  gain.connect(bus);

  const wave = getWave(ctx, midi);
  const stopAt = end + release * 2 + 0.1;
  for (const detune of [-2.5, 2.5]) {
    const osc = ctx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.value = f;
    osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.value = 0.5;
    osc.connect(g);
    g.connect(lp);
    osc.start(when);
    osc.stop(stopAt);
  }
}

/** 노트 목록 전체를 예약 (오프라인 렌더용) */
export function schedulePiano(ctx, notes, { offset = 0 } = {}) {
  const { input } = createPianoBus(ctx);
  for (const n of notes) playNote(ctx, input, n, offset + n.time, n.dur);
}

/**
 * 노트 목록을 WAV(16bit PCM 모노)로 렌더한다.
 * @param {{time:number,dur:number,midi:number,vel:number}[]} notes
 */
export async function renderWav(notes, { sampleRate = 44100, tail = 3 } = {}) {
  const total = Math.max(...notes.map((n) => n.time + n.dur), 0) + tail;
  const ctx = new OfflineAudioContext(1, Math.ceil(total * sampleRate), sampleRate);
  schedulePiano(ctx, notes);
  const buf = await ctx.startRendering();
  return encodeWav(buf.getChannelData(0), sampleRate);
}

export function encodeWav(samples, sampleRate) {
  const n = samples.length;
  const out = new DataView(new ArrayBuffer(44 + n * 2));
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, 'RIFF');
  out.setUint32(4, 36 + n * 2, true);
  w(8, 'WAVE');
  w(12, 'fmt ');
  out.setUint32(16, 16, true);
  out.setUint16(20, 1, true);
  out.setUint16(22, 1, true);
  out.setUint32(24, sampleRate, true);
  out.setUint32(28, sampleRate * 2, true);
  out.setUint16(32, 2, true);
  out.setUint16(34, 16, true);
  w(36, 'data');
  out.setUint32(40, n * 2, true);
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(samples[i]));
  const g = peak > 0.98 ? 0.98 / peak : 1;
  for (let i = 0; i < n; i++) {
    const v = Math.max(-1, Math.min(1, samples[i] * g));
    out.setInt16(44 + i * 2, v < 0 ? v * 0x8000 : v * 0x7fff, true);
  }
  return new Blob([out], { type: 'audio/wav' });
}
