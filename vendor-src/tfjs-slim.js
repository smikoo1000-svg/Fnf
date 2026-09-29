// Basic Pitch가 필요로 하는 tfjs 부분만 노출하는 슬림 진입점 (core + converter + cpu/webgl 백엔드)
export * from '@tensorflow/tfjs-core';
// tensor.slice() 같은 체이닝 메서드를 텐서에 등록 (Basic Pitch 추론 코드가 사용)
import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';
export * from '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
