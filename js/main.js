// 앱 진입점: 입력 → 분석(워커) → 리듬/조성 추정 → 악보 생성 → 렌더링/재생/내보내기
import { decodeAudio, sliceSamples, normalize, cropBuffer, ANALYSIS_RATE } from './audio/decode.js';
import { canRecord, startRecording } from './audio/recorder.js';
import { Player } from './audio/player.js';
import { renderWav } from './audio/piano.js';
import { analyze, cancelAnalysis } from './analysis/analyzer.js';
import { trackBeats, fixedTempoGrid, BeatGrid, chooseDownbeatPhase } from './analysis/rhythm.js';
import { detectKey, keyNameKo, keyFifths } from './analysis/key.js';
import { buildScore, TIME_SIGNATURES, meterInfo, scoreToPlayback, unitToOriginalSeconds } from './music/score.js';
import { scoreToMidi } from './music/midi.js';
import { scoreToMusicXml } from './music/musicxml.js';
import { renderScore } from './render/score-view.js';
import { PianoRoll } from './render/pianoroll.js';
import { renderDemo } from './demo.js';

const $ = (id) => document.getElementById(id);
const MAX_DEFAULT_SEC = 300;
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteName = (m) => `${NOTE_NAMES[m % 12]}${Math.floor(m / 12) - 1}`;

const settings = {
  engine: 'ml',
  sensitivity: 0.5,
  timeSig: '4/4',
  bpm: null, // null = 자동
  key: 'auto',
  quantum: 1,
  split: 60,
  minVel: 0,
  maxChord: 4,
  legato: true,
  shift: 0,
};

const state = {
  audio: null, // {samples, playback, duration, name}
  seg: { start: 0, end: 0 },
  result: null,
  beat: null, // trackBeats 결과
  grid: null,
  autoPhase: 0,
  keys: [],
  score: null,
  segBuffer: null,
  busy: false,
  recorder: null,
};

const player = new Player();
const roll = new PianoRoll($('roll'), { onSeek: (t) => seekPianoTime(t) });
let renderToken = { cancelled: false };
let activeMeasure = -1;
let measureEls = [];
let seekDragging = false;

/* ---------- 공통 UI ---------- */
function showBanner(msg, kind = 'error') {
  const b = $('banner');
  if (!msg) {
    b.hidden = true;
    return;
  }
  b.textContent = msg;
  b.className = `banner${kind === 'info' ? ' info' : ''}`;
  b.hidden = false;
}

function setProgress(v, label) {
  $('progress').hidden = false;
  $('progress-label').textContent = label;
  const pct = Math.round(Math.min(1, Math.max(0, v)) * 100);
  $('progress-pct').textContent = `${pct}%`;
  $('bar-fill').style.width = `${pct}%`;
}

const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const sensLabel = (v) => (v < 0.35 ? '낮음' : v > 0.65 ? '높음' : '보통');
const baseName = (name) => name.replace(/\.[^.]+$/, '') || '피아노 악보';

/* ---------- 입력 ---------- */
/** 분석 중에는 새 입력을 받지 않는다 (결과가 뒤섞이는 것을 방지) */
function guardBusy() {
  if (!state.busy) return false;
  showBanner('분석이 진행 중입니다. 끝난 뒤(또는 취소한 뒤)에 다시 시도해 주세요.', 'info');
  return true;
}

async function handleFile(file) {
  if (!file || guardBusy()) return;
  showBanner('');
  try {
    setProgress(0.02, '파일 읽는 중…');
    const buf = await file.arrayBuffer();
    setProgress(0.05, '오디오 디코딩 중…');
    const decoded = await decodeAudio(buf);
    await useAudio({ ...decoded, name: file.name });
  } catch (err) {
    $('progress').hidden = true;
    showBanner(err.message || String(err));
  }
}

async function useAudio(audio) {
  state.audio = audio;
  const end = Math.min(audio.duration, MAX_DEFAULT_SEC);
  state.seg = { start: 0, end: Math.ceil(end) };
  $('seg-start').value = '0';
  $('seg-end').value = String(state.seg.end);
  $('seg-end').max = String(Math.ceil(audio.duration));
  $('seg-hint').textContent = `전체 길이 ${fmtTime(audio.duration)}` + (audio.duration > MAX_DEFAULT_SEC ? ` — 긴 곡은 처음 ${MAX_DEFAULT_SEC / 60}분만 분석합니다` : '');
  $('btn-analyze').disabled = false;
  if (audio.duration < 1) throw new Error('오디오가 너무 짧습니다 (1초 미만).');
  await runAnalysis();
}

