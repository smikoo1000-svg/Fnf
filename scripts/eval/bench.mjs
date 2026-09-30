// 전사 벤치마크: 실제 배포되는 JS 엔진(js/analysis/transkun.js + vendor 모델)을 Node 에서 돌려 MAESTRO 정답과 비교한다.
//
// 준비:  python scripts/eval/fetch_maestro.py          (data/maestro 에 곡 저장)
//        npm install                                   (onnxruntime-web)
// 실행:  node scripts/eval/bench.mjs [옵션]
//   --data DIR        기본 data/maestro
//   --pieces 0,3,5    곡 번호(maestro-subset.json 순서), 기본 전체
//   --secs N          곡마다 앞 N초만 사용 (기본 전체)
//   --noise white|pink --snr DB   잡음 섞기
//   --denoise         잡음 제거 전처리 적용 (js/eval/denoise.js, 실험용)
//   --step S          구간 이동 간격(초, 기본 8 = 원본 설정)
//   --pedal-bonus B   페달 구간 보너스 (기본: 앱과 같은 값 TK_PEDAL_BONUS, 0 = 원본 디코딩)
//   --threads N       WASM 스레드 수 (기본 4)
//   --out FILE        결과 JSON 저장
//   --save DIR        곡별 전사 결과(음·페달) 저장
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ort from 'onnxruntime-web';
import { transkunTranscribe, TK_PEDAL_BONUS } from '../../js/analysis/transkun.js';
import { transcriptionReport, extendByPedal } from '../../js/eval/metrics.js';
import { parseMidiFile } from '../../js/eval/midi-read.js';
import { addNoise } from '../../js/eval/noise.js';
import { denoise } from '../../js/eval/denoise.js';
import { readWav } from '../../js/eval/wav.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]?.startsWith('--') || arr[i + 1] === undefined ? true : arr[i + 1]]] : acc), []),
);
const dataDir = path.resolve(args.data ?? path.join(root, 'data/maestro'));
const subset = JSON.parse(fs.readFileSync(path.join(root, 'scripts/eval/maestro-subset.json'), 'utf8'));
const pick = args.pieces ? String(args.pieces).split(',').map(Number) : subset.map((_, i) => i);
const secs = args.secs ? Number(args.secs) : 0;
ort.env.wasm.numThreads = Number(args.threads ?? 4);
const pedalBonus = args['pedal-bonus'] != null ? Number(args['pedal-bonus']) : TK_PEDAL_BONUS;

/** 잘라 낸 구간 평가: 구간 끝 근처(1초)에서 시작하거나 끝나는 음은 양쪽에서 제외 */
function inWindow(notes, limit) {
  return limit ? notes.filter((n) => n.start < limit - 1 && n.end < limit - 0.05) : notes;
}

const core = await ort.InferenceSession.create(path.join(root, 'vendor/transkun/tk_core.onnx'), { executionProviders: ['wasm'] });
const attr = await ort.InferenceSession.create(path.join(root, 'vendor/transkun/tk_attr.onnx'), { executionProviders: ['wasm'] });
const results = [];
for (const idx of pick) {
  const piece = subset[idx];
  let channels = readWav(path.join(dataDir, piece.id + '.wav'));
  if (secs) channels = channels.map((c) => c.slice(0, secs * 44100));
  if (args.noise) channels = addNoise(channels, Number(args.snr), args.noise, 1000 + idx);
  if (args.denoise) channels = channels.map((c) => denoise(c).signal);
  const gt = parseMidiFile(new Uint8Array(fs.readFileSync(path.join(dataDir, piece.id + '.midi'))));
  const t0 = performance.now();
  const r = await transkunTranscribe(channels, { ort, core, attr }, { stepSec: Number(args.step ?? 8), pedalBonus });
  const sec = (performance.now() - t0) / 1000;
  const dur = channels[0].length / 44100;
  const limit = secs || 0;
  const key = transcriptionReport(inWindow(gt.notes, limit), inWindow(r.notes, limit));
  const sustain = r.pedals.filter((p) => p.pitch === -64); // 소프트 페달(-67)은 음 길이에 영향 없음
  const ped = transcriptionReport(inWindow(extendByPedal(gt.notes, gt.sustain), limit), inWindow(extendByPedal(r.notes, sustain), limit));
  if (args.save) fs.writeFileSync(path.join(args.save, `${piece.id}.json`), JSON.stringify(r));
  const row = { idx, id: piece.id, title: `${piece.composer} — ${piece.title}`, dur, sec, rtf: sec / dur, key, pedalExtended: ped };
  results.push(row);
  console.log(
    `[${idx}] ${row.title.slice(0, 48).padEnd(48)} ${dur.toFixed(0).padStart(4)}s  onset F1 ${key.onset.f1.toFixed(4)}  on+off F1 ${key.onsetOffset.f1.toFixed(4)}  (페달연장 ${ped.onsetOffset.f1.toFixed(4)})  처리 ${sec.toFixed(0)}s`,
  );
}
const mean = (f) => results.reduce((a, r) => a + f(r), 0) / results.length;
const summary = {
  pieces: results.length,
  audioMinutes: results.reduce((a, r) => a + r.dur, 0) / 60,
  onsetF1: mean((r) => r.key.onset.f1),
  onsetOffsetF1: mean((r) => r.key.onsetOffset.f1),
  onsetOffsetF1PedalExtended: mean((r) => r.pedalExtended.onsetOffset.f1),
  onsetPrecision: mean((r) => r.key.onset.precision),
  onsetRecall: mean((r) => r.key.onset.recall),
  realTimeFactor: results.reduce((a, r) => a + r.sec, 0) / results.reduce((a, r) => a + r.dur, 0),
  config: { secs, noise: args.noise ?? null, snr: args.snr ? Number(args.snr) : null, denoise: !!args.denoise, step: Number(args.step ?? 8), pedalBonus, threads: ort.env.wasm.numThreads },
};
console.log('\n곡 평균:', JSON.stringify(summary, null, 1));
if (args.out) fs.writeFileSync(args.out, JSON.stringify({ summary, results }, null, 1));
