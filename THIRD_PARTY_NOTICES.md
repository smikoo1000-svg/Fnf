# 서드파티 고지

이 저장소는 아래 오픈소스를 포함(vendored)합니다. 각 라이선스 전문은 `vendor/` 폴더의 해당 파일에 있습니다.

| 구성요소 | 용도 | 라이선스 | 위치 |
| --- | --- | --- | --- |
| [Basic Pitch](https://github.com/spotify/basic-pitch) 1.0.1 (Spotify) — 코드와 학습된 모델 | 음 분석(AI 엔진) | Apache-2.0 | `vendor/basic-pitch.bundle.js`, `vendor/basic-pitch-model/`, `vendor/BASIC-PITCH-LICENSE` |
| [TensorFlow.js](https://github.com/tensorflow/tfjs) 3.21 (Google) — core / converter / cpu·webgl 백엔드 | 모델 실행 | Apache-2.0 | `vendor/basic-pitch.bundle.js` 에 번들됨 (라이선스 문구는 파일 끝 주석에 포함) |
| [VexFlow](https://github.com/vexflow/vexflow) 5.0.0 (Bravura 글리프 포함 빌드) | 악보 그리기 | MIT | `vendor/vexflow-bravura.js`, `vendor/VEXFLOW-LICENSE` |

- `vendor/basic-pitch.bundle.js` 는 `scripts/build-vendor.mjs` 로 위 패키지들을 esbuild 로 묶은 결과물입니다(원본 소스는 수정하지 않았고, 사용하지 않는 tfjs 모듈만 제외).
- 예시 곡 「환희의 송가」는 베토벤(1770–1827)의 작품으로 저작권이 만료되었으며, 오디오는 앱 안의 합성기로 그때그때 만들어집니다.
