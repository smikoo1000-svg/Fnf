// Basic Pitch(+슬림 tfjs)를 브라우저용 단일 ESM 파일로 번들한다.
// 결과물(vendor/basic-pitch.bundle.js, vendor/basic-pitch-model/*)은 저장소에 커밋되어 있으므로
// 일반 사용자는 이 스크립트를 실행할 필요가 없다.
//   사용법: npm install --no-save @spotify/basic-pitch@1.0.1 esbuild && node scripts/build-vendor.mjs
import { build } from 'esbuild';
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const bpDir = path.dirname(require.resolve('@spotify/basic-pitch/package.json'));
// basic-pitch가 요구하는 tfjs 3.x는 자신의 node_modules 아래에 설치된다.
const nested = path.join(bpDir, 'node_modules');
const tfRoot = existsSync(path.join(nested, '@tensorflow')) ? nested : path.join(process.cwd(), 'node_modules');
const tf = (name) => path.join(tfRoot, '@tensorflow', name);

await build({
  entryPoints: ['vendor-src/basic-pitch-entry.js'],
  bundle: true,
  format: 'esm',
  minify: true,
  target: 'es2020',
  outfile: 'vendor/basic-pitch.bundle.js',
  legalComments: 'eof',
  alias: {
    '@tensorflow/tfjs': path.resolve('vendor-src/tfjs-slim.js'),
    '@tensorflow/tfjs-core': tf('tfjs-core'),
    '@tensorflow/tfjs-converter': tf('tfjs-converter'),
    '@tensorflow/tfjs-backend-cpu': tf('tfjs-backend-cpu'),
    '@tensorflow/tfjs-backend-webgl': tf('tfjs-backend-webgl'),
  },
  // Node 전용 모듈 참조 무시
  external: ['fs', 'path', 'node-fetch', 'util', 'crypto', 'os', 'worker_threads'],
});

mkdirSync('vendor/basic-pitch-model', { recursive: true });
cpSync(path.join(bpDir, 'model'), 'vendor/basic-pitch-model', { recursive: true });
cpSync(path.join(bpDir, 'LICENSE'), 'vendor/BASIC-PITCH-LICENSE');
console.log('완료: vendor/basic-pitch.bundle.js, vendor/basic-pitch-model/');
