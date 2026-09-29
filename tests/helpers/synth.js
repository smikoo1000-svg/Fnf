// 테스트 전용 피아노 유사 가산합성기. 앱의 재생 합성기(js/audio/piano.js)와는 독립적으로 구현해
// 분석기가 "자기 자신의 소리"에만 맞춰지지 않았는지 확인하는 데 쓴다.

/** 결정적 난수 (재현 가능한 테스트용) */
export function makeRng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * @param {{midi:number,start:number,dur:number,vel?:number}[]} notes  start/dur는 초
 * @param {{sampleRate?:number, tailSec?:number, noise?:number, drums?:number[], seed?:number, detuneCents?:number, reverb?:boolean}} opt
 */
export function renderPiano(notes, opt = {}) {
  const fs = opt.sampleRate ?? 22050;
  const rng = makeRng(opt.seed ?? 7);
  const detune = opt.detuneCents ?? 0;
  const end = Math.max(...notes.map((n) => n.start + n.dur)) + (opt.tailSec ?? 1.0);
  const out = new Float32Array(Math.ceil(end * fs));

  for (const n of notes) {
    const f0 = 440 * 2 ** ((n.midi - 69 + detune / 100) / 12);
    const vel = n.vel ?? 0.7;
    const B = 0.00008 * 2 ** ((60 - n.midi) / 14 + 0.5); // 저음일수록 비조화성 큼
    const tau0 = 5.5 * 2 ** ((60 - n.midi) / 22); // 저음일수록 오래 울림
    const s0 = Math.floor(n.start * fs);
    const relSamples = Math.floor(0.12 * fs);
    const len = Math.min(out.length - s0, Math.floor((n.dur + 0.12) * fs) + relSamples);
    const nParts = 14;
    const parts = [];
    for (let h = 1; h <= nParts; h++) {
      const f = h * f0 * Math.sqrt(1 + B * h * h);
      if (f > fs * 0.45) break;
      // 스펙트럼 기울기 + 노트별 임의 편차 (기음이 약한 저음, 2배음이 강한 경우 등을 흉내)
      let a = (1 / h ** 0.9) * (0.6 + 0.8 * rng());
      if (n.midi < 48 && h === 1) a *= 0.5;
      parts.push({ f, a, tau: tau0 / (1 + 0.6 * (h - 1)), ph: rng() * Math.PI * 2 });
    }
    const gain = 0.16 * vel;
    for (const p of parts) {
      const w = (2 * Math.PI * p.f) / fs;
      for (let i = 0; i < len; i++) {
        const t = i / fs;
        let env = Math.exp(-t / p.tau);
        if (t < 0.004) env *= t / 0.004;
        if (t > n.dur) env *= Math.max(0, 1 - (t - n.dur) / 0.12);
        out[s0 + i] += gain * p.a * env * Math.sin(w * i + p.ph);
      }
    }
  }

  // 드럼/타악기 유사 광대역 클릭 (강건성 테스트)
  for (const t of opt.drums ?? []) {
    const s0 = Math.floor(t * fs);
    const len = Math.floor(0.06 * fs);
    for (let i = 0; i < len && s0 + i < out.length; i++) {
      out[s0 + i] += 0.25 * (rng() * 2 - 1) * Math.exp(-i / (0.012 * fs));
    }
  }
  if (opt.noise) for (let i = 0; i < out.length; i++) out[i] += opt.noise * (rng() * 2 - 1);

  if (opt.reverb) {
    // 간단한 콤 리버브
    const taps = [0.029, 0.037, 0.043, 0.051].map((s) => Math.floor(s * fs));
    const wet = new Float32Array(out.length);
    for (const d of taps) for (let i = d; i < out.length; i++) wet[i] += 0.18 * out[i - d];
    for (let i = 0; i < out.length; i++) out[i] += wet[i];
  }

  // 클리핑 방지 정규화
  let peak = 0;
  for (let i = 0; i < out.length; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak > 0.95) for (let i = 0; i < out.length; i++) out[i] *= 0.95 / peak;
  return { samples: out, sampleRate: fs };
}

/** 정답 노트 목록과 추정 노트 목록을 비교 (mir_eval 방식: 온셋 ±tol, 음높이 일치) */
export function evaluateNotes(truth, est, tol = 0.07) {
  const used = new Set();
  let tp = 0;
  const errs = [];
  for (const t of truth) {
    let best = -1;
    let bestD = Infinity;
    est.forEach((e, i) => {
      if (used.has(i) || e.midi !== t.midi) return;
      const d = Math.abs(e.start - t.start);
      if (d <= tol && d < bestD) {
        best = i;
        bestD = d;
      }
    });
    if (best >= 0) {
      used.add(best);
      tp++;
      errs.push(est[best].start - t.start);
    }
  }
  const precision = est.length ? tp / est.length : 0;
  const recall = truth.length ? tp / truth.length : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  const meanErr = errs.length ? errs.reduce((a, b) => a + b, 0) / errs.length : 0;
  return { tp, precision, recall, f1, meanOnsetErr: meanErr, nTruth: truth.length, nEst: est.length };
}
