# -*- coding: utf-8 -*-
# inv-o85.py — invert Shard-2's per-piece files back into the single-scope core
# that the metamorphic generator can consume again (Shard-3 fresh instance).
# Removes: wrapper open/close lines, alias heads, export tails, all inert noise
# chunks (deterministic layout: '    (() => {' ... '    })();' runs), camo shards.
# Writes /tmp/o85core-plain.js. Deterministic; asserts aggressively.
import re

P = '/home/user/o8cmp/attic/shard-out2/'
def lines_of(name):
    ls = open(P + name, encoding='utf-8').read().split('\n')
    while ls and ls[-1] == '': ls.pop()
    return ls

def strip_noise(ls, expect_min, expect_max, label):
    """Remove contiguous runs starting '    (() => {' ending '    })();'."""
    out = []
    i = 0
    n = 0
    while i < len(ls):
        if ls[i].strip() == '(() => {' and ls[i][:4] == '    ':
            # find matching close: scan forward; inner lines indent >= 6 or empty
            j = i + 1
            while j < len(ls):
                st = ls[j].strip()
                if ls[j][:4] == '    ' and st == '})();':
                    break
                j += 1
            if j >= len(ls):
                raise SystemExit(label + ': noise chunk unterminated at line ' + str(i))
            # inner sanity: no real code markers inside a noise chunk
            inner = ls[i + 1:j]
            bad = [x for x in inner if 'const _0xrunKey' in x or 'Log.' in x and '_0xlex' not in x
                   and 'MemberCount' not in x and 'Google' not in x]
            # noise inner lines never contain real engine anchors
            for x in inner:
                if any(a in x for a in ('_0xrunKey', 'client-state readout', 'auxiliary region',
                                        'Juggler decode', 'GoogleRelease', 'Symbol.for')):
                    raise SystemExit(label + ': anchor inside presumed noise: ' + x[:70])
            out.append('')  # keep blank separator
            i = j + 1
            n += 1
        else:
            out.append(ls[i])
            i += 1
    if not (expect_min <= n <= expect_max):
        raise SystemExit('%s: noise chunks %d outside [%d,%d]' % (label, n, expect_min, expect_max))
    # drop the blank separators we added at boundaries and collapse runs of blanks later
    return out

def body_of(ls, head_n, tail_drop):
    """Drop wrapper open/close, first head_n lines and trailing noise/export region.
    tail_drop: number of trailing lines to remove after noise stripping.
    Returns body lines + asserts wrapper lines."""
    assert ls[0] == '  (function (_0xmod) {', ls[0]
    assert ls[-1] == '  })(_0xmod);', ls[-1]
    inner = ls[1:-1]
    inner = inner[head_n:]
    if tail_drop:
        inner = inner[:len(inner) - tail_drop]
    return inner

def clean(ls):
    # trim leading/trailing blanks; collapse 3+ blanks to 1
    while ls and ls[0] == '': ls.pop(0)
    while ls and ls[-1] == '': ls.pop()
    out = []
    blanks = 0
    for l in ls:
        if l == '':
            blanks += 1
            if blanks == 1: out.append('')
        else:
            blanks = 0
            out.append(l)
    return out

# ---------------------------------------------------------------- shard a
a = lines_of('shard-a.js')
a = strip_noise(a, 4, 8, 'a')
# after noise removal: head = wrapper open only (no alias head), tail = export line + ''
# tail lines to drop: find '    _0xmod.log = Log;'
keep = []
dropped_export = False
for i, l in enumerate(a):
    if l.strip() == '_0xmod.log = Log;' and l[:4] == '    ':
        dropped_export = True
        continue
    keep.append(l)
assert dropped_export, 'a: export not found'
A = clean(body_of(keep, 0, 0))

# ---------------------------------------------------------------- shard m
m = lines_of('shard-m.js')
m = strip_noise(m, 11, 19, 'm')
head_n = 2  # 'const Log = _0xmod.log;' + ''
assert m[0] == '  (function (_0xmod) {', m[0]
assert m[1] == '    const Log = _0xmod.log;', m[1]
# drop export lines '_0xmod.mc' '_0xmod.lex'
keep = []
dropped = 0
for l in m:
    if l.strip() in ('_0xmod.mc = MemberCount;', '_0xmod.lex = _0xlex;') and l[:4] == '    ':
        dropped += 1
        continue
    keep.append(l)
assert dropped == 2, ('m exports', dropped)
M = clean(body_of(keep, head_n, 0))

# ---------------------------------------------------------------- shard e
e = lines_of('shard-e.js')
e = strip_noise(e, 5, 9, 'e-tail')
assert e[0] == '  (function (_0xmod) {', e[0]
head_n = 4  # 3 alias lines + blank separator
for k in range(1, 4):
    assert e[k].strip() != '' and e[k].startswith('    const '), e[k]
E = clean(body_of(e, head_n, 0))

# ---------------------------------------------------------------- shard aux
x = lines_of('shard-aux.js')
x = strip_noise(x, 7, 14, 'aux')
X = clean(body_of(x, 0, 0))

# ---------------------------------------------------------------- assemble
core = []
core.append('console.clear();')
core.append('(() => {')
for chunk in (A, M, E, X):
    core.append('')
    core += chunk
core.append('})();')
text = '\n'.join(core) + '\n'

for anchor in ('const Log =', 'client-state readout region', 'const _0xlex',
               'const _0xrunKey = Symbol.for', 'Juggler decode', 'auxiliary region',
               'console.clear();', 'O.8.5-Shard-2', '201f1688', 'GoogleUnlock'):
    assert anchor in text, 'core missing ' + anchor
# no residue of shard machinery
for bad in ('(function (_0xmod)', '})(_0xmod);', '_0xmod.log = Log', '_0xmod.mc =',
            '_0xmod.lex =', '(() => {', 'keep warm', 'camo', 'shard-'):
    if bad == '(() => {':
        continue
    assert bad not in text, 'core still contains ' + bad
print('A/M/E/X body lines:', len(A), len(M), len(E), len(X))
open('/tmp/o85core-plain.js', 'w', encoding='utf-8').write(text)
print('core written', len(text))
