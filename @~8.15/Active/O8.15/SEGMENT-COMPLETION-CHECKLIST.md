# O8.15 Segment Completion Checklist

> **Authoritative release checklist:** `Active/O8.15/RELEASE-CHECKLIST.md`. This historical checklist is retained for evidence references; use the release checklist for current status and completion decisions.

**Updated:** 2026-09-28
**Closure call:** `reports/CLOSURE-CALL-2026-09-28.md` — S1-A closed; S1-B/C/D and Segments 1–3 remain open.
**Rule:** checked means evidence exists in the workspace; an experiment or report entry alone does not close a segment.

## Progress line

- [ ] Segment 1 — Payload weave: **OPEN**
- [ ] Segment 2 — Bundle pieces: **OPEN**
- [ ] Segment 3 — Page/paste/proof: **OPEN**
- [ ] Final O8.15 integrated build: **OPEN**

---

## 0. Shared preparation

- [x] Frozen O8.14 remains untouched.
- [x] O8.13 active laboratory tree retired with a recoverable archive.
- [x] Canonical chain A identified and SHA-pinned.
- [x] `EXTRACT_ONLY` documented as load-bearing.
- [x] Content-conservation gate exists and rejects dropped/duplicated source bytes.
- [x] Independent constraint pass exists with five checks.
- [x] Workspace trim ledger exists.
- [x] O8.15-SF archive has manifests, SHA sidecars, extraction instructions, and operating ledger.
- [x] Workspace reduced below 100 MB after historical O8.14 archives were moved into SF.
- [ ] Final accepted O8.15 candidate frozen.

## 1. Segment 1 — Inside the payload

### S1-A — 169,612-byte shell conflict

- [x] Reproduce the conflict from canonical chain A. Evidence: `Reports/S1-A-CONFLICT-2026-09-28.md`.
- [x] Record shell body range, call range, return ranges, and edit-owner paths: transformation-order ownership is recorded in `reports/S1-A-CONFLICT-2026-09-28.md`.
- [x] Establish whether the conflict is duplicate AST representation or overlapping shells: transformation-order overlap; nested return edit was re-claimed by enclosing shell.
- [x] Implement one-owner/one-expansion handling: enclosing shell excludes already-owned nested return ranges; shell identity guard remains.
- [x] Add a regression fixture for the exact conflict: `Tools/diagnose-shell-conflict.mjs` and `Reports/S1-A-CONFLICT-2026-09-28.md`.
- [x] Pass conservation, parse, identity, order, relocation, and constraint gates after the fix: conservation 0 holes/0 duplicated; constraint 5/5 PASS.
- [x] Re-measure the target window after the conflict fix: 49/73 windows above target; S1 overall remains open.

### S1-B — Control-flow run splitting

- [x] Run-wrap mechanism exists behind `WEAVE_RUN_WRAP`.
- [x] Slice-safety guard exists.
- [x] Same-shell identity guard exists.
- [x] Run-wrap candidates pass conservation and parse gates.
- [x] Chunk sweep performed.
- [ ] Resolve the remaining bucket-12/13 fixed control-flow mass.
- [ ] Classify every remaining refusal with a proven semantic reason.
- [ ] Reach `windows_above_target = 0`, or complete the formal unreachable proof.

### S1-C — Reader-window placement

- [x] Reader-map/read-aware machinery exists.
- [x] Writes are distinguished from reads in the reader relation.
- [x] Declaration relocation has independent safety checks.
- [ ] Apply reader-window placement to the remaining admissible fixed class.
- [ ] Add/read negative fixtures for aliasing, reads-before-writes, and calls.
- [ ] Rerun all five constraints and conservation.

### S1-D — Integrated S1 candidate

- [ ] Select candidate using `windows_above_target`, not saturated max-share alone.
- [ ] Rebuild exact candidate from chain A with `EXTRACT_ONLY`.
- [ ] Run complete no-regression battery.
- [ ] Store candidate, map, SHA, and logs in SF context.
- [ ] **Segment 1 completion gate:** target/proof, integrated candidate, evidence, and no residues.

**Current measured result:** S1-A-fixed canonical run is recorded in `reports/S1-B-C-MEASUREMENT-2026-09-28.md`: 49/73 windows above target, mean 0.2797. S1-A is checked; S1-B/C/D remain open.

## 2. Segment 2 — Bundle as pieces

### S2-A — Shard Rebalance

