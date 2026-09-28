# Deep Weave — what actually holds the weave score, measured 2026-09-26

Segment 1 of the 8.15-r2 plan (`Handoff/O8.15-R2-PLAN-2026-09-26.md`) is the weave finish: Deep Weave and
Held Splits. This document is the measurement that re-shapes it. Segment 1 is **not finished** — this is the
finding that decides what Deep Weave has to be.

All numbers are on the b25 line: `/tmp/deep/preweave.js` (post-normalise, post-split, pre-weave, 2,102,596
chars) → level-1 weave → `/tmp/deep/l1.js`. Ruler: `tools/recon/fine.mjs` (byte-accurate; the weave tool's own
`[metric]` is chunk-granular and overstates — see the dead-end list).

---

## 1. What the score actually is

`fine_share` = the worst 10 %-wide window of the **output** (≈210 KB), and the largest share of that window
coming from **one** of the 23 origin pieces (each piece ≈91.4 KB of the pre-weave file).

| number | value | meaning |
|---|---|---|
| `fine_share` | **0.434** | the worst window has 91,413 B from a single origin piece |
| worst window | output @357,748 | dominant piece 7 = origin 639,919 … 731,336 |
| `fine_run` | 76,325 B | longest single-piece run — the glued `P磆airie悚492` block |
| `intact_run` | 90,728 B | longest preserved original sub-span (one scissor cut) |
| identity | intact 2,102,596 B | whole file if nothing moved |

The floor is **not** "many medium runs". It is: **one origin piece of 91.4 KB arriving whole in one window.**
0.434 × 210 KB ≈ 91,417 B = exactly one 23rd of the source. Any piece that stays contiguous in the output
price its window at ~0.43, no matter how good the rest is.

## 2. What the file is made of

The master body (biggest function body) holds **101 statements**; **36 of them are ≥20 KB = 1,752,494 B =
83.3 % of the file.** Three classes:

| class | n | what it is | movable today? |
|---|---|---|---|
| `function <name>(){ var TABLE=[]; …push… }` carriers | 12 | a hoisted function whose body is mostly one table | statement yes, **interior no** |
| `var X=function(){ … }()` shells | 10 | IIFE-bound binding, 21–92 KB | **no** |
| `!function(){ … }()` shells | 12 | plain IIFE, 20–170 KB | **no** |

The largest eight: 169,896 · 92,246 · 90,752 · 85,489 · 78,229 · 75,535 · 70,160 · 69,134 B. The biggest
literal inside them is only 2–25 KB — **the giants are code, not literals.**

## 3. Held Splits: measured neutral (full verdict in `SPLIT-MEASURE.md` §6)

Extended split (`SPLIT_EXTRA=1`, default OFF): 12 → 19 candidates, +155 KB of array mass, +2,156 chars,
literal-sequence gate PASS. Weave over it: 138 runs / 19 groups, 5/5 constraint checks. Honest ruler:
`fine_run` 76,272 B (vs 76,325), `intact_run` 90,728 B (vs 90,728). **No gain.**

The reason is structural: every big array is consumed by the *next* statement —
`return (X=function(){return TABLE})()` (8/8 sampled). Measured: bytes available to interleave inside a
binding's private window = **256 B total across all 19 groups** (unchanged with the call barrier removed —
the barrier is the consumer). Splitting creates units; it cannot unweld producer from consumer.

## 4. The scattering ceiling (metric-only simulation, nothing emitted)

`tools/recon/pool-ceiling.mjs`: take the shipped output, cut every literal ≥ threshold into 4 KB chunks, and
place them bucket-round-robin at even intervals — i.e. the *perfect* version of "extract tables, split,
scatter". Fixed (non-literal) bytes keep their shipped order.

| relocatable | spans | bytes | `fine_run` | `fine_share` |
|---|---|---|---|---|
| literals ≥4 KB | 68 | 781,130 | 15,552 B | **0.393** |
| literals ≥1 KB | 196 | 965,902 | 10,284 B | **0.370** |
| + every `push` statement (the split tables, i.e. the hoisting transform) | 294 | 1,290,458 | **7,314 B** | **0.371** |

So: table work collapses the *run* (76 KB → 7–15 KB) but **cannot reach 0.25 by itself** — the share stalls
at ~0.37. Look at the composition: in the worst window of the third row, 131,483 of the bytes are pool but
81,436 are **fixed** (unmovable), and the dominant piece's 79,103 B is fixed code. That fixed code is one
statement — see §5. Nothing that only moves literals can touch it.

## 5. What still binds after that ceiling: pinned interiors

`tools/recon/fixed-run-census.mjs` — longest same-piece runs of **fixed** (non-literal) bytes:

| run | piece | owner (master-body statement) |
|---|---|---|
| 63,248 B | 6 | `function vectorϝ낥355(){ var Vi떚톚780=[]; …` (idx 40, 90,752 B) |
| 51,053 B | 19 | `function prairi718(){ var ON333=[]; …` (idx 90) |
| 30,488 B | 22 | `function emberҳϋ110(){ …` (idx 98) |
| 30,313 B | 21 | `function ho떚ѳу237(){ …` (idx 95) |
| 29,996 B | 16 | `function modul묶썚734(){ …` (idx 82) |
| 27,480 B | 5 | same carrier as the first row |
| 24,623 B | 4 | `function de812(){ …` (idx 36) |
| 23,162 B | 0 | `var f๕980=function(){ …` (idx 2) |
| 21,989 B | 18 | `function birch8134(){ …` (idx 87) |

Per-piece fixed bytes: pieces 7, 8, 9 are already thin (11–22 KB, the tables); pieces 0–6, 10–22 hold 38–89 KB
of fixed code each. **After any literal work, the binding constraint is pinned statement interiors** — code
that today cannot move at all. In the third row of §4's table, the residual is exactly that: piece 10's
79,103 B in the worst window is fixed code out of one ~86 KB statement (`86,293 B @937,198` — one of the
`!function(){…}()` shells). **Shell dissolution is therefore mandatory for the target, not optional.**

## 6. The lever this implies (Deep Weave = three cooperating transforms)

Target arithmetic: ≤0.25 means no piece contributes >52.5 KB to any 210 KB window. Pieces are 91.4 KB, so
every contiguous same-piece run >~50 KB must be broken, and broken *apart* (pieces ≤~10 KB scattered).

1. **Reader map** (the new core). For a binding X: every statement that can *read* X — direct mention, or a
   call chain that reaches a mention. This replaces today's blunt rule ("any call ends the window") and is
   what lets pieces be placed far apart while X is still being built. **Measured with the first cut
   (`tools/recon/reader-room.mjs`), the placement room it opens is large:**

   | table | first statement that can reach a read | room before it |
   |---|---|---|
   | `Vi떚톚780` (90 KB) | idx 40 | 40 statements · 520,492 B |
   | `P磆airie悚492` (75 KB) | idx 44 | 44 statements · 715,741 B |
   | `cAirn6045` (31 KB) | idx 84 | 84 statements · 1,541,708 B |
   | `ON333` (51 KB) | idx 88 | 88 statements · 1,666,991 B |

   Today's rule gives that room as ~256 B (SPLIT-MEASURE §6). The binding can be built anywhere in the
   prefix because a fresh unique name of value-only data cannot be observed earlier than its first reader.
2. **Hoist the tables out of their carriers** to the master body, keeping the name (readers reach it through
   the closure chain), and keeping per-call freshness where it exists: a producer that builds a fresh array
   per call gets a load-time pool plus a slice — sound when elements are primitives (the giant tables are
   strings and numbers). This is what turns a 90 KB body into scattered 4 KB statements.
3. **Scatter, don't bundle.** Today's deal keeps a group's pushes adjacent — measured: for all 7 run groups
   with ≥2 pushes, output span == origin span (order kept, nothing separated). Placement must deal each push
   to a *different* gap, relative order kept, interleaved with the hoisted-function deal.
4. **Dissolve the pinned shells** (`var X=function(){…}()`, `!function(){…}()`) where provably safe: no
   top-level `return`/`this`/`arguments`/`eval`, unique locals, statements keep execution order. This is what
   §5 says must be done for pieces 0–6 and 10–22.

Steps 1–3 are sound-transformable today; step 4 is the one that needs the strictest analysis and may land
per-shell.

## 7. Status and next

- Landed: `SPLIT_EXTRA` (gated, default OFF), `tools/recon/{fine,sim,pool-ceiling,fixed-run-census}.mjs`.
- Not yet built: the reader map, the hoist/outline pass, the scatter placement, the extended constraint
  checks (C2 becomes "no statement that can reach a reader of X inside the run"), and the Deep Weave stage in
  `build-stego13-r2.mjs`.
- Acceptance unchanged: identical battery verdicts vs the frozen 8.14 pack, detector still fails, pack and
  b22 rollback untouched, operator's live paste is the gate.

```bash
# the four measurements in this document, in order
WEAVE=0 OUT=/tmp/deep/nw bash Active/O8.15/tools/cc34-build.sh carrier     # → preweave.js
WEAVE_MAP=/tmp/deep/l1.map.json node Active/O8.15/tools/weave-payload.mjs --apply preweave.js l1.js --seed=2648369387
node Active/O8.15/tools/recon/fine.mjs /tmp/deep/l1.map.json preweave.js l1.js
node Active/O8.15/tools/recon/pool-ceiling.mjs arrays4k|all1k
node Active/O8.15/tools/recon/fixed-run-census.mjs
```
