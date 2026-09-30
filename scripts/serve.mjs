// 의존성 없는 정적 파일 서버.  사용법: npm start  (기본 http://localhost:8080)
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 8080);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.bin': 'application/octet-stream',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wav': 'audio/wav',
  '.wasm': 'application/wasm',
  '.onnx': 'application/octet-stream',
  '.md': 'text/plain; charset=utf-8',
};

export function createServer({ coi = !process.env.NO_COI } = {}) {
  return http.createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const file = path.resolve(root, '.' + p);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403).end('forbidden');
        return;
      }
      if (file.includes(`${path.sep}node_modules${path.sep}`) || file.includes(`${path.sep}.git${path.sep}`)) {
        res.writeHead(404).end('not found');
        return;
      }
      const s = await stat(file);
      if (!s.isFile()) throw new Error('not a file');
      const body = await readFile(file);
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
        // 교차 출처 격리: ONNX Runtime 의 WASM 멀티스레드(SharedArrayBuffer)에 필요.
        // NO_COI=1 이면 빼서, 헤더를 못 바꾸는 정적 호스팅(서비스 워커 경로)을 흉내 낸다.
        ...(coi ? { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' } : {}),
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('not found');
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer().listen(port, () => console.log(`http://localhost:${port}  에서 실행 중 (Ctrl+C로 종료)`));
}
