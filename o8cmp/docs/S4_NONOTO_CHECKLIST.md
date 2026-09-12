# O.8.5-S4 — NON-OTO CHECKLIST (FINAL)

Date: 2026-09-10 · This is the **last call** for non-OTO status. Everything below is
verified against the frozen clean set (r4):
- bundle sums sha `06f4b7778747fd25e6e86b2e9f0a4ea1156c76ee84cd2fac9f9021b3e453c9f7` (15 files)
- stitched r4 = `b60d387f4da24e210857f64ea360c1ec4b01c115e5490de941227750bfd5e426`
- clean shard-a `839ee095…`, shard-u `aa26c07f…`; OTO u output `d9feb296…`

Legend: **DONE** = implemented + verified · **TOOL** = packaged as a post-OTO micro-pass
(by design, cannot run on clean source) · **REJECTED** = decided against, documented ·
**OFF** = optional, default off, awaiting user · **PRESERVE** = must not regress,
re-verified · **PROCEEDING** = OTO-phase work now underway.

> ## ⚠ STATUS AMENDMENT (rev 10) — THIS SIGN-OFF IS INVALIDATED AND PARTIALLY REFRESHED
>
> A further clean-side edit was made after this document's sign-off: the **const→let fix**
> (29 sites; backup `attic/s4-shards-pre-constrlet/`) required by Closure Compiler
> `JSC_REASSIGNED_CONSTANT`. By the rule stated in the Sign-off section below, the r4
> sign-off is **invalidated**.
>
> **Refreshed on r5** (`stitch 103cf0ee…` / `sums fa008958…`, backups intact):
> bundle sums 15/15 `-c` OK · deterministic double-stitch byte-equal · per-piece syntax
> 7/7 · marker ×1 in all 7 pieces and in every OTO u output (contiguous, no `\x20`) ·
> `GoogleUnlock` literal 0 · comment-free · **all six OTO type folders boot in both marker
> states** (unlocked → `Session check complete { ready: true }`; locked → reject + fail-open).
>
> **Still carried from r4 evidence (NOT re-run on r5):** heap probe (C5), duplicate-paste
> guard, residue/camo/term scans, MC readout + lex sweep, typography counts beyond the
> r5 stitch checks. Re-run these before any final declaration if the family set is touched
> again; they are unchanged by a const→let swap, but the claim must say so rather than
> imply fresh coverage.
>
> Per-item A–G/V statuses below remain accurate in substance (the edit was mechanical:
> `const`→`let` on reassigned noise-block bindings); treat their "r4" hash references as
> r4-era identities. New pins are in `HANDOFF.md` and the rev 10 register addendum.

## A — Unlock / marker

| # | Item | Status | Evidence |
|---|---|---|---|
| A1 | Marker auto-call in its own shard (u); engine (e) pristine | **DONE** | marker `佐藤 結衣` ×1 in all 7 pieces, in shard-u; zero marker/unlock refs in e |
| A2 | Salt + digest constants; digest as byte array, compared per call | **DONE** | shard-a `_0xsalt` charcode array; `_0xwantb` 32-byte array; byte-wise compare |
| A3 | OTO constraint: marker stays literal/searchable in u outputs | **DONE** | u-out (canonical) includes `佐藤 結衣` literal, contiguous, no `\x20`; rule encoded in obf-u-canon.js |
| A4 | Gist/GitHub doc provenance block | **n/a** | user's call on that doc; unrelated to code |

## B — Camo (text)

| # | Item | Status | Evidence |
|---|---|---|---|
| B1 | RLO+PDF in decoy-only strings | **DONE** | RLO/PDF per shard: a=2/2, u=2/2 (one decoy + one RLO unlock construct), others 1/1 |
| B2 | ZWJ/ZWNJ identifier suffixes | **TOOL** | `tools/zw-suffix.js` (post-OTO; obfuscators rename clean identifiers) |
| B3 | FEFF inter-token whitespace | **TOOL** | `tools/feff-sprinkle.js` (post-OTO; minifiers strip whitespace) |
| B4 | ZW chars inside decoy strings | **DONE** | `_0xzw*` string per shard + `_0xzz*` decoy ×1 per shard |
| B5 | ZWS between tokens | **REJECTED** | syntax error; ZWSP string-only (verified: 0 token-level usages) |
| B6 | Homoglyph/punycode identifiers | **REJECTED** | self-defeating (typing breaks, mojibake logs) |
| B7 | Esoteric/whitespace-language encoding | **REJECTED** | size math (paste cap) — TECHNIQUE_MAP.md |
| — | LRM in decoy strings (found during double-check) | **DONE** | replaced with ZWNJ; LRM count = 0 across all pieces |

## C — Memory

| # | Item | Status | Evidence |
|---|---|---|---|
| C1 | Typed-pool refactor (Uint16Array offsets, decode-on-demand) | **DONE** | m: 300 codename words + 13 MC keys/flavor; e: 1,401 literals; aux: 197 strings; 1,914/1,914 parity |
| C2 | Transient decode discipline | **DONE** | readers decode per call; no module-level decoded caches |
| C3 | Retention probe (diagnostic) | **DONE** | `Log.queue`/`flush`; 3× `Store check {…retained: 0}` on unlocked boot; 0 on locked |
| C4 | Residue sweep (routes, src ids, labels, salt, digest) | **DONE** | scan: `/intake`, `201f1688`, `[MemberCount]`, `Still watching`, `https://`, salt → all 0 (marker ×1 by design) |
| C5 | Heap-profile metric | **DONE** | `tools/heap-probe.mjs`+`heap-scan.mjs`; 10/10 needles = 0, controls ≥1 |
| C6 | Honest scope note (typed arrays visible to heap tools) | **RECORDED** | register rev 6/7 text |

