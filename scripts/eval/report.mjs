// docs/benchmarks/*.json → docs/benchmarks.md (사람이 읽는 표)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const B = path.join(root, 'docs/benchmarks');
const read = (f) => (fs.existsSync(path.join(B, f)) ? JSON.parse(fs.readFileSync(path.join(B, f), 'utf8')) : null);
const pct = (x) => (x == null ? '—' : (x * 100).toFixed(2));
const out = [];
const w = (s = '') => out.push(s);

w('# 벤치마크 결과');
w();
w('자동 생성 문서입니다 (`node scripts/eval/report.mjs`). 원자료는 같은 폴더의 JSON 파일에 있습니다.');
w();
w('- 채점: mir_eval 0.8 과 같은 규칙(`js/eval/metrics.js`, 파이썬 mir_eval 과 교차 검증). onset 허용 ±50ms, offset 허용 max(50ms, 음길이×20%).');
w('- "건반 기준" offset = 건반을 뗀 시각, "페달 연장" = 서스테인 페달을 뗄 때까지 연장한 시각(MAESTRO 논문들의 표준 채점).');
w('- 곡별 F1 의 단순 평균입니다. 데이터: MAESTRO v3 **테스트 세트 13곡(44분)** — 전체 테스트 세트(177곡)가 아니며, 같은 곡(슈베르트 즉흥곡 Op.90-4)의 다른 연주가 5개 들어 있습니다.');
w();

const clean = read('maestro-clean.json');
const ref = read('pytorch-reference.json');
if (clean) {
  w('## 1. 피아노 전용 엔진 (Transkun v2, 브라우저용 JS/ONNX 이식본)');
  w();
  w('| 곡 | 길이(초) | onset F1 | onset+offset F1 (건반) | onset+offset F1 (페달 연장) | PyTorch 원본 onset / on+off(페달) |');
  w('| --- | ---: | ---: | ---: | ---: | ---: |');
  for (const r of clean.results) {
    const p = ref?.results?.[r.id];
    w(`| ${r.title} | ${r.dur.toFixed(0)} | ${pct(r.key.onset.f1)} | ${pct(r.key.onsetOffset.f1)} | ${pct(r.pedalExtended.onsetOffset.f1)} | ${p ? `${pct(p.onsetF1)} / ${pct(p.onsetOffsetF1PedalExtended)}` : '—'} |`);
  }
  const s = clean.summary;
  w(`| **곡 평균** | ${(s.audioMinutes * 60).toFixed(0)} | **${pct(s.onsetF1)}** | **${pct(s.onsetOffsetF1)}** | **${pct(s.onsetOffsetF1PedalExtended)}** | |`);
  w();
  w(`처리 속도: 실시간의 ${s.realTimeFactor.toFixed(2)}배 (Node + onnxruntime-web WASM ${s.config.threads}스레드, 이 개발 환경 CPU. 다른 작업과 CPU 를 나눠 쓴 상태로 측정).`);
  w();
  w('참고: 같은 모델의 논문 보고치(MAESTRO 전체 테스트 세트)는 onset F1 98.32%, onset+offset F1 93.48% 입니다 (arXiv:2605.17405 의 표 인용).');
  w();
}

const noiseDir = path.join(B, 'noise');
if (fs.existsSync(noiseDir)) {
  const get = (f) => (fs.existsSync(path.join(noiseDir, f)) ? JSON.parse(fs.readFileSync(path.join(noiseDir, f), 'utf8')).summary : null);
  w('## 2. 잡음 강건성 — 곡 평균 onset F1 (3곡 × 앞 45초: 스카를라티 K.525, 라흐마니노프 Op.32-8, 드뷔시 연습곡 7번)');
  w();
  w('같은 곡·같은 잡음(같은 난수 씨앗)·같은 채점. "이전 기본 엔진"은 이번 업데이트 전 앱의 기본값이던 범용 AI(Basic Pitch)입니다.');
  w();
  w('| 조건 | 피아노 전용 AI (새 기본) | + 잡음 제거 전처리 | 이전 기본 엔진 (Basic Pitch) | 내장 엔진 | 새 기본 − 이전 기본 |');
  w('| --- | ---: | ---: | ---: | ---: | ---: |');
  const rows = [['clean', '깨끗한 원음']];
  for (const n of ['white', 'pink']) for (const snr of [20, 10, 0]) rows.push([`${n}-${snr}`, `${n === 'white' ? '백색' : '분홍'} 잡음 SNR ${snr}dB`]);
  for (const [f, label] of rows) {
    const a = get(`${f}.json`);
    const d = get(`${f}-denoise.json`);
    const e = get(`engines-${f}.json`);
    if (!a && !e) continue;
    const diff = a && e ? `${a.onsetF1 >= e.basicPitch.onsetF1 ? '+' : ''}${((a.onsetF1 - e.basicPitch.onsetF1) * 100).toFixed(2)}` : '—';
    w(`| ${label} | ${pct(a?.onsetF1)} | ${pct(d?.onsetF1)} | ${pct(e?.basicPitch.onsetF1)} | ${pct(e?.dsp.onsetF1)} | ${diff} |`);
  }
  w();
  w('onset+offset F1(건반 기준)도 같은 JSON 에 있습니다. 잡음 제거 전처리(`js/eval/denoise.js`)는 모든 조건에서 피아노 전용 AI 의 정확도를 낮춰 앱에 넣지 않았습니다.');
  w();
}

const val = read('validation.json');
if (val) {
  w('## 3. 검증 루프 (메타 검증 · MusicXML 3.1 XSD · LilyPond 컴파일)');
  w();
  w('입력: 합성 곡 2개 + MAESTRO 정답 MIDI 13곡을 앱과 같은 경로(비트 추적 → 조성 → 악보 → 운지)로 악보화.');
  w();
  w('| 입력 | 마디 | 메타 오류 | 메타 경고 | XSD | LilyPond |');
  w('| --- | ---: | ---: | ---: | --- | --- |');
  for (const r of val) w(`| ${r.name} | ${r.measures} | ${r.meta.errors} | ${r.meta.warnings} | ${r.xsd} | ${r.lilypond}${r.barcheckFailures ? ` (마디 검사 실패 ${r.barcheckFailures})` : ''} |`);
  w();
  const vw = val.flatMap((r) => r.meta.checks.filter((c) => c.stage === '가상 연주').map((c) => Number(c.detail.match(/F1 ([\d.]+)/)?.[1])));
  if (vw.length) w(`가상 연주 대조(악보를 원래 시간축으로 되돌려 정답 음과 비교, ±70ms) F1: 최소 ${Math.min(...vw).toFixed(1)}%, 평균 ${(vw.reduce((a, b) => a + b, 0) / vw.length).toFixed(1)}%.`);
  w();
}

fs.writeFileSync(path.join(root, 'docs/benchmarks.md'), out.join('\n'));
console.log('docs/benchmarks.md 작성');
