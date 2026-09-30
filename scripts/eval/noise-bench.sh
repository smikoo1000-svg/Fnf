#!/bin/sh
# 잡음 강건성 실험: 3곡 × 앞 45초, 백색/분홍 잡음 SNR 20·10·0dB, 잡음 제거 전처리 없음/있음.
# 결과: docs/benchmarks/noise/*.json  →  node scripts/eval/noise-report.mjs 로 표 생성
set -e
cd "$(dirname "$0")/../.."
OUT=docs/benchmarks/noise
PIECES=${PIECES:-3,7,11}
SECS=${SECS:-45}
T=${THREADS:-4}
mkdir -p $OUT
node scripts/eval/bench.mjs --pieces $PIECES --secs $SECS --threads $T --out $OUT/clean.json
node scripts/eval/bench.mjs --pieces $PIECES --secs $SECS --threads $T --denoise --out $OUT/clean-denoise.json
for noise in white pink; do
  for snr in 20 10 0; do
    node scripts/eval/bench.mjs --pieces $PIECES --secs $SECS --threads $T --noise $noise --snr $snr --out $OUT/$noise-$snr.json
    node scripts/eval/bench.mjs --pieces $PIECES --secs $SECS --threads $T --noise $noise --snr $snr --denoise --out $OUT/$noise-$snr-denoise.json
  done
done
