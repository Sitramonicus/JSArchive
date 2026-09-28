# CARRIER FLIP DESIGN — U3 (R9F 4-way outer) and U4 (R3.1 2-bit + grain + variable RS)

**Status:** designed and costed, **not flipped**. Both change the carrier contract, so they get their own
build with the round-trip tests as the arbiter. This note exists so the flip is a decision, not a rediscovery.

## 1. What the current carrier is (measured, this build)

| Quantity | Value |
|---|---|
| Cover | 1024×768×24 = 2,359,296 pixel bytes |
| `pixelOff` | 54 |
| Decoy strip | 98,400 B (STRIP_LEN, 32 rows), starts at `pixelOff + slackFor(head)` (slack 574 B this build) |
| Real channel start | 99,028; `R_LEN` ≈ 2,260,322 |
| Encoding | 4-bit nibble per pixel byte (1 payload byte ↔ 2 pixel bytes) |
| Payload | `minReal` 2,444,236 B → gzip ≈ 1,005,789 B (+12 B header) |
| Occupancy | **89.0 %** (2,011,602 / 2,260,322 slots — 4-bit: 2 slots/byte) |
| Magic | `0x5033` (P3), header 12 B: magic, len, crc32, pad |
| Permutation | `permFY` (mulberry-seeded Fisher-Yates over R_LEN) |
| PIN / slack | `slackFor(head)` ≤ 1024 B, derived from the 54 header bytes |
| Seed | `slowChain(SALT ^ FNV_SHIPPED ^ canon)` = `0x6d7f0c87` |

## 2. U4 — R3.1 carrier (2-bit + film grain + variable RS + rotated magic)

**Capacity.** 2-bit costs 4 pixel bytes per payload byte:

| | 4-bit (now) | 2-bit |
|---|---|---|
| capacity | `R_LEN` ≈ 2,260,322 B (≈ 89 % full today) | `R_LEN / 4` ≈ **565,080 B per reel** → **1,130,160 B total** |
| our gzip | 1,005,789 B → fits 4-bit with 11 % headroom | needs **2 reels** of ≈ 502,895 B each (≈ 89 % of the 2-bit channel too) |

Two reels fit in the same cover (no second URL, no extra fetch), which is the part the r3 note left
ambiguous. Each reel gets its own variable RS and its own seeded permutation:

```js
// embed: reel 0 and reel 1, each half the gz stream
const half = Math.ceil(gz.length / 2);
const r0 = r3_embedReal(px, head, seed ^ 0x11111111, gz.subarray(0, half));
const r1 = r3_embedReal(px, head, seed ^ 0x22222222, gz.subarray(half));
// loader: extract both (magic 0x9A7F), concat, then gunzip
```

**What each sub-change buys (from the r3 red-team):**

| change | tell it removes |
|---|---|
| film grain on the strip (`(px & 0xfc) \| grain`) | strip histogram H ≈ 3.993 → ≈ 2.0 — the "LSB-2 looks artificial" signature |
| variable RS (`base + FNV(head)%20000 + seed%4096`) | the fixed `98400` step between strip and real channel |
| rotated magic `0x9A7F` | the `P3`/`0x5033` header constant |
| 2-bit instead of 4-bit | nibble-shaped low-half distribution in the real channel |

**Cost / risk.** Loader must know: 2 reels, 2 seeds, 2 RS offsets, and it must concatenate before gunzip.
Tests to extend: `test-stego11-matrix.mjs` (REELS/round-trip per reel) and `test-stego11-tiers.mjs`
(T2 bundle byte-exact must survive the concat). Estimated work: 1 focused pass, codec helpers already exist.

**Capacity caveat (measured after the 300-mirror growth):** the flip is *capacity-neutral at 89 %* —
2-bit two-reel gives 1.13 MB against our 1.01 MB payload. Any further payload growth (more mirrors, more
honey, PLAN-H splits) must therefore be paired with the flip, a third reel, or a bigger cover, or the build
will fail closed on `real over capacity`. The 4-bit channel is the tighter constraint in the near term.

**Why not flipped now:** it rewrites the embed/extract contract, and the current build is at 89 % occupancy
of a 4-bit channel — the flip is a *stealth* upgrade, not a capacity fix, so it must not be entangled with
the G7/dictionary work in the same rebuild (bisecting a failure would be guesswork).

## 3. U3 — R9F 4-way outer interleave

r3 shipped `c/o` as one pair with a comment describing `c0..3/o0..3`. The codec helper `r3_splitR9F(c, o)`
exists. The blocker recorded in r3 was that the outer template's loader regex (`R9R|R9B|R9T`) singles out
one pair, and the `ctxt.io` delivery path expected a single URL.

**Assessment for our line:** the outer here is the pasted runner, not `ctxt.io`. A 4-way split would
(a) raise the number of embedded reel tables from 7 to a larger set, (b) require the loader to reassemble
by index parity, and (c) change nothing about the *network* profile. It is therefore feasible, but it is the
lowest-value of the three carrier items: the r3 red-team never recovered the outer from the reel tables —
they recovered it from the *string layer*, which we have already hardened (128-bit key, procedural
templates, order checksum).

**Recommendation:** do U4 first, then re-measure; keep U3 parked unless a detector trace shows outer recovery.

## 4. Decision checklist for whoever flips it

1. `bash tools/cc33-build.sh` (green) → record `stego-build/rotation.json` + SHA256SUMS as the *before*.
2. Patch the loader template in `build-stego12-r2.mjs` **and** `stego11-loader.js` in the same commit as the
   codec change — the tiers test is the arbiter (T2 bundle byte-exact).
