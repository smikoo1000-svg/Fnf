// 엔진 비교 벤치마크: 이번 업데이트 이전 기본 엔진(범용 AI = Spotify Basic Pitch)과 내장 엔진을,
// scripts/eval/bench.mjs 와 같은 곡·같은 잡음(같은 난수 씨앗)·같은 채점으로 돌린다. (Transkun 결과와 나란히 비교)
//
// 준비: npm install --no-save @spotify/basic-pitch@1.0.1   (Node 용 tfjs 포함, CPU 로 실행)
// 실행: node scripts/eval/bench-engines.mjs --pieces 3,7,11 --secs 45 [--noise white|pink --snr DB] --out FILE
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { transcriptionReport } from '../../js/eval/metrics.js';
import { parseMidiFile } from '../../js/eval/midi-read.js';
import { addNoise } from '../../js/eval/noise.js';
import { readWav, toMono22k } from '../../js/eval/wav.js';
import { transcribeDsp } from '../../js/analysis/transcribe.js';
import { pruneHarmonicGhosts } from '../../js/analysis/note-filters.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') ? [...a, [x.slice(2), arr[i + 1]]] : a), []));
const subset = JSON.parse(fs.readFileSync(path.join(root, 'scripts/eval/maestro-subset.json'), 'utf8'));
const pick = String(args.pieces ?? '3,7,11').split(',').map(Number);
const secs = Number(args.secs ?? 45);
const dataDir = path.join(root, 'data/maestro');

// Basic Pitch (앱의 js/analysis/ml-engine.js 와 같은 임계값·후처리)
const require = createRequire(import.meta.url);
const bpDir = path.dirname(require.resolve('@spotify/basic-pitch/package.json'));
const bp = require('@spotify/basic-pitch');
const tf = createRequire(path.join(bpDir, 'package.json'))('@tensorflow/tfjs');
await tf.setBackend('cpu');
const modelJson = JSON.parse(fs.readFileSync(path.join(root, 'vendor/basic-pitch-model/model.json'), 'utf8'));
const weights = fs.readFileSync(path.join(root, 'vendor/basic-pitch-model', modelJson.weightsManifest[0].paths[0]));
const model = tf.loadGraphModel({
  load: async () => ({
    modelTopology: modelJson.modelTopology,
    weightSpecs: modelJson.weightsManifest[0].weights,
    weightData: weights.buffer.slice(weights.byteOffset, weights.byteOffset + weights.byteLength),
    format: modelJson.format,
    generatedBy: modelJson.generatedBy,
    convertedBy: modelJson.convertedBy,
  }),
});
const basicPitch = new bp.BasicPitch(model);
const FRAME_SEC = (22050 * 2 - 256 - 30 * 256) / 22050 / 142;

async function runBasicPitch(samples) {
  const frames = [];
  const onsets = [];
  await basicPitch.evaluateModel(samples, (f, o) => (frames.push(...f), onsets.push(...o)), () => {});
  const ev = bp.outputToNotesPoly(frames, onsets, 0.6, 0.4, Math.max(4, Math.round(0.1 / FRAME_SEC)), true, null, null, true);
  const notes = ev.map((n) => ({ start: n.startFrame * FRAME_SEC, end: (n.startFrame + n.durationFrames) * FRAME_SEC, pitch: n.pitchMidi, amplitude: n.amplitude }));
  return pruneHarmonicGhosts(notes.map((n) => ({ ...n, midi: n.pitch })), (n) => n.amplitude);
}

const inWindow = (ns) => ns.filter((n) => n.start < secs - 1 && n.end < secs - 0.05);
const results = [];
for (const idx of pick) {
  const piece = subset[idx];
  let channels = readWav(path.join(dataDir, piece.id + '.wav')).map((c) => c.slice(0, secs * 44100));
  if (args.noise) channels = addNoise(channels, Number(args.snr), args.noise, 1000 + idx); // bench.mjs 와 같은 씨앗
  const mono = toMono22k(channels);
  const gt = inWindow(parseMidiFile(new Uint8Array(fs.readFileSync(path.join(dataDir, piece.id + '.midi')))).notes);
  const row = { idx, title: `${piece.composer} — ${piece.title}` };
  const bpNotes = await runBasicPitch(mono);
  row.basicPitch = transcriptionReport(gt, inWindow(bpNotes));
  const dsp = transcribeDsp(mono, 22050).notes.map((n) => ({ start: n.start, end: n.end, pitch: n.midi }));
  row.dsp = transcriptionReport(gt, inWindow(dsp));
  results.push(row);
  console.log(`[${idx}] ${row.title.slice(0, 40).padEnd(40)} Basic Pitch onset F1 ${row.basicPitch.onset.f1.toFixed(4)} · 내장 ${row.dsp.onset.f1.toFixed(4)}`);
}
const mean = (f) => results.reduce((a, r) => a + f(r), 0) / results.length;
const summary = {
  basicPitch: { onsetF1: mean((r) => r.basicPitch.onset.f1), onsetOffsetF1: mean((r) => r.basicPitch.onsetOffset.f1) },
  dsp: { onsetF1: mean((r) => r.dsp.onset.f1), onsetOffsetF1: mean((r) => r.dsp.onsetOffset.f1) },
  config: { secs, noise: args.noise ?? null, snr: args.snr != null ? Number(args.snr) : null },
};
console.log(JSON.stringify(summary));
if (args.out) fs.writeFileSync(args.out, JSON.stringify({ summary, results }, null, 1));
