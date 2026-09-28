# `e` family protection review + why not to pad (2026-09-20, U10 pass 1 aftermath)

Written in response to the operator's challenge: *"wouldn't the e pieces still be obfuscated through
the dictionaries (no reused terms between them) and/or have VMs applied on some? … I'm not sure why
you'd want to pad the payload."*

## 0. Short answers

| Operator's assumption | Reality |
|---|---|
| "still under JSO" | **Partly.** Only **e1** rides the v1/javascript-obfuscator lane (dictionary renames, rc4 string array, 8 wrappers, CFF 0.55). e2/e3/e4 ride **v7-swc / v5-terser / v4-closure**, which are minifiers and cannot consume a dictionary. |
| "unique dictionaries, no reused terms between them" | **Yes, by construction.** `dictFor(tag)` gives every tag its own Fisher–Yates shuffled slice of the balanced pool. e1 inherits the old `'e'` lane index, so **no other lane's slice moved** when the split happened. |
| "and/or VMs applied on some" | **No VM exists yet — not in r3, not in 8.14.** The only `new Function` in either bundle is js-confuser's, inside `m`. The `u` lane looks VM-ish (string pool + `d1/d2/d3/pcache/pfmt` decoder) but is a decoder, not an interpreter. The VM (`R2-04`) is PLAN-H work **scheduled after the splits**, not before. |
| "they'd be less protected because smaller" | Every piece **does** carry a string-pool layer — `obf-strings-g7.js` gives each tag its own pool (`textCacheE1..E4`), base64-encoded, `atob` + keystream at runtime. e2/e3/e4 have 37/45/50 encoded strings respectively. They lack only the *javascript-obfuscator* wrapper stack. |

Measured on the shipped pieces (before the final bundle pass):

| piece | lane | in bundle | dictionary renames | string pool | rc4 stack | VM |
|---|---|---|---|---|---|---|
| e1 | v1-jso | 315.4 KB | yes (312 script-chars) | `textCacheE1` | **yes** | no |
| e2 | v7-swc | 27.1 KB | no (mangled 3×) | `textCacheE2` (37 str) | no | no |
| e3 | v5-terser | 25.1 KB | no (mangled 1×) | `textCacheE3` (45 str) | no | no |
| e4 | v4-closure | 36.1 KB | no (mangled 2×) | `textCacheE4` (50 str) | no | no |

Tag-named pools do **not** leak into the shipped bundle (final obfuscation renames them; grep = 0).

## 1. Padding: you're right, don't. But occupancy matters for a different reason

I suggested padding because occupancy fell 89.7 % → 77.5 % after the split (payload shrank 136 KB gz).
That was the wrong lever. Here is what the number actually means and the 0-byte fix.

**Mechanism.** Each reel permutes `R_LEN` slots and writes the payload into the first `need` slots *in
permutation order*; the remaining slots keep their cover bits.

| | reel0 | reel1 |
|---|---|---|
| R_LEN | 2,239,680 | 2,239,409 |
| written (`need`) | 1,735,764 | 1,735,764 |
| **left as cover** | **503,916 slots ≈ 126 KB** | **503,645 slots ≈ 126 KB** |

**Why that is a tell.** The written region's LSB planes are statistically white (keystream output); the
untouched region keeps whatever structure the cover has. A steganalyst who recovers the seed → RS →
permutation (the permutation is derivable from the runner, which ships) sees an **internal boundary**:
"payload stops here" — i.e. the payload length, and therefore the size of what is hidden. This is the
same class of defect the strip already had (90 KB of zeroed LSB-2) and that we fixed with
`r31_grainStrip`.

**The fix is not more payload — it is grain-filling the unused permuted tail**, exactly as the strip
tail is already grained. Cost: **zero payload bytes**; it only overwrites bits the decoder never reads.
Extend `carrier-flip-check.mjs` with an F4b assert: reel-addressable slots beyond `need` are grained
(H ≈ 2.0, no zero/native run), so the whole reel reads as one uniform field instead of a field with an
edge in it.

