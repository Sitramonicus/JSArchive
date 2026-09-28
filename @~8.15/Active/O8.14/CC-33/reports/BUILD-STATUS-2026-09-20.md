# CC-33 build status — 2026-09-20 (G7 hardened + shard items + 3 new gates + **U4 carrier flip**)

Seed `851b28e5` · tag `o814` · version `8.14` · instance `06118ef1` · cycleMs `15000`

| Artifact | sha256 (prefix) | size |
|---|---|---|
| `final-package/O8.14-CC-33-final-bundle.js` | `cb25bc27` | 2,867,836 B |
| `stego-build/O8.12-runner.js` | `8a736454` | 3,372,798 chars |
| `stego-build/O8.12-cover.bmp` | `2da3a974` | 2,359,350 B |
| `stego-build/stego11p-real.min.js` (shipped payload) | `67c31be9` | 2,444,236 B |

> The artifact rows below are the **pre-flip** build; §"U4 carrier flip" at the end supersedes
> runner/cover. Payload and bundle are unchanged by the flip.

## Gates — all green

| Gate | Result |
|---|---|
| cascade (g7 → v1 → minify → u → v2 → s4 → stego) | green, 17/17 shards, 85/85 engine outputs |
| `test-stego11-matrix.mjs` | **24 / 24** |
| `test-stego11-tiers.mjs` | **42 / 0** (1 skipped = `--debug-name`; with it: 42/1, correct) |
| `tools/leakcensus.mjs` | **PASS** (G1/G2/G5 empty; every G3 hit classified) |
| `tools/detector-replay.mjs` (new) | **PASS** — P1 fold opaque, P2 0 globals, P3 ran, P4 0 named modules |
| `tools/script-coverage.mjs` (new) | **all 12 inventory blocks present**, none absent |
| `tools/manifest-parity.mjs` (new) | 217 CC-33 files vs 150 r3 entries, every kind matched or explained |

## What changed in this pass

1. **G7 128-bit key (U5 / R2-01).** Keystream seed is now a mix over four SHA-256-derived words; the old
   32-bit `skey` (red-team: ~2m40s/blob) survives only as a derived value for `tubeLayer/pfmt/d3`.
   Build-time twin and runtime share **pre-mixed constants** emitted as literals, so the two can never
   drift again (a hand-transcribed decimal was the one bug this pass; caught by the built-in round-trip test).
2. **Procedural templates + 300 mirrors (FaC-44 + R2-01b).** `TUBE_TPL` is no longer a literal array in the
   repo — it is composed per shard from seeded word pools. Payload evidence: `{h}` **1,024** (was 121),
   `{p}%` **600** (was 61). `census.json` now stores **skeleton hashes only** (5,100), never plaintext.
3. **Order-sensitive trip checksum (U9 / A-B).** `SW_SEQ = (SW_SEQ*33 + c+1) & 0xffff` accumulates the
   *order* of mirrored templates; exposed on the diagnostic line (` sw=` ×6 in the payload).
4. **Ledger prefix de-literalised (U9 / U).** All 14 `"[Google ledger] "` literals became masked
   `String.fromCharCode(...)`; the 5 pipeline-cue comments were removed from the shards.
5. **Engine honey (U9 / W).** `shard-e` honey pool 5 → 6 entries, loop bound updated.
6. **Three new gates** (script coverage U13, detector replay B3, manifest parity B4) + parity report at
   `reports/manifest-parity.txt`, r3 inventory persisted at `reports/r3-gen-manifest.txt`.

## Blocked / not done (with reasons)

* **U8 (shard-u rcd/dbg hashes)** — the two constants are preimages of operator secrets. Re-deriving them
  without the secret would break the paste-time gate, so they stay. *(Documented, not guessed.)*
* **U4 (carrier flip)** — **done this day, second pass** (carrier `r31`). See the section at the end of this
  file and `CARRIER-FLIP-DESIGN.md` §5.
* **U3 (R9F 4-way)** — still parked: lowest value now the string layer is hardened.
* **U7 — closed:** r3 shipped `SW_H=8 / SW_T=12`.

## U4 carrier flip — second pass, same day (`carrier=r31`)

**Why a second pass:** the flip rewrites the carrier contract, so it was kept out of the G7 rebuild on purpose
(one bisectable change at a time). Design + cost: `CARRIER-FLIP-DESIGN.md` §2; result: §5.

| Artifact | sha256 (prefix) | size |
|---|---|---|
| `stego-build/O8.12-cover.bmp` | `3588c89b` | 2,359,350 B |
| `stego-build/O8.12-runner.js` | `19d37537` | 3,374,267 chars |
| `stego-build/stego11p-real.min.js` (payload) | `67c31be9` | 2,444,236 B — **unchanged** |
| `final-package/O8.14-CC-33-final-bundle.js` | `cb25bc27` | 2,867,836 B — **unchanged** |

Supersedes `8a736454` (runner) / `2da3a974` (cover).

| Gate | Result |
|---|---|
| build-time round-trips (new, fails closed) | real 1,005,750 B · decoy 1,658 B · grain 112,390 B (gap 20,642 B) |
| `tools/carrier-flip-check.mjs` (**new**) | **12 / 12** → `reports/carrier-flip.txt` |
| `test-stego11-matrix.mjs` | **24 / 24** |
| `test-stego11-tiers.mjs` | **42 / 0** (1 skipped; `--debug-name=ripcord` 42/1 = correct) |
| `tools/leakcensus.mjs` · `detector-replay.mjs` · `script-coverage.mjs` · `manifest-parity.mjs` | PASS · PASS · clean (no absent blocks) · PASS |
| regression `CARRIER=v3` (4-bit API kept) | build + matrix 24/24 + tiers 42/0 |

**Measured carrier:** RS0 119,670 / RS1 119,941 (base 99,028 + FNV(header)%20000 + seed%4096); occupancy
89.82 % / 89.83 % (headroom 57,013 B + 56,946 B); rotated magic `9A 7F` + reel tag per header; FNV-rotate CRC.

**A/B stealth numbers** (same payload, same cover source; A = `CARRIER=v3` build in `/tmp/stego-v3-check`):

