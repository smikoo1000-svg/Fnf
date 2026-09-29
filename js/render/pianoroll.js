// 피아노 롤: 양자화된 노트를 시간(가로) × 음높이(세로)로 그린다. 클릭하면 해당 시각으로 이동.

const MAX_CSS_WIDTH = 8000;
const MAX_CANVAS_PX = 16000;
const LEFT_COLOR = '#0f9d8a';
const RIGHT_COLOR = '#5b5bf0';

export class PianoRoll {
  /** @param {HTMLElement} host */
  constructor(host, { onSeek } = {}) {
    this.host = host;
    this.onSeek = onSeek;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'roll-canvas';
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', '피아노 롤: 변환된 음의 시간별 음높이');
    host.replaceChildren(this.canvas);
    this.notes = [];
    this.duration = 0;
    this.barTimes = [];
    this.pxPerSec = 70;
    this.height = 170;
    this.playhead = 0;
    this.canvas.addEventListener('click', (e) => {
      const r = this.canvas.getBoundingClientRect();
      const t = ((e.clientX - r.left) / r.width) * this.duration;
      this.onSeek?.(Math.max(0, Math.min(this.duration, t)));
    });
  }

  /** @param {{time:number,dur:number,midi:number,hand:string}[]} notes */
  setData(notes, duration, barTimes = []) {
    this.notes = notes;
    this.duration = Math.max(1, duration);
    this.barTimes = barTimes;
    this.lo = Math.min(...notes.map((n) => n.midi), 60) - 2;
    this.hi = Math.max(...notes.map((n) => n.midi), 72) + 2;
    this.draw();
  }

  setPlayhead(t) {
    this.playhead = t;
    this.draw();
    // 재생 위치가 화면 밖이면 스크롤 따라가기
    const x = (t / this.duration) * this.canvas.clientWidth;
    const h = this.host;
    if (x < h.scrollLeft || x > h.scrollLeft + h.clientWidth - 40) h.scrollLeft = Math.max(0, x - h.clientWidth * 0.25);
  }

  draw() {
    // 캔버스 한 변은 브라우저마다 약 16k~32k px 가 한계이므로, 긴 곡은 초당 픽셀 수와 해상도를 낮춘다
    const pxPerSec = Math.min(this.pxPerSec, MAX_CSS_WIDTH / this.duration);
    const cssW = Math.max(this.host.clientWidth, Math.ceil(this.duration * pxPerSec));
    const cssH = this.height;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_PX / cssW);
    if (this.canvas.width !== Math.round(cssW * dpr) || this.canvas.height !== Math.round(cssH * dpr)) {
      this.canvas.width = Math.round(cssW * dpr);
      this.canvas.height = Math.round(cssH * dpr);
      this.canvas.style.width = `${cssW}px`;
      this.canvas.style.height = `${cssH}px`;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(this.host);
    const grid = css.getPropertyValue('--roll-grid').trim() || 'rgba(128,128,128,.25)';
    const bar = css.getPropertyValue('--roll-bar').trim() || 'rgba(128,128,128,.45)';
    const head = css.getPropertyValue('--roll-head').trim() || '#e11d48';
    ctx.clearRect(0, 0, cssW, cssH);

    const rows = this.hi - this.lo + 1;
    const rowH = cssH / rows;
    const y = (midi) => cssH - (midi - this.lo + 1) * rowH;
    const x = (t) => (t / this.duration) * cssW;

    // 옥타브 C 기준선
    ctx.lineWidth = 1;
    ctx.strokeStyle = grid;
    ctx.beginPath();
    for (let m = Math.ceil(this.lo / 12) * 12; m <= this.hi; m += 12) {
      const yy = Math.round(y(m) + rowH) + 0.5;
      ctx.moveTo(0, yy);
      ctx.lineTo(cssW, yy);
    }
    ctx.stroke();
    // 마디선
    ctx.strokeStyle = bar;
    ctx.beginPath();
    for (const t of this.barTimes) {
      const xx = Math.round(x(t)) + 0.5;
      ctx.moveTo(xx, 0);
      ctx.lineTo(xx, cssH);
    }
    ctx.stroke();

    for (const n of this.notes) {
      ctx.fillStyle = n.hand === 'bass' ? LEFT_COLOR : RIGHT_COLOR;
      ctx.globalAlpha = 0.45 + 0.55 * Math.min(1, n.vel / 110);
      ctx.fillRect(x(n.time), y(n.midi), Math.max(2, x(n.dur) - 1), Math.max(2, rowH - 0.5));
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = head;
    ctx.fillRect(Math.round(x(this.playhead)) - 1, 0, 2, cssH);
  }
}
