import test from 'node:test';
import assert from 'node:assert/strict';
import { VariableQ, estimateTuning, NUM_NOTES, NOTE_MIN } from '../js/analysis/cqt.js';
import { transcribeDsp } from '../js/analysis/transcribe.js';
import { trackBeats, BeatGrid, estimateTempo, fixedTempoGrid } from '../js/analysis/rhythm.js';
import { pruneHarmonicGhosts } from '../js/analysis/note-filters.js';
import { detectKey } from '../js/analysis/key.js';
import { renderPiano, evaluateNotes } from './helpers/synth.js';
import { odeToJoy, repeatedNotes } from './helpers/pieces.js';

const FS = 22050;

test('CQT: 사인파의 진폭과 음높이 bin 을 정확히 복원한다', () => {
  for (const [f, midi] of [[110, 45], [440, 69], [1318.51, 88]]) {
    const x = new Float32Array(FS * 2).map((_, i) => 0.5 * Math.sin((2 * Math.PI * f * i) / FS));
    const { mag } = new VariableQ({ sampleRate: FS }).compute(x, { frames: [40] });
    let best = 0;
    for (let k = 1; k < NUM_NOTES; k++) if (mag[k] > mag[best]) best = k;
    assert.equal(best + NOTE_MIN, midi);
    assert.ok(Math.abs(mag[best] - 0.5) < 0.01, `진폭 0.5 (실제 ${mag[best]})`);
  }
});

test('튜닝 추정: 기준음이 어긋난 연주(±40센트)를 2센트 이내로 추정한다', () => {
  const chord = [60, 64, 67].map((m) => ({ midi: m, start: 0, dur: 1.5 })).concat([72, 55].map((m) => ({ midi: m, start: 2, dur: 1.5 })));
  for (const d of [0, 25, -30, 40]) {
    const { samples } = renderPiano(chord, { detuneCents: d });
    const { cents } = estimateTuning(samples, FS);
    assert.ok(Math.abs(cents - d) <= 2, `detune ${d} → ${cents.toFixed(1)}`);
  }
});

test('내장 엔진: 리버브/잡음/타악기 클릭이 섞인 환희의 송가에서 F1 ≥ 0.7', () => {
  const piece = odeToJoy({ bpm: 110 });
  const drums = Array.from({ length: 40 }, (_, i) => 0.1 + (i * 60) / 110);
  const { samples } = renderPiano(piece.truth, { reverb: true, noise: 0.002, drums });
  const r = transcribeDsp(samples, FS);
  const ev = evaluateNotes(piece.truth, r.notes.map((n) => ({ midi: n.midi, start: n.start })), 0.08);
  assert.ok(ev.f1 >= 0.7, `F1 ${ev.f1.toFixed(2)} (P ${ev.precision.toFixed(2)} R ${ev.recall.toFixed(2)})`);
  assert.ok(Math.abs(ev.meanOnsetErr) < 0.02, `평균 온셋 오차 ${(ev.meanOnsetErr * 1000).toFixed(0)}ms`);
});

test('내장 엔진: 재타건(같은 음 반복)을 일부 분리한다', () => {
  const piece = repeatedNotes({ bpm: 100 });
  const { samples } = renderPiano(piece.truth, {});
  const r = transcribeDsp(samples, FS);
  const ev = evaluateNotes(piece.truth, r.notes.map((n) => ({ midi: n.midi, start: n.start })), 0.08);
  assert.equal(ev.precision, 1, '가짜 음표가 없어야 함');
  assert.ok(ev.recall >= 0.5, `재현율 ${ev.recall.toFixed(2)}`);
});