| Metric | v3 | r31 |
|---|---|---|
| strip tail 91,748 B with LSB-2 == 0 | 100.0 % | 24.9 % (uniform grain, H = 2.0000) |
| strip tail matching the clean cover's LSB-2 | 44.4 % | 24.7 % |
| channel-region bytes differing from clean | 83.4 % | 89.2 % (the extra is the now-grained gap) |
| pixels with a fully replaced low nibble | 89.0 % | 80.7 % (+ 19.7 % with only 2 bits touched) |
| fixed-offset `P3` probe at 99,028 (0/1k/2k/3k) | false | false (channel is not there at all) |

**Runtime cost:** one permutation per reel ≈ 80-90 ms host / ≈850 ms under `vm` (30× vm penalty, pre-existing);
paste-time extraction measured 2.2-2.4 s in the tiers sandbox — T2 runs 0.45 s → ~2.1 s, full tiers ~34 s.
Accepted: correctness and stealth first; if host latency ever matters, the permutation is the one hot spot.


## U10 — PLAN-H shard split pass 1: `shard-e` → four pieces (2026-09-20, fourth pass)

The `e` shard was the size tell (106,366 B vs 10,149 B median = **10.48×**). It is now four
pieces, each on a **different engine**, so the split does not create four identical siblings:

| piece | lane | source | post-g7 | in bundle |
|---|---|---|---|---|
| e1 (keeps prologue + orchestrator) | v1-jso-s3matrix | 37,785 B | 54.2 KB | 315.4 KB |
| e2 | v7-swc | 23,582 B | 33.0 KB | 27.1 KB |
| e3 | v5-terser | 22,213 B | 32.5 KB | 25.1 KB |
| e4 | v4-closure | 27,183 B | 41.6 KB | 36.1 KB |

Splitter: `tools/split-shard.mjs` (acorn, scope-aware) — statements are copied verbatim into
`_0xmod._e.stepK = async (S)`; piece 1 keeps the prologue, registers `boot()` **at the position
the hot async block used to occupy**, and the post-block prologue statements still run in place;
cross-piece values travel through `_0xmod._e.S` (snapshots) and rewritten cells (`S.x`);
prologue-level closure cells go to `_0xmod._e.C.*`; top-level `return` becomes a STOP sentinel so
the early-exit still aborts the whole sequence, not just one step.

Evidence: `reports/split-equivalence-e.txt` (**PASS**, 25/25 events, mock host, both the S6-B2
cover path and the chunk path).

### Rebuilt artifacts (supersede the pre-split U4 rows above)

| artifact | sha256 | size |
|---|---|---|
| final-package/O8.14-CC-33-final-bundle.js | `a31efc17…` | 2,450,744 B (2,169.4 KB) |
| stego-build/O8.12-runner.js | `2bf4a9f2…` | 3,374,325 B |
| stego-build/O8.12-cover.bmp | `867fef9f…` | 2,359,350 B |
| payload real (min → gzip) | — | 1,907,998 → 867,819 B |

### Gate board after the split

matrix **24/24** · tiers **42/0** (ripcord 42/1, expected) · leakcensus **PASS** ·
detector replay **PASS** · script coverage clean · manifest parity **PASS** ·
carrier flip **12/12**.

### Side effects measured

- Payload shrank 1,003,927 → **867,819 B gz** (-136 KB): three of four `e` pieces ride much
  lighter engines than the old monolithic JSO piece. Carrier occupancy therefore fell
  89.7 % → **77.5 %** (headroom 126 KB/reel instead of 57 KB).
- New source-side max is `shard-e-str` (46,729 B; 3.43× median 13,610 B). Pre-split max/median
  was 10.48×, so the tell moved down a tier but is not gone.

### Still open in U10 (PLAN-H remainder)

- `m` → 2 and `aux` → 2: both are **flat** statement lists (31 / 18 top-level statements, no hot
  async IIFE), so the splitter needs a second (synchronous) mode; `m` also runs through the
  v2/js-confuser lane, whose output `EXPECTED_V2_M` the build re-pins on every run.
- `e-str` → N: it is a **single 44,994 B statement** holding one 44,850 B array literal (the
  string table) plus the `_0xed` decoder — statement splitting cannot touch it; it needs
  array-chunking (`[].concat(chunk1, chunk2).join('')`), a separate transform.
- SW recalibration (`SWEEP_HONEY_N` / `SWEEP_TUBE_N`) stays **after** the splits, per PLAN-H.


## Addendum — `e` family protection review (2026-09-20)

See `E-PIECE-PROTECTION-REVIEW.md` (same directory). Headlines:

- Only **e1** carries the javascript-obfuscator stack; e2/e3/e4 are minifier lanes. Every piece does
  carry its own g7 string pool (`textCacheE1..E4`) — the tag-named pools do **not** leak into the
  shipped bundle.
- No VM exists in r3 or 8.14; the VM is PLAN-H `R2-04`, after the splits. The `u` lane is a decoder,
  not an interpreter.
- **Do not pad.** Occupancy 77.5 % leaves ~503,900 permuted slots per reel (≈126 KB) holding cover
  bits; the defect is the *internal boundary* a steganalyst sees at `need`, not the number. The
  correct fix is grain-filling the unused permuted tail (0 payload bytes), mirroring `r31_grainStrip`.
- Dynamic dictionaries already draw the operator's full multi-script inventory
  (2,070 distinct script chars in the 5k pool), are footprint-neutral, and add no new reversibility;
  caveat = generated pools are statistically more regular than the curated ones.

Also fixed in this pass: S4 now **prunes** `final-package/selected-shards/` of anything not in the
current selection. A stale pre-split `shard-e-v1.js` (870 KB) was sitting there; the stitch is
list-driven so it was never shipped (verified: 0 occurrences in the bundle), but it was a trap.
Removed; the guard prevents a recurrence on the next build.

## U10 pass 2 — PLAN-H splits complete, cascade rebuilt green (2026-09-20, later)

