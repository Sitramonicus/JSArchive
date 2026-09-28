# The 8.15 gate baseline — the exact 8.14 numbers a build must reproduce

Source: `Working-Stable/O8.14/FROZEN-2026-09-22.md`. This file exists so an 8.15 build can be compared
without re-reading the freeze record, and so no one has to guess what "no regression" means.

**The law (operator, 2026-09-25):** *"I just want this as a supplement that patches up a possible
vulnerability… I don't want that patch to be a regression on the great standing that we're currently at."*
→ a 8.15 build must land on **the same numbers**, not merely "no new failures".

## 0. Where 8.15 landed (build 25, 2026-09-26)

| artifact | 8.14 (frozen) | b25 (8.15) |
|---|---|---|
| paste (runner) | 3,375,606 B · `ad898afb` | 3,278,667 B · `802c4763` (−96,939 B, arm A) |
| cover (carrier) | 2,359,350 B · `3bf21868` | 2,359,350 B · `c6738275` |
| payload | 2,384,572 B · `28d36d97` | 2,388,103 B · `60316654` (+3,531 B raw, −12,275 B gzip) |
| decoy / honey / tube / rotation | `55895e58` / `88397e56` / `ed0db1cd` / `f9f5c4c1` | **unchanged** |

Two rows move for documented reasons and are not regressions: the matrix gains one assertion in the 8.15
copy (25/0 → 26/0, the new "FRAG publishes no deal" row), and `leakcensus` goes from a known-4 red to
**PASS**. Everything else lands on the same numbers. Full record: `CC-34/reports/BUILD-25-REPORT.md`.

## 1. Identity — the eight frozen artifacts

| artifact | bytes | sha256 (first 8) |
|---|---:|---|
| paste (runner) | 3,375,606 | `ad898afb` |
| cover (carrier) | 2,359,350 | `3bf21868` |
| bundle (raw worker) | 2,764,116 | `820f06c2` |
| payload (`stego11p-real.min.js`) | 2,384,572 | `28d36d97` |
| decoy | 3,112 | `55895e58` |
| honey | 1,230 | `88397e56` |
| tube | 2,242 | `ed0db1cd` |
| rotation | 703 | `f9f5c4c1` |

Mirrors: `Working-Stable/O8.14/` and `Archives/packages/O8.14/` — each `sha256sum -c SHA256SUMS.txt` = 8/8.
Rollback: `Archives/rollback-b22/` (b22, `71b73a15`). **None of these are inputs to a 8.15 build; they are
the comparison set.**

## 2. Battery — what a 8.15 build must reproduce

| gate | 8.14 result | how it is re-run on a 8.15 build |
|---|---|---|
| `tools/chain-revive-check.mjs <shards dir>` | 14/14 (neg control 11/14) | payload/shard rows — **invariant when the payload bytes are unchanged** |
| `tools/hold-check.mjs <payload> <runner>` | PASS (9/9) | payload + runner |
| `tools/gate-replay.mjs --spec` | 17/17 | payload |
| gate matrix (real loader) | unlocks 2/2 at t=5 · verbs rejected 3/3 · post-window teardown 5/5 | payload + runner |
| `tools/repaste-check.mjs <runner>` | 5/5 | runner (defaults: `--gap=12000 --seconds=150`) |
| `test-stego11-matrix.mjs <runner> <bmp>` | 25/0 | runner + cover (8.15 copy is frag-shape aware → 26/0, see below) |
| `test-stego11-tiers.mjs <runner> <bmp> <clean>` | 42/0 (1 skipped) | runner + cover |
| `tools/carrier-flip-check.mjs <bmp> <clean> <real> <runner>` | 14/0 | cover + payload + runner |
| `tools/detector-replay.mjs <payload>` | PASS | payload |
| `tools/netwatch-probe.mjs <payload>` | 0 calls / no URLs | payload |
| `tools/dangling-refs.mjs` | payload 61/**0** · bundle 36/**0** · runner clean | all three |
| `tools/decoy-parity.mjs <real> <decoy>` | PASS ×3 · golden trace PASS (25 events) | payload |
| `tools/leakcensus.mjs <payload>` | **G3 = 4** — standing red, deliberately not weakened; the fix is a classifier/derivation change in 8.15 (see DECISIONS §D5). **b25: PASS** (the normaliser masks the residue; the gate was never relaxed) | payload |
| `Active/O8.15/tools/constraint-pass.mjs <payload> [--pre=]` | **new gate (b25):** PASS 5/5 · negative control (two swapped pushes) fails as designed | payload (+ the pre-weave file for C5) |
| board (`bash tools/board.sh <label>`) | `FAIL lines: 2` = the intended T2 fail-closed + the census | all |

**Extra row for 8.15 (new, from the arm A work):**

| gate | expectation |
|---|---|
| `tools/runner-wire-probe.mjs <runner>` | staged code = the payload digest above; arm A must leave it **byte-identical** |
| `tools/frag-derive-check.mjs <runner> --cover-sha=<cover>` | no published deal; the regenerated deal reassembles **the cover**, digest MATCH |

## 3. Reading the numbers honestly

- A row that consumes only the **payload** or the **cover** is invariant if those two digests are unchanged —
  say "invariant by identity", not "re-run green".
- A row that consumes the **runner** must be re-run: the runner is expected to differ (arm A removes ~97 KB).
- Two counts move for a documented reason and must be reported as such, never as a pass: the matrix test
  gains one assertion in the 8.15 copy (`FRAG publishes no deal`), so 25/0 becomes 26/0; and the leakcensus
  red is **resolved by the normaliser** in b25 (PASS, unexplained 0) rather than by touching the gate.

## 4. Structural rows b25 adds (they have no 8.14 counterpart)

| row | what it measures | b25 |
|---|---|---|
| weave locality (`weave-payload.mjs` metric) | longest stretch of one origin's bytes laid end to end; worst 10 %-window single-origin share | 163,121 → **99,932 B** · 0.776 → **0.501** (B13 target ≤ 0.25 not met; the floor is one statement — see the build report §5) |
| payload compression | gzip / brotli-q11 on the shipped payload | 994,234 → **981,959** · 773,363 → **770,159** |
| carrier occupancy | slots needed, occupancy, headroom per reel | need 1,964,044 slots (8.14: 1,984,988–96) · **87.69/87.70 %** · **68,909/68,841 B** |
