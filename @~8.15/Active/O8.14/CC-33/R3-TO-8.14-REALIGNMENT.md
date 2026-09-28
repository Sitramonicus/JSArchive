# R3 → 8.14 REALIGNMENT — how 13-r3 was actually built, and where every step lives now

**Written:** 2026-09-20 (Asia/Shanghai) · **Line:** O8.14 / CC-33 · **Build seed:** `851b28e5`
**Sources audited:** `@~8.13/Active/O8.13/{PLAN-r3-Resolution.md, IMPLEMENTATION-LOG-r3.md}`, `@~8.13/STRING-LAYER-REVERSAL.md`,
`@~8.14/8.14-SF/context/raw-docs/*` (AVENUES-r3-Inventory, R4-BUNDLE-ROADMAP, CAR-M-R2-08-R4-PLAN, Handoff_O8.13_2026-09-16, AVENUES-O8.13-COLLATED),
the 150-entry `archives/O8.13-generated-outputs-2026-09-19.tar.gz` manifest, the previously exported agent log
(`uploads/lmarena_fully_sanitized_agent_run_1789827630147.txt (now `.txt.gz` — `gunzip` to read)`, 3.7 MB), and the r3 stage scripts themselves.

---

## §1 — Beat-by-beat: how O8.13-r3 was built

The r3 line ran **one deterministic cascade over 12 shards**, every stage seeded from `Active/O8.13/BUILD-SEED.txt`
(`851b28e5`, 2026-09-16T07:44:00+08:00), then wrapped the result in a stego carrier and a runner.

| # | Beat | Script | Input → output | Evidence it ran |
|---|---|---|---|---|
| 0 | **Seed + rotation** | `oto/scripts/seed-lib.js` (`SEEDINT`), `rotate-ioc.mjs` | `BUILD-SEED.txt` → per-stage ints; `oto/rotation.json` → rewritten shard literals | manifest `tag: o812`, instance `7e953faa`, symbol `_0xq7e953faa` |
| 1 | **Shard sources** | hand-authored `shards/shard-{a,aux,e,m,n1,n2,u,p-telegram,p-teams,p-zoom,p-slack,p-discord}.js` (12) | source tree | `@~8.13/Active/O8.13/shards/` = 12 files |
| 2 | **G7 string layer** | `obf-strings-g7.js` | 12 shards → `oto/g7-strings/` (12 + `census.json`) | IP-resistance layer: keyed string table, trip/deflection, honey |
| 3 | **v1 JSO / S3 matrix** | `obf-v1-s3matrix.js` | 12 files → `oto/v1-jso-s3matrix/` (12 + `-out.js`) | per-shard JSO config table (`PIECES`), dict split, CFF/DCI per pocket |
| 4 | **Minify family** | `obf-minify-family.js` | 12 files × engines → `v4-closure/`, `v5-terser/`, `v6-esbuild/`, `v7-swc/`, `v8-uglify/` (12 each) | manifest lists all five engine dirs × 12 |
| 5 | **u canonicalisation** | `obf-u-canon.js` | `oto/u/shard-u-out.js` | marker searchability checks (`佐藤`, `結衣`) |
| 6 | **v2 js-confuser** | `obf-v2-jsc.js` (frozen, per-child-process) | 12 files → `oto/v2-jsc/` (8 outputs: a, aux, e, m, n1, n2, p-zoom, u) | build-s4 hash-pins `shard-m-out.js` |
| 7 | **S4 final stitch** | `build-s4-final-package.js` | selects 1 lane per shard → `final-package/` (`O8.6-Final-final-bundle.js`, `-compressed-gzip.js`, `-compressed-deflateraw.js`, `selected-shards/` 12 + `.gz`, `SHA256SUMS.txt`) | selected-shards = 12; `selection=12` in script |
| 8 | **Stego carrier** | `Active/Stego/build-stego12-r2.mjs` + `stego3-codec.mjs` (`stego-r3/`) | bundle → `output-stego12/` (runner, 1024×768 cover, 4 payload reels, `rotation.json`) | r3 runner `d4de42af`, cover `3bbe7345` |
| 9 | **Freeze / go-live** | — | `Archives/packages/O8.13-r3/` + `Working-Stable/O8.13/` | r3 frozen; **do not overwrite** |

**r3 payload identity (frozen):** bundle `604f4434`, runner `d4de42af`, cover `3bbe7345`; payload 2,011,232 B, 2,997 functions, mean identifier 20.28.
**r3 stego identity:** 1024×768, salt `3f72a1ec`, seed `0x6d7f0c87`, 4-bit scattered real channel over 2260896 slots, decoy strip 6652/98400.
**r3 runtime bug (fixed in the 8.14 context — keep the fix):** `shard-a.js:144 globalThis._testMod=_0xmod` published the whole module
registry to the page. FaC-36 removes it; leakcensus G1/G2 now report **none**.

---

## §2 — Realignment table (r3 step → 8.14 step as it exists now)