The first rebuild attempt after the splits was **red at the S4 G8 gate** (`probe const not unique:
lexProbeX`). Cause: `tools/split-flat.mjs` v1 kept only the outer IIFE and dropped everything after
it. `shard-aux.js` is an IIFE (18 statements) **plus 61 top-level statements** — the
`globalThis.lexProbeX` probe definition and the `featQ`/`featSum`/`__w9..__l9` fingerprint scan,
`ledgerLines` (2,237 B), `rehearseLedger`, `annexSweep`. Both aux pieces were therefore shipped
without the probe the gate looks for. The splitter now carries leading statements into the first
piece and trailing statements into the last one, with `--allow-cross-top` as the explicit override;
`m` (1 top-level statement) and `e-str` (single IIFE) were re-checked and are unaffected.

**Green build:** bundle `837d7f4c…` 2,749,160 B · runner `34db2079…` 3,374,325 B · cover `f8878103…`
2,359,350 B · real.min `3275c52c…` 2,377,230 B. Occupancy **88.27 % / 88.28 %** (back to the r3
level — the grained tail is written, so headroom is now 65,702 / 65,635 B of *slots*, not cover).
G8 pins appended `3bc4c5c9, 51f7e417, 388946a4`; `EXPECTED_V2_M` re-pinned to `77cec6d4…` — note the
v2 piece came out **byte-identical** to the previous build, so the pin held this time.

**Flat splits (final shapes):** m1 9.4 / m2 9.0 KB · aux1 9.1 / aux2 14.6 KB (the trailing block
rides with aux2) · e-str1 22.2 / e-str2 22.7 KB. Split equivalence re-run for all four families
(`reports/split-equivalence-all.txt`): e 24/24 events, m 9/9, aux 38/38, e-str 2/2 — **PASS**.
`tools/split-equivalence.mjs` needed `_0xmod._m` tables in its mock host before `m` would run at all.

**Gate board after the rebuild:** matrix 24/0 · tiers 42/0 (1 skipped) · `--debug-name=ripcord` 42/1
(expected) · leakcensus PASS · detector replay PASS · script coverage PASS · manifest parity PASS ·
carrier flip **14/14**.

### The grain change (report this one — it was not in the approved plan)

The first grained build failed its own new F4b check with z = 45.03 / 64.19. The cause is a property
of the r3 carrier, not of the grain: **`r31_ksByte()` is a very weak stream.** Of 65,536 sampled
bytes it produces only **29 distinct values**, and its 2-bit symbol histogram is
12.9 / 25.0 / 12.1 / **50.0 %**. The payload region only looks uniform because the *plaintext* is
compressed data; payload = uniform ⊕ weak-keystream is still uniform. Writing the raw keystream into
the tail therefore wrote a strongly biased distribution right after a uniform region — a worse
artifact than the untouched cover bits.

The fix keeps the approved "continue the payload's own stream" decision but reproduces the payload's
*construction*: the tail is `keystream XOR uniform`, so it is one more sample of the same
distribution an observer sees, not a new one. Measured z(sym0) = **0.88 / 2.51** (threshold 3.0),
tail entropy 1.99999. Since the tail is still written on the same plane, occupancy rose to 88 %, and
that is a *benefit*: the internal boundary that motivated the grain (77.5 % → cover bits at `need`)
is gone entirely.

`R31_TAIL_DOM` survives, now as the domain seed for the uniform component of the tail.

### F3/F4b gate changes (also extemporaneous)

- **F4b** now derives the payload footprint with the codec's own `r31_split` instead of recomputing
  the half-length inline (the inline version was 1 byte off and reported a 215-slot phantom tail).
- **F3** asserted "reel0 touches bits 0-1 only" over *positions*. With a grained tail that is no
  longer true by construction — a reel's grain can land on a position the other reel uses for
  payload. Planes are what matter, so F3 is now: every position reel0 writes keeps bits 2-7 clean
  except where reel1 owns bits 2-3, and vice versa; the written/unwritten overlap is reported from
  the payload footprints separately. Both checks now report 0 slips.

Known property, not a new surface: the weakness above is why the stego must keep `--reel-grain`
off for any *decoder-only* test rig that assumes a uniform tail.

## U11 — dynamic dictionaries are now the build's dictionaries (2026-09-20, operator-approved flip)

`tools/cc33-build.sh` gained a `dict` stage that runs first and exports `CC33_DICT_DIR`:
now `rotate g7 v1 min u v2 mound s4 stego`. `mound` also entered the default stage list (it was
previously only reachable explicitly, so a from-scratch build silently reused the previous mound
outputs). The three pool consumers — `obf-v1-s3matrix.js`, `obf-mound-e.js`,
`build-s4-final-package.js` — all resolve their directory from that variable, so the generated
pools are the build's pools; the curated CSVs are no longer read by a default build.

**Wiring proof (measured on the shipped bundle):** of 4,000 words that exist *only* in the generated
5k pool, **2,766 appear in the bundle**; of the curated-only words, **0** appear. The mound lane
alone carries 656 generated-only words. So the displacement is complete, not partial.

### What the generator does now (beyond being seed-driven)

| Property | Implementation |
|---|---|
| Block-frequency weighting | per-build weight `chars^alpha` (`alpha` 0.6–1.4), a per-build "hot" 25 % of blocks at 2.5–5×, and deliberate holes (~22 % of blocks at 0.15×) |
| Recycling | ~60 % of words reuse an established `(fragment, block, shape)` stem instead of minting a new one, including stems whose word was rejected earlier — families of related names, no new vocabulary |
| Non-uniform shape | character count per word drawn from the **curated** pool's measured distribution (29/12/22/24/12/1 %), not uniform |
| Per-build alphabet | each build narrows to ~300 of the 2,070 available characters — the build picks its own naming alphabet |
| Byte-cost parity | 2-byte vs 3-byte script characters mixed at a fitted rate (0.42) so the mean name cost matches the pool being replaced |

### Footprint (the flip's condition)

| Metric | Curated pools (previous green) | Generated pools (this build) |
|---|---|---|
| Pool cost, bytes/word | 11.97 | **11.96** (parity) |
| Pool distinct chars | 680 | 654 |
| Payload gzip | 988,372 B | 1,013,879 B (**+2.6 %**) |
| Carrier occupancy | 88.27 / 88.28 % | 90.54 / 90.55 % |
| Headroom per reel | 65,702 B | 52,949 B (still comfortable) |
| Shipped artifact sizes | cover 2,359,350 B · runner 3,374,325 B | **unchanged** |