- [x] Scorecard instrument exists.
- [x] Texture Audit instrument exists.
- [x] Mirror Widening scope/count work exists.
- [x] Historical CC-33 evidence is preserved in SF archives.
- [ ] Integrate the accepted S1 artifact into the piece pipeline.
- [ ] Land the source-level e-shard/control-flow rebalance.
- [ ] Prove exactly one page-level guard/token set-and-clear path.
- [ ] Verify no missing or duplicated piece.

### S2-B — Scorecard

- [x] Scorecard has been run on experimental woven output.
- [ ] Rerun on the final integrated S1/S2 candidate.
- [ ] Record interleaving, gift coverage, largest piece, and seam discrimination.

### S2-C — Texture Audit

- [x] Gate exists.
- [x] Current red result is recorded with seven outlier pieces.
- [ ] Resolve the seven outliers or prove an intentional accepted residual against the cost target.
- [ ] Rerun without weakening the threshold.
- [ ] Obtain final texture verdict for the integrated candidate.

### S2-D — Mirror and integrity

- [x] Mirror Widening was previously scoped/measured.
- [ ] Rerun against the integrated candidate.
- [ ] Verify `{h}` / `{p}%` resolution and distinct phrase counts.
- [ ] Run carrier flip, staged-versus-shipped, decoder, decoy parity, dangling-reference, and golden-trace checks.
- [ ] **Segment 2 completion gate:** integrated piece artifact, all gates, evidence, and no residues.

## 3. Segment 3 — Page/paste/proof

### S3-A — Claim-surface repairs

- [x] v4 runner exists in `Runners/` as a runners-only folder.
- [x] v4 runner self-test passes.
- [x] Fidelity check is 17/17 IDENTICAL.
- [x] Fresh-page two-pass operator capture exists.
- [x] Healthy capture shows walk, hooks, receipts, ledger, work, view, and close path.
- [ ] Integrate Verb Receipts into the actual accepted O8.15 claim path.
- [ ] Implement Why-Nothing-Printed for every view outcome.
- [ ] Implement Ledger Readout Fallback when roster hook is absent.
- [ ] Implement bounded Early-Stop Notice/Re-arm.
- [ ] Validate Second-Paste Guard in the integrated candidate.
- [ ] Implement Residual Audit.

### S3-B — Offline proof

- [x] Runner self-test passes.
- [x] Fidelity 17/17 passes.
- [ ] Decoy parity k=0/1/2 on the integrated candidate.
- [ ] Baseline line-count/byte invariants on the integrated candidate.
- [ ] Leak-census and texture checks on the integrated candidate.
- [ ] No passphrase text in candidate artifacts.
- [ ] No new persistent writes.
- [ ] Single-token ownership negative tests.
- [ ] Missing-controller, closed-ledger, stale-token, and released-session tests.

### S3-C — Live proof

- [x] Healthy two-pass v4 capture stored.
- [ ] Run final integrated candidate on one page.
- [ ] Quest 1 preloaded before paste.
- [ ] Quest 2 added mid-queue.
- [ ] Stop at second completion.
- [ ] Capture receipts, walk, hooks, ledger movement, close path, and failure reasons.
- [ ] Prove no duplicate worker.
- [ ] Prove no silent view.
- [ ] **Segment 3 completion gate:** six repairs integrated, offline proof green, live proof complete, no residues.

## 4. Final O8.15 release

- [ ] Freeze accepted Segment 1–3 source/configuration.
- [ ] Rebuild chain A with `EXTRACT_ONLY`.
- [ ] Run full no-regression and decoder-failure battery.
- [ ] Verify carrier and piece hashes.
- [ ] Attach final live capture.
- [ ] Trim derived candidates and caches.
- [x] Workspace currently below 100 MB.
- [ ] Update final hashes and reports.
- [ ] Verify GitHub SF copy.
- [ ] Operator approves removal of local `8.15-SF`.
- [ ] Report O8.15 complete only after every required box above is checked.

## Evidence index

- Reports: `8.15-SF/Reports/DEEP-WEAVE-REPORT-2026-09-27.md`
- Plan: `8.15-SF/Plans/O8.15-R2-PLAN-2026-09-26.md`
- Live capture: `8.15-SF/Runner/CAPTURE-2026-09-28-v4-two-pass.md`
- Runner: `8.15-SF/Runner/O8.14-debug-runner.js`
- Measurement JSON: `8.15-SF/Measurements/weave-levers-2026-09-27.json`
- Archive map: `8.15-SF/CONTEXT-MAP.md`
