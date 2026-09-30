# S1-D deal-soundness dossier (2026-09-28) — weave placement model breaks payload semantics

**RESOLVED 2026-09-29.** Eleven soundness fixes landed (the six below + five found in the continuation:
label-fence closed gaps, frozen-run atoms for plain bodies, higher-order argument aliasing, property-method
aliasing + function-alias registration (AST fixpoint + synthetic param re-binds), and synthetic wrap/export
helper registration in the reader map). On the fixed tool the full grid was re-run (12 rows,
`reports/S1-C-SEARCH-LEDGER-2026-09-28.v2.jsonl`), the certificate re-derived
(`S1-C-UNREACHABLE-CERTIFICATE-2026-09-29.v2.md` — the 0.25 floor is unreachable in S1 and belongs to S2),
and 1D froze the grid winner `0d087477…` (`provisional/S1-D-FROZEN-2026-09-29/`) with the FULL battery green:
staged==shipped · matrix 26/0 · tiers 42/0+1skip · hold PASS · flip 14/0 · detector PASS · netwatch clean ·
dangling-refs 64/0 (0 error-path) · **decoy-parity PASS** · boot-smoke 22/22 byte-identical logs · chain
repro `cmp` clean. `tools/boot-smoke.mjs` is now the standing acceptance oracle. Residual risk recorded
below (plain-variable aliasing `var p = fn; p()` invisible to the textual graph) — watch for it in S2/S3
transforms and re-run the oracle on every tool change.

**Status (2026-09-28, pre-resolution): 1D CANNOT CLOSE. The release battery's functional gate (decoy-parity) is red on the weave line;
the defect class is systemic in the placement ("deal") model; five instances fixed, one residual remains.
No candidate is frozen. Every hash produced by the pre-fix tool is UNSOUND.**

## How it was found (the gate that earned its place)

`tools/decoy-parity.mjs <real> <decoy>` boots both artifacts in a Node VM and compares their output.
Baseline expectation (GATE-BASELINE-8.14 §2): "PASS ×3 · golden trace PASS (25 events)".

| pair | result |
|---|---|
| 8.14 reference pair (`Working-Stable/O8.14/`) | PASS — 19/19 identical garden lines |
| O8.15 chain, `DEEPWEAVE=1` extract, `WEAVE=0` (control build) | PASS — 19/19 (extract is innocent) |
| O8.15 chain, weave ON (any config, pre- or post-param-fix) | FAIL — real payload prints 0 garden lines |

`DECOY_DEBUG=1` showed the woven payload THROWING AT LOAD inside the VM. The weave's internal gates
(re-parse, content conservation, 5/5 self-checks, constraint-pass C1–C5, share-sweep) all pass — they
check syntax and the specific ordering observables, not runtime binding semantics. The VM boot is the
only honest functional oracle, and it is what the swift battery runs.

## The defect class

The deal re-places statements (run-group members, function declarations, relocated declarations, dissolved
shell bodies) using a window model that tracks only each item's OWN binding. Cross-statement dataflow and
scope-initialisation semantics are not modelled. Five distinct instances were isolated and fixed in
`tools/weave-payload.mjs` (2026-09-28):

1. **Dissolve parameter bindings dropped** (fixed, VERIFIED). The non-scoped inline path emitted
   `var T=ARG;` but never re-bound the parameter names (`let nm=T` was scoped-only). Every plain dissolved
   shell with params lost its bindings. Measured: `dangling-refs` weave-in 61/0 → weave-out 92/1, the one
   error-path name `cגNde5164` firing from catch blocks on any unrelated throw. Fix: always re-bind.
   Verified: 61/0 after the fix (diss-only run).
2. **Declaration relocation past member writes** (fixed). `standaloneReloc` used `reachesRead` as the
   forward blocker; `X.p=v` is deliberately not a "read" in the reader model, so `const X={}` could be
   relocated past its own fixed member writes — TDZ ReferenceError at load. Fix: `accessesName()` (member
   writes + reads) as the blocker in both relocation paths.
