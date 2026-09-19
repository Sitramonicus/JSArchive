# JSArchive — O8.14 current handoff

**Status:** O8.14-SF cleanup and handoff update complete; CC-01 / O8.14-B0 measured; CC-02+03 and CC-04 through CC-12 candidates simulated PASS; 14r1 diagnostic runner staged; candidate-only  
**Date:** 2026-09-19 (Asia/Shanghai)  
**Start here:** `Handoff/AGENT-OPERATING-RULES.md`, this file, `Handoff/HANDOFF-NEXT.md`, `Handoff/O8.14-SF-REMOTE.md`, then `Active/O8.14/O8.14-FAC-CC-PLAN.md`.

## One-minute state

O8.13-r3 is frozen and must remain recoverable. O8.14 is the active implementation line. The spring-cleaning destination is `@~8.14/8.14-SF/`, intended for GitHub at `@~8.14/8.14-SF/`. The cleanup moved generated outputs, retired tools, superseded candidate material, old handoff prose, old Uploads, and all discovered chat/trace sources out of the active paths. The cleanup did not modify O8.13-r3; CC-01 output now lives under Active/O8.14/CC-01-B0, and the combined CC-02+03 candidate is isolated under Active/O8.14/CC-02-03.

The cleanup gate was satisfied before CC-01. The current measurement pack is Active/O8.14/CC-01-B0; read its README and report before proceeding.

## Execution rule

Avoid multiple bash calls unless necessary; consolidate related work into one controlled command. Keep one-shot work under the **5–7 minute ceiling**. Use a managed process for longer work, stop it at the ceiling if it stalls, and record partial/unknown results. Full rules: `Handoff/AGENT-OPERATING-RULES.md`.

## Immutable O8.13-r3 baseline

Do not overwrite, rename, or rebuild in place:

| artifact | path | size | SHA-256 |
|---|---|---:|---|
| paste runner | `Working-Stable/O8.13/O8.13-runner-d4de42af.js` | 3,372,856 B | `d4de42af1a0f1ebe9a799eecc7ebe11847018103673975cd34a3996d83f4f26f` |
| bundle | `Working-Stable/O8.13/O8.13-bundle-604f4434.js` | 2,321,708 B | `604f4434955be18b49a746dcd9009537f00908189beb67a63653365b4a5086b2` |
| cover | `Working-Stable/O8.13/O8.13-cover-3bbe7345.bmp` | 2,359,350 B | `3bbe73455937cdda43aed851734239646c55fde3010c072cd2febe230e96ffe9` |

The matching archive mirror is `Archives/packages/O8.13/`; the r3-named verification package is `Archives/packages/O8.13-r3/`. Their manifests and verification evidence were not changed. `Active/O8.13/live` is only a pointer to `../../Working-Stable/O8.13`; it is not a release copy.

Verify the preserved baseline with:

```bash
node verify-golive.mjs
cd Working-Stable/O8.13 && sha256sum -c SHA256SUMS.txt
```

Expected release results remain: `verify-golive.mjs` exit 0, corrected 16/16, 25/25, stego 43 passed/0 failed, and release manifest parity. The historical 14/16 result is not a current security result.

## CC-01 / O8.14-B0 measured result

CC-01/B0 is complete as a measurement-only, candidate-only pack. It did not patch the O8.13-r3 runner, bundle, cover, carrier, manifest, or verification line.

