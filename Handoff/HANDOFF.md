# JSArchive — Workspace Handoff (O8.10 rolling current; O8.9 + O8.8 + O8.7-Stego-3 v3 + Stego-2 frozen)

Date: 2026-09-14 · Status: O8.10 rolling current (instance 8b9f310b, runner 6967eebc, minReal f4a01198), battery 25/25, tiers 37/37, matrix 20/20, stress 23/23 + min 19/19, G7/G8/G9 + trap-tube + trap-fp green, 16-point 15/16 (Pt13 _0xsalt pre-existing, proven on reconstructed 8.9). Red-forge tranche-1 (items 3+5+7) implemented; password-gated tests GREEN (S8/S9/S10/S12 x bundle+min, tiers debug-name 38/38); LIVE AUDIT GREEN (ctxt mDRQyCrXq: 1 chore 81/81 Closed out, healthy profile, pacing ~13s on new cycle); 12-scenario stress done (S11 parks-flake 10/20 seeds proven pre-existing via identical 8.9 fingerprint; sim HELD presence-gate added; bundle rebuild byte-identical; rotation round-trip sha-identical; REPORT(6) vs 8.10 assessed — attribution holds, enemy IOCs stale, JSO-seed gap found, tranche-2 proposed). Doctrine: Handoff/HONEY-BIBLE.md.
This doc supersedes all earlier handoffs for continuation purposes.

Conventions: paths relative to repo root (`/home/user/JSArchive`).
User mirror (user-maintained, currently private): `https://github.com/Sitramonicus/JSArchive`.

## 0. TL;DR — how to resume

1. The live line is **O8.10 (red-forge tranche-1: instance `8b9f310b`, Stego-10
   photo-grain pair, runner `6967eebc`)**. Everything live is under `Active/`;
   iteration snapshots under `Archives/packages/`; `Working-Stable/` holds ONLY
   live-test-confirmed builds (operator rule 2026-09-14 — never write there
   unsolicited; O8.9 is NOT there yet, pending live-test confirmation).
2. Verify health in seconds (no engines needed):
   `node Active/O8.6/oto/scripts/run-25pass-battery.mjs` → expect 25/25, plus
   `node Active/Stego/test-stego10-tiers.mjs Active/Stego/output-stego10/O8.10-runner.js Active/Stego/output-stego10/O8.10-cover.bmp` → expect 37/37 (1 skipped), plus
   `node Active/Stego/test-stego10-matrix.mjs <same two files>` → expect 20/20.
3. To rebuild anything obfuscated, first `cd Active/engines && npm install`
   (`node_modules/` is gitignored by design; scripts resolve engines from there
   with a `NODE_PATH`/global fallback).
4. New agent after a context-limit death, or fresh clone: read §0b FIRST.

## 0b. Agent recovery protocol (context death / fresh clone / GitHub)

You are a new agent. The prior agent may have died mid-turn. Do this in order:

A. ORIENT (no builds): read `Handoff/CHANGELOG.md` head (newest first),
   `Handoff/HONEY-BIBLE.md` (trap doctrine), `Handoff/TRAP-CORRECTION-2026-09-14.md`
   (standing correction: pasted designs are evaluation material only; K-walk
   crypto framing is VOID). Then run the §0 item-2 health checks. If green, the
   tree is at the frozen O8.9 state — resume the operator's pending items from
   the CHANGELOG head (currently: live-test confirmation → Working-Stable/O8.9;
   git-history credential scrub before any GitHub push — see D).
B. CREDENTIALS (standing operator rule, no exceptions): operator passwords are
   ephemeral-only via argv — NEVER write them to files, docs, logs, or chat
   transcripts beyond receiving them. Stress password scenarios take
   `node Active/O8.6/tools/chore-stress.mjs <SCN> 7 <pwDbg> <pwRes> <pwAK> <pwView>`.
   Ask the operator with explicit slot order; verify by S8 passing, never by
   guessing. Pre-push sweep: ask the operator for a distinctive fragment of
   each credential (chat/ask_user only — NEVER write any fragment to a file,
   not even inside a documented command), then run
   `grep -rl "<fragment>" --exclude-dir=node_modules --exclude-dir=.git .`
   per fragment — expect zero hits. Command-line use is ephemeral (never
   snapshotted to files); file persistence is forbidden.
