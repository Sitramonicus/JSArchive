# Collated chat history for O8.14

**Location:** `@~8.14/8.14-SF/CHAT-HISTORY/`  
**Collation date:** 2026-09-19 (Asia/Shanghai)

## Sources and preserved identity

| source class | file or folder here | provenance |
|---|---|---|
| current full Arena trace | `Agent-Run-history/Agent-Run-2026-09-16-full.txt` and `Agent-Run-2026-09-16-full.txt.gz` | moved from the former `Handoff/CHAT-HISTORY/`; the gzip companion was generated from the moved full trace |
| legacy full/partial history | `Agent-Chat-History-legacy.txt.gz` | moved from `Handoff/Agent Chat History.txt.gz` without flattening it into the current trace |
| S5 stego trace | `CHATLOG-S5-STEGO.txt.gz` | moved from `Handoff/CHATLOG-S5-STEGO.txt.gz` |
| supplied decoder/Arena exports | `decoder-logs/` | moved from the lowercase `uploads/` directory; filenames are unchanged |

The moved `Agent-Run-history/README.md` is retained as a local source note; this parent README is the current placement/index authority.

## How the sources were combined

No source was silently appended to another source. The collation is a discoverable folder with a provenance table, stable names, and separate subfolders for the three decoder exports. `SPRING-CLEANING-MOVES.tsv` records the original paths. When a future agent needs a continuous narrative, read the current full trace first, then use the legacy and S5 files for their named eras, and consult `decoder-logs/` by filename.

Recommended commands:

```bash
zgrep -n "O8.14\|FaC\|CC-01\|O8.13-r3" 8.14-SF/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt.gz
sed -n '1,80p' 8.14-SF/CHAT-HISTORY/Agent-Run-history/README.md
```

These are historical audit records, not current implementation instructions. They may include password-like debug material from old sessions. Do not copy values into new files; classify and rotate real credentials before a public push.