test('템포 추정: 70~150 BPM 합성 곡에서 3% 이내', () => {
  for (const bpm of [70, 90, 105, 120, 140]) {
    const piece = odeToJoy({ bpm });
    const { samples } = renderPiano(piece.truth, { reverb: true });
    const r = transcribeDsp(samples, FS);
    const t = trackBeats(r.onsetEnv, r.frameRate);
    assert.ok(Math.abs(t.bpm / bpm - 1) < 0.03, `${bpm} BPM → ${t.bpm.toFixed(1)}`);
    // 비트 격자가 실제 박 위치와 잘 맞는다 (첫 음 시각 ±60ms 이내의 비트가 존재)
    const grid = new BeatGrid(t.beats);
    const frac = grid.posOf(piece.startOffset + 4 * (60 / bpm)) % 1;
    const d = Math.min(frac, 1 - frac) * (60 / bpm);
    assert.ok(d < 0.07, `${bpm} BPM: 박 위상 오차 ${(d * 1000).toFixed(0)}ms`);
  }
});

test('비트 격자: 초↔박 변환이 서로 역변환이고 양 끝을 외삽한다', () => {
  const g = new BeatGrid(Float64Array.from([1, 1.5, 2.1, 2.6, 3.2]));
  for (const t of [0.2, 1, 1.7, 2.6, 3.2, 4.4]) assert.ok(Math.abs(g.timeOf(g.posOf(t)) - t) < 1e-9, `t=${t}`);
  assert.equal(g.posOf(1), 0);
  assert.equal(g.posOf(3.2), 4);
  assert.ok(g.posOf(0.5) < 0 && g.posOf(4) > 4);
});

test('고정 템포 격자: 지정한 BPM 간격으로 온셋에 위상을 맞춘다', () => {
  const rate = 86;
  const env = new Float32Array(rate * 20);
  for (let t = 0.37; t < 19; t += 0.5) env[Math.round(t * rate)] = 5; // 120 BPM, 위상 0.37s
  const { beats, bpm } = fixedTempoGrid(env, rate, 120);
  assert.equal(bpm, 120);
  assert.ok(Math.abs((beats[1] - beats[0]) - 0.5) < 1e-9);
  const off = beats[0] % 0.5;
  assert.ok(Math.min(Math.abs(off - 0.37), Math.abs(off + 0.5 - 0.37)) < 0.03);
});

test('템포 추정: 온셋이 없는 무음 입력에도 안전하다', () => {
  const r = estimateTempo(new Float32Array(2000), 86);
  assert.ok(r.bpm >= 55 && r.bpm <= 190);
  const t = trackBeats(new Float32Array(100), 86);
  assert.ok(t.beats.length > 0);
});

test('배음 유령음 제거: 하위 음이 훨씬 강할 때만 제거하고 실제 옥타브 중복은 남긴다', () => {
  const mk = (midi, amp) => ({ midi, start: 0, end: 1, amp });
  const kept = pruneHarmonicGhosts([mk(48, 1), mk(60, 0.3), mk(67, 0.2)], (n) => n.amp).map((n) => n.midi);
  assert.deepEqual(kept, [48]); // 60(옥타브), 67(12도)은 배음 유령
  const both = pruneHarmonicGhosts([mk(48, 1), mk(60, 0.9)], (n) => n.amp).map((n) => n.midi);
  assert.deepEqual(both, [48, 60]); // 세기가 비슷하면 진짜 옥타브 중복
  const later = pruneHarmonicGhosts([{ midi: 48, start: 0, end: 1, amp: 1 }, { midi: 60, start: 2, end: 3, amp: 0.1 }], (n) => n.amp);
  assert.equal(later.length, 2); // 시간이 겹치지 않으면 유령이 아님
});

test('조성 검출: 멜로디의 조성을 찾고, 이조하면 조성도 따라간다', () => {
  // 화음 반주(C/G 화음뿐이라 G가 지배적)는 조성이 모호하므로 멜로디만으로 판정한다
  const melody = odeToJoy({ bpm: 100 }).truth.filter((n) => n.midi >= 70);
  const notes = melody.map((n) => ({ midi: n.midi, start: n.start, end: n.start + n.dur, velocity: 80 }));
  const k = detectKey(notes)[0];
  assert.equal(k.tonic, 0);
  assert.equal(k.mode, 'major');
  const up = detectKey(notes.map((n) => ({ ...n, midi: n.midi + 2 })))[0]; // D 장조로 이조
  assert.equal(up.tonic, 2);
  assert.equal(up.fifths, 2);
});