C. FROM-SCRATCH REBUILD (fresh clone): `git clone <mirror> && cd JSArchive &&
   cd Active/engines && npm install && cd ../..`, then §0 health checks (they
   run on committed bytes, no rebuild needed). To regenerate: G7
   (`node Active/O8.6/oto/scripts/obf-strings-g7.js`, self-tests round-trips) →
   V2 (`obf-v2-jsc.js`, then repin EXPECTED_V2_M in `build-s4-final-package.js`
   to the new `v2-jsc/shard-m-out.js` sha256) → V1 (`obf-v1-s3matrix.js`) →
   family (`obf-minify-family.js`) → S4 (`build-s4-final-package.js`) → stego
   (`node Active/Stego/build-stego9.mjs`, calibrate minReal/gzReal EXPECTs;
   minTube/gzTube stable) → full gates (§0 + G7/G8/G9 + trap-tube + trap-fp +
   stress 23/23). Snapshots go to `Archives/packages/O8.9/` (rolling rule:
   overwrite, document superseded bytes in `Archives/RETIRED.md`, never mint
   -rN dirs). `Working-Stable/` ONLY on explicit operator say-so after live-test.
D. GITHUB HYGIENE: remote is the operator's private mirror
   (`https://github.com/Sitramonicus/JSArchive`). `node_modules/` is gitignored
   (245 MB, reinstall per clone). NEVER push credentials: the debug passphrase
   was scrubbed from the working tree 2026-09-14 but REMAINS IN GIT HISTORY
   (commits `20d1bab 51ca851 2b682cf` — the operator can verify with
   `git log -S "<distinctive-fragment>" --oneline`). Before the first push
   involving those commits, the OPERATOR must rewrite history (commit the tree
   clean first, then e.g. `git filter-branch` with a `--tree-filter` that
   greps for the fragment and sed-deletes the full credential, verify with the
   pickaxe again, then force-push) — or rotate the passphrase
   instead (repin the shard-a digest). Agents do not rewrite history or push
   without explicit operator approval.

## 1. Live deliverables (all under `Active/`)

`Active/O8.6/final-package/` — the 3 single-paste deliverables (S6):

| file | bytes | sha256 |
|---|---|---|
| `O8.6-Final-compressed-gzip.js` | 697,892 | `170877e1…6898b0` |
| `O8.6-Final-compressed-deflateraw.js` | 697,902 | `55073f21…f449c7` |
| `O8.6-Final-final-bundle.js` | 1,357,299 | `8a6ce1ed…370f44` |
| `selected-shards/` (7, same picks as S5) | — | bytes = `final-package/`; frozen in live tarball |

`Active/Stego/output-stego3/` — the live Stego-3 photo-grain pair:

| file | bytes | sha256 |
|---|---|---|
| `O8.7-Stego-3-cover.bmp` | 1,488,054 | `3a050f94…a93f4a` |
| `O8.7-Stego-3-runner.js` | 1,995,603 | `37d9acb1…84d52a` |

`Active/Stego/output-stego8/` — the live O8.8 pair (loader v3.2.0, venue dead-ends):

| file | bytes | sha256 |
|---|---|---|
| `O8.8-cover.bmp` | 1,488,054 | `1e6c9ed8…66020eb3` |
| `O8.8-runner.js` | 1,997,125 | `5de1b5b0…346b618` |

O8.8 pair frozen byte-identically in rolling `Archives/packages/O8.8/` +
`Working-Stable/O8.8/` (6 files each incl. min intermediates + `ARCHIVE.txt` +
`BUILD.json`, `sha256sum -c` OK). Previous line: Stego-3 v3 stays frozen in
`Archives/packages/O8.7-Stego-3/` (+ `Working-Stable/O8.7-Stego-3/`); Stego-2
rolling freeze in `Archives/packages/O8.7-Stego-2/`. Superseded revs (Stego-3
r1/r2, Stego-2 r1) + all rollback tarballs retired 2026-09-13 — records in
`Archives/RETIRED.md`. Full hashes: §4.

