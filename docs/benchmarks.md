# 벤치마크 결과

자동 생성 문서입니다 (`node scripts/eval/report.mjs`). 원자료는 같은 폴더의 JSON 파일에 있습니다.

- 채점: mir_eval 0.8 과 같은 규칙(`js/eval/metrics.js`, 파이썬 mir_eval 과 교차 검증). onset 허용 ±50ms, offset 허용 max(50ms, 음길이×20%).
- "건반 기준" offset = 건반을 뗀 시각, "페달 연장" = 서스테인 페달을 뗄 때까지 연장한 시각(MAESTRO 논문들의 표준 채점).
- 곡별 F1 의 단순 평균입니다. 데이터: MAESTRO v3 **테스트 세트 13곡(44분)** — 전체 테스트 세트(177곡)가 아니며, 같은 곡(슈베르트 즉흥곡 Op.90-4)의 다른 연주가 5개 들어 있습니다.

## 1. 피아노 전용 엔진 (Transkun v2, 브라우저용 JS/ONNX 이식본)

| 곡 | 길이(초) | onset F1 | onset+offset F1 (건반) | onset+offset F1 (페달 연장) | PyTorch 원본 onset / on+off(페달) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Franz Liszt — Concert Etude No. 2, "Gnomenreigen", S. 145/2 | 156 | 97.48 | 94.14 | 93.07 | 97.48 / 93.07 |
| Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 404 | 98.45 | 81.87 | 86.15 | 98.45 / 86.20 |
| Joseph Haydn — Sonata in G Major, Hob. XVI:6, First Movement | 188 | 99.44 | 94.71 | 95.03 | 99.44 / 95.03 |
| Domenico Scarlatti — Sonata K. 525 | 67 | 98.85 | 93.81 | 94.27 | 98.85 / 94.27 |
| Domenico Scarlatti — Sonata in D Minor, K. 9 L. 413 | 97 | 99.71 | 95.63 | 98.66 | 99.71 / 98.66 |
| Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 344 | 98.09 | 79.68 | 94.95 | 98.08 / 94.94 |
| Frédéric Chopin — Etudes Op. 10 Nos. 9 | 126 | 98.87 | 81.99 | 92.68 | 98.87 / 92.85 |
| Sergei Rachmaninoff — Prelude Op. 32 No. 8 in A Minor | 111 | 99.21 | 92.52 | 95.32 | 99.21 / 95.25 |
| Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 115 | 99.15 | 77.97 | 95.29 | 99.15 / 95.29 |
| Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 355 | 99.24 | 83.39 | 96.12 | 99.24 / 96.12 |
| Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 369 | 99.36 | 85.05 | 96.52 | 99.38 / 96.53 |
| Claude Debussy — Etude No. 7 "Study in Chromatic Steps" | 135 | 99.02 | 90.03 | 91.36 | 99.02 / 91.36 |
| Wolfgang Amadeus Mozart — Sonata in F Major, K. 280, 1st mov. | 194 | 99.84 | 91.03 | 96.17 | 99.84 / 96.17 |
| **곡 평균** | 2662 | **98.98** | **87.83** | **94.28** | |

처리 속도: 실시간의 1.43배 (Node + onnxruntime-web WASM 4스레드, 이 개발 환경 CPU. 다른 작업과 CPU 를 나눠 쓴 상태로 측정).

참고: 같은 모델의 논문 보고치(MAESTRO 전체 테스트 세트)는 onset F1 98.32%, onset+offset F1 93.48% 입니다 (arXiv:2605.17405 의 표 인용).

## 2. 잡음 강건성 — 곡 평균 onset F1 (3곡 × 앞 45초: 스카를라티 K.525, 라흐마니노프 Op.32-8, 드뷔시 연습곡 7번)

같은 곡·같은 잡음(같은 난수 씨앗)·같은 채점. "이전 기본 엔진"은 이번 업데이트 전 앱의 기본값이던 범용 AI(Basic Pitch)입니다.

