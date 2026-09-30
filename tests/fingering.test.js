import test from 'node:test';
import assert from 'node:assert/strict';
import { fingerHand, applyFingering } from '../js/music/fingering.js';
import { buildScore, TIME_SIGNATURES } from '../js/music/score.js';
import { BeatGrid } from '../js/analysis/rhythm.js';
import { scoreToMusicXml } from '../js/music/musicxml.js';

const ev = (ms) => ms.map((m, i) => ({ start: i * 2, midis: Array.isArray(m) ? m : [m] }));
const fingers = (ms, hand) => fingerHand(ev(ms), hand, 4).map((x) => x.fingers.join('')).join(' ');

test('운지: 장음계는 교본의 표준 운지를 낸다 (양손, 상행/하행, 1·2옥타브)', () => {
  assert.equal(fingers([60, 62, 64, 65, 67, 69, 71, 72], 'treble'), '1 2 3 1 2 3 4 5');
  assert.equal(fingers([72, 71, 69, 67, 65, 64, 62, 60], 'treble'), '5 4 3 2 1 3 2 1');
  assert.equal(fingers([48, 50, 52, 53, 55, 57, 59, 60], 'bass'), '5 4 3 2 1 3 2 1');
  assert.equal(fingers([60, 59, 57, 55, 53, 52, 50, 48], 'bass'), '1 2 3 1 2 3 4 5');
  assert.equal(fingers([67, 69, 71, 72, 74, 76, 78, 79], 'treble'), '1 2 3 1 2 3 4 5'); // G장조
  assert.equal(fingers([62, 64, 66, 67, 69, 71, 73, 74], 'treble'), '1 2 3 1 2 3 4 5'); // D장조
  assert.equal(fingers([60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84], 'treble'), '1 2 3 1 2 3 4 1 2 3 1 2 3 4 5');
});

test('운지: 5음 자리와 3화음', () => {
  assert.equal(fingers([60, 62, 64, 65, 67, 65, 64, 62, 60], 'treble'), '1 2 3 4 5 4 3 2 1');
  assert.equal(fingers([48, 50, 52, 53, 55, 53, 52, 50, 48], 'bass'), '5 4 3 2 1 2 3 4 5');
  assert.equal(fingers([[60, 64, 67]], 'treble'), '135');
  assert.equal(fingers([[48, 52, 55]], 'bass'), '531');
});

test('운지 신뢰도: 0~1 사후확률이며, 대안이 사실상 없는 곳(큰 도약)이 대안이 많은 곳(5음 자리)보다 높다', () => {
  // 신뢰도 = "다른 운지들과 비교한 확신". 쉬운 곳은 비슷하게 좋은 운지가 여럿이라 오히려 낮게 나온다.
  const many = fingerHand(ev([60, 62, 64, 65, 67]), 'treble', 4);
  const forced = fingerHand(ev([60, 71, 62, 76, 65, 79]), 'treble', 4);
  for (const r of [...many, ...forced]) assert.ok(r.confidence >= 0 && r.confidence <= 1);
  const mean = (rs) => rs.reduce((a, r) => a + r.confidence, 0) / rs.length;
  assert.ok(mean(forced) > mean(many), `${mean(forced).toFixed(2)} > ${mean(many).toFixed(2)}`);
});

test('운지: 악보 조각에 붙고, 붙임줄 뒤 조각은 앞 운지를 물려받으며, MusicXML 에 <fingering> 으로 기록된다', () => {
  const grid = new BeatGrid(Float64Array.from({ length: 100 }, (_, i) => i * 0.5));
  const n = (midi, b, d) => ({ midi, start: b * 0.5, end: (b + d) * 0.5, velocity: 80 });
  const s = buildScore([n(60, 0, 1), n(62, 1, 1), n(64, 2, 4), n(48, 0, 4)], grid, { timeSig: TIME_SIGNATURES['4/4'], phase: 0 });
  const summary = applyFingering(s);
  assert.ok(summary.count >= 4 && summary.mean > 0 && summary.mean <= 1);
  const tre = s.measures.flatMap((m) => m.treble).filter((p) => !p.rest);
  assert.deepEqual(tre.slice(0, 3).map((p) => p.fingers[0]), [1, 2, 3]);
  const tied = tre.find((p) => p.tiePrev);
  assert.ok(tied && tied.fingerTied && tied.fingers[0] === 3);
  const xml = scoreToMusicXml(s, { fingering: true });
  assert.ok((xml.match(/<fingering>/g) ?? []).length >= 4);
  assert.ok(!/<fingering>/.test(scoreToMusicXml(s, { fingering: false })));
});
