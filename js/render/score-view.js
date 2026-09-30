// VexFlow 로 대악보(오른손/왼손)를 그린다. 한 줄(시스템)당 SVG 하나씩 만들어 인쇄 시 줄 단위로 페이지가 나뉜다.
import { DURATION_TYPES } from '../music/score.js';
import { spellMidi } from '../analysis/key.js';

const KEY_SIG = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#']; // index = fifths + 7
const REST_KEY = { treble: 'b/4', bass: 'd/3' };
const STAVE_GAP = 92; // 오른손 오선 영역 상단 ~ 왼손 오선 영역 상단

/**
 * 한 줄(system)의 세로 배치. VexFlow 오선 영역은 위쪽 여백 40px 뒤에 첫 줄이 오고, 다섯 줄이 40px 를 차지한다.
 * 운지를 표시하면 위(오른손 화음 번호)·아래(왼손 화음 번호) 여백을 늘리고 페달 표시를 그 아래로 내린다.
 */
function layoutFor(score) {
  const fing = !!score.showFingering;
  const top = 34 + (fing ? 30 : 0);
  const trebleTopLine = top + 40;
  const bassBottomLine = top + STAVE_GAP + 80;
  const below = fing ? 56 : 0;
  return {
    top,
    trebleTopLine,
    bassBottomLine,
    pedalY: bassBottomLine + 30 + below, // 낮은 덧줄 음표(와 운지 번호)를 피한 페달 표시 줄
    height: bassBottomLine + 46 + below, // 낮은 덧줄 음표(C1 근처)와 페달 표시까지 들어가는 높이
  };
}

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

function vfDuration(dur, rest) {
  const { type, dots } = DURATION_TYPES[dur];
  return type + 'd'.repeat(dots) + (rest ? 'r' : '');
}

/** 한 마디의 한 스태프를 VexFlow 객체로 만든다 */
function buildStaff(VF, pieces, clef, score, wholeRestBar) {
  const { StaveNote, Voice, Dot, Accidental, Beam, Fraction } = VF;
  const map = new Map(); // piece → StaveNote
  const notes = pieces.map((p) => {
    let note;
    if (p.rest) {
      note = new StaveNote({ keys: [REST_KEY[clef]], duration: wholeRestBar ? 'wr' : vfDuration(p.dur, true), clef, alignCenter: wholeRestBar });
    } else {
      const keys = p.midis.map((m) => {
        const s = spellMidi(m, score.fifths);
        return `${s.letter}${s.accidental}/${s.octave}`;
      });
      note = new StaveNote({ keys, duration: vfDuration(p.dur, false), clef, autoStem: true });
      if (p.graces?.length) note.addModifier(graceGroup(VF, p.graces, clef, score.fifths), 0);
      if (p.ornament === 'trill') note.addModifier(new VF.Ornament('tr'), 0);
      if (score.showFingering && p.fingers && !p.fingerTied) addFingers(VF, note, p, clef);
    }
    if (!wholeRestBar && DURATION_TYPES[p.dur].dots) Dot.buildAndAttach([note], { all: true });
    map.set(p, note);
    return note;
  });
  const voice = new Voice({ numBeats: score.timeSig.num, beatValue: score.timeSig.den }).setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  Accidental.applyAccidentals([voice], KEY_SIG[score.fifths + 7]);
  const groups = score.compound ? [new Fraction(3, 8)] : undefined;
  const beams = Beam.generateBeams(notes, { groups, beamRests: false, maintainStemDirections: false });
  return { notes, voice, beams, map };
}

const SHARP_ORDER = 'fcgdaeb';
const FLAT_ORDER = 'beadgcf';
/** 조표가 이 음이름에 붙이는 임시표 */
function keyAccidental(letter, fifths) {
  if (fifths > 0) return SHARP_ORDER.indexOf(letter) < fifths ? '#' : '';
  if (fifths < 0) return FLAT_ORDER.indexOf(letter) < -fifths ? 'b' : '';
  return '';
}

