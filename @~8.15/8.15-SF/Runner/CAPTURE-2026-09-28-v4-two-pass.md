# Capture — v4 runner, two passes — 2026-09-28 (the owed fresh-page paste)

**Source:** https://ctxt.io/3/r4ZFnWIY8.md · **Instrument:** `Active/O8.15/Runners/O8.14-debug-runner.js`
(v4, sha256 `5c7bcf73146e91056ffc7856748dce462823049e3f25611b15d093bf0b4fb432`) · **Shape:** dispatch (healthy page)

## Verdicts

| question | verdict |
|---|---|
| Does the instrument work on a healthy page? | **YES — both passes.** Walk trace, guard verdict, receipts and hook rows all appear, in the shape designed. |
| The owed fresh-page v4 paste | **DELIVERED.** This is it. |
| Any STAND-DOWN / armed-but-idle / silent view? | **None.** No stand-down line, no `_liveSession` false state, view verb printed the queue. |
| Does the e-piece register? | **YES.** `session controller created (v814owlmpb782on)` + `guard verdict at boot: dispatch — … the e-piece registers normally … confirmed: the session controller was created`. |
| Worker Reach premise (walk stops early)? | **Not reproduced.** Pass 1 walk: `boot() → step1() (entered, returned, 82 ms) → step2() → step3() → step4()` — all four entered. Stays **parked**; needs a *failing* page to justify shipping. |

## Pass 1 — fresh page (10:07:55)

```
[Host 8.14] initialized — worker instance 06118ef1.
… pocket/ledger diag lines, all [dropped-by-stall] (expected: the sink is closed until a claim)
session controller created (v814owlmpb782on) — the e-piece got past its guard
chain walk: boot() entered — chain no-chain
chain walk: step1() entered / returned undefined (82 ms) · chain now scanned
chain walk: step2() entered / returned undefined (1 ms)
chain walk: step3() entered / returned undefined (0 ms)
chain walk: step4() entered
guard verdict at boot: dispatch — no worker token on the page when this paste started —
  the e-piece registers normally (the healthy path) · confirmed: the session controller was created…
[say] Register 9 chores queued up; board pinned.           ← dropped-by-stall (sink closed)
[diag] Session check complete {"ready":false} · Session readout {"units":1,"strings":"varied"}
[diag] phase-codec/rt/lz/lat/scan/if …  ·  Knapsack Supplies counted: {…7 true…}
[MemberCount] No member statistics are currently available in local client state.   (×2)
```

## Pass 2 — after F5 + re-paste (10:15:04)

```
[Google diag] Host config {"scope":"payload","flags":32319,…} · Store checks m/e/aux · Pocket checks pk1…pk5
ctl.begin() called — chain armed · stall false — awaiting result...
ctl.begin() settled: returned (promise) (0 ms) · chain now live
[diag] chain {"state":"live","ok":true,"missing":[],"ran":false,"released":false,"revived":true}
entry(pwdDbg) settled: level 0 -> 2 · chain scanned -> live · ledger 8 (unchanged) ·
  stall true -> false · returned true (4 ms) ·
  hooks close:attached, begin:attached, extend:attached, roster:attached      ← ALL FOUR
[diag] phase-st {"elapsedMs":9,"plausible":true,"shape":12}
ctl hook attached late: extend / begin / roster — the session runner started
[say] Pavement Floor checks line up in fours: false — stone #25138
[say] Dresser The cutlery drawer was re-sorted: cmdLine, exeName, exePath, hidden, …   (process sweep)
[diag] phase-x {"state":"active","activeTaskCount":1}          ← WORK RUNNING
[say] Smidgen Checking on EA Sports FC 27 — ~3 minutes left on the dough.
[say] Astrolabe Running tally: 774/900.
--- view verb ---
entry(res/ak/view-or-other) called — level 2 · chain live · ledger 7 · stall false
ctl.roster() called
[info] Ledger: 7 queued, 1 settled.
[info]   next: task Typhoeus
[info]   then: video RuneScape: Dragonwilds · video War Thunder · task Dragonheir… · task Gravebound… · task Wiz…
--- close path ---
ctl.close() called — chain live · stall false · [diag] phase-c {"state":"ready","activeTaskCount":0}
ctl.close() settled: returned undefined (8 ms)
entry(res/ak/view-or-other) settled: level 2 -> 2 · chain live (unchanged) · ledger 6 (unchanged) ·
  stall false (unchanged) · returned true (10 ms) · hooks … attached
[say] Ring  Last call — shift ended early — (1 activity result) in hand.
[say] Sill Session closed — the ledger stands until a new claim.
--- a later slot, no session on the page ---
entry(res/ak/view-or-other) called — level 2 · chain closed · ledger null
ctl.roster() called
[info] No ledger on this page yet — the shelf was never reached here; a claim re-arms it.
ctl.roster() settled: returned undefined (1 ms)
entry(...) settled: … returned true (1 ms) · hooks close:attached, begin:attached, extend:attached, roster:attached
```
Operator note in the capture: `// pwdAK successfully stopped progress, good`.

## Not problems (already on the known-noise list)

`error saving setting … console-history exceeded quota` (devtools storage) · `[Violation] 'focus'/'blur' handler took ~160ms` ·
`[RunningGameHeartbeatManager] Failed to get performance snapshot…` · all `[OverlayRenderStore]/[Clips]/[OverlayBridgeStore]` lines (the venue's own).

## What this licenses

1. **S3 can be built against a validated instrument** — the receipts, hook row, walk trace and claim lines this capture
   shows are exactly the lines the Claim-Surface Repair items must not disturb; the healthy-page row is now on record
   as the decoy-parity comparison for the boot path.
2. **The two silent fates remain unproven on this instrument** — this page never went silent, so items 2/3/4 (why-nothing-printed,
   ledger fallback, early-stop notice) still ship as *mitigations*, not as fixes for a reproduced fault.
3. **Worker Reach stays parked** — a healthy walk entering step1→step4 is evidence *against* shipping it now.
