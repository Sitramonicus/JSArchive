# O8.14 Machinery — What Each Piece Does, and the Live Signal That Proves It

Written 2026-09-27 for the debug hunt. One row per piece (S4 load order), then the four state machines the
pieces move between, then where the reported faults live. Everything here is read off the raw shards in
`Active/O8.14/CC-33/shards/` — no guessing.

## 1. Pieces, in load order

| # | piece | job | live signal in the log | if it is the broken one |
|---|---|---|---|---|
| 1 | `a` | identity, the bounded `Log` sink, the stall, the entry point `GoogleUblock`, level-gated verbs, the 120 s window timer | `[Host 8.14] initialized — worker instance 06118ef1.`, the welcome line, `queue` lines | no `[Host 8.14]` at all — nothing else can work |
| 2 | `l` | lexicon/decoration tables | labels inside `[Google …]` lines | labels read as raw tokens |
| 3 | `m-str`, `m1`, `m2` | the `Store`/pocket registry, `_0xmod.lex`, quota-shelf bookkeeping | `Store check {…}` queue lines; `_0xmod.lex` exists | pocket checks throw or report 0 stores |
| 4 | `n1` | candidate-store scan (phase `n`) | `phase-n {"added":…,"totalCandidateStores":…}` | phase-n never appears; queue never fills |
| 5 | `c` | claim/anti-decoder scaffolding | — (silent by design) | — |
| 6 | `h` | host hooks (Session, performance noise filtering) | host lines pass through, `Failed to get performance snapshot` suppressed | host noise floods the sink |
| 7 | `e-str1`, `e-str2` | strings/maps for the step chain | — | chain states print as tokens |
| 8 | **`e1`** | **the guard + the step chain** (`waiting-pockets → waiting-capability → scanned → armed / waiting-chores`) and the arm hook | `chain {state, ok, missing, ran, …}` on every accepted claim; the boot guard line | **token present ⇒ whole piece returns at line 121-125**; chain stays `no-chain` forever |
| 9 | `e2` | venue-call wrapper; skips work while the stall is closed; `waiting-chores` | `phase-t {"tick":N}`, venue lines | ticks stop; nothing is ever attempted |
| 10 | `e3` | phase orchestration (`t` timer, `d`, `n`) | `[Google Tick] Now reading: …`, `[Google Timer] Pebbles landing whole: …` | tick counters freeze |
| 11 | `e4` | **all of it inside `_e.step4` (AST: lines 5-397)**: the session runner `_0x2c`, the work loop, the watch interval, the venue boot handshake, and the `begin`/`extend`/`roster` fallbacks | `Ledger: N queued, M settled.`, `next:/then:/now:`, `[Google Spire] Cashed out: …` | if the walk never reaches `step4`, NOTHING of e4 exists: no hooks, no handshake, no work |
| — | **the walk** *(latent hazard — the live readings that pointed here came from a harness defect, see the report §12; not the current fault)* | `e1@load` calls `_e.boot()`, which walks `step1 -> step2 -> step3 -> step4` and returns on the first `STOP` (`e1:674-677`). `step1` = e1:167-629 (STOP at 294, 323), `step2` = e2:5-319, `step3` = e3:5-192, `step4` = e4:5-397 | runner v3 logs every step's entry/return + a `chain walk` row: `STOPPED at stepN [step1=STOP]` | a walk that stops before `step4` is the whole "armed but idle + silent verbs" cluster — **and `armed` is only a seeded state, it does not mean a worker exists** |
| — | the **verbs** | `shard-a:342-344` calls `_0xmod.v814owlmpb782on?.extend?.() / ?.close?.() / ?.roster?.()` — optional chaining, so a missing hook is a no-op that still returns `true`; `ripcord` = rcd gate, `resurgence` = res slot, the roster string = view slot | `ctl.*()` lines from the runner's hook probe | any verb answering `true` with nothing printed: check the hook row before blaming the chain |
| 12 | `n2` | second scan pass, expiry/settle bookkeeping | `Google Tripup: N shelf items would not settle` | settle counts drift |
| 13 | `aux1`, `aux2` | rehearse-ledger, vault, residual chores | `rehearseLedger` diag lines | — |
| 14 | `u` | **the rcd/dbg gate**: two FNV hashes, 120 s window, `会員` level, `_0xcheckMain`/`_0xpreSet`, decoys | (nothing of its own — it is a gate, not a talker) | **it answers independently of `e1`**: a passphrase can be accepted while the chain is down |
| 15 | `p-*` (telegram/teams/zoom/slack/discord) | pockets — the venue modules the chain waits on | `waiting-pockets` carries the missing names | `waiting-pockets` never clears ⇒ chain arms late or never |