3. **Relocated declaration vs its run members in one gap** (fixed). The decl carried key `decl@N` and the
   members key `N`; the within-gap shuffle ordered them independently → `T.p=v; const T={}`. First fix
   (pairwise comparator) was non-transitive and silently dropped by TimSort — measured identical output.
   Fix that holds: `effRank` (a decl sorts at its chain's rank − 0.5).
4. **Labelled-shell bodies escaped their fences** (fixed). `L:{ … break L; }` fences are fixed text; the
   body statements were dealable region items and scattered anywhere — a block-level `function pL210`
   stayed inside the fences while its callers scattered to the top level ("pL210 is not a function";
   block-level function names initialise at block entry). Fix: `__shellFrozen` on labelled bodies.
5. **Cross-binding use before a lexical declaration** (fixed). A run member of binding X that reads
   `const Y` could be dealt before Y's declaration (`Cannot access 'hollo와819' before initialization`).
   Fix: `minGapOf` — every movable item is bounded below by the declarations of the bindings it accesses.
6. **Dissolved body scattered before its own `var p=arg` binding** (fixed). Param uses and argument side
   effects must execute before the body. Combined with 2–5, this closed the loop: **ALL dissolved shell
   bodies are now frozen contiguous, in source order, right after their binding** (`__shellFrozen`).

After fix 6 the BASE stack boots past load (fails later with `e葾b樕ї抾6279 is not a function` — residual
instance of the family at region level, likely a run-wrap/export helper or an fn-hoist interaction), and
the g8 stack reaches a synchronous spin before its first log line (a value-order break). The class is
systemic: the placement model needs per-item dataflow bounds as a first-class concept, not per-hole rules.

## What this invalidates

- The canonical pin `37d824d3…` / `cda878ad…` and candidates `a56a1bf1…` / `44a8dc146cce…` all FAIL the
  functional gate. They are measurement records only. Nothing may be released on them.
- The S1-C grid/census/certificate numbers (47/73, 3,799 items, zero blocking atoms) were measured on
  outputs that are semantically unsound; they remain the search record but the certificate's conclusion
  ("floor is constraint-driven") must be re-derived on a sound deal — the frozen-body constraint will
  shrink the movable set and the honest floor may move.
- The S1-B mobility measurement likewise stands as history.

## What stands (re-verified on the fixed tool tonight)

- dangling-refs 61/0 after fix 1 (diss-only; catch-path dangler gone).
- Weave self-checks 5/5 on every configuration run.
- Chain reproducibility: the earlier full-chain run reproduced weave-in/weave-out byte-identical (the
  repro property itself is sound; the bytes are not).
- decoder-failure continuity (carrier-flip-check 14/0), staged==shipped identity, matrix 26/0, tiers 42/0,
  hold PASS, detector PASS, netwatch clean — all on the (unsound) candidate build. Re-run required after
  the deal is sound.

## Remediation plan (next session's core task)

1. Make the deal's placement model carry per-item **dataflow bounds**: lower bound = declarations of every
   accessed binding (done via `minGapOf`); upper bound = the first reachable read of the item's own
   binding (existing barrier); block affinity for block-scoped declarations; frozen units for anything
   whose interior order/affinity is observable (dissolved bodies: done).
2. Diagnose the two residuals (the `e葾b樕ї抾6279` helper-call case; the g8 spin) with the same VM harness.
3. Treat `boot.js` (VM load + first-log smoke, `decoy-parity` full trace) as the acceptance oracle for
   every tool change; a change that passes static gates but fails the VM is a regression.
4. Re-run the bounded grid, re-derive the certificate on the sound tool, then 1D freeze + carrier + full
   battery.

Evidence: `provisional/S1-D-FROZEN-2026-09-28/SUPERSEDED-DEAL-SOUNDNESS.md`; boot harness repro:
`node /var/tmp/s1d-build2/boot.js <woven.js>` pattern recorded in this file (harness body inline below).

```js
// boot.js — the smoke oracle every tool change must pass
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync(process.argv[2], 'utf8');
const log = [];
const ctx = vm.createContext({
  console: new Proxy(console, { get: (t, k) => (k === 'clear' ? () => {} : (...a) => log.push(String(a[0] ?? ''))) }),
  setTimeout, clearTimeout, setInterval, clearInterval, queueMicrotask,
  atob: (s) => Buffer.from(s, 'base64').toString('binary'),
  btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
  performance: { now: () => Date.now() }, Date, Math, JSON, String, Number, Array, Object, Promise,
});
try { vm.runInContext(src, ctx, { filename: 'b.js', timeout: 10000 }); console.log('BOOT OK · lines:', log.length); }
catch (e) { console.log('end:', String(e.message).slice(0, 60), '· lines:', log.length); }
```
