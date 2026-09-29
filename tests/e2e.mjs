// 브라우저 E2E 테스트 (Playwright + Chromium).  실행: npm run test:e2e
// 업로드 → 분석 → 악보 → 설정 변경 → 재생 → 내보내기 → 인쇄/모바일 화면까지 실제 앱을 그대로 검증한다.
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from '../scripts/serve.mjs';
import { renderPiano, evaluateNotes } from './helpers/synth.js';
import { odeToJoy } from './helpers/pieces.js';
import { encodeWav } from './helpers/wav.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, 'out');
fs.mkdirSync(outDir, { recursive: true });

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const root = execSync('npm root -g').toString().trim();
    return await import(pathToFileURL(path.join(root, 'playwright', 'index.mjs')).href);
  }
}

/** 최소 SMF 파서: [{tick, note, vel}] 온셋과 PPQ/템포 반환 */
function parseMidi(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  assert.equal(buf.subarray(0, 4).toString(), 'MThd');
  const nTracks = dv.getUint16(10);
  const ppq = dv.getUint16(12);
  let p = 14;
  let usPerQ = 500000;
  const ons = [];
  for (let t = 0; t < nTracks; t++) {
    assert.equal(buf.subarray(p, p + 4).toString(), 'MTrk');
    const end = p + 8 + dv.getUint32(p + 4);
    p += 8;
    let tick = 0;
    let running = 0;
    while (p < end) {
      let d = 0;
      let b;
      do {
        b = buf[p++];
        d = (d << 7) | (b & 0x7f);
      } while (b & 0x80);
      tick += d;
      if (buf[p] === 0xff) {
        const type = buf[p + 1];
        let l = 0;
        let q = p + 2;
        do {
          b = buf[q++];
          l = (l << 7) | (b & 0x7f);
        } while (b & 0x80);
        if (type === 0x51) usPerQ = (buf[q] << 16) | (buf[q + 1] << 8) | buf[q + 2];
        p = q + l;
      } else {
        if (buf[p] & 0x80) running = buf[p++];
        const kind = running & 0xf0;
        if (kind === 0xc0 || kind === 0xd0) p += 1;
        else {
          if (kind === 0x90 && buf[p + 1] > 0) ons.push({ tick, midi: buf[p] });
          p += 2;
        }
      }
    }
  }
  return { ppq, usPerQ, ons };
}

let passed = 0;
const step = (name) => console.log(`\n▶ ${name}`);
const ok = (msg) => {
  passed++;
  console.log(`  ✔ ${msg}`);
};

const { chromium } = await loadPlaywright();
const server = createServer().listen(0);
await new Promise((r) => server.once('listening', r));
const base = `http://localhost:${server.address().port}/`;