(Your instinct was the part that was right: growing the payload to raise occupancy buys nothing except
a bigger download and a bigger thing to notice.)

## 2. Size, mounding and the real tell of a split

Agreed on both halves of your reasoning: a small artifact invites *"is this dead code?"*, and an
artifact that is visibly *more* protected than its neighbours invites *"why is this one special?"*
The conclusion that follows is that neither size nor protection should be manufactured — what matters
is that the pieces **look like things that are ordinary**.

Two observations from the current state:

1. **The seam is more visible than the size.** e2 is literally:

   ```js
   _0xmod._e = _0xmod._e || { v: 'h32' };
   _0xmod._e.S = _0xmod._e.S || {};
   _0xmod._e.step2 = async (S) => { /* 40 statements that copy S.x back and forth */ };
   ```

   Mangled names hide the words, not the **shape**: a tiny module exporting a numbered async step that
   takes one shared state bag, reads/writes `_0xmod._e.*`, and does nothing else. That is what "this
   was torn out of something bigger" looks like — and it is a stronger signal than any size ratio.
2. **Family contrast is the new size tell.** e1 is 315 KB against siblings of 27–37 KB. To anyone
   looking at the family, e1 is the interesting one.

Options for the family (my ranking):

- **(A) Leave lanes heterogeneous; spend the effort on the seam.** Give each piece a plausible
  self-contained surface: own local pool/decoder prologue (g7 already gives this), own guard/dead-code
  volume, no shared-state vocabulary that reads as a chain. Cheap, no size growth, no siblings.
- **(B) Move the JSO stack onto a *second* piece** and take it off e1, so the heaviest treatment is not
  also the largest artifact. Breaks "one engine per piece" only mildly; keeps siblings apart.
- **(C) Full JSO stack on all four** (this is what "still under JSO" would mean): e2/e3/e4 grow from
  ~27–37 KB to roughly 150–250 KB each. Payload +400–700 KB, occupancy → ~95 %+ (self-fixing the
  §1 issue the expensive way). Cost: four structurally identical siblings — mitigated only by distinct
  dictionaries and seeds. **Not recommended.**
- **(D) VM on a subset (R2-04).** This is where PLAN-H wants the VM, and it is the only option that
  adds a genuinely different *kind* of protection rather than more of the same. Should be sized so the
  VM'd piece does not become the family outlier.

## 3. Dynamic dictionaries and the script distribution

Yes — the generator already draws from the operator's own inventory. `oto/scripts/dict-gen.mjs` parses
`Uploads/unicode_list.csv`, keeps BMP code points that are valid `ID_Start`/`ID_Continue` (the
`noSupLead()` rule), requires ≥ 8 starters per block, and builds each word as
*ASCII fragment + 1–3 script characters + 2–4 digits*, matching the curated shape.

| pool | words | size | distinct script chars drawn |
|---|---|---|---|
| identifiers-dictionary-5k.csv | 5,706 | 67 KB | **2,070** across 11 blocks |
| identifiers-dictionary-jso.csv | 335 | 4 KB | 300 |
| identifiers-dictionary-runner-5k.csv | 3,859 | 45 KB | (same generator) |

So the full multi-script distribution is used: Hangul, Devanagari, Tamil, Khmer, Kana, Hanzi, Cyrillic,
Greek, Gothic, Thai, IPA, Full-Width Latin, Hebrew, Ethiopic/Ge'ez, Thaana, Cherokee, Georgian,
Armenian, Invisible & Control — whichever of those hold ≥ 8 valid identifier starters in the BMP.

Against your two conditions:

- **Footprint: neutral.** Same word counts, same file sizes as the curated pools, so the cascade is
  unchanged in size. Verified by running the whole cascade on generated pools (gates green).
