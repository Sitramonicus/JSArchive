# HANDOFF — O8.14 CC-33 — head of file (read this first)

**State as of 2026-09-22 (later): BUILD 23 is live in both mirrors and FROZEN — the final 8.14 pack.** (`Working-Stable/O8.14`,
`Archives/packages/O8.14`; digest-identical, `sha256sum -c` 8/8). Paste **`O8.14-runner-ad898afb.js`**.
Freeze record: `Working-Stable/O8.14/FROZEN-2026-09-22.md`; carry-forward: `Handoff/O8.15-BACKLOG.md`.
Cover `3bf21868` · bundle `820f06c2` · payload `28d36d97` · decoy `55895e58` · honey `88397e56` · tube
`ed0db1cd` · rotation `f9f5c4c1`.

**Do not paste `71b73a15` (build 22)** — it is the build that produced trace #5: blank `[Google ]`
channel labels after a release, and a mid-session claim that started a **second** session on a ledger the
first had already nulled (`Kicked back an error: Cannot read properties of null (reading 'length')`, then
a duplicate `Session closed`). Also do not paste `4bdc2279` (build 20), `da36606e` (19), `b5773b53` (18),
`42b84dc8` (17), `a3de4ad2` (16), `96073d39` (12) or anything older. b22's bytes are kept as the only
bit-exact rollback in `Archives/rollback-b22/` (js-confuser is not seed-reproducible).

**What build 23 changes** (trace #5: `https://ctxt.io/3/mQgkvEsTe.md`; write-up
`Handoff/O8.14-TRACE5-FOLLOWUP-2026-09-22.md`):

1. **Labels survive the release.** The lex decoder snapshots the 20 channel families while the packed
   tables are alive (`_0xchSnap` in `shard-m1.js`) and falls back to the snapshot on an empty decode —
   `[Google Sill] Session closed — …`, never `[Google ] …`. The table wipe (the anti-decoder property) is
   untouched.
2. **One session at a time.** `shard-a.js` gates `begin()` on `_liveSession` (chain `live` or the started
   flag), so a claim never starts a second worker; `shard-e4.js` stops the loop cleanly on a vanished
   ledger (`if (!Array.isArray(S._0xb)) break;`).
3. **`QUNS for Delta Force: undefined` is the host client's overlay stack**, not ours: no shard emits that
   prefix, it fires for every tracked game claimed or not, and we hold no handle to it. Not a
   vulnerability in the payload; nothing added for it.
4. **Tooling repaired:** `hold-check` treated a single red row in `chain-revive-check` as *no runtime
   evidence* (the JSON prints before the non-zero exit, but `execFileSync` threw first) — it now reads the
   JSON off the error object, which is why a b23 board run could show `hold-check FAIL (6/9)` on bytes whose
   surface was fine. `repaste-check`'s header no longer describes the retracted "console clear" model.

