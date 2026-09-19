# Archives — frozen history and retirement index

**Current active implementation line:** O8.14.  
**Frozen regression baseline:** `packages/O8.13/` plus `Working-Stable/O8.13/`, both O8.13-r3 mirrors.  
**Cleanup staging:** historical/generated O8.13 material that was not needed in the active path is in `8.14-SF/archives/`, with hashes and member manifests.

## Immutable O8.13 material

| path | status | notes |
|---|---|---|
| `packages/O8.13/` | frozen canonical archive mirror | O8.13-r3 live line; `sha256sum -c` 9/9 OK; do not overwrite |
| `packages/O8.13-r3/` | frozen r3-named verification package | compatibility/r3 naming and release evidence; do not overwrite |
| `../Working-Stable/O8.13/` | frozen live mirror | byte-identical release mirror; the only paste directory |

The former raw `packages/O8.13-r2-candidate/` was a superseded candidate and was moved, with its hashes/listing, to `../8.14-SF/archives/O8.13-r2-candidate-2026-09-19.tar.gz`. It is recoverable but is not a current package.

## Historical records retained here

- `RETIRED.md` and `build-retired.py` — prior retirement record and generator; read before changing archive history.
- `packages/` — frozen package directories that remain intentionally recoverable. O8.13-r3 is the relevant baseline for O8.14.
- Older descriptions in `RETIRED.md` may reference paths from earlier snapshots. They are historical records, not active build instructions.

## O8.14-SF archive set

`8.14-SF/archives/` contains:

- `O8.13-generated-outputs-2026-09-19.tar.gz` — generated OTO outputs, selected shards, old active `final-package/`;
- `legacy-stego-tools-2026-09-19.tar.gz` — retired stego builders/loaders/tests/tools;
- `O8.13-r2-candidate-2026-09-19.tar.gz` — superseded candidate;
- `handoff-history-through-2026-09-19.tar.gz` — old changelog and superseded handoff/planning prose;
- `uploads-context-2026-09-19.tar.gz` — old Uploads context.

Each archive has a `.manifest.txt` member listing and `.sha256` sidecar. See `8.14-SF/README.md` for scratch extraction instructions.

## Release rules

Do not overwrite a frozen directory without explicit go-live authorization. Do not call a generated archive current merely because it contains a similarly named bundle. Use the self-identifying O8.13 files in `Working-Stable/O8.13/` and verify their manifest before a regression run.
