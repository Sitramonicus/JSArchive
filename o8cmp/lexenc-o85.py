# -*- coding: utf-8 -*-
# lexenc-o85.py — O8.5-Shard-3: encode the entire lexicon at rest.
# Every codename word and every phrase-variant sentence is Caesar-rotated over the
# printable band 0x20..0x7E (non-ASCII chars kept verbatim) so NO plaintext word or
# sentence exists in the file; runtime decode happens inside _0xlex (words via KC,
# phrase texts via KP) at the moment a log fires. Template literals keep their ${expr}
# parts verbatim (they carry runner-local state) and only their static text is encoded,
# as ${_0xlex.d("…")} segments — evaluation order and output are unchanged.
# Reads /tmp/o85c3.js -> writes /tmp/o85e3.js. Deterministic. Local only.
import re, sys

SRC = open('/tmp/o85c3.js', encoding='utf-8').read()
KC, KP = 47, 61
B0 = 0x20
BAND = 0x5F  # 0x20..0x7E inclusive

def enc(text, k):
    out = []
    for ch in text:
        o = ord(ch)
        if 0x20 <= o <= 0x7E:
            out.append(chr(B0 + ((o - B0 + k) % BAND)))
        else:
            out.append(ch)  # rare (em dash etc.) kept verbatim; decoder skips >=0x80
    return ''.join(out)

