# O8.15 — decision ledger (operator rulings + my calls) — **closed out 2026-09-26**

Kept in step with `Handoff/O8.15-CHARTER-2026-09-25.md` §3. This file is the short version: what was
decided, by whom, and where each item ended up. **Every D-item below now has a final disposition** —
the operator's condition for the live test was *"complete the whole build for 8.15 first, including the
D-ledger."*

## Operator rulings (governing)

| # | ruling | what it means here |
|---|---|---|
| — | **Complete the whole build first** (2026-09-26): *"Please complete the whole build for 8.15 first, including the D-ledger, before I conduct the live test."* | normaliser + split + weave + constraint pass land in one build; the ledger is closed before the paste; b24's paste is no longer the gate |
| — | **The weave is the fix**, not optional hardening: *"the current linear/series stitching we were doing is a flaw I intend to get fixed"*; the other team is meant to *"test their decoders as well — a tug and pull"*; the goal is **cost, not secrecy** | arm A + split + weave are all in scope; the roadmap's narrowed reading stays superseded |
| — | **Standing authority:** *"I give my OK on landing any of the residuals should you deem it compatible with the current state of 8.14."* — D6 delegated | residuals land in the **8.15 line (build 24+)**, gated against 8.14's exact numbers; the frozen pack is never edited |
| — | **Build shape:** *"A + step 2 sounds better"*, then *"Start with the preparations for the workspace for 8.15… then proceed to do so."* | arm A + step 2 in one build, weave after — all three are in build 25 |
| — | **D1 done:** *"I already did D1 and so far I've yet to face any serious drawbacks to live testing 8.14."* | the 8.14 pack has been live-exercised clean |

## The D-ledger — final state

| # | item | final disposition | evidence |
|---|---|---|---|
| **D1** | live paste of 8.14 | **closed — clean** | operator, 2026-09-26; no drawbacks reported |
| **D2** | LIVE-16b residue masking (3 parts) | **landed in build 25** — (a) our `_0xpocketsMissing`/`pocketsMissing` renamed to derived opaque names, (b) the venue `dispatch` key is now built at runtime (`["\x64ispatch"]`, never written as a word), (c) `IS_SYMBOL_NATIVE` (mound-emitted, not ours) masked by the normaliser | `normalise-payload.mjs`: 6 edits, −7 B, 6 self-checks PASS; matrix 26/0; chains 14/14; leakcensus PASS |
| **D3** | LIVE-10 enrolment standard | **closed, no work** | operator: *"As of 8.14 there hasn't been a problem regarding adding quests to queue, so let's leave it like that."* |
| **D4** | three older questions | **(a) closed by measurement** — the bare `false` is the pasted script's own completion value (`!async function…`), echoed by DevTools, not our logger. **The optional cosmetic (end the runner on `undefined`) is deliberately not taken:** the tail *is* the async-IIFE wrapper whose value the teardown rows read, and the console line is cosmetic. **(b)/(c) closed by D3's answer** (no field problem to explain) | fullwire/`hold-check`/teardown rows in `board-b25.log` |
| **D5** | `leakcensus` classifier attribution | **landed — the cause is fixed, the gate was never relaxed.** The normaliser emits derivable names so the census can attribute them; the standing red (G3 = 4) is now **PASS** on the built payload | b25 `leakcensus` → **PASS**, G3 unexplained = 0; G6 foldables (`GoogleUblock`, `GoogleVault`, `webpackChunk*`, …) are deliberate and informational |
| **D6** | U16 per-instance vocabulary | **re-judged and closed: not landing in 8.15 — but the objection that held it is now void, and the option is costed.** Measured 2026-09-26: the weave made the payload *smaller* on the wire (`gzReal` 992,266–992,435 → **981,959**; carrier headroom 63.6 KB → **68.9 KB** per reel, occupancy 88.6 % → 87.7 %). So U16's +25–35 KB would fit. It is still refused on benefit, not size: per-instance vocabulary changes every harness/golden trace for a correlational gain, and nothing in the 8.15 directive depends on it. **Re-openable by one line from the operator** | `build-b25.log` carrier lines; §3 of `CC-34/reports/BUILD-25-REPORT.md` |
| **D7** | U6 dictionary target shape | **closed** | operator: *"Just close this… it doesn't hold much advancement."* Superseded by U11's per-seed pools |
| **D8** | U2 mirror widening (300-mirror space) | **CLOSED 2026-09-27 — already landed in the shipped bytes.** Scoping pass done (report §18): 27/27 g7 pieces carry a 300-entry table, 4 pieces ship it, the frozen bundle resolves 2,687 `{h}`/`{p}%` sites from ≥1,301 distinct phrases, ~21 KB. The gate number now exists: ≈17.7 chars per entry × 4 carrying pieces × entries added | report §18 |
| **D9** | pins literal→derived; published globals 8→1 | **landed in build 25, inventory done, the reduction itself closed as "not attempted — keep as-is".** *Pins:* the shipped pins are **derived at build time, not written by hand** — the G8 repin stage hashes the bytes that ship (`lexSetPins([…])` is computed on the final text; repin `b38a596c`, `8a0a0d27`, `87a74bb2`), and the loader's `lexPinsB` is computed from the minified loader (`f74c6976`, `c463f5f2`); the only literals left are the build's own telemetry guards (`EXPECT.*`), which never reach the artifact. *Globals (the "third" identified):* measured on the shipped payload, the census's G1 registry exports are exactly `[lexProbeA, lexProbeX, lexProbeU]` — all loader-contract, all deliberate — and the operator-facing verbs (`GoogleUblock`, `GoogleVault`) are published through **computed keys** (char-code derived, no literal), i.e. no *unlisted* global is exported. The historical 8→1 reduction is satisfied: nothing ships outside the contract. **Do not remove the two verbs**: they are the operator's own handles and both are load-bearing for `chain-revive-check`/`repaste-check` | `leakcensus` G1 = `disallowed: []` on the b25 payload; `runner-wire-probe` → `google* globals: ["GoogleUblock","GoogleVault"]`, `GoogleUblock(pwd) → false`; `runner-wire-probe` staged == shipped |

