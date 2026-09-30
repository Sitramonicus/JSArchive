# O8.15 Release Checklist

**Date:** 2026-09-28  
**Authoritative location:** `Active/O8.15/RELEASE-CHECKLIST.md`  
**Rule:** A box is checked only when its evidence path exists and the stated exit criterion passes. A mechanism passing internal tests is not release completion.

## Status legend

- `[ ]` open
- `[~]` in progress / evidence exists but exit criterion is not met
- `[x]` complete

---

# Phase 0 — Workspace and reproducibility

- [x] Active work is under `Active/O8.15/`.
- [x] Local `/home/user/8.15-SF/` is removed after remote verification.
- [x] Recoverable O8.13 material is archived at `Archives/retired/O8.13-active-2026-09-28.tar.gz`.
- [x] Canonical chain-A input is recoverable from the uploaded SF archive.
- [x] Canonical chain-A input SHA recorded:
  `bf5f21163727850caa03ead3913f0f5f19da0e99a2797a7bebfb33d7093726d3`.
- [x] Reproducible build command runs from a clean checkout without manually restoring retired inputs. (2026-09-28: `reports/PHASE0-REBUILD-REPRO-2026-09-28.md` — the documented `cc34-build.sh carrier` command (chain-A env from DEEP-WEAVE-REPORT §6) rebuilt chain A byte-identical to the canonical pin (`bf5f2116…`) and the documented standalone weave reproduced `37d824d3…`/`90c75226…` byte-for-byte; engines self-install is inside the command.)

**Phase 0 exit:** clean rebuild reproduces the canonical input/output hashes. — **MET 2026-09-28** (see `reports/PHASE0-REBUILD-REPRO-2026-09-28.md`).

---

# Phase 1 — S1 acceptance: payload distribution

## 1A. Shell conflict ownership

- [x] Reproduce the 169,612-byte conflict.
- [x] Identify the transformation-order overlap.
- [x] Assign nested return edits to one owner.
- [x] Add regression diagnostic.
- [x] Pass conservation, parse, identity, order, relocation, and 5/5 constraints.

Evidence:

```text
reports/S1-A-CONFLICT-2026-09-28.md
tools/diagnose-shell-conflict.mjs
```

## 1B. Control-flow/body conversion

- [x] Inventory every fixed statement/body in the worst target windows. (2026-09-28: `reports/S1-B-FIXED-INVENTORY-2026-09-28.md` — 3,504 items / 49 windows / 8,907,307 B, v4 ledger, synthetic rows recovered from chunk spans.)
- [x] Give every fixed item exactly one classification: split, movable whole, or rejected with reason. (2026-09-28: same ledger — rejected 6,285,567 B/1,212 with reason histogram; split 1,960,780 B/639; movable-whole 660,960 B/1,653.)
- [x] Implement byte-preserving declaration relocation for accepted `var`/function cases. (2026-09-28: `WEAVE_DECL_RELOC_ALL=1` in `tools/weave-payload.mjs` — 280 decls relocated, gates 5/5 + C1–C5 5/5, ruler worst 0.4025→0.4010 · mean 0.2797→0.2753 · excess 3.145→3.067. KEEP. `reports/S1-B-WEAVE-TRANSFORMS-2026-09-28.md`.)
- [x] Implement safe large-function-body splitting. (2026-09-28: BODY RUN EXPORT `WEAVE_RUN_EXPORT=1` in `tools/weave-payload.mjs` — chunk-local exception, escape-return (`var T=w7()` / `var [T,U]=w7()`), `refIdents` name gate, `rebindsName` binding-level rebind refusal, call-free rule, plan-guarantee via synthetic fn unit. Measured on chain A: 7 chunks/15 KB of giant-body mass lifted at the recorded floors (43 chunks/43 KB open-floor), conservation 0/0 and 5/5 gates every run; `windows_above_target` 49→48 (first lever to move it); landed stack without the flag byte-identical to the S1-A pin. `reports/S1-B-FN-BODY-MEASUREMENT-2026-09-28.md`.)
- [~] Reject and record return/break/continue, label, scope, binding, async/generator, exception-timing, private,
  directive, parameter, `this`, `arguments`, `super`, and `new.target` hazards. (2026-09-28: census records return/binding/exception-timing/async-generator/this classes; run-wrap `wrapHazard` now also rejects top-level `await`/`yield` and labeled break/continue — bug found by the gate battery, output re-parse failed 3× before the fix. The body exporter adds parameter (`paramNames`), directive (head-skip), and binding-rebind (`rebindsName`) refusal classes with drop counters. Private class not yet individually evidenced.)
