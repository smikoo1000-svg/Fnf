// 브라우저/워커에서 Transkun 을 실행하는 런타임: ONNX Runtime Web(WASM) 과 모델 세션을 한 번만 만들어 재사용한다.
import { transkunTranscribe } from './transkun.js';

let runtime = null;

async function loadRuntime() {
  if (runtime) return runtime;
  const base = new URL('../../vendor/', import.meta.url);
  const ort = await import(new URL('onnxruntime-web/ort.wasm.min.mjs', base).href);
  ort.env.wasm.wasmPaths = new URL('onnxruntime-web/', base).href;
  // 멀티스레드는 교차 출처 격리(COOP/COEP)가 켜진 페이지에서만 가능하다 (scripts/serve.mjs, coi-sw.js)
  const threads = self.crossOriginIsolated ? Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1)) : 1;
  ort.env.wasm.numThreads = threads;
  const opt = { executionProviders: ['wasm'], graphOptimizationLevel: 'all' };
  const [core, attr] = await Promise.all([
    ort.InferenceSession.create(new URL('transkun/tk_core.onnx', base).href, opt),
    ort.InferenceSession.create(new URL('transkun/tk_attr.onnx', base).href, opt),
  ]);
  runtime = { ort, core, attr, threads };
  return runtime;
}

/** 음 시작 시각으로 만든 온셋 강도 곡선 (비트 추적용, 100프레임/초) */
export function onsetEnvelopeFromNotes(notes, duration, frameRate = 100) {
  const n = Math.max(1, Math.ceil(duration * frameRate) + 1);
  const env = new Float32Array(n);
  const k = [0.14, 0.61, 1, 0.61, 0.14]; // 20ms 폭 가우시안: 연주 타이밍의 작은 흔들림을 흡수
  for (const note of notes) {
    const c = Math.round(note.start * frameRate);
    const w = 0.3 + note.velocity / 127 + (note.midi < 55 ? 0.3 : 0); // 저음·센 음에 가중
    for (let i = -2; i <= 2; i++) if (c + i >= 0 && c + i < n) env[c + i] += w * k[i + 2];
  }
  return env;
}

/**
 * @param {Float32Array[]} channels 44.1kHz
 * @returns {Promise<{notes:{start:number,end:number,midi:number,velocity:number}[], pedals:{start:number,end:number,type:string}[], onsetEnv:Float32Array, frameRate:number, threads:number}>}
 */
export async function transcribePiano(channels, { onProgress = () => {}, shouldCancel = () => false } = {}) {
  onProgress(0.01, '피아노 전용 AI 모델 불러오는 중');
  const rt = await loadRuntime();
  const label = `피아노 전용 AI 분석 중 (CPU ${rt.threads}스레드)`;
  const r = await transkunTranscribe(channels, rt, { onProgress: (p) => onProgress(0.03 + 0.95 * p, label), shouldCancel });
  const notes = r.notes.map((n) => ({ start: n.start, end: n.end, midi: n.pitch, velocity: Math.max(1, n.velocity) }));
  const pedals = r.pedals.map((p) => ({ start: p.start, end: p.end, type: p.pitch === -64 ? 'sustain' : 'soft' }));
  const duration = channels[0].length / 44100;
  return { notes, pedals, onsetEnv: onsetEnvelopeFromNotes(notes, duration), frameRate: 100, threads: rt.threads };
}