async function runAnalysis() {
  if (!state.audio || state.busy) return;
  state.busy = true;
  showBanner('');
  player.stop();
  const start = Math.max(0, Number($('seg-start').value) || 0);
  let end = Number($('seg-end').value) || state.audio.duration;
  end = Math.min(state.audio.duration, Math.max(start + 1, end));
  state.seg = { start, end };
  settings.engine = document.querySelector('input[name="engine"]:checked').value;
  settings.sensitivity = Number($('sens').value);

  try {
    setProgress(0.03, '준비 중…');
    const samples = normalize(sliceSamples(state.audio.samples, start, end));
    state.segBuffer = cropBuffer(state.audio.playback, start, end);
    const result = await analyze(samples, {
      engine: settings.engine,
      sensitivity: settings.sensitivity,
      onProgress: (v, label) => setProgress(v, `${label} ${Math.round(v * 100)}%`),
    });
    state.result = result;
    $('progress').hidden = true;
    $('result').hidden = false;
    const note = $('engine-note');
    note.hidden = !result.note;
    note.textContent = result.note ?? '';
    if (!result.notes.length) showBanner('음을 찾지 못했어요. 민감도를 높이거나 분석 구간을 바꿔 다시 시도해 보세요.', 'info');
    computeRhythmAndKey(true);
    player.setOriginal(state.segBuffer);
    await rebuild();
    $('result').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  } catch (err) {
    $('progress').hidden = true;
    if (err.message !== '취소됨') showBanner(`분석 중 오류가 발생했습니다: ${err.message || err}`);
  } finally {
    state.busy = false;
    $('btn-cancel').disabled = false;
  }
}

/* ---------- 리듬/조성 ---------- */
function computeRhythmAndKey(resetKey) {
  const r = state.result;
  const meter = meterInfo(TIME_SIGNATURES[settings.timeSig]);
  if (settings.bpm) state.beat = fixedTempoGrid(r.onsetEnv, r.frameRate, settings.bpm);
  else state.beat = trackBeats(r.onsetEnv, r.frameRate, { prior: meter.compound ? 62 : 118 });
  state.grid = new BeatGrid(state.beat.beats);
  state.autoPhase = chooseDownbeatPhase(state.grid, r.notes, meter.beatsPerBar);
  if (resetKey || !state.keys.length) {
    state.keys = detectKey(r.notes);
    fillKeySelect();
  }
  $('bpm').value = String(Math.round(state.beat.bpm));
  $('bpm-unit').textContent = meter.compound ? '(♩. 점4분음표 기준)' : '(♩ 4분음표 기준)';
}

function fillKeySelect() {
  const sel = $('key');
  const best = state.keys[0];
  sel.replaceChildren();
  const auto = new Option(`자동 추정 (${keyNameKo(best.tonic, best.mode)})`, 'auto');
  sel.add(auto);
  for (const mode of ['major', 'minor']) for (let t = 0; t < 12; t++) sel.add(new Option(keyNameKo(t, mode), `${t}-${mode}`));
  sel.value = settings.key;
}

function currentKey() {
  if (settings.key === 'auto') return state.keys[0] ?? { tonic: 0, mode: 'major', fifths: 0 };
  const [t, mode] = settings.key.split('-');
  return { tonic: Number(t), mode, fifths: keyFifths(Number(t), mode) };
}

/* ---------- 악보 생성/렌더 ---------- */
async function rebuild({ retrack = false } = {}) {
  if (!state.result) return;
  if (retrack) computeRhythmAndKey(false);
  const ts = TIME_SIGNATURES[settings.timeSig];
  const meter = meterInfo(ts);
  const key = currentKey();
  const phase = (state.autoPhase + settings.shift) % meter.beatsPerBar;
  $('shift-out').textContent = settings.shift === 0 ? '자동' : `+${settings.shift}박`;
  state.score = buildScore(state.result.notes, state.grid, {
    timeSig: ts,
    phase,
    quantum: settings.quantum,
    splitPoint: settings.split,
    fifths: key.fifths,
    mode: key.mode,
    legato: settings.legato,
    maxChord: settings.maxChord,
    minVelocity: settings.minVel,
  });
  updateSummary();
  updatePlayerData();
  await paintScore();
}

