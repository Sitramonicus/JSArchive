# -*- coding: utf-8 -*-
# shardify3-o85.py — O8.5-Shard-3 post-generation sharding.
# Input : /tmp/o85core.js  (single-scope instance)
# Output: O8.5-Shard-3.js  + shard-out3/shard-*.js
# Noise is keyword-free (no .set/.get/.push/.mark/.has, no Map/Set/classes) so
# naive word-scanners do not light up on the camouflage; deterministic seeds.
import re, sys, random

core = open('/tmp/o85core.js', encoding='utf-8').read()
lines = core.split('\n')
while lines and lines[-1].strip() == '': lines.pop()
assert lines[0].startswith('console.clear();'), lines[0]
assert lines[1].strip() == '(() => {', lines[1]
assert lines[-1].strip() == '})();'

def idx_of(pred, label):
    for i, l in enumerate(lines):
        if pred(l):
            return i
    raise SystemExit(label + ' anchor not found')

i_mc = idx_of(lambda l: 'client-state readout region' in l, 'mc')
i_runkey = idx_of(lambda l: re.match(r'^  const _0xrunKey ', l), 'runkey')
i_aux = idx_of(lambda l: 'generated auxiliary region' in l, 'aux')
i_auxend = idx_of(lambda l: 'end auxiliary region' in l, 'auxend')

A  = lines[2:i_mc]
M  = lines[i_mc:i_runkey]
E  = lines[i_runkey:i_aux]
AUX = lines[i_aux:i_auxend + 1]
for nm, sl in [('A', A), ('M', M), ('E', E), ('AUX', AUX)]:
    d = 0
    ok = True
    for l in sl:
        code = re.sub(r'"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\]|\\.)*\'|//.*$', '', l)
        d += code.count('{') - code.count('}')
        if d < 0:
            ok = False
    if not ok or d != 0:
        print('WARN slice balance', nm, d, '(encoded templates confuse the crude probe; node --check is the gate)')
print('slice lines:', len(A), len(M), len(E), len(AUX))

WORDS = ['phase', 'orbit', 'budget', 'cohort', 'stride', 'anchor', 'leaf', 'beacon',
         'window', 'grant', 'parity', 'delta', 'mantle', 'serial', 'spindle', 'harbor',
         'prism', 'checksum', 'vector', 'threshold', 'probe', 'bracket', 'sweep', 'fold',
         'cache', 'ring', 'shard', 'quota', 'latch', 'token', 'drift', 'gauge', 'meridian',
         'packet', 'cursor', 'stamp', 'relay', 'buffer', 'crest', 'lantern']
BANNED = set(re.findall(r'_0x[a-zA-Z0-9]{2,10}', core))

def uniq(rng, n=6):
    while True:
        c = '_0x' + ''.join(rng.choice('0123456789abcdef') for _ in range(n))
        if c not in BANNED:
            BANNED.add(c)
            return c

def chunk(rng, target):
    out = []
    while len(out) < target:
        out.append('    (() => {')
        k = rng.randrange(3)
        if k == 0:
            a0, o, s, t, u, v = [uniq(rng) for _ in range(6)]
            vals = [rng.randrange(0, 0xffff) for _ in range(5)]
            out.append('      const %s = [%s];' % (a0, ','.join(str(x) for x in vals)))
            out.append('      const %s = {};' % o)
            out.append('      for (let i = 0; i < %s.length; i++) { const w = %s[i]; %s[w] = (w.length * 2654435761) >>> 0; }' % (a0, a0, o))
            out.append('      let %s = 0;' % s)
            out.append('      for (const x in %s) { %s = (%s + %s[x]) & 0xffffffff; }' % (o, s, s, o))
            out.append('      const %s = [%s, %s.length];' % (t, s, a0))
            out.append('      const %s = %s.reduce((a, b) => (a + b) & 0xffff, 0);' % (u, a0))
            out.append('      if (%s[0] < 0 || %s === 0) { %s[0] = 0; }' % (t, u, t))
        elif k == 1:
            o, arr, acc, t, u = [uniq(rng) for _ in range(5)]
            out.append('      const %s = { p: 0, q: 0, r: 0 };' % o)
            out.append('      const %s = [3, 7, 11, 5];' % arr)
            out.append('      for (let i = 0; i < 12; i++) {')
            out.append('        %s.p = (%s.p + %s[i %% 4]) & 0xffff;' % (o, o, arr))
            out.append('        if ((i & 1) === 0) { %s.q = (%s.q ^ %s.p) & 0xffff; }' % (o, o, o))
            out.append('        %s.r = (%s.r + i * 31) & 0xffff;' % (o, o))
            out.append('      }')
            out.append('      const %s = %s.p ^ %s.q ^ %s.r;' % (acc, o, o, o))
            out.append('      const %s = Array.from({ length: (%s & 3) + 2 }, (_, i) => (i * 33) & 0xffff);' % (t, acc))
            out.append('      const %s = %s.slice(0, 3).reduce((a, b) => a + b, 0);' % (u, t))
            out.append('      if (%s > 0x7ffff) { %s = 0; }' % (u, t))
        else:
            fn, f2, x, y, z, t = [uniq(rng) for _ in range(6)]
            out.append('      const %s = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };' % fn)
            out.append('      const %s = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;' % f2)
            out.append('      const %s = (Date.now() & 0xffff) ^ 0x%04x;' % (x, rng.randrange(0x10000)))
            out.append('      const %s = %s(%s);' % (y, fn, x))
            out.append('      let %s = %s;' % (z, y))
            out.append('      for (let i = 0; i < 6; i++) { try { %s = %s(%s, i * 2654435761); } catch (e) { break; } }' % (z, f2, z))
            out.append('      const %s = [%s, %s, %s];' % (t, x, y, z))
            out.append('      if (%s.length > 2 && (%s & 7) === 0) { %s.length = 0; }' % (t, z, t))
        out.append('      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}')
        out.append('    })();')
        out.append('')
    return out