| 조건 | 피아노 전용 AI (새 기본) | + 잡음 제거 전처리 | 이전 기본 엔진 (Basic Pitch) | 내장 엔진 | 새 기본 − 이전 기본 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 깨끗한 원음 | 99.25 | 99.14 | 61.26 | 59.72 | +37.99 |
| 백색 잡음 SNR 20dB | 98.93 | 98.91 | 57.17 | 59.78 | +41.76 |
| 백색 잡음 SNR 10dB | 98.79 | 98.56 | 47.61 | 59.79 | +51.19 |
| 백색 잡음 SNR 0dB | 97.33 | 96.75 | 30.96 | 58.17 | +66.37 |
| 분홍 잡음 SNR 20dB | 98.93 | 98.81 | 55.03 | 59.62 | +43.90 |
| 분홍 잡음 SNR 10dB | 98.66 | 98.12 | 44.13 | 58.86 | +54.53 |
| 분홍 잡음 SNR 0dB | 92.47 | 90.99 | 21.51 | 51.93 | +70.96 |

onset+offset F1(건반 기준)도 같은 JSON 에 있습니다. 잡음 제거 전처리(`js/eval/denoise.js`)는 모든 조건에서 피아노 전용 AI 의 정확도를 낮춰 앱에 넣지 않았습니다.

## 3. 검증 루프 (메타 검증 · MusicXML 3.1 XSD · LilyPond 컴파일)

입력: 합성 곡 2개 + MAESTRO 정답 MIDI 13곡을 앱과 같은 경로(비트 추적 → 조성 → 악보 → 운지)로 악보화.

| 입력 | 마디 | 메타 오류 | 메타 경고 | XSD | LilyPond |
| --- | ---: | ---: | ---: | --- | --- |
| 합성: 환희의 송가 | 8 | 0 | 1 | ok | ok |
| 합성: 같은 음 반복 | 2 | 0 | 0 | ok | ok |
| MAESTRO 정답: Franz Liszt — Concert Etude No. 2, "Gnomenreigen", S. 145/2 | 64 | 0 | 2 | ok | ok |
| MAESTRO 정답: Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 218 | 0 | 2 | ok | ok |
| MAESTRO 정답: Joseph Haydn — Sonata in G Major, Hob. XVI:6, First Movement | 131 | 0 | 1 | ok | ok |
| MAESTRO 정답: Domenico Scarlatti — Sonata K. 525 | 39 | 0 | 2 | ok | ok |
| MAESTRO 정답: Domenico Scarlatti — Sonata in D Minor, K. 9 L. 413 | 48 | 0 | 2 | ok | ok |
| MAESTRO 정답: Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 222 | 0 | 2 | ok | ok |
| MAESTRO 정답: Frédéric Chopin — Etudes Op. 10 Nos. 9 | 51 | 0 | 2 | ok | ok |
| MAESTRO 정답: Sergei Rachmaninoff — Prelude Op. 32 No. 8 in A Minor | 66 | 0 | 2 | ok | ok |
| MAESTRO 정답: Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 67 | 0 | 1 | ok | ok |
| MAESTRO 정답: Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 219 | 0 | 2 | ok | ok |
| MAESTRO 정답: Franz Schubert — Impromptu Op. 90 No. 4 in A-flat Major | 179 | 0 | 2 | ok | ok |
| MAESTRO 정답: Claude Debussy — Etude No. 7 "Study in Chromatic Steps" | 55 | 0 | 2 | ok | ok |
| MAESTRO 정답: Wolfgang Amadeus Mozart — Sonata in F Major, K. 280, 1st mov. | 112 | 0 | 2 | ok | ok |

가상 연주 대조(악보를 원래 시간축으로 되돌려 정답 음과 비교, ±70ms) F1: 최소 88.4%, 평균 98.1%.