function updateSummary() {
  const { score, result, beat } = state;
  const key = currentKey();
  const meter = meterInfo(TIME_SIGNATURES[settings.timeSig]);
  const engineName = result.engine === 'ml' ? `AI 정밀${result.backend ? ` (${result.backend === 'webgl' ? 'GPU' : 'CPU'})` : ''}` : '내장 빠른 분석';
  const bpmText = meter.compound ? `♩.=${Math.round(beat.bpm)}` : `♩=${Math.round(beat.bpm)}`;
  const items = [
    ['분석 엔진', engineName],
    ['인식한 음', `${result.notes.length.toLocaleString()}개`],
    ['악보 음표', `${score.notes.length.toLocaleString()}개`],
    ['템포', bpmText],
    ['박자', settings.timeSig],
    ['조성', keyNameKo(key.tonic, key.mode)],
    ['마디 수', `${score.measures.length}`],
  ];
  const ul = $('chips');
  ul.replaceChildren();
  for (const [k, v] of items) {
    const li = document.createElement('li');
    li.append(`${k} `);
    const b = document.createElement('b');
    b.textContent = v;
    li.append(b);
    ul.append(li);
  }
  const title = baseName(state.audio.name);
  $('paper-title').textContent = title;
  $('paper-meta').textContent = `${keyNameKo(key.tonic, key.mode)} · ${settings.timeSig} · ${bpmText} · 피아노 자동 전사`;
}

function updatePlayerData() {
  const { score } = state;
  const notes = scoreToPlayback(score);
  player.setPiano(notes);
  if (player.mode === 'original') player.setOriginal(state.segBuffer);
  const dur = notes.length ? Math.max(...notes.map((n) => n.time + n.dur)) : 1;
  const barSec = score.unitsPerBar * score.secondsPerUnit;
  const bars = Array.from({ length: score.measures.length }, (_, i) => i * barSec);
  roll.setData(notes, dur, bars);
  onPlayerState({ position: 0, duration: player.duration, playing: false });
}

async function paintScore() {
  renderToken.cancelled = true;
  const token = (renderToken = { cancelled: false });
  const host = $('score');
  $('score-empty').hidden = state.score.measures.length > 0;
  const width = Math.max(460, Math.min(1100, host.clientWidth || 900));
  try {
    const res = await renderScore(host, state.score, {
      width,
      signal: token,
      onMeasureClick: (i) => seekMeasure(i),
    });
    if (token.cancelled) return;
    measureEls = res.measureEls;
    activeMeasure = -1;
  } catch (err) {
    showBanner(`악보를 그리는 중 오류가 발생했습니다: ${err.message || err}`);
  }
}

/* ---------- 재생 ---------- */
function unitsFromPosition(pos) {
  const { score, grid } = state;
  if (!score) return 0;
  if (player.mode === 'piano') return pos / score.secondsPerUnit;
  return (grid.posOf(pos) - score.origin) * score.unitsPerBeat;
}

function positionFromUnits(unit) {
  const { score, grid } = state;
  return player.mode === 'piano' ? unit * score.secondsPerUnit : unitToOriginalSeconds(score, grid, unit);
}

function seekMeasure(i) {
  if (!state.score) return;
  player.seek(positionFromUnits(i * state.score.unitsPerBar));
}

function seekPianoTime(t) {
  if (!state.score) return;
  player.seek(positionFromUnits(t / state.score.secondsPerUnit));
}