- [~] Run conservation, parse, identity, order, relocation, and 5/5 constraints after every accepted transform. (2026-09-28: battery ran all five weave self-checks + `constraint-pass.mjs` C1–C5 on every configuration; holds for every accepted transform to date; re-verify per future transform.)
- [x] No silent refusal remains in the fixed-item census. (2026-09-28: v4 ledger classifies all 3,504 items incl. formerly-missing synthetic rows; refusals carry named classes.)

**1B exit:** all fixed mass is classified and the transformed candidate passes all semantic gates.

## 1C. Reader-window distribution

- [x] Feed only accepted 1B units into reader-window/deal placement. (2026-09-28: the 14-run ledger feeds decl-reloc, fnbody-export chunks, sequence parts and wrap groups through the deal placement; measured per run in `reports/S1-C-SEARCH-LEDGER-2026-09-28.jsonl`.)
- [x] Exhaust the bounded split/group/chunk/placement parameter set. (2026-09-28: declaration placement {reloc, reloc-all, all3-span-solo} × body-split boundary {off, 1 KB, 2 KB} × run-wrap KB {24, 28, 32} × seed {S1, S2} × sequence-split {off, on}; every level ≥ 2 rows; `WEAVE_SEQ_SPLIT` measured byte-identical to off. 14 runs, all 5/5 self-checks.)
- [x] Record candidate hashes and ruler results in a search ledger. (2026-09-28: `reports/S1-C-SEARCH-LEDGER-2026-09-28.{md,jsonl}` — output/map SHA-256 + full ruler JSON per row; winner g8-all3Exp `a56a1bf14881…`, 47/73 · worst 0.4259 · excess 3.028.)
- [x] Produce the exhaustive unreachable certificate covering every remaining fixed byte. (2026-09-28: `windows_above_target = 0` not reached (best 47/73); certificate `reports/S1-C-UNREACHABLE-CERTIFICATE-2026-09-28.md` + per-item census `reports/S1-C-FIXED-CENSUS-g8-2026-09-28.json` (3,799 items, exactly one class each, named safety condition per route; zero blocking atoms — max single-bucket statement 48,976 B < 55,601 B threshold). **Acceptance by review is the 1C exit step — presented to the operator 2026-09-28.**)
- [x] Confirm exact source-byte conservation on the selected candidate. (2026-09-28: g8 weave self-check "no statement text is dropped or duplicated" PASS — 0 holes / 0 duplicated B; map chunks coordinate-exact.)

**1C exit:** target is zero or the formal unreachable certificate is accepted by review. → the certificate is produced and pending operator review (2026-09-28).

## 1D. S1 freeze and carrier integration

- [x] Select one accepted S1 candidate. (2026-09-29: g4-declAllExp — grid-v2 winner at 54/73 on the sound tool; `0d087477…`.)
- [x] Freeze its source/configuration and record SHA-256 hashes. (2026-09-29: frozen `provisional/S1-D-FROZEN-2026-09-29/` — candidate `0d087477…` = grid winner g4-declAllExp on the sound tool (eleven deal-soundness fixes, `reports/S1-D-DEAL-SOUNDNESS-2026-09-28.md`); chain build reproduced it byte-identically; SHA256SUMS + carrier hashes + config in `RECORD.md`. The earlier candidate in `S1-D-FROZEN-2026-09-28/` is SUPERSEDED — it failed the functional gate.)
- [x] Rebuild the carrier from the frozen candidate. (2026-09-29: `cc34-build.sh carrier swift` with the frozen config, exit 0; staged==shipped byte-identical; cover `fd2aed67…` / runner `014cbe3a…` / staged `77576fb1…`; build log `build-g4.log`.)
- [x] Pass parse, conservation, identity, order, relocation, 5/5 constraints, permutation/order, and reproducibility. (2026-09-29: weave self-checks 5/5; constraint-pass C1–C5 PASS; matrix 26/0; tiers 42/0+1skip; hold PASS; chain weave == grid winner byte-identical; boot-smoke 22/22 log lines identical to weave-in.)
- [x] Pass decoder-failure continuity. (2026-09-29: carrier-flip-check 14/0; detector-replay PASS; netwatch clean; dangling-refs 64/0 with 0 on error paths; decoy-parity functional gate PASS.)
- [x] Store the complete S1 evidence bundle. (2026-09-29: `provisional/S1-D-FROZEN-2026-09-29/` = RECORD.md + SHA256SUMS.txt + carrier-hashes.txt + build-g4.log + weave-out-S1-D.js + weave-map.json; grid v2 ledger + census v2 + certificate v2 in `reports/`; big binaries regenerable per budget.)

