# O8.13 Collated Avenues — every change that can hide Discord + ready experiments

> Source: `AVENUES-r3-Inventory.md` (27 REPORT vectors) + `r3-AVENUES-APPROVED` subset + new Discord-uniformity add. This file is the **checklist**; tick off as you land them in `Active/O8.13/`.

## Already landed in R4 (frozen, do not redo)

- [x] **Q** `1.28M dead 47%` → `320KB Uint8Array scratch + _scratchRead(seed)` referenced by pockets
- [x] **O-split** `DICT_SPLIT 780×3 getDictForTag(tag%3)` per-tag rotation (live still 5288, split view)
- [x] **R lite** `0x5033→0x9A7F` + comment `c0..3/o0..3` decoy (true 4-way deferred)
- [x] **S** `SHA 69` → `String.fromCharCode SA/SB` + `crypto.subtle` variable
- [x] **T** pins literal → `FNV(master+":rcd-u")` + jitter
- [x] **U** `Google ledger` literal → `fromCharCode` in all shards
- [x] **V** 8 globals → `const _GJ=(k)=>window[k]; lex.C()=>_GJ(var)` indirect
- [x] **W lite** honey `6+1` uniform (needs variance)
- [x] **A** tripwire `24→8 per IIFE + _badSeq*31+pos` order checksum
- [x] **Quota guard** `slice 600` + `console.clear`
- [x] **1024 BMP** `1024×768` embedded (salt `3f72a1ec` 53.92%)

## Discord-stealth core — the only way Discord stops poking out (P0)

- [x] **A1** ~~O→real~~ **landed 2026-09-17 (i)** — the documented `O()=>u(...)` had no target (`O(`/`u(` 0x in all five pockets). Real gap was that only discord+zoom read their host; telegram/teams/slack now use discord's exact guarded-live-read shape. Census 1077/253 -> 1094/257. `shards/shard-p-telegram.js, p-teams.js, p-slack.js, p-zoom.js: O()=>u(...,tagSeed) 1.8KB GoL` — makes all 5 dynamic live, not just Discord
- [x] **A2** ~~e guard variable~~ **closed 2026-09-17 (i)** — `98400` appears 0x in `shard-e.js` and 0x in the bundle; no payload target. The carrier constant landed as **DS-2** cover slack (`slackFor`/`stripOff`/`rStartFor`, slack 574 B). `shards/shard-e.js: 98400/4 → R*K*3/4` (bmp rows*cols*3/4 + jitter)
- [x] **A3 Guild literal offload** — already landed; `Guild` is 0x in the shipped bundle (G7 handles it). `p-discord G7 wordlist: "Guild" → fromCharCode` or honey-only
- [~] **W full** honey jitter `5–7 per pocket` — **NOT landed.** The ripcord-window half landed as **HNT-W** (62 800 ms jitter), but the *honey-count* half and the cross-decoy half did not. See TRP-E below. honey jitter `5–7 per pocket` (cross-decoy: `p-telegram` lists Discord honey) — break `Uniform 6` YARA
- [x] **B1 OTO raise** — landed as **OTO-1** 2026-09-17 (e): all five pockets on `v1-jso-s3matrix`, `e` untouched at 8.7x the largest. `oto/scripts/obf-minify-family.js` — move `p-*` to `v1/v4/v8` equal to `e` hardest, 1–2 mounded `>e`

## High-value hunter-first remaining (P1 — do together, bulk rebuild)

- [x] **K** — b64 half already done in r3 (12 tables + FY permute). Script-usage half landed 2026-09-17 (l): per-lane rotated slices of the balanced 5k, top/even 3.53x -> 2.36x, 20/20 blocks. `obf-strings-g7.js: 104 alphabets →12 + runtime permute` — saves 80KB, kills `104×91` regex
- [-] **L** — **KILLED, premise inverted.** `TextDecoder` 1x, `new TextDecoder` 0x, `decode(` 0x; no 179k-class outlier exists (max is `function(` 1331). Avenue V already routed globals via `window[k]`, so there is no call histogram to cache. `TextDecoder cache: Map key=seed` — `179k →1.2k` histogram
- [-] **P** — **KILLED, no target.** `split("|")` 0x, `trampoline` 0x, and a sweep for `.split(<any literal>)` returns zero matches in 1.8 MB. The YARA construct does not exist in this line. `build-s4-final-package.js: split("|") trampoline → tbl=[f0,f1]` — kills `split("|")` YARA
- [x] **N** — landed 2026-09-17 (i) with DS-2: `slackFor(head)` shifts strip+real off the fixed offset (574 B), all five coupled sites moved in step, new assert `HNT-N cover slack shifts strip` fails the old zero-slack carriers on purpose. `Active/Stego/build-stego12-r2.mjs + cover-gen.py: slack 0→1k random` + keep 1024 grain — kills zero-slack check
- [x] **X** — already landed; `shard-p-discord.js:38-42` reads `getAllGuilds()/getGuild()` then `_0xg.name || _0xg.id`. `p-discord.js live-read mimicry: Discord.getGuild?.name ?? "g1"` then discard before honey — beats hardcoded-fiction test
- [x] **Y** — landed as **HNT-Y**; `shard-a.js:14-24`, both-marker requirement documented for FP rate. `all shards early return if globalThis.__DUMP|process.env → Life garden` — beats harness2.js 1153-session brute

