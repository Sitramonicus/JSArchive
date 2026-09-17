# marker-swap.py — produce the "unlocked" variant of a stitched artifact.
# Usage: python3 marker-swap.py <stitched.js> <out-unlocked.js>
# Rule: the marker 佐藤 結衣 must occur EXACTLY once; it is swapped for the
# canonical passphrase (which the salted digest in shard-a is pinned to).
import sys
MARKER = '佐藤 結衣'
PHRASE = 'thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents'
src, out = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
n = s.count(MARKER)
assert n == 1, f'marker count {n} != 1 (expected exactly 1, in shard-u)'
open(out, 'w', encoding='utf-8').write(s.replace(MARKER, PHRASE))
print(f'marker swap OK (1 occurrence) -> {out}')
