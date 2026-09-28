# Deep Weave — Segment 1 report (2026-09-27, second pass)

Segment 1 of the 8.15-r2 plan: **Deep Weave** (dissolve · lift · extract) and **Held Splits** (extra arrays,
objects, indexed arrays). This pass fixed a regression the first pass left behind, added the transform that
finally broke the pinned blocks, and produced a clean, reproducible measurement table. **The plan's target
(≤0.25) is still not met, and this report says exactly what holds it.**

Basis: `DEEP-WEAVE-MEASURE-2026-09-26.md` · `SPLIT-MEASURE.md` §6–§7 · `Handoff/O8.15-R2-PLAN-2026-09-26.md`.

---

## 1. What is in the chain

| stage | tool | flag | does |
|---|---|---|---|
| Held Splits A | `split-runs.mjs` | `SPLIT_EXTRA=1` | `let`/`const` arrays, non-last declarators (declaration split, order preserved) |
| Held Splits B | `split-runs.mjs` | `SPLIT_OBJECTS=1` | data object → `{}` + one assignment per property |
| **Held Splits C** | `split-runs.mjs` | `SPLIT_ARRAYS_I=1` | **arrays the push path must refuse** (nested arrays, member reads, calls) → `var T=[];T[0]=…;T[1]=…;`, recursing into nested arrays; evaluation order and literal order are the literal's own; holes keep their length |
| Deep Weave 1 | `deep-weave.mjs` | `DEEPWEAVE=1` | **dissolve** `!function(P){…}(A)` / `var X=(function(){…})()` where provably safe |
| Deep Weave 2 | `deep-weave.mjs` | `LIFT=0` off | **lift** self-contained declarations with pure inits |
| Deep Weave 3 | `deep-weave.mjs` | `EXTRACT=0` off; `EXTRACT_ONLY=<names>` | **extract** table runs out of the carrier that reads them |
| placement | `weave-payload.mjs` | — | reader-map windows, purity gate, even-with-jitter deal |
| verification | `constraint-pass.mjs` | — | C1–C5, C2 = "no statement inside a run can reach a read of the binding" |

Measured on the r2 build-split payload (2,164,456 chars pre-weave):

```
[SPLIT]  75 candidates applied (+118,339 chars, 5.63%) — data-literal sequence identical, gate PASS
[DEEP]   21 of 31 shells dissolved (884 K); 14 table runs extracted (444 K of pushes)
[WEAVE]  1,741 hoisted functions · 9,540 runs over 32 groups; 66 groups carry a call/read and stay put
[CONSTR] 5/5 PASS
STAGED   sha256 7be88098… · 2,223,890 chars
```

## 2. The regression this pass caught (mine, from the first pass)

The first pass's report said the extraction landed. It did **not** reproduce: on the current build-split
input the tool extracted **zero** tables, and I had recorded a ruler row that came from a different chain.

Root cause: the `carrier-escapes` guard I added while chasing the hang refused every one of the 14 verified
tables, because *every* carrier in this payload is passed as a call argument to its rotating retry loop
(`}(carrier, 653168)`) — the guard could not tell that shape from the one genuinely dangerous case. The
authority order is now explicit and recorded in the tool: **`EXTRACT_ONLY` names win; the guard protects the
automatic path.** Re-verified clean bisect, one input, four variants:

| variant | extracted | decoy-parity |
|---|---|---|
| none | 0 | **PASS** |
| verified list | 14 | **PASS** |
| + `latt700` | 15 | **FAIL** |
| auto (guards alone) | 1 | **FAIL** |

`latt700` is the single table whose extraction breaks the payload — it stays out of the list, and the guard
(plus the interleaved-reader rule) stays on for future builds.

## 2b. A regression no gate could see — and the assertion that now covers it

While wiring the optional second split pass, an edit dropped the line that hands the splitter's output
back to the build (`minReal = split;`). The split ran, printed its numbers, applied 75 candidates — and the
chain continued on the **unsplit** payload. Every gate passed: the splitter's own data-literal gate (on the
file it wrote and then discarded), the deep weave's gates, the constraint pass, `staged == shipped`, and the
whole battery — because a valid payload *without* the split is still a valid payload. The only visible
symptom was quieter numbers (the weave found 30 run groups instead of 9,540; the payload came out 120 KB
smaller), which is what sent me looking.

The build now refuses to continue if the splitter reports applied candidates and the payload that leaves the
stage is unchanged (or has the same length as its input). This is the same class as Segment 3's **Evidence
Discipline** item — a stage's success must be asserted on the artifact that *continues*, not on the stage's
own log — and it is now asserted where it bit.

## 3. What actually broke the pinned blocks

`tools/recon/explain.mjs` (new) prints the composition of the worst window. Before this pass it showed one
statement — `var Fびήぜ137=[[…],[…],…]`, an 80,758-byte nested array whose 123 elements are 80 sub-arrays and
43 immediately-invoked functions — arriving whole. The push path could not split it (elements are not
value-only), the extract pass could not hoist it (self-contained check fails), and no amount of moving
objects or strings touched it.

`SPLIT_ARRAYS_I` splits it by index instead: `var Fびήぜ137=[];Fびήぜ137[0]=[…];…` — 123 separate statements,
each its own slot, recursing into nested arrays (`Prairie173`, 25,564 B, 113 units). Two consequences:
the literal-order gate now compares **data literals** (a numeric literal in computed-member position is
addressing, not data) on both sides; and the units are explicitly-indexed, so their *content* does not
depend on statement order at all.

## 4. The honest numbers (one chain, one seed, byte-accurate ruler)

All rows: same build, same split flags except where noted, weave seed `2648369387`, `fine.mjs`.

| configuration | fine_run | intact_run | fine_share |
|---|---|---|---|
| level-1 (b25-class), no deep weave | 76,325 | 90,728 | 0.434 |
| deep weave, 0 extracted | 79,139 | 97,580 | 0.434 |
| deep weave + 14 extracted | 91,421 | 97,580 | 0.434 |
| indexed arrays, 0 extracted | 72,220 | 90,728 | 0.434 |
| **indexed arrays + 14 extracted (landed)** | **25,911** | **27,865** | **0.434** |
| landed + index-form groups dealt (`WEAVE_INDEX_DEAL=1`, measured, off) | 92,131 | 42,112 | 0.434 |
| ceiling simulation: all literals ≥1 KB pooled | 15,552 | — | 0.370 |

**The runs collapsed — 79,139 → 25,911, intact 97,580 → 27,865 — and the share did not move.** That is the
finding of this pass: `fine_share` is not limited by *runs* any more. `explain.mjs` on the landed build
shows the worst window (222 KB) as a mosaic: 43 % from one origin bucket, 26 % from the next, 10 % from the
next, in ~250 pieces of ~375 bytes each. Nothing in it is one big block; it is a *region* of the output
where pieces from two adjacent origin buckets sit densely together, and the pieces that would dilute them
cannot be placed there — a run group may only be dealt inside the window where its binding cannot yet be
read (`C2`), and the tail of the payload reads nearly everything.

## 4b. The placement dump — VOID (superseded)

> **VOID as of 2026-09-27 (pass 2/3).** Everything in this section was measured on the pre-splitter artifact;
> its window (222,576 B) is a different window from the one the acceptance metric reports (225,574 B, `@721,824`
> landed), and its "fixed 58.6 %" is superseded by the §20c window anatomy (`fixed ≈ 46–53 %`, measured by
> `recon/explain.mjs` on the landed build) and by §21.4–§21.7, which replace every one of its "remaining levers"
> with a measured number. Kept only as a record of what was believed before the ruler existed; do not cite it.

## 4b-old (text retained below, do not cite)

The weave now dumps a placement map (`WEAVE_MAP` carries `stmts`: for every emitted region statement, its
output span, origin offset, and whether it is a hoisted function, a dealt run, or fixed). `explain.mjs`
attributes every byte of the worst window to one of those three classes.

Worst window of the landed build (222,576 B): **fixed 130,474 B in 660 statements (58.6 %)** · dealt runs
75,358 B in 19 statements · hoisted functions 16,717 B in 26. **93 % of those fixed statements are under
300 B** — the region is a *stream of small code pieces the weave never moves*; there is no single block to
blame. The largest pieces in it are:

| bytes | what it is | status |
|---|---|---|
| 26,946 | `!function(s핵ro랒975){…}` | a shell **dissolve refused** (mid-return / multi-return) |
| 22,554 | `var Mos쉃뮶륜922={A:784,…}` (473 props, 1st of 17 declarators) | a **nested candidate the splitter drops in pass 1** |
| 11,259 | `!function(L鷑tticeυ656){…}` | another **refused shell** |
| ~20,000 | `Fびήぜ137[i]=…` (indexed array, 43 of 123 elements are IIFE calls) | a **run group refused by the purity gate** |
| 40,000+ | dealt `push` statements (`P磆airie悚492`, `S欞roudқ103`, `ON333`, `BI713`, `cAirn6045`) | dealt, but landing inside this region |

So the remaining levers are all *split coverage*, and each is now bounded by a number:

1. **Nested candidates.** Pass 1 must drop literals nested inside a larger candidate (the outer replacement
   would delete the inner edits). A second pass finds **8 more candidates / 75,125 B** (seven objects —
   `Lattice윍조786` 17,724 B, `M鷑υ枚158` 14,470 B, `c‍Indeӎ춃썖288` 11,599 B, `kҞӆ205` 10,106 B… — and one
   array). **Re-measured cleanly 2026-09-27 — see §15.** The two-pass numbers that used to stand here
   ("120 KB smaller, 148 fewer `.push()`, run dealing 9,540/32 → 30/5, ruler 25,911 → 74,529") were taken
   through the dropped-assignment bug and are **VOID**. On the fixed chain, `SPLIT_PASSES=2` is
   **ruler-neutral** (fine_run 25,911 → 25,910 · share 0.434 → 0.434) and costs payload and carrier headroom
   (2,223,890 → 2,258,475 chars · reel 96.1 %, over its 92 % comfort line). Default stays 1 pass.
2. **The refused shells** (async/generator 31 K, mid-return 17 K, multi-return 62 K). Each is a single
   20–90 KB statement; dissolving 26.9 KB + 11.3 KB of them in this window alone would remove the two
   biggest fixed pieces in it.
3. **The refused array group.** `Fびήぜ137`'s 123 indexed statements are order-free by construction (every
   statement names its slot), but 43 carry IIFE calls, so the purity gate holds the whole group in place.
   Dealing it *as a group* was measured (`WEAVE_INDEX_DEAL=1`) and made things worse globally
   (fine_run 92,131) — so this needs a real answer, not a blanket rule: either the IIFE elements are shown
   to be self-contained (the dissolve pass already has that analysis) or the group is split into a pure
   half and an impure half that are dealt and pinned separately.

**Consequence for the plan:** the remaining lever is **split coverage and placement**, not the deal's evenness. Two candidate directions,
both measurable with the tools now in the tree: (i) a placement dump (statement → gap) so a uniform region
can be traced to the group that filled it, and (ii) a deal that mixes *by origin* across the whole body
rather than per group window by window — with the reader-map window kept as the hard constraint. Splitting
more is wasted effort until one of those lands.

## 5. Verification (landed configuration, `/tmp/deep/land`)

| gate | result |
|---|---|
| decoy-parity k=0, 1, 2 | **PASS ×3** |
| stego matrix / tiers / hold / carrier-flip | 26/0 · 42/0 (+1 skipped) · 9/9 · 14/0; `--debug-name` 42/1 = the expected T2 fail-closed |
| detector / netwatch / dangling | PASS · 0 network primitives · PASS (0 on an error path) |
| leakcensus / constraint / golden trace | PASS · 5/5 · PASS (25 events) |
| `gate --spec` | 14/17 — harness-side and pre-existing: it loads only the untouched 8.14 shards and scores differently run to run (a fresh b25-class build scores 11/17 on the same input) |

## 6. Reproduce

