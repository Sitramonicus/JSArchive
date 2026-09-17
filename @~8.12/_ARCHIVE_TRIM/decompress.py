#!/usr/bin/env python3
import gzip, pathlib, json, sys
root = pathlib.Path('/home/user')
manifest = json.loads((root / '_ARCHIVE_TRIM' / 'manifest.json').read_text())
for m in manifest:
    gz = root / m['gz']
    orig = root / m['original']
    if not orig.exists() and gz.exists():
        orig.parent.mkdir(parents=True, exist_ok=True)
        orig.write_bytes(gzip.decompress(gz.read_bytes()))
        print(f"restored {m['original']}")
print("done")
