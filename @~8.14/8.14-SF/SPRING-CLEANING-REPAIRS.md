# Cleanup repairs and invariants — 2026-09-19

- Restored the non-release pointer `Active/O8.13/live -> ../../Working-Stable/O8.13` after the source/generated-output separation. This is a symlink pointer only; no frozen release bytes were copied or edited.
- Restored the release compatibility aliases required by the existing O8.13 manifests in `Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/`. They point at the existing canonical bytes; no release file contents or manifest hashes were changed.
- Removed the empty temporary staging directory after every archive had a non-empty member listing and a SHA-256 sidecar.
- The final cleanup move of `Active/O8.13/Handoff_O8.13_2026-09-16.md` into `context/raw-docs/` is included in the move log.
- `Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/` were not used as staging paths and were not modified.
- Current handoff paths were rewritten after the moves; historical paths appearing inside preserved trace exports are source text, not live pointers.