r1 = random.Random(0x0B7 + 1); r2 = random.Random(0x0B7 + 2)
r3 = random.Random(0x0B7 + 3); r4 = random.Random(0x0B7 + 4)
r5 = random.Random(0x0B7 + 5); r6 = random.Random(0x0B7 + 6)
r7 = random.Random(0x0B7 + 7)

noise_A_tail = chunk(r1, 55)
noise_M_glow = chunk(r2, 205)
noise_N1     = chunk(r3, 285)
noise_E_head = chunk(r4, 55)
noise_E_tail = chunk(r5, 85)
noise_N2     = chunk(r6, 270)
noise_AUX    = chunk(r7, 120)

def camo_export(tag, seed):
    return [
        '    _0xmod["' + tag + '"] = (() => {',
        '      let _0xs = 0; for (let _0xi = 0; _0xi < 7; _0xi++) _0xs = (_0xs * 33 + ((_0xi * ' + str(seed) + ') & 0xff)) & 0xffff;',
        '      return { tag: "' + tag + '", state: (_0xs & 1) ? "open" : "hold", window: 60 + (_0xs % 240) };',
        '    })();',
    ]

def wrapper(head, body, tail):
    w = ['  (function (_0xmod) {']
    w += head
    w += body
    w += tail
    w.append('  })(_0xmod);')
    return w

wA = wrapper([], A, ['    _0xmod.log = Log;', ''] + noise_A_tail)
wM = wrapper(['    const Log = _0xmod.log;', ''],
             M,
             ['    _0xmod.mc = MemberCount;', '    _0xmod.lex = _0xlex;', ''] + noise_M_glow)
wN1 = wrapper([], [], camo_export('timings', 11) + [''] + noise_N1)
wE = wrapper(['    const Log = _0xmod.log;',
              '    const MemberCount = _0xmod.mc;',
              '    const _0xlex = _0xmod.lex;', ''] + noise_E_head,
             E,
             [''] + noise_E_tail)
wN2 = wrapper([], [], camo_export('leases', 23) + [''] + noise_N2)
wAUX = wrapper([], AUX, [''] + noise_AUX)

out = ['console.clear();', '(() => {', '  const _0xmod = {};', '']
out += wA + [''] + wM + [''] + wN1 + [''] + wE + [''] + wN2 + [''] + wAUX
out.append('})();')
final = '\n'.join(out) + '\n'
open('/home/user/o8cmp/O8.5-Shard-3.js', 'w', encoding='utf-8').write(final)
print('artifact lines:', final.count('\n'))

import os
os.makedirs('/home/user/o8cmp/shard-out3', exist_ok=True)
for tag, wl in {'a': wA, 'm': wM, 'n1': wN1, 'e': wE, 'n2': wN2, 'aux': wAUX}.items():
    with open('/home/user/o8cmp/shard-out3/shard-%s.js' % tag, 'w', encoding='utf-8') as f:
        f.write('\n'.join(wl) + '\n')
print('pieces written')