| r3 beat | 8.14 realigned to | File (CC-33) | Status after this turn |
|---|---|---|---|
| 12 shards | **17 shards**: `a, c, e, e-str, h, l, m, m-str, n1, n2, aux, u, p-telegram, p-teams, p-zoom, p-slack, p-discord` | `CC-33/shards/*` | realigned ✔ |
| TAGS = 12 in G7 + minify | **TAGS = 17** | `oto/scripts/obf-strings-g7.js`, `obf-minify-family.js` | patched ✔ (17/17 shards processed, 85/85 engine outputs OK) |
| v1 `PIECES` = 12 entries | **17 entries** (+ `c,h,l,m-str,e-str` lanes; mounded pockets kept) | `oto/scripts/obf-v1-s3matrix.js` | patched ✔ (16 v1 outputs; `m` correctly excluded → v2) |
| S4 `selection` = 12 rows | **17 rows**, r3 stitch order `a→l→m-str→m→n1→c→h→e-str→e→n2→aux→u→pockets` | `oto/scripts/build-s4-final-package.js` | patched ✔ |
| rotation stage | `rotate-ioc.mjs` run with tag `o814`, `--version=8.14` | `oto/rotation.json` (bootstrapped from O8.13) | ran ✔ — instance `7e953faa → 06118ef1`, codenames `owl…umber → juniper,lark,kelp,fjord,brook,pine,willow`, cycleMs `14000 → 15000` |
| engine minify | same five engines; engines dir restored | `Active/engines` (`npm install` done this turn) | ✔ |
| S4 pins | `EXPECTED_V2_M` re-pinned to the run's own hash (js-confuser is unseedable) | `build-s4-final-package.js` | automated in `tools/cc33-build.sh` ✔ |
| stego builder | **one ordering bug fixed**: HNT-GREP noise re-append must run *before* the G8 pin computation, otherwise the shipped `lexSetPins([...])` stub is neither last nor hashing the shipped bytes | `Active/Stego/build-stego12-r2.mjs` | fixed ✔ (matrix `MINREAL probe pins verify` PASS) |
| stego codec | r3's `r3_*` codec section restored alongside the 8.14 `slackFor`/`dseedFor` base | `Active/Stego/stego3-codec.mjs` | restored ✔ (9 `r3_*` exports; base exports intact) |
| test gate | tests resolved only `stego11-*.min.js`; the builder writes `stego11p-*.min.js` → gate could not run at all | `Active/Stego/test-stego11-{matrix,tiers}.mjs` | fixed ✔ (accepts both names) |
| missing build input | 800×680 `Uploads/stego2-cover.bmp` (`384da102…`, 1,632,054 B) was absent from the 8.14 workspace | `Uploads/stego2-cover.bmp` | restored ✔ (hash matches the builder's expectation) |
| one-shot driver | new: `bash tools/cc33-build.sh [stage…]` runs the whole cascade in order and re-pins v2 | `CC-33/tools/cc33-build.sh` | new ✔ |

---

## §3 — Union matrix

### 3.1 r3 capabilities → present in 8.14?

| r3 capability | In 8.14 after realignment | Where / note |
|---|---|---|
| G7 keyed string layer + trip/deflection | **yes** | `obf-strings-g7.js` (1145 measurable plaintexts, 285 fiction hashes this run) |
| 32-bit G7 key weakness (STRING-LAYER-REVERSAL R2-01) | **open, by design** | widening deferred to FaC (below) — do not silently "fix" |
| Dict split / rotation `getDictForTag(tag%3)` | **yes** | v1 script (`DICT_SPLIT`, `dictFor`, `LANE_ORDER`, `POCKET_BASE`) |
| Mounded pockets (wrappers 8, rc4, CFF 0.40/DCI 0.02) | **yes** | `POCKET_BASE` + pocket lanes |
| CFF/dead-code heterogeneity, no adjacent duplicates | **yes** | per-lane thresholds in `PIECES` |
| 5-engine minify family | **yes** | 85/85 outputs, syntax true |
| u canonicalisation + staff-name markers | **yes** | `[+] marker searchable (佐藤): true (結衣): true`, no conspicuous terms |
| v2 js-confuser lane + hash pin | **yes** | `m` lane; pin re-derived per build |
| S4 stitch + gzip/deflate deliverables + SHA256SUMS | **yes** | `final-package/` |
| R9F/R9R/R9B/R9T anchors, FRAG permutation, 7 reel tables, BOARD8/9/10/11 honey, tube blob | **yes** | matrix 24/24 |
| HNT-GREP anti-grep noise (175 strings) | **yes** | re-appended post-terser, sidecar is CC-33's own (superset of r3's 173) |
| HNT-N cover slack (`slackFor`) | **yes** | 574 B slack, strip @628, real @99028 |
| Line-1 plaque + staff name + `--debug-name` fail-closed | **yes** | tiers PASS; `--debug-name=ripcord` still correctly FAILS T2 |
| Degrade tiers (noreel/nonative/novenue/bits1/2/4/dead/mask) | **yes** | all PASS |
| 1024×768 carrier, salt `3f72a1ec`, seed `0x6d7f0c87` | **yes** | cover `50e0f494…` (rotated build) |
| r3 2-bit real + film grain + variable RS + `0x9A7F` | **code present, not wired** | `stego3-codec.mjs` `r3_*` (recovered); the "R3.1 flip" is an open decision, see §6 |
| r3 `r3_splitR9F` 4-way outer interleave | **helper present, outer single** | same status as r3 — outer template still single `R9F` |
| Kaleidoscope / 32-mirror `tubeLayer` (FaC-43) | **no** | dropped in CC-32; **open item** |
| `_testMod` registry export (r3 bug) | **correctly absent** | FaC-36 seal in `shard-a.js` (do not restore) |
| r3 "Mishap" mix behaviour at 283997716 | **unchanged and correct** | mixing requires re-encode, not a patch |