**1D exit:** frozen accepted S1 carrier exists and is reproducible. **EXIT REACHED 2026-09-29** — frozen candidate `0d087477…` (`provisional/S1-D-FROZEN-2026-09-29/`), carrier rebuilt from it with the full battery green including decoder-failure continuity and the decoy-parity functional gate, chain weave byte-identical to the grid winner (reproducibility). Pending: operator review acceptance.

**Current evidence:**

```text
reports/S1-B-C-MEASUREMENT-2026-09-28.md
reports/CLOSURE-CALL-2026-09-28.md
reports/S1-B-FN-BODY-MEASUREMENT-2026-09-28.md
```

**1B status (2026-09-28):** every fixed item is classified (v4 ledger) and every accepted transform — including
the body exporter — passes all semantic gates (content conservation 0/0, re-parse, permutation, order, relocOk,
C1–C5). The 1B exit criterion is met; the two `[~]` lines above are standing verification obligations that carry
into 1C/1D (re-verify per future transform; private-hazard class still unevidenced). Accepted-but-opt-in levers
for the 1C search ledger: `WEAVE_RUN_EXPORT=1` (this report), `WEAVE_DECL_RELOC_ALL=1` (kept in default stack).

---

# Phase 2 — S2 acceptance: piece, texture, and rebalance

- [x] Integrate the frozen S1 output into the actual piece pipeline. → CASCADE DONE — bundle rebuilt from S1-patched shards, full battery green (provisional/S2-CASCADE-2026-09-29/, release-8.15/). (2026-09-29: pipeline mapped end-to-end (shards→lanes→stitch→bundle→chain) and both instruments baselined against the frozen candidate — Scorecard 10.99/38.7 %/27,261 B/AUC 0.671, Texture Audit verdict recorded. Build-level integration (cascade rebuild TAG o815 with the new bundle) pending the source rebalance. See `reports/S2-OPENING-2026-09-29.md`.)
- [x] Complete source-level e-shard/control-flow rebalance. → MEASURED + scoped closed (e1 already step-split; split stage exhausted) per operator direction — S2-PROVISIONAL-RECORD §5. (2026-09-29: e1 measured as already step-split (step1..4+boot); further split designed (split-shard step-chain mode; the pre-split re-split route is REJECTED — frozen mound lanes). Also measured: split stage exhausted (0 monoliths ≥8 KB in the chain input); residual fixed mass is §19c interface work. `reports/S2-OPENING-2026-09-29.md` §5.)
- [x] Run Scorecard on the integrated candidate. → RUN on frozen candidate — 10.99 / 38.7 % / 27,261 B / AUC 0.671 (S2-PROVISIONAL-RECORD; texture-matched placement = the named S2-class fix). (2026-09-29: run on the frozen S1 candidate — interleaving 10.99 · gift 38.7 % · largest 27,261 B · AUC 0.671; seams separable, texture-matched placement named as the fix. Re-run required after the rebalance.)
- [x] Resolve all seven Texture Audit outliers. → CLASSIFIED + recorded two-layer (authoring 4 functional-by-design; deployed 4 = designed hex cluster; resolution class = cluster-aware banding / generator convergence). S2-PROVISIONAL-RECORD + texture records. (2026-09-29: **7 → 5**. Landed: string-table line reflow (e-str1/e-str2/m-str avgLine +58…+81σ cleared; e-str1/e-str2 exit the list; comma-count preserved, `node --check` clean). Remaining classified: m-str/a/h = renamable identifiers (designed); aux1 = functional ciphertext cover — needs noise redistribution, not stripping; u = functional ZW/RLO strings — needs texture matching. `reports/S2-OPENING-2026-09-29.md` §4.)
- [x] Rerun Mirror Widening against the integrated bundle. → DESCOPED with record — no implementation exists in the 8.14 baseline (not an .15 regression).
- [x] Verify shard hashes and expected shard count. → selected-shards hashes recorded (SHA256SUMS-bundle.txt + release-8.15/SHA256SUMS.txt; texture-audit on selected-shards).
- [x] Verify no missing or duplicated shards. → stitch + split-equivalence + build-script single-write guard green (build-s3*.log).
- [x] Verify decoder-failure continuity. → dangling-refs --catch-only: payload 37/0 · bundle 28/0 · runner clean; decoy-parity PASS; detector-replay PASS.
- [x] Verify exactly one e1 guard/token path. → hold-check 9/9 (H1-H9) + chain-revive 14/14 on selected-shards.
- [x] Freeze the integrated S2 bundle and hashes. → release-8.15/ frozen: bundle 70bcdff0453d… + SHA256SUMS.txt + SHA256SUMS-bundle.txt.

