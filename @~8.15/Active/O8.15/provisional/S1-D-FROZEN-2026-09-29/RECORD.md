# S1-D FROZEN (2026-09-29) — sound-tool candidate, full battery green

**Candidate** `weave-out-S1-D.js` = `0d0874777fe7ff6060e884d34f6179a045be5347033114b9718d3e722cd56aa1`
(= grid winner g4-declAllExp; the chain build reproduced it byte-identically, `cmp` clean — reproducibility
proven). Map `49d9a8f3…`. Weave-in `bf5f2116…` (unchanged). Tool `abda3c8f…`
(`tools/weave-payload.mjs`, eleven soundness fixes, 2026-09-28/29 — see
`reports/S1-D-DEAL-SOUNDNESS-2026-09-28.md`).

## Configuration (accepted S1 weave stack)

```
EXTRACT_ONLY=<14-name string, DEEP-WEAVE-REPORT line 173>  DEEPWEAVE=1  SPLIT_EXTRA=1
SPLIT_OBJECTS=1  SPLIT_ARRAYS_I=1  WEAVE_SEED=2648369387
WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1
WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1
WEAVE_DECL_RELOC_ALL=1 WEAVE_RUN_EXPORT=1
node tools/weave-payload.mjs --apply <weave-in-chainA.js> <out> --seed=2648369387
```

## Battery (all on this candidate / its carrier build — `build-g4.log`)

| gate | result |
|---|---|
| weave self-checks (parse, content conservation, statement identity, order, relocation) | 5/5 PASS |
| constraint-pass C1–C5 | PASS 5/5 |
| staged payload == shipped payload | byte-identical |
| matrix | 26 passed / 0 failed |
| tiers | 42 passed / 0 failed (1 skipped) |
| hold-check | PASS |
| carrier-flip-check (decoder-failure continuity) | 14 passed / 0 failed |
| detector-replay | PASS |
| netwatch-probe | no URLs attempted |
| dangling-refs | 64 total / **0 on error path** |
| **decoy-parity (functional gate)** | **PASS — fallback garden and decoy print identical output** |
| boot-smoke (VM load + 121 s virtual run) | BOOT OK, 22/22 log lines byte-identical to weave-in |
| reproducibility | chain weave == grid winner byte-identical (`cmp` clean) |
| carrier cover | `O8.12-cover.bmp` 2,359,350 B sha `fd2aed67…` |
| runner | `O8.12-runner.js` 3,278,609 chars sha `014cbe3a…` |
| staged payload | 2,226,894 chars sha `77576fb1…` |

## Honest metric note (1C)

The accepted placement metric on this sound tool: **54/73 windows above target · worst 0.4325 ·
excess 5.153** (grid v2, `reports/S1-C-SEARCH-LEDGER-2026-09-28.v2.jsonl`). The 0.25 target is
unreachable within S1's bounded set on a sound deal — `reports/S1-C-UNREACHABLE-CERTIFICATE-2026-09-29.v2.md`;
breaking the floor is Segment 2 source work. Superseded pre-fix candidates live in
`../S1-D-FROZEN-2026-09-28/` with their SUPERSEDED note.

Big binaries (payload/cover/runner) are regenerable: command above + `tools/cc34-build.sh carrier swift`
+ the recorded hashes; kept out of the workspace per the budget rule.
