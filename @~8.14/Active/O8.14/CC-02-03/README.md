# CC-02+03 combined candidate

**Status:** candidate-only; simulated verification PASS; not live-eligible  
**Authorized:** operator requested CC-02 and CC-03 be implemented together because CC-02 is light  
**Frozen baseline:** O8.13-r3; read-only  
**FaCs:** FaC-01, FaC-05, FaC-06, FaC-07, FaC-16, FaC-17

This is one combined implementation tree for the low-risk pipeline/template revision and the
primary-preserving live-host/diagnostic containment change. It does not replace the individual CC
identities or merge their acceptance attribution: the report records each FaC gate separately.

## Candidate changes

- Neutralized selected runtime pipeline/status labels into phase-neutral diagnostics.
- Replaced direct unbounded diagnostic emission with a bounded event/byte sink and a single cap notice.
- Added a local single-flight primary activity adapter for the desktop activity signal.
- Stopped the activity-change event from claiming that existing real running games were removed.
- Kept the primary activity signal and its teardown path intact; S1 proves desktop/stream behavior in
  the simulated harness.
- Added no new globals, message channels, routes, storage access, or network behavior.

## Candidate artifacts

- `source/shards/` — candidate source copies; O8.13 source is never edited.
- `candidate/cc02-03-raw-bundle.js` — deterministic raw stitched candidate assembly, not a paste
  target and not a promoted release.
- `tools/build-cc02-03.mjs` — copies and applies the candidate transformations, then syntax-checks
  the assembly.
- `tools/run-cc02-03.mjs` — bounded no-network verification runner.
- `reports/build.json` — source/build provenance and frozen-reference check.
- `reports/cc02-03-candidate.json` and `.md` — machine and human verification reports.

## Reproduce

```bash
node Active/O8.14/CC-02-03/tools/build-cc02-03.mjs
node Active/O8.14/CC-02-03/tools/run-cc02-03.mjs
```

The verification runner exercises S0, S1, S4a, S6, and S14 through the in-process simulated client.
S1 is the primary-preservation check: it requires the activity dispatch and proves desktop/stream
completion. The harness makes zero network calls and does not exercise a real Discord renderer.

## Gate boundary

The combined candidate currently has a simulated **PASS**, but it is **not live-eligible**. A later
review still needs a real-host-safe diagnostic comparison, bounded renderer measurements, and explicit
CC-02/CC-03 approval before any live test. O8.13-r3 payload, runner, bundle, cover, carrier,
manifest, and verification bytes remain frozen.