```bash
ALL='fﾎﾽﾜｸ744,prairieѧ떚뾃728,bloom398,maシワザ911,Vi떚톚780,P磆airie悚492,S欞roudқ103,oRbit824,m濎Ssё虣虣1073,cInde826,cAirn6045,ON333,BI713,PLasmaь386'
EXTRACT_ONLY="$ALL" DEEPWEAVE=1 SPLIT_EXTRA=1 SPLIT_OBJECTS=1 SPLIT_ARRAYS_I=1 OUT=/tmp/deep/land \
  bash Active/O8.15/tools/cc34-build.sh carrier
WEAVE_MAP=/tmp/map.json node Active/O8.15/tools/weave-payload.mjs --apply <pre> <post> --seed=2648369387
node Active/O8.15/tools/recon/fine.mjs /tmp/map.json <pre> <post>     # the ruler
node Active/O8.15/tools/recon/explain.mjs /tmp/map.json <pre> <post>  # what fills the worst window
node Active/O8.15/tools/recon/fixed-run-census.mjs <post> /tmp/map.json <pre>
```

## 7. Segment 1 status: **not complete**

Met: the transforms are built, gated and battery-green; two defect classes found and fixed (extraction past
a consumer; the over-broad escape guard); the runs and intact spans collapsed; the tooling to answer "what
holds the score" now exists (`explain.mjs`, `fixed-run-census.mjs`).

Not met: **the ≤0.25 target** — the honest share is 0.434. This pass showed the share is held by *fixed
code* (58.6 % of the worst window, in 660 pieces under 300 B each), and narrowed the levers to three
numbered ones in §4b. Segment 2 has not been started.

## 8. Live-debug instrument for the 8.14 baseline (added 2026-09-27, operator ask)

Delivered alongside this report, because it touches the same machinery and costs nothing to run:
`Active/O8.15/Runners/O8.14-debug-runner.js` (build it with `Active/O8.15/tools/make-debug-runner.mjs`,
self-test with `Active/O8.15/tools/debug-runner-selftest.mjs`, run it by the book in
`Active/O8.15/Runner-Notes/RUN-CARD.md`, structure in `Active/O8.15/Runner-Notes/SYSTEM-MAP.md`).

It is the raw 8.14 shards stitched in S4 order with a telemetry harness: the payload's own output is
unchanged (verified offline — `[Host 8.14] initialized — worker instance 06118ef1.` and the welcome line
still print), and on top of it every line is mirrored with the stall state at emission, every entry call is
logged with slot/level/chain/ledger deltas, and a capability matrix (14 rows) plus a guard verdict can be
printed at any time.

Why it is in this report: the operator's three live findings of 2026-09-27 are **not** weave faults — they
are one fault with three faces (the claim surface `a`+`u` is independent of the work chain `e1→e4`), and the
runner is what turns that reading into evidence: `STAND-DOWN` on the failing pass, `dispatch` on a passing
one. Self-test (offline, Node) reproduces the shape exactly, including `pwdDbg → true` with the chain left at
`no-chain` and the guard line held by the stall. Nothing in this instrument touches Segment 1's transforms or
its acceptance number.

## 9. Live capture through the debug runner (2026-09-27, `ctxt.io/3/u3kNcWOkg.md`) — the reading is confirmed

First live run of the instrument. Boot at 09:28:33, page carried a **worker token** from the earlier session
(no refresh in between). What it printed, in order:

| time | line | what it settles |
|---|---|---|
| +0.0 s | `[GDBG] guard verdict at boot: STAND-DOWN — a worker token is already on window (live/unreleased) → shard-e1 skips its whole dispatch…` | the fault is the guard, named before any passphrase was typed |
| +0.0 s | `[dropped-by-stall] [say] Census Host worker already on shift — skipping the second dispatch.` | the guard's own line, which the shipped build drops |
| +1.5 s | matrix: `worker token PRESENT (unreleased)`, `arm hook missing`, `chain no-chain`, `ledger null`, `stall CLOSED`, `65 line(s) … DROPS them` | the whole fault surface in one block |
| +35.7 s | `entry(pwdRcd) called … settled: level 0 -> 1 · chain no-chain (unchanged) · ledger null (unchanged) · stall true -> false · returned true (3 ms)` (`ripcord`) | **bug #2 reproduced exactly**: the gate opens, the claim is accepted, nothing starts |
| +35.7 s | claim flush: `Host config`, `Store check ×3`, `Pocket check ×5`, then `chain {"state":"no-chain","ok":false,"missing":null,"ran":false,"released":false,"revived":true}` | **bug #1 reproduced exactly**: the operator's verbatim `no-chain` diag. The flush shows the gate's own bookkeeping, never the guard |
| +53.5 s / +149.8 s / +170.4 s | view slot `true` with `ledger null (unchanged)`; `resurgence` → `true`; `pwdDbg` → `level 1 -> 2`, chain unchanged | **bug #3 reproduced exactly** (nothing to print from) + the firing question answered live: `pwdDbg`/`pwdRcd` fire the *gate*, not the *system* |

Conclusion: the three live findings are one fault — the worker-token guard standing the e-piece down — with the
stall hiding the one line that says so. Reproduced on the operator's page, in their session, with the token
reported as present and unreleased.

Two mechanical facts this capture added:

