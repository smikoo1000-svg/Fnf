// 검증 루프: 앱과 같은 경로(비트 추적 → 조성 → 악보 → 운지)로 악보를 만든 뒤
//   1) 메타 검증 계층(js/validate/pipeline-check.js)  2) MusicXML 3.1 XSD 스키마 검증(xmllint)
//   3) LilyPond 컴파일(musicxml2ly → lilypond, 마디 검사 경고 포함)
// 을 차례로 돌린다. 도구가 없으면 그 단계는 "건너뜀"으로 표시한다.
//
// 입력: 합성 곡(항상) + MAESTRO 정답 MIDI(data/maestro 가 있으면; scripts/eval/fetch_maestro.py)
// 실행: npm run validate [-- --limit N --out docs/benchmarks/validation.json]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { trackBeats, BeatGrid, chooseDownbeatPhase } from '../js/analysis/rhythm.js';
import { detectKey } from '../js/analysis/key.js';
import { onsetEnvelopeFromNotes } from '../js/analysis/transkun-runtime.js';
import { buildScore, TIME_SIGNATURES } from '../js/music/score.js';
import { applyFingering } from '../js/music/fingering.js';
import { scoreToMusicXml } from '../js/music/musicxml.js';
import { checkPipeline } from '../js/validate/pipeline-check.js';
import { parseMidiFile } from '../js/eval/midi-read.js';
import { odeToJoy, repeatedNotes } from '../tests/helpers/pieces.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') ? [...a, [x.slice(2), arr[i + 1]]] : a), []));
const limit = args.limit ? Number(args.limit) : Infinity;
const has = (cmd) => {
  try {
    execFileSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

/** MusicXML 3.1 스키마를 data/musicxml-3.1 에 받아 두고, 원격 import 를 로컬 파일로 바꾼다 */
async function schemaPath() {
  const dir = path.join(root, 'data/musicxml-3.1');
  const main = path.join(dir, 'musicxml.local.xsd');
  if (fs.existsSync(main)) return main;
  fs.mkdirSync(dir, { recursive: true });
  for (const f of ['musicxml.xsd', 'xlink.xsd', 'xml.xsd']) {
    const res = await fetch(`https://raw.githubusercontent.com/w3c/musicxml/v3.1/schema/${f}`);
    if (!res.ok) throw new Error(`스키마를 받을 수 없습니다: ${f} (${res.status})`);
    fs.writeFileSync(path.join(dir, f), await res.text());
  }
  const xsd = fs.readFileSync(path.join(dir, 'musicxml.xsd'), 'utf8').replace(/schemaLocation="http:\/\/www\.musicxml\.org\/xsd\/(xml|xlink)\.xsd"/g, 'schemaLocation="$1.xsd"');
  fs.writeFileSync(main, xsd);
  return main;
}

function inputs() {
  const list = [];
  for (const [name, p] of [['합성: 환희의 송가', odeToJoy({ bpm: 100 })], ['합성: 같은 음 반복', repeatedNotes({ bpm: 100 })]]) {
    list.push({ name, notes: p.truth.map((n) => ({ start: n.start, end: n.start + n.dur, midi: n.midi, velocity: 80 })), pedals: [] });
  }
  const dir = path.join(root, 'data/maestro');
  const subsetFile = path.join(root, 'scripts/eval/maestro-subset.json');
  if (fs.existsSync(dir)) {
    for (const p of JSON.parse(fs.readFileSync(subsetFile, 'utf8'))) {
      const f = path.join(dir, p.id + '.midi');
      if (!fs.existsSync(f)) continue;
      const gt = parseMidiFile(new Uint8Array(fs.readFileSync(f)));
      list.push({ name: `MAESTRO 정답: ${p.composer} — ${p.title}`, notes: gt.notes.map((n) => ({ ...n, midi: n.pitch })), pedals: gt.sustain });
    }
  }
  return list.slice(0, limit);
}

/** 앱(js/main.js)과 같은 순서로 악보를 만든다 */
function engrave({ notes, pedals }) {
  const dur = Math.max(...notes.map((n) => n.end)) + 1;
  const beat = trackBeats(onsetEnvelopeFromNotes(notes, dur), 100);
  const grid = new BeatGrid(beat.beats);
  const key = detectKey(notes)[0];
  const timeSig = TIME_SIGNATURES['4/4'];
  const score = buildScore(notes, grid, { timeSig, phase: chooseDownbeatPhase(grid, notes, 4), fifths: key.fifths, mode: key.mode, pedals });
  applyFingering(score);
  score.showFingering = true;
  return { score, grid, bpm: beat.bpm };
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'validate-'));
const xsd = has('xmllint') ? await schemaPath().catch((e) => (console.log('  (XSD 건너뜀:', e.message + ')'), null)) : null;
const lily = has('musicxml2ly') && has('lilypond');
const results = [];
for (const [i, item] of inputs().entries()) {
  const { score, grid, bpm } = engrave(item);
  const meta = checkPipeline({ transcribed: item.notes, score, grid });
  const xmlPath = path.join(tmp, `p${i}.musicxml`);
  fs.writeFileSync(xmlPath, scoreToMusicXml(score, { title: item.name, fingering: true }));
  const row = { name: item.name, notes: item.notes.length, measures: score.measures.length, bpm: Math.round(bpm), meta: { errors: meta.errors, warnings: meta.warnings, checks: meta.checks } };

  if (xsd) {
    try {
      execFileSync('xmllint', ['--noout', '--nonet', '--schema', xsd, xmlPath], { stdio: 'pipe' });
      row.xsd = 'ok';
    } catch (e) {
      row.xsd = 'error';
      row.xsdMessage = String(e.stderr).split('\n').slice(0, 5).join(' | ');
    }
  } else row.xsd = 'skipped';

  if (lily) {
    const ly = path.join(tmp, `p${i}.ly`);
    try {
      execFileSync('musicxml2ly', ['--no-beaming', '-o', ly, xmlPath], { stdio: 'pipe' });
      const out = execFileSync('lilypond', ['-s', '-dno-point-and-click', '-o', path.join(tmp, `p${i}`), ly], { stdio: 'pipe', timeout: 600000 }).toString();
      row.lilypond = 'ok';
      row.lilypondWarnings = (out.match(/warning/gi) ?? []).length;
    } catch (e) {
      const log = String(e.stderr ?? '') + String(e.stdout ?? '');
      row.lilypond = fs.existsSync(path.join(tmp, `p${i}.pdf`)) ? 'ok' : 'error';
      row.lilypondWarnings = (log.match(/warning/gi) ?? []).length;
      row.barcheckFailures = (log.match(/barcheck failed/gi) ?? []).length;
      if (row.lilypond === 'error') row.lilypondMessage = log.split('\n').filter((l) => /error/i.test(l)).slice(0, 3).join(' | ');
    }
    row.pdf = fs.existsSync(path.join(tmp, `p${i}.pdf`));
  } else row.lilypond = 'skipped';

  results.push(row);
  const warnNames = meta.checks.filter((c) => c.status !== 'ok').map((c) => `${c.name}:${c.status}`).join(', ');
  console.log(
    `${row.name.slice(0, 58).padEnd(58)} 마디 ${String(row.measures).padStart(3)}  메타 오류 ${meta.errors} 경고 ${meta.warnings}${warnNames ? ` (${warnNames})` : ''}  XSD ${row.xsd}  LilyPond ${row.lilypond}${row.pdf ? '(PDF)' : ''}${row.barcheckFailures ? ` 마디검사실패 ${row.barcheckFailures}` : ''}`,
  );
  if (row.xsdMessage) console.log('   XSD:', row.xsdMessage);
  if (row.lilypondMessage) console.log('   LilyPond:', row.lilypondMessage);
}
const failed = results.filter((r) => r.meta.errors || r.xsd === 'error' || r.lilypond === 'error' || r.barcheckFailures);
console.log(`\n${results.length}개 입력 중 실패 ${failed.length}개 (메타 오류·XSD 오류·LilyPond 오류·마디 검사 실패)`);
if (args.out) fs.writeFileSync(args.out, JSON.stringify(results, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
process.exitCode = failed.length ? 1 : 0;
