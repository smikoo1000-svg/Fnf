import test from 'node:test';
import assert from 'node:assert/strict';
import { routeOrnaments } from '../js/music/ornaments.js';
import { buildScore, TIME_SIGNATURES, performanceNotes } from '../js/music/score.js';
import { BeatGrid } from '../js/analysis/rhythm.js';

const grid = new BeatGrid(Float64Array.from({ length: 200 }, (_, i) => i * 0.5)); // 120BPM → 16분음표 0.125초
const SPU = 0.125;
const n = (midi, start, dur, velocity = 80) => ({ midi, start, end: start + dur, velocity });
const opts = { timeSig: TIME_SIGNATURES['4/4'], phase: 0 };

test('앞꾸밈음: 주음 50ms 앞에서 짧게 뗀 2도 음은 주음에 붙는다', () => {
  const notes = [n(72, 0, 0.45), n(74, 0.95, 0.04), n(76, 1.0, 0.45)];
  const r = routeOrnaments(notes, SPU);
  assert.equal(r.found.length, 1);
  assert.equal(r.found[0].type, 'grace');
  const main = r.notes.find((x) => x.midi === 76);
  assert.deepEqual(main.graces, [74]);
  assert.equal(r.notes.length, 2);
  // 악보: 꾸밈음이 16분음표 조각을 만들지 않고 주음의 첫 조각에 표시된다
  const s = buildScore(notes, grid, opts);
  const pieces = s.measures[0].treble.filter((p) => !p.rest);
  assert.deepEqual(pieces.map((p) => p.midis[0]), [72, 76]);
  assert.deepEqual(pieces[1].graces, [74]);
});

test('앞꾸밈음 사슬: 두 개의 꾸밈음(g1→g2→주음)을 순서대로 붙인다', () => {
  const r = routeOrnaments([n(71, 0.93, 0.03), n(74, 0.965, 0.03), n(76, 1.0, 0.5)], SPU);
  assert.deepEqual(r.notes.find((x) => x.midi === 76).graces, [71, 74]);
});

test('펼친화음(아래 음을 누르고 있음)은 꾸밈음으로 보지 않는다', () => {
  const chord = [n(60, 1.0, 1.0), n(64, 1.03, 0.97), n(67, 1.06, 0.94), n(72, 1.09, 0.91)];
  const r = routeOrnaments(chord, SPU);
  assert.equal(r.found.length, 0);
  assert.equal(r.notes.length, 4);
});

test('트릴: 두 음이 70ms 간격으로 번갈아 나오면 아래 음 하나 + tr 로 바뀐다', () => {
  const trill = [];
  for (let i = 0; i < 12; i++) trill.push(n(i % 2 ? 74 : 72, 2.0 + i * 0.07, 0.06));
  const r = routeOrnaments([n(67, 1.0, 0.9), ...trill, n(71, 3.0, 0.4)], SPU);
  assert.equal(r.found.filter((f) => f.type === 'trill').length, 1);
  const principal = r.notes.find((x) => x.ornament === 'trill');
  assert.equal(principal.midi, 72);
  assert.equal(principal.trillUpper, 74);
  assert.ok(Math.abs(principal.start - 2.0) < 1e-9 && Math.abs(principal.end - (2.0 + 11 * 0.07 + 0.06)) < 1e-9);
  assert.equal(r.notes.length, 3);
  // 연주용 음(MIDI·재생)으로 풀면 다시 두 음의 교대가 된다
  const s = buildScore([n(67, 1.0, 0.9), ...trill, n(71, 3.0, 0.4)], grid, opts);
  const piece = s.measures.flatMap((m) => m.treble).find((p) => p.ornament === 'trill');
  assert.ok(piece, '악보에 tr 표시가 있어야 함');
  const perf = performanceNotes(s).filter((x) => x.midi === 72 || x.midi === 74);
  assert.ok(perf.length >= 8, `트릴 교대음 ${perf.length}개`);
});

test('빠른 음계·같은 음 반복·보통 속도 교대는 꾸밈음/트릴로 보지 않는다', () => {
  const scale = Array.from({ length: 16 }, (_, i) => n(60 + [0, 2, 4, 5, 7, 9, 11, 12][i % 8] + 12 * Math.floor(i / 8), i * 0.06, 0.055));
  assert.equal(routeOrnaments(scale, SPU).found.length, 0, '32분음표 음계');
  const repeated = Array.from({ length: 8 }, (_, i) => n(64, i * 0.07, 0.06));
  assert.equal(routeOrnaments(repeated, SPU).found.length, 0, '같은 음 반복');
  const alberti = Array.from({ length: 8 }, (_, i) => n(i % 2 ? 62 : 60, i * 0.125, 0.12)); // 16분음표 속도 교대 = 적힌 음표
  assert.equal(routeOrnaments(alberti, SPU).found.length, 0, '16분음표 교대');
});

