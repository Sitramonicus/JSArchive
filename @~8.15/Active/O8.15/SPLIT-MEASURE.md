# Step 2 — the order-preserving split: what is monolithic in the shipped payload, and what it costs

**Measured 2026-09-26 on the shipped payload** (the 2,383,584-char text the loader stages; arm A build).
Tool: `tools/split-runs.mjs`. Artefacts of the run: `/tmp/split-payload.js` (scratch; regenerate with the
command in §5). Not promoted on its own — it ships with arm A in b24, and the b24 battery is in `README.md`.

---

## 1. What the payload actually looks like

The file is one expression statement → a 2,100,607-char arrow IIFE → everything else. Inside it, the mass
is **nested**, which is the finding that matters for how the split and the weave are designed:

| observation | number |
|---|---|
| largest single statement in the file | the whole file (2,103,846 B) — the outer IIFE |
| largest *interior* statements | `VariableDeclaration`s of **70,087 – 92,246 B** (six of them ≥ 70 KB) |
| of those, the big ones are | `var X = (function(){…})()` — an IIFE-bound binding; its own body is a **block of units one level down** |
| `ArrayExpression`s ≥ 20 KB | 11 · 493,411 B total (largest 90,330 B, 998 elements) |
| `ObjectExpression`s ≥ 20 KB | 1 · 20,254 B |
| statements ≥ 15 KB in the whole tree | 140 |

**Consequence 1.** Splitting a big array is mechanical and cheap (§3). **Consequence 2.** A 90 KB
IIFE-bound variable cannot be split as a *statement* — but its body is already a grid of statements, so the
weave does not need a split there; it needs to run **inside** that body. The unit census for step 3 must
therefore be taken **per function body**, not per file. That is a correction to the roadmap's §3 reading
("split the 18 monoliths"), which assumed the big units were flat literals.

## 2. The transform

```
var A = [ e0, e1, …, en ]        →   var A = []; A.push(e0,…,ek); A.push(e(k+1),…); …
var S = "long string"            →   var S = ""; S += "part1"; S += "part2"; …      (opt-in, see §5)
```

Runs execute contiguously in the original position, so evaluation order, timing and the final value are
unchanged; only the *shape* changes (one monolith → N order-fixed runs). Safety rules, each of which
*skips* a candidate rather than guessing: `var` only; the declarator must be the **last** of its declaration
(a later declarator could read a half-built binding); the declaration must sit directly in a block/program
body (never a for-head or a bare `if` branch — the runs are inserted as statements); arrays with holes are
skipped (a hole is `undefined` as a call argument); nested candidates are dropped (an inner insert would be
deleted by the outer replacement). Strings are **off by default**: splitting one literal into N changes the
literal sequence by construction, so it cannot be checked by the same equality gate — it needs `--strings`
and a per-candidate reconstruction check.

## 3. What it buys, at what price (payload, ≥4 KB threshold, 4 KB runs)

| | |
|---|---|
| candidates applied | **12 arrays** (356,465 B of array mass; 0 skipped) |
| bytes | **+1,437 chars (+0.07 %)** |
| self-gate | literal sequence identical — 77,292 literals, same order (re-parsed) |
| effect | 8 statements fell below the 15 KB line; the 90,343-B array declaration is gone; the file's largest *array* unit is now a 4 KB run |
| `node --check` | OK |
| payload gates after the split | `detector-replay` PASS · `netwatch` 0 calls/no URLs · `fullwire-probe` runs, identical log line · `hold-check` PASS · `carrier-flip` 14/0 · `decoy-parity` PASS · `dangling` 61/0 on the error path |

Cost scaling is linear and small: each run costs ~9 B (`X.push(` + `)`), so even 4× more splits stay inside
the carrier's ~62.7 KB/reel headroom.

## 4. What it does not buy yet

