# O8.14 Full-Debug Runner — Run Card

**File to paste:** `Active/O8.15/Runners/O8.14-debug-runner.js` — **v4**, 372 KB, sha256 `5c7bcf73…`
**Quick start (what to do, what to send back):** `Active/O8.15/Runner-Notes/README.md`
**Fidelity proof (v4):** `node Active/O8.15/tools/fidelity-check.mjs` → **17/17 IDENTICAL**
**Rebuild it any time:** `node Active/O8.15/tools/make-debug-runner.mjs`
**Offline proof that it boots in both page states:** `node Active/O8.15/tools/debug-runner-selftest.mjs`

This is the **8.14 machinery stitched raw**, no obfuscation, with a telemetry harness around it. It is not a
release artifact and changes nothing about the shipped build: same shards, same order, same behaviour — plus
probes that say out loud what the shipped bundle keeps quiet.

---

## 1. What it is, mechanically

| | shipped 8.14 bundle | this runner |
|---|---|---|
| machinery | same 23 pieces, same S4 order | **same 23 pieces, same order** |
| obfuscation | dict → rotate → g7 → v1 → min → u → v2 → mound-e → s4 → stego | **none** — stack traces point at the readable line |
| log sink | bounded (300 chars/line, 256 events, drops while the stall is closed) | **mirrored**: every line additionally printed as `[GDBG]`, with the stall state *at the moment it was emitted*, no caps |
| entry point | `GoogleUblock(...)` → true/false | **wrapped**: prints the slot it matched (by FNV hash — the passphrase text is never printed), the gate flags and level before/after, the chain state before/after, the ledger size before/after, the return value, and the elapsed ms |
| guard | `shard-e1` silently stands the machinery down if the worker token is on `window` | **reported**: `__GDBG.audit()` names which branch will be taken and why |
| harness | `_0xenvOk` / `_0xharness` bails | unchanged (this runner is for the operator's own page) |
| stego staging | cover image → fragment → `eval` | **not included** — the payload is inline here. Staging itself stays covered offline (staged == shipped sha, carrier-flip, hold-check) |

## 2. How to run it

1. Open the venue page. **Do not reload after this point unless a test step says so.**
2. Console → paste the whole file → Enter.
   You will see, in order: `[GDBG] guard verdict at boot: …`, `[GDBG] entry(pwd…)` probes as you type passphrases,
   and — about 1.5 s later — the **capability matrix** (14 rows, each in plain words).
3. Do the passphrase round in the shipped order:
   `pwdRcd` → `pwdDbg` → `res` → `ak` → `view`. One at a time; watch for a `[GDBG] entry(...) called —` line
   and then its `settled:` line. **A `called` line with no `settled` line is itself a finding** (a verb that
   never returns).
4. At any point, in the console:
   * `__GDBG.audit()` — re-print the capability matrix + guard verdict + how many captured lines were *held*.
   * `__GDBG.report()` — the same plus every payload line and every probe verdict, as one copy-pasteable text block.
     **This is what you send back.**
   * `__GDBG.watch()` — a heartbeat every 5 s printing `chain / ledger / stall / token` whenever any of them changes.
     `__GDBG.stop()` ends it.
   * `__GDBG.lines` / `__GDBG.events` — the raw capture arrays if you want to grep them yourself.

## 3. The test protocol you asked for

> quests pre-loaded, one added to the queue midway, stop at the second quest's completion.

| step | what you do | what the runner records |
|---|---|---|
| 1 | Quest 1 pre-loaded **before** the paste, per your protocol | `phase-t` ticks, `phase-n` candidate-store JSON, shelf/settle lines |
| 2 | Paste the runner, then enter `pwdRcd` (or `pwdDbg`) inside the 120 s window | gate flags + level delta, chain before/after, stall before/after, `ran` (was a worker started) |
| 3 | Let the chain arm and start work | chain `waiting-pockets → waiting-capability → scanned → armed`; `[Host 8.14]`/ledger lines with their stall state |
| 4 | **Add quest 2 to the queue mid-run** (your "one added mid-queue") | `[Google Tripup]`/candidate-store deltas, ledger `N queued, M settled` movement, tick numbers |
| 5 | **Stop when quest 2 completes** | one `__GDBG.report()` capture per pass; two passes = two files |

Run it **twice**: once on the page as it is, once after a **refresh** (F5) and a re-paste. Pass 1 vs pass 2 is
the comparison that matters — last time, that difference alone isolated the whole problem.

## 4. What to send back

`__GDBG.report()` output, per pass. Nothing else is needed. If something looks wrong mid-run,
`__GDBG.audit()` first — its guard verdict + matrix is usually enough on its own.

## 5. The three live bugs, and where the runner catches each

| reported shape | what the runner shows | where it lives |
|---|---|---|
| every `chain` diag = `no-chain/ok:false` while phases ran and a quest completed | `guard verdict at boot: STAND-DOWN` + the *held* guard line ("…already on shift…") + chain row reading `no-chain` | `shard-e1.js:121-125` — worker token on `window` ⇒ the e-piece returns before registering; the chain never advances. `a`/`u` still answer `true`, so the claim surface works while no session exists behind it |
| `pwdRcd` alone → `true`, **no logs at all** | `entry(pwdRcd) settled: … returned true` and the row `stall: CLOSED (lines held)`; `__GDBG.audit()` prints how many captured lines were held | two things stacked: `shard-u` (the rcd/dbg gate) opens **independently of the e-piece**, so a claim can be accepted while the machinery is down; and the stall sink swallows the lines at `shard-a`'s `say`/`warn`/`info` guards — exactly the shape of a silent accept |
| quest-queue view returns `true`/`undefined`, nothing printed | the `view` probe prints chain + ledger before/after; ledger `(unchanged)` vs a number distinguishes "empty queue" from "no session" | the view verb prints from `_0xmod._e.S._0xb`; with the e-piece down there is no ledger to print from — same root cause, different symptom |

**Conclusion the code already supports (to be confirmed by your capture, not assumed):** these are one fault with
three faces — *the claim surface (a + u) is independent of the work chain (e1→e4)*. Anything that stops the
e-piece (worker token present, env bail) leaves a page that accepts passphrases and does nothing, and the stall
makes that look like silence rather than failure.

## 6. Deliberate limits (so a green run is not over-read)

* It proves the **entry / gate / chain / ledger / verb** path. Venue-side effects (what the garden actually does
  on the page) are only visible through the payload's own lines — read them in the same capture.
* It does **not** exercise the stego staging path (see §1) and it does **not** stand in for the offline battery
  (decoy-parity, golden, flip, hold-check).
* The passphrase **text is never printed** — only its slot name and FNV hash.
* **v2 adds (2026-09-27, after the second live capture):** the token is snapshotted *before* any piece runs, so
  `STAND-DOWN` now means a genuine leftover-token stand-down and never a healthy paste that planted its own
  token; the session controller and its four hooks (`begin` / `extend` / `roster` / `close`) are reported and
  their calls logged as `ctl.*()`, because a missing hook turns a verb into a silent no-op that still returns
  `true`; the heartbeat also prints `started / ran / claimed / kill`.
* **v3 adds (2026-09-27, after the third live capture):** a **step-walk trace** — `step1 → step4` entry and
  return with `STOP` flagged, a `chain walk (step1..step4)` matrix row and a report section. It answers the
  last open question: *where the walk stops*. Everything e4 does for a session (work loop, venue handshake,
  `begin`/`extend`/`roster`) lives inside `step4`, so a walk that stops earlier = a page that accepts every
  verb and can never start work.
* **v4 adds (2026-09-27): fidelity proven — and a trap documented.** v1–v3 of this harness opened with
  `'use strict'`. The shards are sloppy-mode code (`shard-e2.js:105` assigns `_0xchord` as an implicit global);
  strict mode turned that into `ReferenceError` mid-`step2`, which silently killed `step3`/`step4` and with them
  the work loop, the venue handshake and the begin/extend/roster hooks. That produced a false "armed but idle"
  picture on a live page. The directive is gone. **Proof:** `node Active/O8.15/tools/fidelity-check.mjs` runs the
  shipped bundle, a bare stitch and this runner in identical stub pages and diffs the machinery's own output —
  currently **IDENTICAL (17/17)** on the boot and claim paths. Re-run it after any change to this harness.
* **Classify any passphrase's slot offline:** `node Active/O8.15/tools/slot-classify.mjs <passphrase>`
  (argv only, never written down, never echoed — prints the slot, or "NO SLOT").
* A `[GDBG] … dropped-by-stall` line is *not* an error: it means the shipped sink returned before emitting and the
  line was **dropped** — it never entered the bounded buffer, so no later flush can recover it. Those lines are
  the whole reason a working session can look dead. Live-confirmed on the 2026-09-27 capture: the guard line
  ("Host worker already on shift…") is dropped at boot and never appears again, not even in the claim flush.
