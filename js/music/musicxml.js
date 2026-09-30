// MusicXML 3.1 (score-partwise) 내보내기. MuseScore, Finale, Sibelius, Dorico 등에서 열 수 있다.
import { spellMidi } from '../analysis/key.js';

const TYPE_NAME = { w: 'whole', h: 'half', q: 'quarter', 8: 'eighth', 16: '16th' };
const DUR_INFO = {
  16: ['w', 0],
  12: ['h', 1],
  8: ['h', 0],
  6: ['q', 1],
  4: ['q', 0],
  3: ['8', 1],
  2: ['8', 0],
  1: ['16', 0],
};

const esc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);

/** 앞꾸밈음(사선, 음길이 없음): 주음 바로 앞에 둔다 */
function graceXml(midi, { staff, voice, fifths }) {
  const sp = spellMidi(midi, fifths);
  return (
    '<note><grace slash="yes"/><pitch>' +
    `<step>${sp.letter.toUpperCase()}</step>` +
    (sp.accidental ? `<alter>${sp.accidental === '#' ? 1 : -1}</alter>` : '') +
    `<octave>${sp.octave}</octave></pitch><voice>${voice}</voice><type>eighth</type><staff>${staff}</staff></note>`
  );
}

function noteXml(piece, { staff, voice, fifths, chordIndex, measureRest, barLen, fingering }) {
  const [type, dots] = DUR_INFO[piece.dur];
  const lines = [];
  if (piece.rest) {
    lines.push('<note>');
    lines.push(measureRest ? '<rest measure="yes"/>' : '<rest/>');
    lines.push(`<duration>${measureRest ? barLen : piece.dur}</duration>`);
    lines.push(`<voice>${voice}</voice>`);
    if (!measureRest) {
      lines.push(`<type>${TYPE_NAME[type]}</type>`);
      for (let i = 0; i < dots; i++) lines.push('<dot/>');
    }
    lines.push(`<staff>${staff}</staff>`);
    lines.push('</note>');
    return lines.join('');
  }
  const midi = piece.midis[chordIndex];
  const sp = spellMidi(midi, fifths);
  if (chordIndex === 0) for (const g of piece.graces ?? []) lines.push(graceXml(g, { staff, voice, fifths }));
  lines.push('<note>');
  if (chordIndex > 0) lines.push('<chord/>');
  lines.push('<pitch>');
  lines.push(`<step>${sp.letter.toUpperCase()}</step>`);
  if (sp.accidental) lines.push(`<alter>${sp.accidental === '#' ? 1 : -1}</alter>`);
  lines.push(`<octave>${sp.octave}</octave>`);
  lines.push('</pitch>');
  lines.push(`<duration>${piece.dur}</duration>`);
  if (piece.tiePrev) lines.push('<tie type="stop"/>');
  if (piece.tieNext) lines.push('<tie type="start"/>');
  lines.push(`<voice>${voice}</voice>`);
  lines.push(`<type>${TYPE_NAME[type]}</type>`);
  for (let i = 0; i < dots; i++) lines.push('<dot/>');
  lines.push(`<staff>${staff}</staff>`);
  const trill = piece.ornament === 'trill' && chordIndex === 0;
  const finger = fingering && !piece.fingerTied ? piece.fingers?.[chordIndex] : null;
  if (piece.tiePrev || piece.tieNext || trill || finger) {
    lines.push('<notations>');
    if (piece.tiePrev) lines.push('<tied type="stop"/>');
    if (piece.tieNext) lines.push('<tied type="start"/>');
    if (trill) lines.push('<ornaments><trill-mark/></ornaments>');
    if (finger) lines.push(`<technical><fingering>${finger}</fingering></technical>`);
    lines.push('</notations>');
  }
  lines.push('</note>');
  return lines.join('');
}

/**
 * 이 마디 안의 페달 밟기/떼기 지시. 커서가 마디 처음에 있을 때 넣고 <offset> 으로 위치를 준다.
 * 마디선에서 떼는 페달은 앞 마디 끝(offset = 마디 길이)에 둔다.
 */
function pedalDirections(pedals, barStart, barLen, isLast) {
  const out = [];
  const dir = (type, pos) =>
    `<direction placement="below"><direction-type><pedal type="${type}" line="no" sign="yes"/></direction-type>${pos ? `<offset>${pos}</offset>` : ''}<staff>2</staff><sound damper-pedal="${type === 'start' ? 'yes' : 'no'}"/></direction>`;
  const barEnd = barStart + barLen;
  for (const p of pedals) {
    if (p.start >= barStart && p.start < barEnd) out.push({ pos: p.start - barStart, xml: dir('start', p.start - barStart), order: 1 });
    if (p.end > barStart && (p.end < barEnd || (p.end === barEnd && !isLast) || (isLast && p.end >= barEnd)))
      out.push({ pos: Math.min(barLen, p.end - barStart), xml: dir('stop', Math.min(barLen, p.end - barStart)), order: 0 });
  }
  return out.sort((a, b) => a.pos - b.pos || a.order - b.order).map((d) => d.xml);
}

/**
 * @param {ReturnType<import('./score.js').buildScore>} score
 * @param {{title?:string}} [opt]
 */
export function scoreToMusicXml(score, { title = 'Piano Transcription', fingering = false } = {}) {
  const { timeSig, fifths, unitsPerBar, quarterBpm } = score;
  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');
  out.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">');
  out.push('<score-partwise version="3.1">');
  out.push(`<work><work-title>${esc(title)}</work-title></work>`);
  out.push('<identification><encoding><software>Piano Transcriber</software></encoding></identification>');
  out.push('<part-list><score-part id="P1"><part-name>Piano</part-name></score-part></part-list>');
  out.push('<part id="P1">');
  score.measures.forEach((m, i) => {
    out.push(`<measure number="${i + 1}">`);
    if (i === 0) {
      out.push('<attributes>');
      out.push('<divisions>4</divisions>');
      out.push(`<key><fifths>${fifths}</fifths><mode>${score.mode === 'minor' ? 'minor' : 'major'}</mode></key>`);
      out.push(`<time><beats>${timeSig.num}</beats><beat-type>${timeSig.den}</beat-type></time>`);
      out.push('<staves>2</staves>');
      out.push('<clef number="1"><sign>G</sign><line>2</line></clef>');
      out.push('<clef number="2"><sign>F</sign><line>4</line></clef>');
      out.push('</attributes>');
      out.push(
        `<direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${Math.round(quarterBpm)}</per-minute></metronome></direction-type><sound tempo="${Math.round(quarterBpm)}"/></direction>`,
      );
    }
    const barStart = i * unitsPerBar;
    for (const [key, staff, voice] of [['treble', 1, 1], ['bass', 2, 5]]) {
      if (staff === 2) out.push(...pedalDirections(score.pedals ?? [], barStart, unitsPerBar, i === score.measures.length - 1));
      const pieces = m[key];
      const wholeRest = pieces.length === 1 && pieces[0].rest && pieces[0].dur === unitsPerBar;
      for (const p of pieces) {
        if (p.rest) out.push(noteXml(p, { staff, voice, fifths, measureRest: wholeRest, barLen: unitsPerBar }));
        else p.midis.forEach((_, ci) => out.push(noteXml(p, { staff, voice, fifths, chordIndex: ci, fingering })));
      }
      if (staff === 1) out.push(`<backup><duration>${unitsPerBar}</duration></backup>`);
    }
    out.push('</measure>');
  });
  out.push('</part>');
  out.push('</score-partwise>');
  return out.join('\n');
}
