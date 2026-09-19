# Handoff O8.13 — TRIM + Discord-stealth collation — 2026-09-16 07:44 Asia/Shanghai

> **ELI5:** `R4` is frozen and paste-proven (`1e03f48`/`f36e79`). Workspace was `98.7MB` → trimmed to `81.6MB` (+ new `O8.13` branch `89.8MB`) so we don't hit the `100MB` wall. `O8.13` is the **experiment bench** that collects *every* idea that can hide that only Discord lights up — without breaking anything. Nothing in `O8.13` is live yet; `R4` stays the delivery.

## 1. Trim & archive done (this handoff)

| Action | Before | After | Saved |
|---|---|---|---|
| `Active/Stego/stego-r3` (14M) — `output` identical to `r4/output` (`a206aa/f36e79`) + `output-1024` old `53732f/9e165c` | 14M live | `8.8M` → `_COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz` + stub `README.md` | **~13.5M live** (gz keeps history) |
| `Active/Stego/stego-r4/output-1024` duplicate of `output` (6.9M `cover` + `runner` + `real` byte-identical) | 13M (2 dirs) | `rm -rf + ln -s output output-1024` | **13M** |
| **Snapshot** (excl. `node_modules`) | `98.69 MB` | `81.64 MB` → with `O8.13` copy `89.80 MB` | **-17M / -9M net** |
| `Active-eng` | 42.12MB after | `42.12MB` | — |
| `_COMP` | 37.55MB (+ new tar) | 37.55MB | — |

* Verify: `tar -tzf _COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz | head` ; `ls -l Active/Stego/stego-r4/output-1024` → `-> output` ; `du -sb --exclude=Active/engines/node_modules .`

* `tools/auto-trim.sh` threshold `95MB` now `88→79MB` (Active-eng+_COMP) — well under. `_ARCHIVE_TRIM` stays `0.1M` manifest.

## 2. Live line stays R4 (frozen, paste-proven)

Same bytes proven live 2026-09-16 Discord console `Host config flags 32319`:

- **Bundle:** `Active/O8.12-r4/final-package/O8.6-Final-final-bundle.js` `1,660,881B` `1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868` (`slice 600` quota guard)
- **Compressed:** `868k` `328cbde...` / `0e58728...`
- **Stego 1024 (sole live):** `Active/Stego/stego-r4/output/O8.12-runner.js` `3,362,896B` `f36e792fd04475608f6af3b67555b7ae1c4d28fe4dfa24e7053ce2a68559b6cc` + `O8.12-cover.bmp` `2,359,350B` `a206aaa...` `1024×768` `salt 3f72a1ec` `53.92%` `seed 0x6d7f0c87` `G8 2a8969a6→6521c470`
- **Hostile verdict:** `rhXB/tUK` both `0 evals`, `R9F NM 44754>24600 reel guard`, `R9B/R9T` GoL/vault demos — framework inert but loader skeleton works. `GoogleUblock("ripcord") === true`.

**How to paste (R4 or R3 fallback — same stego after trim):**
```js
localStorage.removeItem('console-history') // top, not VM, or Application→Local Storage→Clear
// paste Active/Stego/stego-r4/output/O8.12-runner.js → wait [Host 8.12] initialized + Host config
await GoogleUblock("ripcord") // true
```

`Active/O8.13/` is a **copy** of `R4` (`BUILD-SEED 851b28e5`, branch `2026-09-16T07:44:00+08:00`) — no byte change yet. All experiments below edit `O8.13` only.

## 3. Why Discord still pokes out (collated root cause)

**Static already uniform:** `SEEDINT('g7-'+tag)` distinct FNV/salt/ledger per pocket, `census 6 measurable each` (raw `7 = 6+1 honey`) — grep can't cluster by count after decode. `AVENUES K,L,O,P,Q` already in R4.

**Dynamic still solo:**

