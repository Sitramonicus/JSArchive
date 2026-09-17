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

- [ ] **A1 O→real** `shards/shard-p-telegram.js, p-teams.js, p-slack.js, p-zoom.js: O()=>u(...,tagSeed) 1.8KB GoL` — makes all 5 dynamic live, not just Discord
- [ ] **A2 e guard variable** `shards/shard-e.js: 98400/4 → R*K*3/4` (bmp rows*cols*3/4 + jitter)
- [ ] **A3 Guild literal offload** `p-discord G7 wordlist: "Guild" → fromCharCode` or honey-only
- [ ] **W full** honey jitter `5–7 per pocket` (cross-decoy: `p-telegram` lists Discord honey) — break `Uniform 6` YARA
- [ ] **B1 OTO raise** `oto/scripts/obf-minify-family.js` — move `p-*` to `v1/v4/v8` equal to `e` hardest, 1–2 mounded `>e`

## High-value hunter-first remaining (P1 — do together, bulk rebuild)

- [ ] **K** `obf-strings-g7.js: 104 alphabets →12 + runtime permute` — saves 80KB, kills `104×91` regex
- [ ] **L** `TextDecoder cache: Map key=seed` — `179k →1.2k` histogram
- [ ] **P** `build-s4-final-package.js: split("|") trampoline → tbl=[f0,f1]` — kills `split("|")` YARA
- [ ] **N** `Active/Stego/build-stego12-r2.mjs + cover-gen.py: slack 0→1k random` + keep 1024 grain — kills zero-slack check
- [ ] **X** `p-discord.js live-read mimicry: Discord.getGuild?.name ?? "g1"` then discard before honey — beats hardcoded-fiction test
- [ ] **Y** `all shards early return if globalThis.__DUMP|process.env → Life garden` — beats harness2.js 1153-session brute

## Optional / deferred (P2 — discuss before doing)

- [ ] **O-full** `oto/identifiers-dictionary-5k.csv: cp 3400→5k.csv && rebuild` — token `765→420`, -23KB but repins `G8`
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