- **Reversibility: unchanged.** The generator is seeded from the same master seed as everything else;
  it exposes no new recovery path. Recovering the seed already regenerates the rotation, the codenames
  and the noise; dictionaries join that set rather than extending it.
- **One caveat worth stating.** Generated pools are *uniformly* sampled from the block table, which
  makes them statistically **more regular than the curated ones**. If their distribution becomes a
  fingerprint, the dynamic dictionaries become a spectacle in the other direction. Mitigation: weight
  samples by real block frequency and inject deliberate irregularity (the curated pools' organic
  lumpiness). Cheap to do; should be part of the U11 flip, not an afterthought.

**Free side-benefit of the split:** four pieces = four independent dictionary slices, so the split
adds dictionary axes at no cost.

## 4. Questions this raises (operator input wanted)

1. **e-family protection** — (A) seam work + heterogeneous lanes (my recommendation), (B) rotate the
   JSO stack to a smaller piece, (C) JSO on all four, or (D) VM on a subset now rather than at R2-04?
2. **Reel-tail grain fill** — approve the 0-byte fix (§1) + its gate assertion? It touches the carrier
   build, not the split, so it is a scope call.
3. **`m` → 2** — the piece rides the js-confuser lane whose output is frozen behind `EXPECTED_V2_M`;
   the pin is re-pinned automatically each build. Approve a deliberate re-pin as part of the split?
4. **`e-str`** — one 44,994 B statement wrapping a 44,850 B array literal. Statement splitting cannot
   touch it; it needs an array-chunk transform (`[].concat(a,b,…).join('')` at runtime). Build it, or
   record it as a deliberate exemption?
5. **U11 (dynamic dictionaries)** — keep parked, or flip now under the conditions in §3?
6. **U12 (unused lane variants)** — `e-str`, `m-str`, `c`, `h`, `l` exist in more than one lane and S4
   ships one lane per shard. Use the alternates (multi-variant bundle) or declare them deliberately
   unused (one line in the checklist) and close the row?
7. **SW recalibration** — the payload moved 1,003,927 → 867,819 B gz, and it will move again after
   `m`/`aux`. Confirm recalibrating **once, after** all splits (PLAN-H order) rather than now.


---

# Part 2 — measurements run on the operator's three notes (2026-09-20)

## Note 1 — "two OTO layers per piece, one of them JSO+dictionary"?

**Possible: yes.** Measured (OTO output → second javascript-obfuscator pass with a per-piece
dictionary slice):