| Layer | Discord | Telegram/Teams/Zoom/Slack (others) | Hunter tell |
|---|---|---|---|
| `Y()` bit `0x02 DiscordNative` | `u(...,2)` → `1,884B` real GoL decoder (`p-discord` 1,884B stage-1) | `O()` → `null` / `throw` (kaleidoscope mine punishes) | `grep -r "u("` vs `O()` or runtime `6 each` probe sees 1 live, 4 dead |
| `e()` reel guard `e(S) S.length > 98400/4 = 24600` | BMP `NM 44754` → fails guard → `Error reel` → 0 evals in R9R, but hunt runner still counts pocket as live because `u(2)` path bypasses? Actually `R9F` outer still blocks, but `p-discord` inner `Y()==2` shows decoder | same guard blocks, but `O()` already null so hunter sees uniform `0 evals` — still *different* at JS-source level (`u` vs `O`) | `host.sh trio` logs `Pocket check 6 each` but source diff `Guild` literal + `u` vs `O` survives |
| Literals | `Guild` / `getGuildPreview` in wordlists + honey | generic `getChannel` etc. | `Guild` grep singles `p-discord` shard even though `e` generic |
| `R9`/`R9B`/`R9T` single URL vs 4-way | single `R9F` `{c,o}` | same single | not discord-specific, but keeps delivery fingerprint `ctxt.io` single |

**Lesson:** We punished non-Discord too hard (null) to hide honey, leaving Discord as the only one that *does something*. R4 kept that because true 4-way/ uniform-real mints break `ctxt.io` delivery check — now O8.13 fixes it on a branch.

## 4. O8.13 — collated experiments to hide Discord (change-if-you-want list)

> All edits are in `Active/O8.13/` only. Each is small, reversible, S15-gated. Pick any subset — strongest is `A1 + A2 + B`.

### A. Discord-uniformity core (P0 — must do to hide Discord)

**A1 — O() stubs become real decoders (stealth uniformity)**
- File: `Active/O8.13/shards/shard-p-telegram.js`, `p-teams.js`, `p-slack.js`, `p-zoom.js` (plus `p-discord.js` already real)
- Before: `function O(){return null}` / `throw`
- After: `function O(){return u(..., fakeSeed)}` returning `1.8KB` GoL decoder same shape as `p-discord` `u(2)` — distinct `FNV` per tag, `+ _scratchRead(seed)` so DCE keeps it.
- Cost: `+~7KB` (4×1.8K), S15 still PASS (decoder is dead until called with real `cid`).
- Hunter impact: dynamic probe sees `5× real` (all 5 pockets return decoder) — can't tell Discord.

**A2 — e() guard from fixed `98400/4` to variable `R*K*3/4`**
- File: `Active/O8.13/shards/shard-e.js` + `Active/Stego/stego-r4` loader? Actually `shard-e` `e()` guard.
- Before: `if (S.length > 98400/4) throw`
- After: `if (S.length > (R*K*3/4 |0)) throw` where `R = bmp.width*height*3/4` derived from atob header, `K` jitter from `FNV(seed)%10` ; keeps R4 BMP `44754` just under new limit so reel passes, hunter can't hardcode `24600`.
- Cost: `+0.3KB`, breaks `grep 98400`.

**A3 — Guild literal offload (optional)**
- Before: `Guild` appears as plain word in `p-discord` G7 wordlist slice.
- After: derive via `String.fromCharCode(71,117,105,108,100)` built at runtime from ledger slice, or move literal to honey-only `getGuildPreview` (honey not in census).
- Cost: `+0.2KB`, removes `grep Guild` poke.

### B. OTO leveling to e (P0 — per #5, equal not same, mounds >e)

**B1 — Raise platform shards OTO to e (equal difficulty)**
- Map: `e → v1 JSO impossible` (keep), `m,n1 → v2 JSC mounded` (already), `aux → v5`, `a → v6` slightly easier than `e` but not gateway, `p-discord/tele/slack/teams/zoom → v4/v5/v6/v7/v8` equal to `e` level — pick distinct per pocket so 1–2 *highest* are mounded >e.
- Proposal: `p-discord v8-uglify` (existing), `p-telegram v4-closure` → bump to `v4 + v1 wrapper`, `p-teams v6→v1`, `p-zoom v2→v1` — or rotate via `obf-minify-family` family already has all 5.
- File: `Active/O8.13/oto/scripts/obf-minify-family.js` + per-tag `oto/*/shard-p-*-out.js`
- Cost: `~0KB` (just re-run family), S15 harness must re-pin EXPECTs.

