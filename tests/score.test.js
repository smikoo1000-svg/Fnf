import test from 'node:test';
import assert from 'node:assert/strict';
import { buildScore, splitSpan, TIME_SIGNATURES, meterInfo } from '../js/music/score.js';
import { BeatGrid } from '../js/analysis/rhythm.js';
import { detectKey, keyFifths, keyNameKo, spellMidi } from '../js/analysis/key.js';

const grid120 = new BeatGrid(Float64Array.from({ length: 200 }, (_, i) => i * 0.5)); // 120 BPM, 0초부터
const note = (midi, startBeat, durBeats, velocity = 80) => ({ midi, start: startBeat * 0.5, end: (startBeat + durBeats) * 0.5, velocity });

function barsFilled(score, key) {
  return score.measures.every((m) => m[key].reduce((s, p) => s + p.dur, 0) === score.unitsPerBar);
}

test('splitSpan: 합법적 음가로만 분할하고 정렬 규칙을 지킨다', () => {
  assert.deepEqual(splitSpan(0, 16, 16), [{ pos: 0, dur: 16 }]);
  assert.deepEqual(splitSpan(0, 12, 16), [{ pos: 0, dur: 12 }]);
  // 온음표는 마디 중간에서 시작할 수 없다
  assert.deepEqual(splitSpan(4, 12, 16).map((p) => p.dur), [8, 4]);
  // 5유닛(16분 5개) = 4 + 1
  assert.deepEqual(splitSpan(0, 5, 16).map((p) => p.dur), [4, 1]);
  // 합계 보존
  for (let pos = 0; pos < 16; pos++) {
    for (let dur = 1; pos + dur <= 16; dur++) {
      const parts = splitSpan(pos, dur, 16);
      assert.equal(parts.reduce((s, p) => s + p.dur, 0), dur, `pos=${pos} dur=${dur}`);
      let t = pos;
      for (const p of parts) {
        assert.equal(p.pos, t);
        t += p.dur;
      }
    }
  }
});

test('splitSpan: 6/8에서는 박(점4분음표) 경계를 넘지 않는다', () => {
  const parts = splitSpan(4, 4, 12, true).map((p) => p.dur);
  assert.deepEqual(parts, [2, 2]);
  assert.deepEqual(splitSpan(0, 12, 12, true), [{ pos: 0, dur: 12 }]);
});

test('4/4 기본 악보: 마디가 정확히 채워지고 양손이 분리된다', () => {
  const notes = [note(72, 0, 1), note(74, 1, 1), note(76, 2, 2), note(48, 0, 4), note(55, 4, 2), note(60, 6, 2)];
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.equal(s.measures.length, 2);
  assert.ok(barsFilled(s, 'treble') && barsFilled(s, 'bass'));
  assert.deepEqual(s.measures[0].treble.map((p) => p.midis[0]), [72, 74, 76]);
  assert.deepEqual(s.measures[0].bass.map((p) => p.midis[0]), [48]);
  // 60(가온다)은 오른손
  assert.ok(s.measures[1].treble.some((p) => p.midis.includes(60)));
});

test('마디를 넘는 음은 붙임줄로 이어진다', () => {
  const s = buildScore([note(72, 2, 4)], grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  // 2박째 시작 4박 길이 → 마디1(2박) + 마디2(2박)
  const m0 = s.measures[0].treble.filter((p) => !p.rest);
  const m1 = s.measures[1].treble.filter((p) => !p.rest);
  assert.equal(m0.at(-1).tieNext, true);
  assert.equal(m1[0].tiePrev, true);
  assert.equal(m1.at(-1).tieNext, false);
});

test('쉼표가 마디를 채우고 위상(phase)이 마디 시작을 바꾼다', () => {
  const n = [note(72, 1, 1), note(74, 5, 1)];
  const a = buildScore(n, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 1 });
  // phase=1 → 첫 음이 마디 시작(1박)에 놓임
  assert.equal(a.measures[0].treble[0].rest, false);
  assert.equal(a.measures[0].treble[0].start, 0);
  const b = buildScore(n, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.equal(b.measures[0].treble[0].rest, true);
});

test('화음은 한 이벤트로 묶이고 최대 음 수를 넘지 않는다', () => {
  const chord = [60, 64, 67, 72, 76, 79].map((m, i) => note(m, 0, 2, 60 + i));
  const s = buildScore(chord, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0, maxChord: 4 });
  const first = s.measures[0].treble[0];
  assert.ok(first.midis.length <= 4);
  assert.ok(first.midis.includes(79), '최상음은 보존');
});