3. Re-run: matrix 24/24 · tiers 42/0 · `--debug-name=ripcord` 42/1 · leakcensus PASS · detector replay PASS ·
   script coverage (no absent blocks).
4. Only then touch `Working-Stable/` (operator go-live), never `Archives/packages/O8.13*`.

## 5. FLIPPED — 2026-09-20 (second pass; shipped carrier is `r31`)

**Status:** flipped and shipping in the CC-33 build (`carrier=r31`). U3 stays parked. The v3 4-bit carrier
remains a first-class build path (`CARRIER=v3`), so a regression bisects by env var, not by a revert.

### 5.1 What shipped (files)

* `Active/Stego/stego3-codec.mjs` — new wired section *r3.1 two-reel 2-bit carrier* (exports `r31_*`):
  `r31_embedReel` / `r31_extractReel` / `r31_embedReal` / `r31_extractReal` / `r31_grainStrip` /
  `r31_rStart` / `r31_rng32` / `r31_permFY` / `r31_crc`. The recovered r3 draft stays in the file marked
  **REFERENCE ONLY** (its `r3_extractReal` is draft-quality and its grain would clobber the decoy).
* `Active/Stego/stego10-legacyreel-src-v31.js` — the shipped reader (2,817 ASCII chars → reel table 7).
* `Active/Stego/build-stego12-r2.mjs` — `CARRIER` switch (default `r31`), grain step, build-time
  round-trips, per-reel capacity report. `CARRIER=v3` reproduces the old carrier in its own out-dir.
* `tools/carrier-flip-check.mjs` — new cover-level gate (F1–F5); report `reports/carrier-flip.txt`.

### 5.2 Measured (this cover, this payload)

| Quantity | v3 (4-bit) | r31 (2-bit × 2 planes) |
|---|---|---|
| channel start | `S0+98400` = 99,028 (fixed) | RS0 = **119,670**, RS1 = **119,941** (base + FNV(header)%20000 + seed%4096) |
| range | R_LEN 2,260,322 | R_LEN0 2,239,680 · R_LEN1 2,239,409 |
| slots used | 2,011,602 | 2,011,628 + 2,011,624 (two planes) |
| occupancy | 89.00 % | **89.82 % / 89.83 %** (headroom 57,013 B + 56,946 B ≈ 114 KB payload) |
| header | `P3` 0x5033, one 12 B | rotated `9A 7F`, 12 B **per reel** + reel tag `A5^r` |
| CRC | zlib poly table | FNV-1a + rotate32 (no `0xedb88320` tell) |
| reel payloads | — | 502,895 B / 502,894 B (pad 39 B + gz split) |
| strip tail (91,748 B) | 100 % LSB-2 == 0 | 24.9 % (grain, H = 2.0000 bits, 4 symbols even) |
| pixels with a fully replaced low nibble | 89.0 % | **80.7 %** + 19.7 % with only 2 bits touched |

### 5.3 Deviations from the §2 sketch (implemented deliberately)

1. **The two reels are two bit-planes of the same range, not two positional halves.** The sketch's
   "R_LEN/4 ≈ 565 KB per reel, 1.13 MB total" is only true if both reels index the whole range; a
   positional split gives 282 KB per reel = 565 KB total, which cannot hold the 1.006 MB stream. So
   reel 0 = pixel bits 0-1, reel 1 = bits 2-3, each with its own seed, variable RS, permutation and
   header. Capacity is then identical to v3 (2 planes × 2 bits = 4 bits/slot) — a stealth upgrade.
2. **Grain covers the strip tail AND the strip→channel gap** (bits 0-1 only, applied after `embedDecoy`):
   the tail was 91,748 B of LSB-2 = 0 (a tool signature); the jittered RS otherwise leaves a 20,642 B
   pristine sliver between two modified bands — itself evidence a jitter exists. Plaque bits 2-7 stay
   untouched and the PG3 decoy still decodes byte-exact (F4/F5).
3. **Per-reel header tag** (`hdr[10]=r`, `hdr[11]=0xA5^r`) so a wrong-plane read rejects cheaply.
4. **FNV-rotate CRC** replaces the draft's table CRC — smaller reel blob, drops the zlib-poly tell.
5. **Build-time round-trips (real + decoy) and a >92 % occupancy warning** — the flip's whole risk is
   silent drift between codec and shipped reel; the build now fails closed, not into a garden.

### 5.4 Evidence

* `reports/carrier-flip.txt` — **12/12**: the *shipped* reel blob round-trips the payload; RS jittered off
  the fixed base and the old `P3` probe finds nothing at 99,028; slot-by-slot plane discipline vs the clean
  cover (0 slips, bits 4-7 never move); grain coverage + entropy; PG3 decoy byte-exact.
* matrix 24/24 · tiers 42/0 (1 skipped; `--debug-name=ripcord` 42/1 = correct) · T2 byte-exact `67c31be9`.
* `CARRIER=v3` build + matrix 24/24 + tiers 42/0 — both carriers coexist (no revert needed to bisect).
* Artifacts: cover `3588c89b…` · runner `19d37537…` (3,374,267 chars) · payload unchanged `67c31be9…`.

### 5.5 Capacity budget after the flip

Headroom ≈ **114 KB** of gzipped payload (89.8 % full). PLAN-H splits and more honey fit. A third reel
(bits 4-5, ≈ +565 KB) is the escalation if the payload passes ~1.13 MB.