## 2. The four state machines

1. **Guard token** (`window[Symbol.for("_0xq06118ef1")]`) — a page-wide "a worker is already on shift" flag.
   `e1` *returns* when it is present. It is set at `e1:145`, cleared only by release/teardown. A reload clears it;
   a re-paste on the same page does **not**.
2. **Stall** (`_0xstall` in `a`) — closed at boot, lifted on the first accepted slot. While closed, `say`/`warn`/
   `info` drop their lines on the floor (`a:243-245`). The `queue` channel is exempt — which is why boot/flush
   details survive while the interesting lines vanish.
3. **Chain** (`_0xmod._e.S._0xchain`) — `no-chain → waiting-pockets → waiting-capability → scanned → armed` and a
   terminal `waiting-chores`. `armed` is the only state that means a session actually exists behind the claim.
4. **Gate** (`_0xmod._rcdGate` in `u`) — `level()` 0/1/2, one 120 s window, `dbgOK`/`rcdOK` flags. Level 0 silences
   the sink entirely (`会員 === 0` returns the noop set).

## 3. Why "returns true, nothing happens" is the natural failure shape

`GoogleUblock` lives in `a`. It calls the gate in `u`, lifts the stall, calls `_0xrevive()` — and `_0xrevive()`
starts a session **only if** `_armed && !_liveSession`, where `_armed` comes from `_0xmod._e.S._0xarm()` — i.e.
from `e1`'s chain. If `e1` stood down at the guard, `_0xarm` does not exist, `_armed` is false, nothing starts,
and `_0xgu` still returns `true`. The same is true of the verbs `res`/`ak`/`view`: they are gate-gated, not
chain-gated. So the claim surface stays usable by design (operator ruling 2026-09-21: the entry point's lifetime
is the window's, not the chain's) — which is exactly why the failure reads as silence instead of an error.

## 4. Reading a capture in 30 seconds

1. `[GDBG] guard verdict at boot:` — `STAND-DOWN` explains almost every "true with no logs" report; `dispatch`
   means the e-piece registered and the fault is later (pockets, stall, or an env bail).
2. Capability matrix rows: `worker token (guard)`, `e-piece`, `chain`, `ledger`, `pockets missing`, `stall`.
   `chain=no-chain` + `e-piece=live` + `token=PRESENT` = the stand-down, confirmed.
3. `__GDBG.report()` — count the `[held]` lines. Everything marked `[held]` is a line the shipped build dropped;
   those are the frames of the "silent" period.
4. Only then read the payload's own lines for progress (`phase-t` ticks, ledger, `Cashed out`).

## 5. Fault map — the three live reports

| report | fault | evidence line | scope |
|---|---|---|---|
| `chain` = `no-chain/ok:false` at claim, `resurgence`, junk passphrase — while phases ran and a quest completed | worker token present ⇒ `e1` never registers ⇒ no arm hook ⇒ `_0xrevive` starts nothing. (The mechanism that *would* explain a later phase tick is now the early-stop candidate — see report §14: a paste that lands before the venue's modules register leaves a permanently inert page. The earlier "a second, already-armed session" explanation is **RETRACTED**.) | `e1:121-125` guard; `chain` diag at `a:302-315` reading `_e.S._0xchain` | single fault, three symptoms |
| `pwdRcd` alone → `true`, no logs | gate accepted (level 1–2, stall lifted) but the chain is down; the lines that would have said so were held by the stall | `u` gate flags; `a:243` stall guards; `e1:173` re-reads `_0xmod.lex` only when the piece ran | same fault |
| view verb → `true`/`undefined`, nothing printed | view prints from `_0xmod._e.S._0xb`; with no e-piece there is no ledger, so there is nothing to print and no line to explain it | `e4:290` (`Ledger: N queued, M settled.`) and `e4:384` (roster/view) | same fault |

**Status (updated 2026-09-27):** the runner has now produced both verdicts live — capture 1 = a genuine
`STAND-DOWN` (fault shape confirmed end-to-end) and the healthy capture (`ctxt.io/3/rgG0bTr4A.md`) = walk
step1→step4 with all four hooks attached, a real ledger and a settled claim. What is still **owed** is a
failing-pass capture *and* a dispatch-shaped capture from the same fresh page with runner v4, so the two can be
read side by side. Readings from captures 2–4 are withdrawn (harness `'use strict'` defect, report §12).
