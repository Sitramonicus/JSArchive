# S1-B `split:fnbody` — implementation + measurement (2026-09-28)

Mechanism: **BODY RUN EXPORT** (`WEAVE_RUN_EXPORT=1`) in `tools/weave-payload.mjs` (`runExportPass`, ~L525–770).
Spec: `reports/CLOSURE-CALL-2026-09-28.md`. Target class: the 26 fixed items / 185,615 window-B of
intact giant function bodies (block 508, bodies 29 KB–60 KB) from
`reports/S1-B-FIXED-INVENTORY-2026-09-28.json`.

## What it does

For each function body, scan contiguous statement runs that are (a) raw text, (b) free of escaping control
flow (`return`/`break`/`continue`/label at the run's own level), (c) name-safe: every identifier the run
touches either is bound inside the run or resolves outside the function (`refIdents` — property names and
object keys are NOT identifier references), (d) free of post-write hazards (`rebindsName` — only binding-level
writes (`T=`, `T++`, destructuring, re-declaration) refuse; member writes `T.x=` do not, because both
bindings see the same object). A qualifying run is lifted into a synthetic hoisted helper declared in the
parent body, and the run's place is taken by a call:

- 0 escaping names → `w7();` — nothing outside can observe the run's own bindings.
- 1..N escaping names (must be same-kind variable bindings, no outside rebinds, run call-free at its own
  level) → `w7()` RETURNS them: `var T=w7();` / `var [T,U]=w7();` at the call site. Sound because the call
  site assigns the same objects at the same point; a call could otherwise run a closure that reads T
  mid-run (hence call-free), and an outside rebind would make a closure created inside lag (hence refused).
- Plan-guarantee: the owner body must survive the arrangement's own gates (≥3 statements / ≥3 non-directive
  post-export + ≥1 movable unit). A synthetic empty `function nm(){}` (pure synthetic, no source bytes) is
  planted when the kept statements carry no named function declaration — a fn unit is accepted unconditionally
  by the planner, which is what keeps the exported chunk from being emitted verbatim twice.

The pass runs BEFORE shell dissolution/sequence splitting mutate the statement lists (after them the owning
statement is no longer a list member — measured). The post-plan assertion verifies every helper AND call node
is a member of some planned region (dissolution-proof: nodes moved up an ancestor body still count).

## Safety evidence (every export run in this battery)

- content conservation 0 holes / 0 duplicated B (the run's bytes live exactly once, in the helper)
- output re-parses; the same statements present (permutation only); fixed + run-group order preserved
- `constraint-pass.mjs` C1–C5 5/5 on the export configurations that were run through the battery
- Landed stack WITHOUT the export flag: byte-identical to the frozen S1-A pin —
  `37d824d305ba183f5f6de3fae266cd74853200d18ab1ea960c9e080ab42db1e8`, map `90c75226…` (regress5b, 5/5 PASS).

## Measurements (chain A `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js`, seed 2648369387)

BASE = DISSOLVE+SHELL_LABEL+SCOPED+FN_HOIST+RUN_WRAP(KB=28)+PURE_LITERAL_CALLS+INDEX_FREE+DECL_RELOC.
Ruler = `tools/recon/share-sweep.mjs` on the run's own weave map. Baseline (BASE, no export):
worst 0.4025 · windows_above_target 49/73 · mean 0.2797 · excess 3.145.

| run | config | chunks/bodies | stmts | lifted | ruler worst · >0.25 · mean · excess |
|-----|--------|---------------|-------|--------|-------------------------------------|
| export5 | floor 2 KB | 3/3 | 122 | 13 KB | 0.4105 · 48/73 · 0.2807 · 3.123 |
| export9 | floor 256 B (pre unit-guarantee) | 24/23 | 145 | 25 KB | 0.4102 · 48/73 · 0.280 · 3.084 |
| export15 | floor 256 B + unit-guarantee | 43/42 | 164 | 43 KB | 0.4069 · 51/73 · 0.2801 · 3.175 |
| export16 | floor 1 KB + giant-only floors | 9/9 | 128 | 18 KB | 0.4103 · 51/73 · 0.2815 · 3.257 |
| **export17** | **floor 2 KB + giant-only floors** | **7/7** | **126** | **15 KB** | **0.4101 · 48/73 · 0.2808 · 3.225** |

Giant-only floors (recorded default): owner body ≥ 8 KB of statements and parent span ≥ 32 KB (one metric
bucket) — measured: exporting from small bodies added movable units that shuffle inside sub-bucket ranges and
moved windows_above_target 48 → 51 with no dilution.

**Reading.** The mechanism is safe and real: 15–43 KB of previously-intact giant-body mass now moves, and
`windows_above_target` fell 49 → 48 — the first lever to move the acceptance counter. Worst-window share
rises ~0.008 (the helpers travel inside their parent region, which is often the same origin cluster). The
remaining wall is the chunk gates' yield on the biggest bodies (call-free + escape rules still refuse most
interior statements: export17 drops 53 small fragments + 8 escape sets), and the parent-region locality of
the helper placement. Both are 1C search territory: combinations (export × decl-reloc × all3) and the
unreachable-certificate analysis over the still-fixed residue.

## Regeneration (no artifacts kept in the workspace)

```
cd Active/O8.15
BASE="WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1 WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1"
env $BASE WEAVE_RUN_EXPORT=1 WEAVE_MAP=/var/tmp/x.map.json node tools/weave-payload.mjs --apply \
  provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js /var/tmp/x.js --seed=2648369387
node tools/recon/share-sweep.mjs /var/tmp/x.map.json provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js /var/tmp/x.js
```

Tool facts recorded during the build: the planner's plan gates are `body ≥ 3` statements / region ≥ 3
post-seq-split / ≥1 movable unit (`if (!fns.length && !groups.length) continue`); the run-wrap pass's own
admission is `≥5` total / `≥4` non-directive (MIN_STMTS+1 / MIN_STMTS — different purpose, do not conflate).
`runOf` families are table shapes (`T.push`, `T+=str`, `T.prop=`, `T[k]=`) and can still be refused on
purity — only named function declarations are unconditional units.
