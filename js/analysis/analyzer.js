// 분석 파사드.
//  - AI 엔진 + WebGL 사용 가능: 메인 스레드에서 GPU 추론 (연산이 GPU로 넘어가 UI가 멈추지 않는다)
//  - AI 엔진 + WebGL 없음: 워커에서 CPU 추론 (느리지만 UI는 유지)
//  - 내장 엔진: 워커에서 실행
// 어떤 경로든 AI 엔진이 실패하면 내장 엔진으로 자동 전환하고 그 사실을 result.note 로 알린다.

let worker = null;
let seq = 0;
const pending = new Map();
let cancelled = false;

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

function rejectAll(message) {
  for (const job of pending.values()) job.reject(new Error(message));
  pending.clear();
}

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = (ev) => {
    const { id, type } = ev.data;
    const job = pending.get(id);
    if (!job) return;
    if (type === 'progress') job.onProgress?.(ev.data.value, ev.data.label);
    else if (type === 'result') {
      pending.delete(id);
      job.resolve(ev.data.result);
    } else if (type === 'error') {
      pending.delete(id);
      job.reject(new Error(ev.data.message));
    }
  };
  worker.onerror = (e) => {
    rejectAll(e.message || '분석 워커 오류');
    worker?.terminate();
    worker = null;
  };
  worker.onmessageerror = () => rejectAll('분석 워커 통신 오류');
  return worker;
}

function runInWorker(samples, engine, options, onProgress) {
  const w = getWorker();
  const id = ++seq;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject, onProgress });
    const copy = samples.slice(); // 원본은 재분석을 위해 보존
    w.postMessage({ id, samples: copy, engine, options }, [copy.buffer]);
  });
}

/**
 * @param {Float32Array} samples 22050Hz 모노
 * @param {{engine:'ml'|'dsp', sensitivity:number, minNoteSec:number, onProgress?:Function}} opt
 */
export async function analyze(samples, { engine = 'ml', sensitivity = 0.5, minNoteSec = 0.1, onProgress } = {}) {
  cancelled = false;
  const modelUrl = new URL('../../vendor/basic-pitch-model/model.json', import.meta.url).href;
  const options = { sensitivity, minNoteSec, modelUrl };

  if (engine === 'ml') {
    try {
      if (hasWebGL()) {
        const { transcribeMl } = await import('./ml-engine.js');
        const r = await transcribeMl(samples, { ...options, preferGpu: true, shouldCancel: () => cancelled, onProgress });
        return { ...r, engine: 'ml', note: r.backend === 'cpu' ? 'GPU를 사용할 수 없어 CPU로 분석했습니다. 긴 곡은 시간이 오래 걸릴 수 있어요.' : null };
      }
      const r = await runInWorker(samples, 'ml', { ...options, preferGpu: false }, onProgress);
      return { ...r, note: r.note ?? 'GPU(WebGL)를 사용할 수 없어 CPU로 분석했습니다. 긴 곡은 시간이 오래 걸릴 수 있어요.' };
    } catch (err) {
      if (cancelled || err.message === '취소됨') throw new Error('취소됨');
      onProgress?.(0.02, '내장 엔진으로 전환');
      const r = await runInWorker(samples, 'dsp', options, onProgress);
      return { ...r, engine: 'dsp', note: `AI 엔진을 사용할 수 없어 내장 엔진으로 분석했습니다 (${err.message})` };
    }
  }
  return runInWorker(samples, 'dsp', options, onProgress);
}

export function cancelAnalysis() {
  cancelled = true;
  if (worker) {
    worker.terminate();
    worker = null;
  }
  rejectAll('취소됨');
}
