#!/bin/bash
# run-gate-battery.sh — the named 8.14/8.15 release gate battery (GATE-BASELINE-8.14.md §2).
# Usage: bash run-gate-battery.sh [outlog]   (run from anywhere; paths are absolute)
export PATH=/usr/bin:$PATH
T=/home/user/tools
R=/home/user/Active/O8.15/Runners/O8.14-debug-runner.js
BMP=/home/user/Active/O8.15/carrier/battery-inputs/O8.14-cover-3bf21868.bmp
CLEAN=/home/user/Uploads/stego2-cover-1024-scaled.bmp
REAL=/home/user/Active/O8.15/Runners/stego11p-real.min.js
DECOY=/home/user/Active/O8.15/Runners/stego11p-decoy.min.js
BUNDLE=/home/user/Active/O8.14/CC-33/final-package/O8.14-CC-33-final-bundle.js
SHARDS=/home/user/Active/O8.14/CC-33/shards
OUT="${1:-/home/user/Active/O8.15/provisional/S2-CASCADE-2026-09-29/gate-battery-s3.log}"
exec > >(tee "$OUT") 2>&1
r() { echo "===== $1 ====="; shift; "$@"; echo "-- exit $? --"; }

r "chain-revive (shards)"        node $T/chain-revive-check.mjs "$SHARDS"
r "hold-check (real+runner)"     node $T/hold-check.mjs "$REAL" "$R"
r "gate-replay --spec"           node $T/gate-replay.mjs --spec
r "repaste-check (runner)"       node $T/repaste-check.mjs "$R"
r "stego11-matrix (runner+bmp)"  node /home/user/Active/O8.15/carrier/test-stego11-matrix.mjs "$R" "$BMP"
r "stego11-tiers (runner+bmp+clean)" node /home/user/Active/O8.15/carrier/test-stego11-tiers.mjs "$R" "$BMP" "$CLEAN"
r "carrier-flip (bmp clean real runner)" node $T/carrier-flip-check.mjs "$BMP" "$CLEAN" "$REAL" "$R"
r "detector-replay (real)"       node $T/detector-replay.mjs "$REAL"
r "detector-replay (bundle)"     node $T/detector-replay.mjs "$BUNDLE"
r "netwatch (real)"              node $T/netwatch-probe.mjs "$REAL"
r "dangling-refs (real)"         node $T/dangling-refs.mjs "$REAL"
r "dangling-refs (bundle)"       node $T/dangling-refs.mjs "$BUNDLE"
r "dangling-refs (runner)"       node $T/dangling-refs.mjs "$R"
r "decoy-parity (real vs decoy)" node $T/decoy-parity.mjs "$REAL" "$DECOY"
r "leakcensus (real)"            node $T/leakcensus.mjs "$REAL"
r "leakcensus (bundle)"          node $T/leakcensus.mjs "$BUNDLE"
r "constraint-pass (bundle)"     node /home/user/Active/O8.15/tools/constraint-pass.mjs "$BUNDLE"
echo "===== battery done ====="
