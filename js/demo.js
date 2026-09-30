// 체험용 곡: 베토벤 「환희의 송가」(저작권 만료) 멜로디 + 단순 반주. 앱 내 피아노 합성기로 오디오를 만든다.
import { schedulePiano } from './audio/piano.js';
import { fromAudioBuffer } from './audio/decode.js';

const MELODY = [
  [64, 1], [64, 1], [65, 1], [67, 1], [67, 1], [65, 1], [64, 1], [62, 1], [60, 1], [60, 1], [62, 1], [64, 1], [64, 1.5], [62, 0.5], [62, 2],
  [64, 1], [64, 1], [65, 1], [67, 1], [67, 1], [65, 1], [64, 1], [62, 1], [60, 1], [60, 1], [62, 1], [64, 1], [62, 1.5], [60, 0.5], [60, 2],
];
const CHORDS = [[48, 55, 64], [43, 55, 62], [48, 55, 64], [43, 55, 62], [48, 55, 64], [45, 57, 65], [43, 55, 62], [48, 55, 64]];

export function demoNotes(bpm = 100) {
  const beat = 60 / bpm;
  const notes = [];
  let t = 0.3;
  for (const [midi, len] of MELODY) {
    notes.push({ time: t, midi: midi + 12, dur: len * beat * 0.92, vel: 88 });
    t += len * beat;
  }
  const bars = Math.ceil((t - 0.3) / (4 * beat));
  for (let b = 0; b < bars; b++) {
    for (const m of CHORDS[b % CHORDS.length]) notes.push({ time: 0.3 + b * 4 * beat, midi: m, dur: 3.7 * beat, vel: 60 });
  }
  return notes.sort((a, b) => a.time - b.time);
}

/** @returns {Promise<{samples:Float32Array, playback:AudioBuffer, duration:number}>} */
export async function renderDemo() {
  const notes = demoNotes();
  const total = Math.max(...notes.map((n) => n.time + n.dur)) + 2.5;
  const ctx = new OfflineAudioContext(1, Math.ceil(total * 44100), 44100);
  schedulePiano(ctx, notes);
  return fromAudioBuffer(await ctx.startRendering());
}