1. **Dropped, not held.** `say`/`warn`/`info` return *before* emitting while the stall is closed, so the guard
   line never enters the bounded buffer and the claim flush cannot recover it — the flush carries the gate's
   `queue`-channel lines and nothing else. (Instrument label renamed `[held-by-stall]` → `[dropped-by-stall]`;
   the plan's Gate Firing Logs item now carries the stand-down onto the `queue` channel.)
2. **`ripcord` resolves to the pwdRcd slot** (hash-classified by the probe, level 0 → 1), consistent with the
   standing five-slot spec.

This capture is **pass 1 of the two-pass comparison** (the down pass). The quest protocol did not run in it —
no `phase-t`, no ledger, no work at all, because no session existed. Pass 2 (refresh → re-paste → `dispatch`
verdict → quest protocol → `__GDBG.report()`) is still owed.

## 10. Second live capture (`ctxt.io/3/lkItHc652.md`) — a healthy chain, and one instrument correction

Boot 09:38:25, after a refresh. This is the **contrast pass** to §9, and it separates three things that were
being read as one.

**What the machinery actually did (facts from the capture):**

| time | line | meaning |
|---|---|---|
| +0.1–0.2 s | `phase-codec`, `phase-rt {"cacheCount":8375,"definitionCount":12928}`, `phase-lz {"cacheDelta":133}`, `phase-lat {"ms":35}`, `phase-scan`, `Case Hold inspected {"juniper":true,…}` , `phase-if {…all true}` | **all of these are `shard-e1` lines after its guard** (e1:281/325/347/439) — the e-piece registered and ran. The guard did not stand this paste down |
| +0.2 s | `[Census] 10 chores pinned to the board for this shift.` / `[Logbook] 1 set aside — shape we can't fold this pass.` | the scan filled the queue; the ledger matrix row later reads **10** |
| matrix | `pockets missing: (none)` · `arm hook: live` · `chain: scanned` · session state with 40+ fields (`_0xarm`, `_0xruntimeKey`, `_0xeligible`, `_0xm0–m9`, `_0xq1–qe`, `_0xkill`, `_0xroute0`…) | a fully built session, waiting for a claim |
| +13.6 s | `ripcord` (pwdRcd): `level 0 -> 1 · chain scanned -> armed · ledger 10 · stall true -> false · returned true` | **the claim DID fire the system** — the chain advanced. This is not the §9 shape |
| +41.2 s | `resurgence` → `chain {"state":"armed","ok":true,…}` | res/revive slot fires correctly |
| +29.2 / +101.5 s | view verb → `returned true`, ledger `10 (unchanged)`, **nothing printed** | **the reported bug, live, with a full ledger and an armed chain** |

**No work ran** — no `phase-t` tick, no `phase-st`, no `Ledger:` line, no `Cashed out` — through +101 s, with the
chain at `armed` and `ran:false` at every reading. So the second capture carries two distinct open faults: the
**silent view verb** and **armed-but-idle**.

**Instrument correction (mine).** The §9 verdict line read the worker token *after* boot; this paste's own
e-piece plants that token as part of registering, so a healthy pass was reported as `STAND-DOWN`. Fixed: the
harness now snapshots the token **before any piece runs** (`G.preToken`) and discriminates on whether the
session controller was created. Re-tested offline: clean page → `dispatch` ("confirmed: the session controller
was created"); leftover token → `STAND-DOWN`; pre-existing token + registered controller → `dispatch (token was
pre-existing)`. **The §9 capture keeps its conclusion** — there the guard's own dropped line was in the capture
and `_e.S` was empty, so that one was a real stand-down.

**Slot classification, settled offline** (`Active/O8.15/tools/slot-classify.mjs`, passphrase via argv only, never
echoed): `ripcord` → **rcd gate** (FNV `0xb5546f18`); `thisisjust…contents` → **dbg gate** (FNV `0xe79dbcf6` +
the legacy polynomial); `resurgence` → **res/revive** slot; `wertyuiopasdfghjklzxcvbnm` → **roster/view** slot.
So the silent verb in both captures is the view verb, exactly as the operator reported.

**Why the view verb can be silent while the gate answers `true`.** `shard-a:344` calls
`_0xmod.v814owlmpb782on?.roster?.()` — optional chaining, so an absent hook is a silent no-op that still returns
`true`. e4 publishes module-level fallbacks for `begin`/`extend`/`roster` at `e4:379-385` precisely so a page
whose chain never started can still be asked — but if that publish block does not run on a given page, all three
are absent and the verbs answer `true` into nothing. The runner now reports hook presence directly
(`controller hooks` matrix row + a `ctl.*()` call log), which settles in one paste whether the hook was missing
or the line was dropped by the stall. **Not yet settled — do not read it as decided.**

**Consequence for Segment 1's Gate Firing Logs item:** the item now carries the hook-presence report as well —
a claim must be able to say "the verb I just called had no hook behind it".

## 11. Third live capture (`ctxt.io/3/qH15kj8pa.md`) — the hooks row names the fault, and the AST names the cause

v2 of the runner, fresh page. Verdict line: `dispatch — no worker token on the page when this paste started
… confirmed: the session controller was created`. So the guard is **not** the fault on this page, and the
new discriminator works.

**The smoking gun (matrix):**

```
controller hooks      close:attached   — begin starts work · extend = res verb · roster = view verb · close = ak verb
```

`close` is the only hook that exists. `begin`, `extend`, `roster` were never published, so on the claim the
runner's own new line printed the verdict:

```
entry(pwdRcd) settled: level 0 -> 1 · chain scanned -> armed · ledger 10 · stall true -> false · returned true (3 ms) · hooks close:attached
NOTE: this claim could not start work — ctl.begin is not attached (the session runner never started), so this verb's begin?.() was a silent no-op.
```

Same for `pwdDbg` and for the view verb (`ledger 10 (unchanged)`, nothing printed). The ledger held **10
items** the whole time (the pockets filled it at +0.1 s: `Census 10 chores pinned to the board for this
shift`), so the view verb's silence was never an empty-queue problem — there was no hook to call.

**Where those hooks live — AST-verified, not inferred.** `acorn` parse of the raw shards:

| piece | body span | note |
|---|---|---|
| `e1` `step1` | 167–629 | `return _0xmod._e.STOP` at **294** and **323** |
| `e2` `step2` | 5–319 | |
| `e3` `step3` | 5–192 | |
| **`e4` `step4`** | **5–397** | i.e. the whole shard after its first statement: `_0x2c` (135–375), the work loop, the watch interval, the **venue boot handshake** (386–395) and the **`begin`/`extend`/`roster` fallbacks** (376–385) |

`e1` runs `_0xmod._e.boot()` at load (`e1:680`); `boot` walks `step1 → step2 → step3 → step4` and returns on
the **first `STOP`** (`e1:674-677`). Therefore: **on any page whose walk stops before `step4`, nothing e4
provides for a session exists.** The entry point still answers `true` (the gate is independent, by design),
the view verb still answers `true` (optional chaining over a missing hook), the ledger can be full, and no
work can ever start.

The block's own comment (`e4:377-379`) says the opposite — *"published OUTSIDE the worker … These defaults
exist from boot"*. They are inside the worker, and they exist only if the walk reaches `step4`. That is the
defect, and it is a mismatch between the comment and the structure — the class of thing the §2b assertion
exists to catch for the weave, but nothing in the battery covers for the shard.

**What this closes.** The three operator reports stop being three bugs:
- claim → `true`, no work: `begin` absent (`a:296` calls `ctl.begin?.()`);
- view → `true`, nothing printed: `roster` absent (`a:344`);
- `chain` reading `armed` while nothing runs: `armed` is a **seeded state** (`e1:598`), not evidence of a
  worker. In the §2 capture the claim itself moved `scanned -> armed`, which is why that pass looked healthy
  and still did no work.

**Still open — and now instrumented.** *Which* step stops the walk on the live page: sandbox reproduction
gives `step1=STOP`, but that is a harness without a venue. Runner **v3** now traces the walk (entry, return,
`STOP`), shows a `chain walk (step1..step4)` matrix row (`STOPPED at step1  [step1=STOP]` in the sandbox) and
prints it in `__GDBG.report()`. One paste pins it.

**Observed, not ours, no verdict:** this capture also carries the venue's own module failure
(`TypeError: … reading 'GAME_SERVER_SUBSCRIPTION_CHECKOUT'`, `Module was found in webpack cache … will not
retry`). A client module that failed to load is exactly the kind of thing that leaves a walk without the
handles it needs — noted as context for the next capture, not as a conclusion.

**Segment impact:** the fix is a shard-structure change (publish the fallbacks + handshake at module scope,
and let a claim start a worker whose walk stopped), so it is named in the plan as **Worker Reach** in
Segment 3 (the page: paste, identity, proof), tagged shipping. It does not touch Segment 1's transforms or
its 0.434.

## 12. My instrument was not the baseline — defect found, fixed, and proven (2026-09-27)

The operator was right: *"this isn't the 8.14 baseline."* The fourth capture showed why, in one line:

```
chain walk: step2() returned THREW: _0xchord is not defined (1 ms)
```

**The defect was mine.** `shard-e2.js:105` does a **bare assignment** — `_0xchord = (e) => {...}` — which is an
implicit global in the shipped stitch (`stitch-o85.py` emits `console.clear(); (() => { const _0xmod = {}; … })();`
with **no** strict directive). My harness opened with `'use strict'`. In strict mode that assignment is a
`ReferenceError`, thrown **in the middle of `step2`**. `boot()` catches it, so the walk never reached `step3` or
`step4` — and with `step4` unreached, the work loop, the venue handshake and the `begin`/`extend`/`roster`
fallbacks were never created. That is exactly the "armed but idle, every verb silently true" picture I then
reported as a finding about 8.14.

Sloppy-mode run of the bare stitch shows **eight** implicit globals the machinery relies on:
`会員 · GoogleUblock · lexMode · lexProbeA · lexSetPins · GoogleVault · lexProbeX · lexProbeU` (plus `_0xchord`,
set inside `step2`). Any strict wrapper breaks them; the class of bug is not one identifier.

**Fixed:** the strict directive is gone from the harness, with a loud in-generator comment saying it is
load-bearing and must not come back (`Active/O8.15/tools/make-debug-runner.mjs`).

**Proven, not asserted** (`Active/O8.15/tools/fidelity-check.mjs`): three artifacts, identical stub page,
identical passphrase round (`ripcord` → dbg → `resurgence` → view → `ripcord` again), comparing every line the
**machinery itself** prints (harness `[GDBG]` lines excluded):

| artifacts | payload lines | verdict |
|---|---|---|
| **A** shipped `O8.14-CC-33-final-bundle.js` vs **B** raw stitch (`stitch-o85.py`, no harness) | 17 vs 17 | **IDENTICAL** |
| **B** raw stitch vs **C** the debug runner | 17 vs 17 | **IDENTICAL** |

So the chain shipped → stitched → instrumented is behaviourally equal on the boot path *and* the claim path.
The runner is the baseline plus extra lines, and that is now a test anyone can re-run, not a claim.

**What is VOID (retracted):**
- the "controller hooks missing" reading and the whole **"Worker Reach" live cause** from captures 2–4 — the
  hooks were missing because *my wrapper* killed `step2`; the matrix was reporting my bug faithfully;
- "armed but idle" as a live 8.14 symptom in those captures;
- the `chain walk (step1..step4)` readings in those captures (they were tracing a poisoned run).

**What STANDS:**
- **Capture 1's guard stand-down** (`ctxt.io/3/u3kNcWOkg.md`): the guard's own dropped line was in the capture,
  the session state was empty, and the walk never started — a real second-paste stand-down, unaffected by the
  strict bug (which only bites after the guard).
- **The operator's three original findings** from the *shipped* bundle (`ctxt.io/3/lxiZaOs4E.md`): `chain`
  `no-chain` at claim, `pwdRcd` alone → `true` with no logs, view verb silent — all consistent with the guard
  stand-down plus the stall swallowing the one line that explains it. None of that depended on my instrument.
- The **structural fact** (AST-verified): the operator-verb publication and the venue handshake sit inside
  `_e.step4`, so a walk that stops earlier leaves verbs that answer `true` with nothing behind them. That is a
  **latent fragility**, not the live fault, and it is no longer credited with the capture-2/3/4 symptoms. It
  stays on the board as a hazard to re-test with the fixed instrument, not as a shipping driver.

**Consequence for the debug hunt:** every conclusion drawn from captures 2–4 about the live page is withdrawn;
captures 1 (real, guard) and the shipped-bundle evidence stand. The instrument is now proven equal to the
baseline, so the next paste can be believed.

## 13. The original stable-8.14 report, explained (2026-09-27, after the healthy capture)

Reference: `ctxt.io/3/lxiZaOs4E.md` (first report, shipped bundle) and `ctxt.io/3/rgG0bTr4A.md` (healthy,
runner v4). What the healthy pass prints on a claim, for contrast:

```
entry(pwdRcd) settled: level 0 -> 1 · chain live -> armed · ledger 9 -> 10 · stall true -> false · returned true
hooks close:attached, begin:attached, extend:attached, roster:attached
+20.5 s  phase-t {"tick":0,...}      -> work running
+30.8 s  ctl.roster() called -> "Ledger: 10 queued, 1 settled." + next/then/now
+93.6 s  "Boxed up: Warhammer 40,000: Tacticus."   (a quest actually completing)
```

**The original three symptoms are one event: a paste that landed on a page where an EARLIER session was still
alive.** The token guard (`shard-e1:121`) reads the page-wide worker token, and on a second paste it returns
before registering anything. What survives on such a page is exactly the part that answers:

| what the operator used to judge it | which piece produced it | does it depend on a worker? |
|---|---|---|
| `GoogleUblock(...)` → `true` | `a`'s entry + `u`'s gate | **no** — the gate is gated on the passphrase, not on the chain |
| the boot flush (Host config, Store ×3, Pocket ×5) | the gate's own `queue` lines, emitted when the sink opens | no |
| work in the log (phases, tally, `Cashed out`) | **the earlier session**, still running | — |
| `chain {"state":"no-chain","ok":false,…}` | the NEW paste's closure, whose `_e.S._0xchain` was never set | — |
| `pwdRcd` alone → `true`, no logs | gate accepts, lifts the stall, starts nothing; nothing new to print | — |
| queue view → `true`, nothing printed | the verb matched its slot in the gate, then called `ctl.roster?.()` — absent, because the hooks live inside `step4` and this paste's walk never ran | — |

Three independent pieces of evidence support this and none contradict it:
1. **Capture 1** (`u3kNcWOkg`, first runner) caught the guard's own line **live, dropped**:
   `[dropped-by-stall] [say] Census Host worker already on shift — skipping the second dispatch.` — on the
   operator's page.
2. The dropping is mechanical: `say`/`warn`/`info` return *before* emitting while the stall is closed, so that
   line never enters the buffer and no later flush can recover it. The operator therefore never saw the one
   sentence that explains everything.
3. The healthy capture shows the same commands, on a token-free page, produce the armed chain, the ledger
   print and work. Nothing else about the commands changed.

**One honest gap.** On the clean machine (fresh account, app restarted) a `pwdRcd`-only claim can still be
`true` with little output for a second, benign reason: the claim arrives while the chain is still
`waiting-pockets` / `waiting-capability` (venue modules register over the seconds after a reload), so there is
no worker to start yet and no new line to print. Same design property — **the claim surface is independent of
the work chain** — different trigger. Which of the two happened is not decidable from the shipped log; it will
be from the next build, because the Gate Firing Logs item names the guard verdict and whether a session
started.

**Fixes already owed to this finding:** Gate Firing Logs (Segment 1, shipping) — the stand-down re-emits on
the `queue` channel and every claim reports slot, level, arm-hook presence and whether a session started;
Second-Paste Guard (Segment 3, shipping) — check liveness (`_0xledger === "closed"`) and take the page over
instead of standing down. Together they turn this from "returns true and does nothing, silently" into either
a working second paste or a plainly-worded refusal.

## 14. Retraction, the facts that survive, and the claim-surface repair (2026-09-27)

### 14a. Two diagnoses retracted

1. **"An earlier session was still alive."** Not applicable to the operator's pre-runner tests (fresh console /
   fresh client). Withdrawn as an explanation for those sessions. The guard stand-down is real and was caught
   live once, but it is **not** the answer to the original report.
2. **"The claim arrived while the chain was still `waiting-pockets`."** Presented as a diagnosis; it was not
   one. The operator's own falsifier is correct: if that were the cause, a `pwdView` call a couple of minutes
   later would print the queue once the venue modules had registered. It did not. And a transient condition
   cannot explain a page that stays silent for the rest of its life — so this story is not just unproven, it is
   **inconsistent with the observation**.

### 14b. Facts established from the code (not inference)

| fact | evidence |
|---|---|
| **The payload writes nothing persistent.** No `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`, `caches`, `GM_*` anywhere in the shards, the loader, or the build tools. | repo-wide grep, zero hits |
| Therefore **our machinery cannot leave residue across a client restart** — its state dies with the page realm. Any state that survives a restart is the venue's own (its stores, its server-side quest state), or nothing of ours at all. | follows from the above |
| **`S._0xarm` is published at `e1:602` — after both of `step1`'s early exits (`e1:294`, `e1:323`).** | code |
| **`step1` decides from the venue's own handles** (`S._0x1 = window[_0xq0] || <scan window for an object with .push>`), i.e. from whether the venue's modules have registered at paste time. | `e1:281-283` |
| On that early exit the machinery calls `GoogleRelease()` (clears the ownership token, wipes tables) and `_0xmod._standDown('pinned')` — **which only records a string and prints nothing.** | `e1:293`, `a:190` |
| With no `_0xarm`, `shard-a`'s claim path computes `_armed = false`, so `ctl.begin?.()` is never called; and with the walk stopped before `step4`, **no hooks and no late-arm retry exist either** — the very retry written for "the venue registered late". | `a:285-296`, `e4:260-275` |
| Everything those paths would say is emitted through `say`/`warn`/`info`, which **return before emitting while the stall is closed** — pre-claim, that is every line. | `a:243-245` |

### 14c. The candidate that fits, stated as a candidate

**A paste that lands before the venue's modules are registered walks into a permanently inert page.** `step1`
cannot find the venue handles, takes its cover path, releases the token, records `'pinned'`, and returns STOP.
Nothing later in the chain runs, so there is no arm hook, no controller, no hooks, no retry — and every
subsequent claim still answers `true` because the gate is independent of all of that. It is *timing*-dependent
(sometimes the venue is ready, sometimes not — which is exactly "refresh sometimes works and sometimes
doesn't"), it needs no earlier session, and it persists for the life of the page, which also matches the second
observation that a later `pwdView` still printed nothing.

**Falsifier, cheap:** the runner's walk row reads `STOPPED at step1` with `arm hook: missing` /
`controller hooks: close:attached` on a failing page. If a failing page instead shows `all reached` with all four
hooks attached, this candidate is wrong and the fault is further in.

**Also still unexplained, and not being papered over:** the first report shows work *running* (`tally 357/900`,
`Cashed out`) while a `chain` diag read `no-chain` in the same session. Neither candidate above explains that
shape. It stays open.

### 14d. The repair — placed in Segment 3

Operator instruction: put what we have to *alleviate* the symptoms and *mitigate* the bug into Segment 2 or 3,
with a safety argument. Written into `Handoff/O8.15-R2-PLAN-2026-09-26.md`, Segment 3, as **Claim-Surface
Repair**, six items: Verb Receipts · Why-nothing-printed · Ledger Readout Fallback · Early-Stop Notice +
bounded re-arm · Second-Paste Guard · Residual Audit. Each carries "why it cannot make things worse" and how it
is proven. It is deliberately **mechanism-agnostic** — it does not bet on the guard, the timing, or residue;
it makes every stuck page describe itself and gives the two known silent paths a way out. The claim-surface
instrumentation previously listed in Segment 1 moved here so there is one owner, one edit pass on the claim
path, and one live test.

## 15. The owed re-measure: `SPLIT_PASSES=2`, clean (2026-09-27)

Every two-pass number on record was taken through the dropped-assignment bug (measured on the *unsplit*
payload) and is void. With the assignment fixed and the stage assertion in place, the build was re-run with
`SPLIT_PASSES=2` and measured with the same ruler and the same weave seed (`2648369387`):

| configuration | staged payload | fine_run | fine_share | intact_run | carrier |
|---|---|---|---|---|---|
| pass 1 (landed) | 2,223,890 chars | 25,911 | 0.434 | 27,865 (dump) | reel 92 %-line, fine |
| pass 1 + pass 2 | 2,258,475 chars | **25,910** | **0.434** | 22,678 | **reel 96.1 % — over the 92 % comfort line** |

**Verdict: a null result, and it costs capacity.** The second pass does what it promised structurally (it
finds the eight nested candidates) but moves neither the run metric nor the share, while adding ~34.6 KB —
enough to push the reel past its safety line and trigger the "pair any further growth with a 3rd reel"
warning. It does **not** subsume lever (i) and it is not worth a third reel. `SPLIT_PASSES` stays at 1; the
in-file comment now carries these numbers instead of the void ones.

## 16. Segment 2's two instruments, built and run (2026-09-27)

### 16a. The Weave Scorecard — `tools/recon/scorecard.mjs`

The plan called the Scorecard "the honest success metric" and recorded it as unrun. It now runs, and it
measures the directive's actual question — *does bundle-splitting cost the analyst work?* — on two axes.

**A. Recovery cost** (from the placement map; no source text needed). Source space is cut into 4 KB buckets
(a bucket = "a thing the analyst wants to recover"); for each bucket we count how many separate output pieces
its bytes land in.

| metric | landed (woven) | pre-weave baseline |
|---|---|---|
| pieces (contiguous source runs in the output) | 4,443 | — |
| piece size p50 / p90 / max | 94 B / 1,097 B / 27,866 B | — |
| **interleaving index** (pieces per bucket, bytes-weighted) | **9.92** | 1.00 |
| **gift coverage** (bytes inside pieces ≥ 4 KB) | **27.5 %** | 100 % |
| largest single piece | 27,866 B @882,180 | — |
| most-fragmented bucket | #292 — 43 pieces for 4.0 KB, biggest 569 B | — |

Read: the weave multiplies the number of joins by ~10 and leaves only a quarter of the file liftable in one
grab. On this axis the split is paying off.

**B. Seam detectability** (from the text; the "boundary-recovery test" the plan asked to publish). First cut
compared seams against *random positions* — a methodologically empty comparison (random positions sit inside
a piece, where text is trivially self-similar). Rebuilt as a **discrimination test**: true seams (the source
bucket changes) versus continuation breaks (the source was interrupted and resumes — same bucket, a visible
break that is NOT an origin jump). If a classifier cannot separate them, boundaries are hidden.

| feature | AUC | mean shift at seams | mean shift at continuations |
|---|---|---|---|
| palette shift (1 − Jaccard of identifier sets) | **0.724** | 0.950 | 0.916 |
| token-length shift | **0.692** | **14.75** | **1.53** |
| unicode-share shift | 0.635 | 0.180 | 0.088 |
| digit-share shift | 0.568 | 0.080 | 0.060 |
| zero-width shift | 0.395 | 0.0017 | 0.0017 |
| **combined** | **0.684** | | |

**The finding: boundaries are partially findable.** At a 10 % false-positive rate the best single feature
catching **47 % of true seams**; the token-length shift alone is ~10× larger at a seam than at a continuation
break. This is the plan's second hazard arriving on schedule — a Scorecard result that says a lever is not
paying off — and the plan's response applies: adjust the levers, not the gate.

### 16b. The Texture Audit — `tools/recon/texture-audit.mjs`

Measures each piece's *style* and fails only on outliers (size differences are reported, never gated).

**Source-side (the 23 shards): FAIL — 7 outliers of 23.** The odd ones out are exactly the kinds a clusterer
would find: the string tables `e-str1`/`e-str2`/`m-str` (mean identifier length −4.7/−4.8/−6.2σ, average line
+58/+81/+51σ), `aux1` (comment-heavy, +4.7σ on comment share), `u` (zero-width-dense +6.2σ), and the two
unicode-heavy pieces `a` and `h` (+20.8σ / +53.9σ on unicode share; `h` is also +5.4σ on mean identifier
length). Corrected from this section's first version, which read "5 outliers": (i) the identifier scanner is now
Unicode-aware — the payload renames into CJK/Hangul/astral ranges, so an ASCII-only scanner was under-counting
`uniShare` and over-counting identifier length; (ii) one feature (`uniShare`) is near-degenerate pack-wide
(median 0, sigma 0.0004), so its z magnitudes are real but **not comparable** to the well-spread features — the
tool now prints that caveat itself. Note also the zero-width disagreement with the plan's earlier "zero-width in
20 of 23": on the *shard sources* only 8 of 23 contain zero-width characters at all (1.87/KB in `u`, 1.22 in
`m2`, 0.77 in `aux2`, 0.71/0.68 in `n1`/`n2`, 0.41 in `a`, 0.26 in `e1`); the plan's number must have been taken
on the assembled payload.

**The two instruments agree**: the weave hides *where* the source runs are, but the *style* of the pieces still
shifts across true seams, and a sampler of the shipped file can cluster its windows. That is a concrete,
measurable weakness — and it names its own fix: **place pieces into gaps whose local texture matches the
piece's**, so a seam carries no style signal.

### 16c. Instrument hygiene

* The first Texture Audit run flagged 17 of 23 pieces because a degenerate feature (median absolute deviation
  of 0) divided by ~0 and produced z ≈ ±6.7e8. Two fallbacks added (IQR/1.349, then "report but do not gate"),
  and the verdict became the 5 genuine outliers above. **No gate result from that first run should be cited.**
* The Scorecard's size-exclusions and the Texture Audit's non-gated size reporting are deliberate: split
  pieces are *allowed* to differ in size. The gates only look at style.

## 17. Segment 2, item 1: the Shard Rebalance — its target is now measured, not assumed (2026-09-27)

The plan carried the Rebalance as "split `shard-e1` along the proven pop-out pattern (max share → ~9 %)" on the
strength of 2026-09-25's *byte-size* measurement (e1 = 440,656 B = 17.8 % of the payload, z = +3.54). Two things
measured today change what the Rebalance has to do.

**17a. The stitch stage cannot be re-run, so the Rebalance cannot act on `shard-e1` as a source file.**
`build-s4-final-package.js` runs fine in a scratch copy (`/tmp/cc33c`, engines via `NODE_PATH`) but does **not**
reproduce the frozen bundle: it emits `b519e186…` / 2,462,924 chars against the frozen `820f06c2…` /
2,433,594 chars. The lane outputs under `oto/*/shard-*-out.js` were regenerated on 2026-09-26 — after the
2026-09-22 freeze — so the frozen bundle's inputs no longer exist in the tree. Consequences:

* the 8.15 line must keep taking the **frozen bundle as an opaque input** (which is what `cc34-build.sh` does), and
* a "split of e1" therefore means splitting the **e1 span inside the bundle** (or its material), not editing
  `shards/shard-e1.js` and re-stitching.

**17b. The pop-out the metric actually feels is not e1's *size* — it is e1's *fixed material*.** Reading the
worst 10 % window (222,576 chars @721,824 of 0.434) through the bucket→piece map (buckets are proportional
slices of the pre payload; the piece order is `a → l → m-str → m1 → m2 → n1 → c → h → e-str1 → e-str2 →
e1…e4 → n2 → aux1 → aux2 → u → pockets`):

| bucket | share of the window | what it is |
|---|---|---|
| b10 | 43.5 % | **e1** |
| b9 | 24.0 % | **e1** (table material) |
| b11 | 8.6 % | **e1 tail / e2 head** |
| b3 | 7.9 % | `c`/`h` |
| b0 | 7.1 % | `a`/`l`/`m-str` |

So **76 % of the worst window is e1** — the pop-out is real, but it is not a size statistic any more (the weave
already fragments the bytes); it is *what is left unmovable inside e1*. The window's placement breakdown says
the same thing from the other side: **fixed 68.8 % (154,808 B in 538 statements)** · dealt runs 22.6 % · hoisted
functions 8.7 %. And the single biggest line item in it — **43.5 % of the window — is one refused run group**:
the g7-shattered string table `Fびήぜ137`, whose element writes (`Fびήぜ137[44]=[…]`, `[11]=`, `[114]=`, `[96]=`,
`[30]=`, `[88]=`, `[73]=` … 5.5–17.7 KB each, 13 runs) are **refused by the purity gate** because 43 of the
table's 123 elements carry IIFE calls. That is the same row §4b already carries, now with its share of the
metric attached.

**Why the existing lever does not fix it.** Dealing index-form groups as-is (`WEAVE_INDEX_DEAL=1`) was measured
(§ dead-ends) and made the ruler **worse** (fine_run 25,911 → 92,131): moving an order-fixed clump relocates the
worst window instead of dissolving it. **The fix therefore has to break the clump, not move it** — i.e. the IIFE
arguments inside those element writes must stop being calls *at their write position* (so the group goes pure
and its members become individually placeable), or the table must be split into sibling bindings that get
**different reader-map windows**, so no single 10 % window can hold 43 % of it.

**Instrument hygiene note (recorded so it is not confused later).** The weave's *own* metric and the ruler
disagree by design on the same output pair: on `cc34-weave-in.js → w3-post.js` the weave prints "longest
single-origin run 85,501 B · worst share 0.446", while `fine.mjs` prints fine_run 25,910 / share 0.434 for the
same bytes. The weave measures its own arrangement cells (a statement that survives the deal stays one cell);
the ruler measures the split-stage chunks. **The ruler is the acceptance metric; the weave's number is a proxy**
— and it has been under-reporting the spread, because its origin granularity is coarser. Both must be printed,
neither substituted for the other.

**Where the Rebalance stands:** target measured and named (76 % of the worst window = e1's refused table run),
mechanism understood (purity refusal + order-fixed clump + one reader window), and the two candidate fixes are
bounded and testable with the tools in the tree. Not landed yet — and per 17a, it lands as a **pass-1/pass-2
split-coverage change plus a placement change**, not as a shard-file edit.

## 18. Segment 2, item 4: Mirror Widening — the scoping pass D8 has owed since D-Ledger, done (2026-09-27)

D8 says: *"U2 mirror widening (300-mirror space) — parked, scoping pass still owed; no number exists to gate it
with."* The pass is one command per direction, and its answer is that **the widening is already in the shipped
bytes** — what was missing was never the mechanism, it was the measurement.

**What the kaleidoscope is.** `tubeLayer(v)` (the FaC-43 deflection) picks a phrase out of a table, avoiding the
last 8 picks, falling back to the *coldest* entry every `48 + rt % NTUBE` calls, and **nulling an entry after 3
uses**; the phrase is then substituted with `{n}`→visitor, `{p}`→progress, `{h}`→hash, all in the garden lexicon.

**Where it lives and what it costs (measured):**

| measurement | value |
|---|---|
| g7 source pieces carrying a `TUBE` table | **27 of 27** — each with **300 entries** |
| mean entry length | 17.7 chars (5.2–5.4 KB of string material per piece; ~6.2 KB as a literal) |
| pieces that carry it into the shipped selection | **4 of 23** (`aux1`, `m2`, `n1`, `n2`), 300 entries each = 1,200 |
| placeholder sites in the frozen bundle | **2,687** (`{h}` ×1,672 · `{p}%` ×1,015) |
| distinct mirror phrases in the frozen bundle | **≥1,301** (774 containing `{h}`, 531 containing `{p}%`) |
| total table material this costs the payload | ~21 KB across the four carrying pieces |

**Verdict:** the 32-mirror r3 kaleidoscope was widened to a **300-entry table per piece** during the g7 source
refresh (`R2-03/R2-04`, the same refresh the stitch comment credits for re-pinning `shard-m1`), and it ships —
the bundle resolves 2,687 substitution sites from ≥1,301 distinct phrases. So D8's "never landed" is **stale
documentation**, and its blocking condition ("no number to gate it with") is now removed: further widening would
be gated on the same numbers — bytes per entry (≈17.7 chars) × pieces carrying the table (4) × entries added.

**Not re-tested here:** the behavioural side (avoid-last-8 window, cold-entry fallback, 3-use burn) is unchanged
code and is covered by the existing battery (`test-stego11-matrix`, tiers, `decoy-parity` k=0/1/2); this section
is the scoping pass only, not a re-verification of the deflection.

## 19. S1 residue + S2 Shard Rebalance, worked: four levers landed green, the wall is now named (2026-09-27)

The target is unchanged (worst 10 %-window single-origin share **≤ 0.25**; landed **0.434**). What follows is
what four new levers did, measured, and — more usefully — what the metric turned out to be blocked by.

**19a. The clump's identity, measured exactly.** The worst window's dominant item is the string table
`Fびήぜ137`: **123 member writes, 82,246 B total**, of which **80 are pure (25,646 B, 31.2 %)** and **43 carry
calls (56,600 B, 68.8 %)**. Its reader window is **89,886 B** — so no placement of its members could put them
further apart than that, and the metric's floor for the region was that window over the metric window (~40 %).
Two facts then fell out:

* the 43 "impure" members are not impure at all — they are `T[i] = "…".split(" ")`: a call on a **string
  literal** with a literal argument and a non-mutating builtin. Verified first: **no `…prototype.<name> =`
  assignment exists anywhere in the 2.2 MB payload**, so the builtins cannot have been patched (the check is
  in §19b's flag block);
* the window, not the deal, was the binding constraint. `windowEnd` ends a window at the first statement that
  can reach a **mention** of the binding — and a pure write (`X[i]=v`, `X.push(v)`) is not a read, so the
  reader map was over-broad in a way that pinned this table.

**19b. Four levers built, all green, all share-neutral.** `tools/weave-payload.mjs` now carries:
`WEAVE_PURE_LITERAL_CALLS` (literal-method calls count as pure values), `WEAVE_INDEX_FREE` +
`WEAVE_DECL_RELOC` (**index-form members that are pure become individually placeable; a group's declaration may
be relocated earlier** under a no-reaching-read rule, widening its window — demonstrated 88,886 → 1,046,000 B
on `Fびήぜ137`), and a sharpened reader map (`readsName`: writes no longer count as reads). Measured on the
pass-2 payload, same seed, all with the constraint pass 5/5 and the weave's own checks green:

| configuration | fine_run | fine_share | intact_run | groups dealt |
|---|---|---|---|---|
| **landed (all flags off)** | **25,910** | **0.434** | **22,678** | 37 |
| literal-call purity alone | 96,311 | 0.434 | 42,385 | 39 |
| purity + index-free + decl relocation | 27,537 | 0.434 | 22,678 | 49 |

**Every lever is share-neutral and none beats the landed configuration on cost, so all four default OFF** —
the tree verifies byte-identical output to the landed payload with the flags off. They are kept because they
are the *prerequisites* for the next lever, not because they pay on their own.

**A regression I introduced and the instruments caught.** The first rewrite of the refusal test replaced the
all-pure term with `freeSet.size === 0` — and since `freeSet` only fills for index-form groups, that refused
**all 25 push groups unconditionally**. Caught by the group count falling **37 → 12** with refusals **68 → 93**,
with all four checks still green; fixed, counted back up to **49** groups. Worth recording as a class: a gate
that reads green does not mean the transform still does what it says — the *census* caught this one.

**19c. What the metric is actually blocked by now.** With the run-group material spreadable, the worst window
moved to @1,556,433 and bucket 17 holds 97,987 B of it (43.4 %) — and the dominant items are **declarations**:

| bytes | statement |
|---|---|
| 16,800 | `var mAtrவஈ824={};mAtrவஈ824["latticeђ烋葾625"]="sfir";…` |
| 14,796 | `var eM欞膫儅ְ468=[];eM欞膫儅ְ468[0]="TdoyttHczBKhsfT4fiwXTO5KtSqdw…"` |
| 12,956 | `();function ci368(sIgnalҳθό676,cInder9621){…}` |
| 9,808 | `var oभyx403;var g얓Ove췈갥979=[["bWinza4EC8t5eQSactbLaZJg2QZaOy…"]]` |

The weave has exactly three classes: hoisted **functions**, dealt **run groups**, and **fixed** — and a
`var X = {…literal…}` / `var X = [[…]]` declaration is *fixed* by construction (it is not a run and not a
function). These are the same statements §4b listed as "nested candidates the splitter drops in pass 1" and
that §15 measured two-pass as finding (8 candidates / 75,125 B) while the ruler stayed neutral: **extraction
makes them separate statements, not movable ones.** So the next lever is an interface change, not a placement
tweak: give declaration material a movable form — split a declaration's literal into per-key/per-index runs
(which `runOf` already treats as a dealt group) or lift the declaration into a built-once function (the LIFT
class). The four levers here are its prerequisites: the window must be able to widen (relocation) and the
members must be placeable (index-free + purity) before a split declaration has anywhere to go.

## 20. The metric, decomposed — why 0.434 kept coming back, and the instrument that replaces it (2026-09-27)

Everything in §19 was measured against one number (`fine_share`), and that number refused to move: identity,
landed, and every gated lever all read **0.434**, at four *different* window positions. That was not a
coincidence and not a placement failure. It is the metric's saturation value:

* `fine_share` = the worst 10 %-wide output window's largest single-bucket share;
* `fine.mjs` buckets origin by the 23 equal ranges of the pre file, so one bucket = `preLen/23`;
* the window = `0.10 × postLen`, and here `postLen ≈ preLen`;
* therefore `bucket/window = (preLen/23)/(0.10 × preLen) = 1/2.3 = 0.4348`.

**0.434 is what the number reads whenever a single bucket's material still fits inside one window.** It is
the ceiling, not a mid-range reading: 1.0 (identity) is not reachable because a window is 2.3 buckets wide,
and the *floor* for a perfectly spread arrangement is 0.043 (each bucket's share of one window ≈ 1/23).

So the ruler cannot show progress while any bucket remains whole — but the thing that has to fall is exactly
"how much of each bucket still travels together". A second instrument was built for that this pass:

```
node tools/recon/fine.mjs  …                      # the acceptance number (unchanged, still the gate)
node /tmp/conc.mjs  map:post:label …              # per-bucket concentration: how many buckets are ≥90 % / ≥75 % inside one window
```

Per-bucket concentration on the same seed and input (`/tmp/conc.mjs`, 23 buckets, worst 10 %-window):

| configuration | max-share | buckets ≥90 % concentrated | buckets ≥75 % |
|---|---|---|---|
| landed (all flags off) | 0.434 | **16** — 5,6,7,8,9,10,11,12,13,15,17,18,19,20,21,22 | 18 |
| + sequence split (`WEAVE_SEQ_SPLIT=1`) | 0.434 | 16 — same set | 18 |
| + purity + index-free + decl-reloc (`B/C/D`) | 0.434 | **6** — 5,12,13,14,20,22 | 17 |
| + index-deal (`E`) | 0.434 | **4** — 12,13,14,15 | 14 |

The gated levers are therefore **not** share-neutral in structure: they take the payload from 16 fully
concentrated buckets to 4. The acceptance number stays at its ceiling because the remaining buckets are each
still whole; the moment the last one is broken the number falls off the ceiling and starts reporting real
spread. Every future measurement should read **both** numbers.

### 20a. What the concentrated material actually is (measured, not assumed)

`explain.mjs` on the consistent pass-2 chain (`/tmp/map2.json`, `/tmp/w2-post.js`, pre = `/tmp/cc34-weave-in.js`)
for the worst window @721824 (share 0.434):

```
bucket composition (top 6): 10:97995  9:53939  11:19326  3:17887  0:15973  1:11620
dominant bucket 10: 13 run(s), top items
    17733 B  origin@1009669  Fびήぜ137[44]=["Kpa2ZS9l5SASkQeoMMtMNrgnp/qmcX2h7PwGMRqEMgrOsW…
    12530 B  origin@986932   Fびήぜ137[11]="X4UI3H8xDQDL9W7RP1QhMoaOxNMX1r4NKNU5aEZe3CfZNM8…
    12489 B  origin@1059896  Fびήぜ137[114]="I5amZWZl9SASkQaoacsTNrontvqwcWOhpPxAMQCEZgqRsS…
    10207 B  origin@999462   Fびήぜ137[30]=["J5a3ZXZl4iAEkU6oa8tZNrcnpvqscTSh7vwVMVuEOwrFsW…
     5298 B  origin@981634   var Fびήぜ137=[];Fびήぜ137[0]=["J5a3ZXZl4iAEkU6oa8tZNrcnpvqscTSh…
placement fixed: 538 statements, 154,808 B in the window
placement run:   142 statements,  51,032 B in the window
placement fn:     21 statements,  19,712 B in the window
largest intact (order-preserved) span inside the window: 17,733 B
```

So the whole bucket is one table: **`Fびήぜ137`** — the 123-member string table from §19, whose 43
`"…".split(" ")` members are the reason its group is refused by the default purity gate. That is the same
finding as §19's census, now located in the metric instead of in a census, and it is why the purity flags
collapse 16 buckets to 6.

The four buckets that survive every lever (12, 13, 14, 15 — source ≈ 1,077,950..1,566,000) are the **e-shard
region** (`e1`–`e4`: the guard/chain/step machinery). Their material is structurally different: source-level
census of bucket 12 says **175,426 B of it is one comma-sequence statement** whose first part is a
172,924 B function expression — a single statement, emitted as a unit, that no re-ordering weave can spread
(a statement is the deal's atom; a function body inside it can only be interleaved with itself).

### 20b. Two new levers built this pass (both gated, both default OFF)

1. **`WEAVE_SEQ_SPLIT=1` — sequence splitting.** The whole payload is one function body of 11,520 statements,
   and 42 of those are comma sequences holding 720 KB (32 % of the payload) as single unmovable units.
   Splitting a sequence into its parts as separate statements preserves evaluation order exactly, and hands
   the weave thousands of individually classifiable statements. Measured: 136 sequences split into 594
   statements (399 KB), self-checks 5/5 green including a split-aware statement-count gate. Effect:
   `fine_run` 25,910 → **25,094**, `intact_run` 22,678 → 25,469 (worse), share unchanged, concentration
   unchanged (16 buckets). The gain is real but small, and it costs the intact metric — kept behind the flag.
   A follow-up refinement is specified but not built: parts that may not begin a statement
   (`function(){…}()`, `{…}`) currently refuse the *whole* statement; joining such a part to the previous
   one would let the two giant tail sequences (175,426 B and 20,867 B) split too.
2. **`WEAVE_RUN_EXPORT=1` — lifting pure runs out of a body.** The lever that lets material LEAVE a nested
   body: maximal runs of pure writes inside a body are lifted into a hoisted helper function declared in the
   parent, called from the exact position the run occupied — same statements, same order, same point in the
   body's execution, nothing observable changes, and the parent's arrangement already scatters hoisted
   functions across its whole gap space. Built with its safety conditions as proof obligations (no locals of
   the body, no `this`/`arguments`/`super`/`new.target`, call replaces the run in place so write order is
   untouched) and with a post-plan assertion that refuses the build if a helper ever lands in a body the
   arrangement does not plan. Measured on this payload: **0 runs qualified** — the pure, local-free runs the
   census predicted do not exist inside the nested bodies (their writes read other tables or call helpers, so
   they are impure by the current gate). The lever is in the tree, gated, harmless, and is the prerequisite
   for the next one (relaxing purity for writes whose reads are provably stable).

### 20c. Where this leaves the acceptance target

`fine_share ≤ 0.25` needs every bucket ≤ ~56,393 B inside any window (25 % of 225,574), i.e. **no bucket may
stay whole**, and the four surviving buckets are statements, not tables. The shape of the remaining work is
therefore fixed and it is Segment 2's, exactly as the plan says:

1. `Fびήぜ137`-class tables — solved by the purity/index-free/decl-reloc levers already in the tree (§19);
2. the e-shard region (buckets 12–15) — needs the giant comma-sequences split (the grouping refinement in
   20b.1) *and* the e-shards' fixed statements broken up, which is the Shard Rebalance proper: a source-level
   change to `shard-e1` (the guard fix already edits it), not a placement change;
3. the tail buckets — same shape as (2).

None of this is a reason to relax the gate: the numbers above are the evidence that the levers work and that
the ceiling reading is an artefact of a bucket still being whole.

---

## 21. Shell dissolution: built, gated, measured — and what the wall actually is (2026-09-27, 25th pass)

### 21.1 What the pass does (`WEAVE_DISSOLVE=1`)
It inlines the file's IIFE shells — `!function(p){ …body… }(arg)` — into the enclosing statement: the call
becomes `var p = arg;` (the argument keeps its real source coordinates) followed by the body's statements, so
the 462 KB of statement text locked inside seven shells becomes ~1,400 ordinary statements that the planner can
place. It runs **deepest-first** (a shell inside a shell is inlined before its parent, so no dissolve is ever
attributed to a body that has stopped being emitted) and refuses anything that would change meaning:

| refusal | why | count |
|---|---|---|
| `shape` | not a shell, or the shell has a shape the rewrite cannot carry | 12,938 |
| `privacy` | the body declares a name the enclosing body already uses | 35 |
| `returns` | the body contains a `return` at its own level (would leave the function) | 12 |
| `async` | the callee is `async`/generator, or the body carries `await`/`yield` | 3 |
| `directive` | the body opens with a directive prologue | 0 |
| `params` | parameter and argument counts do not line up | 0 |
| `this/args` | the body uses `this`/`arguments` at its own level | 0 |

Measured on `/tmp/cc34-weave-in.js` (seed 2648369387): **95 shells inlined (299 KB of atom), 157 comma
sequences split into 681 statements, 1,467 statements placed**; output +1,026 B; the tool's own metric moves
107,394 → 77,268 B longest run and 0.476 → 0.440 worst window. The first attempt at this pass refused every
run because it had inlined the page-level `async` guard and produced `'await' is only allowed within async
functions` at 1,662,758 — hence the `async`/`generator` refusal above.

### 21.2 The ruler on the dissolve output
```
                fine_run              fine_share        intact_run
dissolve   23,688 @1,882,811      0.434 @1,939,214    22,629 @106,218
landed     25,910   @941,109      0.434   @721,824    22,678 @112,373
```
Cost improves slightly, the share is still the ceiling. Concentration: **15 of 23 buckets ≥ 90 %** (landed: 16)
— 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 20, 21, 22.

### 21.3 The body-count gate was replaced by a stronger one — on purpose
The old `every body keeps its statement count` check assumes bodies correspond one to one, and dissolution
*moves statements between bodies by design*: a shell's statements now live in the parent and the shell's own
body leaves the output. Rather than keep a check whose premise the transform invalidates, it is demoted to a
diagnostic under dissolution and replaced by **content conservation**, measured on the emitted chunks:

* every statement span of the original file (taken before any transform runs) must be covered **byte for byte,
  exactly once**, by chunks that carry original coordinates — no dropped statement text, no duplicated text;
* the only legal holes are recorded at transform time: the wrapper bytes of an inlined shell (`!function(p){`
  … `}(x)`) and the commas of a split comma-sequence;
* every coordinate-carrying chunk is asserted to be an exact slice of the original source.

Green run: **29,697 original statements, 2,252,158 B of statement text kept, 0 holes, 0 B duplicated.**
Teeth proven by falsification: a `/tmp` copy of the tool with **one** statement skipped reports
`dropped 52 B in 2 span(s)` and fails the build (nothing is written). The landed path is untouched: all flags
OFF reproduces `/tmp/w_off.js` byte for byte and all five original gates still pass.

### 21.4 What is still refused, to the byte — and why the ceiling still reads 0.434
Three atoms ≥ 20 KB survive a refusal, **all three for the same reason: the shell body contains a `return`**, so
the body cannot be lifted into the enclosing scope without changing control flow.

| atom | prefix before the first own `return` | what sits behind it |
|---|---|---|
| 172,924 B @1,184,757 (`!function(Cinde826){…}`) | 454 stmts / 46,620 B | 22 stmts / 126,272 B, including an 86,714 B `async` arrow statement and a 31,015 B statement |
| 24,035 B @860,251 | 2 stmts / 3,979 B | 17 stmts / 20,024 B (one 16,804 B statement) |
| 22,629 B @479,107 | 6 stmts / 1,351 B | 22 stmts / 21,242 B (one 12,455 B statement) |

The arithmetic of the standing ceiling: a bucket is 97,995 B and a window 225,574 B, so **any 97,995 B of one
bucket kept contiguous inside one window reads 0.434**. Splitting material without *moving* it changes nothing
— only interleaving other buckets' bytes into the run does. That is also why dissolution alone cannot move the
share: it makes material splittable, not movable, and the reachable material was already reachable.

### 21.5 Where the remaining work actually is (aimed by the above, not guessed)
1. **Move more, not split more.** The purity gate is what decides whether a statement group may be dealt. The
   10th-bucket window (§20c) is `Fびήぜ137[…]` writes — a 123-member run group that is *fixed* today because 43
   members call `"…".split(" ")`; the purity lever fixes those. The next relaxation, in the same spirit and
   still decidable inside the body: a run member may be dealt when every binding it reads is **not written
   anywhere in the span it would cross** (a read/write-span test the planner can compute per body), instead of
   the present "reads nothing at all".
2. **Partial dissolve** for the return-bearing shells: lift the straight-line prefix (46,620 B of the 172,924 B
   atom, 3,979 B of the 24,035 B atom, 1,351 B of the 22,629 B atom) — sizeable for the first, marginal for the
   other two.
3. **Hoist giant `async` arrow bodies** (`X.y[…] = async a => { …86,714 B… }`) into `async function` helpers:
   the helper is then an ordinary movable function declaration and the call site a small statement. Refuse on
   `this`/`arguments`/`super`.
4. **Segment 2's Rebalance** remains the source-level half: the e-shard region (buckets 12–15) cannot be fixed
   by placement while its fixed statements are one contiguous mass.

The instrument for the next passes is **per-bucket concentration, not the saturated max**: enabling the
purity + index-free + decl-reloc levers already takes the concentrated-bucket count from 16 to 5 (12, 22, 5, 13,
20) and the cost numbers to fine_run 17,302 / intact 22,629 — the max does not move because those five buckets
are still whole, and it will not move until the last of them is broken.

### 21.6 The atoms that survive dissolution are *function values* — and hoisting them (26th pass)

A census of the dissolve output's statements ≥ 25 KB (excluding the file wrapper) returns nine atoms, and seven
of them are the same shape: **a function value on the right-hand side of an assignment** —

```
Cinde826._e[Streӟϟぢ995("0x1e2","0B^2")] = async Fみも゚510 => { … 86,714 B … }
cגNde5164._e[sU썖뒜459(21,-89)]           = async pRairie773 => { … 60,679 B … }
Summitό긍ֳ312._e.step2                    = async Sedg膫泥264 => { … 46,614 B … }
```

A function *expression* is not a placement unit: its whole body stays one contiguous run of the file. A
function *declaration* is — it is the planner's `fns` class, and its body gets its own weave plan. So the new
gated lever `WEAVE_FN_HOIST=1` gives the body a name and a declaration in the same scope and leaves a reference
where the value was:

```
X.y = async a => { BODY }     ->     async function NAME(a){ BODY }      (declared in this body)
                                     X.y = NAME;                        (same statement position)
```

Semantics: the closure is created in the scope it was created in, is only reachable through the same
assignment, and is called at exactly the same points; a declaration is hoisted but hoisting a declaration is
not calling it. A comma sequence is split first (order preserved) so a qualifying part can be hoisted, and only
when a part *is* hoisted — otherwise the statement is left exactly as written. Refusals, per body, measured:
`small` 950 (below the 16 KB threshold), `this` 1, `args`/`super`/`new.target` 0, `named` 0.

The `this` refusal was worth lifting, because it was the 86,714 B atom itself — an arrow that reads `this`
somewhere in its own level. **An arrow's `this` is the lexical `this` of its creation site, and a bound
function reproduces exactly that**, so the reference becomes `X.y = NAME.bind(this);`: the same value the arrow
captured, captured at the same point. `arguments`/`super`/`new.target` have no such equivalent and stay
refusals.

```
                                  concentrated (>=90 %) buckets     fine_run     fine_share
landed payload                            16 of 23                  25,910        0.434
+ dissolve                                15                        23,688        0.434
+ fn hoist (5 values, 258 KB)             11                        23,635        0.434
+ fn hoist with bind(this) (6, 343 KB)    11                        23,635        0.434
+ purity, index-free, decl-reloc           6 (5, 9, 12, 13, 20, 22)  17,391        0.434
```

All gates green on every run; all flags default OFF; the landed path remains byte-identical. The share stays at
the ceiling because *two atoms are still bigger than the ~56 KB a window may hold from one bucket*:

* **173,114 B return-bearing shell** (`!function(Cinde826){…}`, bucket 12, reaching into 13) — refused for
  `returns`: 454 stmts / 46,620 B are a straight-line prefix, then control flow takes over. Note that hoisting
  inside it does **not** help the metric: a helper declared inside the shell is still inside the shell's text.
* **~86 KB async body** — now movable, but movable is not separable: a 86 KB contiguous piece from one bucket
  is 0.38 of a window on its own. **Moving an atom does not help; only splitting it does.**

### 21.7 What the target now requires, mechanically
The requirement is arithmetic: no contiguous piece from one bucket may exceed ~56 KB (25 % of the 225,574 B
window), and pieces must be *separated by other buckets' material* — which placement can only do if the pieces
are placeable units. The remaining mechanism is therefore **run-wrap splitting of large function bodies**:

* take a run of consecutive statements inside a body, wrap it in a helper declared at the same scope, and call
  that helper at exactly the run's position (sync helper, or `async` helper called with `await` when the run
  contains `await`); evaluation order is unchanged because the call site *is* the position;
* legal only when (a) no `return`/`break`/`continue` transfers out of the run (a `return` inside would return
  from the helper), (b) no name the run declares — `var`, `let`, `const`, `function`, `class` — is used after
  the run (a helper's declarations do not escape it), (c) no `this`/`arguments`/`new.target` at the run's own
  level, (d) no labels crossing the boundary;
* this is the same shape as the existing RUN_EXPORT helper machinery, with one rule added (the escape check) and
  one refusal relaxed (the run's statements need not be pure: the call site preserves order, so a run that
  reads and writes tables is fine as long as nothing else observes the difference).

That is the piece that turns a 126 KB flow into a dozen placeable 10–40 KB declarations, and it is the last
mechanism between the current reading and the acceptance target.

---

## 22. The labelled-shell lift, a continuous ruler, and where the mass actually sits (27th pass)

### 22.1 The chain was re-derived and pinned (the sandbox lost `/tmp` and `node_modules`)
Everything in §21 was measured on scratch artifacts that do not survive between sessions. This pass re-derived
the S1 reference chain from the frozen bundle with the documented command and pinned it:

```
sha256 bf5f2116372…  /tmp/cc34-weave-in.js   2,535,176 B   (pre-weave, S1 "landed" configuration, chain A)
built by: DEEPWEAVE=1 SPLIT_EXTRA=1 SPLIT_OBJECTS=1 SPLIT_ARRAYS_I=1 OUT=/tmp/deep/land
          bash Active/O8.15/tools/cc34-build.sh carrier        (63 s, deterministic)
```

Two findings from the re-derivation, both recorded because they change how the record reads:

* **`EXTRACT_ONLY` is NOT a no-op — and a false alarm this pass is the reason it is written down.** A build run
  without it produces an input of the *same length* that differs from char 510 onward (chain A `bf5f2116…` with
  the documented 13-name list, 14 table runs extracted · chain B `7e4c28a0…`, automatic path, 1 run), and a
  flags-OFF weave of the two reads 12,948 vs 12,961 region statements. The first check of this ("the same build
  without it is byte-identical") compared `/tmp/inB.js` with `/tmp/cc34-weave-in.js` **after the second build
  had already overwritten it** — the file was compared with itself. What caught it was the routine regression
  check: the new flags-OFF output no longer `cmp`-matched the baseline. Re-derived on chain A, **flags-OFF is
  byte-identical to the baseline again** (no code regression from any pass-27 patch) and every sweep row below
  reproduces exactly, so the mixed-chain scare changed no number — but the reference chain for S1 is **chain A,
  the documented one, with `EXTRACT_ONLY` set**, and it is the one to keep.
* **Absolute numbers have moved since the earlier tables** (`fine_run` 25,910 → 26,014, `intact_run`
  22,678 → 27,866 on the flags-OFF baseline) because the intermediate stages have changed since those tables
  were taken (splitter fixes: the split-aware count check, the lost assignment, `--objects`/`--arrays-i`).
  Every comparison in this pass is therefore **within one derivation** — same pinned input, same seed
  (2648369387), baseline bytes verified identical run to run by `cmp`. The acceptance reading is the same on
  both derivations (0.434), so no conclusion changes; the table below simply supersedes the earlier ladder.

### 22.2 A continuous ruler (`tools/recon/share-sweep.mjs`)

`fine_share` is a **maximum**, and a maximum that saturates: while any window still holds a whole origin
bucket it reads the ceiling (0.4348) no matter how much progress happens underneath. That is why seven
configurations all read "0.434" while their structure differs. The sweep reports the distribution behind it —
the worst ten window shares, how many windows exceed the 0.25 target, the mean maximum share, and the total
excess over 0.25 (Σ max(0, share − 0.25)). All of those fall monotonically, and **"windows above 0.25" hits 0
exactly when the acceptance target is met.**

```
configuration                                  worst   windows >0.25   mean max-share   excess
flags OFF (baseline = landed config)           0.4344      73 / 73          0.4095        11.641
+ dissolve                                     0.4345      73 / 73          0.3973        10.754
+ dissolve + fn-hoist                          0.4344      73 / 73          0.3828         9.698
+ dissolve + fn-hoist + purity/index/reloc     0.4343      71 / 73          0.3689         8.700
+ labelled lift                                0.4345      73 / 73          0.3943        10.533
+ labelled lift + fn-hoist                     0.4344      73 / 73          0.3871        10.011
+ labelled lift + fn-hoist + purity/index/reloc 0.4343     72 / 73          0.3695         8.737
```

So the levers do move the file — mean maximum share **0.4095 → 0.3689**, excess **11.64 → 8.70** — and the
acceptance number stays pinned because it is a threshold. That is the honest progress signal from here on.

### 22.3 The labelled-shell lift (`WEAVE_SHELL_LABEL=1`) — the last `returns` refusals, removed

The census from §21.4/§21.6 said the surviving atoms were refused for exactly one reason: their body contains
`return`. A precise reading of the pass's own contract dissolves the refusal: **the dissolve pass only rewrites
`ExpressionStatement` roots, so the shell's value is discarded by construction.** A value-returning wrapper
whose caller never reads the value can be expressed as a labelled block:

```
!function(p){ A; if (x) return; B; return v; C }(arg)
  ==  L:{ var p = arg; A; if (x) break L; B; (v); break L; C }        (L fresh per shell)
```

`return v` evaluates v and leaves; `(v); break L` evaluates v and leaves. The label encloses the whole body, so
each break lands exactly where its return did; `try`/`finally` behaves identically (finally runs, then control
leaves the block); the same names are introduced (the privacy check is unchanged and still runs); `var` still
hoists to the enclosing function; a nested function's own returns are untouched. Implementation is a
**text-edit splice** in the emitter (`registerEdit`/`slicePush`): the return's bytes sit inside a statement that
is otherwise emitted verbatim, so the edit replaces just that span, and the statement is already on the
rewritten-span allow-list the content-conservation check uses.

Measured on the pinned input: **10 shells labelled; `returns` refusals 12 → 0; 99 shells inlined (311 KB of
atom), 1,559 statements placed; content conservation 0 holes / 0 duplicated; all five gates green.** In the
worst window the largest order-preserved span collapses **22,554 B → 4,422 B**.

### 22.4 A defect found while building it (recorded because it is a class)
The first labelled run did not parse: `Unsyntactic break @1,643,118`. Cause: the "own-level" scanners skipped
nested functions with a `/Function|Arrow/` test, which does **not** match an object getter
(`get dbgOK(){ … return … }` is an `ObjectMethod`), so a getter's own `return` was rewritten into a `break` of a
label that does not enclose it. Fixed by one shared predicate (`isOwnScope`: function, arrow, object/class
method, private method, static block) applied in all three scanners that need it. The lesson generalises: any
"own level" analysis must treat *methods* as scopes.

### 22.5 Where the mass actually sits — the structural finding of this pass

`explain.mjs` splits the worst window into the three classes the arrangement can actually place, and the split
is the same in every configuration:

| worst window | fixed | run | fn | largest intact span |
|---|---:|---:|---:|---:|
| dissolve + hoist + purity/index/reloc | 137,415 B (330 stmts) | 70,425 B (695) | 14,182 B (24) | 22,554 B |
| + labelled lift | 150,332 B (803) | 51,895 B (1,029) | 19,750 B (44) | 14,915 B |
| + labelled lift + hoist + purity/… | 135,780 B (1,271) | 26,768 B (87) | 59,361 B (96) | **4,422 B** |

Two things follow, and they are the point of this pass:

1. **The deal can only move three classes**: function declarations (`fns`), run-group members (pure writes /
   index-form writes), and relocated declarations. Everything else is *fixed* and keeps its order.
2. **The fixed mass in the worst window does not move**: ~136–150 KB of a ~222 KB window, in every
   configuration. The labelled lift and the hoist convert material *between* movable classes (fn 14 KB → 59 KB)
   and shatter the big intact runs, but they do not shrink the fixed class, and the fixed class is what holds
   the share at the ceiling.

Therefore the acceptance number cannot fall until **fixed statements become movable**. Two ways, in order of
cost: (a) the **span-decidable purity relaxation** — let a run member be dealt when every binding it reads is
not written anywhere in the span it would cross (instead of "reads nothing at all"), which converts run-class
material without touching control flow; (b) **run-wrap splitting** — wrap a run of consecutive fixed
statements in a helper declared at the same scope and call it at exactly the run's position (sync, or `async`
+ `await` when the run contains `await`), legal when nothing transfers out of the run, no name the run declares
is used after it, and no `this`/`arguments`/`new.target` at the run's own level. Evaluation order is preserved
because the call site *is* the position, so purity is not required. (b) is what can reach the ~136 KB; (a) is
cheap and goes first.

### 22.6 The biggest fixed atom is refused for PRIVACY, not for returns — and the fix is scoped names

The one shell that survives every lever is the 169,612 B statement at `@939092`
(`!function(Cinde826){ …216 statements… }(Cinde826)` — the first part of a 3-part comma sequence). Dissecting
it against the pass's own rules:

```
body: 216 stmts · own-level returns 1 (handled by the labelled lift) · this/args 0 · await/yield 0 · directives 0
params: [Cinde826] · args 1 · declared names inside: 119
of those 119, appearing as identifiers ELSEWHERE in the enclosing body: 20
   → Vi694, Ree584, Prairie530, Bri140, Qu289, Ve178, De995, Cinder273, …
VERDICT: refused for privacy (43 privacy refusals in the last full-stack run)
```

That is not a quirk of this shell: these are obfuscator-generated, self-contained modules whose internal names
are short and generic, and the enclosing master body holds 8,621 statements / 2.2 MB. Collisions are the norm,
not the exception, which is why privacy is now the largest refusal class and why the biggest material is stuck.

**The fix is to stop introducing the shell's names into the enclosing scope at all**, rather than to rename
them:

* bind the shell's **parameters** with `let`, inside the labelled block (`let p = <arg>;`), so the name is
  block-scoped and cannot capture or be captured by the enclosing body;
* convert the shell's own **`var` declarations** to `let` inside that block, for the same reason — the
  enclosing body keeps its own binding of that name, exactly as before, because the shell's declarations were
  invisible outside it in the original program too;
* **`function` declarations** cannot take this route (Annex B gives them a function-level var binding); they
  must either be renamed or left to refuse;
* the refusals that remain are decided per name: a `var` may be converted only when it is **not used textually
  before its declaration inside the shell** (with `var` that read yields `undefined`; with `let` it would throw
  a TDZ ReferenceError), and the whole shell must be free of `eval`/`with`.

**One trap already identified, from this very shell:** binding by `var p = arg;` (or `let p = arg;`) breaks when
the call's argument *is* the same name as the parameter — `!function(Cinde826){…}(Cinde826)` — because the
initializer would resolve to the binding being initialised (TDZ with `let`, silent aliasing with `var`). The
lift must therefore spill the argument to a fresh temporary first: `var <fresh> = <arg>; let p = <fresh>;`.

Scope of the prize, from the same listing: the next four fixed atoms are the 86,681 B async body (already
hoisted in the output, its *host body* is what stays fixed), the 62,682 B `function(cגNde5164){…}` shell, the
60,679 B async body, and the 52,046 B `(function(Summitό긍ֳ312){…})` shell — all reached by the same change.

### 22.7 What the next pass should do, in order
1. **Scoped-name dissolve** (above): parameter and `var` bindings as block-scoped `let`, fresh-temporary spill
   for self-named arguments, per-name textual-order check, `eval`/`with` refusal. Expected to unlock the
   169,612 B atom plus the 52,046 B one and part of the privacy class (43 refusals).
2. **Run-wrap splitting** for what remains fixed (§22.5b) — this is the only mechanism that can reach the
   ~136 KB of control-flow mass per window.
3. Re-run the sweep; the acceptance test to watch is **"windows above 0.25"**, currently 72/73.

---

## 23. Scoped-name dissolve: built, gated, and measured — a mechanism win that is not a metric win (28th pass)

### 23.1 What was built (`WEAVE_SCOPED=1`)
The blocker named in §22.6 was privacy: the biggest atoms declare names that also appear in the enclosing
master body, so plain dissolution had to refuse them. The scoped path stops *introducing* those names instead of
refusing: parameters are bound with `let` inside the block the shell becomes; the shell's own-level `var`s are
converted to `let` by a 3-character text edit on the keyword; `let`/`const`/`class` were already block-scoped;
a `function` declaration still refuses (Annex B gives it a function-level binding); a `var` inside a nested
block is left alone and must simply not collide; and the call's arguments are spilled to fresh temporaries
first (`var <fresh> = <arg>; let p = <fresh>;`) so a self-named argument — `!function(Cinde826){…}(Cinde826)`,
the trap found while dissecting this very shell — cannot make the new binding read itself. The read-before-
declaration check is per name: `var x` seen before its declaration is `undefined`, `let x` would be a TDZ
`ReferenceError`, so those shells still refuse.

### 23.2 Measured, on the pinned chain A (sha `bf5f2116…`), seed 2648369387

```
                        shells  atom     privacy   gates                    constraint
dissolve+label          99      311 KB   43        green                    —
+ scoped               116      382 KB   26        green (0 holes)          5/5 PASS
```

The scoped pass lifts **17 more shells** (71 KB) and cuts privacy refusals 43 → 26. The independent constraint
pass on the scoped output is green (C1 0 duplicates in 3,639 bodies · C2 0 window violations over 22 run
groups · C3 0 registration-order hits · C4 0 non-canonical groups · C5 0 array-order mismatches) with a
movable set of 1,134,196 B = **51.1 %** of the file. Flags-OFF output is still byte-identical to the pinned
landed output.

**The biggest atom is still refused, and now for a precise reason:** `169,612 B @1,166,721` collides on names it
declares *as functions* — the scoped route cannot take function declarations, so it refuses. The next step for
that atom is renaming, not scoping.

### 23.3 The measurement that matters: dissolving MORE is share-NEGATIVE

```
chain A, seed 2648369387        mean max-share   excess over 0.25   windows >0.25   buckets >=90%
flags OFF                           0.4095           11.641            73 / 73            15
dissolve + label + hoist + levers   0.3695            8.737            72 / 73            10
… + scaled dissolve (17 more)       0.3719            8.897            73 / 73            13
```

So the extra 17 shells cost a little on every instrument (mean +0.0024, excess +0.16, one more concentrated
bucket). That is not a bug — it is §22.5 restated with numbers: **dissolution changes the shape of atoms, not
the position of mass.** A shell that is dissolved becomes statements *fixed in place*, so its bytes stay exactly
where they were; meanwhile its internal function declarations join the movable class and are scattered, which
can even concentrate a neighbouring window. Splitting material is not moving it, and the acceptance number
only responds to moving.

**Decision: `WEAVE_SCOPED` stays in the tree, default OFF, recorded as measured-not-a-landing** — the same
status as `WEAVE_SEQ_SPLIT`, and reversible in one flag. Its value is diagnostic (§22.6's trap is now handled)
and it is a prerequisite for the function-rename step if that is ever needed.

### 23.4 What this implies for the remaining S1 work
The window anatomy (§22.5) is unchanged and now doubly confirmed: **~136 KB of the worst window's ~222 KB is
fixed: 1,271 statements the deal cannot touch.** Nothing that only changes *what the atoms are* will move the
acceptance number. What can move it is converting fixed statements into dealable ones:

1. **span-decidable purity for run members** (cheap, first): deal a member when every binding it reads is not
   written anywhere in the span it would cross, instead of "reads nothing at all";
2. **run-wrap splitting** (the large one): wrap a run of consecutive fixed statements in a helper declared at
   the same scope, called at exactly the run's position — order-preserving, so purity is not required, and it is
   the only mechanism that reaches control-flow mass.

Both are placement-preserving and therefore the first things tried since the metric decomposition that can
actually move `fine_share` rather than its preconditions.

---

## 24. Run wrap: the first lever that MOVES the acceptance number (28th pass)

### 24.1 The mechanism
§22.5 and §23.3 both said the same thing twice: the deal can move function declarations, run-group members and
relocated declarations, and nothing else, so ~135 KB of the worst window is fixed in place and no arrangement of
the movable class can bring the share under 0.25. Dissolving changes the *shape* of atoms, not the *position* of
mass. Run wrap (`WEAVE_RUN_WRAP=1`) is the generalized form of RUN_EXPORT: a run of consecutive statements is
replaced by a helper CALL, and the statements go inside a helper function declaration in the same body —

```
A; B; C; D;        →        function w7(){ A; B; C; D; }        …        w7();
```

A function declaration is exactly what the deal scatters, and the call is ~10 bytes where the run was, so the
run's bytes leave the window and spread over the whole gap space. Execution is unchanged: same order, once, at
the same point (the declaration is hoisted, but hoisting only creates the function object early and has no side
effects). Runs are cut at `WEAVE_RUN_WRAP_KB` (default 24 KB) so that no single helper exceeds the per-window
budget on its own.

Eligibility, checked per statement and per run: no `return` at the run's own function level (it would return from
the helper); no `this`/`arguments`/`super`/`new.target` (arrows are descended into, nested non-arrow functions
are opaque); and **no name the run binds may be referenced anywhere in the body outside the run's span** — that
is the whole scope change, and it is what makes a statement a barrier. Statements the deal can already place at
finer granularity (pure run-group members) are left alone.

### 24.2 Two defects found and fixed while building it
1. **Dropped-wrapper slicing.** The helper body is emitted as the run's ORIGINAL source slice. After
   dissolution, a run can span text that dissolution deleted (an inlined shell's `!function(){` / `}()`), so the
   first cut of the pass wrote an output that does not parse. Fix: a statement may only enter a run if it is
   emitted by its own slice (`__text`/`__textParts`/`__wrap` absent, no text edit inside it) **and** every pair
   of consecutive run members is textually adjacent (`^[\s;]*$` between them).
2. **The same shell inlined twice.** A shell that is a *comma-sequence part* has no statement node of its own,
   so the `dissolvedNodes` once-only guard never saw it; the second inline rewrote the same `return` with a
   different label and the edit list threw. Fix: an identity guard (`inlinedShellFns`) plus turning the conflict
   into a clean refusal instead of a throw.

### 24.3 Measured on pinned chain A, seed 2648369387 (`windows_above_target` is the acceptance read)

```
                                               mean max-share   excess   >0.25      worst    buckets>=90%
flags OFF (landed)                                 0.4095        11.641   73 / 73    0.4344        15
dissolve+label+hoist+levers (previous best)        0.3695         8.737   72 / 73    0.4343        10
+ RUN_WRAP  (this pass)                            0.2841         3.653   53 / 73    0.4324         2
+ scoped + renamed dissolve (124 shells, 451 KB)   0.2765         3.213   46 / 73    0.4312         2
```

That is the largest single move since the metric was defined: **73 → 46 windows above the 0.25 target**, mean
share 0.4095 → 0.2765, concentrated buckets 15 → 2, with all five gates green, the independent constraint pass
5/5 (movable set 1,414,570 B = 63.6 %), flags-OFF still byte-identical to the pinned landed output, and the
frozen 8.14 bundle untouched. Chunk size was swept: 24 KB is the optimum (16 KB 52/73, 48 KB 55/73) and wrapping
material the deal can already place is worse (64/73) — both confirm the split between "wrapped" and "dealt".

Scoped-name dissolve (§23) is now landing part of the stack rather than standing alone, and the rename route
added here takes the shells whose collisions are FUNCTION declarations (a function declaration hoists, so it
cannot be block-scoped — it gets a fresh name and every reference to it inside the shell is renamed, safe because
the declaration shadows the outer name for the whole shell body). Current refusal census: privacy 43 → 17,
scoped 21, renamed 28.

### 24.4 Refused by the gate, and the remaining leads
**Declaration hoist (`WEAVE_RUN_WRAP_HOISTVAR=1`) is INADMISSIBLE, and the gate caught it.** The most common
barrier is `var X = …;` whose name is read later: the declaration could stay at the body level (the helper only
assigns) with the four bytes of the keyword deleted. All five semantic gates pass, but the content-conservation
gate refuses it — **1,094 spans / 4,442 B of statement text dropped** (four bytes per hoisted declaration). It
drops exactly the bytes the gate exists to protect, and per the standing D5 ruling the gate is never relaxed to
admit a mechanism. It moved the wrapped total by 23 statements anyway (3,703 → 3,726), so nothing was lost by
refusing it; the flag stays in the tree, default OFF, as measured-and-refused.

**The two remaining leads, in order:**
1. **The 169,612 B atom (bucket 12) is now refused for an edit conflict, not for privacy** — two shell inlines
   claim the same `return` statement, so the conflict refusal (24.2) rejects it. That is precisely the remaining
   bucket-12 clump (`buckets >=90 %` = 12, 13), and it is now a *diagnosis* rather than a mystery: the same
   `return` is reachable from two shells. Whoever resolves that reachability dissolves a 169 KB atom into ~216
   statements, most of which the run wrap then spreads.
2. **Barriers (5,632) are the bulk of the fixed mass that remains.** They are statements that bind a name read
   elsewhere, which cannot cross a helper boundary by scoping; the hoist route is closed by the gate, so the
   admissible route is the same one the deal already uses for run groups — a *reader window* argument, i.e. let
   the deal itself move those statements once a bound says it may (not this pass's problem, and the next lever).

## 25. Post-interruption verification: the identity guard is stable (28th pass continuation)

The once-only shell guard was strengthened from AST-object identity to the shell body's source range (`start:end`).
This addresses the case where the same source shell is represented by distinct AST objects on the comma-sequence and
statement paths. Re-running the full best stack on pinned chain A produced the same admissible result: 124 shells,
451 KB, privacy 17, scoped 21, renamed 28; run-wrap 34 helpers / 3,703 statements / 290 KB; all five self-checks
PASS, content conservation 0 holes / 0 duplicated, constraint pass 5/5, and flags-OFF remains byte-identical to
`pinned/weave-out-chainA.js`. The output remains `windows_above_target=46/73`, mean max-share 0.2765, excess 3.213,
worst 0.4312, with buckets 12 and 13 the only >=90%-concentrated buckets.

The external ruler identifies the remaining wall more precisely: in the worst window, bucket 12 contributes 95,837 B
and bucket 13 61,746 B; the largest fixed same-bucket run is 24,754 B, while fixed statements account for 175,892 B
of the 222,261 B window. The dominant bucket's largest remaining runs are 15,976 B and 6,570 B inside master statement
3632 (the dissolved e-shard region). This is the next reader-window candidate, not a reason to relax conservation.

## 26. Run-wrap chunk sweep continuation (29th pass)

This pass was execution, not a status read. The full stack was rebuilt at five additional chunk sizes and each
candidate passed conservation, parse, statement identity, order, and relocation checks. The sweep found a small
but real improvement beyond the previous 24 KB setting:

```
chunk KB   helpers/statements       worst     mean       excess    windows >.25
8          47 / 3632               .4311     .2889      4.094     49/73
12         40 / 3674               .4311     .2817      3.552     51/73
20         34 / 3703               .4312     .2765      3.213     46/73
24         34 / 3703               .4312     .2765      3.213     46/73
28         33 / 3703               .4312     .2792      3.415     45/73
32         33 / 3703               .4312     .2792      3.415     45/73
36         33 / 3703               .4312     .2792      3.415     45/73
40         33 / 3703               .4312     .2792      3.415     45/73
48         33 / 3703               .4312     .2792      3.415     45/73
64         33 / 3703               .4312     .2792      3.415     45/73
```

The 28–64 KB plateau is a placement seed effect: the same 3,703 statements are wrapped, but the helper grouping
changes the final arrangement. The best acceptance read is currently **45/73** at 28 KB and above, one window
better than the previous 46/73. The 20–24 KB configuration remains the best mean-share result. Both are persisted
under `pinned/measurements/out-*.js` and `map-*.json`; neither is called a landing until the integrated choice is
made and the complete battery is rerun.
