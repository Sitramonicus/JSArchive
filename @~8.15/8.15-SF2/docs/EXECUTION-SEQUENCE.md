# O8.15 execution sequence — unblocking the release

## Sequencing correction

The previous plan incorrectly treated unresolved S1-B/C as a hard blocker for all S2 and S3 work. That created a serial trap:

```text
S1-B/C → S1-D → S2 → S3
```

The correct sequence is a provisional-baseline pipeline with parallel work:

```text
                 ┌─ S1-B/C/D hardening ─┐
S1-A baseline ───┼─ S2 integration ──────┼─ final merge/release gates
                 └─ S3 claim repairs ───┘
```

S2 and S3 must still be validated against the final frozen S1 candidate before release, but they do not need to wait idle for S1-B/C exploration.

---

## Track 0 — Freeze the working baseline immediately

Use the canonical S1-A-fixed input/output and record it as a **provisional integration baseline**, not as a final S1 acceptance.

- [ ] Copy the exact canonical S1-A-fixed candidate into a named baseline directory.
- [ ] Record source/configuration/hashes.
- [ ] Run the baseline parse, conservation, identity, order, relocation, and 5/5 constraints.
- [ ] Label it `S1-A-fixed-provisional`, never `accepted-S1`.

**Deliverable:** a stable input for S2 and S3 work that cannot change underneath them.

---

## Track 1 — S1-B/C/D hardening (continue independently)

This is the difficult transformation track, but it is no longer allowed to block all other work.

1. Census fixed items in the worst windows.
2. Implement one byte-preserving body/declaration transform.
3. Measure fixed mass and ruler delta.
4. Keep only candidates that pass conservation and semantics.
5. If the transform fails, classify the failure and move to the next transform.
6. Once a candidate reaches target or has a complete unreachable certificate, run S1-D carrier integration.

**Stop condition:** no indefinite exploration. Each transform gets one implementation, one full gate run, and one keep/reject decision.

---

## Track 2 — S2 piece/texture work on the provisional baseline

Start immediately from `S1-A-fixed-provisional`.

1. Integrate the provisional baseline into the piece pipeline.
2. Run source-level e-shard/control-flow rebalance.
3. Run Scorecard.
4. Resolve the seven Texture Audit outliers.
5. Run Mirror Widening.
6. Verify shard hashes, count, missing/duplicate shards, decoder-failure continuity, and one e1 guard/token path.
7. Save the result as `S2-provisional`.

When S1 later changes, rerun only the impact surface first; do not throw away the S2 work.

**Deliverable:** a complete provisional S2 bundle and an impact list showing which S1 changes would require regeneration.

---

## Track 3 — S3 claim-surface work on the provisional bundle

Start immediately using the current runner/source and the provisional S2 bundle where required.

1. Integrate Verb Receipts into the actual claim path.
2. Remove blank `true` view outcomes.
3. Add e4 roster ledger fallback.
4. Implement bounded early-stop notice/re-arm.
5. Validate paste → finish → repaste.
6. Add residual token/pins/lex-mode/level audit without persistent writes.
7. Rerun self-test and 17/17 fidelity.
8. Run the two-pass live protocol through second completion.
9. Prove no silent claim path and no duplicate worker.
10. Save the result as `S3-provisional`.

**Deliverable:** completed claim-surface repairs and a live evidence bundle independent of the unresolved S1 distribution optimization.

---

## Merge gate — only after all three tracks have deliverables

1. Select the best S1 result: improved candidate if it passes all gates, otherwise the S1-A baseline plus a complete unreachable certificate.
2. Rebase/rebuild S2 against that frozen S1 result.
3. Rebase/rebuild S3 against the final S2 bundle.
4. Run the complete final battery.
5. Freeze hashes and trim artifacts.

No provisional artifact is called final. But no provisional artifact is discarded merely because S1-B/C is still being optimized.

---

## Required per-turn progress record

Every implementation turn must update one of:

- a source/configuration file,
- a provisional artifact,
- a measurement with a keep/reject decision,
- a failure classification that changes sequencing,
- or a final evidence bundle.

A status-only report does not count as progress.
