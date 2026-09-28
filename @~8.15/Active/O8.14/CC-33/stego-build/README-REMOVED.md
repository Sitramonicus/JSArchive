# stego-build — contents moved out (2026-09-28 trim)

The three build outputs that lived here were **byte-identical** to the frozen go-live copies
(sha256 verified at removal time), so they were removed under the workspace trim policy
(`Documentation/TRIM-LEDGER.json`: "evidence > space — every removal has a recover command or a
byte-identical twin").

| was | bytes | sha256 (prefix) | recover |
|---|---:|---|---|
| `O8.12-runner.js` | 3,372,798 | `28c015df…` | `cp Working-Stable/O8.14/O8.14-runner-ad898afb.js Active/O8.14/CC-33/stego-build/O8.12-runner.js` |
| `stego11p-real.min.js` | 2,010,345 | see `Archives/packages/O8.14/` | `cp Working-Stable/O8.14/stego11p-real.min.js Active/O8.14/CC-33/stego-build/stego11p-real.min.js` |
| `O8.12-cover.bmp` | 2,359,350 | `50e0f494…` | `cp Working-Stable/O8.14/O8.14-cover-3bf21868.bmp Active/O8.14/CC-33/stego-build/O8.12-cover.bmp` |

Or rebuild the whole directory: `OUT=<this dir> bash Active/O8.15/tools/cc34-build.sh carrier`.

**Readers that pointed here:** `tools/board.sh` (the 8.14-era pre-paste board — its log records are in
`Active/O8.14/CC-33/reports/board-*.log`), and the two 8.14 checklists
(`EVERYTHING-TO-DO.md`, `MASTER-CHECKLIST.md`). Point them at `Working-Stable/O8.14/` (same bytes) or run the
recover line above first.
