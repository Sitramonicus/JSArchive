# S1-C search ledger (2026-09-28) — bounded parameter set exhausted

Machine-readable: `S1-C-SEARCH-LEDGER-2026-09-28.jsonl` (one JSON row per run: config env, seed,
SHA-256 of output + map, ruler JSON). All runs: input `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js`
(2,219,300 B, pin `bf5f2116…`), tool `tools/weave-payload.mjs` (2026-09-28, AFTER the dissolve
param-binding fix — see the correction note), 5/5 weave self-checks PASS on every row.

**Correction note (2026-09-28).** The first grid (kept as `S1-C-SEARCH-LEDGER-2026-09-28.pre-fix.jsonl`)
was measured on the pre-fix tool, whose shell dissolution dropped parameter bindings for non-scoped
inlined shells (`tools/dangling-refs.mjs`: weave-in 61/0 → weave-out 92/1 — one name dangling in catch
paths = ReferenceError on any unrelated throw). The fix (always re-bind the spilled parameter names) re-pins
every hash: the old canonical `37d824d3…` is superseded by `cda878ad…` (g1). Rankings and window counts
moved by ≤ 1; the selected candidate is unchanged.

## The bounded parameter set (RELEASE-CLOSEOUT-ROUTE Gate 2)

| dimension | levels tested | rows |
|---|---|---|
| declaration placement | decl-reloc · decl-reloc-all · all3-span-solo (+relax+solo) | g1,g3,g5 · g2,g4,g6,g10,g11 · g7,g8 |
| body-split boundary (export floor) | off · 1 KB · 2 KB (body ≥8 KB, parent ≥32 KB floors) | g1,g2,g7 · g5,g6 · g3,g4,g8–g11 |
| helper grouping (run-wrap KB) | 24 · 28 · 32 | g9 · rest · g10 |
| placement seed | 2648369387 · 1844674407 | all · g11 |
| sequence split | off · on | all · g13 (byte-identical to g8 — dissolve's embedded splitter already covers it) |

Every level occurs in ≥ 2 rows; every (placement × split) pair occurs at KB=28/seed S1. KB=32 and KB=28
again byte-identical (`d81221f0f26c`) — no wrap run sits on that boundary.

## Results (sorted by the acceptance metric `windows_above_target`, then excess)

| run | >0.25 | worst | mean | excess | out sha256 (12) | config |
|---|---:|---:|---:|---:|---|---|
| **g8-all3Exp** | **47** | 0.4258 | 0.2794 | 3.027 | `44a8dc146cce` | all3 + export@2 KB |
| g7-all3 | 48 | 0.4037 | 0.2769 | **2.844** | `dd53f9612e34` | all3 |
| g11-expSeed2 | 48 | 0.4106 | 0.2762 | 3.135 | `d05a9a972bf8` | reloc-all + export@2 KB, seed 2 |
| g6-declAllExp1k | 48 | 0.4097 | 0.2756 | 3.137 | `36b517f2abd1` | reloc-all + export@1 KB |
| g4-declAllExp | 48 | 0.4096 | 0.2758 | 3.144 | `d81221f0f26c` | reloc-all + export@2 KB (=g10) |
| g3-declExp2k | 48 | 0.4100 | 0.2807 | 3.222 | `c58b79d50a75` | reloc + export@2 KB |
| g2-declAll | 49 | 0.4008 | 0.2752 | 3.063 | `6a7f3f9b29e7` | reloc-all |
| g1-decl | 49 | 0.4023 | 0.2797 | 3.145 | `cda878ad9110` | BASE (canonical pin v2) |
| g9-expKB24 | 49 | **0.3958** | 0.2778 | 3.287 | `b5adb12e7d0b` | reloc-all + export@2 KB, KB=24 |
| g5-declExp1k | 51 | 0.4101 | 0.2815 | 3.254 | `ef97b52c819c` | reloc + export@1 KB |

Window W = 222,262–222,416 B (10% of output); 73 sliding windows (step W/8); target = no window with
max single-bucket share > 0.25. g1 = the BASE regression anchor (canonical pin v2 `cda878ad…`).

## Selected candidate

**g8-all3Exp** = `44a8dc146cce9d7b20f314b9574e54ee5b9798b17b013751b30b87f2351122d3` — the only run at 47
windows (twice: with and without sequence split), excess 3.027. Full env:

```
WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1
WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1
WEAVE_DECL_RELOC_ALL=1 WEAVE_RELAX_SPAN=1 WEAVE_RUN_WRAP_SOLO=1 WEAVE_RUN_EXPORT=1
node tools/weave-payload.mjs --apply <weave-in-chainA.js> <out> --seed=2648369387
```

Trade-off recorded honestly: g8's worst window (0.4258) is the grid's second-highest — the acceptance count
improves by concentrating less total mass above target while the single worst clump hardens. g7 holds the
best excess (2.844) and g9 the best worst (0.3958), both at 49/48 windows. The metric that closes the
release is `windows_above_target` (0 = done), so g8 is the accepted candidate for 1D.

`windows_above_target = 0` was NOT reached. Stop condition 2 applies: see
`S1-C-UNREACHABLE-CERTIFICATE-2026-09-28.md`.