test('3/4, 2/4, 6/8 에서도 마디가 정확히 채워진다', () => {
  const notes = Array.from({ length: 30 }, (_, i) => note(60 + (i % 12), i * 0.5 + 0.03, 0.4));
  for (const ts of Object.values(TIME_SIGNATURES)) {
    const s = buildScore(notes, grid120, { timeSig: ts, phase: 0, quantum: 1 });
    assert.ok(barsFilled(s, 'treble') && barsFilled(s, 'bass'), ts.num + '/' + ts.den);
    assert.equal(s.unitsPerBar, meterInfo(ts).unitsPerBar);
  }
});

test('8분음표 양자화(quantum=2)는 홀수 유닛을 만들지 않는다', () => {
  const notes = Array.from({ length: 20 }, (_, i) => note(64, i * 0.37, 0.3));
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0, quantum: 2 });
  for (const m of s.measures) for (const p of m.treble) assert.equal(p.start % 2, 0);
});

test('빈 입력도 안전하게 처리한다', () => {
  const s = buildScore([], grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.equal(s.measures.length, 0);
});

test('조성 검출: C 장조 / A 단조 / 조표', () => {
  const mk = (pcs) => pcs.map((pc, i) => ({ midi: 60 + pc, start: i, end: i + 1, velocity: 80 }));
  const cMajor = mk([0, 0, 4, 7, 4, 0, 5, 9, 7, 4, 2, 0, 0, 4, 7, 11, 7, 0]);
  const k = detectKey(cMajor)[0];
  assert.equal(k.tonic, 0);
  assert.equal(k.mode, 'major');
  const aMinor = mk([9, 9, 0, 4, 0, 9, 11, 2, 4, 4, 8, 9, 9, 4, 0, 9]);
  const k2 = detectKey(aMinor)[0];
  assert.equal(k2.tonic, 9);
  assert.equal(k2.mode, 'minor');
  assert.equal(keyFifths(7, 'major'), 1); // G장조 #1
  assert.equal(keyFifths(5, 'major'), -1); // F장조 b1
  assert.equal(keyFifths(9, 'minor'), 0);
  assert.equal(keyNameKo(0, 'major'), '다장조');
  assert.equal(keyNameKo(9, 'minor'), '가단조');
  assert.deepEqual(spellMidi(61, 0), { letter: 'c', accidental: '#', octave: 4 });
  assert.deepEqual(spellMidi(61, -3), { letter: 'd', accidental: 'b', octave: 4 });
});

import { scoreToMidi } from '../js/music/midi.js';
import { scoreToMusicXml } from '../js/music/musicxml.js';

/** 최소 SMF 파서 (검증용) */
function parseMidi(bytes) {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  assert.equal(String.fromCharCode(...bytes.slice(0, 4)), 'MThd');
  const format = dv.getUint16(8);
  const nTracks = dv.getUint16(10);
  const ppq = dv.getUint16(12);
  let p = 14;
  const tracks = [];
  for (let i = 0; i < nTracks; i++) {
    assert.equal(String.fromCharCode(...bytes.slice(p, p + 4)), 'MTrk');
    const len = dv.getUint32(p + 4);
    p += 8;
    const end = p + len;
    let tick = 0;
    let running = 0;
    const events = [];
    while (p < end) {
      let d = 0;
      let b;
      do {
        b = bytes[p++];
        d = (d << 7) | (b & 0x7f);
      } while (b & 0x80);
      tick += d;
      let status = bytes[p];
      if (status === 0xff) {
        const type = bytes[p + 1];
        let l = 0;
        let q = p + 2;
        do {
          b = bytes[q++];
          l = (l << 7) | (b & 0x7f);
        } while (b & 0x80);
        events.push({ tick, meta: type, data: bytes.slice(q, q + l) });
        p = q + l;
      } else {
        if (status & 0x80) {
          running = status;
          p++;
        } else status = running;
        const kind = running & 0xf0;
        if (kind === 0xc0 || kind === 0xd0) events.push({ tick, kind, a: bytes[p++] });
        else {
          events.push({ tick, kind, a: bytes[p], b: bytes[p + 1] });
          p += 2;
        }
      }
    }
    tracks.push(events);
  }
  return { format, ppq, tracks };
}

test('MIDI 내보내기: 구조, 템포, 노트 개수/시각이 정확하다', () => {
  const notes = [note(72, 0, 1), note(74, 1, 1), note(48, 0, 2), note(55, 2, 2)];
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0, fifths: 1, mode: 'major' });
  const midi = parseMidi(scoreToMidi(s, { title: '테스트' }));
  assert.equal(midi.format, 1);
  assert.equal(midi.ppq, 480);
  assert.equal(midi.tracks.length, 3);
  const tempo = midi.tracks[0].find((e) => e.meta === 0x51).data;
  const us = (tempo[0] << 16) | (tempo[1] << 8) | tempo[2];
  assert.ok(Math.abs(60_000_000 / us - 120) < 0.5, 'BPM 120');
  const ts = midi.tracks[0].find((e) => e.meta === 0x58).data;
  assert.deepEqual([...ts.slice(0, 2)], [4, 2]);
  const ks = midi.tracks[0].find((e) => e.meta === 0x59).data;
  assert.equal(ks[0], 1);
  const ons = (t) => midi.tracks[t].filter((e) => e.kind === 0x90);
  assert.deepEqual(ons(1).map((e) => [e.tick, e.a]), [[0, 72], [480, 74]]); // 오른손: 1박 = 480틱
  assert.deepEqual(ons(2).map((e) => [e.tick, e.a]), [[0, 48], [960, 55]]);
  const offs = midi.tracks[1].filter((e) => e.kind === 0x80);
  assert.equal(offs.length, 2);
});

