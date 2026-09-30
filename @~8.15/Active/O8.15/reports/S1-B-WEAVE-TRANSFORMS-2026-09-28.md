# S1-B weave transforms — gate battery and keep-or-reject record (2026-09-28)

Scope: the three weave-side transforms behind default-OFF flags in `tools/weave-payload.mjs`, sized by the
S1-B fixed-item ledger (`reports/S1-B-FIXED-INVENTORY-2026-09-28.{json,md}`), measured per-transform against
the landed stack. Acceptance ruler = `tools/recon/share-sweep.mjs`. Baseline = the S1-A-fixed provisional
build's ruler reading: **worst 0.4025 (bucket 15) · >0.25: 49/73 · mean 0.2797 · excess 3.145**.

Input for every run: `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js`, seed 2648369387, landed stack
`WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1 WEAVE_RUN_WRAP_KB=28
WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1`. New flags are additive. Every run's
outputs and logs are preserved under `provisional/S1-B-weave-stack-2026-09-28/`.

## 1. What was implemented

| flag | transform | ledger class it targets |
|---|---|---|
| `WEAVE_RUN_WRAP_SOLO=1` | run-wrap accepts 1-statement runs at ≥ 2 KB (MIN_STMTS waived) as one-statement helpers | `split:wrap` — 238 items / 506,337 B window weight |
| `WEAVE_RELAX_SPAN=1` | span-decidable purity relaxation: a run member is movable when its value is call-free (no Call/New/Update/Assign/Await/Yield/TaggedTemplate), it does not read its own group binding, and no non-member statement in the reader window writes any name it reads or the binding | `movable:relax-span` — 1,431 items / 607,271 B |
| `WEAVE_DECL_RELOC_ALL=1` | every accepted pure-value `var`/function-case declaration becomes a placed item with legal range `[lastTouch+1, firstRead)` | `movable:decl-reloc` — 222 items / 53,689 B |

All three are byte-preserving statement-unit moves (whole statements emitted from original coordinates);
`split:literal` is NOT attempted weave-side (it drops key bytes → conservation holes, same class of failure as
the rejected `WEAVE_RUN_WRAP_HOISTVAR`), it belongs in `split-runs.mjs` at payload level.

## 2. Bug found and fixed during the battery (wrapHazard)

The first `WEAVE_RUN_WRAP_SOLO` run FAILED the output-re-parse gate (3 illegal `await`s). Root cause: the
run-wrap hazard predicate gated on `return`/`this`/`arguments`/`super`/`new.target` but not on top-level
`await`/`yield` — a statement whose `await` binds to the enclosing async function was sliced into a plain
`function name(){…}` helper (recovered-AST trace: error inside non-async wrap helper `moduӋ3758`, plus two
identical sites). The shared (≥4-statement) path had the same latent gap; it had never fired on this payload.

Fix in `wrapHazard` (tools/weave-payload.mjs): `AwaitExpression` outside an arrow boundary, any
`YieldExpression`, and labeled `break`/`continue` are now wrap hazards. Verified inert: the flags-off
re-run still reproduces the canonical output byte-for-byte (`37d824d305ba183f…`).

## 3. Gate battery

Every configuration passes the weave's five self-checks (conservation · re-parse · permutation-only ·
order · relocation read-freedom) and `constraint-pass.mjs` C1–C5 5/5 with `--pre=weave-in-chainA.js`.

| config | worst | >0.25 | mean | excess | relocations | run groups dealt | woven mass |
|---|---|---|---|---|---|---|---|
| baseline (landed) | 0.4025 | 49/73 | 0.2797 | 3.145 | 26 | 79 | 91.1 % |
| `RELAX_SPAN` | 0.4039 | 49/73 | 0.2809 | 3.248 | 75 | 143 | 91.4 % |
| `DECL_RELOC_ALL` | **0.4010** | 49/73 | 0.2753 | 3.067 | 280 | 79 | 91.1 % |
| `RUN_WRAP_SOLO` | 0.4104 | 49/73 | 0.2783 | 2.854 | 26 | 79 | 97.9 % |
| all three | 0.4026 | 49/73 | **0.2770** | **2.850** | 305 | 143 | 98.1 % |

Solo wrap delta isolated: 33 → 51 helper runs, +18 statements, +147 KB moved into helpers (290 → 437 KB).
Relax admission measured: 127 refused groups → 63 refused (64 groups / 257 members freed… 143 groups dealt
in total incl. the 79 landed). `DECL_RELOC_ALL` widens reader windows by 27,819 KB total across 305
relocations in the combined run.

Top-10 window band (share-sweep): relocall `0.401 0.396 0.393 0.383 0.381 0.367 0.361 0.361 0.352 0.350`;
all3 `0.403 0.387 0.384 0.383 0.372 0.370 0.365 0.363 0.355 0.350` — all3 flattens ranks 2–10, the bucket-15
worst window does not move in any configuration (the fixed-atom wall the ledger certificates).

## 4. Keep-or-reject

Decision rule (carried from the levers-doc convention): a transform joins the DEFAULT stack only if the
ruler's worst-window column does not regress; distribution gains alone do not buy a default.

- **`WEAVE_DECL_RELOC_ALL` — KEEP.** Unambiguous win: worst −0.0015, mean −0.0044, excess −0.078. The only
  transform that improves every ruler column on its own.
- **`WEAVE_RUN_WRAP_SOLO` — REJECT as default** (worst +0.0079 = 0.4104), code stays behind the flag.
  Recorded positive: the largest total-exposure cut of any single lever (excess −0.291).
- **`WEAVE_RELAX_SPAN` — REJECT as default** (all three columns regress). The freed members can only spread
  inside their own reader windows — the levers-doc prediction ("neutral-to-harmful on its own") is now
  measured fact. Code stays behind the flag as the prerequisite for any future window-widening work.
- **all-three stack — recorded alternative, not default.** Best mean (0.2770) and excess (2.850, −9.4 %),
  worst within noise of baseline (+0.0001). Designated candidate if the release gate weighs total exposure
  over the worst-window column; the conservative fallback is `DECL_RELOC_ALL` alone.

## 5. Artifacts

`provisional/S1-B-weave-stack-2026-09-28/`: `SHA256SUMS` (candidate hashes: relocall.js
`33732968f6b424d0…`, all3.js `b6c402d8375f4df0…`, maps `242bbf9b…`/`822dda14…`), constraint-pass JSON for
both, and `logs/` (weave debug logs incl. the flags-off regression `regress.log`/`regress2.log` proving
byte-identity to the S1-A-fixed canonical output). NOTE 2026-09-28: the two candidate .js and their
weave-map.json files were deleted in a workspace budget trim — they are fully regenerable from the frozen
input + `tools/weave-payload.mjs` + the flags/seed recorded above (re-run ≈ 90 s per candidate).

Consequence for the ledger ranking: `movable:relax-span` (607 KB) is NOT a ruler unlock by itself — the
class value is window-limited exactly as predicted. `movable:decl-reloc` (54 KB of items) punches above its
size because relocation WIDENS the windows the other classes spread into. The remaining ruler headroom sits
with `split:literal` (925 KB / 8 items, payload-level work in `split-runs.mjs`) and the bucket-15 wall
itself.
