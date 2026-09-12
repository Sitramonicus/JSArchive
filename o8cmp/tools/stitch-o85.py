#!/usr/bin/env python3
# stitch-o85.py — reassemble an O8.5 sharded payload from its (possibly
# obfuscated) per-piece files. Piece order matters (see the bundle README:
# a, m, n1, e, n2, aux for Shard-2/3). Output is comment-free by design.
# Usage:
#   python3 stitch-o85.py piece1.js piece2.js ... pieceN.js out.js
import sys

args = sys.argv[1:]
if len(args) < 2:
    sys.exit('usage: python3 stitch-o85.py <piece1.js> ... <pieceN.js> <out.js>')
final = args[-1]
pieces = args[:-1]

bodies = []
for f in pieces:
    b = open(f, encoding='utf-8').read().rstrip('\n')
    assert b.strip(), f + ' is empty!'
    bodies.append(b)

out = []
out.append('console.clear();')
out.append('(() => {')
out.append('  const _0xmod = {};')
out.append('')
for b in bodies:
    out.append(b)
    out.append('')
out.append('})();')
open(final, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('stitched ->', final, '(', sum(len(b) for b in bodies), 'bytes of pieces )')
