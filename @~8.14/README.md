# JSArchive — O8.14 workspace

## Current state

**Active implementation line:** O8.14  
**Current plan:** `Active/O8.14/O8.14-FAC-CC-PLAN.md`  
**Cleanup staging:** `@~8.14/8.14-SF/` (intended GitHub path `@~8.14/8.14-SF/`)  
**CC-01 / O8.14-B0:** implemented and measured; candidate-only; baseline gate PASS.

O8.13-r3 is the immutable regression baseline. It is not the active implementation line and must not be overwritten.

## Start here

1. `Handoff/AGENT-OPERATING-RULES.md`
2. `Handoff/HANDOFF.md`
3. `Handoff/HANDOFF-NEXT.md`
4. `Handoff/O8.14-SF-REMOTE.md` (remote README and CONTEXT-MAP)
5. `Active/O8.14/O8.14-FAC-CC-PLAN.md`

## Directory map

| path | role |
|---|---|
| `Active/O8.14/` | current O8.14 plan and CC-01/B0 measurement surface |
| `Active/O8.13/` | retained O8.13 source shards, scripts, dictionaries, and verification tools; generated outputs are staged in `remote @~8.14/8.14-SF` |
| `Active/Stego/` | current stego-12/r2 builder, codec/loader, current tests, and output-stego12 baseline; legacy tools are archived |
| `Active/engines/` | tool manifests and build dependencies (snapshot-excluded `node_modules`) |
| `Working-Stable/O8.13/` | immutable frozen live mirror; self-identifying O8.13 runner is the only paste target |
| `Archives/packages/O8.13/` | immutable canonical archive mirror |
| `Archives/packages/O8.13-r3/` | immutable r3-named verification package |
| `Archives/` | frozen package index, retired-history record, and release archives |
| `Uploads/` | current 1024×768 cover and Unicode inventory only |
| `Handoff/` | current O8.14 handoff and security audit |
| `@~8.14/8.14-SF/` | historical/context staging, retired scripts, generated O8.13 outputs, and collated chat histories |

## Frozen baseline

```text
Working-Stable/O8.13/O8.13-runner-d4de42af.js
```

Run `node verify-golive.mjs` and `cd Working-Stable/O8.13 && sha256sum -c SHA256SUMS.txt` before using it as the regression reference. The expected baseline remains corrected 16/16, 25/25, 43 passed/0 failed, and release-manifest parity.

## Safety and provenance

The frozen payload is functional and has host-task/progress interfaces; it is not network-free or security-certified. Historical traces may contain password-like debug material. Do not copy values into new files; classify/rotate any real privileged credentials before a public push.

Do not extract old archives into the active tree without inspecting their manifests. The remote `@~8.14/8.14-SF/SPRING-CLEANING-MOVES.tsv` and `SPRING-CLEANING-ARCHIVES.tsv` are the cleanup proof; see `Handoff/O8.14-SF-REMOTE.md`.