### C. Remaining 27-vector hunters not yet in R4 (P1 — exposure > space pick best)

From `AVENUES-r3-Inventory.md` last 2 pages: R4 did `Q,O,R-comment,S,T,U,V,W,A` lite. Still open:

| # | Avenue | File | Done in R4? | O8.13 ready? | Space |
|---|---|---|---|---|---|
| K | 104→12 alphabets + runtime permute | `obf-strings-g7.js` `ALPH=12` | split 3×780 but still 104 | **one flag `ALPH=12` + permute table** | **-80KB** (helps) |
| L | TextDecoder cache Map 179k→1.2k | `oto/scripts/seed-lib` + `shards` dedup | no | **Map k=seed cache** | -5KB |
| M | Stego 4b→2b dither variable RS ChaCha8 | `Active/Stego/build-stego12-r2.mjs` | 4b uniform `H3.99` kept | **branch `stego-m2b`**: needs 2 reels or smaller bundle or split `e` | -600KB cover but +split |
| N | Slack 0→1k random + 1024 grain | `cover-gen.py` | 1024 done, slack 0 still | **add `+rand(0..1024)` slack** | +1KB |
| O-full | 3400 dict swap | `identifiers-dictionary-5k.csv` | split but live 5288 | **swap `3400→5k.csv && rebuild`** | -23KB |
| P | Flatten `split("|")` → trampoline | `build-s4-final-package.js` | no | **tbl=[f0..]** | -2KB |
| X | Live-read mimicry `Discord.getGuild?.name ?? "g1"` then discard | `shard-p-discord.js` | no | **+guard `typeof Discord`** | +3KB/pocket |
| Y | Anti-harness `__DUMP/process.env → Life garden` | `shards/*.js` early return | no | **+1 if** | +0.8KB |
| H | Split `e 780K → 390+390` js+js halves | `stitch-o85.py` | no | **24 halves** | +15KB stitch |
| + | dict len 8–14 cap, invis 2% | `obf-strings-g7` | already 2% in R4 | keep | — |

**Do now (no size blow):** `K+L+P+N+X+Y` = `~ -80KB net` + stronger hunter miss. **Defer:** `M` (needs 2 reels) + `H` (24 halves) until bundle proves still fits 1024 `53%`.

### D. Delivery-hardening (P2 — low priority, breaks paste if wrong)

- `R 4-way true` `R9R0..3` (`target.md R9R|R9B → R9R[0-3]`) — breaks `ctxt.io` single-URL fetch expectation; keep as branch `O8.13-r9r4` only.
- `wasm` inner shards — **avoid** (CSP `Teams/Zoom` block, `grep WebAssembly` flag); ok for outer stego only per AVENUES verdict.

## 5. How to run experiments (copy-paste)

```bash
# from /home/user
# A1+A2 stealth patch (example dry-run, no overwrite until you approve)
node Active/O8.13/tools/respin-seed.mjs --dry-run   # shows new FNVs
# then rebuild after editing shards:
cd Active/O8.13/oto/scripts
node obf-strings-g7.js               # if doing K
node obf-minify-family.js            # if doing B1
node build-s4-final-package.js       # stitch
node run-25pass-battery.mjs          # expect 25/25
CS_BUNDLE=Active/O8.13/final-package/O8.6-Final-final-bundle.js node run-16point-verification.mjs
# rebuild stego if bundle changed:
node Active/Stego/build-stego12-r2.mjs --cover 1024 --salt 3f72a1ec
node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp
```

No live change until `S15 ALL PASS` on both bundle and minReal.

## 6. Handoff discipline after this

- `Active/O8.12-r4/` **FROZEN** — do not edit. All edits in `Active/O8.13/`.
- `Active/O8.12-r3/` and `Active/O8.12-r2/` kept for lineage; `Stego/stego-r3` archived (restorable).
- Next freeze overwrites `Active/O8.13/final-package/` then `Archives/packages/O8.13/` (rolling rule) + `BUILD-SEED 851b28e5` pinned. `Working-Stable/` only on your `go live`.
- Keep `tools/auto-trim.sh` periodic: `bash tools/auto-trim.sh` — currently `79MB` under `95MB`.
