#!/usr/bin/env bash
# cc34-build.sh — the O8.15 (CC-34) build:  payload split (step 2)  →  carrier (arm A)  →  gates.
#
# The 8.14 payload/bundle is the INPUT, never an output: this line re-derives the carrier from a payload
# and leaves Working-Stable/O8.14, Archives/packages/O8.14 and Archives/rollback-b22 untouched.
#
#   bash tools/cc34-build.sh carrier     # build into CC-34/stego-build (default)
#   bash tools/cc34-build.sh verify      # the identity gates on an existing build (fast)
#   bash tools/cc34-build.sh swift       # the payload/venue gates (detector, netwatch, flip, hold, matrix, tiers)
#   SPLIT_MIN=0 bash tools/cc34-build.sh # arm A alone, no split
#   OUT=/tmp/foo bash tools/cc34-build.sh
#
# Env: BUNDLE, COVER, OUT, SPLIT_MIN (4000), SPLIT_RUN (4000)
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"          # .../Active/O8.15
REPO="$(cd "$ROOT/../.." && pwd)"                                # /home/user
BUNDLE="${BUNDLE:-$REPO/Working-Stable/O8.14/O8.14-bundle-820f06c2.js}"
COVER="${COVER:-$REPO/Uploads/stego2-cover-1024-scaled.bmp}"
OUT="${OUT:-$ROOT/CC-34/stego-build}"
export SPLIT_MIN="${SPLIT_MIN:-4000}" SPLIT_RUN="${SPLIT_RUN:-4000}"
STAGES=("$@"); [ ${#STAGES[@]} -eq 0 ] && STAGES=(carrier)
want() { for s in "${STAGES[@]}"; do [ "$s" = "$1" ] && return 0; done; return 1; }

# engines (node_modules does not survive between sessions; the failure mode is a confusing mid-build error)
ENG="$REPO/Active/engines"
if [ ! -d "$ENG/node_modules/@babel/parser" ] || [ ! -d "$ENG/node_modules/javascript-obfuscator" ]; then
  echo "[engines] installing…"
  ( cd "$ENG" && npm ci --no-audit --no-fund >/dev/null 2>&1 ) || { echo "[engines] install FAILED — run: cd $ENG && npm ci"; exit 1; }
fi

if want carrier; then
  mkdir -p "$OUT"
  echo "== CC-34 build: bundle=$(basename "$BUNDLE") cover=$(basename "$COVER") split=${SPLIT_MIN:+on}/${SPLIT_MIN} =="
  node "$ROOT/carrier/build-stego13-r2.mjs" "$BUNDLE" "$COVER" "$OUT" --reel-grain
  echo "== artifacts =="
  ( cd "$OUT" && sha256sum O8.12-runner.js O8.12-cover.bmp stego11p-real.min.js )

  echo "== identity gates =="
  node "$ROOT/tools/frag-derive-check.mjs" "$OUT/O8.12-runner.js" "$@" >/dev/null 2>&1 || true
  node "$ROOT/tools/frag-derive-check.mjs" "$OUT/O8.12-runner.js" | sed 's/^/   /'
  node "$ROOT/tools/runner-wire-probe.mjs" "$OUT/O8.12-runner.js" --dump="$OUT/.staged.js" --quiet | sed 's/^/   /'
  if cmp -s "$OUT/.staged.js" "$OUT/stego11p-real.min.js"; then
    echo "   [gate] staged payload == shipped payload (byte-identical)"
  else
    echo "   [gate] FAILED: the loader does not stage the shipped payload"; exit 1
  fi
  rm -f "$OUT/.staged.js"
fi

if want verify; then
  node "$ROOT/tools/frag-derive-check.mjs" "$OUT/O8.12-runner.js" | sed 's/^/   /'
  node "$ROOT/tools/runner-wire-probe.mjs" "$OUT/O8.12-runner.js" --dump="$OUT/.staged.js" --quiet | sed 's/^/   /'
  cmp -s "$OUT/.staged.js" "$OUT/stego11p-real.min.js" && echo "   [gate] staged == shipped" || { echo "   [gate] FAILED staged != shipped"; exit 1; }
  rm -f "$OUT/.staged.js"
fi

if want swift; then
  echo "== runner gates =="
  node "$ROOT/carrier/test-stego11-matrix.mjs" "$OUT/O8.12-runner.js" "$OUT/O8.12-cover.bmp" | tail -1
  node "$ROOT/carrier/test-stego11-tiers.mjs" "$OUT/O8.12-runner.js" "$OUT/O8.12-cover.bmp" "$COVER" | tail -1
  echo "== payload gates =="
  node "$REPO/tools/hold-check.mjs" "$OUT/stego11p-real.min.js" "$OUT/O8.12-runner.js" | tail -1
  node "$REPO/tools/carrier-flip-check.mjs" "$OUT/O8.12-cover.bmp" "$COVER" "$OUT/stego11p-real.min.js" "$OUT/O8.12-runner.js" | tail -1
  node "$REPO/tools/detector-replay.mjs" "$OUT/stego11p-real.min.js" | tail -1
  node "$REPO/tools/netwatch-probe.mjs" "$OUT/stego11p-real.min.js" | tail -1
  node "$REPO/tools/dangling-refs.mjs" "$OUT/stego11p-real.min.js" --catch-only | tail -1
  node "$REPO/tools/decoy-parity.mjs" "$OUT/stego11p-real.min.js" "$OUT/stego11p-decoy.min.js" | tail -1
  echo "   note: leakcensus stays a documented red (G3=4) until the D5 normaliser lands — see DECISIONS.md"
fi
echo "== done =="