- The **IIFE-bound** 70–92 KB declarations are untouched (they are not literals). Their interiors are grids
  the weave can already work on — no split needed, but the weave must be built to descend into function
  bodies (roadmap step 3's constraint pass).
- Big **string** literals are untouched by default (mass: ~14 KB ≥4 KB threshold — small). When they are
  turned on, the gate changes shape, so they ship only with their own verification.
- Object literals (20 KB, one) — not handled; property-based splitting has getter/duplicate-key hazards.
- The split does not itself change *order*; it only creates the units the weave will reorder. On its own it
  is a prerequisite, not a win.

## 5. Reproduce

```bash
# measure
node Active/O8.15/tools/split-runs.mjs --measure <payload.min.js> --min=4000
# apply (arrays only, the default)
node Active/O8.15/tools/split-runs.mjs --apply <in.js> <out.js> --min=4000 --run=4000
# the build wires the same tool into the carrier stage (SPLIT_MIN=0 disables it)
SPLIT_MIN=4000 SPLIT_RUN=4000 bash Active/O8.15/tools/cc34-build.sh carrier
```

## 6. The held classes — measured 2026-09-26 (verdict: neutral, and structurally so)

The splitter was extended behind `SPLIT_EXTRA=1` (default OFF; the shipped path is byte-identical):
`let`/`const` declarators as well as `var`, and the non-last declarator — handled by splitting the
*declaration* (`var A=[…],B=…` → `var A=[];A.push(…);var B=…`) so evaluation order and literal order are
exactly the original ones.

| measure | default (ships) | `SPLIT_EXTRA=1` |
|---|---|---|
| candidates | 12 · 356,465 B | 19 · 511,440 B |
| apply | — | 19 applied, **+2,156 chars**, literal-sequence gate PASS (77,294 literals, same order) |
| weave (level 1) | 96 runs / 12 groups | 138 runs / 19 groups, all self-gates PASS |
| honest `fine_run` | 76,325 B | 76,272 B |
| longest intact span | 90,728 B | 90,728 B |
| constraint pass on the extended build | — | 5/5 PASS, 1,979 movable statements = 65.5 % |

**Verdict: neutral — and the reason is structural, not a gate failure.** Every split array is consumed by the
statement *immediately* after its last push: in an 8/8 sample of the big runs the next statement is
`return (X=function(){return TABLE})()` (`latt700`, `prairieѧ떚뾃728`, `bloom398`, `maシワザ911`, `Vi떚톚780`,
`P磆airie悚492`, `S欞roudқ103`, `oRbit824`). Producer and consumer are welded. Measured consequence: the bytes
available to interleave *inside* a binding's private window total **256 B across all 19 groups** — and removing
the call barrier does not change that, because the barrier is the consumer statement, not a call.

A split creates units; it cannot separate a producer from the consumer that reads it next. **The lever is
placement** — see `DEEP-WEAVE-MEASURE-2026-09-26.md` §3–§6. The extension stays in the tool, default OFF,
until Deep Weave's placement can use it.

```bash
# reproduce the extended build + ruler
SPLIT_EXTRA=1 node Active/O8.15/tools/split-runs.mjs --apply preweave.js split2.js --min=4000 --run=4000
WEAVE_MAP=map.json node Active/O8.15/tools/weave-payload.mjs --apply split2.js w2.js --seed=2648369387
node Active/O8.15/tools/recon/fine.mjs map.json split2.js w2.js
```

## 7. The held classes, second pass — objects and properties (2026-09-27)

`SPLIT_OBJECTS=1` turns a data object into `{}` plus one assignment per property (`var T={a:1,"b c":2}` →
`var T={};T.a=1;T["b c"]=2;`). Rules: data properties only, no getters/setters, no computed keys, no spread,
no `__proto__`; source order kept, so insertion order (`Object.keys`) is unchanged. Non-last declarators use
the same split-the-declaration path as arrays. Measured on the r2 line: **32 candidates (27 objects + 5
nested arrays), +58,611 chars (2.79 %), literal sequence identical — gate PASS.** The property form is what
lets the weave deal a 400-property table as 400 separate placements instead of one block.

**One hazard came with it, and the battery found it.** A property whose *value* is a call (`T.x = make()`)
must never be dealt away from its position: spreading it defers the call. The weave now requires every run
statement to be position-independent (literals, arrays/objects of literals, function expressions) before it
deals the group; the failing case timed the payload out for the harness's full budget.

## 8. Held class: nested/mixed arrays — the indexed form (2026-09-27)

The push path must refuse an array whose elements are not value-only (nested arrays, member reads, calls):
a push's slot *is* its execution order. Measured effect of that refusal: the 80,758-byte nested array
`Fびήぜ137` (123 elements: 80 sub-arrays + 43 immediately-invoked functions) stayed whole and, at 0.434,
was the single block holding the whole weave score.

`SPLIT_ARRAYS_I=1` splits it by index instead — `var Fびήぜ137=[];Fびήぜ137[0]=[…];…` — one statement per
element, recursing into nested arrays (measured: `Prairie173`, 25,564 B, 113 units). Rules: the binding must
not be mentioned inside its own elements; holes are allowed (an unassigned index is the same empty slot a
hole makes, so length is preserved); spread is emitted verbatim, never recursed; a declarator that is not
last keeps its siblings after the emitted statements, so evaluation order is still the literal's own.

**Gate consequence (recorded because it changes a definition):** the literal-order gate now compares
*data* literals — a numeric literal in computed-member position is addressing, not data — applied to both
sides of the comparison. Nothing else about the gate moved.

**Measured:** 75 candidates applied, +118,339 chars (5.63 %), gate PASS. On the weave: the longest
single-origin run fell 79,139 → 25,911 B and the longest intact span 97,580 → 27,865 B. The worst-window
share stayed 0.434 — see `DEEP-WEAVE-REPORT-2026-09-27.md` §4: that number is a placement problem now.
