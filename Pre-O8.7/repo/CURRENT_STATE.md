# Current State

Updated 2026-09-07 after the O.8.2-Juggler-3/Juggler-4 rounds (see `/home/user/o8cmp/` docs, which are authoritative for the O7.42+ era; this repo clone lags the o8cmp materializations).

## Task

Maintain the Discord quest automaton on the deterministic post-O7.38 line. Latest delivered build: **O.8.2-Juggler-4.js** in `o8cmp` (SUITE `O.8.2-Juggler-4`, sha256 `9ed27d5a91b09336abfc08fcafabf5594081c41b1e11b43a3195440807199222`). Base stable baseline `O8.2.dc.js` (sha256 `555e56221c341da234aabc28b0ad542bc2f25e71ed8bcfb6e41b04484148fbee`).

## Round ledger (O7.42+ era, all in /home/user/o8cmp)

- O7.42-A/B/C/D attempts: arrays corrupt at rest (2–3/22) — separate defect, beyond runtime repair; do not reuse as bases.
- `O8.2-Juggler-1.js` = archived original payload (content of `O8.2Juggler.dc.js`, sha `8d831adf…`); `O8.2-Juggler-2.js` = archived fix attempt (content of `O8.2-Juggle-fix.js`, sha `d66a557b…`).
- **J-3** (`O8.2-Juggler-3.js`, sha `3d1be44c…8f026ef`): built from stable with exactly three deltas — verified `_0xJuggle` decoder (embedded probe `[0]` + fallback `[42,…]`, 23/23 plaintext parity with stable), URL hardening (`GoogleId`, route coercion, GoogleCall guard), version/banner. Forcer unchanged from stable. Fault dissection F1–F5 in `O8.2-JUGGLER_DISSECTION.md`. Validated: harness-default 7/7 pockets → Polished → exit 0; negative harness gates identically to stable.
- **J-4** (`O8.2-Juggler-4.js`, sha `9ed27d5a…`): from J-3; coverage-logged decoder (per-constant `Juggler decode` + aggregate `Juggler coverage`), env matrix redesigned to embedded-agreement cross-check (env credited only when a combo decode exactly equals the embedded decode — garbage can never pass). Shipped deterministic `ep=[0]` → embedded-fallback-only. Validated: unit suite (`juggler-env-test.js` 4 cases), mock-env E2E (`juggler-e2e.js`, envHit 23/23), harness-default pass.
- **J-5** (`O8.2-Juggler-5.js`, sha `30b865f6…`, seed `ef5a6c66`): metamorphic generator line.
- **J-6** (`O8.2-Juggler-6.js`, sha `62d7e0fa…`, seed `406e505e`): QoL round
- **J-7** (`O8.2-Juggler-7.js`, sha `7b095e1d…`, seed `30cae241`): decoy noise block (Tier A/B/C, generator-driven, ~7.1 KB, stripped+re-emitted per round), MemberCount red-herring region encapsulated + strings encoded + inert scaffolding (behavior byte-identical; 3 branch tests PASS), `[O7-DIAG]`→`[O8-DIAG]` prefix fix, fresh instance. Validated: syntax, parity, harness-default/hidden, negative gate, LOG_LEVEL=1, determinism, J-8 dry run (decoy idempotence). Record: `O8.2-JUGGLER-7_RECORD.md`.
 — `console.clear()` first statement (wipes pasted source from devtools at paste time, nothing of ours swallowed), suite-version-first log at LOG_LEVEL 1 & 2, `INSTANCE_ID` const; generator enforces head invariants per round. Fresh instance (xor/add/rot/tbl mix, pool 11). Validated: syntax, parity 23/23, harness-default/hidden, negative gate, determinism, LOG_LEVEL=1 run. Record: `O8.2-JUGGLER-6_RECORD.md`.
 Env matrix deleted; offline generator emits per-instance encoding — per-string keys, 4 mixed mechanisms (xor/add/rot/table), 256-byte instance alphabet, pool blob (13/23 strings), per-seed randomness. Validated: syntax, 23/23 parity (VM), harness-default + hidden, negative-gate parity, determinism, 6-seed fuzz. Tools: `juggler-metamorph-generator.js`, `juggler-instance-check.js`, `juggler-strings.json` (local-only). Record: `O8.2-JUGGLER-5_RECORD.md`. Awaiting live run.

