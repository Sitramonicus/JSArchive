# CC-01 / O8.14-B0 — baseline instrumentation

**Status:** implemented and measured, 2026-09-19 (Asia/Shanghai)  
**Behavioral intent:** no behavior change  
**Frozen baseline:** O8.13-r3 in `Working-Stable/O8.13/`  
**Spring-cleaning record:** remote pointer `Handoff/O8.14-SF-REMOTE.md`

CC-01 is the first O8.14 compiled change set. It adds measurement-only tooling around the existing decode/evaluator boundary and the simulated host boundary; it does not patch O8.13 source, the frozen runner, the frozen bundle, the carrier, or any live directory.

## Included measurements

- **FaC-02:** evaluator-boundary events, decoded/evaluated code length and hash, open/close timing, and explicit release of captured decoded text.
- **FaC-03:** static host boundary census plus S0/S13a/S14 simulated host-call summaries from the existing stress harness. URLs and body shapes are classified without retaining credential values.
- **FaC-04:** deterministic branch matrix over the no-browser, ordinary simulated host, dead-store, and static-board scenarios.
- **FaC-16:** baseline provenance, source hashes, report hashes, and explicit candidate/live status.

## Files

- `CC-01-B0.json` — status and acceptance metadata.
- `tools/cc01-observer.mjs` — reusable evaluator, host, branch, and memory observers.
- `tools/run-cc01-b0.mjs` — one bounded runner for the baseline report.
- `reports/cc01-b0-baseline.json` — generated machine-readable measurements.
- `reports/cc01-b0-baseline.md` — generated human-readable summary.

The runner reads frozen O8.13 files read-only. It uses the existing `Active/O8.13/tools/chore-stress.mjs` only with simulated host adapters and a `CS_BUNDLE` override; it does not contact a network or use credentials.

## Re-run

```bash
node Active/O8.14/CC-01-B0/tools/run-cc01-b0.mjs
```

The command is bounded and writes only inside `Active/O8.14/CC-01-B0/reports/`. A nonzero result means the baseline could not be measured or the frozen provenance changed; it is not permission to modify the frozen line.

## Acceptance boundary

CC-01 is not a promotion or go-live. It must preserve the O8.13 release checks, keep host calls simulated/allowlisted, report cleanup and listener/timer observations, and leave the O8.13-r3 mirrors byte-identical. Later CCs may use this report as the measured “before” state.