- **Gate:** `PASS` in `Active/O8.14/CC-01-B0/reports/cc01-b0-baseline.json`.
- **Reports:** machine JSON `Active/O8.14/CC-01-B0/reports/cc01-b0-baseline.json` SHA-256 `3f7b89ef7d5a83f123e346ab5b90019b1adf73c9103df93b65de6b8dd1c7c3f3`; human summary `cc01-b0-baseline.md` SHA-256 `e53e5d1dbe1cc0d0068fa7b9521c2367fcd26b3eecc80684237afb47613bd40f`; sidecars are adjacent `.sha256` files.
- **Provenance:** authoritative spring-cleaning copy is `https://github.com/Sitramonicus/JSArchive/tree/main/%40~8.14/8.14-SF` at commit `30d36065089d7edfb3f68f2826c2cbcd5895b475`; local `8.14-SF/` is absent.
- **Baseline hashes:** runner `d4de42af1a0f1ebe9a799eecc7ebe11847018103673975cd34a3996d83f4f26f`; bundle `604f4434955be18b49a746dcd9009537f00908189beb67a63653365b4a5086b2`; cover `3bbe73455937cdda43aed851734239646c55fde3010c072cd2febe230e96ffe9`; rotation `5bc7746cd765be520a3810ad4e4e301e6af6530314a4cdd131dd6fc1da63745e`; `SHA256SUMS.txt` `07056005ac820ac9cbda3f896b3a104280c71d6fae91b39e4eb7e1dfeb10bef6`.
- **FaC-02:** 3 evaluator-boundary observations total; T1 decoy 1 call and T2 real-host 2 calls; all decoded buffers explicitly released; no probe throw. Observed decoded lengths were 3,066 B and 2,407 B.
- **FaC-03:** static census found 3 `GooglePostSafe` sites, 1 `GoogleGetSafe` site, 4 route roles (`applicationsUrl`, `heartbeat`, `tasks`, `videoProgress`), and no `fetch`/`XMLHttpRequest`. Deterministic simulated S0, S13a, and S14 all passed.
- **FaC-04:** 5 branch rows recorded; S0/S13a/S14 passed. Static lifecycle census: `setTimeout=6`, `clearTimeout=5`, `setInterval=3`, `clearInterval=7`, `addEventListener=3`, `removeEventListener=6`, `AbortController=1`, cleanup-like terms `21`.
- **FaC-16:** frozen inputs were byte-identical before/after; network calls `0`; credential values retained `false`; promotion target `null`. Process memory snapshots are in the machine report (`rss 48,259,072 -> 90,447,872`; `heapUsed 4,982,040 -> 30,988,144`).

The CC-01 runner is `Active/O8.14/CC-01-B0/tools/run-cc01-b0.mjs`; rerunning it is bounded and writes only its own report surface. The result is a baseline for later CCs, not a security certification or go-live decision.

The ready-pasteable public-history document is `Handoff/ODYSSEY-VERSION-TIMELINE-READY.md`. It reproduces the supplied A–O.8.5-S3 document in full and integrates the O.8.6–O.8.13-r3 history while intentionally avoiding implementation specifications. The earlier documentation-only pass made no CC-02 change; the current combined CC-02+03 candidate is recorded below.

## O8.13-r3 live-test incident — real-host gate hold

A live O8.13-r3 test produced a generic Discord crash screen. The supplied log is recorded at `Handoff/O8.13-R3-LIVE-INCIDENT-2026-09-19.md` and <https://ctxt.io/3/pqCPI3AQg.md>.

- **Classification:** renderer/application failure state; a native process crash is not proven by the console log alone.
- **Primary evidence:** uncaught Discord-side exceptions involving an undefined `GAME_SERVER_SUBSCRIPTION_CHECKOUT` value and a later undefined `$` value during navigation.
- **High-confidence contributors:** persisted console-history quota exhaustion and substantial main-thread stalls; the log also shows Discord’s RunningGameStore/OverlayBridge reacting to synthetic activity records and repeatedly failing performance snapshots.
- **Containment:** live testing is paused; use a clean reload/quit and reopen without the script. Preserve any renderer/native crash artifact and app/browser version.
- **Cause determination:** the strongest supported root cause is unsafe live synthetic running-game/overlay integration, amplified by unbounded console persistence; Discord’s undefined-property exceptions are downstream application faults, not proof of a native crash.
- **Resolution:** new **FaC-17 — primary-preserving live-host activity and diagnostic-pressure containment**, assigned to existing **CC-03** in `Active/O8.14/O8.14-FAC-CC-PLAN.md`. It preserves the required desktop/stream activity signal behind a narrowly scoped adapter, bounds diagnostics, and verifies teardown; it does not remove the primary path.
- **Gate:** do not run the combined candidate against a real account or promote it until the FaC-17 diagnostic gate compares clean-control, activity-off, minimally scoped adapter, and current-adapter runs with capped logs and host event/heap/cleanup measurements.

The incident does not change the frozen release hashes and is not permission to patch the frozen line.

## Combined CC-02+03 candidate

At operator request, the light CC-02 pipeline/template revision and CC-03 surface/containment work were implemented together under `Active/O8.14/CC-02-03/`.

