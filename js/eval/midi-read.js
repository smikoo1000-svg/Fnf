// 표준 MIDI 파일 → 음/페달 목록 (벤치마크 정답 읽기용).
// 규칙은 pretty_midi 0.2.x 와 transkun/Data.py parseMIDIFile 을 따른다:
//  - note-off(또는 velocity 0 note-on)는 같은 음의 열린 note-on 을 모두 닫되, 같은 tick 에 시작한 것은 남긴다.
//  - 템포 변화(set tempo)를 반영해 tick → 초 변환.
//  - CC64(서스테인) 값 >= 64 이면 켜짐. 끝까지 닫히지 않은 페달은 마지막 음 끝에서 닫는다.
//  - 페달 연장 없이(건반 기준) 반환하고, 같은 음 겹침은 resolveOverlapping 으로 정리한다.
import { resolveOverlapping } from '../analysis/transkun.js';

function readVlq(b, p) {
  let v = 0;
  let c;
  do {
    c = b[p++];
    v = (v << 7) | (c & 0x7f);
  } while (c & 0x80);
  return [v, p];
}

/**
 * @param {Uint8Array} bytes
 * @returns {{notes:{start:number,end:number,pitch:number,velocity:number,startTick:number,endTick:number}[], sustain:{start:number,end:number}[], ppq:number}}
 */
export function parseMidiFile(bytes) {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const str = (p) => String.fromCharCode(bytes[p], bytes[p + 1], bytes[p + 2], bytes[p + 3]);
  if (str(0) !== 'MThd') throw new Error('MIDI 파일이 아닙니다');
  const nTracks = dv.getUint16(10);
  const division = dv.getUint16(12);
  if (division & 0x8000) throw new Error('SMPTE 시간 단위는 지원하지 않습니다');
  let p = 8 + dv.getUint32(4);
  const events = []; // {tick, order, kind, ...}
  let order = 0;
  for (let t = 0; t < nTracks; t++) {
    while (str(p) !== 'MTrk') p += 8 + dv.getUint32(p + 4);
    const end = p + 8 + dv.getUint32(p + 4);
    p += 8;
    let tick = 0;
    let running = 0;
    while (p < end) {
      let d;
      [d, p] = readVlq(bytes, p);
      tick += d;
      let status = bytes[p];
      if (status === 0xff) {
        const type = bytes[p + 1];
        let len;
        let q;
        [len, q] = readVlq(bytes, p + 2);
        if (type === 0x51) events.push({ tick, order: order++, kind: 'tempo', us: (bytes[q] << 16) | (bytes[q + 1] << 8) | bytes[q + 2] });
        p = q + len;
        continue;
      }
      if (status === 0xf0 || status === 0xf7) {
        let len;
        [len, p] = readVlq(bytes, p + 1);
        p += len;
        continue;
      }
      if (status & 0x80) {
        running = status;
        p++;
      } else status = running;
      const kind = status & 0xf0;
      const ch = status & 0x0f;
      if (kind === 0xc0 || kind === 0xd0) {
        p += 1;
        continue;
      }
      const a = bytes[p];
      const b = bytes[p + 1];
      p += 2;
      if (kind === 0x90 && b > 0) events.push({ tick, order: order++, kind: 'on', ch, pitch: a, vel: b });
      else if (kind === 0x80 || (kind === 0x90 && b === 0)) events.push({ tick, order: order++, kind: 'off', ch, pitch: a });
      else if (kind === 0xb0) events.push({ tick, order: order++, kind: 'cc', ch, num: a, value: b });
    }
    p = end;
  }
  events.sort((x, y) => x.tick - y.tick || x.order - y.order);

  // tick → 초 (템포 지도)
  const tempos = events.filter((e) => e.kind === 'tempo');
  const secOf = (() => {
    const pts = [{ tick: 0, sec: 0, us: 500000 }];
    for (const e of tempos) {
      const last = pts[pts.length - 1];
      const sec = last.sec + ((e.tick - last.tick) * last.us) / 1e6 / division;
      if (e.tick === last.tick) last.us = e.us;
      else pts.push({ tick: e.tick, sec, us: e.us });
    }
    return (tick) => {
      let i = pts.length - 1;
      while (i > 0 && pts[i].tick > tick) i--;
      return pts[i].sec + ((tick - pts[i].tick) * pts[i].us) / 1e6 / division;
    };
  })();

  const open = new Map();
  const notes = [];
  const cc64 = [];
  for (const e of events) {
    if (e.kind === 'on') {
      const key = e.ch * 128 + e.pitch;
      if (!open.has(key)) open.set(key, []);
      open.get(key).push({ tick: e.tick, vel: e.vel });
    } else if (e.kind === 'off') {
      const key = e.ch * 128 + e.pitch;
      const list = open.get(key);
      if (!list) continue;
      const keep = list.filter((n) => n.tick === e.tick);
      for (const n of list) if (n.tick !== e.tick) notes.push({ start: secOf(n.tick), end: secOf(e.tick), pitch: e.pitch, velocity: n.vel, startTick: n.tick, endTick: e.tick });
      if (keep.length) open.set(key, keep);
      else open.delete(key);
    } else if (e.kind === 'cc' && e.num === 64) cc64.push({ time: secOf(e.tick), value: e.value });
  }
  const valid = notes.filter((n) => n.start < n.end);
  const lastT = valid.reduce((m, n) => Math.max(m, n.end), 0);
  const sustain = [];
  let on = false;
  let cur = null;
  let time = 0;
  for (const c of cc64) {
    time = c.time;
    const st = c.value >= 64;
    if (st !== on) {
      if (st) cur = { start: time, end: null, pitch: -64, velocity: 127 };
      else {
        cur.end = time;
        sustain.push(cur);
      }
      on = st;
    }
  }
  if (on) {
    cur.end = Math.max(lastT, time);
    if (cur.end > cur.start) sustain.push(cur);
  }
  return { notes: resolveOverlapping(valid), sustain, ppq: division };
}
