# O8.15 unfinished work — completion checklist

This is a task list, not a completion claim. A segment is complete only when every task is closed, integrated,
and its acceptance evidence is green.

## Segment 1 — Inside the payload: finish the weave

1. **Resolve the bucket-12/13 control-flow wall.** Start from master statement 3632 and the remaining fixed
   material: bucket 12 = 95,837 B, bucket 13 = 61,746 B, worst-window fixed = 175,892/222,261 B.
2. **Fix the 169,612 B return-bearing shell conflict.** Determine why two AST paths claim the same return edit;
   prove whether it is one shell represented twice or two overlapping shells. Implement a source-range/node-identity
   fix that preserves exactly one rewrite and exactly one body expansion.
3. **Implement admissible control-flow run splitting.** Split only runs with no escaping return/break/continue,
   label crossing, this/arguments/super/new.target capture, or binding escape. Preserve source bytes through the
   conservation map; no `--force` output is a candidate.
4. **Re-run the full lever matrix on chain A.** Keep `EXTRACT_ONLY`; flags-OFF must equal the pinned landed bytes.
5. **Run all five semantic constraints plus conservation and parse checks.** Record holes, duplicated bytes,
   helper count, moved bytes, and refusal reasons.
6. **Acceptance:** `windows_above_target = 0` and no unresolved admissible mechanism. If unreachable, produce a
   proof with the remaining fixed mass, scope constraints, and every tested safe transform—not merely a saturated
   `0.434` reading.
7. **Build integration:** select the accepted configuration, rebuild the 8.15 carrier, run decoy parity and the
   complete regression battery, and preserve the final hashes.

## Segment 2 — Bundle as pieces: finish split cost

1. **Integrate the accepted S1 output into the piece pipeline.** Do not assess Segment 2 only on scratch weave output.
2. **Shard Rebalance:** land the source-level e-shard/control-flow split required for buckets 12–15, or prove the
   source boundary cannot be changed without breaking the single-token guard path.
3. **Scorecard:** rerun on the integrated candidate and record interleaving, gift coverage, largest piece, and
   seam discrimination.
4. **Texture Audit:** resolve the seven outlier pieces or document a measured placement strategy that makes source
   and payload distributions comparable. The current red verdict is not completion.
5. **Mirror Widening:** rerun the 300-entry / four-piece coverage check against the integrated bundle, including
   the `{h}` / `{p}%` resolution count and distinct phrase count.
6. **Piece-integrity gates:** verify no missing/duplicated shard, exact piece hashes, carrier parity, decoder failure
   remains unchanged, and the e1 guard/token path exists exactly once.
7. **Acceptance:** integrated bundle passes the scorecard/texture/mirror/rebalance evidence and the unchanged
   battery; all intentional residuals are recorded as closed or explicitly proven unreachable.

## Segment 3 — Page/paste/proof: finish claim-surface repair

1. **Verb Receipts:** integrate level-1 accepted-slot receipts into the actual 8.15 claim path; slot names only,
   no passphrases; prove decoy-parity byte identity and one receipt per accepted slot.
2. **Why-Nothing-Printed:** every view call prints either the queue or exactly one reason; no blank `true`.
3. **Ledger fallback:** read the ledger directly when the e4 roster hook is absent; preserve the normal hook path.
4. **Early-stop notice/re-arm:** add the queue-channel notice and bounded re-arm only when no controller/session
   exists; prove no duplicate worker and no re-arm after release.
5. **Second-paste guard:** validate live-session takeover/stand-down semantics, including paste → finish → repaste.
6. **Residual audit:** report pre-existing token, pins, lex mode, and level without writing persistent state.
7. **Runner fidelity:** rerun selftest and 17/17 fidelity after every harness/source change.
8. **Live protocol:** two passes on one page, quest preloaded plus one mid-queue, stop at second completion; capture
   boot verdict, walk, hooks, receipts, ledger movement, close path, and any failure reason.
9. **Acceptance:** all six repairs integrated into the same candidate, offline gates green, live two-pass evidence
   complete, no silent claim path, no duplicate worker, and no unresolved residues.

## Final 8.15 release gate

1. Freeze the accepted Segment 1–3 source/configuration.
2. Rebuild chain A with `EXTRACT_ONLY` and record all SHA-256 values.
3. Run the full offline battery and decoder-failure/no-regression checks.
4. Run carrier and piece-integrity checks.
5. Run the v4 live protocol and attach the final capture.
6. Trim derived artifacts before snapshot; retain only canonical inputs, final outputs, reports, and recovery archives.
7. Only then call 8.15 finished and request approval to remove the local `8.15-SF` context folder.