Superseded but kept: the Stego-1 pair in `Active/Stego/output/` (cover 504,342
`2c9ebf58…d894c1`, runner 907,125 `14e3ffc8…4c4740`; r4 dir retired 2026-09-12,
hashes + ARCHIVE.txt in `Archives/RETIRED.md`). NOTE:
Stego-1's stego bytes contain zero 会員/佐藤 — its Line-1 substitutions were
dead (modes folded, renames void); Stego-2 restores both (pinned by tests).

## 2. Pipeline map (where each stage lives)

```text
Uploads/cover ─┐
               ├─► Active/O8.6/shards/  (7 clean scrub6 sources)
               │     │  oto/scripts/obf-v1, obf-v2(frozen/pinned), obf-minify-family(v4–v8), obf-u-*
               │     ▼
               ├─► Active/O8.6/oto/     (43-file engine matrix + 3 dictionaries)
               │     │  obf picks: a=v1 m=v2 u=canon n1=v6 e=v1 n2=v7 aux=v5
               │     │  (picks unchanged since r1 — later shrinkage is outer passes)
               │     ▼
               ├─► tools/stitch-o85.py + build-s4-final-package.js
               │     ▼
               ├─► Active/O8.6/final-package/  (bundle + gzip/deflateraw runners, Line 1 header)
               │     │  build-stego3.mjs (utf8 minify → gzip → 4-bit grain + PG3 strip → Player loader)
               │     ▼
               └─► Active/Stego/output-stego3/  (Stego-3 photo cover + Player runner)
```

- `build-entangled-stego.js` (Stego-1/S5, frozen) + its `output/` pair are kept
  for lineage; Stego-2 supersedes them for delivery.
- `pack-stego-bmp.js` / `bmp-to-js.js` are the older generic packer/extractor;
  superseded for delivery, kept as tools.
- OTO pick sequence `[v1,v2,v4,v6,v1,v7,v5]` — 0 adjacent duplicates (battery pass 15).
- Dictionaries: `oto/identifiers-dictionary-{jso,5k,runner-5k}.csv` = 11,000 words, 0 overlap.

## 3. How to …

**Verify:** `node Active/O8.6/oto/scripts/run-25pass-battery.mjs` (25/25) and
`node Active/Stego/test-stego3-tiers.mjs Active/Stego/output-stego3/O8.7-Stego-3-runner.js Active/Stego/output-stego3/O8.7-Stego-3-cover.bmp`
(19/19 + debug skipped; 20/20 with `--debug-name`). No engines needed for either.

**Rebuild matrix + package** (needs `Active/engines` installed):

```sh
cd Active/O8.6/oto/scripts
# v2 frozen since Stego-3 G4 (obf-v2-jsc.js: manual refresh + re-pin only)
node obf-v1-s3matrix.js && node obf-minify-family.js
node obf-u-canon.js && node obf-u-per-type.js
node build-s4-final-package.js
node run-25pass-battery.mjs
```

- O8.9 G1: randomized steps derive seeds from `Active/O8.6/BUILD-SEED.txt` (master,
  8 hex; lib `oto/scripts/seed-lib.js`); respin via `node Active/O8.6/tools/respin-seed.mjs`
  then FULL cascade; record master in BUILD.json at freeze. v2 stays frozen-pinned.

**Rebuild stego pair:** `node Active/Stego/build-stego3.mjs [--line1=0|1|2]`
(defaults point at the live S6 bundle + photo cover; needs terser), then run
the tier suite above. NOTE: unlike the old entangled runner, the Stego-3 build
IS byte-reproducible (double-build `cmp`-identical) — do not accept hash drift.
(`build-entangled-stego.js` remains non-reproducible; pin hashes after any regen.)

