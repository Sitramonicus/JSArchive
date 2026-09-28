# O8.15-SF context map

## Purpose

`8.15-SF` is the saved-files / superfluous-files staging area for O8.15. It exists to reduce active workspace
pressure while preserving enough evidence and history to resume the line from the repository.

## Active versus saved

Active source remains under `Active/O8.15/`: carrier source, tools, reports, current plans, runner notes, and
captures. Generated CC-34 output and pinned chain-A payloads are context/build artifacts and are stored as
checksummed archives here.

Frozen O8.14 remains read-only in `Working-Stable/O8.14/`, `Archives/packages/O8.14/`, and
`Archives/rollback-b22/`. O8.13 is retired; its active laboratory tree is in `Archives/retired/` and its frozen
lines remain in the existing Working-Stable/Archives locations.

## SF archives

| archive | contents | recovery |
|---|---|---|
| `archives/O8.15-CC34-generated-2026-09-28.tar.gz` | CC-34 generated package and reports | extract to a scratch directory or `Active/O8.15/` after verifying its sidecar |
| `archives/O8.15-pinned-chainA-2026-09-28.tar.gz` | canonical chain-A pins and measurement notes | extract to `Active/O8.15/` after verifying its sidecar |
| `Archives/retired/O8.13-active-2026-09-28.tar.gz` | retired active O8.13 laboratory tree | extract to `Active/` only when an O8.13 reproduction requires it |

Never extract a historical/generated archive over frozen O8.14. Inspect with `tar -tzf` first; verify the matching
`.sha256` file; extract into `/tmp` for experiments whenever possible.

## Historical O8.14 candidate labs

Superseded O8.14 candidate directories are archived in `archives/O8.14-historical-candidate-labs-2026-09-28.tar.gz`.
They are not current build inputs. `Active/O8.14/CC-33/` remains because its live lane outputs and frozen-package
relationship are still evidence for the O8.15 chain and must not be confused with the older candidate labs.

## O8.14 CC-33 evidence

The superseded CC-33 generated/evidence tree is archived in
`archives/O8.14-CC33-historical-evidence-2026-09-28.tar.gz`. It includes lane outputs, selected shards, reports,
and generated package evidence. O8.15 active rebuilds use the frozen Working-Stable O8.14 input instead.