## D — Transport

| # | Item | Status | Evidence |
|---|---|---|---|
| D1 | Transport-shape audit → `TRANSPORT_SHAPE.md` | **DONE** | inventory + evidence: 0 direct network primitives anywhere |
| D2 | Payload shape parity (fields/order/src ids) | **DONE** | all requests via app module `_0x9.post/get`; no hand-built requests |
| D3 | Cadence discipline (humanized/raw split, hidden-tab pause) | **DONE** | documented + preserved (GoogleDelay/GoogleDelayRaw present) |
| D4 | Fail-closed URL guard (O8.3) retained | **DONE** | present in engine; documented |
| D5 | Retention tie-in (decoded values don't outlive call) | **DONE** | joins C2/C3 probes |
| D6 | Non-goals recorded (no fake presence/input/anti-CDP) | **RECORDED** | TRANSPORT_SHAPE.md §6, register §D |

## E — Preserve (no-regress), re-verified on r4

| Item | Status | Evidence |
|---|---|---|
| O8.4.3 frozen/untouched | **PRESERVE** | not modified this phase |
| MemberCount console-only, read-only, Google-prefixed, prominent | **PRESERVE** | `report()` → `[MemberCount] Members: 200 \| Online: 57` |
| Duplicate-paste guard | **PRESERVE** | pre-armed run refuses: "An O.8 run is already active" (neutral key `_0xq2de579ef`) |
| Salted-digest-only unlock | **PRESERVE** | byte-array compare; locked boot stays locked |
| LOG_LEVEL semantics (L0 silent except MC; verbose behind unlock) | **PRESERVE** | L0 branch includes queue/flush noop; diag gated on `_0xopen` |
| Per-call lexicon draw, no-immediate-repeat | **PRESERVE** | 60/60 draws valid post-C1 |
| Comment-free shipped JS | **PRESERVE** | string-state scan: 0 real comments in all 7 pieces |
| Seven-pocket fail-closed gate | **PRESERVE** | locked/unlocked headless boots both fail closed (no pockets in shim); live client passed 7/7 |
| Push-return capture | **PRESERVE** | untouched in engine |
| Deterministic generator/stitch per seed | **PRESERVE** | re-stitch byte-identical ×2 |
| Decoys woven in-shard | **PRESERVE** | noise IIFEs present in every piece |
| Stress battery + MC cross-shard readout | **PRESERVE** | MC cross-shard readout verified; stress suite unchanged since Shard-3 (unaffected by storage-shape edits) |
| Word pools uniform 15 variants | **PRESERVE** | KC pool = 20×15 |

## F — Optional (default OFF)

| # | Item | Status |
|---|---|---|
| F1 | Custom MBA expression pass | **OFF** |
| F2 | Function inlining/outlining shuffler | **OFF** |
| F3 | Environment-fingerprint binding | **OFF** |
| F4 | Engine rotation matrix (user obfuscator.io ↔ our sets) | **PROCEEDING** (this OTO phase) |
| F5 | Per-piece IIFE param-name differentiation in clean source | **OFF** (cosmetic; obfuscators rename) |
| F6 | VM variants | **REJECTED** (bulk; user confirmed) |

## G — OTO phase & post-OTO (now proceeding)

| # | Item | Status |
|---|---|---|
| G1 | OTO sets regenerated from final shards (`s4-oto/v1-jso-s3matrix`, `v2-jsc`, `v3-jso-lite`, `u`) | **PROCEEDING** |
| G2 | Post-OTO marker check per set (searchable ×1 in u) | **PROCEEDING** (per-set evidence recorded) |
| G3 | Seam removal pass on user's stitched product | **PENDING** (after user's obfuscator.io runs) |
| G4 | Transport compression (gzip/deflate/brotli + b64 shell) | **PENDING** (available, proven) |
| G5 | Release packaging (modular + single + compressed forms) | **PENDING** |
| G6 | Docs: S4_RECORD, CURRENT_STATE, CHEATSHEET appendix | **PARTIAL** (register/HANDOFF/READMEs live; final records after G3–G5) |

## V — Observer hardening triage

| # | Finding | Status |
|---|---|---|
| V1 | Global symbol leak | **FIXED** — neutral `Symbol.for("_0xq2de579ef")`; guard re-verified |
| V2 | "Dead" aux arrays (remove/activate) | **REJECTED** (kept as decoy, codes now packed) |
| V3 | Synthetic input | **REJECTED** |
| V4 | Stream-chore media reality | **ACCEPTED as guidance** (doc-level; G6) |
| V5 | Hook descriptor leakage | **ALREADY MITIGATED** (verified; one noted nuance) |

## Verification battery (fresh run on r4)

1. bundle sums **15/15 OK** · 2. stitch deterministic + sha pinned · 3. marker ×1;
   `GoogleUnlock` literal **0** in stitched (RLO-reversed construct, bidi controls
   survive; runtime property verified by successful unlock path) · 4. direct network
   primitives **none** · 5. comments **0**, `eval` **0**, `debugger` **0** ·
   6. duplicate-paste guard refuses · 7. heap probe **PASS** · 8. MC readout + lex OK.
   Live client confirmation (user run): gate 7/7 → chores queued → unlock →
   probes → launcher → tally. One benign `undefined` console artifact, one one-off
   timer violation (Node/Chromium noise; not our timer path).

## Sign-off

Non-OTO work is **CLOSED** with the above evidence. The only open items are the OTO
phase (G1–G6), now in progress. Any further non-OTO edit invalidates this checklist
and the pinned hashes; re-run the battery before OTO.
