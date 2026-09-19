# O8.14-SF — spring-cleaning and historical context

**Status:** cleanup complete, 2026-09-19 (Asia/Shanghai)  
**Intended GitHub location:** `@~8.14/8.14-SF/`  
**Purpose:** keep historical context, retired tools, generated O8.13 material, and collated traces out of the active O8.14 path.

This is a staging/context directory, not an active implementation directory. `CC-01 / O8.14-B0` has **not** started. The current implementation plan remains `../Active/O8.14/O8.14-FAC-CC-PLAN.md`.

## What was preserved in the active path

- `Active/O8.14/` — the only current O8.14 plan.
- `Active/O8.13/shards/`, `Active/O8.13/oto/scripts/`, dictionaries, rotation data, and source-level tools needed to understand or reproduce the O8.13 baseline. Generated OTO outputs and the old `final-package/` tree are archived here instead of sitting beside source.
- `Active/Stego/` — the current stego-12/r2 builder, codec, loader, current tier/matrix tests, source fragments, and `output-stego12/` baseline. Older builders/loaders/tests are in the legacy-tools archive below.
- `Active/engines/` — current package/tool manifests; `node_modules/` remains snapshot-excluded.
- `Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/` — immutable O8.13-r3 release/verification material. The cleanup did not rewrite their bytes or manifests.
- `Uploads/stego2-cover-1024-scaled.bmp` and `Uploads/unicode_list.csv` — the retained current cover and script inventory.

## Retired or moved classifications

| classification | destination | reason |
|---|---|---|
| Generated O8.13 OTO outputs, selected shards, and old active `final-package/` | `archives/O8.13-generated-outputs-2026-09-19.tar.gz` | reproducible/generated output; keep extractable without making it look like current source |
| Old stego builders, loaders, experiments, tests, and `Active/Stego/tools/` | `archives/legacy-stego-tools-2026-09-19.tar.gz` | retired tooling; current stego-12/r2 path remains active |
| Superseded O8.13-r2 candidate package | `archives/O8.13-r2-candidate-2026-09-19.tar.gz` | historical candidate; the r3 release baseline remains raw and frozen |
| Superseded Handoff/changelog/planning set | `archives/handoff-history-through-2026-09-19.tar.gz` | retain historical reasoning while keeping the live handoff small |
| Old Uploads reports, old covers, reference sample, and trace | `archives/uploads-context-2026-09-19.tar.gz` | context-only inputs; the current cover and Unicode inventory stay in `Uploads/` |
| O8.13 plans, avenue notes, r3 logs, and dictionary backup | `context/raw-docs/` | human-readable historical context that does not need extraction |
| All discovered chat/trace sources | `CHAT-HISTORY/` | one discoverable location with source identity and provenance |

`SPRING-CLEANING-MOVES.tsv` records the source-to-destination moves. `SPRING-CLEANING-ARCHIVES.tsv` records archive SHA-256 values and member counts. The archive-local `.manifest.txt` files list every tar member; `.sha256` files verify the compressed archives.

## Rehydrating historical material safely

Inspect first, extract into scratch, and copy back only what a measured experiment needs. Do not untar these archives over the active workspace by default.

```bash
cd /path/to/@~8.14
sha256sum -c 8.14-SF/archives/O8.13-generated-outputs-2026-09-19.tar.gz.sha256
mkdir -p /tmp/o814-o813-context
 tar -xzf 8.14-SF/archives/O8.13-generated-outputs-2026-09-19.tar.gz -C /tmp/o814-o813-context
find /tmp/o814-o813-context/Active/O8.13 -maxdepth 2 -type d -print
```

The other archives use the same pattern. Their members retain original root-relative paths, so extraction into a scratch directory reconstructs the old layout without confusing it with current O8.14 files.

## Chat-history collation

Read `CHAT-HISTORY/README.md` before reading a trace. The histories were **collated, not flattened or silently concatenated**: each source keeps its original filename or a provenance-preserving renamed filename, and the current full trace also has a correctly named gzip companion. Historical trace exports can contain password-like debug material; review and rotate any real credentials before publishing this directory.

## Historical layout references

`CONTEXT-MAP.md` records what was learned from `@~8.10`, `@~8.12`, and `@~8.13`. Their staging/history directories are references, not material to copy wholesale into O8.14. In particular, do not rehydrate old raw packages merely because they appear in an older layout.

## Gate

Cleanup and handoff updates are complete. The next agent may begin CC-01 only after reading the current handoff, this README, the archive manifests, the corrected O8.14 plan, and the O8.13-r3 verification baseline. No CC-01 files or outputs were created by the cleanup.
