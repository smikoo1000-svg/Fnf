// 조성(Key) 추정: 음길이·세기로 가중한 피치클래스 히스토그램과 Krumhansl–Kessler 프로파일의 상관.

const KK_MAJOR = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const KK_MINOR = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

/** 장조 주음(피치클래스) → 조표 #(+)/b(-) 개수 */
const MAJOR_FIFTHS = [0, -5, 2, -3, 4, -1, 6, 1, -4, 3, -2, 5];

const NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function corr(a, b) {
  const n = a.length;
  const ma = a.reduce((x, y) => x + y, 0) / n;
  const mb = b.reduce((x, y) => x + y, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

export function keyFifths(tonic, mode) {
  return mode === 'minor' ? MAJOR_FIFTHS[(tonic + 3) % 12] : MAJOR_FIFTHS[tonic];
}

export function keyName(tonic, mode) {
  const fifths = keyFifths(tonic, mode);
  const name = (fifths < 0 ? NAMES_FLAT : NAMES_SHARP)[tonic];
  return mode === 'minor' ? `${name} minor` : `${name} major`;
}

/** 한글 표기 (예: "다장조", "가단조") */
export function keyNameKo(tonic, mode) {
  const ko = { C: '다', D: '라', E: '마', F: '바', G: '사', A: '가', B: '나' };
  const fifths = keyFifths(tonic, mode);
  const name = (fifths < 0 ? NAMES_FLAT : NAMES_SHARP)[tonic];
  const letter = ko[name[0]];
  const acc = name.length > 1 ? (name[1] === '#' ? '올림' : '내림') : '';
  return `${acc}${letter}${mode === 'minor' ? '단조' : '장조'}`;
}

/**
 * @param {{midi:number,start:number,end:number,velocity:number}[]} notes
 * @returns {{tonic:number, mode:'major'|'minor', fifths:number, score:number}[]} 점수 내림차순
 */
export function detectKey(notes) {
  const hist = new Array(12).fill(0);
  for (const n of notes) hist[n.midi % 12] += Math.max(0.05, n.end - n.start) * (0.4 + n.velocity / 127);
  if (hist.every((v) => v === 0)) return [{ tonic: 0, mode: 'major', fifths: 0, score: 0 }];
  const out = [];
  for (let t = 0; t < 12; t++) {
    const rotated = (profile) => hist.map((_, i) => profile[(i - t + 12) % 12]);
    // rotated[i]: 주음이 t일 때 피치클래스 i에 대응하는 프로파일 값
    out.push({ tonic: t, mode: 'major', fifths: keyFifths(t, 'major'), score: corr(hist, rotated(KK_MAJOR)) });
    out.push({ tonic: t, mode: 'minor', fifths: keyFifths(t, 'minor'), score: corr(hist, rotated(KK_MINOR)) });
  }
  out.sort((a, b) => b.score - a.score);
  return out;
}

/** MIDI 번호 → 조표에 맞는 음이름 {letter:'c'..'b', accidental:''|'#'|'b', octave} */
export function spellMidi(midi, fifths) {
  const pc = midi % 12;
  const names = fifths < 0 ? NAMES_FLAT : NAMES_SHARP;
  const name = names[pc];
  return { letter: name[0].toLowerCase(), accidental: name.length > 1 ? name[1] : '', octave: Math.floor(midi / 12) - 1 };
}