- **Candidate:** `candidate/cc02-03-raw-bundle.js`; raw stitched candidate only, not a paste target.
- **FaCs:** FaC-01, FaC-05, FaC-06, FaC-07, FaC-16, FaC-17.
- **Verification:** simulated gate `PASS` in `reports/cc02-03-candidate.json`; S0, S1, S4a, S6, and S14 all pass.
- **Primary preserved:** S1 retains the activity dispatch and proves desktop/stream completion.
- **Containment:** diagnostics are bounded; the primary activity signal uses a local single-flight adapter; the prior broad removal dispatch is gone.
- **Boundary:** no network calls, no new routes/message channels/globals, no promotion, and no real-host live test yet. The full OTO/obfuscation compilation and renderer-safe comparison remain review gates.

This combined candidate does not modify O8.13-r3 or replace the separate CC-02/CC-03 acceptance identities.

## CC-04 and CC-05 candidates

The next CCs were implemented separately, as required by the plan:

- **CC-04 / VM-S:** `Active/O8.14/CC-04-VM-S/`; bounded VM vectors and S0/S1/S4a/S6/S14 simulated regression PASS.
- **CC-05 / parser:** `Active/O8.14/CC-05-Parser/`; bounded parser/VM vectors and the same simulated regression PASS.

Both candidates preserve S1 desktop/stream completion, make zero network calls, and leave O8.13-r3
frozen. Neither is live-eligible. Full OTO/obfuscation packaging and real-host renderer/memory
comparison remain mandatory before any later CC or live test.

## O8.14-14r1 diagnostic runner

The requested runner is staged at `Active/O8.14/14r1/O8.14-14r1-runner.js`. It embeds the CC-05
candidate synchronously and passed the simulated S1 runner check. The non-working Alt+Shift+R path
was removed; the completion instruction is now `F5 whilst in console`, while Alt+Shift+X remains the
abort path. `Active/O8.14/14r1/README.md` contains the bounded-test preflight and teardown checklist.
This is a diagnostic candidate, not a release or promotion artifact; the real-host gate remains HOLD
until the test is actually completed and reviewed.

## CC-06 through CC-08 candidates

The three serialized non-JavaScript layers are separate candidate trees and each passed the simulated
VM/parser vectors plus S0, S1, S4a, S6, and S14 regression:

- `Active/O8.14/CC-06-CSS-HTML/`
- `Active/O8.14/CC-07-XML-XSLT/`
- `Active/O8.14/CC-08-GLSL/`

Each uses an exactly 731-byte replacement in the existing `shard-n2.js` budget slot. None invokes a
markup parser, DOM/CSSOM API, WebGL/shader path, evaluator, new host route, or second VM on the
normal path. All remain candidate-only pending OTO, renderer, heap, cleanup, and real-host gates.

## CC-09 / R2-08 candidate

`Active/O8.14/CC-09-R2-08/` contains the separate extended-H modularization candidate. Its private
`shard-h.js` owns host, store, transport, scheduler, cleanup, and bounded telemetry adapters under
`_0xmod.r2`; `shard-e.js` routes the corresponding engine operations through them. CC-09 preserves
S1 and the S0/S4a/S6/S14 scenario counts and passes module vectors. It adds no global, route,
storage/cookie path, message channel, dynamic-code path, or second VM. It remains candidate-only.

## CC-10 / CC-11 / CC-12 candidates

The carrier revisions remain separate and candidate-only:

- `Active/O8.14/CC-10-CAR-M/` is the non-executable CAR-M laboratory. It records the pinned
  same-cover two-bit capacity failure, four-bit and expanded-cover two-bit measurements, PSNR,
  channel delta, corruption rejection, repeated extraction, and memory samples.
- `Active/O8.14/CC-11-R2-10A/` is the offline R9R0..R9R3 four-way codec experiment. It has four
  independent lane tags, bounded lengths, per-lane CRCs, deterministic extraction, and no delivery
  surface.
- `Active/O8.14/CC-12-R2-10B/` copies that codec into a bounded loader integration. Delivery is an
  injected sender behind a caller-supplied allowlist; malformed/corrupt records are rejected and
  cleanup is idempotent. Its S1 desktop/stream regression remains PASS. Each tree now also carries a
separate `reports/security-hardening.json` with bounded malformed-input, size, route, sender-error,
and teardown negatives.

None adds a new host route, unallowlisted transmission, global, dynamic-code path, or second VM.
The proper sharding-to-stego/packaging/password-test 14r1 runner remains unfinished, and no explicit
GO LIVE authorization has occurred.

## CC-13 / CC-14 candidates

