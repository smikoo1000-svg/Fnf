// 마이크 녹음 (MediaRecorder). 반환된 Blob은 decodeAudio로 그대로 분석할 수 있다.

export function canRecord() {
  return !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
}

export async function startRecording() {
  // 음악 분석에는 원음 그대로가 유리하므로 음성용 처리를 끈다
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find((m) => MediaRecorder.isTypeSupported?.(m));
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise((resolve, reject) => {
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      resolve(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
    };
    rec.onerror = (e) => reject(e.error ?? new Error('녹음 오류'));
  });
  rec.start(250);
  return { stop: () => (rec.state !== 'inactive' ? rec.stop() : undefined), result: done };
}