test('MusicXML 내보내기: 마디 길이 합계, 조표, 붙임줄, 임시표', () => {
  const notes = [note(73, 2, 4), note(48, 0, 4)]; // C#5 가 마디를 넘어 붙임줄
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0, fifths: 2, mode: 'major' });
  const xml = scoreToMusicXml(s, { title: 'A & B <test>' });
  assert.match(xml, /<work-title>A &amp; B &lt;test&gt;<\/work-title>/);
  assert.match(xml, /<fifths>2<\/fifths>/);
  assert.match(xml, /<tie type="start"\/>/);
  assert.match(xml, /<tie type="stop"\/>/);
  assert.match(xml, /<alter>1<\/alter>/);
  // 각 마디: staff1 duration 합 == staff2 duration 합 == 16 (backup 기준)
  const measures = xml.split('<measure ').slice(1);
  for (const m of measures) {
    const [staff1, staff2] = m.split('<backup>');
    const sum = (str) => [...str.matchAll(/<note>.*?<\/note>/g)].filter((x) => !x[0].includes('<chord/>')).reduce((a, x) => a + Number(x[0].match(/<duration>(\d+)<\/duration>/)[1]), 0);
    assert.equal(sum(staff1), 16);
    assert.equal(sum(staff2), 16);
  }
});

test('손 배정: 왼손 화음의 윗음이 오른손으로 새지 않고, 멜로디는 오른손에 남는다', () => {
  // 왼손 3화음(48,55,64) + 오른손 멜로디 76 을 같은 박에 연주
  const notes = [note(48, 0, 4), note(55, 0, 4), note(64, 0, 4), note(76, 0, 1)];
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.deepEqual(s.measures[0].bass.find((p) => !p.rest).midis, [48, 55, 64]);
  assert.deepEqual(s.measures[0].treble.find((p) => !p.rest).midis, [76]);
  // 오른손 화음은 그대로 오른손
  const rh = buildScore([note(60, 0, 2), note(64, 0, 2), note(67, 0, 2), note(72, 0, 2)], grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.equal(rh.measures[0].bass.find((p) => !p.rest), undefined);
  assert.deepEqual(rh.measures[0].treble.find((p) => !p.rest).midis, [60, 64, 67, 72]);
  // 양손 화음이 한꺼번에 울리면 경계 기준으로 나뉜다
  const both = buildScore([48, 55, 64, 67, 71, 76].map((m) => note(m, 0, 2)), grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.deepEqual(both.measures[0].bass.find((p) => !p.rest).midis, [48, 55]);
  assert.deepEqual(both.measures[0].treble.find((p) => !p.rest).midis, [64, 67, 71, 76]);
});

test('손 배정: 멜로디가 화음 윗음에서 8반음 위여도 끝나는 시점이 다르면 화음은 왼손에 남는다', () => {
  const notes = [note(48, 0, 4), note(55, 0, 4), note(64, 0, 4), note(72, 0, 1)];
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.deepEqual(s.measures[0].bass.find((p) => !p.rest).midis, [48, 55, 64]);
  assert.deepEqual(s.measures[0].treble.find((p) => !p.rest).midis, [72]);
});

test('손 배정: 화음 구성음의 끝 시점이 조금씩 달라도(실제 분석 결과) 왼손 화음이 유지된다', () => {
  // 48/55/64 의 끝이 각각 3.8, 3.5, 3.2 박 — 길게 끄는 화음이라 끝 시점이 흔들림
  const notes = [note(48, 0, 3.8), note(55, 0, 3.5), note(64, 0, 3.2), note(72, 0, 1)];
  const s = buildScore(notes, grid120, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  assert.deepEqual(s.measures[0].bass.find((p) => !p.rest).midis, [48, 55, 64]);
  assert.deepEqual(s.measures[0].treble.find((p) => !p.rest).midis, [72]);
});