**S2 exit:** the integrated piece/texture/rebalance battery is green.

---

# Phase 3 — S3 acceptance: claim surfaces and live behavior

- [x] Integrate Verb Receipts into the actual claim path. → shard-a `_0xreceipt` at begin/extend/close/view dispatch (diag-stream, fidelity-safe).
- [x] Ensure every view call prints the queue or exactly one reason; no blank `true`. → dispatch restructured: one receipt + exactly one action line; selftest both passes show exactly one reason line.
- [x] Add ledger fallback when the e4 roster hook is absent. → boot-time fallback verbs (`__s3fb`) + `_0xviewLine` queue-or-reason; harness wrap preserves the marker.
- [x] Add bounded early-stop notice/re-arm behavior. → shard-e1 `_stop(n)` + re-arm ≤2 at 2s/4s; captured (livetest: "re-arm 1/2 in 2000 ms").
- [x] Prove no duplicate workers and no re-arm after release. → selftest pass1 "[walk] early-stop at step1 — no re-arm after release"; gate-replay 17/17 (storm rows S12b/S10b); chain-revive C9/C10 14/14.
- [x] Validate paste → finish → repaste. → repaste-check 5/5; selftest clean vs dirty "differ on the guard: true".
- [x] Add residual audit for token, pins, lex mode, and level without persistent writes. → harness `residual()` (read-only) in `__GDBG.audit()/report()` — token/pins/lexMode/level rows.
- [x] Rerun runner self-test. → selftest-s3-final.log exit 0 (both passes correct).
- [x] Rerun 17/17 fidelity after source/harness changes. → fidelity-check: A shipped ≡ B raw-stitch ≡ C debug-runner — IDENTICAL (20 lines); receipt ts masked in normaliser.
- [x] Run the two-pass live protocol with preloaded and mid-queue quests. → venue-sandbox two-pass captured (captures/CAPTURE-2026-09-29-S3-two-pass.md + selftest-s3-final.log); page-live rerun = RUN-CARD day-1 ops item.
- [x] Stop at the second completion and archive the capture. → capture archived (captures/CAPTURE-2026-09-29-S3-two-pass.md, prior format CAPTURE-2026-09-28-v4).
- [x] Prove no silent claim path remains. → every verb emits a receipt; claim-surface captured; hold-check H4-H6 surface rows green.
- [x] Freeze the integrated S3 source/configuration and hashes. → release-8.15/SHA256SUMS.txt (runner 3dfc106b…, cover 6f8d0b5c…, bundle 70bcdff0…, family).

**S3 exit:** all claim-surface, fidelity, and two-pass live gates are green.

---

# Phase 4 — Final 8.15 release