/** 앞꾸밈음: 사선 그은 작은 8분음표 묶음 (조표와 다른 음에는 임시표) */
function graceGroup(VF, midis, clef, fifths) {
  const notes = midis.map((m) => {
    const s = spellMidi(m, fifths);
    const g = new VF.GraceNote({ keys: [`${s.letter}${s.accidental}/${s.octave}`], duration: '8', slash: true, clef });
    if (s.accidental !== keyAccidental(s.letter, fifths)) g.addModifier(new VF.Accidental(s.accidental || 'n'), 0);
    return g;
  });
  const group = new VF.GraceNoteGroup(notes, true);
  if (notes.length > 1) group.beamNotes();
  return group;
}

/**
 * 운지 번호: 오른손은 오선 위, 왼손은 오선 아래에 음 높이 순서대로 쌓는다(위쪽 번호 = 높은 음).
 * 확신도 0.5 미만(비슷하게 좋은 대안이 있는 곳)은 회색.
 */
function addFingers(VF, note, piece, clef) {
  const above = clef === 'treble';
  const idx = piece.fingers.map((_, i) => i).filter((i) => piece.fingers[i]);
  // 주석은 먼저 붙인 것이 오선에 가깝다: 위쪽은 낮은 음부터, 아래쪽은 높은 음부터
  const order = above ? idx : [...idx].reverse();
  for (const i of order) {
    const a = new VF.Annotation(String(piece.fingers[i]))
      .setVerticalJustification(above ? VF.Annotation.VerticalJustify.TOP : VF.Annotation.VerticalJustify.BOTTOM)
      .setFont('Times New Roman, serif', 11, 'bold');
    if (piece.fingerConfidence < 0.5) a.setStyle({ fillStyle: '#8b8b96', strokeStyle: '#8b8b96' });
    note.addModifier(a, 0);
  }
}

function isWholeRest(pieces, score) {
  return pieces.length === 1 && pieces[0].rest && pieces[0].dur === score.unitsPerBar;
}

/** 마디 하나의 최소 음표 영역 폭(px) */
function measureNoteWidth(VF, m, score) {
  const t = buildStaff(VF, m.treble, 'treble', score, isWholeRest(m.treble, score));
  const b = buildStaff(VF, m.bass, 'bass', score, isWholeRest(m.bass, score));
  const f = new VF.Formatter();
  f.joinVoices([t.voice]);
  f.joinVoices([b.voice]);
  const w = f.preCalculateMinTotalWidth([t.voice, b.voice]);
  return Math.max(70, w * 1.12 + 26);
}

/** 시스템 시작 장식(음자리표/조표/박자표) 폭 */
function startModifiersWidth(VF, score, withTime) {
  const s = new VF.Stave(0, 0, 500);
  s.addClef('treble').addKeySignature(KEY_SIG[score.fifths + 7]);
  if (withTime) s.addTimeSignature(`${score.timeSig.num}/${score.timeSig.den}`);
  return s.getNoteStartX();
}

/** 이 줄에 속한 페달 밟기(Ped.)·떼기(✱) 표시를 왼손 오선 아래에 그린다. x 는 음표 위치 사이를 보간한다. */
function drawPedals(ctx, score, anchors, idxs, pedalY) {
  if (!score.pedals?.length || !anchors.length) return;
  anchors.sort((a, b) => a.unit - b.unit || (a.end ? 1 : 0) - (b.end ? 1 : 0));
  const from = idxs[0] * score.unitsPerBar;
  const to = (idxs[idxs.length - 1] + 1) * score.unitsPerBar;
  const xAt = (u) => {
    let i = 0;
    while (i + 1 < anchors.length && anchors[i + 1].unit <= u) i++;
    const a = anchors[i];
    const b = anchors[i + 1];
    if (!b || a.unit === u) return a.x;
    return a.x + ((u - a.unit) / (b.unit - a.unit)) * (b.x - a.x);
  };
  ctx.save();
  ctx.setFont('Times New Roman, serif', 14, 'bold', 'italic');
  for (const p of score.pedals) {
    // 바꿔 밟기(떼기와 밟기가 같은 지점)에서 겹치지 않도록 ✱ 는 왼쪽, Ped. 는 오른쪽으로 비켜 쓴다
    if (p.start >= from && p.start < to) ctx.fillText('Ped.', xAt(p.start) + 2, pedalY);
    if (p.end > from && p.end <= to) ctx.fillText('✱', xAt(p.end) - 14, pedalY);
  }
  ctx.restore();
}