def js_str(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

# ---------------------------------------------------------------------------
# helpers: scan quoted/template tokens and balanced structures char-wise
# ---------------------------------------------------------------------------
def scan_quoted(text, i, q):
    """text[i] == q ('"', \"'\", or '`'). Returns (kind, value_or_parts, end).
    kind 'plain': value string. kind 'tpl': parts [(static,), (static,expr),...]
    Exprs are returned verbatim; asserts keep pools' simplicity."""
    j = i + 1
    parts = []
    cur = []
    if q == '`':
        while j < len(text):
            c = text[j]
            if c == '\\':
                cur.append(text[j:j + 2]); j += 2; continue
            if c == '`':
                break
            if c == '$' and text[j + 1:j + 2] == '{':
                parts.append(('s', ''.join(cur))); cur = []
                # scan expr to matching '}' with quote awareness
                j += 2
                d = 1
                buf = []
                while j < len(text) and d > 0:
                    cc = text[j]
                    if cc == '"' or cc == "'":
                        qq = cc
                        st = j
                        j += 1
                        while j < len(text):
                            if text[j] == '\\': j += 2; continue
                            if text[j] == qq: break
                            j += 1
                        buf.append(text[st:j + 1]); j += 1
                        continue
                    elif cc == '`':
                        raise SystemExit('nested template inside expr at ' + str(j))
                    elif cc == '{': d += 1
                    elif cc == '}':
                        d -= 1
                        if d == 0:
                            j += 1
                            break
                    buf.append(cc); j += 1
                if d != 0:
                    raise SystemExit('unbalanced ${ at ' + str(j) + ' :: ' + repr(text[max(0,j-120):j+80]))
                parts.append(('e', ''.join(buf)))
                continue  # expr scan already advanced j past '}'
            else:
                cur.append(c)
            j += 1
        if j >= len(text):
            raise SystemExit('unterminated template at ' + str(i) + ' :: ' + repr(text[max(0,i-120):i+80]))
        if cur:
            parts.append(('s', ''.join(cur)))
        return ('tpl', parts, j + 1)
    else:
        while j < len(text):
            c = text[j]
            if c == '\\':
                cur.append(text[j:j + 2]); j += 2; continue
            if c == q:
                break
            cur.append(c); j += 1
        if j >= len(text):
            raise SystemExit('unterminated string at ' + str(i))
        val = ''.join(cur)
        # minimal escape resolution
        val = re.sub(r'\\(["\\])', r'\1', val)
        return ('plain', val, j + 1)

def parse_array_items(text, i):
    """text[i] == '['. Returns list of raw item strings (char-wise, top-level commas)."""
    items = []
    cur = []
    j = i + 1
    while j < len(text):
        c = text[j]
        if c == '"' or c == "'" or c == '`':
            _, _, end = scan_quoted(text, j, c)
            cur.append(text[j:end])
            j = end
            continue
        if c == ',':
            items.append(''.join(cur).strip()); cur = []; j += 1
            continue
        if c == ']':
            items.append(''.join(cur).strip())
            return items, j + 1
        cur.append(c)
        j += 1
    raise SystemExit('unterminated array at ' + str(i))

# ---------------------------------------------------------------------------
# 1) _0xlex region: rebuild whole helper with encoded C + decoders
# ---------------------------------------------------------------------------
lx = SRC.find('const _0xlex = (() => {')
if lx < 0:
    raise SystemExit('no _0xlex')
k = lx + len('const _0xlex = (() => {')
depth = 1
while k < len(SRC) and depth:
    c = SRC[k]
    if c == '"' or c == "'" or c == '`':
        _, _, k = scan_quoted(SRC, k, c)
        continue
    if c == '{': depth += 1
    elif c == '}': depth -= 1
    k += 1
assert SRC[k:k + 4] == ')();', SRC[k:k + 10]
lx_end = k + 4  # past the IIFE's ')();'

region = SRC[lx:lx_end]
cm = re.search(r'const C = \[', region)
if not cm:
    raise SystemExit('no C table')
# tokenize all dquote tokens inside C region
ci = cm.end() - 1  # at '['
words = []
j = ci + 1
depth = 1
while j < len(region) and depth:
    c = region[j]
    if c == '"':
        _, val, j = scan_quoted(region, j, '"')
        words.append(val)
        continue
    if c == '[':
        depth += 1
    elif c == ']':
        depth -= 1
    j += 1
assert len(words) == 300, len(words)
rows = [words[t * 15:(t + 1) * 15] for t in range(20)]
enc_rows = ', '.join('[' + ', '.join(js_str(enc(w, KC)) for w in row) + ']' for row in rows)

helper = (
    '  const _0xlex = (() => {\n'
    '    const KC = ' + str(KC) + ';\n'
    '    const KP = ' + str(KP) + ';\n'
    '    const dec = (s, k) => { let o = ""; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); o += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - k) % 0x5F) + 0x5F) % 0x5F : c); } return o; };\n'
    '    const C = [\n      ' + enc_rows + ',\n    ];\n'
    '    const _last = {};\n'
    '    const pick = (i, arr) => {\n'
    '      if (!arr || arr.length === 0) return \'\';\n'
    '      if (arr.length === 1) return arr[0];\n'
    '      let j = Math.floor(Math.random() * arr.length);\n'
    '      if (j === _last[i] && arr.length > 1) j = (j + 1) % arr.length;\n'
    '      _last[i] = j;\n'
    '      return arr[j];\n'
    '    };\n'
    '    return {\n'
    '      C: i => { const w = pick(i, C[i]); return w === null || w === undefined ? w : dec(w, KC); },\n'
    '      P: (i, arr) => pick(i, arr),\n'
    '      d: (s) => s === null || s === undefined ? s : dec(s, KP)\n'
    '    };\n'
    '  })();'
)
SRC = SRC[:lx] + helper + SRC[lx_end:]

# ---------------------------------------------------------------------------
# 2) every _0xlex.P(k,[ items ]) site: encode items
# ---------------------------------------------------------------------------
def rewrite_p(text):
    out = []
    i = 0
    n = 0
    while True:
        j = text.find('_0xlex.P(', i)
        if j < 0:
            out.append(text[i:])
            break
        out.append(text[i:j])
        # balanced paren scan
        k2 = j + len('_0xlex.P(')
        depth = 1
        while k2 < len(text) and depth:
            c = text[k2]
            if c == '"' or c == "'" or c == '`':
                _, _, k2 = scan_quoted(text, k2, c)
                continue
            if c == '(': depth += 1
            elif c == ')': depth -= 1
            k2 += 1
        inner = text[j + len('_0xlex.P('):k2 - 1]
        mm = re.match(r'(\d+),\s*\[', inner)
        if not mm:
            raise SystemExit('odd P call: ' + inner[:60])
        key = int(mm.group(1))
        items, _end = parse_array_items(inner, mm.end() - 1)
        if len(items) != 15:
            # tolerances: some pools have different sizes (single = 1?)
            raise SystemExit('P(%d) items=%d' % (key, len(items)))
        new_items = []
        for it in items:
            if it.startswith('"'):
                _, val, _ = scan_quoted(it, 0, '"')
                new_items.append('_0xlex.d(' + js_str(enc(val, KP)) + ')')
            elif it.startswith('`'):
                _, parts, _ = scan_quoted(it, 0, '`')
                # parts: list of (static,) or (static,expr)
                segs = []
                for part in parts:
                    kind, val = part
                    if kind == 's':
                        if val:
                            segs.append('${_0xlex.d(' + js_str(enc(val, KP)) + ')}')
                    else:
                        segs.append('${' + val + '}')
                if not segs:
                    raise SystemExit('empty template at site')
                new_items.append('`' + ''.join(segs) + '`')
            else:
                raise SystemExit('odd item: ' + it[:60])
        rebuilt = '_0xlex.P(' + str(key) + ',[' + ','.join(new_items) + '])'
        out.append(rebuilt)
        n += 1
        i = k2
    if n != 60:
        raise SystemExit('P sites %d != 60' % n)
    return ''.join(out), n

SRC, np = rewrite_p(SRC)
print('P sites rewritten:', np)

open('/tmp/o85e3.js', 'w', encoding='utf-8').write(SRC)
print('encoded base written', len(SRC))