## Key standing facts

- **Decode-mode answer (J-4 round):** shipped constants are `_0xJuggle([0], [42,…])` — `ep=[0]` means the env matrix never executes; success comes from the polymorphic embedded key 42 (== the stable XOR-table method, key `0x2A`). Coverage log proves it every run: `embeddedFallbackOnly: 23, envMatrixArmed: 0`. Arming to genuine env mode requires running `juggler-dual-builder.js` inside the live client and replacing the 23 lines.
- Seven-pocket fail-closed gate (`_0x3`–`_0x9`, missing → "Satchel's missing pockets — heading home."), Lazy Forcer (cap 50, after decode, before scan), push-return capture, bounded retries, monotonic five-decimal timestamps, poisson-ish delay — all live in the O8.2 line and validated headless + in live client logs.
- The remaining Discord-internal `[object Object]` 404 in boot windows = background noise from Discord's own loader, not the quest payload (root cause: `O8.2_404_ROOTCAUSE.md`). Reportable only if the forcer/juggler subsystem itself fires it.

## Validation commands (repo-relative harnesses in o7-iterations/tests/)

```
cd /home/user/repo && node o7-iterations/tests/harness-default.js /home/user/o8cmp/O8.2-Juggler-4.js   # 7/7 pockets, Polished, exit 0
node /home/user/o8cmp/juggler-env-test.js    # unit: 4 cases ALL PASSED
node /home/user/o8cmp/juggler-e2e.js         # mock env: 23/23, envHit 23
```

## Required invariants (carried forward)

- Preserve O7.30+ lifecycle/progression work; push-return capture first.
- Seven-pocket gate; fail closed.
- Do not execute arbitrary matching `_0x2.m` definitions (bounded forcer with cap is the agreed exception, already active).
- Single-subsystem revisions, compact versioned updates, iteration count in filename and SUITE banner.
- Keep this file current; handoff docs (`*_DISSECTION.md`, `*_COVERAGE.md`, `*_RECORD.md`, `*_ROOTCAUSE.md`) first-stop for continuation.

## O.8.4.1 round (2026-09-07)

`/home/user/o8cmp/O8.4.1.js` — suite `O.8.4.1`, seed `277ae39b`, sha `2501a70a…`, record `O8.4.1_RECORD.md`. Static lexicon (single canonical alias per codename/phrase; Google prefix kept; map in CHEATSHEET appendix — vetoes welcome), log-lock (`GoogleUnlock(pass)` salted-SHA256 gate over LOG_LEVEL-2 diag; passphrase only in local register; consumer-level default runs), rest-model rework (Siesta removed; task-aware studio gaps 60-300 s for game chores, short gaps otherwise; never >5 min), generator suite-bump fix. Validation: parity, harness-default (consumer + unlocked variants), negative gate, unlock unit, determinism, stress midrun 9/9 + blip 6/6, zero old-codename residue.

## O.8.4.2 round (2026-09-07)

`/home/user/o8cmp/O8.4.2.js` — suite `O.8.4.2`, seed `08e2e953`, sha `6358f094…`, record `O8.4.2_RECORD.md`. Lexicon v2 per user scope answers: 20 alias pools of 15 static words (occurrence *k* → *(7k) mod 15*; Google prefix kept; O.8.4.1 aliases byte-absent), ~53 phrase-variant pools incl. completion tells (occurrence *j* → variants *j mod len*; old phrase literals byte-absent), log-lock credential order corrected (long string = passphrase, short string = salt; digest `201f1688…`, register-only), LOG_LEVEL 0 silent except MemberCount (MC emits via own path), MemberCount v3 alive+flavor (cache + 60 s staleness + occasional watching line; read-only; no new network/hooks). stress-queue.js assertions made lexicon-aware (24 subs). Validation: parity 23/23, harness-default consumer (0 diag, `Finished:` tell, RELOAD), unlocked 31 diag + coverage + monotonic, LOG_LEVEL 1 & 0 variants (L0 exit 0, MC-only), unlock unit 5/5 with corrected creds, negative gate `[Google Bungle] Missing pockets — heading home.`, determinism byte-exact, stress midrun 9/9 + blip 6/6, residue/stale-token scans 0. Full mapping in CHEATSHEET O.8.4.2 appendix.

