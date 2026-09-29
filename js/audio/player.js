// 재생 컨트롤러: 피아노 합성 재생(악보 기준)과 원본 오디오 재생을 같은 인터페이스로 제공한다.
import { createPianoBus, playNote } from './piano.js';

const LOOKAHEAD = 1.2; // 초 단위 선예약 구간
const TICK_MS = 120;

export class Player extends EventTarget {
  constructor() {
    super();
    /** @type {AudioContext|null} */
    this.ctx = null;
    this.mode = 'piano'; // 'piano' | 'original'
    this.notes = []; // {time, dur, midi, vel}
    this.duration = 0;
    this.original = null; // AudioBuffer
    this.rate = 1;
    this.position = 0; // 초
    this.playing = false;
    this._session = null;
  }

  setPiano(notes) {
    this.stop();
    this.notes = [...notes].sort((a, b) => a.time - b.time);
    this.pianoDuration = this.notes.length ? Math.max(...this.notes.map((n) => n.time + n.dur)) + 0.5 : 0;
    if (this.mode === 'piano') this.duration = this.pianoDuration;
  }

  setOriginal(buffer) {
    this.original = buffer;
    if (this.mode === 'original') this.duration = buffer?.duration ?? 0;
  }

  setMode(mode) {
    if (mode === this.mode) return;
    const was = this.playing;
    this.stop();
    this.mode = mode;
    this.duration = mode === 'piano' ? this.pianoDuration ?? 0 : this.original?.duration ?? 0;
    this.position = 0;
    this._emit();
    if (was) this.play();
  }

  setRate(rate) {
    const was = this.playing;
    const pos = this.position;
    if (was) this.pause();
    this.rate = rate;
    this.position = pos;
    if (was) this.play();
  }

  _ensureContext() {
    this.ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  play() {
    if (this.playing || !this.duration) return;
    const ctx = this._ensureContext();
    if (this.position >= this.duration - 0.05) this.position = 0;
    const master = ctx.createGain();
    master.connect(ctx.destination);
    const startCtx = ctx.currentTime + 0.05;
    const startPos = this.position;
    const session = { master, startCtx, startPos, timer: null, raf: 0, sources: [], next: 0 };
    this._session = session;
    this.playing = true;

    if (this.mode === 'original') {
      const src = ctx.createBufferSource();
      src.buffer = this.original;
      src.playbackRate.value = this.rate;
      src.connect(master);
      src.start(startCtx, startPos);
      src.onended = () => {
        if (this._session === session && this.playing && this._currentPos() >= this.duration - 0.1) this._finish();
      };
      session.sources.push(src);
    } else {
      const bus = createPianoBus(ctx, { destination: master });
      session.bus = bus;
      // 시작 위치 이후의 노트부터 예약
      session.next = this.notes.findIndex((n) => n.time + n.dur > startPos);
      if (session.next < 0) session.next = this.notes.length;
      const pump = () => {
        const horizon = (ctx.currentTime - session.startCtx) * this.rate + session.startPos + LOOKAHEAD * this.rate;
        while (session.next < this.notes.length && this.notes[session.next].time <= horizon) {
          const n = this.notes[session.next++];
          const when = session.startCtx + (n.time - session.startPos) / this.rate;
          const dur = n.dur / this.rate;
          if (when + dur < ctx.currentTime) continue;
          if (when < ctx.currentTime) playNote(ctx, bus.input, n, ctx.currentTime, dur - (ctx.currentTime - when));
          else playNote(ctx, bus.input, n, when, dur);
        }
      };
      pump();
      session.timer = setInterval(pump, TICK_MS);
    }

    const loop = () => {
      if (this._session !== session) return;
      this.position = this._currentPos();
      this._emit();
      if (this.position >= this.duration) this._finish();
      else session.raf = requestAnimationFrame(loop);
    };
    session.raf = requestAnimationFrame(loop);
    this._emit();
  }

  _currentPos() {
    const s = this._session;
    if (!s || !this.ctx) return this.position;
    return Math.min(this.duration, Math.max(0, s.startPos + (this.ctx.currentTime - s.startCtx) * this.rate));
  }

  _teardown() {
    const s = this._session;
    if (!s) return;
    clearInterval(s.timer);
    cancelAnimationFrame(s.raf);
    try {
      s.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
      for (const src of s.sources) src.stop(this.ctx.currentTime + 0.1);
    } catch {
      /* 이미 종료된 소스 */
    }
    setTimeout(() => s.master.disconnect(), 300);
    this._session = null;
  }

  pause() {
    if (!this.playing) return;
    this.position = this._currentPos();
    this.playing = false;
    this._teardown();
    this._emit();
  }

  stop() {
    this.playing = false;
    this._teardown();
    this.position = 0;
    this._emit();
  }

  _finish() {
    this.playing = false;
    this._teardown();
    this.position = 0;
    this._emit();
    this.dispatchEvent(new Event('ended'));
  }

  seek(seconds) {
    const was = this.playing;
    if (was) {
      this.playing = false;
      this._teardown();
    }
    this.position = Math.min(this.duration, Math.max(0, seconds));
    this._emit();
    if (was) this.play();
  }

  _emit() {
    this.dispatchEvent(new CustomEvent('state', { detail: { position: this.position, duration: this.duration, playing: this.playing } }));
  }
}
