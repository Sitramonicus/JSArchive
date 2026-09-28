#!/usr/bin/env bash
# cc33-build.sh — the O8.14 (CC-33) release cascade, in the r3 stage order, realigned to the
# 17-shard 8.14 source set. Every stage is seed-derived from BUILD-SEED.txt (851b28e5).
#
#   shards/ → dict-gen (U11) → rotate-ioc → g7-strings → v1-jso-s3matrix
#            → minify-family (v6/v7/v8) → u → v2-jsc (hash-pin re-pinned)
#            → mound-e → s4 final-package → stego build
#
# Usage:  bash tools/cc33-build.sh [stage ...]      # default: all stages in order
# Env:    TAG=o814 (rotate-ioc tag)  VERSION=8.14 (SUITE_VERSION)  SKIP_STEGO=1
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"      # .../CC-33
REPO="$(cd "$ROOT/../../.." && pwd)"                          # /home/user
TAG="${TAG:-o814}"
VERSION="${VERSION:-8.14}"
STAGES=("$@")
[ ${#STAGES[@]} -eq 0 ] && STAGES=(dict rotate g7 v1 min u v2 mound s4 stego)
want() { for s in "${STAGES[@]}"; do [ "$s" = "$1" ] && return 0; done; return 1; }

cd "$ROOT"
echo "== CC-33 build: seed=$(cat BUILD-SEED.txt) tag=$TAG version=$VERSION =="

# Engine preflight. Active/engines/node_modules does NOT survive between sessions (it is excluded
# from workspace snapshots), and the failure mode is a confusing mid-cascade "Missing engine"
# error — the g7 stage aborts at @babel/parser, which looks like a build defect. Install on demand.
ENG="$REPO/Active/engines"
if [ ! -d "$ENG/node_modules" ] || [ ! -d "$ENG/node_modules/@babel/parser" ]; then
  echo "[engines] installing (node_modules absent or incomplete)…"
  ( cd "$ENG" && npm ci --no-audit --no-fund >/dev/null 2>&1 && npm i @babel/parser acorn@8 --no-save --no-audit --no-fund >/dev/null 2>&1 ) \
    || { echo "[engines] install FAILED — run: cd $ENG && npm ci"; exit 1; }
  echo "[engines] ready ($(ls "$ENG/node_modules" | wc -l) packages)"
fi

# U11 (approved 2026-09-20): the identifier pools are GENERATED per build seed instead of read
# from the curated CSVs. dict-gen is deterministic, so this is a no-op for a given seed, and the
# three pool consumers (v1-s3matrix, mound-e, S4) all resolve their directory from CC33_DICT_DIR.
if want dict; then
  node oto/scripts/dict-gen.mjs
  export CC33_DICT_DIR="$ROOT/oto/generated"
  echo "[dict] CC33_DICT_DIR=$CC33_DICT_DIR  seed=$(cat BUILD-SEED.txt)"
fi
if want rotate; then
  # bootstrap: rotate-ioc reads the CURRENT-state manifest from oto/rotation.json
  [ -f oto/rotation.json ] || cp "$REPO/Active/O8.13/oto/rotation.json" oto/rotation.json
  node oto/scripts/rotate-ioc.mjs "$TAG" --apply --version="$VERSION"
fi
want g7  && node oto/scripts/obf-strings-g7.js
want v1  && node oto/scripts/obf-v1-s3matrix.js
want min && node oto/scripts/obf-minify-family.js
want u   && node oto/scripts/obf-u-canon.js
if want v2; then
  node oto/scripts/obf-v2-jsc.js
  # js-confuser cannot be seeded, so the only honest pin is "what this run produced".
  H=$(sha256sum oto/v2-jsc/shard-m1-out.js | cut -d' ' -f1)   # PLAN-H: m -> m1
  python3 - "$H" <<'PY'
import re, sys
from pathlib import Path
p = Path('oto/scripts/build-s4-final-package.js'); t = p.read_text()
t2 = re.sub(r'const EXPECTED_V2_M = "[0-9a-f]{64}";', f'const EXPECTED_V2_M = "{sys.argv[1]}";', t)
p.write_text(t2)
PY
  echo "[pin] EXPECTED_V2_M re-pinned to $H"
fi
# PLAN-H mound stage (2026-09-20): second obfuscation layer on the three minifier e-pieces
# (e3 additionally gets the js-confuser rgf VM). Operator-approved; see oto/scripts/obf-mound-e.js.
want mound && node oto/scripts/obf-mound-e.js

want s4 && node oto/scripts/build-s4-final-package.js
# ---- lint stage: no free references in the pieces we actually ship (2026-09-20 live ReferenceError) --
# Unions the declared names of the 23 shipped pieces, then re-lints each piece against that union, so a
# binding that legitimately crosses pieces does not read as an error while a genuine missing binding
# still does. Deliberately scoped to final-package/selected-shards = what the carrier carries.
if [ -d final-package/selected-shards ]; then
  echo "[lint] dangling-reference scan over the 23 shipped pieces"
  SHIPPED=$(ls final-package/selected-shards/shard-*.js)
  UNION=/tmp/cc33-decl-union.txt; rm -f "$UNION"
  for f in $SHIPPED; do node "$REPO/tools/dangling-refs.mjs" "$f" --emit-declared "$UNION" >/dev/null || true; done
  # registry keys are injected into the stitched scope by build-s4 (they are not declared inside any
  # piece), so they join the union — that is the documented contract, not a silencer.
  if [ -f oto/registry-keymap.json ]; then
    node -e "const k=require('./oto/registry-keymap.json');const names=new Set();const walk=(o)=>{if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object')for(const[v,k2]of Object.entries(o)){if(typeof v==='string'&&/^[A-Za-z_$][\w$]*$/.test(v))names.add(v);walk(k2);}else if(typeof o==='string'&&/^[A-Za-z_$][\w$]*$/.test(o))names.add(o);};walk(k);require('fs').appendFileSync('/tmp/cc33-decl-union.txt',[...names].join('\n')+'\n');console.log('  [lint] registry-keymap contributes '+names.size+' injected names');"
  fi
  echo "  [lint] cross-piece union: $(wc -l < "$UNION" | tr -d ' ') declared names over $(echo "$SHIPPED" | wc -l | tr -d ' ') pieces"
  # Policy: an error-path dangler (a name referenced from inside a `catch` block) always blocks the
  # build — that is the exact shape that shipped `EnFZv0` and threw the moment an unrelated exception
  # fired. Non-error-path danglers are counted and printed but do not block: this payload deliberately
  # carries degradation paths whose bindings arrive elsewhere (e.g. the carrier-codec names in shard-c).
  # Piece-level error-path danglers are reported here but the BLOCKING check is the assembled payload
  # below: build-s4 declares every error-path name it finds as a no-op in the stitched scope, so a
  # piece may legitimately reference a name that only exists once assembled (registry keys, shims).
  LINT_ERRPATH=0; LINT_INFO=0
  for f in $SHIPPED; do
    node "$REPO/tools/dangling-refs.mjs" "$f" --allow-file "$UNION" --catch-only --quiet 2>/dev/null || {
      LINT_ERRPATH=$((LINT_ERRPATH+1)); echo "  [lint] error-path dangling (piece scope): $(basename $f)"
      # `|| true`: without it this group ends on a grep, and a grep that finds no match exits 1 —
      # which under `set -e` aborted the cascade before the stego stage (2026-09-20 restore roll, the
      # first roll to take this branch). Diagnostics must never stop a build.
      node "$REPO/tools/dangling-refs.mjs" "$f" --allow-file "$UNION" --catch-only 2>/dev/null | grep -E "catch" | head -3 || true; }
    node "$REPO/tools/dangling-refs.mjs" "$f" --allow-file "$UNION" --quiet 2>/dev/null || LINT_INFO=$((LINT_INFO+1))
  done
  echo "  [lint] piece-scope error-path danglers: $LINT_ERRPATH (must be 0 in the ASSEMBLED payload, checked below)"
  echo "  [lint] pieces with non-error-path danglers (informational): $LINT_INFO/$('echo "$SHIPPED" | wc -l' | tr -d ' ')" 
  echo "  [lint] pieces with any non-error-path danglers (informational): $LINT_INFO"
fi
if want stego && [ -z "${SKIP_STEGO:-}" ]; then
  echo "[gate] error-path reference check (danglers inside catch blocks must be zero)"
  node "$REPO/tools/dangling-refs.mjs" "$ROOT/final-package/O8.14-CC-33-final-bundle.js" --catch-only | tail -2 || {
    echo "[gate] FAILED — a dangling name on an error path would throw when an unrelated exception fires"; exit 1; }
  echo "[gate] full-wire venue probe (must complete; a hang here is the freeze bug)"
  timeout 300 node "$REPO/tools/fullwire-probe.mjs" "$ROOT/final-package/O8.14-CC-33-final-bundle.js" | head -2
fi
if want stego && [ -z "${SKIP_STEGO:-}" ]; then
  node "$REPO/Active/Stego/build-stego12-r2.mjs" \
       "$ROOT/final-package/O8.14-CC-33-final-bundle.js" \
       "$REPO/Uploads/stego2-cover-1024-scaled.bmp" \
       "$ROOT/stego-build" \
       --reel-grain   # R2-STEGO-TAIL: grain the unused permuted tail (0 payload bytes)
fi
echo "== CC-33 build complete =="