## Still not implemented (verified 2026-09-17, before go-live)

- [ ] **TRP-E cross-pocket decoy** — measured: `Discord` appears 0x in `shard-p-telegram.js` and
      `Telegram` 0x in `shard-p-discord.js`. Honey prefixes therefore still cluster by platform,
      which is exactly the tell this avenue was meant to break. This is also the unfinished half
      of **W full**.
- [ ] **W full honey-count jitter** — every pocket still emits a uniform set; the `5–7 per pocket`
      variance that breaks a `Uniform 6` YARA rule was never built.
- [ ] **CAR-M** 4-bit -> 2-bit dither (the inventory's "biggest win", deferred on capacity —
      occupancy is now 61.37%, so the capacity argument is weaker than it was).
- [ ] **H** split `shard-e.js` into halves (hides the largest-shard tell; costs census 1070->1400).
- [ ] **D** true 4-way `R9R0..3` (needs a `target.md` regex change; breaks the ctxt.io single URL).
- [ ] **DIC-E/F/G** dict length 8-20 / near-duplicate groups / invisible variants — verdict was
      *avoid* (size blow, bidi flag).
- [ ] **wasm** avenue — blocked by Discord CSP, not by us.
- [ ] **Naming scheme** — the operator asked for a comprehensive scheme to replace the colliding
      single-letter IDs. Proposed, **never approved**. This file is the evidence it is needed.
- [ ] **Credential hygiene** — four handoff snapshots under `Active/O8.13/` and `Active/O8.12-r4/`
      still hold all five passwords in plaintext, contradicting `HANDOFF.md` §0b.B. Operator call,
      not resolved. Separately: the repo was measured `private=False` with
      `Uploads/Passwords so I dont have to paste them.txt` in git history — a **pre-push blocker**.
- [ ] **Pt13 salted digest** and the `jso ∩ runner = 340` overlap (16-point 14/16; both
      long-standing, surfaced not hidden).

## Optional / deferred (P2 — discuss before doing)

- [~] **O-full** — **superseded.** The dictionary swap of 2026-09-17 (l) already moved the lanes onto the balanced 5k. What remains of the original idea (runner-5k -> 5k.csv, -23 KB) is now moot: the 5k is 6,068 words and the runner list is used as anti-grep noise fuel instead. `oto/identifiers-dictionary-5k.csv: cp 3400→5k.csv && rebuild` — token `765→420`, -23KB but repins `G8`
- [ ] **M** `Active/Stego/*: 4b H3.99 →2b H~2.0 dither RS ChaCha8` — needs 2 reels or smaller bundle or split-e else overflow 53%
- [ ] **H** `shards/shard-e.js split 780K→390+390 js+js halves` — hides largest-shard tell but census `1070→1400`
- [ ] **D** `R true 4-way R9R0..3` — needs `target.md` regex change, breaks ctxt.io single URL
- [ ] **E/F/G** dict len 8–20 / dup groups / invis 5% — size blow or bidi flag, avoid per AVENUES verdict

## Size / exposure budget

- Bulk `K+L+P+N+X+Y+A1+A2+W+B1` ≈ `-60KB` net (K saves 80KB offsets A1 +7KB + others). No exposure loss, fits 1024 53% still.
- Adding `O-full` saves another 23KB.
- Adding `M` or `H` costs `+15KB` stitch + needs cover respin — do on `O8.13-m2b` branch, not main.

## Verification after any subset

```bash
bash tools/auto-trim.sh   # keep <95
node Active/O8.13/oto/scripts/run-25pass-battery.mjs   # 25/25
CS_BUNDLE=Active/O8.13/final-package/O8.6-Final-final-bundle.js node Active/O8.13/oto/scripts/run-16point-verification.mjs  # S15 ALL PASS
node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp # S15 runner
```

## Workspace after trim

- `Active/Stego/stego-r3` archived `8.8M`, `stego-r4/output-1024 → symlink` — snapshot `89.8M` (Active-eng 42.12 + _COMP 37.55). Headroom `10M` before next trim.
