// 분석 워커: UI 스레드를 막지 않고 음 추출을 수행한다. (module worker)
// 워커에서는 tfjs WebGL 백엔드를 쓰지 않는다(GPU 추론은 메인 스레드에서 수행). 여기서의 AI 추론은 CPU 전용이다.
import { transcribeDsp } from './transcribe.js';
import { transcribeMl } from './ml-engine.js';

let currentId = null;

// 라이브러리 내부의 분리된 Promise 거부가 조용히 삼켜져 화면이 멈추는 일을 막는다
self.addEventListener('unhandledrejection', (e) => {
  self.postMessage({ type: 'error', id: currentId, message: String(e.reason?.message ?? e.reason) });
});

self.onmessage = async (ev) => {
  const { id, samples, engine, options } = ev.data;
  currentId = id;
  const progress = (value, label) => self.postMessage({ type: 'progress', id, value, label });
  try {
    const result =
      engine === 'ml'
        ? await transcribeMl(samples, { ...options, preferGpu: false, onProgress: progress })
        : transcribeDsp(samples, 22050, { ...options, onProgress: progress });
    self.postMessage({ type: 'result', id, result: { ...result, engine } }, [result.onsetEnv.buffer]);
  } catch (err) {
    self.postMessage({ type: 'error', id, message: String(err?.message ?? err) });
  }
};
