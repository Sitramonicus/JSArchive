# _BACKUPS — rollback snapshots, not part of any build

Nothing here is read by the pipeline (verified 2026-09-17: zero references from any `.js`/`.mjs`).
These are point-in-time safety copies made before risky edits. Kept so a bad edit can be reverted
by hand; safe to delete once you trust the current line.

| dir | what it is | taken |
|---|---|---|
| `O8.13-pre-strict-20260916/` | shards before the "strict" pass | 2026-09-16 03:09 |
| `O8.13-g7-strings-pre-r3-20260916/` | G7 string tables before r3 | 2026-09-16 02:52 |

They were sitting inside `Active/O8.13/` where they looked like live source. Moved here 2026-09-17.
