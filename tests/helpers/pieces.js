// 테스트용 정답 악곡 (모두 저작권 만료 곡이거나 임의로 만든 패턴)

/** 환희의 송가(베토벤) 멜로디 + 왼손 화음. tempo: BPM */
export function odeToJoy({ bpm = 120, transpose = 0 } = {}) {
  const beat = 60 / bpm;
  const mel = [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62,
    64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 62, 60, 60];
  const dur = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 0.5, 2,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 0.5, 2];
  const truth = [];
  let t = 0;
  mel.forEach((m, i) => {
    truth.push({ midi: m + 12 + transpose, start: t * beat + 0.1, dur: dur[i] * beat * 0.92, vel: 0.8 });
    t += dur[i];
  });
  const totalBeats = t;
  const chords = [[48, 55, 64], [43, 55, 62], [48, 55, 64], [43, 55, 62], [48, 55, 64], [45, 57, 65], [43, 55, 62], [48, 55, 64]];
  for (let bar = 0; bar * 4 < totalBeats; bar++) {
    const c = chords[bar % chords.length];
    for (const m of c) truth.push({ midi: m + transpose, start: bar * 4 * beat + 0.1, dur: 3.8 * beat, vel: 0.5 });
  }
  return { truth, totalBeats, bpm, startOffset: 0.1 };
}

/** 8분음표 반복음 + 옥타브 도약 (재타건, 빠른 패시지 검증) */
export function repeatedNotes({ bpm = 100 } = {}) {
  const beat = 60 / bpm;
  const pitches = [60, 60, 60, 60, 67, 67, 72, 72, 64, 64, 64, 64, 69, 69, 65, 65];
  const truth = pitches.map((m, i) => ({ midi: m, start: 0.1 + i * beat * 0.5, dur: beat * 0.42, vel: 0.7 }));
  return { truth, bpm, startOffset: 0.1 };
}