function onPlayerState({ position, duration, playing }) {
  $('ico-play').hidden = playing;
  $('ico-pause').hidden = !playing;
  $('btn-play').setAttribute('aria-label', playing ? '일시정지' : '재생');
  $('time').textContent = `${fmtTime(position)} / ${fmtTime(duration)}`;
  if (!seekDragging) $('seek').value = duration ? String(Math.round((position / duration) * 1000)) : '0';
  if (!state.score) return;
  const unit = unitsFromPosition(position);
  roll.setPlayhead(unit * state.score.secondsPerUnit);
  const m = Math.max(0, Math.min(state.score.measures.length - 1, Math.floor(unit / state.score.unitsPerBar)));
  if (m !== activeMeasure) {
    measureEls[activeMeasure]?.classList.remove('active');
    activeMeasure = m;
    const el = measureEls[m];
    if (el) {
      el.classList.add('active');
      if (playing) el.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }
}
player.addEventListener('state', (e) => onPlayerState(e.detail));

/* ---------- 내보내기 ---------- */
function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

async function withBusy(btn, label, fn) {
  const old = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = label;
  try {
    await fn();
  } catch (err) {
    showBanner(`내보내기 중 오류가 발생했습니다: ${err.message || err}`);
  } finally {
    btn.innerHTML = old;
    btn.disabled = false;
  }
}

/* ---------- 이벤트 연결 ---------- */
function bindControls() {
  const drop = $('drop');
  $('file').addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
    e.target.value = '';
  });
  drop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $('file').click();
    }
  });
  for (const ev of ['dragenter', 'dragover']) {
    window.addEventListener(ev, (e) => {
      e.preventDefault();
      if (e.target.closest?.('#drop')) drop.classList.add('over');
    });
  }
  for (const ev of ['dragleave', 'drop']) window.addEventListener(ev, () => drop.classList.remove('over'));
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer?.files?.[0]);
  });

  $('btn-demo').addEventListener('click', async () => {
    if (guardBusy()) return;
    try {
      showBanner('');
      setProgress(0.03, '예시 곡을 만드는 중…');
      const demo = await renderDemo();
      await useAudio({ ...demo, name: '환희의 송가 (예시).wav' });
    } catch (err) {
      $('progress').hidden = true;
      showBanner(err.message || String(err));
    }
  });

  const rec = $('btn-rec');
  if (!canRecord()) {
    rec.disabled = true;
    rec.title = '이 브라우저는 녹음을 지원하지 않습니다';
  }
  rec.addEventListener('click', async () => {
    if (state.recorder) {
      state.recorder.stop();
      return;
    }
    if (guardBusy()) return;
    try {
      showBanner('');
      state.recorder = await startRecording();
      rec.classList.add('recording');
      const t0 = Date.now();
      const tick = setInterval(() => ($('rec-label').textContent = `녹음 중지 (${fmtTime((Date.now() - t0) / 1000)})`), 250);
      $('rec-label').textContent = '녹음 중지 (0:00)';
      const blob = await state.recorder.result;
      clearInterval(tick);
      state.recorder = null;
      rec.classList.remove('recording');
      $('rec-label').textContent = '마이크로 녹음';
      setProgress(0.05, '녹음 파일 처리 중…');
      const decoded = await decodeAudio(await blob.arrayBuffer());
      await useAudio({ ...decoded, name: '마이크 녹음.wav' });
    } catch (err) {
      state.recorder = null;
      rec.classList.remove('recording');
      $('rec-label').textContent = '마이크로 녹음';
      $('progress').hidden = true;
      showBanner(err?.name === 'NotAllowedError' ? '마이크 사용 권한이 필요합니다. 브라우저 주소창의 권한 설정을 확인해 주세요.' : `녹음할 수 없습니다: ${err.message || err}`);
    }
  });

  $('sens').addEventListener('input', (e) => ($('sens-out').textContent = sensLabel(Number(e.target.value))));
  $('btn-analyze').addEventListener('click', () => runAnalysis());
  $('btn-cancel').addEventListener('click', () => {
    // busy 는 분석 Promise 가 완전히 끝날 때(runAnalysis 의 finally)까지 유지한다
    cancelAnalysis();
    $('progress-label').textContent = '취소하는 중…';
    $('btn-cancel').disabled = true;
  });
  $('btn-reset').addEventListener('click', () => {
    player.stop();
    $('result').hidden = true;
    state.result = null;
    window.scrollTo({ top: 0 });
  });

  // 악보 설정 (즉시 반영)
  const debounce = (fn, ms = 120) => {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  };
  const apply = debounce((opts) => rebuild(opts));
  $('ts').addEventListener('change', (e) => {
    const before = meterInfo(TIME_SIGNATURES[settings.timeSig]).compound;
    settings.timeSig = e.target.value;
    settings.shift = 0;
    if (meterInfo(TIME_SIGNATURES[settings.timeSig]).compound !== before) settings.bpm = null;
    apply({ retrack: true });
  });
  const setBpm = (v) => {
    settings.bpm = Math.min(300, Math.max(30, v));
    apply({ retrack: true });
  };
  $('bpm').addEventListener('change', (e) => Number(e.target.value) > 0 && setBpm(Number(e.target.value)));
  $('bpm-half').addEventListener('click', () => setBpm((state.beat?.bpm ?? 120) / 2));
  $('bpm-double').addEventListener('click', () => setBpm((state.beat?.bpm ?? 120) * 2));
  $('bpm-auto').addEventListener('click', () => {
    settings.bpm = null;
    settings.shift = 0;
    apply({ retrack: true });
  });
  $('key').addEventListener('change', (e) => {
    settings.key = e.target.value;
    apply();
  });
  $('quantum').addEventListener('change', (e) => {
    settings.quantum = Number(e.target.value);
    apply();
  });
  $('split').addEventListener('input', (e) => {
    settings.split = Number(e.target.value);
    $('split-out').textContent = noteName(settings.split) + (settings.split === 60 ? ' (가온 다)' : '');
    apply();
  });
  $('minvel').addEventListener('input', (e) => {
    settings.minVel = Number(e.target.value);
    $('minvel-out').textContent = String(settings.minVel);
    apply();
  });
  $('maxchord').addEventListener('change', (e) => {
    settings.maxChord = Number(e.target.value);
    apply();
  });
  $('legato').addEventListener('change', (e) => {
    settings.legato = e.target.checked;
    apply();
  });
  const bpb = () => meterInfo(TIME_SIGNATURES[settings.timeSig]).beatsPerBar;
  $('shift-next').addEventListener('click', () => {
    settings.shift = (settings.shift + 1) % bpb();
    apply();
  });
  $('shift-prev').addEventListener('click', () => {
    settings.shift = (settings.shift + bpb() - 1) % bpb();
    apply();
  });

  // 플레이어
  $('btn-play').addEventListener('click', () => (player.playing ? player.pause() : player.play()));
  $('btn-stop').addEventListener('click', () => player.stop());
  const seek = $('seek');
  seek.addEventListener('pointerdown', () => (seekDragging = true));
  seek.addEventListener('input', () => {
    $('time').textContent = `${fmtTime((Number(seek.value) / 1000) * player.duration)} / ${fmtTime(player.duration)}`;
  });
  seek.addEventListener('change', () => {
    seekDragging = false;
    player.seek((Number(seek.value) / 1000) * player.duration);
  });
  seek.addEventListener('pointerup', () => (seekDragging = false));
  for (const r of document.querySelectorAll('input[name="src"]')) r.addEventListener('change', (e) => e.target.checked && player.setMode(e.target.value));
  $('rate').addEventListener('change', (e) => player.setRate(Number(e.target.value)));
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body && state.result) {
      e.preventDefault();
      player.playing ? player.pause() : player.play();
    }
  });

  // 내보내기
  const fileBase = () => baseName(state.audio?.name ?? 'piano');
  $('dl-midi').addEventListener('click', () => {
    const bytes = scoreToMidi(state.score, { title: fileBase() });
    download(new Blob([bytes], { type: 'audio/midi' }), `${fileBase()}.mid`);
  });
  $('dl-xml').addEventListener('click', () => {
    const xml = scoreToMusicXml(state.score, { title: fileBase() });
    download(new Blob([xml], { type: 'application/vnd.recordare.musicxml+xml' }), `${fileBase()}.musicxml`);
  });
  $('dl-wav').addEventListener('click', (e) =>
    withBusy(e.currentTarget, '피아노 연주 만드는 중…', async () => {
      const wav = await renderWav(scoreToPlayback(state.score));
      download(wav, `${fileBase()}-piano.wav`);
    }),
  );
  $('dl-print').addEventListener('click', () => window.print());

  // 창 크기가 바뀌면 악보 폭을 다시 계산
  let lastW = $('score').clientWidth;
  window.addEventListener(
    'resize',
    debounce(() => {
      const w = $('score').clientWidth;
      if (state.score && Math.abs(w - lastW) > 40) {
        lastW = w;
        paintScore();
      }
      roll.draw();
    }, 250),
  );
}

bindControls();
$('sens-out').textContent = sensLabel(0.5);
$('split-out').textContent = 'C4 (가온 다)';
