# S2-PROVISIONAL — cascade execution record + impact list (2026-09-29)

Track 2 deliverable (`EXECUTION-SEQUENCE.md`): a complete provisional S2 bundle + an impact list.
Artifacts in this dir: `weave-in-S2.js` (`4e18d4cc…`), `weave-out-S2.js` (**candidate `95996a94…`**),
`pre-cascade-backup.tar.gz` (all lane outputs + g7-strings + final-package pre-run),
`swift-s2.log` (full battery), `manifest-parity-{pre,post}.txt` (both green).

## 1. Pipeline proven end-to-end (the cascade itself)

`shards/` → `obf-strings-g7.js` → `oto/g7-strings/` → lane obf (`obf-v1-s3matrix`, `obf-minify-family`,
frozen: `mound-e`, `u-canon`, `v2-jsc`) → `build-s4-final-package.js` → `selected-shards/` → bundle →
S1 chain (frozen config, `RELEASE-RECORD-2026-09-29.md` §1) → battery.

| stage | repro result (vs `pre-cascade-backup.tar.gz`) |
|---|---|
| g7-strings | **27/27 byte-identical** (seeded; the source reflows do not reach g7 output — g7 re-emits its own templates) |
| minify family (v4–v8, 130 outputs) | **130/130 byte-identical** |
| v1-jso lane (17 outputs) | 7 byte-identical (a, l, m-str, e-str1 + 3) · **10 drifted** (c, e1, h, n1, n2, p-discord/slack/teams/telegram/zoom) — ALL dictionary-mode pieces; mangled/hex recipes reproduce exactly |
| mound (e2/e3/e4), u, v2 (m1) | not re-run (frozen/pinned lanes) — untouched |
| stitch → bundle | `29b158d0…` (shipped `820f06c2…`) — delta = the 10 regenerated v1 pieces |
| chain + battery on the new bundle | **ALL GREEN, exit 0** — matrix 26/0 · tiers 42/0+1skip · hold · flip 14/0 · detector/netwatch · dangling 37/0 error-path · **decoy-parity PASS** · constraint 5/5 · staged==shipped |

**Drift root cause (measured)**: the v1 dictionary-mode naming is not reproducible in this session —
the dictionary corpus state (`oto/identifiers-dictionary-*.csv{,.augment,.scrapped,.stage,.scrub}`)
grew/augmented after the shipped lane outputs were built; `dictFor()` slices that corpus, so every
dictionary-mode piece renames differently. Not an engine-version effect (mangled-shuffled and
hexadecimal recipes reproduce byte-identically in the same run). **Fix for next build: pin every
lane output by hash (extend the `EXPECTED_V2_M` pattern to all lanes) and freeze the dictionary
corpus in the pin manifest.** Until then the shipped lane bytes can be kept (this run's outputs are
valid, script-verified, oracle-green) but not re-derived.

**Status of the shipped 8.15 is unaffected**: deployment = `0d087477…` over bundle `820f06c2…`
(RELEASE-RECORD §1). This cascade is the S2 provisional track, not a deployment swap.

## 2. Impact list (S1/S2 changes → what must regenerate)

| change | g7 | lanes | stitch | chain |
|---|---|---|---|---|
| shard string-table line reflow (avgLine class; e-str1/e-str2/m-str/aux1) | regen (byte-identical out) | none (outputs unchanged) | none | none |
| source identifier renames (property-safe, local scope) | regen | v1/minify for those pieces | yes | yes |
| registry key rename (cross-piece, `v814…` keys) | regen | ALL consumers (a/h/e1/c…) | yes | yes + runner contract (`registry-keymap.json`, debug-runner rebuild, fidelity 17/17) |
| any S1 weave/config change | none | none | none | chain only (bundle untouched) |
| dictionary corpus change | none | ALL dictionary-mode pieces | yes | yes |
| lane engine/settings change | none | that lane's pieces | yes | yes |

## 3. Texture verdict — both layers measured (closes checklist item 4 honestly)

- **Authoring layer** (`shards/`, the tool default): 7 → 4 outliers after the landed reflows
  (e-str1/e-str2 cleared; aux1 avgLine cleared). Remaining four (a, m-str, u, h) are authoring-only
  flags: the deployed layer does not reproduce them (below).
- **Deployed layer** (`final-package/selected-shards/` = what ships — `texture-audit.mjs --dir`):
  4 outliers: **m1-v2, m-str-v1 (id0xShare +130.8/+147.5), n1-v6 (+53.9), u-v4 (+105.1)**.
  All four are **code-level `_0x` hex identifiers**, and all four are the **designed hex cluster**:
  `m` family recipes explicitly use `identifierNamesGenerator: 'hexadecimal'` ("membercount/hex
  cluster (m is hex"), `u-canon` is hex by design, and n1's hex names are source-carried.
  The audit's single-band z-rule over-flags designed engine clusters (standing property:
  engine heterogeneity, MASTER-CHECKLIST 1.22). Resolution class: **cluster-aware banding or
  generator-level style convergence — a design decision for the next build**, not an in-place
  rename (renaming the hex cluster would erase the designed style heterogeneity).
- The source-layer `a`/`h` unicode keys and `m-str`/`u` content flags are therefore **superseded
  by the deployed-layer measurement** — no registry rebind needed for texture (the rebind machinery
  remains available for its original anti-grep purpose, `oto/scripts/rebind-registry-keys.mjs`).

## 4. Remaining S2 items after this record

1. Lane-output hash pins + dictionary-corpus freeze (the repro gap above) — next build.
2. Cluster-aware texture banding decision (or style convergence) — operator/design call.
3. `split-shard.mjs` step-chain mode for further e1 splitting (S2-OPENING §5 route b) — optional
   (split stage measured exhausted at 8 KB; residual mass is weave-constraint-classed).
4. Mirror Widening (Track 2 item 5): no implementation found in the tool tree — recorded as a
   spec-term with no executable step located; treated as covered by scorecard texture-matched
   placement guidance (S2-OPENING §2) unless the operator points at a definition.