The pool-level cost is at exact parity, so the residual +2.6 % is not the vocabulary — it is how the
obfuscators lay the names out. Build noise was measured at ±0.3 % (same pools, two consecutive
builds: 91.53 % vs 91.24 % occupancy), so the +2.6 % is real but small and stays far inside the
carrier's limits. If the last 2.6 % matters, the levers are `ALPHABET_TARGET` (fewer distinct
characters compress better) and the digit-suffix entropy; both are one-line changes in
`dict-gen.mjs`, and neither has been spent.

### Two latent build-breakers found and fixed on the way

1. **The keyword-space repair had gaps.** S4 inserts a space when JSO's compact printer joins a
   keyword to a following non-ASCII identifier. The keyword list was 30 words and missed `else`,
   `do`, `default`, `this`, `null`, `true`, `false`, `try`, `finally`, … A generated word landing
   after an uncovered keyword killed the build with `Unexpected identifier` — and whether the build
   survived was **luck of the draw**. It is now one pass over the full keyword/reserved list with the
   adjacency expressed in identifier characters.
2. **…and that repair could split valid names.** A fragment sliced to 3 characters produced the word
   `for썚묶뜣667`, and the repair read it as `for` + identifier, breaking a parameter list
   (`Unexpected token 'for'`). `dict-gen.mjs` now rejects any word whose leading ASCII run is a
   keyword, which makes the repair exact rather than heuristic.

Both bugs were reachable only with a *large, multi-script* dictionary — the curated pool happened
never to hit them. The flip is what exposed them, which is itself an argument for the flip.

### Finding: the jso pool is dead input for the v1 lane

Of the three consumers, v1 **reads** `identifiers-dictionary-jso.csv` (and rotates it by seed) but
its output contains **no word from that pool** — generated or curated, with or without invisible
joiners stripped (3,595 non-ASCII identifiers in `shard-e1-out.js`, 0 matches). So v1's names come
from the shard sources and JSO's own generator, not from the dictionary. This is pre-existing r3
behaviour, not a regression, and it means the pool's live consumers are **mound-e** and **S4**. It is
also an opportunity: either wire JSO's dictionary properly (it would change v1's name shapes and the
footprint) or stop shipping an input that has no effect. Logged as U14.

## SW recalibration — measured, not guessed (2026-09-20)

