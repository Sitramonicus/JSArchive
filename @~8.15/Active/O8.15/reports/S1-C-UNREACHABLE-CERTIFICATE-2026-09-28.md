# S1-C unreachable certificate (2026-09-28) — `windows_above_target = 0` cannot be reached inside the accepted transform set

Candidate: **g8-all3Exp** (`44a8dc146cce…`, full config in `S1-C-SEARCH-LEDGER-2026-09-28.md`).
Metric: share-sweep — 23 origin buckets (preLen/23 = 96,491 B), sliding 10 % windows W = 222,404 B
(step W/8), a window fails when any single bucket supplies > 0.25·W = 55,620 B.
Measured: **47/73 windows above target** · worst 0.4259 · mean 0.2794 · excess 3.028.

This certificate is the checklist's exhaustive-unreachable branch (RELEASE-CLOSEOUT-ROUTE Gate 2, stop
condition 2). It has four legs. Per-item authority: `S1-C-FIXED-CENSUS-g8-2026-09-28.json` (3,799 items,
exactly one classification each — the 1B "no silent refusal" regime applied to the selected candidate).

## Leg 1 — the bounded parameter space is exhausted

12 runs (ledger `.jsonl`; the pre-fix grid is kept as `.pre-fix.jsonl`): declaration placement {reloc, reloc-all, all3-span-solo} × body-split boundary
{off, 1 KB, 2 KB + giant floors} × run-wrap KB {24, 28, 32} × seed {2648369387, 1844674407}, plus the
sequence-split level {off, on} — **WEAVE_SEQ_SPLIT=1 is byte-identical to off** on the winner and on BASE
(the dissolve pass's embedded sequence splitter already covers what the standalone path would do).
Every level occurs in ≥ 2 rows; every (placement × split) pair at KB=28/seed S1. Best = 47 windows; the two
seeds differ by one window (placement noise ± 1); no level moves the count below 47. All rows re-measured
after the dissolve param-binding fix (see the ledger's correction note).

## Leg 2 — no unconditional atom obstruction; the floor is constraint-shaped

Obstruction analysis over the candidate's map (`obstruct.mjs`, statement rows × per-bucket source bytes):
**zero statement rows exceed 55,601 B of one bucket** — the largest is 48,976 B (row o0=1,217,199, kind
`fn`, bucket 13). The 0.4348 ceiling of the earlier §20d experiment (statements ≥ one bucket) is GONE:
every atom now fits under the per-window budget. Therefore `windows_above_target = 0` is not blocked by
atom sizes — it is blocked only by placement constraints, and those constraints are exactly the rejection
classes below.

## Leg 3 — every remaining fixed byte, by class, with the safety condition that keeps it from crossing the helper/window boundary

Census of the selected candidate: **3,799 fixed items · 7,598,790 in-window B · the 47 target windows**.
Class totals (in-window B): rejected 5,568,924 · split-routed 1,389,895 · movable-whole 639,971.
Route totals (src B) and the condition per route:

| route | src B | items | safety condition — why the byte cannot cross the boundary |
|---|---:|---:|---|
| rejected:binding | 418,260 | — | the statement binds a name read elsewhere in the block; a helper's declarations are invisible outside it (closure lag / split binding). Only a *rebinding-free, chunk-local* run may cross — these fail that predicate by definition. |
| rejected:slice-rewrite | 317,681 | — | the statement's emitted text carries registered edits or dropped wrapper bytes; the helper's byte-preserving raw slice would not reproduce it. Crossing requires rewriting source bytes — the conservation gate forbids it. |
| rejected:exception-timing | 192,157 | — | helper-boundary hazard: the statement participates in try/catch semantics; hoisting it across the boundary changes which exceptions are caught when. |
| rejected:return | 112,299 | — | a `return` at the statement's own level escapes the helper instead of the enclosing function. |
| rejected:async/generator | 8,311 | — | `await`/`yield` stop parsing or change timing in the helper context. |
| rejected:this | 681 | — | `this`/`arguments` binding differs inside the helper. |
| split:seq | 362,392 | 327 | comma-sequences whose parts include function/class expressions (`SEQ_SPLIT_HAZARD`): splitting would emit a function/class expression as a statement head (parse/hoisting semantics). Measured: the accepted splitter refuses every one — enabling `WEAVE_SEQ_SPLIT=1` is byte-identical. |
| split:fnbody | 134,787 | 25 | function-body material below the accepted export floors (body ≥ 8 KB, parent ≥ 32 KB, chunk ≥ 2 KB) or failing the call-free/escape/kind gates. The floors were moved within the bounded set (256 B floor measured: windows 48 → 51 — the small-body exports add sub-bucket permutation noise). |
| split:literal | 124,259 | 8 | object-literal tables refused by the payload-level split's admission: multi-declarator (`var A={…},B=…`) — a later declarator could read a half-built binding (binding-order hazard); `const` tables — outside the accepted var-only scope. Route recorded as future mechanism work with its own safety review (weave-levers `next_lever`). |
| split:wrap | 92,223 | 309 | wrap-admissible singles whose consecutive runs fall below the accepted group floor (≥ 4 stmts / ≥ 2 KB; solo floor 2 KB with `WEAVE_RUN_WRAP_SOLO=1` — already on in the winner). Lower floors were inside the bounded set and measured harmful. |
| movable:relax-span | 118,710 | — | movable, but confined to its reader window (declaration → first reachable read); window-limited mass — moving beyond the window crosses a reachable read (the decl-reloc safety condition). |
| movable:decl-reloc | 18,835 | — | same window rule; already relocated where the no-reaching-read rule allows (the winner relocates 280+ declarations). |

Every one of the 3,799 items carries exactly one row of this table (per-item `classification`/`via`/`reason`/
`note` in the census JSON). No silent refusal exists.

## Leg 4 — the placement floor is stable across the accepted freedom

The two deterministic seeds give 47 and 48 windows; relax-span (593,407 B window-limited mass) and decl-reloc
widen every window the no-reaching-read rule permits (biggest measured widening 21 KB → 1,626 KB) and the
count still stops at 47. The residual windows are the buckets 12–16 wall (output ~1.1–1.7 MB) where the
rejected binding/slice/exception material sits in clumps no accepted placement can separate without crossing
the conditions in Leg 3.

## Conclusion

Within the accepted transform set (Gate 1's one bounded body-splitting pass + the landed weave levers) and
the bounded parameter space (Gate 2's five dimensions, exhausted in 12 runs), `windows_above_target = 0` is
unreachable. Every remaining fixed byte is covered by a named safety condition. Improving past this point
requires NEW mechanisms, each with its own safety review: per-key literal-table splitting (`split:literal`
route, 124 KB), a hazard-aware sequence splitter that can cross function-expression parts (`split:seq`,
362 KB), deeper body splitting below the floors (`split:fnbody`, 135 KB), or slice-preserving text-rewrite
support (`slice-rewrite` class, 318 KB). None of these is inside the bounded set this certificate exhausts.

Status: **produced; acceptance is the 1C exit's review step** (RELEASE-CHECKLIST 1C exit: "target is zero or
the formal unreachable certificate is accepted by review").
