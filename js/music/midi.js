// 표준 MIDI 파일(SMF, format 1) 작성기. 오른손/왼손을 별도 트랙으로 기록한다.

import { performanceNotes } from './score.js';

const PPQ = 480;
const TICKS_PER_UNIT = PPQ / 4; // 유닛 = 16분음표

function vlq(n) {
  const bytes = [n & 0x7f];
  while ((n >>= 7)) bytes.unshift((n & 0x7f) | 0x80);
  return bytes;
}

const u32 = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const u16 = (n) => [(n >>> 8) & 255, n & 255];
const ascii = (s) => Array.from(s, (c) => c.charCodeAt(0) & 127);
const utf8 = (s) => Array.from(new TextEncoder().encode(s));

function chunk(type, data) {
  return [...ascii(type), ...u32(data.length), ...data];
}

/** 이벤트 배열({tick, order, bytes})을 델타타임 트랙 데이터로 직렬화 */
function serialize(events) {
  events.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const out = [];
  let last = 0;
  for (const e of events) {
    out.push(...vlq(e.tick - last), ...e.bytes);
    last = e.tick;
  }
  out.push(0, 0xff, 0x2f, 0);
  return out;
}

const meta = (type, data) => [0xff, type, ...vlq(data.length), ...data];

/**
 * @param {ReturnType<import('./score.js').buildScore>} score
 * @param {{title?:string}} [opt]
 * @returns {Uint8Array}
 */
export function scoreToMidi(score, { title = 'Piano Transcription' } = {}) {
  const { timeSig, fifths, quarterBpm } = score;
  const conductor = [];
  conductor.push({ tick: 0, order: 0, bytes: meta(0x03, utf8(title)) });
  const usPerQuarter = Math.round(60_000_000 / Math.max(20, quarterBpm));
  conductor.push({ tick: 0, order: 1, bytes: meta(0x51, [(usPerQuarter >> 16) & 255, (usPerQuarter >> 8) & 255, usPerQuarter & 255]) });
  const den = Math.log2(timeSig.den);
  const clocks = score.compound ? 36 : 24;
  conductor.push({ tick: 0, order: 2, bytes: meta(0x58, [timeSig.num, den, clocks, 8]) });
  const minor = score.mode === 'minor' ? 1 : 0;
  conductor.push({ tick: 0, order: 3, bytes: meta(0x59, [fifths & 255, minor]) });

  const tracks = [serialize(conductor)];
  for (const [hand, name] of [['treble', '오른손 (Right Hand)'], ['bass', '왼손 (Left Hand)']]) {
    const ev = [];
    ev.push({ tick: 0, order: 0, bytes: meta(0x03, utf8(name)) });
    ev.push({ tick: 0, order: 1, bytes: [0xc0, 0] }); // Acoustic Grand Piano
    if (hand === 'bass') {
      // 서스테인 페달(CC64): 같은 tick 이면 떼기(order 0)가 밟기(order 4)보다 먼저
      for (const pd of score.pedals ?? []) {
        ev.push({ tick: pd.start * TICKS_PER_UNIT, order: 4, bytes: [0xb0, 64, 127] });
        ev.push({ tick: pd.end * TICKS_PER_UNIT, order: 0, bytes: [0xb0, 64, 0] });
      }
    }
    for (const n of performanceNotes(score)) {
      if (n.hand !== hand) continue;
      const on = Math.round(n.start * TICKS_PER_UNIT);
      const off = Math.max(on + 1, Math.round(n.end * TICKS_PER_UNIT));
      const vel = Math.min(127, Math.max(1, Math.round(n.vel)));
      ev.push({ tick: on, order: 3, bytes: [0x90, n.midi, vel] });
      ev.push({ tick: off, order: 2, bytes: [0x80, n.midi, 0] }); // 같은 tick이면 note-off 먼저
    }
    tracks.push(serialize(ev));
  }
  const header = chunk('MThd', [...u16(1), ...u16(tracks.length), ...u16(PPQ)]);
  const body = tracks.flatMap((t) => chunk('MTrk', t));
  return Uint8Array.from([...header, ...body]);
}
