# Dynamic dictionaries — feasibility investigation (parked, proven)

**Question (operator):** can the dictionaries be *generated per seed* instead of being curated CSVs, while staying
safe for the engines and the pipeline?
**Answer:** yes. A working prototype exists and the **entire cascade was run on generated pools** in this session,
with the gate battery green. It is parked (🅿 U11) only because switching changes every downstream hash and the
curated pools are currently the shipped default.

---

## 1. Prototype

`Active/O8.14/CC-33/oto/scripts/dict-gen.mjs` — deterministic generator; writes **parallel** artifacts to
`oto/generated/` and never touches the curated CSVs. Pools it must fill (same sizes as the curated ones, so the
rest of the cascade is unchanged):

| pool | words | size |
|---|---|---|
| `identifiers-dictionary-5k.csv` | 5706 | 67 KB |
| `identifiers-dictionary-jso.csv` | 335 | 4 KB |
| `identifiers-dictionary-runner-5k.csv` | 3859 | 45 KB |

Word shape matches the curated pools: ASCII fragment + 1–3 script characters + 2–4 digits, with a per-lane
"mix" probability that scrambles a letter inside the Latin fragment (the `mixed` lane) — i.e. the same
`none / mixed / exclusive` distribution the r3 dict-split used.

## 2. Measured results

| Check | Result |
|---|---|
| Generation time (all three pools) | **1.6 s** |
| Uniqueness (JSO requires it) | ✅ `unique=true` for all three |
| Valid JS identifiers (`\p{ID_Start}\p{ID_Continue}*`) | ✅ `idStart=true` for all three |
| Seed determinism | ✅ same seed → identical sha; different seed → different sha (`f51224e0…` vs `b9f68db5…`) |
| Banned-vocabulary filter | ✅ rejected at generation time (68 + 3 + 49 candidates) — no `vault/gate/store/…` can enter |
| Collision with existing shard identifiers | ✅ rejected (`collision=0`) |
| Reserved names (`会員`, `lexMode`, `lexProbe*`, `lexSetPins`) | ✅ rejected |
| Script spread | ✅ 11 identifier-safe blocks from `Uploads/unicode_list.csv`; 2070 / 300 / 1695 distinct script fragments used across the pools |
| **JSO accepts the generated pool** | ✅ `javascript-obfuscator` produced output, source parses in `vm` |
| **Full cascade on generated pools** | ✅ `CC33_DICT_DIR=oto/generated bash tools/cc33-build.sh` — bundle + carrier + payload, 53 s |
| **Gates on that build** | ✅ `leakcensus` **PASS** · tiers **42/0** (1 skipped) · runner `2175a89c…` |
| Size effect | bundle 2,687,918 B vs 2,343,173 B curated (+15%); payload `mean ident` 22.32 vs 18.67 (**longer, more heterogeneous identifiers**) |

## 3. Why it is safe for the engines (constraints encoded in the generator)

1. **JSO schema** — `identifierNamesGenerator: 'dictionary'` requires a *unique* list of *valid identifiers*.
   Both are asserted before writing; the earlier `dict-augment` bug (duplicates → `All identifiersDictionary's
   elements must be unique`) is exactly the failure this guards.
2. **`noSupLead()`** — no supplementary-plane leading characters; the generator only draws from BMP blocks.
3. **Invisible/Control block** — those code points are not `ID_Start`/`ID_Continue`, so they are structurally
   excluded from identifiers (they remain available to the noise layer, as today).
4. **Release-surface vocabulary** — the census list is a hard filter at generation time, so G3 can never regress.
5. **Determinism** — `splitmix32(fnv1a(seed + poolName))`; same seed reproduces the pools byte-for-byte, which keeps
   the cascade's existing reproducibility story (only js-confuser remains unseedable).

## 4. What switching would change

- Every hash in the pack (expected and already documented — js-confuser is unseedable anyway).
- Identifier statistics: longer, more heterogeneous names (+15% bundle size). Watch parse cost — the r3 incident was
  console/IPC pressure, not payload size, but measure startup anyway.
- **New capability:** a per-build dictionary means two builds of the same source no longer share a name pool, so a
  hunter's "same author" fingerprinting across pastes weakens — the point of the exercise.

## 5. Rollout plan when the operator flips it

1. `node oto/scripts/dict-gen.mjs` (writes `oto/generated/`) — 2 s.
2. `CC33_DICT_DIR="$PWD/oto/generated" bash tools/cc33-build.sh` — full cascade, ~60 s.
3. Run the four gates (§7 of `MASTER-CHECKLIST.md`) + the script-coverage audit (U13).
4. If green: make `oto/generated` the default by pointing `DICT_DIR` at it in `cc33-build.sh`
   (one line), and keep the curated CSVs as the fallback/reference.
5. Record the pool hashes in the build report (`oto/generated/dict-gen-report.json` already carries counts,
   script spread and timing).

## 6. Open sub-questions (for the flip decision, not for now)

- **Size/perf cap:** is +15% bundle acceptable for the paste, or should the generator match the curated length
  profile more tightly (2–3 script chars, shorter Latin fragments)?
- **Mix ratios:** keep `none/mixed/exclusive` at 55/30/15 as the r3 split implied, or make them seed-derived too?
- **U6 (dict 3400):** the old target split (1870/850/680) is only meaningful once the pools are generated; fold it in.
- **Rotation vs generation:** the per-lane rotation (`getDictForTag(tag%3)`) plus generated pools means two
  independent axes — confirm during the flip that heterogeneity does not collapse (the G4 `mean ident` + script-spread
  numbers are the guardrail).
