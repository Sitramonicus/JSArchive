# Trim Archive - 2026-09-16 (updated 07:44 O8.13)

Compressed to save snapshot space (128M cap). Originals removed but retained gzipped or tarred.

## Contents
- `old-stego-outputs-0208-09.tar.gz` -> Active/Stego/output-stego2,3,8,9 (4 old stego versions, ~18.7M -> 12M)
- `Archives-packages.tar.gz` -> Archives/packages (old frozen packages, 17M -> 10M)
- `Docs-large.tar.gz` -> Docs/obfuscator-manual.pdf (1.5M -> 0.5M)
- `_COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz` (new 2026-09-16 07:44) -> Active/Stego/stego-r3 (output a206aa/f36e79 identical to r4 + output-1024 53732f/9e165c old lite) 14M -> 8.8M

## Deduplication
- `Active/Stego/stego-r4/output-1024` (13M) -> symlink `output-1024 -> output` (byte-identical a206aa/f36e79, saved 13M)
- Duplicates replaced with symlinks where possible (previous run saved ~16M: O8.12-r2 bundles, etc.)
- All `oto/v*/shard-*-out.js` already as `*.js.gz` + `manifest.json` 569 entries

## Restore
tar -xzf _COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz -C /home/user
# or for symlink:
ls -l Active/Stego/stego-r4/output-1024  # -> output
# recreate duplicate if needed:
cp -a Active/Stego/stego-r4/output Active/Stego/stego-r4/output-1024-orig && rm output-1024 && mv output-1024-orig output-1024

## Kept live
- Active/Stego/stego-r4/output (sole live 6.9M, 1024×768 a206aa/f36e79)
- Active/O8.13/ (new bench 8.6M), O8.12-r4/ frozen 8.6M, O8-legacy 7.9M
- Active/O8.12-r2/r3 lineage kept
