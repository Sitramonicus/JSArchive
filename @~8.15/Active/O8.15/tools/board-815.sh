#!/usr/bin/env bash
# board.sh — the full pre-paste board for one CC-33 build, on the BYTES that would ship.
#
#   RCD=... DBG=... RES=... AK=... VIEW=... bash tools/board.sh [label]
#
# The five passphrase slots are read from the environment and never written to a file (secrets
# policy: ephemeral only). Everything else is reproducible from the workspace.
#
# Every step prints one line: `[step] VERDICT  detail`. A build is pasteable when no line says FAIL.
set -u
LABEL="${1:-unlabelled}"
ROOT=/home/user
BUILD="${BUILD:-/tmp/b25}"
SEL=$ROOT/Active/O8.14/CC-33/final-package/selected-shards   # shard-level inputs (unchanged in 8.15)
BUNDLE=$ROOT/Working-Stable/O8.14/O8.14-bundle-820f06c2.js   # the bundle every 8.15 build starts from
TESTS=$ROOT/Active/O8.15/carrier                              # 8.15 copies (frag-shape aware)
RUN=$BUILD/O8.12-runner.js
COV=$BUILD/O8.12-cover.bmp
PAY=$BUILD/stego11p-real.min.js
DEC=$BUILD/stego11p-decoy.min.js
CLEAN=$ROOT/Uploads/stego2-cover-1024-scaled.bmp
OUT=$ROOT/Active/O8.15/CC-34/reports/board-$LABEL.log
mkdir -p "$(dirname "$OUT")"
: > "$OUT"
say() { echo "$@" | tee -a "$OUT"; }
step() { printf '[%-16s] %s\n' "$1" "$2" | tee -a "$OUT"; }

say "== CC-34 board (8.15) — $LABEL — $(date -u +%Y-%m-%dT%H:%M:%SZ) =="
say "== bytes =="
for f in "$RUN" "$COV" "$PAY" "$DEC" "$BUNDLE"; do
  printf '   %s  %s\n' "$(sha256sum "$f" | cut -c1-8)" "$(basename "$f")" | tee -a "$OUT"
done
say ""

# 1 — the operator's acceptance table, against the built shard-a (the file that ships)
g=$(cd "$ROOT" && node tools/gate-replay.mjs "${RCD:-}" "${DBG:-}" "${RES:-}" "${AK:-}" "${VIEW:-}" --spec 2>&1 | tee -a "$OUT")
step "gate --spec" "$(echo "$g" | tail -1)"

# 2 — full slot matrix at two elapsed times (in-window, post-window)
m=$(cd "$ROOT" && node tools/gate-replay.mjs "${RCD:-}" "${DBG:-}" "${RES:-}" "${AK:-}" "${VIEW:-}" 2>&1 | tee -a "$OUT")
step "gate matrix" "$(echo "$m" | grep -cE '^ +5 +pwd') rows at t=5, unlocks $(echo "$m" | grep -cE '^ +5 +pwd(Rcd|Dbg) +true')/2, verbs rejected $(echo "$m" | grep -cE '^ +5 +pwd(Res|AK|View) +false')/3; post-window torn down $(echo "$m" | grep -cE '^ +180 +pwd.*not a function')/5"

# 3 — runner structure (reel tables, FRAG round-trip, honey)
mt=$(cd "$TESTS" && node test-stego11-matrix.mjs "$RUN" "$COV" 2>&1 | tee -a "$OUT")
step "stego matrix" "$(echo "$mt" | grep -oE '[0-9]+ passed, [0-9]+ failed' | tail -1)"

# 4 — end-to-end tiers on the cover bytes
t=$(cd "$TESTS" && node test-stego11-tiers.mjs "$RUN" "$COV" "$CLEAN" 2>&1 | tee -a "$OUT")
step "tiers" "$(echo "$t" | grep -oE '[0-9]+ passed, [0-9]+ failed[^)]*' | tail -1)"

# 4b — the same run with the debug name: T2 must FAIL-CLOSED (it is a decoder tell, not a key)
td=$(cd "$TESTS" && node test-stego11-tiers.mjs "$RUN" "$COV" "$CLEAN" --debug-name=ripcord 2>&1 | tee -a "$OUT")
# T2 must be the ONLY failure: a pasted --debug-name is a decoder tell, not a key
step "tiers --debug-name" "$(echo "$td" | grep -oE '[0-9]+ passed, [0-9]+ failed' | tail -1) (expect 1 = T2 fail-closed)"

# 5 — the hold half: unclaimed sessions must not touch the venue APIs
h=$(cd "$ROOT" && node tools/hold-check.mjs "$PAY" "$RUN" "$SEL/shard-a-v1.js" 2>&1 | tee -a "$OUT")
step "hold-check" "$(echo "$h" | grep -oE 'hold check: (PASS|FAIL)' | tail -1) ($(echo "$h" | grep -c '   PASS')/$(echo "$h" | grep -cE '   (PASS|FAIL)') rows)"

