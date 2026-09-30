// 파일/녹음 데이터를 디코딩하고, 분석용 22050Hz 모노 신호로 변환한다.

export const ANALYSIS_RATE = 22050;

/**
 * @param {ArrayBuffer} arrayBuffer
 * @returns {Promise<{playback:AudioBuffer, samples:Float32Array, duration:number}>}
 *   playback: 원본 음질 그대로(원본 재생용), samples: 22050Hz 모노(분석용)
 */
export async function decodeAudio(arrayBuffer) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();
  let playback;
  try {
    // 일부 브라우저는 버퍼를 분리(detach)하므로 복사본을 넘긴다
    playback = await ctx.decodeAudioData(arrayBuffer.slice(0));
  } catch (err) {
    throw new Error('오디오를 해석할 수 없습니다. MP3, WAV, M4A, OGG, FLAC 등 브라우저가 지원하는 형식인지 확인해 주세요.');
  } finally {
    ctx.close?.();
  }
  return fromAudioBuffer(playback);
}

/** 이미 디코딩된 AudioBuffer → {playback, samples(22050Hz 모노), duration} */
export async function fromAudioBuffer(playback) {
  const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(playback.duration * ANALYSIS_RATE)), ANALYSIS_RATE);
  const src = off.createBufferSource();
  src.buffer = playback;
  src.connect(off.destination); // 다채널 → 모노 다운믹스는 렌더 그래프가 처리
  src.start();
  const rendered = await off.startRendering();
  return { playback, samples: rendered.getChannelData(0).slice(), duration: playback.duration };
}

/**
 * 피아노 전용 엔진(Transkun) 입력: 44.1kHz, 최대 2채널 (원본 모델은 스테레오 전력을 평균해 쓴다)
 * @returns {Promise<Float32Array[]>}
 */
export async function toChannels44k(buffer) {
  const channels = Math.min(2, buffer.numberOfChannels);
  if (buffer.sampleRate === 44100) return Array.from({ length: channels }, (_, c) => buffer.getChannelData(c).slice());
  const off = new OfflineAudioContext(channels, Math.max(1, Math.ceil(buffer.duration * 44100)), 44100);
  const src = off.createBufferSource();
  src.buffer = buffer;
  src.connect(off.destination);
  src.start();
  const r = await off.startRendering();
  return Array.from({ length: channels }, (_, c) => r.getChannelData(c).slice());
}

/** 구간 자르기(초). samples/playback 모두 동일 구간으로 맞춘다. */
export function sliceSamples(samples, startSec, endSec) {
  const a = Math.max(0, Math.floor(startSec * ANALYSIS_RATE));
  const b = Math.min(samples.length, Math.ceil(endSec * ANALYSIS_RATE));
  return samples.slice(a, Math.max(a, b));
}

/** 진폭 정규화 (분석기는 상대 크기를 사용하지만 매우 작은 녹음을 대비) */
export function normalize(samples, target = 0.8) {
  let peak = 0;
  for (let i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
  if (peak < 1e-4 || (peak > 0.3 && peak < 1)) return samples;
  const g = target / peak;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) out[i] = samples[i] * g;
  return out;
}

/** AudioBuffer 구간 자르기 (원본 재생을 분석 구간과 맞추기 위함) */
export function cropBuffer(buffer, startSec, endSec) {
  const sr = buffer.sampleRate;
  const a = Math.max(0, Math.floor(startSec * sr));
  const b = Math.min(buffer.length, Math.ceil(endSec * sr));
  if (a === 0 && b === buffer.length) return buffer;
  const out = new AudioBuffer({ length: Math.max(1, b - a), numberOfChannels: buffer.numberOfChannels, sampleRate: sr });
  for (let c = 0; c < buffer.numberOfChannels; c++) out.copyToChannel(buffer.getChannelData(c).subarray(a, b), c);
  return out;
}
