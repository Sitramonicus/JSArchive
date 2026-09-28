# Runner — start here

**This folder is the paste.** One file produces the evidence I need; everything else here explains it.

| file | what it is |
|---|---|
| `O8.14-debug-runner.js` | **the file you paste into the console** (v4, 372 KB). Identity: `5c7bcf73146e91056ffc7856748dce462823049e3f25611b15d093bf0b4fb432` (see `SHA256SUMS.txt`) |
| `RUN-CARD.md` | the detailed run card — what each probe means, the three live bugs and where the capture catches them |
| `SYSTEM-MAP.md` | structure of the harness, for reading a capture afterwards |
| `captures/` | **drop the console output here** (or send a ctxt.io link in chat — either works) |

## Paste it in six steps

1. Open the venue page in a **fresh tab** — logged in, as normal. Quests pre-loaded (quest 1 already in the
   queue or ready to fire). **Do not reload after this point** unless a step says so.
2. Open DevTools → **Console**. If Chrome shows *"Warning: don't paste code…"*, type `allow pasting` once and
   press Enter (it's a one-time unlock; it only appears because pasted code is pasted code).
3. Open `O8.14-debug-runner.js`, select all, copy, paste into the console, press Enter.
   You should see, in order: `[GDBG] guard verdict at boot: …`, then about 1.5 s later the **capability matrix**
   (14 rows, plain words).
4. Fire **quest 2 mid-queue** (your protocol: one added while the chain is working).
5. Work the session until **quest 2 completes**, then stop.
6. In the console, run `__GDBG.report()` — that prints one copy-pasteable block. Copy it, save as
   `captures/capture-<date>-pass1.md`, and send it (or a ctxt.io link).

**Do it twice:** once on the page as-is (pass 1), then refresh (F5), paste again, and repeat (pass 2).
The pass-1 vs pass-2 difference is the part that has been most informative every time.

## What "good" looks like in the capture

* `guard verdict at boot: CLEAN` (not STAND-DOWN) — means no leftover worker token on the page.
* the walk trace `step1 → step4` all **entered and returned**, no `STOP` flagged;
* `session controller created (…owlmpbv…)` and a `ctl hook attached late: begin/extend/roster` line;
* at least one `entry(pwd…) … settled:` line **with** its `settled` — a `called` with no `settled` is itself a
  finding (a verb that never returned);
* the ledger line moving (`N queued, M settled`) as quests complete.

## Two things that are NOT problems

* `error saving setting … console-history exceeded quota` — your devtools, not the payload.
* `[GDBG] … dropped-by-stall` — the shipped log sink dropped that line on purpose (it's closed until a claim
  opens it). It is the reason a working session can *look* silent; the runner prints it rather than hiding it.

Rebuild the runner any time with `node Active/O8.15/tools/make-debug-runner.mjs`; re-prove it with
`node Active/O8.15/tools/fidelity-check.mjs` (must read **17/17 IDENTICAL**).
