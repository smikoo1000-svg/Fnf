// 페달 구간 보너스(transkunTranscribe 의 pedalBonus) 값 조정.
// 신경망은 곡마다 한 번만 돌리고(서스테인 페달 출력만 캐시), 디코딩만 여러 보너스 값으로 다시 한다.
// 평가곡(테스트 세트, maestro-subset.json)이 아니라 검증 세트 곡(maestro-tune.json)으로 값을 고른다.
//
// 실행: node scripts/eval/tune-pedal.mjs [--list scripts/eval/maestro-tune.json] [--bonus 0,0.5,1,2] [--out FILE]
//   캐시: data/maestro/<곡>.pedcache.bin / .pedcache.json / .notes.json  (첫 실행 때 만든다)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ort from 'onnxruntime-web';
import { transkunTranscribe } from '../../js/analysis/transkun.js';
import { transcriptionReport, extendByPedal } from '../../js/eval/metrics.js';
import { parseMidiFile } from '../../js/eval/midi-read.js';
import { readWav } from '../../js/eval/wav.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') ? [...a, [x.slice(2), arr[i + 1]]] : a), []));
const list = JSON.parse(fs.readFileSync(path.resolve(args.list ?? path.join(root, 'scripts/eval/maestro-tune.json')), 'utf8'));
const bonuses = String(args.bonus ?? '0,0.25,0.5,1,1.5,2,3').split(',').map(Number);
const dataDir = path.join(root, 'data/maestro');
const CTX = 256;
const PEDAL_SYMS = 2; // 기호 0 = 서스테인, 1 = 소프트
ort.env.wasm.numThreads = Number(args.threads ?? 4);

const core = await ort.InferenceSession.create(path.join(root, 'vendor/transkun/tk_core.onnx'), { executionProviders: ['wasm'] });
const attr = await ort.InferenceSession.create(path.join(root, 'vendor/transkun/tk_attr.onnx'), { executionProviders: ['wasm'] });

/** 실제 신경망을 돌리면서 페달 기호의 출력만 저장 */
async function buildCache(piece, channels) {
  const segs = [];
  const recorder = {
    run: async (feeds) => {
      const out = await core.run(feeds);
      const T = feeds.frames.dims[1];
      const idx = out.posIdx.data;
      const val = out.posVal.data;
      const keep = [];
      for (let k = 0; k < val.length; k++) if (Number(idx[3 * k + 2]) < PEDAL_SYMS) keep.push(k);
      segs.push({
        T,
        idx: Int32Array.from(keep.flatMap((k) => [Number(idx[3 * k]), Number(idx[3 * k + 1]), Number(idx[3 * k + 2])])),
        val: Float32Array.from(keep.map((k) => val[k])),
        ctx: out.ctx.data.slice(0, PEDAL_SYMS * T * CTX),
      });
      return out;
    },
  };
  const r = await transkunTranscribe(channels, { ort, core: recorder, attr });
  const bufs = [];
  const index = segs.map((s) => {
    const e = { T: s.T, nIv: s.val.length };
    bufs.push(Buffer.from(s.idx.buffer), Buffer.from(s.val.buffer), Buffer.from(s.ctx.buffer));
    return e;
  });
  const base = path.join(dataDir, piece.id);
  fs.writeFileSync(base + '.pedcache.bin', Buffer.concat(bufs));
  fs.writeFileSync(base + '.pedcache.json', JSON.stringify(index));
  fs.writeFileSync(base + '.notes.json', JSON.stringify(r.notes));
}

/** 캐시에서 신경망 출력을 되돌려 주는 가짜 core (페달 기호만 들어 있음) */
function replayCore(piece) {
  const base = path.join(dataDir, piece.id);
  const index = JSON.parse(fs.readFileSync(base + '.pedcache.json', 'utf8'));
  const bin = fs.readFileSync(base + '.pedcache.bin');
  const segs = [];
  let off = 0;
  const take = (Ctor, n) => {
    const a = new Ctor(bin.buffer.slice(bin.byteOffset + off, bin.byteOffset + off + n * 4));
    off += n * 4;
    return a;
  };
  for (const e of index) {
    const idx = take(Int32Array, 3 * e.nIv);
    const val = take(Float32Array, e.nIv);
    const ctx = take(Float32Array, PEDAL_SYMS * e.T * CTX);
    segs.push({ idx, val, ctx });
  }
  let i = 0;
  return { run: async () => ({ posIdx: { data: segs[i].idx }, posVal: { data: segs[i].val }, ctx: { data: segs[i++].ctx } }) };
}

const results = [];
for (const piece of list) {
  const wav = path.join(dataDir, piece.id + '.wav');
  if (!fs.existsSync(wav)) {
    console.log('없음(건너뜀):', piece.id);
    continue;
  }
  const channels = readWav(wav);
  if (!fs.existsSync(path.join(dataDir, piece.id + '.pedcache.json'))) {
    const t0 = performance.now();
    await buildCache(piece, channels);
    console.log(`캐시 작성 ${piece.id.slice(0, 40)} ${((performance.now() - t0) / 1000).toFixed(0)}s`);
  }
  const gt = parseMidiFile(new Uint8Array(fs.readFileSync(path.join(dataDir, piece.id + '.midi'))));
  const ref = extendByPedal(gt.notes, gt.sustain);
  const notes = JSON.parse(fs.readFileSync(path.join(dataDir, piece.id + '.notes.json'), 'utf8'));
  const row = { id: piece.id, title: `${piece.composer} — ${piece.title}`, f1: {}, nPedals: {}, nPedalsRef: gt.sustain.length };
  for (const b of bonuses) {
    const r = await transkunTranscribe(channels, { ort, core: replayCore(piece), attr }, { pedalBonus: b });
    const sustain = r.pedals.filter((p) => p.pitch === -64);
    row.f1[b] = transcriptionReport(ref, extendByPedal(notes, sustain)).onsetOffset.f1;
    row.nPedals[b] = sustain.length;
  }
  results.push(row);
  console.log(row.title.slice(0, 44).padEnd(44), bonuses.map((b) => `${b}:${(row.f1[b] * 100).toFixed(2)}(${row.nPedals[b]})`).join(' '), `정답 페달 ${row.nPedalsRef}`);
}
const mean = (b) => results.reduce((a, r) => a + r.f1[b], 0) / results.length;
console.log('\n곡 평균 onset+offset F1 (페달 연장):');
for (const b of bonuses) console.log(`  보너스 ${b}: ${(mean(b) * 100).toFixed(2)}`);
if (args.out) fs.writeFileSync(args.out, JSON.stringify({ bonuses, mean: Object.fromEntries(bonuses.map((b) => [b, mean(b)])), results }, null, 1));
