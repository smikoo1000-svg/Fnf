# 서드파티 고지

이 저장소는 아래 오픈소스를 포함(vendored)합니다. 각 라이선스 전문은 `vendor/` 폴더의 해당 파일에 있습니다.

| 구성요소 | 용도 | 라이선스 | 위치 |
| --- | --- | --- | --- |
| [Basic Pitch](https://github.com/spotify/basic-pitch) 1.0.1 (Spotify) — 코드와 학습된 모델 | 음 분석(AI 엔진) | Apache-2.0 | `vendor/basic-pitch.bundle.js`, `vendor/basic-pitch-model/`, `vendor/BASIC-PITCH-LICENSE` |
| [TensorFlow.js](https://github.com/tensorflow/tfjs) 3.21 (Google) — core / converter / cpu·webgl 백엔드 | 모델 실행 | Apache-2.0 | `vendor/basic-pitch.bundle.js` 에 번들됨 (라이선스 문구는 파일 끝 주석에 포함) |
| [VexFlow](https://github.com/vexflow/vexflow) 5.0.0 (Bravura 글리프 포함 빌드) | 악보 그리기 | MIT | `vendor/vexflow-bravura.js`, `vendor/VEXFLOW-LICENSE` |
| [Transkun](https://github.com/Yujia-Yan/Skipping-The-Frame-Level) v2 (pip `transkun==2.0.1`, Yujia Yan) — 학습된 가중치를 ONNX 로 변환 | 피아노 전용 음 분석 | MIT | `vendor/transkun/tk_core.onnx`, `vendor/transkun/tk_attr.onnx`, `vendor/transkun/LICENSE` |
| [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) 1.30.0 (WASM 빌드) | 브라우저에서 ONNX 모델 실행 | MIT | `vendor/onnxruntime-web/`, `vendor/onnxruntime-web/LICENSE` |

- `vendor/basic-pitch.bundle.js` 는 `scripts/build-vendor.mjs` 로 위 패키지들을 esbuild 로 묶은 결과물입니다(원본 소스는 수정하지 않았고, 사용하지 않는 tfjs 모듈만 제외).
- `vendor/transkun/*.onnx` 는 `scripts/transkun/export_onnx.py` 로 원본 PyTorch 가중치를 변환한 것입니다(모델 구조는 그대로. 파일 크기를 절반으로 줄이려고 가중치를 float16 으로 저장하고 불러올 때 float32 로 되돌리므로 정밀도가 약간 낮아짐 — 정확도 영향은 docs/benchmarks.md 에서 원본 PyTorch 결과와 비교). 후처리 코드(`js/analysis/transkun.js`)는 원본 파이썬 코드를 옮긴 것입니다.
- 평가에만 쓰고 저장소에는 넣지 않은 자료: [MAESTRO v3](https://magenta.tensorflow.org/datasets/maestro) (CC BY-NC-SA 4.0, `scripts/eval/fetch_maestro.py` 로 필요할 때 받음), [MusicXML 3.1 XSD](https://github.com/w3c/musicxml) (`scripts/validate.mjs` 가 필요할 때 받음), 파이썬 [mir_eval](https://github.com/craffel/mir_eval) (MIT, 채점 교차 검증용 픽스처 생성에만 사용).
- 예시 곡 「환희의 송가」는 베토벤(1770–1827)의 작품으로 저작권이 만료되었으며, 오디오는 앱 안의 합성기로 그때그때 만들어집니다.