/**
 * @param {HTMLElement} container
 * @param {ReturnType<import('../music/score.js').buildScore>} score
 * @param {{width?:number, onMeasureClick?:(i:number)=>void, onProgress?:(p:number)=>void, signal?:{cancelled:boolean}}} opt
 * @returns {Promise<{measureEls:HTMLElement[], systems:number}>}
 */
export async function renderScore(container, score, { width = 900, onMeasureClick, onProgress, signal } = {}) {
  const VF = window.VexFlow;
  if (!VF) throw new Error('악보 라이브러리(VexFlow)를 불러오지 못했습니다.');
  container.replaceChildren();
  const measureEls = [];
  if (!score.measures.length) return { measureEls, systems: 0 };

  const margin = 12;
  const L = layoutFor(score);
  const usable = width - margin * 2;
  const firstPad = startModifiersWidth(VF, score, true);
  const restPad = startModifiersWidth(VF, score, false);
  const inner = 12; // 마디 끝 여백

  // 1) 마디별 최소 폭 계산
  const need = score.measures.map((m) => measureNoteWidth(VF, m, score));

  // 2) 줄 나누기
  const systems = [];
  let cur = [];
  let used = 0;
  for (let i = 0; i < need.length; i++) {
    const pad = cur.length === 0 ? (systems.length === 0 ? firstPad : restPad) : 0;
    const w = need[i] + pad + inner;
    if (cur.length && used + w > usable) {
      systems.push(cur);
      cur = [];
      used = 0;
      i--;
      continue;
    }
    cur.push(i);
    used += w;
  }
  if (cur.length) systems.push(cur);

  // 3) 줄별 그리기
  for (let si = 0; si < systems.length; si++) {
    if (signal?.cancelled) return { measureEls, systems: systems.length };
    const idxs = systems[si];
    const isLast = si === systems.length - 1;
    const pads = idxs.map((_, k) => (k === 0 ? (si === 0 ? firstPad : restPad) : 0));
    const natural = idxs.map((mi, k) => need[mi] + pads[k] + inner);
    const total = natural.reduce((a, b) => a + b, 0);
    const stretch = isLast ? Math.min(usable / total, 1.2) : usable / total;
    const widths = natural.map((w) => w * stretch);

    const wrap = document.createElement('div');
    wrap.className = 'system';
    container.appendChild(wrap);
    const surface = document.createElement('div');
    surface.className = 'system-surface';
    wrap.appendChild(surface);

    const renderer = new VF.Renderer(surface, VF.Renderer.Backends.SVG);
    renderer.resize(width, L.height);
    const ctx = renderer.getContext();

    const noteOf = new Map(); // piece → {note, staffKey}
    const staffPieces = { treble: [], bass: [] };
    const anchors = []; // 페달 표시 위치 계산용 {unit(곡 전체 기준), x}
    let x = margin;
    idxs.forEach((mi, k) => {
      const m = score.measures[mi];
      const w = widths[k];
      const sT = new VF.Stave(x, L.top, w);
      const sB = new VF.Stave(x, L.top + STAVE_GAP, w);
      if (k === 0) {
        sT.addClef('treble').addKeySignature(KEY_SIG[score.fifths + 7]);
        sB.addClef('bass').addKeySignature(KEY_SIG[score.fifths + 7]);
        if (si === 0) {
          const ts = `${score.timeSig.num}/${score.timeSig.den}`;
          sT.addTimeSignature(ts);
          sB.addTimeSignature(ts);
        }
        if (mi > 0) sT.setMeasure(mi + 1);
      }
      const last = mi === score.measures.length - 1;
      if (last) {
        sT.setEndBarType(VF.Barline.type.END);
        sB.setEndBarType(VF.Barline.type.END);
      }
      sT.setContext(ctx).draw();
      sB.setContext(ctx).draw();

      const t = buildStaff(VF, m.treble, 'treble', score, isWholeRest(m.treble, score));
      const b = buildStaff(VF, m.bass, 'bass', score, isWholeRest(m.bass, score));
      const f = new VF.Formatter();
      f.joinVoices([t.voice]);
      f.joinVoices([b.voice]);
      f.format([t.voice, b.voice], Math.max(30, sT.getNoteEndX() - sT.getNoteStartX() - 8));
      t.voice.draw(ctx, sT);
      b.voice.draw(ctx, sB);
      for (const bm of [...t.beams, ...b.beams]) bm.setContext(ctx).draw();
      for (const [p, n] of t.map) noteOf.set(p, { note: n, staff: 'treble' });
      for (const [p, n] of b.map) noteOf.set(p, { note: n, staff: 'bass' });
      staffPieces.treble.push(...m.treble);
      staffPieces.bass.push(...m.bass);
      const barU = mi * score.unitsPerBar;
      for (const [p, n] of [...t.map, ...b.map]) anchors.push({ unit: barU + p.start, x: n.getAbsoluteX() });
      anchors.push({ unit: barU + score.unitsPerBar, x: x + w - 6, end: true });

      const link = (type) => new VF.StaveConnector(sT, sB).setType(type).setContext(ctx).draw();
      if (k === 0) {
        link('brace');
        link('singleLeft');
      }
      link(last ? 'boldDoubleRight' : 'singleRight');

      // 재생 위치 표시/클릭용 오버레이
      const ov = document.createElement('div');
      ov.className = 'measure-overlay';
      ov.style.left = `${(x / width) * 100}%`;
      ov.style.width = `${(w / width) * 100}%`;
      ov.style.top = `${((L.trebleTopLine - 24) / L.height) * 100}%`;
      ov.style.height = `${((L.bassBottomLine - L.trebleTopLine + 48) / L.height) * 100}%`;
      ov.dataset.measure = String(mi);
      ov.title = `${mi + 1}마디`;
      if (onMeasureClick) ov.addEventListener('click', () => onMeasureClick(mi));
      surface.appendChild(ov);
      measureEls[mi] = ov;
      x += w;
    });

    // 붙임줄 (줄바꿈을 넘는 경우 반쪽 붙임줄)
    for (const staff of ['treble', 'bass']) {
      const list = staffPieces[staff];
      list.forEach((p, i) => {
        const cur = noteOf.get(p);
        if (!cur || p.rest) return;
        const idx = p.midis.map((_, j) => j);
        if (p.tieNext) {
          const nxt = list[i + 1] && noteOf.get(list[i + 1]);
          const tie = new VF.StaveTie({ firstNote: cur.note, lastNote: nxt ? nxt.note : null, firstIndexes: idx, lastIndexes: idx });
          tie.setContext(ctx).draw();
        }
        if (p.tiePrev && i === 0) {
          const tie = new VF.StaveTie({ firstNote: null, lastNote: cur.note, firstIndexes: idx, lastIndexes: idx });
          tie.setContext(ctx).draw();
        }
      });
    }

    drawPedals(ctx, score, anchors, idxs, L.pedalY);

    const svg = surface.querySelector('svg');
    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${width} ${L.height}`);
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', `악보 ${si + 1}번째 줄`);
    }
    onProgress?.((si + 1) / systems.length);
    if (si % 3 === 2) await nextFrame();
  }
  return { measureEls, systems: systems.length };
}