test('꾸밈음 라우팅을 끄면 음이 그대로 양자화된다', () => {
  const notes = [n(74, 0.95, 0.04), n(76, 1.0, 0.45)];
  const s = buildScore(notes, grid, { ...opts, ornaments: false });
  assert.equal(s.ornaments.length, 0);
  assert.equal(s.notes.length, 2);
});

import { scoreToMusicXml } from '../js/music/musicxml.js';

test('MusicXML: 앞꾸밈음은 <grace/>(음길이 없음), 트릴은 <trill-mark/> 로 기록되고 마디 길이는 그대로다', () => {
  const trill = Array.from({ length: 10 }, (_, i) => n(i % 2 ? 74 : 72, 2.0 + i * 0.07, 0.06));
  const s = buildScore([n(72, 0, 0.45), n(74, 0.95, 0.04), n(76, 1.0, 0.45), ...trill], grid, opts);
  const xml = scoreToMusicXml(s);
  assert.equal((xml.match(/<grace slash="yes"\/>/g) ?? []).length, 1);
  assert.equal((xml.match(/<trill-mark\/>/g) ?? []).length, 1);
  const grace = xml.match(/<note><grace[^]*?<\/note>/)[0];
  assert.ok(!grace.includes('<duration>'), '꾸밈음에는 duration 이 없어야 함');
  for (const m of xml.split('<measure ').slice(1)) {
    const [staff1] = m.split('<backup>');
    const sum = [...staff1.matchAll(/<note>.*?<\/note>/g)].filter((x) => !x[0].includes('<chord/>') && !x[0].includes('<grace')).reduce((a, x) => a + Number(x[0].match(/<duration>(\d+)<\/duration>/)[1]), 0);
    assert.equal(sum, 16);
  }
});

test('라우팅: 꾸밈음·트릴 감지 구간은 격자 대신 전사 모델의 원시 출력(음·시각)을 MIDI·재생에 쓴다', () => {
  // 120BPM(16분음표 = 0.125초) 격자에 맞지 않는 시각(70ms 간격)의 트릴과, 주음 40ms 앞 꾸밈음
  const trill = Array.from({ length: 12 }, (_, i) => n(i % 2 ? 74 : 72, 2.013 + i * 0.07, 0.06));
  const grace = n(79, 0.962, 0.03);
  const s = buildScore([n(72, 0, 0.45), grace, n(81, 1.0, 0.45), ...trill], grid, opts);
  const perf = performanceNotes(s); // 유닛(16분음표) 단위, 격자 0.125초
  const toSec = (u) => u * 0.125;
  // 트릴: 원시 12음이 그대로(시각 ±1ms) 나온다 — 격자에 맞춘 합성 교대음이 아니다
  const tr = perf.filter((x) => x.midi === 72 || x.midi === 74).filter((x) => toSec(x.start) >= 1.9);
  assert.equal(tr.length, 12);
  tr.forEach((x, i) => assert.ok(Math.abs(toSec(x.start) - (2.013 + i * 0.07)) < 1e-3, `트릴 ${i}: ${toSec(x.start)}`));
  // 꾸밈음: 원시 시각(0.962초) 그대로, 주음(81)은 격자(1.0초)에
  const g = perf.find((x) => x.midi === 79);
  assert.ok(Math.abs(toSec(g.start) - 0.962) < 1e-3, `꾸밈음 ${toSec(g.start)}`);
  assert.ok(Math.abs(toSec(perf.find((x) => x.midi === 81).start) - 1.0) < 1e-9);
  // 악보 표기는 여전히 tr·작은 음표로 단순화
  assert.ok(s.measures.flatMap((m) => m.treble).some((p) => p.ornament === 'trill'));
  assert.ok(s.measures.flatMap((m) => m.treble).some((p) => p.graces?.includes(79)));
});

test('라우팅: 원시 출력이 없는 악보(예: 직접 만든 악보)에서는 꾸밈음·트릴을 규칙대로 풀어 쓴다', () => {
  const trill = Array.from({ length: 12 }, (_, i) => n(i % 2 ? 74 : 72, 2.0 + i * 0.07, 0.06));
  const s = buildScore([n(72, 0, 0.45), ...trill], grid, opts);
  for (const x of s.notes) delete x.rawEvents;
  const perf = performanceNotes(s).filter((x) => x.midi === 72 || x.midi === 74);
  assert.ok(perf.length >= 8);
});
