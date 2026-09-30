# O8.15 RELEASE RECORD — 2026-09-29 (deployment cut)

Deployment decision: **ship 8.15 with this record**. Everything below was re-verified in this
session against live artifacts; every hash is reproducible from the recipe in §1.

## 1. The candidate (accepted S1-D weave) — REPRODUCED THIS SESSION

| item | value |
|---|---|
| input | `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js` = `bf5f21163727850caa03ead3913f0f5f19da0e99a2797a7bebfb33d7093726d3` (2,535,176 B) |
| tool | `tools/weave-payload.mjs` = `abda3c8f4bf576967874cf5f0f6fc10bb37020ff358ae1e81213f9fcf44e0a77` |
| config | `WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1 WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1 WEAVE_DECL_RELOC_ALL=1 WEAVE_RUN_EXPORT=1` + `--seed=2648369387` |
| output | `0d0874777fe7ff6060e884d34f6179a045be5347033114b9718d3e722cd56aa1` — **byte-identical to `provisional/S1-D-FROZEN-2026-09-29/weave-out-S1-D.js`** (re-derived 2026-09-29, `cmp` equal) |
| map | `49d9a8f39f9d2835a73b99eeaf1c5aa804546b7e766e9457796a666b22afa694` — byte-identical to the frozen map |
| deal report | 313/3784 bodies · 10,463 stmts · 1,472 hoisted · 5,659 split runs / 45 groups · 85% woven mass · 2,219,300 → 2,224,166 B · 157 relocated |
| self-checks | 5/5 PASS incl. content conservation |

Build pipeline that reproduces the input (verified `bf5f2116` byte-identical end-to-end):

```
EXTRACT_ONLY=<14 names of DEEP-WEAVE-REPORT-2026-09-27.md line 173>
DEEPWEAVE=1 SPLIT_EXTRA=1 SPLIT_OBJECTS=1 SPLIT_ARRAYS_I=1
bash Active/O8.15/tools/cc34-build.sh carrier   # env above + weave config of §1
```

The 14 `EXTRACT_ONLY` names are load-bearing (the [EXTRACT] 14-runs/444 K step); `WEAVE_DISSOLVE=1`
(or `WEAVE_SEQ_SPLIT=1`) is what enables the content-conservation inventory.

## 2. Carrier (rebuilt this session, matches the freeze)

| artifact | sha256 |
|---|---|
| `CC-34/stego-build/O8.12-cover.bmp` | `fd2aed67efcaf795…` |
| `CC-34/stego-build/O8.12-runner.js` | `014cbe3ac4a54fad…` |
| embedded/staged payload | `0d087477…` (the §1 candidate; `staged == shipped` gate PASS) |

Cover template source `Uploads/stego2-cover-1024-scaled.bmp` (pre-salt `aa003fcb…`).

## 3. Acceptance battery (this session, on the §2 build — all green)

| gate | result |
|---|---|
| weave self-checks | 5/5 PASS |
| constraint-pass C1–C5 | 5/5 PASS |
| staged == shipped | byte-identical |
| matrix | 26 passed / 0 failed |
| tiers | 42 passed / 0 failed (1 skipped) |
| hold-check | PASS |
| carrier-flip-check (decoder-failure continuity) | 14 passed / 0 failed |
| detector-replay / netwatch | PASS / clean |
| dangling-refs | 64 total / 0 on error paths |
| **decoy-parity** (acceptance oracle) | PASS — fallback garden ≡ decoy output |
| runner fidelity (S3 surface) | 17/17 IDENTICAL (A-shipped ≡ B-raw-stitch ≡ C-debug-runner) |
| debug-runner selftest | PASS (74 GDBG lines, deliverable guard OK) |

## 4. S2 texture — closed to 4 documented exceptions

Comma-reflows landed in `CC-33/shards/` (token-identical, `node --check` clean):
`shard-e-str1.js` avgLine 2,275→155 · `shard-e-str2.js` 1,656→153 · `shard-m-str.js` 1,449→99 ·
`shard-aux1.js` 239→158. texture-audit outliers **7 → 4**; remaining four are all
**functional fingerprints, by design** (fix class = generator-level, next build):

| piece | flag | classification | resolution path (next build) |
|---|---|---|---|
| `u` | uniShare +40.8 · zwPerKB +6.2 | zero-widths inside string literals = decoder keys (functional) | texture-match surrounding pieces |
| `m-str` | meanIdLen −6.2 | ciphertext string tokens (functional data; audit lexes raw text) | noise redistribution in generated strings |
| `a` | uniShare +20.8 | cross-piece registry identifiers (`v814…` family, a→e1) | registry-name length policy + coordinated rebind |
| `h` | meanIdLen +5.4 · uniShare +53.9 | cross-piece registry identifiers (h→c/e, 4/6-slot names) | same — needs registry rebind + runner contract update |