### 3.2 8.14 capabilities that r3 never had — must not be lost

| 8.14 feature | Why it must survive |
|---|---|
| 17-shard set incl. `c, h, l, e-str, m-str` | r3 had 12; the 8.14 shard set is the source of record |
| FaC-17 containment / `parseBrowser` off-flag path | dormant-by-design module (see FaC-46 for the leakcensus wording) |
| `Q guard` level-2 log cap, `keyword-space` fixups, 600-cap | S4 hardening added after r3 |
| Single-name bundle write (`[Single-name] bundle written once`) | prevents double-obfuscation drift |
| CC-32 dual-bundle experiment files | museum/context only; not on the release path |
| `e-str`/`m-str` "string-only" lanes | new 8.14 heterogeneity axis |
| `_0xapi` + `fromCharCode` honey/seed literals in every pocket | pocket-level honey |

### 3.3 Proof-of-union checks (run this turn, all green)

```
G7        17/17 shards, 1145 measurable plaintexts, 285 fiction hashes
v1        16 outputs (m → v2), largest e 742 KB
minify    85/85 OK, syntax true
u         markers searchable, no conspicuous terms
v2        m re-pinned (per-run)
S4        bundle 2,367,152 B  sha256 e1fe37e5…  (17-row selection, L2 trace lists all 17 lanes)
stego     42 passed / 0 failed (1 skipped: --debug-name)  ·  matrix 24/24
runner    3,372,798 chars  sha256 28c015df…
cover     2,359,350 B        sha256 50e0f494…
```
`--debug-name=ripcord` → 42 passed / 1 failed — **that single failure is the correct fail-closed behaviour.**

---

## §4 — Open r3 carry-overs (union is not "everything done", it is "nothing missing")

These are r3 features/decisions that exist in the r3 line and are **tracked, not silently dropped**:

1. **R9F 4-way outer interleave** — codec helper ready; the outer loader/template (`target.md` regex `R9R|R9B` → `R9R[0-3]`) was never switched because `ctxt.io` delivery expects a single URL. Decision needed.
2. **R3.1 carrier flip** (1024 2-bit + film grain + variable RS + `0x9A7F`, two reels ≈380 KB each) — code is in the codec now; flipping changes every downstream hash.
3. **G7 key widening (R2-01)** — 32-bit skey brute ≈2m40s/blob per the red-team; proposal is xorshift128/SHA-256 counter + procedural templates.
4. **Dict 3400** (1870 none/850 mixed/680 exclusive; JSO 340) — r3 target vs 5288 live pins.
5. **SW trip constants** — IMPLEMENTATION-LOG records `6/14 + SKEY%4` jitter but the script in the tree shows `SW_H=8 / SW_T=12`. Verify before any live rehearsal.
6. **shard-u SHA still static** (r3's S-V half-landed); `60000+FNV(rcdHash)%10000` jitter present in the trip window only.
7. **Pins literal → derived**, **ledger on all shards**, **8 globals → 1 indirect (`_GJ`)**, **engine-`e` honey**, **A/B order-sensitive `SW_VISIT` checksum** — all listed "Half"/"comment-only" in the r3 log.
8. **Kaleidoscope 32-mirror `tubeLayer` + TRIPDIAG×4** — the single biggest r3-only stealth asset (FaC-43), plus the 300-mirror idea (FaC-44).

---

## §5 — What was deliberately NOT done (and why)

- **Source revert to r3 shards** — rejected: it would drop FaC-17 containment and the 17-shard set.
- **Hand-patching the frozen 2 MB CC-32 artifact** — rejected: unverifiable, not reproducible.
- **Overwriting `Archives/packages/O8.13-r3/` or `Working-Stable/O8.13/`** — forbidden (frozen).
- **Touching `Working-Stable/O8.14/` (the pasted pack)** — go-live overwrite only on explicit operator go.
- **Injecting anti-grep noise upstream of minifiers** — forbidden; noise is re-appended post-terser by design.