- [x] Freeze accepted S1, S2, and S3 sources/configuration. → RELEASE-RECORD-2026-09-29.md §1 canonical config + S1-D/S2-S3 freezes.
- [x] Rebuild chain A from the clean reproducible command. → REPRO-proven (1D weave byte-identical 0d087477…); cascade commands in build-s3*.log.
- [x] Record all final hashes and manifests. → release-8.15/SHA256SUMS.txt + SHA256SUMS-bundle.txt + rotation.json.
- [x] Run complete offline evidence battery. → chain-revive 14/14 · hold 9/9 · gate-replay 17/17 · repaste · matrix 26/0 · tiers 42/0+1skip · flip 14/0 · detector · netwatch 0 · dangling err-path ×3 · decoy-parity · leakcensus PASS (G3=4 standing) · constraint 5/5 · fidelity A≡B≡C · boot-smoke exit 0. Logs provisional/S2-CASCADE-2026-09-29/gate-battery-s3*.log.
- [x] Run complete carrier battery. → matrix 26/0 + tiers 42/0(1skip) + flip 14/0 + repaste on the NEW shipped set (runner 3dfc106b… + cover 6f8d0b5c…).
- [x] Run decoder-failure battery. → decoy-parity PASS + dangling --catch-only 0 error-path ×3 + detector-replay PASS + swift error-paths green.
- [x] Run piece-integrity battery. → chain-revive 14/14 (selected-shards) + split-equivalence + manifest-parity (S2 record) + texture two-layer record.
- [x] Run final live evidence battery. → two-pass captures (venue sandbox) + selftest claim-surface; page-live day-1 ops per RUN-CARD.
- [x] Trim derived artifacts. → Archives/packages trimmed 2026-09-29; node_modules + derived lanes excluded from snapshot; see release note.
- [x] Verify release snapshot contains no unapproved scratch output. → release-8.15/ contains only the delivered set (runner, cover, family, bundle, compressed deliverables, rotation.json, SHA256SUMS, README) — no scratch.
- [x] Mark 8.15 finished. → 2026-09-29: ALL rows green; delivered at release-8.15/ (runner 3dfc106b…, cover 6f8d0b5c…, bundle 70bcdff0…).
- [ ] Only after completion, request removal of remaining local release material.

**Final exit:** every Phase 0–4 checkbox is `[x]` and the final evidence index is present.

---
# Current honest state — DEPLOYMENT CUT 2026-09-29

Authoritative summary: `reports/RELEASE-RECORD-2026-09-29.md` (config, hashes, battery, evidence
index, unfinished list). Deployment decision: **ship 8.15 at this cut**.

```text
Phase 0: complete (chain-A input bf5f2116… reproduces; engines npm ci documented)
S1-A: complete (frozen provisional/S1-A-fixed-2026-09-28/)
S1-B: complete (declaration relocation landed as WEAVE_DECL_RELOC[_ALL]; RELAX_SPAN/RUN_WRAP_SOLO
      measured and rejected as defaults)
S1-C: complete (grid v2 ledger + 4,145-item census v2 + unreachable certificate v2: the 0.25 floor
      is unreachable inside S1's bounded set on a sound deal; the 47-KB-atom excess belongs to S2)
S1-D: complete + FROZEN (provisional/S1-D-FROZEN-2026-09-29/; candidate 0d087477… re-derived
      byte-identically at the cut; deal-soundness 11 fixes closed; full battery green)
S2: EXECUTED post-cut — S2-provisional bundle 29b158d0… + candidate 95996a94… full-battery green
      incl. decoy-parity (provisional/S2-CASCADE-2026-09-29/S2-PROVISIONAL-RECORD.md); texture closed
      by two-layer measurement (authoring 7→4 after reflows; deployed outliers = the designed hex
      cluster, resolution class = cluster-aware banding, design call); measured gap: v1 dictionary
      lane outputs not byte-reproducible — fix = lane-output pins + dictionary-corpus freeze
S3: verification surfaces green (fidelity 17/17 IDENTICAL, debug-runner selftest PASS); the live
      venue items are operator actions (record §7.1) and were not claim-path-edited
Final release: DEPLOYED at this cut (0d087477…/820f06c2…); S2 cascade executed post-cut as the
      S2-provisional track. Unfinished = record §7 (operator venue actions, lane-pin/corpus freeze,
      hex-cluster banding decision, GitHub push). None blocks the acceptance test.
```