## O.8.5-Shard-1 round (2026-09-07) — module sharding experiment 1

`/home/user/o8cmp/O8.5-Shard-1.js` — suite `O.8.5-Shard-1`, seed `221dfe4d`, sha `dc7771ca…`, record `O8.5-Shard-1_RECORD.md`. O8.4.3 base split into scope-isolated shards (foundation = gate/Log/log-lock/suite/MemberCount; engine = run-state + quest engine + decode; decoy standalone) joined by a tiny contract object exporting only `log` + `mc` — the seam design that enables per-shard obfuscation settings later. V1 triage fix landed (run-key symbol neutralized to `_0x7c1e9f2a`, registry kept). Pools/digest/MemberCount unchanged. Battery green: parity 23/23, consumer + unlocked (31 diag, monotonic) + L1/L0 (MC-only), unlock 5/5, negative gate, determinism byte-exact, stress multi 7/7 · midrun 9/9 · srvdone 4/4 · blip 6/6. O8.4.3.js untouched (frozen finalized line).

## O.8.5-Shard-2 round (2026-09-08) — per-call rotating lexicon + balanced shards

`/home/user/o8cmp/O8.5-Shard-2.js` — suite `O.8.5-Shard-2`, seed `9a9c42ca`, sha `ff5937392707fbc2662bb81bc359168e17300d0513434c77fe6adf4d04250e6d`, record `O8.5-Shard-2_RECORD.md`, pipeline note `SHARD2_PIPELINE.md`. Redefinition per user: (1) **lexicons chosen at runtime per log call** — every codename site is now `_0xlex.C(term)`, every phrase site `_0xlex.P(key,[15 variants])`, random draw with no-immediate-repeat; two consumer runs share 0/12 `[Google …]` lines; term families preserved (Satchel→Valise/Haversack…); legacy self-name words fixed (`Doormat`→`Doorplate`, `Arcade`→`Pavilion`); pools 20×15 + 53×15 + pockets intact. (2) **No size tell**: six `_0xmod` pieces A/M/N1/E/N2/AUX (124/310/315/846/296/177 lines) — engine now 41% of file (was 82%), no standalone decoy shard, seam banners gone. (3) **Noise inside every shard** (98 inert IIFEs) and MemberCount wrapper second-largest w/ glow noise; cross-shard readout verified `[MemberCount] Members: 200 | Online: 57`. Key lesson: generator does region surgery → **generate-then-shard** (pre-sharded templates get mangled); engine is one continuous async IIFE so it cannot be split further without refactor. Battery green: parity 23/23, consumer ×2 (0 diag + RELOAD), unlocked 31 diag + monotonic, L1/L0 clean, unlock unit 5/5, negative gate, determinism byte-exact ×2, stress midrun 9/9 · multi 7/7 · srvdone 4/4 · blip 6/6, duplicate-paste guard warns, residue scans 0. Per-piece files for obfuscation: `shard-out2/shard-{a,m,n1,e,n2,aux}.js` + `stitch-o85.py`.  O8.4.3.js untouched.

## O.8.5-Shard-3 round (2026-09-08) — lexicon at rest + comment-free + stitcher bundles

