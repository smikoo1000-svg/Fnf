// 분석 워커: UI 스레드를 막지 않고 음 추출을 수행한다. (module worker)
// 여기서의 AI 추론은 모두 CPU(WASM) 로 수행한다. (Basic Pitch 의 WebGL 추론은 메인 스레드에서 수행)
import { transcribeDsp } from './transcribe.js';
import { transcribeMl } from './ml-engine.js';
import { transcribePiano } from './transkun-runtime.js';

let currentId = null;

// 라이브러리 내부의 분리된 Promise 거부가 조용히 삼켜져 화면이 멈추는 일을 막는다
self.addEventListener('unhandledrejection', (e) => {
  self.postMessage({ type: 'error', id: currentId, message: String(e.reason?.message ?? e.reason) });
});

self.onmessage = async (ev) => {
  const { id, samples, channels, engine, options } = ev.data;
  currentId = id;
  const progress = (value, label) => self.postMessage({ type: 'progress', id, value, label });
  try {
    let result;
    if (engine === 'piano') result = await transcribePiano(channels, { onProgress: progress }) // 취소는 워커 종료로 처리;
    else if (engine === 'ml') result = await transcribeMl(samples, { ...options, preferGpu: false, onProgress: progress });
    else result = transcribeDsp(samples, 22050, { ...options, onProgress: progress });
    self.postMessage({ type: 'result', id, result: { ...result, engine } }, [result.onsetEnv.buffer]);
  } catch (err) {
    self.postMessage({ type: 'error', id, message: String(err?.message ?? err) });
  }
};