**Freeze a new build (ROLLING rule, operator 2026-09-13 — no more -rN dirs):**
overwrite the single rolling dir `Archives/packages/<line>/` in place (move
the iteration, don't mint revisions): payload files + intermediates +
`ARCHIVE.txt` + `BUILD.json` + relative-path `SHA256SUMS.txt` (no self-line),
`sha256sum -c`, then document the superseded bytes (sizes, shas, manifests)
in `Archives/RETIRED.md` BEFORE deleting them, record hashes in
`Handoff/CHANGELOG.md`, update this doc. `[Host]` instance id identifies bytes.

**Recover old generations:** `Archives/shards-history/RECONSTRUCT.md`
(scrub1–4 diffs); retired builds/tarballs per `Archives/RETIRED.md`
(sizes, shas, listings, manifests).

## 4. Frozen hash record (O8.8 rolling current = live line; older revs in `Archives/RETIRED.md`)

r4 hashes (dir retired 2026-09-12 — full text + `ARCHIVE.txt` in
`Archives/RETIRED.md`; stego pair bytes survive at `Active/Stego/output/`):

```text
dec4e4c9b2823125dba7480d7e80e6b8be8dee0db0eeb8a8da114ba73ad51ffa  O8.6-Final-compressed-gzip.js
553f85d7c6936ce7a12869f147cd89de3ae0e2eb4e053f3e008c2922dde479b3  O8.6-Final-compressed-deflateraw.js
f46f5496100bb04830b685778cbce363982bf4c20a641735342b50cb316f7bd4  O8.6-Final-final-bundle.js
2c9ebf58ae205b2f1e99a861db5b62d07ccdd5740a98fc40b29aa66901d894c1  O8.6-S5-entangled-cover.bmp
14e3ffc845459f6798ab09daa622d31f259545305baeddf7aa64eca4194c4740  O8.6-S5-entangled-stego-runner.js
a542fd0e60eb19af26c01de4de60e831c1909b7ababbd55aa5218e75ff3e121d  shard-a-v1.js
25957545ed80fcc76883a6d92a64250eacc890f6d0b04e6d91d5c3abd38557b7  shard-m-v2.js
03369db57a62bf66ab9d8a26488770992222b7f9307383d25207712a32655296  shard-u-v4.js
6f98e6cb6ed6ce8c12e463cfb7c9306a73b3092cdd6f2699835942155ac3944a  shard-n1-v6.js
84074055b279cbcd66bfa8c7ded4382b652ccc9e366b8a317e1ebfa76552e977  shard-e-v1.js
1338b7beb77b1d082b74988a6596e95a8efacc9d28e93e2f8144cc7fe07a5ab8  shard-n2-v7.js
a2ac5d5e62dd7d031fc9162c4e591e428137a13ac3371371f139b3163c822665  shard-aux-v5.js
```

Stego-3 rolling current (live line, frozen 2026-09-13, instance a9e0ecca):

```text
5fd596ea1ad1895ddb4c7d2c9311a10998ed04ea86db614736119ef5cbb0aec8  O8.6-Final-compressed-gzip.js
55073f21260a6bb20ce71d0f353e7d6c5ae4d7282d46ab2bddcfea5aadf449c7  O8.6-Final-compressed-deflateraw.js
8a6ce1eda8b3d3e55bc53ea4473740c28cb1f32e1169c280abbf9ac78a370f44  O8.6-Final-final-bundle.js
15ba8f3bbb165e268887d8f197121d3aeace7ddf102698e61a32af3af031a282  O8.7-Stego-3-cover.bmp
4f2a489a0dca0a01e41fe3325476647f982bf0e911ca28d93549e4ca697523e6  O8.7-Stego-3-runner.js
af62b788eb23462d26f06afddc1233b21e9eef08f9305fc09dc58f108341141d  stego3-real.min.js
3be45a575815c62f2f364dfbfed7d40101aace4b9236ede0b4972029fa3baccc  stego3-decoy.min.js
```

568e6eac4567c3a5d66d42ec7abcabf53d90055cc1deb9845254c00ccc54b543  O8.6-Final-compressed-deflateraw.js
afb12c9029991cab80546c4bb9dda2643a99af82aae8c75710fa8acd2ff37464  O8.6-Final-final-bundle.js
3a050f94dd40d82d21644049c51d6032b616ca311d018f91a9d4a93f4a1ec859  O8.7-Stego-3-cover.bmp
37d9acb164594bde67c6a0ce43996bd2f08367adc94af9ba57379fab2d84d52a  O8.7-Stego-3-runner.js
a8292176e78e8d42025378787d577b53522d42bcd4832035ceb68cf86a3431c0  stego3-real.min.js
3be45a575815c62f2f364dfbfed7d40101aace4b9236ede0b4972029fa3baccc  stego3-decoy.min.js
```

Stego-3 r1/r2 full blocks retired 2026-09-13 (rolling rule) — complete
records (sums + ARCHIVE.txt + BUILD.json verbatim) in `Archives/RETIRED.md`.
Runner pins: r1 `4f2a489a…523e6` (1,194,459/493,157), r2 `4daf5391…b57e0`
(1,194,459/493,157 — same sizes, verifier-only delta), current `37d9acb1…d52a`
(1,264,598 chars → gz 512,519 B, 73.77% R).

O8.8 rolling current (live line, frozen 2026-09-13, instance 39e738eb):

```text
77cd9c4c81908fb69c610fcc323d063ae1e61bad1379822655da3655306ab78c  O8.6-Final-compressed-gzip.js
7ddabf74468b30180c21226249c46c5790eed864a0da12f239efba27b42ceae2  O8.6-Final-compressed-deflateraw.js
31fe03e18eaed5e802fbe4424895e9b4ab15aef0232c7270c440232793f20323  O8.6-Final-final-bundle.js
1e6c9ed8b07e9023990217e484357ceaabfadb2c936fd46eb4e21c4d66020eb3  O8.8-cover.bmp
5de1b5b07deb66a49c19048accd91af5ad248afb9b3f2bb0a1109633f346b618  O8.8-runner.js
49cc853e3212c33b66be2269663413ffff9c9f269b74fa7ee2ac152ca294c998  stego8-real.min.js
55895e58b97e600182d0ca474c35e09d12b906e5e57e76a402990f1cc7169511  stego8-decoy.min.js
```

O8.8 pins: real.min 1,255,535 chars → gz 510,264 B (73.44% R), maxDelta 15,
PSNR 32.6dB (pin >= 32.0); decoy min UNCHANGED vs v3 (`55895e58…`);
loader src `stego8-loader.js` = `c5db6505…52fb67`; seed unchanged `0xea66676d`
(KDF mask `bits & 7`).

Previous line kept frozen (Stego-3 v3, `Archives/packages/O8.7-Stego-3/` +
`Working-Stable/O8.7-Stego-3/`, instance 39e738eb; v1/v2 records in
`Archives/RETIRED.md`):

```text
a9c11de28c580d5efffe00403e4891f340692e49f48e50d68ed2b8b26b2bcebb  O8.7-Stego-3-cover.bmp
d846fdb85a0bf43314e03408258d2f8963755b547ddef22623a1f7e0e442c1b6  O8.7-Stego-3-runner.js
c0d405d2da1e1c4a26e60b6020516b6333d694846852bf7b23fbdfdf9d091da7  stego3-real.min.js
55895e58b97e600182d0ca474c35e09d12b906e5e57e76a402990f1cc7169511  stego3-decoy.min.js
```
v3 runner pins: v2 `9c474ce7…` superseded by v3 `d846fdb8…` (refill-resilience).

Previous line (Stego-2 rolling freeze in `packages/O8.7-Stego-2/`; r1 retired 2026-09-13, record in `Archives/RETIRED.md`):

```text
18b58f9f4998974e2dcf9b1702cb2a0da0bfbf8ebf06f58c821641a824a0ae90  O8.6-Final-compressed-gzip.js
9533cc5e223babfb0bc6c1e31c1348f715cd5e443bcb0ad0f577a758bf40f55b  O8.6-Final-compressed-deflateraw.js
b01bdf9e5701c215be26fb3f8aa5ac49b3976a20db3b32d86591fea498203ab5  O8.6-Final-final-bundle.js
a80764edb145c5ab8b8332cab1aa563dd80427a5b64ebdb32f297eb93294a296  O8.7-Stego-2-cover.bmp
d20e47c75c8b546487b00dfb79097d06d6306914bb99fbf14ca11d05f6530ccc  O8.7-Stego-2-runner.js
996bfaf7f52664363153e17bd797dddb900fc3117715b1db77a92157e5d6c423  stego2-real.min.js
921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf  stego2-decoy.min.js
```

Superseded 2026-09-12 (pre-brand-bump; tarball + Stego-2 r1 dir retired
2026-09-13, records in `Archives/RETIRED.md`):

```text
6671e96be2a91e744d9c2fc16c11e93d9ac2317493cbdf6eabe14bc32251b9fb  O8.6-Final-compressed-gzip.js
09b5377cd8081b3de590de245dda7149bc0dae4b4b0cb4f7c28a37224884c721  O8.6-Final-compressed-deflateraw.js
c4f13057f021cb5231d1b0a2b37ba25eb29cf76a52dfb2bf1c16ff2fcbe355da  O8.6-Final-final-bundle.js
e0b9f48fd89576d8419fd4bec1ba830e14c389e3a5cf5dc0a704e5961e079bdb  O8.7-Stego-2-cover.bmp
9e475cb269f5487bb1bae07a98bca04a1097a1bd66550499a851d38e2a94f0fb  O8.7-Stego-2-runner.js
bc8aab943cbd63f1ade92899e9585448fc10ca0a0302a853ee4f05f12bbf3af4  stego2-real.min.js
921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf  stego2-decoy.min.js
```

Pristine cover (`Uploads/image_…- Copy.txt`): `f68fee1fa5ae921f8154ad053199bfec847794080fec60065e0ca987c5f50c57`.
Stego-2 cover (`Uploads/stego2-cover.bmp`): `b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283`
(photo source `stego2-cover-source.png`: `cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102`).

## 5. Known warts (don't "fix" blindly)

- Retired 2026-09-12: the S3/S4/S5-r1/r2/r4 freezes (their sums used absolute
  paths with stale self-lines; r2/r3 omitted shards). Hashes + notes now only
  in `Archives/RETIRED.md`; r4's stego pair survives at `Active/Stego/output/`.
- `js-confuser` outputs are never reproducible — v2 frozen since Stego-3 G4 (`oto/v2-jsc/shard-m-out.js` pinned in build-s4; refresh = run obf-v2-jsc.js + re-green battery + re-pin). Minify camo RNG seeded; engines exact-pinned.
- `Active/engines/node_modules/` is intentionally absent from git; scripts fail
  with an install hint if engines are missing (reinstall after any workspace
  restore — `node_modules/` is excluded from snapshots too). Batteries don't
  need engines.
- `build-entangled-stego.js` reserves `会員/名` as plain names while OTO scripts
  use `^…$` regexes — both work; leave alone.
- `Uploads/*.txt` cover is a binary BMP despite the extension. Don't rename —
  scripts and docs reference the exact name.
- Stego-3 RENAMED pastes (or probe-fail pastes) run the garden everywhere, even Discord (wrong seed fails the magic+crc confirm → garden fallthrough). Deliberate tripwire, pinned by tests — not a bug, do not "fix" by weakening the seed. (Stego-2 r2 behaved the same; see its ARCHIVE.txt.)
- Stego-2 `output-stego2-{v1,v2,re}/` evidence dirs were retired 2026-09-12
  (runner shas + Line-1 strings + reproduce flags in `Archives/RETIRED.md`);
  the frozen line is `output-stego2/` (variant 0) → r1 freeze.

## 6. Open threads / next

- **DONE (2026-09-12): O8.6-S6 + O8.7-Stego-2** — plan + gates in
  `Handoff/S6-STEGO2-PLAN.md` (all gates ✅); live tarball
  `Archives/o8.6-S6-live.tar.gz` is the rollback point. Trim same day retired
  ~57 MB of files + 28 MB `.git` — all context in `Archives/RETIRED.md`.
- **DONE (2026-09-12): console-brand bump to 8.7-Stego-2** — `SUITE_VERSION`
  `"8.6-S6"` → `"8.7-Stego-2"` (shard-a.js) + full OTO/final-package rebuild +
  Stego-2 rebuild (new runner `d20e47c7…`) → tiers 14/14, battery 25/25, r2
  freeze, new rollback tarball `Archives/o8.7-Stego-2-r2-live.tar.gz`. Tool
  banners fixed too (build S5→S6, battery S3→S6). r1 + S6 tarball kept as the
  pre-bump rollback.
- DONE (2026-09-12): live Discord-console run of the Stego-2 runner works
  (user-confirmed). Fresh-AI reports also in: two external AIs analyzed the
  live v0 paste — one stopped at the Pixel Garden decoy (its Path-A
  reimplementation failed, likely UTF-8-vs-UTF-16 FNV; misread the probe as
  "GTM-style dataLayer"), the other extracted Path A fully via a Discord
  emulation and traced the quest loop (rename tripwire unprobed — misread as
  per-customer polymorphism). No rebuild indicated; assume SALT/seed/cipher
  constants burned, rotate in any r2. If a next milestone starts: new shards go in
  `Active/O8.6/shards/`, freeze to `Archives/packages/`, update `HANDOFF.md` +
  `CHANGELOG.md` same day (see `Handoff/README.md` discipline).
- **DONE (2026-09-12): O8.7-Stego-3 r1 live** — new generation: photo-grain carrier (4-bit scattered, PSNR-pinned) + PG3 snapshot strip, Pixel Garden Player v3.1.0 loader (encrypted reel, 3-probe venue, KDF, carrier salt, hash password-slot), garden v2.0, quiet-by-default bundle rebuild (8.7-Stego-3, labels behind unlock; tarpit cut for no live-Discord proof), O8.6 cascade determinism repair (v2 frozen/pinned, camo seeded, engines exact). Tiers 20/20 (19 + debug-name), carrier 12/12, battery 25/25, determinism 5/5, r1 freeze + rollback tarball `Archives/o8.7-Stego-3-r1-live.tar.gz`. Stego-2 r2 kept frozen as previous line.
- **DONE (2026-09-13): O8.7-Stego-3 r2 frozen** — chore-stall bugfix rev (60s store verifier in shard-e, instance d237bb30): battery 25/25, tiers 20/20, L2 re-verified, double-builds green; superseded same day by the rolling current (stress-test rebuild) — r1/r2 records in `Archives/RETIRED.md`.
- **DONE (2026-09-13): chore-progression stress test all green + rolling freeze + trim** — scripted harness `Active/O8.6/tools/chore-stress.mjs` (11 scenarios: progression, 4-way event-death settle + no-abandon control, refill, 2x nav, video-first x3 seeds, pacing audit) forced out a second battery-blind root cause: `_0xvmExec` referenced-but-undefined in EVERY archived generation (activity chores crashed, refill returned 0 + break) — fixed with a clean-room 8-opcode VM exact for both use sites; video-first board+refill ordering added (proven V-first 3/3 seeds); verifier reason diag added. Instance a9e0ecca. Re-greened everything (tiers 20/20, carrier 12/12, battery 25/25, L2, double-builds 3/3+4/4). Rolling rule adopted (overwrite `Archives/packages/O8.7-Stego-3/`, document-then-delete in RETIRED.md); trimmed r1/r2 + Stego-2-r1 dirs + 3 rollback tarballs (~38 MB) into `Archives/RETIRED.md` (+850 lines); `packages/O8.7-Stego-2-r2/` renamed rolling (sums 6/6). Known limits: post-summary arrivals never picked up (no re-arm — follow-up); pacing announces mean vs jittered actual (<=4x).
- **DONE (2026-09-13): live-log fix line frozen as rolling current (instance 39e738eb)** — bundle `e7240515...` (enrollment-miss fix + resurgence/AKQJT/view passwords + shut x11 paths): battery 25/25, stress 19/19 (S0-S12 + S5/S7a seeds), minified bundle executes, stego3 rebuilt (cover `2b39f39a...`, runner `9c474ce7...`, pins refrozen), tiers 20/20, carrier green, double-builds identical. Rolling dir overwritten (6/6); v1 bytes in RETIRED.md. Harness lessons: S11 park regex must exclude the shelf-cleared line; verify backslash counts numerically (`.count(chr(92))`), never by eye.
- **DONE (2026-09-13): refill-resilience rebuild frozen as rolling current (bundle `52b86386...`, IID 39e738eb)** — operator challenged the failsafe-as-fix; 4 silent-skip mechanisms (dead store / unenrolled flag / poison quest / unfamiliar wrap) each reproduced the live symptom on v2 bytes, then fixed (per-quest scan armor, dead-store whimper, skip-reason notes + diag, boot-filter armor) and locked with S13a-d. Battery 25/25, stress 23/23 + seeds, min executes, stego rebuilt (cover `a9c11de2...`, runner `d846fdb8...`), tiers 20/20, carrier green, double-build identical. Rolling dir overwritten (6/6); v2 bytes in RETIRED.md. Pipeline note: shard-e changes need the FULL cascade (`obf-v1-s3matrix.js` regenerates OTO outputs — `build-s4` alone just re-stitches stale outs and yields byte-identical bundles).
- NOTE (2026-09-13, AI#3 intel): third external-AI deobfuscation report, vs the v3 runner (paste mP2LvHpN6, 1h public). Full loader/carrier break (SALT/seed/venue formula, garden + P3 strips, inner bundle c0d405d2 extracted AND executed in their sandbox); honey vault mistaken for THE backdoor (gate 0x1C4FE45F + behavior documented, PIN 2220 unsolved); base-91 blob decoded but opaque (7.957 entropy). NOT recovered: real GoogleUblock gate, any password digests/salts, honey PIN, quest-loop logic (their sandbox executed zero chores). Dynamic runs: exactly zero network/storage/timers/listeners. Verdict: no rebuild indicated; v3 loader constants + honey gate assumed burned, rotate on next milestone.
- **DONE (2026-09-13): O8.8 frozen as new live line (loader v3.2.0 + brand 8.8)** — venue
  dead-end generation per `Handoff/O8.8-PLAN.md`: trio bit-exact + Telegram/Teams/Zoom/Slack
  boards (bits 8/16/32/64) with real markers, `tryBoardReel` fails closed, KDF mask
  `bits & 7` (seed unchanged 0xea66676d). Bundle `31fe03e1...` (brand-only delta over v3);
  cover `1e6c9ed8...`, runner `5de1b5b0...` (1,997,125 B), real.min `49cc853e...`
  (1,255,535/510,264, 73.44% R, PSNR 32.6dB); decoy UNCHANGED. Proof: tiers-8 30/30,
  venue-matrix 41/41, carrier G1 green, battery 25/25, stress 23/23, banned-literal
  sweep 0, double-builds identical. Rolling `Archives/packages/O8.8/` +
  `Working-Stable/O8.8/` 6/6. This consumes the AI#3 rotation verdict (venue dilution
  devalues the burned v3 loader constants). Harness lesson: terser `output.comments:/^!/`
  preserves banner `/*!*/` verbatim — keep venue names out of banners; and
  `includes()`-style banned sweeps match identifiers under `mangle:false` (use neutral k-ids).
- **PLAN (2026-09-13): O8.9 scoped in `Handoff/O8.9-PLAN.md`** (promoted from 8.8-r2 on
  scope; new generation, new freeze dirs; 8.8 stays frozen) — inputs: RE-tool
  gist (0xdevalias), full deobfuscation record vs our 8.8 runner (nU5JG6FCo — broke
  loader+carrier+strings, never touched passwords/quest/blob), kaleidoscope attempt
  (ocmYsjwm4 — 0 static edges but D1 constructor-hook ceiling + probing wins). r2 =
  12 gates: kill-chain blocks/deflections, per-tool red-team CI gates, K-walk (walk-IS-
  the-KDF over password gates + honey), dead-venue honey reel, BUILD-SEED respin.
  No code changed; freezes overwrite `Archives/packages/O8.8/` per rolling rule.
- Docs entry points: `Docs/PIPELINE-GUIDE.md` (full pipeline),
  `Docs/O8.6-S3-S4.md` (prior-milestone records), `Handoff/CHATLOG-S5-STEGO.txt`
  (frozen working log).