`Active/O8.14/CC-13-Pairwise/` passes its 55-row compatibility matrix and provides three runtime
profiles: CC-09 extended H paired with one of the mutually exclusive CC-06/07/08 serialized layers.
`Active/O8.14/CC-14-Candidate-Compilation/` is a provenance-first multi-profile compilation of the
approved FaCs through CC-13. It has no canonical runtime selection, keeps CAR-M and R2-10 separate,
and remains candidate-only. CC-15 has not started.

## Active workspace after cleanup

- `Active/O8.14/O8.14-FAC-CC-PLAN.md` — only current O8.14 plan.
- `Active/O8.13/shards/` — source shards retained for regression/context.
- `Active/O8.13/oto/scripts/` — source/build/verification scripts retained; generated lane output and old `final-package/` are in `@~8.14/8.14-SF/archives/O8.13-generated-outputs-2026-09-19.tar.gz`.
- `Active/O8.13/oto/` — dictionaries, rotation, and noise sidecar retained.
- `Active/O8.13/tools/` — source/test utilities retained.
- `Active/Stego/` — current stego-12/r2 source, current tier/matrix tests, and `output-stego12/`; legacy tools are archived.
- `Active/engines/` — current manifests; dependency directories are snapshot-excluded.
- `Uploads/` — current 1024×768 cover and `unicode_list.csv` only, with an updated README.

## Cleanup classification and recovery

The authoritative cleanup files are:

- `@~8.14/8.14-SF/SPRING-CLEANING-MOVES.tsv` — source/destination move log;
- `@~8.14/8.14-SF/SPRING-CLEANING-ARCHIVES.tsv` — archive hashes and member counts;
- `@~8.14/8.14-SF/archives/*.manifest.txt` and `*.sha256` — archive contents and verification;
- `@~8.14/8.14-SF/CONTEXT-MAP.md` — why `@~8.10`, `@~8.12`, and `@~8.13` layouts were references rather than copy sources;
- `@~8.14/8.14-SF/CHAT-HISTORY/README.md` — how separate traces were collated without flattening provenance.

Archives and their purpose:

| archive | purpose |
|---|---|
| `O8.13-generated-outputs-2026-09-19.tar.gz` | generated OTO outputs, selected shards, and old `Active/O8.13/final-package/` |
| `legacy-stego-tools-2026-09-19.tar.gz` | retired pre-stego-12 builders/loaders/tests/tools |
| `O8.13-r2-candidate-2026-09-19.tar.gz` | superseded candidate package; r3 remains the frozen baseline |
| `handoff-history-through-2026-09-19.tar.gz` | full old changelog and superseded handoff/planning prose |
| `uploads-context-2026-09-19.tar.gz` | old covers, reports, reference sample, and trace |

Extract into scratch before rehydrating. The archive members preserve their old root-relative paths; do not untar over the active tree merely to inspect them.

## O8.14 plan corrections that must persist

The current plan defines **FaC = Feature and Change** and **CC = Compiled Change**. CC-01 / O8.14-B0 is baseline instrumentation with no intended behavior change. It includes FaC-02, FaC-03, FaC-04, and FaC-16.

There is only one planned custom VM: **VM-S**. FaC-10 is a bounded finite parser/codec, not a second VM. CSS/HTML, XML/XSLT, and GLSL are serialized layers first; normal-path versions must not create DOM/CSSOM/GPU work. CAR-M, R2-08, and R2-10 stay separately measurable. **FaC-17** is the incident-driven live-host/diagnostic containment change and is assigned to existing CC-03.

The full corrected sequence and gates are `Active/O8.14/O8.14-FAC-CC-PLAN.md`. Do not use the superseded O8.13-r4 roadmap as the active sequence.

## Security boundary

The frozen payload is not a security certification. Earlier audit evidence records dynamic execution, host task/progress interfaces, and environment-sensitive decoy behavior. Do not describe the line as network-free: the instrumented safe S0 path records simulated host HTTP/progress calls. Obfuscation and carrier transforms are not encryption or authentication.

Historical traces and old handoff snapshots may contain password-like debug material. Do not copy values into new files. Classify and rotate any real privileged credentials before publishing `remote @~8.14/8.14-SF`; disposable test commands must not be mistaken for production secrets. The stock G7 red-team script still has no current result because `@babel/parser` is unavailable.

## Stop conditions

Stop and ask for review if a change would touch frozen O8.13-r3 bytes, add an unallowlisted host route or storage/cookie capability, falsify telemetry, turn a historical result into a fresh security claim, require credentials in files, or start a carrier/VM/parser experiment without bounded memory and abort/cleanup measurements.
