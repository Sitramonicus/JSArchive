# Context classification — O8.14 spring cleaning

## Retain in the active workspace

- Current O8.14 plan and all files in `Active/O8.14/`.
- O8.13 source shards, OTO scripts, dictionaries, rotation data, noise sidecar, and verification/source tools that can advance a measured regression or O8.14 study.
- Current stego-12/r2 source, current tier/matrix tests, current source fragments, and the retained `output-stego12/` baseline.
- Current engine manifests.
- The two current Uploads inputs.
- Frozen O8.13-r3 release/archive mirrors and verification evidence.

## Retire into compressed context

- Generated OTO lane output, generated selected shards, and the old O8.13 `final-package/`: reproducible but easy to mistake for current output.
- Pre-stego-12 builders, loaders, tests, and debugging tools: no longer the active carrier path.
- O8.13-r2 candidate package: useful for historical comparison, not a release candidate for O8.14.
- Full old Handoff/changelog/planning set: useful audit trail, but too large and path-stale for the current handoff.
- Old Uploads covers/reports/reference sample/trace: provenance matters, but none advances O8.14 directly.

## Move directly as readable context

- O8.13 avenue notes, implementation log, old handoffs, r3 plan/roadmap, CAR-M/R2-08 historical note, and dictionary backup under `context/raw-docs/`.
- Chat-history sources under `CHAT-HISTORY/`, preserving source filenames and a collation README.

## Explicit non-actions

- No deletion of context-only material; archive creation preceded removal from the active paths.
- No modification of O8.13-r3 source/bundle/runner/cover bytes or release manifests.
- No CC-01, FaC, VM-S, parser, carrier, host-call, or runtime change started.