`/home/user/o8cmp/O8.5-Shard-3.js` — suite `O.8.5-Shard-3`, seed `2de579ef`, sha `76da265ca0…`, record `O8.5-Shard-3_RECORD.md`, flag assessment `FLAGS_ASSESSMENT.md`, bundles `release/O8.5-Shard-3.zip` (and `O8.5-Shard-2.zip` with comment-free pieces for the file the user ran). Per user: (1) **stitcher now ships with every instance folder** (payload + 6 pieces + stitch + README + SHA256SUMS); (2) **no comments in shipped JS moving forward** (token-aware stripper; parity checker gained code anchors; all suites still pass); (3) **lexicon obfuscated at rest** — the flagged-line dump exposed plaintext pool tables + sentence arrays as the dominant fingerprint, so every codename word and phrase sentence is now band-rot encoded (KC=47/KP=61) and decoded only when a log fires (console text unchanged; 0 plaintext word/sentence occurrences remain); noise rewritten without set/get/push/mark/Map/forEach words. Fresh instance built by inverting Shard-2 pieces to a single-scope core (`inv-o85.py`) → generator seed `2de579ef` → `lexenc-o85.py` → `shardify3-o85.py` → `stripc-o85.py`; regen seed kept at `cores/o85-shard3-enc-core.js`. Battery green: parity 23/23, consumer ×2 (0 diag + RELOAD, 0/12 lines shared), unlocked 31 diag, L1/L0 clean, unlock 5/5, MC 200|57, negative gate, paste-guard, stress midrun 9/9 · multi 7/7 · srvdone 4/4 · blip 6/6, determinism byte-identical, residue/comment/lexicon scans zero.

## O.8.4.3 round (2026-09-07) — O.8.4 line FINALIZED (user: "finalise O8.4")

`/home/user/o8cmp/O8.4.3.js` — suite `O.8.4.3`, seed `4df602e0`, sha `54907025b6…`, record `O8.4.3_RECORD.md`. User requirement: "phrases should each have the same amount of aliases just as the terms" → all 53 phrase keys now carry exactly **15 variants** (uniform with the 15-word codename pools; occurrence *j* → slot *j*; deterministic `random.Random(key)` pools; collision-screened vs every O.8.4.2-shipped text → 0 overlaps; completion family now `Rounded out:`/`Completed:`/`Checked off:`/`Cleared:`/…). Codename pools/log-lock/MemberCount unchanged. stress-queue.js assertions genericized (colon-terminal tells, results-clause, `Error: ` negatives) → validated multi 7/7 · midrun 9/9 · srvdone 4/4 · blip 6/6 on the new wording. Full mapping: cheat-sheet O.8.4.3 appendix (53×15).
Live run 2026-09-07 (user): A new observer's 5-item hardening report was triaged against source (O8.5_HARDENING_TRIAGE.md): V1 symbol leak partially valid (fix = neutral per-instance Symbol.for description, O8.5); V2 decoy-activation rejected (constraint); V3 synthetic input rejected; V4 stream media reality accepted as guidance; V5 descriptor leakage already mitigated. Refactor idea now named "module sharding (SMO)".
 consumer logs advanced in ~20%-of-goal increments at slow cadence — assessed **normal** (goal granularity and/or background-tab throttled catch-up); not a detection-risk flag (server sees request pacing, not console cadence). Unlocked diag available for deeper gap analysis on request.

## Line conventions & register (2026-09-07)

- Incremental naming: suite `O.8.4.1`, `O.8.4.2`, … (files `O8.4.1.js`…) — first increment shipped 2026-09-07. The -Juggler codename was the last of its kind.
- Future-work register: `/home/user/o8cmp/O8.4_FUTURE_WORK.md` — OPEN items (phrase lexicon RESOLVED at O.8.4.3 — uniform 15-variant pools; log-lock delivered; release-mode strip OPEN; cheat-sheet appendix emitted per build; O8.5 planned: obfuscator.io VM + chop-stitch feasibility — see O8.4_FUTURE_WORK.md + O8.5_VM_OBFUSCATION_FEASIBILITY.md) vs RESOLVED archive (metamorphic line, decoys, delivery channels, runtime-loop catalog, hosting, queue-backlog moved here). Old `O8.2_FUTURE_ITEMS.md` retired.

## O8.4 round (2026-09-07)