# 6 — the carrier is the flipped one (reel round-trip, plane discipline, grain, decoy intact)
c=$(cd "$ROOT" && node tools/carrier-flip-check.mjs "$COV" "$CLEAN" "$PAY" "$RUN" 2>&1 | tee -a "$OUT")
step "carrier-flip" "$(echo "$c" | grep -oE '[0-9]+ passed, [0-9]+ failed' | tail -1)"

# 7 — what an analyst gets from the shipped bytes alone
d=$(cd "$ROOT" && node tools/detector-replay.mjs "$PAY" 2>&1 | tee -a "$OUT")
step "detector" "$(echo "$d" | grep -oE '(PASS|FAIL)[^|]*' | head -1)"

# 8 — the runner must not phone home
n=$(cd "$ROOT" && node tools/netwatch-probe.mjs "$BUNDLE" 2>&1 | tee -a "$OUT")
step "netwatch bundle" "$(echo "$n" | grep -oE 'network-primitive calls=[0-9]+' | tail -1) / $(echo "$n" | grep -oE 'no URLs attempted' | tail -1)"
n2=$(cd "$ROOT" && node tools/netwatch-probe.mjs "$PAY" 2>&1 | tee -a "$OUT")
step "netwatch payload" "$(echo "$n2" | grep -oE 'network-primitive calls=[0-9]+' | tail -1) / $(echo "$n2" | grep -oE 'no URLs attempted' | tail -1)"

# 9 — no free references (the defect class that reached the client on 2026-09-20)
for f in "$PAY" "$RUN" "$BUNDLE"; do
  dr=$(cd "$ROOT" && node tools/dangling-refs.mjs "$f" --catch-only 2>&1 | tee -a "$OUT")
  step "dangling $(basename "$f" | sed 's/O8.12-runner.js/runner/;s/stego11p-real.min.js/payload/;s/O8.14-bundle-820f06c2.js/bundle/')" "$(echo "$dr" | grep -oE 'clean — every referenced name is declared or a known runtime global|(PASS|FAIL) — [0-9]+ dangling name\(s\) total[^)]*\)' | tail -1)"
done

# 10 — the decoy garden is byte-identical in all three membership modes
for k in 0 1 2; do
  dp=$(cd "$ROOT" && node tools/decoy-parity.mjs "$PAY" "$DEC" --name "佐藤 結衣" --kaikan $k 2>&1 | tee -a "$OUT")
  step "decoy-parity k=$k" "$(echo "$dp" | grep -oE '(PASS|FAIL)[^|]*' | head -1)"
done

# 11 — what vocabulary leaks out of the bytes
lc=$(cd "$ROOT" && node tools/leakcensus.mjs "$PAY" 2>&1 | tee -a "$OUT")
# the residual G3 count is the operator-known one (generic words inside mangled identifiers)
step "leakcensus" "payload: $(echo "$lc" | grep -oE '=> (PASS|FAIL)' | tail -1) $(echo "$lc" | grep -oE 'G3[^|]*' | head -1)"

# 11b — step 4: the constraint pass on the bytes that ship (no --pre here: the build ran it with --pre,
# so C5's array-content-order comparison is covered there; this row re-derives the movable set on the artifact)
cp=$(cd "$ROOT" && node Active/O8.15/tools/constraint-pass.mjs "$PAY" 2>&1 | tee -a "$OUT")
step "constraint pass" "$(echo "$cp" | grep -oE '=> PASS[^|]*|=> FAIL[^|]*' | tail -1) ($(echo "$cp" | grep -cE '   PASS ') green)"

# 12 — the e-family pieces still behave exactly like the frozen golden trace
sp=$(cd "$ROOT/Active/O8.14/CC-33" && node $ROOT/tools/split-equivalence.mjs \
  --b $SEL/shard-e1-v1.js,$SEL/shard-e2-mound.js,$SEL/shard-e3-mound.js,$SEL/shard-e4-mound.js \
  --pre $SEL/shard-m-str-v1.js,$SEL/shard-e-str1-v1.js,$SEL/shard-e-str2-v4.js,$SEL/shard-u-v4.js \
  --rounds 400 --vs-baseline $ROOT/Active/O8.14/CC-33/reports/split-equivalence-e-golden.json 2>&1 | tee -a "$OUT")
step "golden trace" "$(echo "$sp" | grep -oiE '(PASS|FAIL)[^|]*|[0-9]+ events' | head -2 | tr '\n' ' ')"

say ""
say "== board complete — $LABEL == =="
grep -c FAIL "$OUT" | sed 's/^/FAIL lines: /'
