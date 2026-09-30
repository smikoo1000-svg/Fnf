#!/bin/sh
# 이전 기본 엔진(Basic Pitch)·내장 엔진의 잡음 강건성 (noise-bench.sh 와 같은 곡·잡음 씨앗)
# 결과: docs/benchmarks/noise/engines-*.json
set -e
cd "$(dirname "$0")/../.."
OUT=docs/benchmarks/noise
PIECES=${PIECES:-3,7,11}
SECS=${SECS:-45}
node scripts/eval/bench-engines.mjs --pieces $PIECES --secs $SECS --out $OUT/engines-clean.json
for noise in white pink; do
  for snr in 20 10 0; do
    node scripts/eval/bench-engines.mjs --pieces $PIECES --secs $SECS --noise $noise --snr $snr --out $OUT/engines-$noise-$snr.json
  done
done