**Verification on the shipped bytes:** `chain-revive-check` **14/14** (source stitch 14/14; **11/14** with
the three trace-#5 fixes reverted — C10/C11/C12s red, nothing else disturbed) · `hold-check` **9/9** ·
`gate-replay --spec` **17/17** · gate matrix unlocks 2/2, verbs rejected 3/3, post-window torn down 5/5 ·
`repaste-check` **5/5** on the new runner · matrix **25/0** · tiers **42/0** (1 skipped; the one intended
`--debug-name=ripcord` fail-closed) · carrier-flip **14/0** · detector **PASS** · netwatch **0/no URLs** ·
dangling payload **61 / 0 on an error path** · bundle **36 / 0** · decoy parity **×3** · golden **PASS 25
events** · leakcensus payload **G3 = 4** — the same three families as before (our `_0xpocketsMissing`,
the venue property `dispatch`, the mound layer's `IS_SYMBOL_NATIVE`, verified absent from every shard and
every pre-mound stage; the count moves because js-confuser is not seedable) · board `FAIL lines: 2` = the
intended T2 fail-closed + the census.

**Still owed to the operator:** LIVE-16b masking decision · LIVE-10 enrolment policy · the three older
questions (the bare `false` in an unclaimed pass, the `会員 = 0` consequence, quest progress after a
claimed session) · a live paste of `ad898afb` in the four modes the pack README lists (the fourth is the
trace-#5 acceptance: claim twice while live, then read the post-release labels) · and a call on whether
`leakcensus` should learn to attribute mound-generated identifiers (offered, gate untouched).

## Previous head — build 22 (kept for reference)

**State as of 2026-09-22: BUILD 22 is live in both mirrors** (`Working-Stable/O8.14`,
`Archives/packages/O8.14`; digest-identical, `sha256sum -c` 8/8). Paste **`O8.14-runner-71b73a15.js`**.
Cover `d1c3ce21` · bundle `99327099` · payload `9ee49896` · decoy `55895e58` · honey `88397e56` · tube `ed0db1cd` ·
rotation `5bc7746c`.

**Do not paste `4bdc2279` (build 20) — it is the build that broke.** A finished session was relaunched
every 5 seconds forever (the retry had lost its `closed` guard), the retry's own timer read a variable
from another block (`Uncaught ReferenceError: _0slow is not defined`), and — the amplifier — both the
no-chores path and the finished-session `finally` called `GoogleRelease()`, which is one-shot and aborts
the shared controller every later piece captured at load, so **any** revival was born dead. Also do not
paste `da36606e` (build 19), `b5773b53` (build 18), `42b84dc8` (build 17), `a3de4ad2` (build 16),
`96073d39` (build 12) or anything older.

Full write-up of the incident: `Handoff/O8.14-INCIDENT-RESTART-STORM-2026-09-22.md`.

**What build 22 changes** (all four are the incident's fixes, plus the pipeline repair):

1. **The retry settles.** It ends on `closed` **and** `live` (and on `_0xkill`, and after 30 fast ticks).
   A finished session is reopened by a NEW CLAIM, not by the retry. Kill-switch: C9.
2. **`GoogleRelease()` is reserved for a page that is genuinely over.** The no-chores path (e2) and the
   session `finally` (e4) no longer release; a *waiting* page waits, a *finished* page stays usable.
3. **A released page refuses to run** instead of dying loudly: `begin()` returns `false`, the worker head
   returns before claiming `live`, and the claim report carries `"released":true` alongside
   `state/ok/missing/ran`.
4. **The payload-level error-path dangler is repaired in the pipeline.** Terser's compressor dropped a
   `var` (`vecto615`) whose only read sits inside a `catch`; the bundle was clean, the payload was not.
   The stego builder now scans the minified payload and declares any such name at the top
   (`[gate] error-path dangle repair: declared 1 name(s): vecto615`). `hold-check` H6 was also fixed to
   read the runtime surface instead of a byte literal, the same rule H4/H5 follow since 2026-09-21.

**Verification on the shipped bytes:** `chain-revive-check` **10/10** (C1–C9, incl. the new C8/C8b/C9;
negative control 8/10 with the two faults restored) · `hold-check` **9/9** · `gate-replay --spec`
**17/17** · matrix **25/0** (unlocks 2/2, verbs rejected 3/3, post-window torn down 5/5) · tiers **42/0**
(1 skipped; the one intended `--debug-name=ripcord` fail-closed) · carrier-flip **14/0** · detector
**PASS** · netwatch **0/no URLs** · dangling payload **45 / 0 on an error path** · bundle **29 / 0** ·
decoy parity **×3** · golden **PASS 25 events** · leakcensus payload **G3 = 3** (`dispatch`, `stream`,
`shift` — venue-property/generic words inside mangled identifiers; LIVE-16b masking is still open) ·
board `FAIL lines: 2` = the intended T2 fail-closed + the census.

**Still owed to the operator:** LIVE-16b masking decision · LIVE-10 enrolment policy · the three older
questions (the bare `false` in an unclaimed pass, the `会員 = 0` consequence, quest progress after a
claimed session) · and a live paste of `71b73a15` in the three modes the pack README lists.

## Previous head — build 19/20 (kept for reference)


**State as of 2026-09-21: BUILD 18 is live in both mirrors** (`Working-Stable/O8.14`,
`Archives/packages/O8.14`; digest-identical, `sha256sum -c` 8/8). Paste
`O8.14-runner-b5773b53.js`. Cover `6239c8e0` · bundle `0e69ce29` · payload `02e398bb` · decoy
`55895e58` · honey `88397e56` · tube `ed0db1cd` · rotation `5bc7746c`. **Do not paste** `42b84dc8`
(build 17: a benign stand-down deleted the entry point, so a paste after a console F5 answered
`GoogleUblock is not defined`), `a3de4ad2` (build 16: a claim through `GoogleUblock` did not lift the
stall, and unclaimed sessions still reached the venue), `96073d39` (build 12: no stall), `e38b0053`,
`660b370b`, `e59965b5`, `9c9cb73e`, `ebed4b91`, `d659259c`, `bd53be4f`, `09ce4c0c`.

# HANDOFF — O8.14 CC-33 — head of file (read this first)

**State as of 2026-09-21 (late): BUILD 19 is live in both mirrors** (`Working-Stable/O8.14`,
`Archives/packages/O8.14`; digest-identical, `sha256sum -c` 8/8). Paste
`O8.14-runner-4bdc2279.js`. Cover `85b96342` · bundle `3f501fd8` · payload `8bf1e4b3` · decoy
`55895e58` · honey `88397e56` · tube `ed0db1cd` · rotation `5bc7746c`. **Do not paste** `da36606e` (build 19: revive worked but the level-2 jump-start was unproven and there was no restart hint; superseded by the re-cut) or `b5773b53`
(build 18: the entry point survived, but a reloaded page could still have a claim surface with **no
machinery behind it**), `42b84dc8` (build 17: a benign stand-down deleted the entry point, so a paste
after a console F5 answered `GoogleUblock is not defined`), `a3de4ad2` (build 16: a claim through
`GoogleUblock` did not lift the stall, and unclaimed sessions still reached the venue), `96073d39`
(build 12: no stall), `e38b0053`, `660b370b`, `e59965b5`, `9c9cb73e`, `ebed4b91`, `d659259c`,
`bd53be4f`, `09ce4c0c`.

**Two operator asks from the full trace are now in:** a `pwdDbg` claim is a proven jump starter (C8
level 1 and level 2), and a claim-gated one-shot restart hint prints only after the fast retry window.

**F5 semantics (operator, 2026-09-21 — correction, applies to everything):** **F5 is a standard page
reload.** There is no console-clear mechanism; nothing survives the reload; `Console was cleared` is just
the reload clearing the console log. The build-18 entry's "console *clear*, not a reload" framing is
**retracted in place** in `CHANGELOG.md`, the shard-a comments that said "console clear" were rewritten,
and nothing in the code or the docs depends on it any more.

**Operator trace #4 ("why is store dead?") was triaged and fixed** —
`Handoff/O8.14-TRACE4-STORE-DEAD-2026-09-21.md`. Verdict: **nothing in the venue was dead; both lines
were our own bookkeeping reporting "my own reference is not there".** `storeDead` / `totalCandidateStores:
-1` counts *our* store handle (`-1` = "no usable reference", not a venue count), `Ledger closed.` is a
*session* fact, and the `Host config` / `Store check` / `Pocket check` block that looked like a venue
verdict is our own payload self-check (now marked `scope: "payload"`). The page in passes 1/2 was a
fresh page after a reload with a **paste that landed before the client had registered its modules**: the
paste-time pocket scan is one-shot, the worker's only door was the one-shot boot handshake, so the chain
stood down silently and the claim answered `true` into nothing. Pass 3 (client restarted, pasted once the
client was up) worked — same payload, same slots.

**Fixed in build 19:** the chain is a named state machine and can be **revived from a claim**
(`_0xarm()` / `_0xseed` / `begin` / `extend` / `roster`, published outside the worker); an accepted claim
sets `S._0xclaimed`, re-arms, calls `begin()` and reports `[Google diag] chain {state, ok, missing, ran,
revived}`; the late-arm retry keeps a **slow tail while a claim is present** (claim-gated, so a decoder
still gets nothing); the session teardown no longer throws our captured references away; the store/ledger
diags tell the truth (`storeHandle: "not-loaded" | "unexpected-shape"`, real candidate count, `chain`,
`pocketsMissing`, `ran`); and the leftover `F5 whilst in console` line — a product of the retracted
theory — was replaced with `Session closed — the ledger stands until a new claim.`

**Verification on the shipped bytes:** `tools/chain-revive-check.mjs` **8/8** (negative control 3/6) ·
`tools/hold-check.mjs` **9/9** · `tools/gate-replay.mjs --spec` **17/17** · `tools/repaste-check.mjs`
**5/5** · matrix **25/0** · tiers **42/0** (the one intended `--debug-name=ripcord` fail-closed) ·
carrier-flip **14/0** · detector **PASS** · netwatch **0** · dangling payload **45 / 0 on an error path**
· bundle **26 / 0** · decoy parity **×3** · golden **PASS 25 events** (unchanged) · leakcensus payload
**G3 = 7** (ours/generic: `pockets` ×2 from `_0xpocketsMissing`, `dispatch`, `native` ×4 from the helper
library — up from 3 in build 18; LIVE-16b masking is still the operator's call).

**Still owed to the operator:** LIVE-16b masking decision · LIVE-10 enrolment policy · the three older
questions (the bare `false` in an unclaimed pass, the `会員 = 0` consequence, quest progress after a
claimed session) · and the live paste of `da36606e` in each of the three modes in the pack README.

## Previous head — build 18 (kept for reference)

**Operator trace #3 (console F5) was triaged and fixed** —
`Handoff/O8.14-REPASTE-DEFECT-2026-09-21.md`. Verdict: two coupled defects, not a mystery. (1) The
ten **benign** stand-down sites (no eligible chores / chain finished / pockets incomplete / latency
shape implausible / boot check / venue never answered) each called the hard deleter, so a page where
the chain had merely found nothing to do was left with **no claim surface**, while `[Host 8.14]` and
the garden kept printing. (2) Nothing checked *ownership*: the once-only guards keyed on the name and
on the previous paste's globals, so an **older session could outlive and block a newer paste** — the
residual behaviour the operator described.

## What this build does that the last one did not

1. **Benign stand-downs keep the claim surface.** Those ten sites now call
   `_0xmod._standDown('<reason>')` (the reason is recorded, for the trace) and leave
   `window.GoogleUblock` alone — the entry point's lifetime is the **window's**, not the chain's.
   Hard removals remain for the release verb, the window expiring unclaimed, and the environment
   bails, none of which is reachable on a page that ever published an entry point.
2. **Ownership, so a session can only remove its own entry point.** Shard-a records the function it
   published (`_0xmod._entry`); the window-expiry fallback returns **silently** when
   `window.GoogleUblock !== _0xmod._entry` (it neither deletes the newer entry point nor paints its
   garden over a live session), and the hard deleter is gated on the same check. A later paste always
   wins — superseded, never blocked.
3. **Kept from build 17:** the work hold (no venue access without a claim), the claim-lift
   (`_stallLift`), the 2-minute window, the decoy-identical garden fallback with teardown, U3's 4-way
   interleave, `pk31..pk39`, derived `SKEY`, `unenrolled` reasons at level ≥ 2.
4. **Cost:** payload +17.9 KB (2 295 382 → 2 313 305 B); cover re-embedded (`28da49e1` → `6239c8e0`);
   decoy/honey/tube/rotation byte-identical.

## Acceptance on the shipped bytes

**The reported defect, reproduced and closed:** `tools/repaste-check.mjs` **5/5 asserts** — entry
published at +1.1 s, **still there after the chain stood down** (+9.0 s), survives the console clear,
paste 2 publishes **its own** entry at +15.4 s, exactly one garden, entry off `window` at +134.1 s
(paste 2's own window; the old session's expiry at ~121 s touched nothing). `gate-replay --spec`
**17/17** (incl. new **S12a** stand-down keeps the surface, **S12b** superseded session neither
deletes a newer entry nor paints its garden) · hold-check **6/6** (H4 structural — the lane obfuscator
encodes the hold keys into its string table, so a byte-grep was the wrong tool — and new **H6**:
stand-down hook present in the shipped payload) · matrix **25/0** · tiers **42/0** (1 skip;
`--debug-name=ripcord` fail-closed) · carrier-flip **14/0** · detector **PASS** · netwatch **0/no
URLs** · dangling **0 on an error path** (49/28/28 names total) · fullwire **no freeze** · decoy parity
**PASS ×3** · golden trace **PASS, 25 events** (re-baselined for the single retired deleter-read
event; build-17 reference and raw diff kept beside it) · leakcensus payload G3 = 3 generic words,
bundle every hit classified deliberate. Build-18 board log: `Active/O8.14/CC-33/reports/board-b18.log`;
re-paste log: `reports/repaste-b18.log`; 25-minute pre-set uptime trace:
`reports/uptime-trace-b18.log` (running at handoff time).

## What this build does that the last one did not

1. **The work hold.** No claim yet → the machinery does not touch the venue: the shared wrapper behind
   `pk34`/`pk35` answers the benign `{ body: {}, skipped: true }` shape. Driven by the operator's own
   evidence (quest progress 33 → 44 that stopped with our machinery). Lifts on claim; consequence
   flagged for sign-off: `会員 = 0` is unclaimed too, so it now makes no venue calls.
2. **A claim through `GoogleUblock` now lifts the stall.** It did not in build 16: the assignment
   landed outside the closure owning `_0xstall` (a global in sloppy mode), so the session returned
   `true`, stayed silent and suppressed the garden. Now `_0xmod._stallLift()`; gate **S11** asserts all
   four states and that no global leaks.
3. **Tools repaired:** `split-equivalence.mjs` was passing `--pre a,b,c` as one path (so every
   e-family trace, including the LIVE-3 golden, ran with the string tables unloaded) and its host fed
   `lat` in a shape that made each step throw on line 1. Fixed; golden trace re-recorded at 26 events,
   replay stable. New `tools/hold-check.mjs` (5/5 on shipped bytes).
4. **Kept:** the stall (Host + MemberCount allow-listed by char-code construction, Player welcome,
   silence), the decoy-identical garden fallback + teardown, the 2-minute window with the never-stored
   `名`, U3 4-way interleave, `pk31..pk39`, derived `SKEY`, `unenrolled` reasons at level ≥ 2.

## Acceptance on the shipped bytes

`gate-replay --spec` **15/15** (S1–S8, S9 claimed-alive@300 s, S10 stall, S10b teardown, S10c
allow-list, S11 hold key) · hold-check **5/5** · matrix **25/0** (4-way assert) · tiers **42/0** (1 skip; `--debug-name=ripcord`
fail-closed) · carrier-flip **14/0** · detector **PASS** · netwatch **0/no URLs** · dangling **clean** ·
fullwire **no freeze** · decoy parity **PASS** · golden trace **PASS 16/16** · leakcensus G3 = the three
known our-own words. Full-runner traces (unclaimed + claimed) in
`Handoff/O8.14-STALL-TRACE-2026-09-21.md`.

## Open (none blocks the paste)

- **Operator live paste (the one that matters now):** repeat trace #3's three moves — paste, console
  F5, paste again — and confirm `GoogleUblock` is there both times, with a working
  `GoogleUblock('ripcord')` after the second paste. Unclaimed: Host/MemberCount/welcome → silence →
  garden at ~120 s → stop. Claimed: machinery speaks at once and stays alive.
- **Three questions from the build-17 note are still open** (a) the bare `false` on the console in an
  unclaimed pass, (b) sign-off on the `会員 = 0` hold consequence (total silence, no garden),
  (c) whether the quest-progress reading you saw resume is the confirmation you wanted.
- **LIVE-16b** — G3 residue (`dispatch`, `stream`, `shift` per the build-18 census; build 17 reported `native`, `pockets`, `dispatch`)
  is *our* wording, maskable with the same opaque-prefix helper. Awaiting your word; it rewrites
  working e-chain code, so it was not done unilaterally.
- **LIVE-10** — enrolment standard deliberately unchanged (property-presence skip, not a type filter);
  the level-≥2 reasons are the measurement that should settle it.
- **LIVE-12** — closed as "does not re-land" (0 green / 10 rolls, every roll `DANGLING-IN-CATCH` with
  the layer demonstrably active); evidence comment in `obf-mound-e.js` +
  `Handoff/O8.14-LIVE12-CAMPAIGN-2026-09-21.md`.
- Standing: R2-04 full custom VM deferred until after live telemetry; U9/U16 parked by decision.