| piece | designated OTO | LIGHT profile | HEAVY profile (e1's config) |
|---|---|---|---|
| e2 | v7-swc | 27.1 → **85.6 KB** (×3.16) | 27.1 → **205.1 KB** (×7.56) |
| e3 | v5-terser | 25.1 → **93.2 KB** (×3.71) | 25.1 → **224.1 KB** (×8.92) |
| e4 | v4-closure | 36.1 → **105.2 KB** (×2.91) | 36.1 → **229.0 KB** (×6.34) |

All six outputs pass `node --check`. So the mechanism is sound and the cost is known:
LIGHT ≈ +200 KB source over the three pieces, HEAVY ≈ +550 KB source.

**But the *vocabulary* half of the idea does not survive the bundle.** The final S4 pass renames
every identifier again with its own 5k dictionary (`renameGlobals:false` spares only true globals).
Census over the pieces' inner dictionary words as found in the shipped bundle:

| | tokens sampled | present in bundle | as identifier | as quoted data |
|---|---|---|---|---|
| e1 + e2 + e3 + e4 + e-str | 407 | **397 (97.5 %)** | 2.8 % | **97.2 %** |

So ~97 % of the inner vocabulary is still in the artifact — but it lives in the pieces' own keyed
tables (`X['LEdger다휘72']='Tp1A'`), not as live names. A reader sees **one** naming scheme (the
outer pass's: 11,512 distinct multi-script tokens across 59 script ranges) plus five different
internal string tables. The tables do differ per piece — that part of "unique terms" holds.

Conclusion: do the double pass for *volume, a second string-array indirection and a second CFG
layer* (and because it fixes the "tiny module" seam) — not for a visible vocabulary. If visible
per-piece vocabularies are actually wanted, the outer pass must be told to keep them
(`reservedNames` regexes, e.g. by script block); that is a config change with its own tell
(the bundle then reads as "assembled from differently-named sources").

## Note 2 — "can a light VM be placed, and doesn't it stunt the decoder's progress?"

- We **already ship one**: the `m` lane (js-confuser) emits a `Function(...)` runtime-generated
  function — the VM-ish primitive ("rgf"). js-confuser 2.1.3 has no `vm` option; `rgf` is it.
- Measured on the e pieces (same option vocabulary as the shipped v2 lane):

| profile | e2 | e3 | e4 |
|---|---|---|---|
| `rgf` only | 120.8 KB (×4.46) | 98.5 KB (×3.92) | 161.2 KB (×4.46) |
| `rgf` + dispatcher 0.15 | 130.8 KB (×4.82) | 110.9 KB (×4.41) | 155.0 KB (×4.29) |
| `rgf` + CFG 0.3 | 695.0 KB (×25.6) | 324.0 KB (×13.9) | 456.2 KB (×12.6) |

All syntax-clean. `rgf` alone ≈ ×4 for ~+230 KB source over three pieces (≈ +100 KB gz ≈ +5 points
of carrier occupancy).

- "Stunted progress": **correct, and it cuts both ways.** A VM layer raises the cost of *reading*
  a piece from "pretty-print and rename" to "write a disassembler for an unknown ISA" — but the
  same is true for us: our verification must still run that piece's behaviour, so the piece stays
  under the same tiers/matrix/equivalence gates. Two constraints that follow: (a) VM **one or two**
  pieces, not all — a VM'd piece among plain siblings is itself a contrast tell; (b) put the VM on
  a piece whose *size can absorb it* without becoming the family outlier (e4 or e3, not e1).

## Note 3 — "how do you plan to achieve the tail grain?" — and why my first plan was wrong

Implemented behind `--reel-grain` (`stego3-codec.mjs`: `r31_grainReel` / `r31_tailSymbols`;
`build-stego12-r2.mjs` flag). Mechanism: for each reel, the payload occupies the first `need`
entries of the Fisher–Yates permutation; the tail entries are written with the **next symbols of the
same keystream the payload came from**, respecting the reel's plane mask. Zero payload bytes; the
decoder is untouched; `round-trip OK` still holds.

**First attempt (domain-separated grain) — refuted by measurement.** A grain generated from its own
domain has its own symbol bias, so it *creates* a fresh edge where the old one was:

| build | reel0 z(sym0) | reel1 z(sym0) |
|---|---|---|
| un-grained | 3.37 | 5.36 |
| grain, separate domain (first attempt) | **7.79** | 4.14 |
| grain, **payload-keystream continuation** | **1.45** | **2.38** |

(full-population census, 1.74 M written vs 0.50 M tail slots per reel; z = two-proportion test on
the symbol-0 share.)

Residual cause, worth stating plainly: the *written* region is itself non-uniform (27.3 % symbol-0
vs the uniform 25 %), i.e. the compressed payload's low bits are not uniform. The tail can only
inherit that skew, not remove it. Making the keystream/payload bits uniform is a separate, deeper
change.

**Also honest**: the leak was never large. The boundary is only detectable as a population statistic
over the whole tail, and anyone who can recover the seed computes the payload length from the
12-byte header directly. This is defence in depth, not a fix for a demonstrated failure.

Status: **implemented, flag-gated, NOT shipped.** The tree was rebuilt back to the approved
un-grained cover (`867fef9f…`, matrix 24/24) so nothing ships unapproved. Recommended: flip it
together with the `m`/`aux` splits and SW recalibration, since that pass re-runs every gate anyway.
