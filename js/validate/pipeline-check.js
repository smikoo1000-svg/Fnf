// 메타 검증 계층: 파이프라인 단계(전사 → 악보 → MIDI/MusicXML) 사이의 불변식을 매번 확인해,
// 한 단계의 오류가 다음 단계로 조용히 번지는 것(오류 전파)을 잡는다.
// 각 검사는 {stage, name, status:'ok'|'warn'|'error', detail} 을 낸다. 브라우저와 Node 양쪽에서 동작한다.
import { performanceNotes, unitToOriginalSeconds } from '../music/score.js';
import { scoreToMidi } from '../music/midi.js';
import { scoreToMusicXml } from '../music/musicxml.js';
import { parseMidiFile } from '../eval/midi-read.js';
import { noteScores } from '../eval/metrics.js';

/** 가상 연주 대조: 사람 연주의 타이밍 흔들림 정도(±70ms)는 허용하고, 그보다 크게 옮겨진 음은 불일치로 본다 */
const VIRTUAL_TOLERANCE = 0.07;
const VIRTUAL_WARN_F1 = 0.85;

/** 아주 작은 XML 파서(요소·속성·텍스트). 태그 짝이 맞지 않으면 예외 → 올바른 XML 인지 검사 겸용 */
export function parseXml(text) {
  const root = { name: '#root', attrs: {}, children: [], text: '' };
  const stack = [root];
  const re = /<\?[^]*?\?>|<!--[^]*?-->|<!DOCTYPE[^>]*>|<(\/?)([A-Za-z_][\w.-]*)((?:\s+[\w:.-]+\s*=\s*"[^"]*")*)\s*(\/?)>|([^<]+)/g;
  let m;
  let pos = 0;
  while ((m = re.exec(text))) {
    if (m.index !== pos) throw new Error(`XML 해석 실패: 위치 ${pos}`);
    pos = re.lastIndex;
    const [, close, name, attrText, selfClose, txt] = m;
    if (txt !== undefined) {
      stack[stack.length - 1].text += txt;
      continue;
    }
    if (!name) continue; // 선언·주석·DOCTYPE
    if (close) {
      const top = stack.pop();
      if (!top || top.name !== name) throw new Error(`XML 태그 짝 오류: </${name}> (열린 태그 ${top?.name})`);
      continue;
    }
    const attrs = {};
    for (const a of attrText.matchAll(/([\w:.-]+)\s*=\s*"([^"]*)"/g)) attrs[a[1]] = a[2];
    const el = { name, attrs, children: [], text: '' };
    stack[stack.length - 1].children.push(el);
    if (!selfClose) stack.push(el);
  }
  if (pos !== text.length || stack.length !== 1) throw new Error('XML 이 닫히지 않았습니다');
  return root;
}
const kids = (el, name) => el.children.filter((c) => c.name === name);
const kid = (el, name) => el.children.find((c) => c.name === name);
function* walk(el) {
  yield el;
  for (const c of el.children) yield* walk(c);
}

/**
 * @param {object} ctx
 * @param {{start:number,end:number,midi:number,velocity:number}[]} ctx.transcribed 전사 결과(초)
 * @param {object} ctx.score buildScore 결과 (applyFingering 적용 가능)
 * @param {import('../analysis/rhythm.js').BeatGrid} ctx.grid
 * @param {number} [ctx.minVelocity]
 * @returns {{checks:{stage:string,name:string,status:string,detail:string}[], errors:number, warnings:number}}
 */
export function checkPipeline({ transcribed, score, grid, minVelocity = 0 }) {
  const checks = [];
  const add = (stage, name, status, detail) => checks.push({ stage, name, status, detail });
  const run = (stage, name, fn) => {
    try {
      fn();
    } catch (err) {
      add(stage, name, 'error', `검사 중 예외: ${err.message}`);
    }
  };

  // 1) 전사
  run('전사', '음 값 유효성', () => {
    const bad = transcribed.filter((n) => !(Number.isFinite(n.start) && Number.isFinite(n.end) && n.start >= 0 && n.end > n.start && n.midi >= 21 && n.midi <= 108 && n.velocity >= 1 && n.velocity <= 127));
    add('전사', '음 값 유효성', bad.length ? 'error' : 'ok', bad.length ? `잘못된 음 ${bad.length}개 (시각·음높이·세기 범위 밖)` : `${transcribed.length}개 모두 정상`);
  });
  run('전사', '같은 음 겹침', () => {
    const byPitch = new Map();
    let overlaps = 0;
    for (const n of [...transcribed].sort((a, b) => a.start - b.start)) {
      const prev = byPitch.get(n.midi);
      if (prev && prev.end > n.start + 1e-6) overlaps++;
      byPitch.set(n.midi, n);
    }
    add('전사', '같은 음 겹침', overlaps ? 'warn' : 'ok', overlaps ? `같은 건반이 겹쳐 울리는 곳 ${overlaps}군데 (악보 단계에서 앞 음을 끊음)` : '없음');
  });

  // 2) 악보
  const pieceList = (key) => score.measures.flatMap((m, mi) => m[key].map((p) => ({ ...p, mi })));
  run('악보', '마디 길이', () => {
    const bad = [];
    score.measures.forEach((m, i) => {
      for (const key of ['treble', 'bass']) {
        const sum = m[key].reduce((a, p) => a + p.dur, 0);
        if (sum !== score.unitsPerBar) bad.push(`${i + 1}마디 ${key === 'treble' ? '오른손' : '왼손'} ${sum}/${score.unitsPerBar}`);
      }
    });
    add('악보', '마디 길이', bad.length ? 'error' : 'ok', bad.length ? bad.slice(0, 5).join(', ') : `${score.measures.length}마디 모두 박자에 맞음`);
  });
  run('악보', '붙임줄 연결', () => {
    let bad = 0;
    for (const key of ['treble', 'bass']) {
      const list = pieceList(key).filter((p) => !p.rest);
      list.forEach((p, i) => {
        const next = list[i + 1];
        if (p.tieNext && !(next && next.tiePrev && next.midis.join() === p.midis.join())) bad++;
      });
    }
    add('악보', '붙임줄 연결', bad ? 'error' : 'ok', bad ? `짝이 없는 붙임줄 ${bad}개` : '모두 짝이 맞음');
  });
  run('악보', '음 보존', () => {
    const s = score.stats;
    const accounted = s.velocityFiltered + s.ornamentMerged + s.duplicatesMerged + s.zeroLength + s.chordCapped + s.engraved;
    const heads = ['treble', 'bass'].reduce((a, key) => a + pieceList(key).filter((p) => !p.rest && !p.tiePrev).reduce((b, p) => b + p.midis.length, 0), 0);
    const ok = accounted === s.input && heads === s.engraved && s.input === transcribed.length;
    const parts = [
      `입력 ${s.input}`,
      `악보 ${s.engraved}`,
      s.velocityFiltered && `약한 음 제거 ${s.velocityFiltered}`,
      s.ornamentMerged && `꾸밈음으로 합침 ${s.ornamentMerged}`,
      s.duplicatesMerged && `중복 합침 ${s.duplicatesMerged}`,
      s.zeroLength && `길이 0 ${s.zeroLength}`,
      s.chordCapped && `화음 음 수 제한 ${s.chordCapped}`,
    ].filter(Boolean);
    add('악보', '음 보존', ok ? (s.chordCapped ? 'warn' : 'ok') : 'error', ok ? parts.join(' · ') : `설명되지 않는 음이 있습니다: ${parts.join(' · ')} (음표 머리 ${heads})`);
  });

  // 3) 가상 연주 대조: 악보를(꾸밈음·트릴을 풀어) 원래 시간축으로 되돌려 연주했을 때 전사 결과와 얼마나 맞는가.
  //    양자화 단위가 너무 거칠거나, 손 나눔·화음 제한·꾸밈음 처리로 음이 사라지면 여기서 드러난다.
  run('가상 연주', '전사 결과와 대조', () => {
    const ref = transcribed.filter((n) => n.velocity >= minVelocity).map((n) => ({ start: n.start, end: n.end, pitch: n.midi }));
    const est = performanceNotes(score).map((n) => ({ start: unitToOriginalSeconds(score, grid, n.start), end: unitToOriginalSeconds(score, grid, n.end), pitch: n.midi }));
    const r = noteScores(ref, est, { onsetTolerance: VIRTUAL_TOLERANCE, offsetRatio: null });
    add(
      '가상 연주',
      '전사 결과와 대조',
      r.f1 >= VIRTUAL_WARN_F1 ? 'ok' : 'warn',
      `음 시작 일치 F1 ${(r.f1 * 100).toFixed(1)}% (허용 ±${Math.round(VIRTUAL_TOLERANCE * 1000)}ms)` +
        (r.f1 < VIRTUAL_WARN_F1 ? ' — 음표 단위를 16분음표로 바꾸거나 박자·템포를 확인하세요' : ''),
    );
  });

  // 4) MIDI 왕복
  let midiBytes = null;
  run('MIDI', '다시 읽기 일치', () => {
    midiBytes = scoreToMidi(score);
    const back = parseMidiFile(midiBytes);
    const expect = performanceNotes(score);
    const key = (pitch, tick) => `${pitch}@${tick}`;
    const count = (arr) => arr.reduce((m, k) => m.set(k, (m.get(k) ?? 0) + 1), new Map());
    // 초가 아니라 틱으로 비교한다 (MIDI 템포는 정수 마이크로초로 반올림되어, 긴 곡에서는 초→틱 환산이 1틱씩 어긋날 수 있다)
    const ticksPerUnit = back.ppq / 4;
    const a = count(expect.map((n) => key(n.midi, Math.round(n.start * ticksPerUnit))));
    const b = count(back.notes.map((n) => key(n.pitch, n.startTick)));
    let diff = 0;
    for (const [k, v] of a) diff += Math.abs(v - (b.get(k) ?? 0));
    for (const [k, v] of b) if (!a.has(k)) diff += v;
    const pedOk = back.sustain.length === (score.pedals ?? []).length;
    add('MIDI', '다시 읽기 일치', diff || !pedOk ? 'error' : 'ok', diff || !pedOk ? `음 불일치 ${diff}개, 페달 ${back.sustain.length}/${(score.pedals ?? []).length}` : `음 ${expect.length}개·페달 ${back.sustain.length}개 일치`);
  });

  // 5) MusicXML 왕복
  run('MusicXML', '다시 읽기 일치', () => {
    const xml = scoreToMusicXml(score, { fingering: !!score.showFingering });
    const doc = parseXml(xml);
    const part = [...walk(doc)].find((e) => e.name === 'part');
    const measures = kids(part, 'measure');
    const problems = [];
    if (measures.length !== score.measures.length) problems.push(`마디 수 ${measures.length}/${score.measures.length}`);
    let pitched = 0;
    let graces = 0;
    let trills = 0;
    let pedalStarts = 0;
    measures.forEach((m, i) => {
      let staff = 1;
      const sums = { 1: 0, 2: 0 };
      for (const el of m.children) {
        if (el.name === 'backup') staff = 2;
        if (el.name === 'direction' && [...walk(el)].some((e) => e.name === 'pedal' && e.attrs.type === 'start')) pedalStarts++;
        if (el.name !== 'note') continue;
        if (kid(el, 'grace')) {
          graces++;
          continue;
        }
        if (kid(el, 'pitch')) pitched++;
        if ([...walk(el)].some((e) => e.name === 'trill-mark')) trills++;
        if (!kid(el, 'chord')) sums[staff] += Number(kid(el, 'duration')?.text ?? 0);
      }
      for (const st of [1, 2]) if (sums[st] !== score.unitsPerBar) problems.push(`${i + 1}마디 ${st === 1 ? '오른손' : '왼손'} 길이 ${sums[st]}`);
    });
    const expPitched = ['treble', 'bass'].reduce((a, k) => a + pieceList(k).filter((p) => !p.rest).reduce((b, p) => b + p.midis.length, 0), 0);
    const expGraces = ['treble', 'bass'].reduce((a, k) => a + pieceList(k).reduce((b, p) => b + (p.graces?.length ?? 0), 0), 0);
    const expTrills = ['treble', 'bass'].reduce((a, k) => a + pieceList(k).filter((p) => p.ornament === 'trill').length, 0);
    if (pitched !== expPitched) problems.push(`음표 ${pitched}/${expPitched}`);
    if (graces !== expGraces) problems.push(`꾸밈음 ${graces}/${expGraces}`);
    if (trills !== expTrills) problems.push(`트릴 ${trills}/${expTrills}`);
    if (pedalStarts !== (score.pedals ?? []).length) problems.push(`페달 ${pedalStarts}/${(score.pedals ?? []).length}`);
    add('MusicXML', '다시 읽기 일치', problems.length ? 'error' : 'ok', problems.length ? problems.slice(0, 6).join(', ') : `올바른 XML · ${measures.length}마디 · 음표 ${pitched}개 일치`);
  });

  // 6) 연주 가능성
  run('연주 가능성', '한 손 폭·음 수', () => {
    let wide = 0;
    let many = 0;
    for (const key of ['treble', 'bass']) {
      for (const p of pieceList(key)) {
        if (p.rest || p.tiePrev) continue;
        if (p.midis[p.midis.length - 1] - p.midis[0] > 16) wide++; // 장10도(16반음) 초과
        if (p.midis.length > 5) many++;
      }
    }
    add('연주 가능성', '한 손 폭·음 수', wide || many ? 'warn' : 'ok', wide || many ? `한 손으로 닿기 어려운 화음 ${wide}개(10도 초과), 5음 초과 화음 ${many}개` : '모든 화음이 한 손 범위 안');
  });

  return { checks, errors: checks.filter((c) => c.status === 'error').length, warnings: checks.filter((c) => c.status === 'warn').length };
}
