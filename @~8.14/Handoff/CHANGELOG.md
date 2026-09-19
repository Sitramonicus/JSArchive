# O8.14 continuation changelog

## 2026-09-19 — CC-13 pairwise and CC-14 candidate compilation

- Built and verified 55 pairwise compatibility rows.
- Built three CC-09 + one-of-CC-06/07/08 runtime profiles; each preserved S1 at 26/9/102.
- Compiled approved FaC provenance through CC-13 without selecting a canonical runtime or starting CC-15.
- Kept CAR-M isolated from R2-10 and preserved frozen O8.13-r3 hashes.

## 2026-09-19 — CC-10, CC-11, and CC-12 candidates

- Added separate CAR-M laboratory, offline R9R0..R9R3 codec, and bounded delivery/loader candidate trees.
- Preserved the same-cover CAR-M capacity failure and measured an expanded-cover two-bit alternative.
- Kept CC-11 offline-only; CC-12 uses an injected caller-allowlisted sender with bounded parsing and idempotent cleanup.
- Simulated verification passed for all three; no O8.13-r3 bytes or live route was modified.
- Added security-hardening reports covering bounded malformed input, truncation, unsafe routes, sender exceptions, size limits, and closed-loader behavior.

## 2026-09-19 — CC-09 / R2-08 candidate

- Implemented the extended H shard and private host/store/transport/scheduler/cleanup/telemetry adapters.
- Preserved scenario counts and S1 desktop/stream completion; simulated CC-09 verification PASS.
- No new global, route, storage/cookie path, message channel, dynamic-code path, or second VM was added.
- Candidate-only; no O8.13-r3 bytes or live path was modified.

## 2026-09-19 — CC-06, CC-07, and CC-08 candidates

- Implemented separate CSS/HTML, XML/XSLT, and GLSL serialized-decoy candidate trees.
- Each uses a budget-neutral 731-byte substitution and passes parser/VM vectors plus S0, S1, S4a, S6, and S14 simulated regression.
- Normal paths do not invoke markup parsers, DOM/CSSOM, WebGL/shader execution, new routes, or a second VM.
- All remain candidate-only; no O8.13-r3 bytes or live path were modified.

## 2026-09-19 — O8.14-14r1 diagnostic runner staged

- Staged `Active/O8.14/14r1/O8.14-14r1-runner.js` embedding the CC-05 candidate.
- The synchronous runner passes the simulated S1 primary-preservation check.
- It remains diagnostic-only; no live test or promotion has occurred and O8.13-r3 remains frozen.

## 2026-09-19 — CC-04 and CC-05 candidates

- Implemented CC-04 VM-S and CC-05 bounded parser as separate candidate trees.
- Both preserve primary S1 behavior and pass VM/parser vectors plus S0, S1, S4a, S6, and S14 simulated regression.
- Both remain candidate-only; no O8.13-r3 bytes or live-host path were modified.

## 2026-09-19 — combined CC-02+03 candidate

- Implemented the operator-authorized combined candidate under `Active/O8.14/CC-02-03/`.
- Preserved the primary desktop/stream activity signal while adding a local single-flight adapter, removing the broad existing-game removal dispatch, and bounding diagnostic output.
- Simulated verification is PASS for S0, S1, S4a, S6, and S14; the candidate is not live-eligible and does not modify O8.13-r3.

## 2026-09-19 — O8.13-r3 live-test incident; real-host gate hold

- Recorded the live Discord failure and supplied console log in `Handoff/O8.13-R3-LIVE-INCIDENT-2026-09-19.md`.
- Follow-up source/log correlation identified unsafe live synthetic running-game/overlay integration, amplified by unbounded console persistence, as the best-supported root cause; Discord’s undefined-property errors are downstream application faults.
- Added **FaC-17 — primary-preserving live-host activity and diagnostic-pressure containment** to `Active/O8.14/O8.14-FAC-CC-PLAN.md` and assigned it to existing **CC-03**; the fix contains rather than removes the primary desktop/stream activity signal.
- Paused live testing and CC-02. No frozen O8.13-r3 bytes were changed.

## 2026-09-19 — CC-01/B0 baseline and release-history update

- Deleted the verified local `8.14-SF/` staging copy after confirming the authoritative GitHub copy at commit `30d36065089d7edfb3f68f2826c2cbcd5895b475`.
- Completed the measurement-only CC-01/B0 pack under `Active/O8.14/CC-01-B0/`; its baseline gate is PASS and O8.13-r3 remains byte-identical.
- Prepared `Handoff/ODYSSEY-VERSION-TIMELINE-READY.md` as a complete ready-pasteable copy of the supplied history through O.8.13-r3. CC-02 was not changed during this documentation pass.

## 2026-09-19 — O8.14-SF spring cleaning completed

- Created the intended staging/context directory `8.14-SF/`, for GitHub at `@~8.14/8.14-SF/`.
- Moved generated O8.13 OTO outputs and the old active `final-package/` into the hash-recorded `O8.13-generated-outputs-2026-09-19.tar.gz` archive.
- Retired superseded stego builders/loaders/tests into `legacy-stego-tools-2026-09-19.tar.gz`; the current stego-12/r2 builder, codec, loader, tier/matrix tests, and output baseline remain active.
- Archived the superseded O8.13-r2 candidate and old handoff/changelog/planning set. Moved human-readable O8.13 context notes into `8.14-SF/context/raw-docs/`.
- Collated the former Handoff chat sources and lowercase `uploads/` trace exports under `8.14-SF/CHAT-HISTORY/`, with provenance and extraction instructions.
- Retained `Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/` as the immutable O8.13-r3 baseline. Restored the non-release `Active/O8.13/live` pointer to the frozen Working-Stable mirror.
- Rewrote the cold-start handoff and directory maps. CC-01 / O8.14-B0 was not started; cleanup and handoff are now complete.

## 2026-09-18 — O8.13-r3 freeze and verification baseline

The frozen r3 identity, release checks, security boundary, and historical 14/16 correction are preserved in `Handoff/HANDOFF.md`, `Handoff/R3-SECURITY-AUDIT-2026-09-18.md`, and the frozen release manifests. The full historical changelog is retained in `8.14-SF/archives/handoff-history-through-2026-09-19.tar.gz`.

## Reading rule

This file is the current concise changelog. Older entries are intentionally compressed with the handoff history so a future agent can recover them without treating every old generated artifact as an active build input.