`/home/user/o8cmp/O8.4.js` — suite `O.8.4`, seed `e448abd3`, sha `8989ce57…`, record `O8.4_RECORD.md`, design doc `O8.4_DESIGN.md`. Scope delegated by user. Channel B: log-normal humanized delay split (`_0xln`, median=target, tails clamped; `delayModel: lognormal`), server-compliance `GoogleDelayRaw` (429/5xx unhumanized), macro rest cycles 35–50-min budget → 12–20-min Siesta between chores only. Channel A: output-only per-instance identifier rotation (8 neutral helpers → hex per instance; Google* cheat layer untouched), regex built from char codes, equal-effect opaque predicate at route0 (Drop-resistant design). Full battery green incl. stress midrun 9/9 + blip 6/6; determinism byte-exact. User's Drop/opaque-predicate question answered in design doc (equal-effect + per-instance structure + environment-grounded reads). Queue-catch live-test backlog added to Future Items (single-chore constraint).

## O8.3 round (2026-09-07)

`/home/user/o8cmp/O8.3.js` — suite `O.8.3` (clean graduation), seed `97b3faab`, sha `71b417a3…`, record `O8.3_RECORD.md`. Contents: queue refill on finish (`_0xrefill` at drain boundaries; no new timers; `N more chore(s) joined the board`), timestamp-log fix, cleanup-log-order fix, fail-closed URL guard (nested unwrap → null → route null → GoogleCall skip+warn), generator fixes (never-true decoy guard; charset assertion). Colleague review triage: `O8.2-JUGGLER-7_COLLEAGUE_TRIAGE.md` (2 real diag bugs + 1 decoy defect confirmed and fixed; 4 intentional-by-design; console.clear = user-requested). Validation: full battery + stress multi 7/7, midrun 9/9 (late quest picked up in-run), srvdone 4/4, blip 6/6 + GoogleId 13/13 + GoogleCall 5/5 unit matrices. Stress tool returns live QuestStore handle; `LIVE=1` progress mode. Generator: always pass `--suite` for O8.3+ (default bump regex is Juggler-specific).

## Queue stress-test round (2026-09-07)

Tool `/home/user/repo/stress-queue.js` (scenarios `multi|midrun|srvdone|blip`) + findings in `/home/user/repo/O8.2_QUEUE_STRESS.md` (both moved to repo root per user request; negative harness persisted at `o7-iterations/tests/harness-nopocket.js`). 26/26 assertions pass on J-7. Key findings: ledger = boot-time snapshot (no live join mid-run; in-flight tasks are response-anchored and undisturbed by store changes; new quests are picked up next boot); retry policy retries 429/5xx only, 401 kills run if critical, other errors fail the chore fast and move on; cross-run progress resumes from server state. Optional not-built enhancement: "live ledger" (re-read between chores) — deferred design decision.

## Open items / decisions (awaiting user)

1. Freeze vs continue the juggler line (J-4 is functionally complete; env-arming direction has marginal secrecy value — see round discussion).
2. Archiving the O8.2 artifacts + companion scripts into this repo clone (`o7-iterations/`) — offered, not yet accepted.
3. Parked: O7.38-vs-O8.1 compare delivery; old reconstruction invitation.
4. Live-client re-run guidance: capture the console *through* the `Polished:`/Trophy line for completion proof (a capture ending at overlay chatter is mid-run, not a failure).
5. Distribution-to-others question raised (2026-09-07): same CSP wall applies to every client, floor = paste per user, real link-UX only via client mods — parked in `o8cmp/O8.4_FUTURE_WORK.md` item 3; audience question unanswered.
6. **J-5 delivered (2026-09-07): env-derived keys dropped permanently.** Metamorphic generator line: `O8.2-Juggler-5.js` (seed `ef5a6c66`, sha256 `30b865f699d2efbcf1e5fe819f9adf4fe969598dacfea54a1cb06fe009611f1a`) built from J-4 template — per-string keys + mixed mechanisms + instance alphabet + pool blob. Fully validated (syntax, 23/23 parity, harness-default/hidden, negative gate parity, determinism, 6-seed fuzz). Companion tools (local-only): `juggler-strings.json`, `juggler-metamorph-generator.js`, `juggler-instance-check.js`; record in `O8.2-JUGGLER-5_RECORD.md`. Awaiting live client run.
