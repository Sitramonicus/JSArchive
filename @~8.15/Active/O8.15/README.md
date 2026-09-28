# O8.15 — the working line (build 25) 

**Status 2026-09-26:** **the complete 8.15 build exists.** Build 25 carries the normaliser, the
order-preserving split, the weave and the constraint pass; the full battery and the pre-paste board are
green, the D-ledger is closed (`DECISIONS.md`), and the only outstanding row is the operator's live paste.
Nothing has been promoted, nothing has been pushed, and the frozen 8.14 pack is untouched.

Record: `CC-34/reports/BUILD-25-REPORT.md` (full) · `CC-34/reports/board-b25.log` (one line per gate) ·
`CC-34/reports/build-b25.log` (stage log) · `CC-34/final-package/` (the two files the live test needs).

---

## 1. What this line is

8.15 is the **carrier-and-stitching supplement**: it removes the shortcut that lets an analyst read the
payload's layout out of the artifact (**arm A**), masks the last readable vocabulary (**normaliser**), and
turns the payload's monolithic regions into many small order-fixed statements that are then dealt through
their own function bodies (**split + weave + constraint pass**).

It is *not* a new product line. The product — what the operator pastes and what the decoder fails on — is
unchanged; every change here is either invisible on the wire or provably behaviour-neutral.

## 2. The governing law (see `Handoff/O8.15-CHARTER-2026-09-25.md` §0 for the operator's words)

A step may be promoted only if **all** of these hold on the exact built bytes:

1. **Identical battery numbers** to the frozen 8.14 pack — not "no new failures", the same numbers.
2. **The decoder still fails** — `detector-replay` PASS, stand-down/garden/teardown behaviour unchanged.
3. **8.14 stays recoverable** — `Working-Stable/O8.14/` and `Archives/rollback-b22/` are never edited.
4. **Nothing ships unproven** — if a step cannot be shown behaviour-neutral, it does not ship.

### The two absolutes

- **The frozen pack is read-only.** `Working-Stable/O8.14/*`, `Archives/packages/O8.14/*` and
  `Archives/rollback-b22/*` are evidence, not inputs. Verify: `cd Working-Stable/O8.14 && sha256sum -c SHA256SUMS.txt`.
- **The 8.14 toolchain is read-only.** `Active/Stego/*` stays exactly as the frozen build used it. Every
  8.15 change lives in this directory as a copy.

## 3. Layout

```
Active/O8.15/
  README.md                 this file
  GATE-BASELINE-8.14.md     the exact digests + battery numbers every 8.15 build must reproduce
  DECISIONS.md              D1–D9 ledger — closed 2026-09-26 with a final disposition per item
  ARM-A-REPORT.md           arm A: what changed, the verification evidence, the numbers
  SPLIT-MEASURE.md          step 2: what is monolithic in the shipped payload, and the cost to split it
  carrier/                  the 8.15 carrier stage (copies; see §4)
    build-stego13-r2.mjs    the builder: [2a-bis2] normalise → [2a-ter] split → [2a-quater] weave →
                            [2a-quinquies] constraint → [2b] repin + carrier + staged-vs-shipped
    stego11-loader.js       the loader, + arm A (deal regenerated from `s`)
    stego3-codec.mjs        unchanged copy (r31 carrier, PG3 strip, slack/offset helpers)
    stego3-strip-base.bin, decoy-garden-v2.js, honey-board-src.js, tube-vault-src.js,
    stego10-legacyreel-src{-v31}.js            unchanged inputs
    test-stego11-matrix.mjs, test-stego11-tiers.mjs   the two runner tests, frag-shape aware
  tools/
    runner-wire-probe.mjs   EXTRACTION GATE: runs a runner in a stubbed venue, captures the staged code
    frag-derive-check.mjs   ARM A AUDIT: no published deal; regenerated deal == the cover, by digest
    normalise-payload.mjs   [2a-bis2] mask the residual vocabulary (6 edits; refuses a no-op)
    split-runs.mjs          [2a-ter] measure / apply the order-preserving split
    weave-payload.mjs       [2a-quater] deal movables through their bodies; --measure, --seed=N, 4 self-gates
    constraint-pass.mjs     [2a-quinquies] independent 5-check constraint pass; exit 1 on red
    cc34-build.sh           the 8.15 build, one command
    board-815.sh            the full pre-paste board on a built directory
  CC-34/
    final-package/          the promoted build's paste + cover + SHA256SUMS (runner 802c4763, cover c6738275)
    reports/                board-b25.log · build-b25.log · build-b25-repro.log · repaste-b25.log ·
                            BUILD-25-REPORT.md
```

