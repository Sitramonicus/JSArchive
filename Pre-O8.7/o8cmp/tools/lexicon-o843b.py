# -*- coding: utf-8 -*-
# lexicon-o843b.py — O.8.4.3 phrase layer. Reads /tmp/o842-lex.js (final O8.4.2 literal
# base: codename pools + O8.4.2 phrase slots already applied), replaces every phrase-site
# text with the uniform 15-variant pools from /tmp/o843-phrases.json (built by
# lexicon-o843-builder.py). Occurrence j (ascending file order) -> pool slot j.
# Writes /tmp/o843-lex.js. Local only.
import re, json, sys
def js_fragment(text):
    # old occurrences include their JS quoting (double-quoted or backtick source
    # fragments); emit a matching valid fragment for the new plain text.
    if '${' in text:
        assert '`' not in text
        return '`' + text + '`'
    if "'" in text:
        assert '"' not in text
        return '"' + text + '"'
    assert '"' not in text and "'" not in text
    return '"' + text + '"'


src = open('/tmp/o842-lex.js', encoding='utf-8').read()
P842 = json.load(open('/tmp/o842-phrases842.json')) if False else None
new_pools = json.load(open('/tmp/o843-phrases.json'))

# load O8.4.2 phrase pools by executing the P_ declaration region of lexicon-o842.py
lex842 = open('lexicon-o842.py', encoding='utf-8').read()
start = lex842.index('# Crumb/Puddle family messages')
end = lex842.index('# apply phrase pools')
section = lex842[start:end]
ns = {}
P842 = {}
ns['P_'] = lambda key, *vs: P842.__setitem__(key, list(vs))
exec(section, ns)
print('842 keys loaded:', len(P842))

# sanity: no old-text belongs to two keys; each used text must appear in src
assert set(P842) == set(new_pools), (set(P842) ^ set(new_pools))
bytext = {}
for key, items in P842.items():
    for t in items:
        if t in bytext:
            print('cross-key text (keep first):', key, bytext[t], t[:60])
        else:
            bytext[t] = key

# collect occurrences per key, ascending position
repl = []  # (pos, end, newtext)
for key, items in P842.items():
    occ = []
    for t in items:
        for m in re.finditer(re.escape(t), src):
            occ.append((m.start(), m.end(), t))
    occ.sort()
    npool = new_pools[key]
    assert len(npool) == 15, key
    assert len(set(npool)) == 15, key
    assert 0 < len(occ) <= 15, (key, len(occ))
    for j, (p, e, t) in enumerate(occ):
        repl.append((p, e, js_fragment(npool[j])))
    print(f'{key:14s} occ={len(occ):2d} -> slot0: {npool[0][:60]}')

# overlap check: no two replacements may overlap
repl.sort()
for a, b in zip(repl, repl[1:]):
    assert a[1] <= b[0], ('overlap', a, b)

# apply backward
for p, e, t in sorted(repl, reverse=True):
    src = src[:p] + t + src[e:]

open('/tmp/o843-lex.js', 'w', encoding='utf-8').write(src)
print('o843-lex written', len(src))