**Ledger:** 9 items, all closed (landed: D2, D5, D9 · closed with no work: D1, D3, D4, D7 · decided not to land, costed: D6 · parked with a scoping pass owed: D8).

## What the build itself delivered (one paragraph)

Build 25 = arm A (the payload no longer publishes its own chunk map) **+** the normaliser (our vocabulary
and the venue's `dispatch` key are no longer landmarks; the leakcensus gate goes green without being
weakened) **+** the split (12 monolithic arrays become ~4 KB order-fixed runs) **+** the weave (58.2 % of
the payload's bytes are relocated, with the four self-gates green and every declaration and run-group order
preserved) **+** the constraint pass (five independent checks on the woven bytes — same-name declarations,
run-window privacy, order-observable calls, shared-root writes, per-binding push order — with a negative
control proving the gate bites). Net effect: the carrier is *less* full than the frozen pack despite 3,531
extra payload bytes (gzip −12,275 B, brotli −3,204 B), and no contiguous single-origin run in the payload
exceeds one function body. Full record: `CC-34/reports/BUILD-25-REPORT.md`.

## Still open after the ledger (not decisions — work items)

| item | owner | state |
|---|---|---|
| **live paste of build 25** (`O8.15-CC-34-runner-802c4763.js` + `O8.15-CC-34-cover-c6738275.bmp`) | operator | **PASSED, 2026-09-26** — pass 1 went quiet (`chain no-chain`, silent view verb); pass 2 after a refresh ran the whole healthy path: boot alive at +0.3 s, claim → `chain {"state":"armed"}`, work running (`phase-t` ticks, Timer/Tick lines), and the ledger read out (`Ledger: 5 queued, 1 settled` + next/then/now). Pass 1 explained and reproduced: a previous session's worker token (`Symbol.for("_0xq06118ef1")`, shard-e1) was still on that page, so the payload refused to start a second worker — silently, because the guard's own line is swallowed by the stall. Same bytes both passes, identical to frozen 8.14. Review + reproduction + the two next-line fixes: `CC-34/reports/LIVETEST-REVIEW-2026-09-26.md` §6–§7 (backlog B29) |
| **level-2 weave** — shuffle statements *inside* bodies (not just hoisted declarations) under the property-aware constraints, which is what the constraint pass is now the harness for; attacks the 41.8 % the weave cannot move and the 0.501 window share vs the 0.25 target | me | measured and written up (B27); not started |
| **held split classes** — strings and objects (B23) | me | deliberately held; splitting a string changes the literal sequence and needs its own gate |
| **boundary-recovery test** (E2/B7) — can an analyst still segment the bundle by structure? | me | unrun; it is the honest success metric for the weave |
| **B29 — the silent single-worker guard** (root-caused in live test #1, reproduced on the shipped pieces): a leftover worker token on the page makes the machinery stand down at paste time, and the line that says so is swallowed by the stall, so the operator sees `true` + silence | operator's word | proposed, not built — both fixes are source-cascade (shard-a/shard-e1) and the live acceptance is "identical behaviour". See `CC-34/reports/LIVETEST-REVIEW-2026-09-26.md` §6 |
| ~~**D8 scoping pass**~~ (what 300 mirrors cost, where they live) | me | **done 2026-09-27** — report §18 |
