// 교차 출처 격리용 서비스 워커.
// GitHub Pages 처럼 응답 헤더를 바꿀 수 없는 정적 호스팅에서, 모든 응답에 COOP/COEP 헤더를 붙여
// SharedArrayBuffer(= ONNX Runtime WASM 멀티스레드)를 쓸 수 있게 한다. 캐시는 하지 않고 그대로 전달만 한다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
  event.respondWith(
    fetch(req).then((res) => {
      if (res.status === 0) return res; // 불투명 응답은 헤더를 바꿀 수 없다
      const headers = new Headers(res.headers);
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      headers.set('Cross-Origin-Resource-Policy', 'same-origin');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    }),
  );
});