## 4. How to build (and what a build produces)

```bash
OUT=/tmp/b25 bash tools/cc34-build.sh carrier   # normalise → split → weave → constraint → carrier (≈35 s)
OUT=/tmp/b25 bash tools/cc34-build.sh verify    # identity gates on an existing build
OUT=/tmp/b25 bash tools/cc34-build.sh swift     # the payload/venue gates (detector, netwatch, flip, hold…)
BUILD=/tmp/b25 bash tools/board-815.sh b25      # the full pre-paste board (≈6 min)
```

Switches: `NORMALISE=0` · `SPLIT_MIN=0` (off) or `SPLIT_MIN`/`SPLIT_RUN` (thresholds) · `WEAVE=0` ·
`WEAVE_SEED=n` · `CONSTRAINT=0`.

The carrier stage is **byte-reproducible**: rebuilding the frozen bundle with the 8.14 carrier reproduces
`ad898afb…` exactly, so any byte difference in a 8.15 build is attributable to the 8.15 change alone. Build
25 was built three times (b25, b25b, b25c) with identical digests.

## 5. Evidence from this pass (2026-09-26)

**Build 25 — the complete build (normalise + split + weave + constraint).** Full table in
`CC-34/reports/BUILD-25-REPORT.md`; the short version:

| check | result |
|---|---|
| build | runner `802c4763011e9291…` (3,278,667 B) · cover `c6738275b8a8ea08…` · payload `60316654b349ae6d…` (2,388,103 B) |
| pipeline | normalise −7 chars/6 edits · split +1,437 chars/12 candidates · weave +1,859 chars (1,741 declarations + 96 runs/12 groups) |
| weave effect | 58.2 % of the payload's bytes relocated · longest single-origin run 163,121 → **99,932 B** · worst 10 %-window share 0.776 → **0.501** |
| compression | gzip 994,234 → **981,959** · brotli-q11 773,363 → **770,159** |
| carrier | occupancy 87.69/87.70 % (8.14: 88.63/88.64 %), headroom **68,909/68,841 B** per reel |
| reproducibility | three builds → identical digests · seeds 11 / 4242 / 999,983 all green |
| battery | every 8.14 row reproduced (matrix 26/0 · tiers 42/0 · hold PASS · flip 14/0 · detector PASS · netwatch 0 · dangling 61/0 · decoy-parity PASS ×3 · golden trace 25 events · gate-replay 17/17 · chains 14/14 · repaste 5/5) |
| new gates | `leakcensus` **PASS** (was G3=4) · constraint pass **PASS 5/5** (negative control fails as designed) |
| identity | staged payload == shipped payload · `runner-wire-probe` staged == payload digest · `frag-derive-check` MATCH |

**Arm A alone** (frozen bundle, no split): cover/payload unchanged · no published deal · runner −96,939 B ·
matrix 26/0 · tiers 42/0 · hold PASS · carrier-flip 14/0 · repaste 5/5 (`ARM-A-REPORT.md`).

**Owed:** the operator's live paste of the two files in `CC-34/final-package/`. Nothing else is outstanding.

## 6. Not in this line

No custom VM. No anti-tamper/self-integrity responses. No entropy raising. No new crypto. No repo hygiene
(public by choice). No re-litigating closed items (`Handoff/O8.15-CHARTER-2026-09-25.md` §3.4). Held
deliberately: strings/objects in the split (B23) and the level-2 intra-body weave (B27).

**Snapshot budget:** the workspace tracks ~123.5 MB against a ~128 MB cap, so this line keeps the promoted
build's paste+cover (5.6 MB, the files the live test needs) and reports — everything else regenerates in
~35 s from the frozen bundle, which is why digests are the record.

## Saved context location

The move-ready saved-files folder is `/home/user/8.15-SF/`. Move that entire directory to the repository path
`@~8.15/8.15-SF/` only after verifying both archive sidecars in `8.15-SF/archives/`. It contains the generated
CC-34 package, pinned chain-A artifacts, reports, tools, runner evidence, extraction instructions, and the
unfinished Segment 1–3 task list. The active workspace intentionally no longer keeps duplicate CC-34/pinned
copies after they were archived there.
