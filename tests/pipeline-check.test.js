import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPipeline, parseXml } from '../js/validate/pipeline-check.js';
import { buildScore, TIME_SIGNATURES } from '../js/music/score.js';
import { applyFingering } from '../js/music/fingering.js';
import { BeatGrid } from '../js/analysis/rhythm.js';
import { odeToJoy } from './helpers/pieces.js';

const grid = new BeatGrid(Float64Array.from({ length: 300 }, (_, i) => 0.1 + i * 0.6)); // 100BPM, 0.1초부터
function sample() {
  const piece = odeToJoy({ bpm: 100 });
  const notes = piece.truth.map((n) => ({ start: n.start, end: n.start + n.dur, midi: n.midi, velocity: 80 }));
  // 꾸밈음·트릴·5음 화음(음 수 제한 대상)·약한 음도 섞는다
  notes.push({ start: 2.45, end: 2.48, midi: 77, velocity: 70 }); // 2.5초 G5(79) 앞 앞꾸밈음
  for (let i = 0; i < 8; i++) notes.push({ start: 9.7 + i * 0.07, end: 9.76 + i * 0.07, midi: i % 2 ? 91 : 89, velocity: 70 });
  for (const m of [36, 40, 43, 47, 50, 53]) notes.push({ start: 12.1, end: 13.2, midi: m, velocity: 60 });
  notes.push({ start: 5.0, end: 5.2, midi: 100, velocity: 10 });
  const pedals = [{ start: 0.1, end: 2.3 }, { start: 2.5, end: 4.6 }];
  return { notes, pedals };
}
function build(opts = {}) {
  const { notes, pedals } = sample();
  const score = buildScore(notes, grid, { timeSig: TIME_SIGNATURES['4/4'], phase: 0, pedals, minVelocity: 20, ...opts });
  applyFingering(score);
  score.showFingering = true;
  return { notes, score };
}

test('메타 검증: 정상 파이프라인은 오류 0 (꾸밈음·트릴·페달·운지·화음 제한 포함)', () => {
  const { notes, score } = build();
  assert.ok(score.ornaments.some((o) => o.type === 'trill') && score.ornaments.some((o) => o.type === 'grace'));
  assert.ok(score.stats.chordCapped > 0 && score.stats.velocityFiltered === 1);
  const r = checkPipeline({ transcribed: notes, score, grid, minVelocity: 20 });
  const errs = r.checks.filter((c) => c.status === 'error');
  assert.equal(r.errors, 0, JSON.stringify(errs));
  const byName = Object.fromEntries(r.checks.map((c) => [c.name, c]));
  assert.equal(byName['음 보존'].status, 'warn'); // 화음 음 수 제한으로 뺀 음이 있어 경고
  assert.match(byName['음 보존'].detail, /화음 음 수 제한/);
  for (const c of r.checks.filter((c) => c.stage === 'MIDI' || c.stage === 'MusicXML')) assert.equal(c.status, 'ok', c.detail);
  assert.equal(r.checks.find((c) => c.stage === '가상 연주').status, 'ok');
});

test('메타 검증: 마디 길이가 깨지면 오류로 잡는다', () => {
  const { notes, score } = build();
  score.measures[1].treble[0].dur += 1;
  const r = checkPipeline({ transcribed: notes, score, grid, minVelocity: 20 });
  assert.equal(r.checks.find((c) => c.name === '마디 길이').status, 'error');
});

test('메타 검증: 악보에서 음이 사라지면 "음 보존" 오류로 잡는다 (조용한 누락 방지)', () => {
  const { notes, score } = build();
  const p = score.measures[2].treble.find((x) => !x.rest && x.midis.length);
  p.midis = p.midis.slice(1).length ? p.midis.slice(1) : p.midis; // 음 하나를 조용히 뺀다
  if (p.midis.length === 0 || p.midis.length === score.measures[2].treble.find((x) => x === p).midis.length) p.rest = true;
  const r = checkPipeline({ transcribed: notes, score, grid, minVelocity: 20 });
  assert.equal(r.checks.find((c) => c.name === '음 보존').status, 'error');
});

test('메타 검증: 16분음표 음형을 8분음표 단위로 뭉개면 가상 연주 대조에서 경고한다', () => {
  const run = Array.from({ length: 16 }, (_, i) => ({ start: 0.1 + i * 0.15, end: 0.23 + i * 0.15, midi: 72 + (i % 5), velocity: 80 }));
  const opts = { timeSig: TIME_SIGNATURES['4/4'], phase: 0 };
  const fine = checkPipeline({ transcribed: run, score: buildScore(run, grid, { ...opts, quantum: 1 }), grid });
  const coarse = checkPipeline({ transcribed: run, score: buildScore(run, grid, { ...opts, quantum: 2 }), grid });
  const v = (r) => r.checks.find((c) => c.stage === '가상 연주');
  assert.equal(v(fine).status, 'ok', v(fine).detail);
  assert.equal(v(coarse).status, 'warn', v(coarse).detail);
});

test('XML 파서: 태그 짝이 틀리면 예외', () => {
  assert.equal(parseXml('<a><b x="1">t</b><c/></a>').children[0].children.length, 2);
  assert.throws(() => parseXml('<a><b></a></b>'));
  assert.throws(() => parseXml('<a>'));
});
