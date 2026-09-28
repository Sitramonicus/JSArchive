# O8.13-r3 feature manifest

This file describes the frozen r3 bytes, not the historical bench. Canonical live files:

- `Working-Stable/O8.13/O8.13-runner-d4de42af.js`
- `Working-Stable/O8.13/O8.13-bundle-604f4434.js`
- `Working-Stable/O8.13/O8.13-cover-3bbe7345.bmp`

## Landed and verified

| feature | r3 status | evidence |
|---|---|---|
| R2-06+ 32-way honey path | landed | source/build record; honey-path tier coverage |
| Cover slack | landed | 574 B header-derived slack; stego tiers 43/0 |
| Two-sided prefix handling | landed | loader skips the deterministic prefix before gunzip; stego tiers 43/0 |
| Five host pockets | landed | 25-pass battery and tier suite |
| Dictionary rebalance | landed | 340 / 6068 / 3920 entries; 9988 unique; overlap warning remains explicit |
| Frozen v2-m engine pin | landed | `7082ce98adcef5df5a1a7d107bf8360908ac187ecbfcce059f3d159a62bed70f` |
| Correct release naming | landed | self-identifying O8.13 names; old names are symlinks only |
| Live/archive parity | landed | 14-entry manifest; `verify-golive.mjs` exit 0 |

## Verification snapshot

- 16-point: **16/16**
- 25-pass: **25/25**
- stego tiers: **43 passed, 0 failed**
- safe S0 smoke: **ALL PASS**, 7 simulated HTTP calls, 0 dispatches
- stock G7 red-team: **not rerun** in this workspace because `@babel/parser` is unavailable
- operator live test: recorded as passed by the operator; not independently replayed here

## Not in r3

| item | status | note |
|---|---|---|
| CAR-M 4-bit → 2-bit | not landed | same-cover arithmetic fails: 3,483,480 symbols required vs 2,260,322 capacity |
| R2-08 extended modularization | not landed | source `shard-e.js` remains the large outlier; separate r4 plan exists |
| G5/G6 held CC | separate hold | not merged into r3 or the CAR-M/R2-08 plan |
| cross-pocket decoys / W-full | not landed | deferred |
| true 4-way / DIC-E/F/G / wasm | not landed | deferred or CSP-blocked |

## Security caveat

This is not a security certification. The current payload contains dynamic code execution and
host-task HTTP interfaces. The restricted fallback harness is not evidence of zero network or zero
privileged behavior. See `Handoff/R3-SECURITY-AUDIT-2026-09-18.md` before using or distributing it.

Prior logs document password-like debug material in history/snapshots/chat. Classify it before
distribution: actual privileged credentials require appropriate rotation and history handling;
disposable test commands do not. Never write replacement values to files.

## R4 planning

See `Active/O8.13/CAR-M-R2-08-R4-PLAN.md`. It is a planning artifact only. Do not modify
`Working-Stable/` without an explicit new go-live decision.