const browser = await chromium.launch({
  args: [
    '--autoplay-policy=no-user-gesture-required',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
  ],
});
const context = await browser.newContext({ viewport: { width: 1100, height: 1000 }, acceptDownloads: true, permissions: ['microphone'] });
const page = await context.newPage();
const problems = [];
page.on('console', (m) => m.type() === 'error' && problems.push(`console.error: ${m.text()}`));
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()}`));

const waitResult = (timeout = 240000) => page.waitForSelector('#result:not([hidden]) .measure-overlay', { timeout });
const chips = () => page.$$eval('#chips li', (l) => Object.fromEntries(l.map((li) => [li.firstChild.textContent.trim(), li.querySelector('b').textContent])));
const bannerText = async () => ((await page.isVisible('#banner')) ? page.textContent('#banner') : '');

try {
  /* ---------- 1. 업로드 + AI 분석 ---------- */
  step('WAV 업로드 → AI 분석 → 악보');
  const piece = odeToJoy({ bpm: 100 });
  const { samples } = renderPiano(piece.truth, { reverb: true, noise: 0.002 });
  const wavPath = path.join(os.tmpdir(), 'e2e-ode.wav');
  fs.writeFileSync(wavPath, encodeWav(samples, 22050));
  await page.goto(base);
  assert.match(await page.title(), /피아노 악보 변환기/);
  await page.setInputFiles('#file', wavPath);
  await waitResult();
  let c = await chips();
  assert.equal(await bannerText(), '', '오류 배너가 없어야 함');
  assert.match(c['분석 엔진'], /AI 정밀/, 'AI 엔진으로 분석되어야 함');
  const bpm = Number(c['템포'].replace(/[^0-9]/g, ''));
  assert.ok(Math.abs(bpm - 100) <= 4, `템포 100 근처여야 함 (실제 ${bpm})`);
  assert.match(c['조성'], /다장조/);
  const nMeasures = await page.$$eval('.measure-overlay', (l) => l.length);
  assert.ok(nMeasures >= 8 && nMeasures <= 10, `마디 수 8~10 (실제 ${nMeasures})`);
  assert.ok((await page.$$eval('.system svg', (l) => l.length)) >= 2, '악보 줄이 2개 이상');
  ok(`AI 분석 완료: ${JSON.stringify(c)}`);
  await page.screenshot({ path: path.join(outDir, 'e2e-result.png'), fullPage: true });

  /* ---------- 2. MIDI 정확도(앱 전체) ---------- */
  step('내려받은 MIDI를 정답과 비교');
  const [dlMidi] = await Promise.all([page.waitForEvent('download'), page.click('#dl-midi')]);
  assert.match(dlMidi.suggestedFilename(), /\.mid$/);
  const midiBuf = fs.readFileSync(await dlMidi.path());
  const midi = parseMidi(midiBuf);
  // 악보는 박(beat) 기준으로 맞으면 충분하다. 추정 템포가 1% 어긋나도(101 vs 100 BPM) 초 단위 비교는 후반부가 밀려 보이므로
  // 박 단위로 비교한다. 악보는 1마디 첫 박에서 시작하므로 첫 음의 위치 차이만큼 축을 맞춘다.
  const est = midi.ons.map((o) => ({ midi: o.midi, start: o.tick / midi.ppq, dur: 0 }));
  const beatSec = 60 / piece.bpm;
  const truth = piece.truth.map((n) => ({ midi: n.midi, start: n.start / beatSec, dur: 0 }));
  const shift = Math.min(...est.map((n) => n.start)) - Math.min(...truth.map((n) => n.start));
  const shifted = truth.map((n) => ({ ...n, start: n.start + shift }));
  const TOL = 0.15; // 박 (16분음표 = 0.25박)
  const ev = evaluateNotes(shifted, est, TOL);
  if (process.env.E2E_DEBUG) {
    const miss = shifted.filter((t) => !est.some((e) => e.midi === t.midi && Math.abs(e.start - t.start) <= TOL));
    const extra = est.filter((e) => !shifted.some((t) => t.midi === e.midi && Math.abs(e.start - t.start) <= TOL));
    console.log('  놓친 음:', miss.map((t) => `${t.midi}@${t.start.toFixed(2)}`).join(' '));
    console.log('  추가된 음:', extra.map((e) => `${e.midi}@${e.start.toFixed(2)}`).join(' '));
  }
  console.log(`  정확도(박 단위, 악보 양자화 후): 정밀도 ${ev.precision.toFixed(2)} 재현율 ${ev.recall.toFixed(2)} F1 ${ev.f1.toFixed(2)} (${ev.nEst}/${ev.nTruth}음)`);
  assert.ok(ev.recall >= 0.7, `재현율 0.7 이상 (실제 ${ev.recall.toFixed(2)})`);
  assert.ok(ev.f1 >= 0.6, `F1 0.6 이상 (실제 ${ev.f1.toFixed(2)})`);
  ok('MIDI 구조가 올바르고 정확도 기준 충족');

  /* ---------- 3. MusicXML / WAV ---------- */
  step('MusicXML, 피아노 WAV 내려받기');
  const [dlXml] = await Promise.all([page.waitForEvent('download'), page.click('#dl-xml')]);
  const xml = fs.readFileSync(await dlXml.path(), 'utf8');
  assert.match(xml, /<score-partwise/);
  assert.equal((xml.match(/<measure /g) ?? []).length, nMeasures);
  const xmlOk = await page.evaluate((x) => {
    const d = new DOMParser().parseFromString(x, 'application/xml');
    return d.getElementsByTagName('parsererror').length === 0;
  }, xml);
  assert.ok(xmlOk, 'MusicXML은 올바른 XML이어야 함');
  ok('MusicXML이 올바른 XML이고 마디 수가 악보와 일치');
  const [dlWav] = await Promise.all([page.waitForEvent('download', { timeout: 120000 }), page.click('#dl-wav')]);
  const wav = fs.readFileSync(await dlWav.path());
  assert.equal(wav.subarray(0, 4).toString(), 'RIFF');
  assert.equal(wav.subarray(8, 12).toString(), 'WAVE');
  const dataBytes = wav.readUInt32LE(40);
  assert.ok(dataBytes > 44100 * 2 * 8, `WAV 길이 8초 이상 (data ${dataBytes}B)`);
  let peak = 0;
  for (let i = 44; i < wav.length; i += 2) peak = Math.max(peak, Math.abs(wav.readInt16LE(i)));
  assert.ok(peak > 3000, `WAV에 실제 소리가 있어야 함 (peak ${peak})`);
  ok(`피아노 WAV 생성: ${(dataBytes / 2 / 44100).toFixed(1)}초, 최대 진폭 ${peak}`);

  /* ---------- 4. 설정 변경 ---------- */
  step('악보 설정 변경 시 즉시 반영');
  const measuresBefore = nMeasures;
  await page.selectOption('#ts', '3/4');
  await page.waitForFunction((n) => document.querySelectorAll('.measure-overlay').length !== n, measuresBefore, { timeout: 30000 });
  c = await chips();
  assert.equal(c['박자'], '3/4');
  ok(`3/4로 변경 → 마디 수 ${measuresBefore} → ${await page.$$eval('.measure-overlay', (l) => l.length)}`);
  await page.selectOption('#ts', '4/4');
  await page.waitForFunction((n) => document.querySelectorAll('.measure-overlay').length === n, measuresBefore, { timeout: 30000 });
  await page.selectOption('#key', '7-major'); // 사장조
  await page.waitForFunction(() => document.querySelector('#chips').textContent.includes('사장조'), null, { timeout: 30000 });
  assert.match(await page.textContent('#paper-meta'), /사장조/);
  await page.selectOption('#key', 'auto');
  await page.click('#bpm-half');
  await page.waitForFunction((n) => document.querySelectorAll('.measure-overlay').length !== n, measuresBefore, { timeout: 30000 });
  ok('조성/템포(÷2) 변경이 악보에 반영됨');
  await page.click('#bpm-auto');
  await page.waitForFunction((n) => document.querySelectorAll('.measure-overlay').length === n, measuresBefore, { timeout: 30000 });

  /* ---------- 5. 재생 ---------- */
  step('피아노 재생과 재생 위치 표시');
  await page.click('#btn-play');
  await page.waitForFunction(() => !document.querySelector('#ico-pause').hidden, null, { timeout: 5000 });
  await page.waitForFunction(() => document.querySelector('#time').textContent.startsWith('0:0') && !document.querySelector('#time').textContent.startsWith('0:00 /'), null, { timeout: 8000 });
  assert.ok(await page.$('.measure-overlay.active'), '재생 중인 마디가 강조되어야 함');
  await page.click('#btn-play'); // 일시정지
  await page.waitForFunction(() => document.querySelector('#ico-pause').hidden);
  await page.click('.measure-overlay[data-measure="3"]');
  await page.waitForFunction(() => document.querySelector('.measure-overlay.active')?.dataset.measure === '3', null, { timeout: 5000 });
  ok('재생/일시정지/마디 클릭 이동이 동작');
  await page.click('#btn-stop');

  /* ---------- 6. 인쇄 화면 / 모바일 ---------- */
  step('인쇄 화면과 모바일 화면');
  await page.emulateMedia({ media: 'print' });
  const visible = await page.evaluate(() => ['.site-header', '#input-card', '.player', '#paper'].map((s) => [s, document.querySelector(s).checkVisibility()]));
  assert.deepEqual(Object.fromEntries(visible), { '.site-header': false, '#input-card': false, '.player': false, '#paper': true });
  ok('인쇄 시 악보만 표시됨');
  await page.emulateMedia({ media: 'screen' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, `모바일에서 가로 스크롤이 없어야 함 (넘침 ${overflow}px)`);
  await page.screenshot({ path: path.join(outDir, 'e2e-mobile.png'), fullPage: true });
  ok('390px 폭에서 가로 넘침 없음');
  await page.setViewportSize({ width: 1100, height: 1000 });

  /* ---------- 7. 내장 엔진 ---------- */
  step('내장 빠른 분석 엔진');
  await page.evaluate(() => document.querySelector('#analysis-settings').setAttribute('open', ''));
  await page.check('input[name="engine"][value="dsp"]');
  await page.click('#btn-analyze');
  await page.waitForFunction(() => document.querySelector('#chips')?.textContent.includes('내장 빠른 분석'), null, { timeout: 120000 });
  await page.waitForSelector('.measure-overlay');
  c = await chips();
  assert.ok(Number(c['인식한 음'].replace(/\D/g, '')) > 20);
  ok('내장 엔진으로 재분석 성공');

  /* ---------- 8. 예시 곡 / 마이크 ---------- */
  step('예시 곡과 마이크 녹음');
  await page.check('input[name="engine"][value="ml"]');
  await page.click('#btn-demo');
  await page.waitForFunction(() => /환희의 송가/.test(document.querySelector('#paper-title')?.textContent ?? ''), null, { timeout: 240000 });
  ok('예시 곡 체험이 동작');
  await page.click('#btn-rec');
  await page.waitForFunction(() => document.querySelector('#btn-rec').classList.contains('recording'), null, { timeout: 5000 });
  await page.waitForTimeout(2500);
  await page.click('#btn-rec');
  await page.waitForFunction(() => !document.querySelector('#btn-rec').classList.contains('recording') && (document.querySelector('#progress').hidden), null, { timeout: 120000 });
  ok('가짜 마이크 장치로 녹음 → 분석 흐름이 오류 없이 끝남');
  assert.ok(!(await bannerText()).includes('오류'), `오류 배너: ${await bannerText()}`);

  /* ---------- 8b. 분석 중 잠금과 취소 ---------- */
  step('분석 중 입력 잠금과 취소');
  await page.click('#btn-demo');
  await page.waitForFunction(() => /AI 분석 중/.test(document.querySelector('#progress-label')?.textContent ?? ''), null, { timeout: 120000 });
  await page.click('#btn-demo'); // 분석 중 다른 입력 → 거절되어야 함
  assert.match(await page.textContent('#banner'), /분석이 진행 중/);
  ok('분석 중에는 새 입력이 거절되고 안내 문구가 표시됨');
  await page.click('#btn-cancel');
  await page.waitForFunction(() => document.querySelector('#progress').hidden, null, { timeout: 60000 });
  await page.waitForTimeout(300);
  assert.ok(!/오류/.test(await bannerText()), `취소는 오류로 표시되면 안 됨: ${await bannerText()}`);
  ok('취소하면 오류 없이 진행 표시가 사라짐');
  await page.click('#btn-demo'); // 취소 뒤 다시 분석 가능해야 함
  await page.waitForFunction(() => !document.querySelector('#progress').hidden, null, { timeout: 10000 });
  await page.waitForFunction(() => document.querySelector('#progress').hidden && document.querySelectorAll('.measure-overlay').length > 0, null, { timeout: 240000 });
  assert.equal(await bannerText(), '', '재분석 후 오류 배너가 없어야 함');
  ok('취소 후 재분석이 정상 동작');

  /* ---------- 9. 잘못된 파일 ---------- */
  step('오디오가 아닌 파일');
  const junk = path.join(os.tmpdir(), 'junk.mp3');
  fs.writeFileSync(junk, 'this is not audio');
  await page.setInputFiles('#file', junk);
  await page.waitForSelector('#banner:not([hidden])');
  assert.match(await page.textContent('#banner'), /해석할 수 없습니다/);
  ok('친절한 오류 메시지 표시');
} finally {
  await browser.close();
  server.close();
}

const real = problems.filter((p) => !/Failed to load resource.*(favicon)/.test(p));
if (real.length) {
  console.log('\n⚠ 브라우저 콘솔 문제:\n' + real.map((p) => '  - ' + p).join('\n'));
  process.exitCode = 1;
} else ok('브라우저 콘솔 오류 없음');
console.log(`\n${passed}개 검증 통과`);
