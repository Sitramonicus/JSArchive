# Arm A — carrier de-tabling: what it is, what was built, what the evidence says

**Built 2026-09-26. Verified against the frozen 8.14 pack. Awaiting the operator's live paste before
promotion.** The frozen pack was not touched; the 8.14 toolchain was not edited (this line works on copies).

---

## 1. The shortcut being closed

The pasted runner embeds its own copy of the cover (the snapshot) so it can play without the BMP. That copy
is stored as base64 split into 18,185 chunks, shipped in a shuffled order — and, until now, **the shuffle
was published inside the artifact**: the `/*R9F*/` fragment carried `o0…o3`, the chunk indices, in plain
JSON (~98 KB, verified a unique permutation of 0…18184).

Consequence: an analyst could reconstruct the embedded cover by reading the file — no decoder, no analysis,
just an inverse permutation. Everything downstream (the LSB channel, the strip, the reels) then happens on a
stable image the analyst already has. That is the "linear/series stitching" the operator wants fixed: not
that the structure is known, but that it is *free*.

## 2. What changed

| file | change |
|---|---|
| `carrier/stego11-loader.js` | the deal is **regenerated** at load time from a 32-bit seed `s` (mulberry32 + Fisher–Yates, ~10 lines) instead of being read from the artifact. Fragments that still carry `o0..o3` (8.14-era) and single-group `{c,o}` fragments keep decoding unchanged |
| `carrier/build-stego13-r2.mjs` | emits `{s, c0..c3}` (no `o*`); adds a **drift guard** that regenerates the deal the way the loader will and fails the build on any mismatch; asserts post-build that the runner carries no `o0`/`o3` |
| `carrier/test-stego11-{matrix,tiers}.mjs` | the matrix's frag test now rebuilds the deal from `s` and asserts every group's chunks are accounted for; it gains one assertion ("FRAG publishes no deal") |

Nothing else moved: the group contract (`index % 4`), the chunking (5 + 173-char slices), the base64, the
reels, the strip, the decoys, the gates, the banner — all unchanged.

## 3. Evidence

**Pipeline parity first** (so a byte difference can only be the change): rebuilding the frozen bundle with
the *unmodified* 8.14 carrier reproduces `ad898afb…` byte-for-byte, cover `3bf21868…`, payload `28d36d97…`.

| check | result |
|---|---|
| `frag-derive-check` on the arm A runner | published deal **absent**; the regenerated deal reassembles the embedded snapshot to sha256 `3bf21868…` — **the frozen cover's digest**, i.e. the map was removed and nothing else |
| `runner-wire-probe` (staged code capture) | `28d36d97…` — **byte-identical** to the payload the 8.14 runner stages |
| cover | `3bf21868…` unchanged (arm A does not touch the carrier bytes) |
| payload | `28d36d97…` unchanged |
| `test-stego11-matrix` | 26/0 — the 25 baseline assertions plus the new one |
| `test-stego11-tiers` | 42/0 (1 skipped) — identical to 8.14 |
| `hold-check` | PASS |
| `carrier-flip-check` | 14/0 |
| `repaste-check` (defaults) | 4/4 ASSERTs PASS; garden output identical to the frozen runner's run |
| runner size | 3,375,606 → **3,278,667 B** (−96,939 B) |

## 4. What it does *not* claim

- Not secrecy: the seed and the generator are in the artifact, so a determined analyst can still port them.
  What is gone is the *free* inverse permutation — the work is now "read and re-implement the loader's
  derivation", which is exactly the tug-and-pull the operator described.
- Not a weave: chunk *order* is still recoverable; the runs are still long. That is step 3's job.
- Not shippable on this evidence alone: the operator's live paste is the last gate, and the b24 build must
  clear the same battery (see `README.md` §5 and `GATE-BASELINE-8.14.md`).
