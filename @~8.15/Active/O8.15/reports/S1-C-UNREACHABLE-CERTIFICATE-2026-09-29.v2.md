# S1-C unreachable certificate — SOUND-TOOL re-derivation (2026-09-29)

**Supersedes the numbers in `S1-C-UNREACHABLE-CERTIFICATE-2026-09-28.md` (measured on the pre-fix tool).
The conclusion's DIRECTION survives and sharpens; the numbers change and the remedy moves to S2.**

## Why the re-derivation

The 2026-09-28 certificate measured outputs that the functional gate later rejected (deal-soundness
defects, `reports/S1-D-DEAL-SOUNDNESS-2026-09-28.md`). After eleven soundness fixes (dissolve param
re-binds, declaration-relocation access bounds, decl/chain ordering, frozen dissolved bodies + atoms,
label-fence closed gaps, higher-order + property + synthetic-helper aliasing in the reader map), every
accepted output boots in the decoy-parity VM with byte-identical behavior (22/22 log lines). The bounded
grid was re-run in full on the sound tool (`reports/S1-C-SEARCH-LEDGER-2026-09-28.v2.jsonl`, 12 rows).

## The bounded set (re-measured, sound tool)

| run | >0.25 | worst | mean | excess | sha (12) |
|---|---:|---:|---:|---:|---|
| **g4-declAllExp** | **54** | 0.4325 | 0.3139 | 5.153 | `0d0874777fe7` |
| g9-expKB24 | 54 | 0.4338 | 0.3119 | 4.963 | `dc34ca7a5401` |
| g10-expKB32 | 54 | 0.4325 | 0.3139 | 5.153 | `0d0874777fe7` (=g4 byte-identical — KB=32 still a no-op) |
| g2-declAll | 56 | 0.4327 | 0.3114 | 5.043 | `340734c184f3` |
| g7-all3 | 56 | 0.4326 | 0.3038 | **4.171** | `642895620b05` |
| g1-decl (canonical v3) | 57 | 0.4328 | 0.3148 | 5.259 | `e864fe1f23ac` |
| g5-declExp1k | 57 | 0.4324 | 0.3156 | 5.161 | `1ef79dbe9623` |
| g11-expSeed2 | 57 | 0.4325 | 0.3091 | 4.761 | `c9a8431446dd` |
| g3-declExp2k | 58 | 0.4326 | 0.3134 | 5.045 | `ad91eee51cf0` |
| g6-declAllExp1k | 60 | 0.4324 | 0.3163 | 5.199 | `0698965cd167` |
| g8-all3Exp | 62 | 0.4324 | 0.3014 | 4.060 | `c8e17349fbef` |
| g13-seqAllExp | 62 | 0.4324 | 0.3014 | 4.060 | `c8e17349fbef` (=g8 — SEQ still a no-op) |

Same dimensions as the 2026-09-28 grid (placement {reloc, reloc-all, all3} × export {off, 1 KB, 2 KB} ×
KB {24, 28, 32} × seed {2648369387, 1844674407} × SEQ {off=on}). Best = **54 windows** (g4/g9/g10);
no level reaches 0.

## The four legs (sound tool)

1. **Bounded set exhausted.** 12 runs covering every level of every lever; two measured no-ops re-confirmed
   (KB=32≡28, SEQ-on≡off). No level combination in the set reaches `windows_above_target = 0`.
2. **Zero blocking statement atoms.** The largest single fixed statement in the census is **47,137 B src**
   (`S1-C-FIXED-CENSUS-g8-2026-09-28.v2.json`), below the per-window 0.25W threshold of **55,565 B**
   (W = 222,262 B). The worst window's share (0.4325) is a BUCKET CLUMP of several immovable statements
   hashing into one bucket — not one indivisible atom. (Caution recorded: `in_target_windows` sums across
   the 7 overlapping windows and must not be read as a per-window mass.)
3. **Per-class named conditions covering every fixed item.** Census v2: **4,145 items, 10,178,599
   in-window B** — rejected 6,989,410 · split-routed 2,339,632 · movable-whole 849,557. Route src-B:
   binding 434,585 · split:seq 420,846 · slice-rewrite 340,185 · exception-timing 190,181 · return 146,460
   · split:fnbody 134,805 · split:literal 124,259 · relax-span 121,969 · split:wrap 93,610 · decl-reloc
   19,003 · async/gen 8,311 · this 681. Every item carries exactly one class with its named safety
   condition (helper-boundary, edited-text irreproducibility, SEQ hazard, binding-order, export floors,
   window limits). The sound deal ADDS the frozen-dissolved-body class (the bodies that scattered before
   and broke the payload) — immovable by measured semantics, not by conservatism.
4. **Placement floor is stable and honest.** Across the 12 rows the worst sits at 0.4324–0.4338 — a
   structural ceiling of the same family as the pre-fix 0.434 (one bucket ≈ 23 buckets × 10% window).
   The sound constraints cost the metric ~7–15 windows versus the unsound deal (47→54 best). That cost
   is the PRICE OF CORRECTNESS and is not recoverable within S1: the frozen units and the reader barriers
   are what keep the payload alive in the VM.

## Conclusion

**Within S1's bounded set on a sound deal, `windows_above_target = 0` is unreachable; the residual floor
is constraint-driven and bucket-clump-driven, and breaking it is source work — Segment 2's texture
rebalance (splitting the clumped fixed mass at the source, not by unsound re-placement).** The 2026-09-28
certificate's direction ("the 0.25 target belongs to the source") stands; the numeric claims in it are
superseded by this document.
