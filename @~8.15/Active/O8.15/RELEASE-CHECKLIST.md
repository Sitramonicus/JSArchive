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
- [ ] Reproducible build command runs from a clean checkout without manually restoring retired inputs.

**Phase 0 exit:** clean rebuild reproduces the canonical input/output hashes.

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

- [ ] Inventory every fixed statement/body in the worst target windows.
- [ ] Give every fixed item exactly one classification: split, movable whole, or rejected with reason.
- [ ] Implement byte-preserving declaration relocation for accepted `var`/function cases.
- [ ] Implement safe large-function-body splitting.
- [ ] Reject and record return/break/continue, label, scope, binding, async/generator, exception-timing, private,
  directive, parameter, `this`, `arguments`, `super`, and `new.target` hazards.
- [ ] Run conservation, parse, identity, order, relocation, and 5/5 constraints after every accepted transform.
- [ ] No silent refusal remains in the fixed-item census.

**1B exit:** all fixed mass is classified and the transformed candidate passes all semantic gates.

## 1C. Reader-window distribution

- [ ] Feed only accepted 1B units into reader-window/deal placement.
- [ ] Exhaust the bounded split/group/chunk/placement parameter set.
- [ ] Record candidate hashes and ruler results in a search ledger.
- [ ] Achieve `windows_above_target = 0`, **or** produce an exhaustive unreachable certificate covering every remaining fixed byte.
- [ ] Confirm exact source-byte conservation on the selected candidate.

**1C exit:** target is zero or the formal unreachable certificate is accepted by review.

## 1D. S1 freeze and carrier integration

- [ ] Select one accepted S1 candidate.
- [ ] Freeze its source/configuration and record SHA-256 hashes.
- [ ] Rebuild the carrier from the frozen candidate.
- [ ] Pass parse, conservation, identity, order, relocation, 5/5 constraints, permutation/order, and reproducibility.
- [ ] Pass decoder-failure continuity.
- [ ] Store the complete S1 evidence bundle.

**1D exit:** frozen accepted S1 carrier exists and is reproducible.

**Current evidence:**

```text
reports/S1-B-C-MEASUREMENT-2026-09-28.md
reports/CLOSURE-CALL-2026-09-28.md
```

---

# Phase 2 — S2 acceptance: piece, texture, and rebalance

- [ ] Integrate the frozen S1 output into the actual piece pipeline.
- [ ] Complete source-level e-shard/control-flow rebalance.
- [ ] Run Scorecard on the integrated candidate.
- [ ] Resolve all seven Texture Audit outliers.
- [ ] Rerun Mirror Widening against the integrated bundle.
- [ ] Verify shard hashes and expected shard count.
- [ ] Verify no missing or duplicated shards.
- [ ] Verify decoder-failure continuity.
- [ ] Verify exactly one e1 guard/token path.
- [ ] Freeze the integrated S2 bundle and hashes.

**S2 exit:** the integrated piece/texture/rebalance battery is green.

---

# Phase 3 — S3 acceptance: claim surfaces and live behavior

- [ ] Integrate Verb Receipts into the actual claim path.
- [ ] Ensure every view call prints the queue or exactly one reason; no blank `true`.
- [ ] Add ledger fallback when the e4 roster hook is absent.
- [ ] Add bounded early-stop notice/re-arm behavior.
- [ ] Prove no duplicate workers and no re-arm after release.
- [ ] Validate paste → finish → repaste.
- [ ] Add residual audit for token, pins, lex mode, and level without persistent writes.
- [ ] Rerun runner self-test.
- [ ] Rerun 17/17 fidelity after source/harness changes.
- [ ] Run the two-pass live protocol with preloaded and mid-queue quests.
- [ ] Stop at the second completion and archive the capture.
- [ ] Prove no silent claim path remains.
- [ ] Freeze the integrated S3 source/configuration and hashes.

**S3 exit:** all claim-surface, fidelity, and two-pass live gates are green.

---

# Phase 4 — Final 8.15 release

- [ ] Freeze accepted S1, S2, and S3 sources/configuration.
- [ ] Rebuild chain A from the clean reproducible command.
- [ ] Record all final hashes and manifests.
- [ ] Run complete offline evidence battery.
- [ ] Run complete carrier battery.
- [ ] Run decoder-failure battery.
- [ ] Run piece-integrity battery.
- [ ] Run final live evidence battery.
- [ ] Trim derived artifacts.
- [ ] Verify release snapshot contains no unapproved scratch output.
- [ ] Mark 8.15 finished.
- [ ] Only after completion, request removal of remaining local release material.

**Final exit:** every Phase 0–4 checkbox is `[x]` and the final evidence index is present.

---

# Current honest state

```text
Phase 0: mostly complete; clean rebuild reproducibility remains open
S1-A: complete
S1-B: open
S1-C: open
S1-D: open
S2: open, blocked on frozen accepted S1
S3: open, blocked on integrated candidate and final harness/source changes
Final release: open
```

The next work item is the first unchecked S1-B box: the fixed-item census and byte-preserving declaration relocation.
