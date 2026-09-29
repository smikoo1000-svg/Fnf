// 학습 기반 엔진: Spotify Basic Pitch(Apache-2.0)를 브라우저(tfjs)에서 실행한다.
// vendor/basic-pitch.bundle.js 는 scripts/build-vendor.mjs 로 만든 번들(슬림 tfjs 포함)이다.

import { pruneHarmonicGhosts } from './note-filters.js';

const SAMPLE_RATE = 22050;
const FFT_HOP = 256;
const N_FRAMES_PER_WINDOW = 142; // 오버랩 제거 후 창당 출력 프레임 수
const WINDOW_HOP_SAMPLES = 22050 * 2 - FFT_HOP - 30 * FFT_HOP; // 36164
/** 모델 프레임 → 초 (창 사이 겹침을 보정한 실제 프레임 간격) */
export const FRAME_SEC = WINDOW_HOP_SAMPLES / SAMPLE_RATE / N_FRAMES_PER_WINDOW;
export const FRAME_RATE = 1 / FRAME_SEC;

const MIDI_OFFSET = 21; // 모델 출력 0번 bin = A0

let cache = null;

async function loadRuntime(modelUrl, preferGpu) {
  if (cache && cache.modelUrl === modelUrl) return cache;
  const bp = await import('../../vendor/basic-pitch.bundle.js');
  const { tf } = bp;
  let backend = 'cpu';
  if (preferGpu) {
    try {
      const ok = await tf.setBackend('webgl');
      await tf.ready();
      if (ok && tf.getBackend() === 'webgl') backend = 'webgl';
    } catch {
      /* CPU로 폴백 */
    }
  }
  if (backend === 'cpu') {
    await tf.setBackend('cpu');
    await tf.ready();
  }
  const model = tf.loadGraphModel(modelUrl);
  await model; // 로딩 실패 시 여기서 예외
  cache = { modelUrl, bp, backend, pitch: new bp.BasicPitch(model) };
  return cache;
}

/**
 * @param {Float32Array} signal 22050Hz 모노
 * @param {{modelUrl:string, sensitivity?:number, minNoteSec?:number, preferGpu?:boolean, shouldCancel?:()=>boolean, onProgress?:(p:number,label:string)=>void}} opt
 */
export async function transcribeMl(signal, { modelUrl, sensitivity = 0.5, minNoteSec = 0.1, preferGpu = true, shouldCancel = () => false, onProgress = () => {} }) {
  onProgress(0.02, 'AI 모델 불러오는 중');
  const rt = await loadRuntime(modelUrl, preferGpu);
  const { bp, pitch } = rt;

  const frames = [];
  const onsets = [];
  await pitch.evaluateModel(
    signal,
    (f, o) => {
      for (const row of f) frames.push(row);
      for (const row of o) onsets.push(row);
    },
    (p) => {
      // 라이브러리는 창(2초) 하나를 처리할 때마다 이 콜백을 부르므로, 여기서 예외를 던지면 다음 창부터 중단된다
      if (shouldCancel()) throw new Error('취소됨');
      onProgress(0.05 + 0.85 * p, `AI 분석 중 (${rt.backend === 'webgl' ? 'GPU' : 'CPU'})`);
    },
  );

  onProgress(0.92, '노트 추출');
  // 민감도 → 임계값. 악보에서는 가짜 음표가 빠진 음표보다 훨씬 거슬리므로 라이브러리 기본값(0.5/0.3)보다
  // 약간 보수적인 0.6/0.4 를 기본(민감도 0.5)으로 삼는다. (합성 피아노 실험에서 F1이 가장 높았음)
  const s = Math.min(1, Math.max(0, sensitivity));
  const onsetThresh = 0.85 - 0.5 * s;
  const frameThresh = 0.55 - 0.3 * s;
  const minLen = Math.max(4, Math.round(minNoteSec * FRAME_RATE));
  const events = bp.outputToNotesPoly(frames, onsets, onsetThresh, frameThresh, minLen, true, null, null, true);

  const candidates = events
    .map((n) => ({
      start: n.startFrame * FRAME_SEC,
      end: (n.startFrame + n.durationFrames) * FRAME_SEC,
      midi: n.pitchMidi,
      amplitude: n.amplitude,
    }))
    .filter((n) => n.midi >= MIDI_OFFSET && n.midi <= 108);
  const notes = pruneHarmonicGhosts(candidates, (n) => n.amplitude)
    .map((n) => ({ start: n.start, end: n.end, midi: n.midi, velocity: Math.round(Math.min(120, Math.max(30, 35 + 85 * n.amplitude))) }))
    .sort((a, b) => a.start - b.start || a.midi - b.midi);

  // 비트 트래킹용 온셋 강도: 프레임별 온셋 확률 합
  const onsetEnv = new Float32Array(onsets.length);
  for (let t = 0; t < onsets.length; t++) {
    let sum = 0;
    const row = onsets[t];
    for (let k = 0; k < row.length; k++) sum += row[k];
    onsetEnv[t] = sum;
  }
  onProgress(1, '완료');
  return { notes, onsetEnv, frameRate: FRAME_RATE, backend: rt.backend };
}