An in-place rename was measured and **rejected**: the names span pieces + the registry keymap + the
debug runner (blinding renaming breaks the runner contract). `aux1`'s cmtShare is its intended
ciphertext cover role (deliberate high-noise lane, per design notes).

## 5. S1 — all closed

1A/1B (Phase 0 repro) · 1C (unreachable certificate v2: 0.25 floor unreachable in S1's bounded set;
remaining excess is the 47 KB statement atoms → belongs to S2 source rebalance) · 1D (frozen
`0d087477…`, battery full green) · deal-soundness 11 fixes (dossier + resolution appended) ·
grid v2 winner g4-declAllExp 54/73 · worst 0.4325 (ledger v2).

## 6. Evidence index (claim → artifact)

| claim | artifact | hash/key |
|---|---|---|
| candidate identity + repro | this §1 + `provisional/S1-D-FROZEN-2026-09-29/` | `0d087477…` / `49d9a8f3…` |
| grid/search | `reports/S1-C-SEARCH-LEDGER-2026-09-28.v2.jsonl` | 12 rows, g4 winner |
| census/certificate | `reports/S1-C-FIXED-CENSUS-g8-2026-09-28.v2.{json,md}` + `reports/S1-C-UNREACHABLE-CERTIFICATE-2026-09-29.v2.md` | 4,145 items |
| deal soundness | `reports/S1-D-DEAL-SOUNDNESS-2026-09-28.md` (resolution appended) | 11 fixes |
| battery runs | `provisional/S1-D-FROZEN-2026-09-29/RECORD.md` + this §3 | all green |
| texture audit | `tools/recon/texture-audit.mjs` + this §4 | 7→4 |
| pipeline mapping | `reports/S2-OPENING-2026-09-29.md` | lane/shard inventory |
| deep-weave contract | `DEEP-WEAVE-REPORT-2026-09-27.md` (§6 reproduce, line 173 names) | EXTRACT_ONLY |
| selftest/fidelity | §3 rows | 17/17 IDENTICAL |

## 7. Unfinished at deployment cut (operator / next-build items)

1. **S3 live venue integration (operator-only — the agent cannot authenticate or perform live pastes)**:
   Venue A chain-output re-claim (`chain=` format, post-8.15.txt) · Venue B manual two-pass paste
   (paste→load→finish→repaste) · live netwatch capture of those runs · no-duplicate-workers proof
   (`active_count=0` wait) · damage-scenario evidence. Protocol: `Runner-Notes/README.md`.
2. **S2 rebuild cascade — EXECUTED + measured** (post-cut track, `provisional/S2-CASCADE-2026-09-29/`):
   full pipeline ran end-to-end; S2-provisional bundle `29b158d0…` + candidate `95996a94…` pass the
   **full battery incl. decoy-parity**. Measured gap: v1-jso dictionary-mode lane outputs are not
   byte-reproducible (10/17 drifted; g7 27/27 and minify 130/130 identical) — root cause is the
   augmented dictionary corpus; fix = lane-output hash pins (extend `EXPECTED_V2_M`) + corpus freeze.
   The shipped 8.15 (`0d087477…`/`820f06c2…`) is unaffected.
3. **S2 texture — closed by two-layer measurement** (`S2-PROVISIONAL-RECORD.md` §3): authoring-layer
   7→4 (reflows landed); deployed-layer outliers are the **designed hex cluster** (m1/m-str/n1/u —
   `identifierNamesGenerator: 'hexadecimal'` by design, MASTER-CHECKLIST 1.22 engine heterogeneity);
   resolution class = cluster-aware banding or generator style convergence (design call), not
   in-place rename. Scorecard seam AUC 0.671 remains a placement-level next-build item.
4. **GitHub publication (operator)**: authenticated push of `Active/O8.15/` (this record, the frozen
   candidate dir, updated checklist) and `Active/O8.14/CC-33/shards/` (the four reflown textures).
5. Cosmetic (non-blocking): `gate --spec` harness surface (14/17, harness-side by note); the
   8.14 pre-split/provenance naming split (`shard-e.js.pre-split` vs e1/lane provenance).

**Functional gate status at cut: PASS (decoy-parity + boot-smoke + full battery green). Nothing in
§7 blocks the deployment acceptance test.**