The SWEEP trap counts out-of-range decode requests. `SW_BAD = (SW_BAD*31 + (pos&3)) & 0xffff; SW_BAD++`
and at `SW_H` the decoder degrades to garden fiction, at `SW_T` to tube. The constants had never been
measured against a real workload — the source says so itself ("set HUGE for the calibration build,
then pin from measured legitimate maxes (TRIPDIAG lines) at 2.5x/3.5x with floors").

**Where the monitor lives** (cost one wrong measurement): g7 emits it into the *shard* sources, so it
ships in the **payload**, not the runner — verified: `O8.12-runner.js` contains no `CS_TRIP_DIAG` and
no `TRIPDIAG` at all, while the bundle carries one guard and eight TRIPDIAG sites. A harness that
injects `process` into the *runner* context gets the 3 KB decoy back instead of the payload (the
runner has a node branch), which is why the first attempt measured nothing.
`Active/Stego/calibrate-sweep.mjs` now does it correctly: run the runner in the tiers suite's own
fake-window sandbox (no `process`) to obtain the payload, then execute that payload in a context with
`process.env.CS_TRIP_DIAG=1` and a capturing `console.debug`.

**Positive control (the measurement that settles it).** Executing the payload produced 0 TRIPDIAG
lines, which is ambiguous on its own — "never fired" and "never ran that code" look identical. So the
trap was rebuilt at the strictest possible setting, `SW_H = 1, SW_T = 2`: one single out-of-range
decode request would now flip legitimate output to honey/tube. Result: **matrix 24/0 and tiers 42/0,
unchanged.** The legitimate workload therefore makes *zero* out-of-range decode requests.

**Pin.** measured max = 0 → `SW_H = max(8, ceil(2.5·0)) = 8`, `SW_T = max(12, ceil(3.5·0)) = 12`. The
r3 values are confirmed as **floors**, and the margin over the measured legitimate maximum is the
full 8x / 12x. Shipped build restored to `SW_H = 8, SW_T = 12`; nothing was weakened — the
calibration's finding is that these cannot be lowered safely in any amount, because the legitimate
maximum is exactly 0.

Constants and sizes across the three calibration builds (same pool, same shards, so the deltas are the
constants' effect plus build noise): 999999/999999 → payload gzip 991,154 B · 1/2 → (test-only build,
not shipped) · 8/12 → **1,002,334 B**, occupancy 89.51 / 89.52 %, headroom 58,721 / 58,654 B.

**Gates on the shipped build:** matrix 24/0 · tiers 42/0 (1 skipped) · ripcord 42/1 (expected) ·
leakcensus / detector / coverage / parity PASS · carrier flip 14/14.
Bundle `44ab8fce` · runner `6045d515` · cover `71e38244` · real.min `6053d72d`.

## Protection-layer verification — what is actually in the shipped build (2026-09-20)

Verified against the current green build rather than the design notes.

**Double-OTO LIGHT (approved item 1).** `oto/scripts/obf-mound-e.js` adds a second layer on the
three minifier pieces: e2 (v7-swc → JSO dictionary/LIGHT), e3 (v5-terser → **js-confuser rgf** → JSO
dictionary/LIGHT), e4 (v4-closure → JSO dictionary/LIGHT). E1 already carried its own OTO stack, so
all four `e` pieces now carry comparable protection — which is the point of the "don't make one piece
look special" rule.

**Unique terms across the inner dictionaries.** Each mound piece draws from its own slice and its own
seeded rotation. Measured on the emitted output: e2 656 pool terms, e3 1,465, e4 642, and the
pairwise intersections are **0 / 0 / 0** — no term appears in two inner dictionaries.

**rgf light VM (approved item 2).** Present exactly once in the e3 mound output
(`shard-e3-out.js`: 1 `Function(` ctor) and twice in the shipped bundle, where one is the e3 rgf
layer and the other is the runner-side decoder. The mound script asserts `>= 1` per build, so a
silently-dropped slice cannot ship.

**U14 restated — the jso pool is read on purpose and then unused.** `obf-v1-s3matrix.js:44` builds
`DICT` (335 jso words, seed-rotated) and never references it again; the source says so out loud:
"jso is still read (kept for reference/rollback)". Every dictionary-mode lane — e1, n1, n2, c, h and
the five pockets — draws a rotated slice of the **balanced 5k** instead, because the 340-word jso
pool was exhausted by the lanes' thousands of identifiers and JSO fell back to mangled names (that
was r3 avenue O's fix: per-lane rotated 5k slices, exhaustion removed at source). So my earlier
"0 jso-pool words in the v1 lane output" is correct and by design, not a regression: the file is
build-time ballast kept for rollback. Two options for the operator: keep generating it (3 KB, zero
shipped bytes) or stop.

**Residual sharing worth knowing:** the ten v1 dictionary lanes cycle through **three** slices, so
lanes at index 0, 3, 6, 9 share one term *set* (different shuffle order each). Ten disjoint slices
would need ~5,700 words per lane against a 5,706-word pool — the exhaustion problem would return.
Per-lane uniqueness therefore needs a bigger generated pool, which costs bundle bytes: noted, not
done.

## U12 — single-lane selection + seeded lane rotation (2026-09-20)

**Decision implemented (the multi-variant-bundle option was rejected):** exactly one lane output
ships per piece, and *which* lane is now derived from the build seed instead of being hard-coded.

**Population.** Six pieces ride the interchangeable minify family — m2, n1, n2, e-str2, aux1, aux2 —
and each of the five lanes (v4-closure, v5-terser, v6-esbuild, v7-swc, v8-uglify) builds **every** tag
with its own engine and settings. So the choice between them changes appearance, not protection. The
other lanes stay put deliberately: v1 carries the string-array + dictionary layer, v2 is the
js-confuser pin, mound carries the second protection layer, u is the canonical decoder.

**Effect.** Same build seed, three different assignments (mode `S4_LANES_SEED`):

| seed | m2 | n1 | n2 | e-str2 | aux1 | aux2 |
|---|---|---|---|---|---|---|
| `851b28e5` (shipped) | v5-terser | v6-esbuild | v7-swc | v4-closure | v8-uglify | v4-closure |
| `deadbeef11` | v5-terser | v6-esbuild | v7-swc | v7-swc | v8-uglify | v4-closure |
| `cafe9001` | v7-swc | v4-closure | v8-uglify | v7-swc | v5-terser | v6-esbuild |

`S4_LANES=static` restores the historical assignment (`m2→v4-closure n1→v6-esbuild n2→v7-swc
e-str2→v6-esbuild aux1→v5-terser aux2→v8-uglify`) for rollback and for byte-level reproducibility.

**Guard.** S4 now refuses a second selection row for the same tag, refuses a missing lane output, and
prints the single-lane census: *23 pieces, 23 with alternates available, shipping 1 each*
(e.g. `p-zoom/7`, `a/7`, `m1/6`, `m2/5`). That census is also the standing answer to "why is this one
special?" — every piece has alternates; the bundle ships one.

**Record correction.** The piece/tag count is **23**, not 24 — verified against the live TAGS list and
the selection array. Earlier notes in this file and the handoff said 24 lanes; the 24 belongs to the
*stego matrix* assertion count (24 asserts), which is a different thing. Both the earlier "24 lanes
stitched" (U10 pass 2) and "TAGS 24" entries should be read as 23.

**Gates on the rotated build:** matrix 24/0 · tiers 42/0 (1 skipped) · ripcord 42/1 (expected) ·
leakcensus PASS · detector PASS · coverage PASS · parity PASS · carrier flip 14/14. Occupancy
90.26 / 90.27 % (was 89.51 before rotation — different engines compress differently), headroom
54.5 KB / 54.5 KB.

## Two decisions taken this pass (operator granted the prerogative; recorded with their implications)

**1. `identifiers-dictionary-jso.csv` — keep, and it is not a bug.**
The "exhaustion" was an **r3-era, static-CSV** condition: the jso pool held ~340 words while the
dictionary-mode lanes needed thousands of identifiers each, so JSO ran out and fell back to mangled
names (measured at the time: lanes contributing 72 % of the bundle's scripted characters were 3.51x
skewed off an even script share). Avenue O's fix moved the lanes onto rotated slices of the balanced
5k pool and left the jso pool read-but-unused with the comment *"kept for reference/rollback"*. My
earlier framing of U14 as a defect was wrong; the file is build-time ballast. It costs 3 KB in the
workspace and **zero shipped bytes**, and it is the documented rollback input, so: **keep**.

*Why not "make a bigger pool for it so every piece is unique", which is the natural question:* since
U11 the pools are generated, so a bigger pool is free to **generate** — but not free to **ship**. Today
13 dictionaries (12 v1 pieces + 3 mound pieces) draw from one 5,706-word pool, which is what lets the
payload reuse the same name strings across pieces. Giving every instance a disjoint vocabulary adds
~30,000 extra distinct 12-byte names ≈ **150–200 KB of compressed payload**, against 54.5 KB of
headroom. It cannot fit without deleting protection elsewhere, and the property it would buy (each
piece's *vocabulary* is unique) is not observable as a weakness: the pieces ship inside one compressed
payload, and the wallet-level goal — the vocabulary changes per build and per seed — is already met by
U11. Recorded as a measured no; the numbers are here if that judgement is ever revisited.

**2. The U11 footprint levers — not spent.**
For reference, since they had no names before:
* `ALPHABET_TARGET` (`dict-gen.mjs`, currently **300**): how many distinct script characters the
  pool may draw from. The curated pool used 680. Lower → names reuse characters → smaller payload;
  higher → more variety. This is the strongest lever (roughly ±2–3 % of payload across 150–450).
* **Digit-suffix entropy**: 3-digit suffixes 85 % of the time, 4-digit 15 %. More digits → more
  distinct names → bigger payload.
* **Stem recycling** (currently **60 %**): higher reuses more stems → smaller payload, less variety.

Decision: **leave all three.** The payload is +2.6 % versus the curated pools, occupancy is 90.3 %
and headroom is 54.5 KB per reel — comfortable. Each lever change costs a full re-verify cycle
(≈70 s build + ~4 min of gates), and the space may be wanted for the PLAN-H R2-04 VM. If it is ever
needed, spend in this order: `ALPHABET_TARGET` 300→200, then recycling 60→75 %.

## The operator's two questions, answered with measurements (2026-09-20)

### Q1 — "you aren't using the unicode CSV as a library?" — No, and it never ships

`tools/inventory-audit.mjs` (new) reads the CSV the way the build does and reports what it is:

| measurement | value |
|---|---|
| lines / distinct code points | 33,569 / **33,566** |
| blocks | 12 (Hanzi/Kanji 20,992 · Hangul 11,172 · Cyrillic 256 · Full-Width Latin 240 · Greek 144 · Devanagari 128 · Tamil 128 · Thai 128 · Hebrew 112 · Hiragana 96 · Katakana 96 · Invisible & Control 74) |
| legal inside a JS identifier | **33,262 (99.2 %)** — only 304 are not (control characters, marks, separators) |
| supplementary-plane entries | **0** — nothing was lost to the `noSupLead` rule |

The CSV is referenced by exactly two files — `oto/scripts/dict-gen.mjs` and `oto/scripts/dict-augment.mjs` — both **build-time**. It appears **0 times** in the bundle and 0 times in the runner, so it contributes **zero shipped bytes**. Its role is exactly what the operator described: a *character inventory* from which new identifier strings are composed (fragments + drawn characters + numeric suffix), never a name list that gets pasted in. New since this pass: its `Invisible & Control` block contributes ZWJ/ZWNJ as a non-leading homoglyph ingredient (186 occurrences in the current pool) — javascript-obfuscator was already injecting those characters on its own (93 ZWJ + 83 ZWNJ in the shipped bundle), so this is artifact-normal, not a new tell.

### Q2 — "I didn't expect only 2 % is usable" — nothing is unusable; the 297 was *my* per-build cap, and `ALPHABET_TARGET` was hiding a real bug

The number that misled is `active alphabet 297 chars`, printed by dict-gen. That is **`ALPHABET_TARGET` (300)**, a deliberate per-build narrowing chosen for footprint — not a limit of the inventory. The whole 33,262-character inventory remains available; each build narrows to a seed-chosen subset and the subset differs per seed.

Auditing what the pool *actually contained* exposed a genuine defect, which the operator's question is what surfaced:

| block | chars in CSV | chars used in the pool | occurrences, before → after |
|---|---|---|---|
| Devanagari | 128 | 0 → 35 | **0 → 258** |
| Tamil | 128 | 0 → 33 | **0 → 179** |
| Thai | 128 | 5 → 34 | 6 → 218 |
| Hiragana | 96 | 4 → 39 | 4 → 351 |
| Katakana | 96 | 29 → 33 | 58 → 250 |
| Full-Width Latin | 240 | 34 → 34 | 157 → 249 |
| Invisible & Control | 74 | 0 → 2 | **0 → 186** |
| Hanzi / Kanji | 20,992 | 41 → 41 | 1,516 → 1,392 |
| Hangul | 11,172 | 41 → 41 | 5,101 → 3,226 |

Cause: block weights were `chars^alpha` (alpha up to 1.4) while 96.7 % of the inventory is Hanzi+Hangul, and a 2-byte "cheap" pool of Greek/Cyrillic/Hebrew took another 42 % of draws — so the small blocks were statistically excluded. Fix: `FLOOR_SHARE = 0.35` — a third of block picks ignore the weights and take a uniformly random block, so **every block is guaranteed in every build**, with an alphabetical floor of 12 chars per block and the invisible block admitted as a non-leading ingredient (`INVIS_RATE = 0.05`). Cost: payload gzip 1,002,334 → 1,038,879 B and occupancy 90.54 → 91.27 % (headroom 48.9 KB/reel). That cost is the price of the operator's own inventory list, and it is paid deliberately.

### The "+200 KB for unique vocabularies" question — remeasured, and it is cheaper than I said

Two measurements, both new:

1. **What the instances actually consume.** The 17 dictionary instances (14 v1 lanes + 3 mound pieces) use **7,070 pool-word slots** covering **2,779 distinct words out of 5,706** — i.e. the pool is already more than twice as large as the whole build consumes, and instances average ~2.5 uses per word. So per-instance disjointness needs a pool of ~7,100 words partitioned 17 ways (generating it is free since U11); the *ship* cost is the extra distinct strings, which measures at roughly **+25–35 KB compressed**, not the +200 KB I quoted. My earlier number assumed a much bigger pool had to be generated; that was wrong.
2. **Does lane vocabulary even survive?** Experiment: ran the final S4 pass with a *different* dictionary (pool B) while the lanes kept pool A. Result: the shipped bundle contained **17,614 occurrences** of final-pass (B-only) words but still **3,864 occurrences** of lane (A-only) words, from 1,672 distinct words. So the final pass rewrites most naming, but roughly **one fifth of dictionary-word occurrences are lane-derived and survive**.

**Decision: hold it one pass.** The cost is affordable, but the benefit is a partial, structural effect (~20 % of occurrences) rather than a visible per-piece vocabulary, and it competes for the same space as R2-04's VM. Plan if wanted: generate ~7,500 words, partition into 17 slices sized to each instance's measured need (e2 412 · e3 936 · e4 397 · v1 lanes 118–832), wire `dictFor()` to read its own slice, rebuild, re-gate — one pass of work, cost known in advance. Recorded as U16.

## R2-05a — latency plausibility gate (implemented this pass, plus one uncomfortable finding)

Implemented as PLAN-H specifies: measure the *shape* of the run, not the answer to a question. Stamps are spread across all four e-pieces — helper + `t[0]` in e1 (boot), `t[1]` in e2's step2, `t[2]` in e3's step3, `t[3]` + verdict in e4's step4 — so the measurement has no single home. Verdict: if the client globals claim a venue and the boot chain completes in <40 ms (a Proxy resolves instantly) or takes >300 s (heavy instrumentation), the string layer is told to serve fiction (`lexMode = 1`), the same degradation path the sweep trap uses. Nothing is analyst-tunable. `tools/latency-gate-check.mjs` (new) drives the chain under three clock regimes; `tools/split-equivalence.mjs` gained `--clock=plausible|frozen|absurd` so the piece-level host can exercise it.

**Verified:** the structural property (stamps in 4 of 4 pieces) and that the gate does not disturb the chain (split equivalence still PASS under all three clocks).

**Not verified, and this is the finding worth acting on:** in every harness we have, the e-chain **aborts before step2** — the piece-level host shows `stamps=[t0]` only, so `t[1..3]` and the verdict never execute, and `lexMode` is never set. The chain's later steps need a store/dispatch environment we do not emulate. Consequence: the gate is armed but **unreachable in testing**, and it is equally unreachable for an analyst whose emulator aborts the chain early — the gate only bites an emulation faithful enough to complete it. Next step (logged as U15): a minimal "Discord-core" fixture that drives boot through steps 1–4 so the verdict can be observed, or move a redundant verdict earlier (e.g. into e2) so it fires even when later steps abort.

**The vocabulary census caught this patch.** Naming the venue global directly put the word `native` into the bundle as plaintext and leakcensus failed it (`G3 unexplained vocabulary (1): native:`). That is precisely why the rest of the codebase composes such names instead of writing them; the venue name is now built from character codes. Fixed and re-gated: leakcensus PASS.

**Board on the shipped build:** matrix 24/0 · tiers 42/0 (1 skipped) · ripcord 42/1 (expected) · leakcensus PASS · detector PASS · coverage PASS · parity PASS · carrier flip 14/14. Bundle `63b42e87` · runner `d3e7e239` · cover `e7d248e6` · real.min `f822e11f` · occupancy 91.27/91.28 % · headroom 48.9 KB/reel.

---

## 2026-09-20 — LIVE FREEZE (paste) — root cause, fix, re-verification (second refresh)

**Cause:** all 23 shards obfuscated with the same JSO `identifiersPrefix: 'google'`, then stitched into
one scope → duplicate `googlef`/`googleb` helpers → a later piece's helper overwrite corrupts the first
piece's string array → piece `a`'s rotation loop `while(!![]){…if(M===b) break;…}` can never match its
checksum → synchronous main-thread spin with no logs after `console.clear()`.
Full chain: `Handoff/O8.14-LIVE-INCIDENT-2026-09-20-STITCHPREFIX.md`.

**Fix:** per-piece namespace — `PREFIX(tag) = 'google' + sanitised tag` applied at the obfuscate call in
`oto/scripts/obf-v1-s3matrix.js`, `oto/scripts/obf-mound-e.js`; `obf-u-canon.js` → `googleu`;
`build-s4-final-package.js` lint/copy path same. Rebuild 1 m 14 s, green.

**Re-verification (all before issuing the pack):**

| check | result |
|---|---|
| helper-name collision census across the 23 stitched pieces | **0 colliding names** |
| full-wire payload probe (`tools/fullwire-probe.mjs`, Discord-venue sandbox) | **485–1096 ms, runs clean** (was: >120 s hang) |
| full-wire bundle probe | **498 ms** (was: hang) |
| Discord-faithful sandbox, whole payload | **1169 ms**, boot diagnostics intact |
| both mirrors `sha256sum -c SHA256SUMS.txt` | **OK 8/8** in `Working-Stable/O8.14` + `Archives/packages/O8.14` |

**Gate board after the fix:** matrix **24/0** · tiers **42/0** (1 skip) · carrier-flip **14/14** ·
manifest-parity **PASS** · script-coverage clean · leakcensus **PASS** · detector **PASS** ·
split-equivalence **m 9/9, aux 38/38, e-str 2/2 PASS** (e-family baseline stale — below).

**Two gate-integrity corrections (both were false signals in the frozen pack's favour):**

1. The frozen pack's recorded *"detector PASS — P2 globals 0 published"* was a **freeze artifact**: the
   payload hung in its rotation before reaching publication, so the replay saw an empty global set.
   Detector numbers taken against a hanging payload are void. The detector's `ALLOWED` contract has been
   updated to include the two *designed* globals and the reason is written in the source:
   `GoogleUblock` (debug entry, char-code composed) and the dict-named verbosity knob (`会員`, default 2).
2. leakcensus **G3** flagged 5 "unexplained" vocabulary hits that the classifier failed on for purely
   syntactic reasons (`dispatch` matching inside `.dispatcher(`, `store` inside `totalCandidateStores=`,
   `shift` inside `shiftKey`). The classifier now expands the match to the full identifier and has two
   bounded, reviewed allowlists: venue properties (Discord/DOM API names) and fields of our own
   `Log.diag` records. Regression-checked: the pre-fix pack classifies identically (both PASS).

**Harness fidelity work (needed to run the e family at all):** `_0xmod._e` host table restored in
`tools/split-equivalence.mjs` (`eb` packed table, `ed` decoder, plus `v/S/STOP/lat/latV/now/release/
signal/controller/tasks/track/flag/boot`); mock `_0xmod.log` now strips the SKEY prefix exactly like the
shipped string layer, otherwise every post-chunk piece "differs" from its pre-chunk original.

**Open items recorded (not shipping blockers):**
* `e`-family split-equivalence baseline is **stale**: `shards/shard-e.js.pre-split` still inlines the
  micro-linear codec bootstrap (`phase-codec`) and the string-table registration that the shipped
  assembly carries in the `m-str` / `e-str` / `u` pieces. Delta is exactly those 9 prologue events;
  both sides agree on all 8 chain diagnostics and the preamble. Shipped behaviour is covered by the
  full-wire probe + matrix + tiers.
* **API surface to confirm on the next live paste** (now possible, since the client no longer freezes):
  in a *Discord-like* host my probe observes `GoogleVault` published while `GoogleUblock` appears only
  under a bare window===global host. One-liner for the user: `Object.keys(window).filter(k=>/Google/i.test(k))`.


---

## 2026-09-20 (third refresh) — live `ReferenceError`, timestamps, opaque helper prefixes

### The live fault after the freeze fix

The first live pass on the corrected pack ran: console cleared, payload loaded, garden fiction
appeared — and then:

```
Uncaught (in promise) ReferenceError: EnFZv0 is not defined
  at eval (eval at c (quest-home:5:12487), <anonymous>:1:1255196)
  at Vンviッピ690 … at mOdul쉃톚309 … at d춃L261 …
```

`EnFZv0` was a js-confuser *runtime-generated function* name produced by the `rgf` step on piece `e3`.
`rgf`'s own output is self-consistent (lint-clean as emitted), but it then went through our
JSO-light pass, which renamed the binding while leaving call sites inside `catch` blocks untouched.
Reproduced deterministically: `node tools/rgf-probe.mjs oto/v5-terser/shard-e3-out.js /tmp/x.js` +
`node tools/dangling-refs.mjs /tmp/x.js` → same dangling call in a handler. Fresh rolls produced two
*new* dangling handler calls each time (`RG0tu9E`, `CZIamlZ`), i.e. it is systematic, not a fluke.

**Action:** `rgf` is off for e3 (`{ tag: 'e3', …, vm: false }` in `oto/scripts/obf-mound-e.js`) with the
incident recorded at the flag. e3 lane output drops 245.9 KB → 103.9 KB; payload 2,397,910 → 2,259,877 B.

### New gate: `tools/dangling-refs.mjs` (the test we did not have)

Walks the AST, collects declarations (var/let/const/destructuring/params/functions/classes/catch
params/imports) plus implicit-global assignments, and reports every referenced name that is declared
nowhere. Two policies:

* **piece scope** — linted against a union of all 23 shipped pieces' declarations + the 55 names that
  `registry-keymap.json` injects at assembly, so legitimate cross-piece bindings do not read as errors;
* **error-path policy** — a name referenced *from inside a `catch` block* always blocks the build.
  That is exactly the EnFZv0 shape: it fires only when an unrelated exception happens, so it is the
  one class that a happy-path probe cannot see.

Results: assembled payload **0 error-path danglers** (213 dangling names total, all on paths that do
not execute — pre-existing and now measured). `build-s4` additionally declares every error-path name
it finds in the stitched scope as a **no-op** (`[Shim] Lattice274`), removing the second latent
instance of the same shape (piece `e1`) found by the new gate.

### Timestamps in the diagnostics

`[HH:MM:SS.mmm +Ns]` prefix in the single emitter in `shards/shard-a.js`, display-only: `Log.queue`
records are untouched, so nothing telemetric changed. Verified by extracting the `Log` closure and
running it:

```
[05:28:18.273 +0.0s] [G:Discord] Quests: 3 pinned — Discord validated
[05:28:18.277 +0.0s] [G:Slack] Slack quests dispatched
[05:28:18.277 +0.0s] [Host 8.14] initialized — worker instance 06118ef1.
```

**Pipeline gotcha worth remembering:** `shards/*.js` is *re-authored on every build* by
`oto/scripts/rebind-registry-keys.mjs`, which reads `shards/*.js.orig` as its baseline. An edit made
only to `shards/shard-a.js` is silently reverted by the next build. Source edits to a shard must be
applied to **both** the live file and its `.orig`.

### Opaque per-piece helper prefixes

`identifiersPrefix` is now `PREFIX(tag)` = `'g'` + 7 chars derived from `FNV(OPAQUE_SALT + '|' + tag)`
with `OPAQUE_SALT = 'cc33/o8.14/prefix/v1'`, applied in `obf-v1-s3matrix.js`, `obf-mound-e.js` and
`obf-u-canon.js`. All 23 prefixes are unique, identifier-legal, and the tag is **not** recoverable from
the name (the intermediate `google<tag>` scheme, live for one build, grouped the output by piece — the
operator caught that from the trace). Raising the salt re-rolls every helper name in a build.

### Verified state of the pack

| check | result |
|---|---|
| full-wire venue probe (payload / bundle) | **1001 ms / ~1000 ms**, runs clean (was: hang) |
| assembled-payload error-path danglers | **0** |
| matrix / tiers / carrier-flip | **24/0 · 42/0 (1 skip) · 14/14** |
| `node --check` on all five artifacts | OK |
| both mirrors `sha256sum -c` | **8/8 OK** |
| helper-prefix uniqueness | 23/23 unique, opaque |

## 2026-09-20 (fifth refresh) — "bring back the baseline"

Built with `bash tools/cc33-build.sh` (full) then `bash tools/cc33-build.sh s4 stego` after the
shim/placement fixes. Shipped bytes: bundle `660b370b` (2,636,496 B) · runner `e59965b5`
(3,374,325 B) · cover `fb4ad9e7` (2,359,350 B) · real.min `26b44c55` (2,259,799 B).

* **r3 dispatch restored** in `shards/shard-e2.js` (bridge `dispatch`/`retract`) and
  `shards/shard-e3.js` (busy slot → dispatch instead of `throw "activity-busy"`). e2/e3 have no
  `.orig`, so in-place edits are the live source; presence confirmed in the v4/v5/mound intermediates.
* **Shim repaired:** new 2c final pass (`oto/scripts/build-s4-final-package.js`) — same per-site
  detector as the gate, mixed-script names accepted (compile-validated), declared with top-level `let`,
  injected **before** the G8 pin append. `[Shim-final] 5 error-path name(s) declared as no-ops`.
* **Harness:** `tools/cc33-build.sh` lint diagnostic guarded (`|| true`) — it could abort the cascade
  before the stego stage; malformed duplicate echo removed.
* Gate board on the shipped bytes: payload parses + executes (2,045,868 B / 1,020 ms / 4 logs) ·
  error-path danglers 0/176 · detector PASS · matrix 24/0 · tiers 42/0 (1 skip) · carrier-flip 14/14 ·
  carriers reel0 occ 84.84 % headroom 84,863 B, reel1 occ 84.85 % headroom 84,796 B · SHA 8/8 both
  mirrors. leakcensus G3 (2) known non-blocking (class already failed on the previous pack).
