#!/usr/bin/env python3
"""One-shot patch: DS-1 — give boards 9/10/11 (Teams/Zoom/Slack) real courtesy reels so the
loader's venue dispatch is uniform instead of Telegram-having-a-board-and-the-rest-dead-ending."""
import sys

P = 'stego11-loader.js'
s = open(P).read()
orig = s

# 1. generic board key tag, next to the board8 one
a = "  var kB8 = cc(98, 111, 97, 114, 100, 56, 58); // board8 key tag"
assert a in s, 'kB8 anchor missing'
s = s.replace(a, a + "\n  var kBN = cc(98, 111, 97, 114, 100); // generic board key tag (boards 9..11)", 1)

# 2. the provisioned-board reader, lifted from tryBoardReel8's shape
b = "  function tryBoardReel8(pigment, pixelOff, salt) {"
assert b in s, 'tryBoardReel8 anchor missing'
s = s.replace(b, """  function tryBoardReelN(pigment, pixelOff, salt, idx, enc) {
    // Provisioned community board: same courtesy reel as board 8, different key domain.
    // Boards 9/10/11 used to dead-end in a magic check that could never open, which made
    // the loader's dispatch tell you which venue you were in by how it failed. They now
    // serve the identical courtesy payload, so every unprovisioned venue behaves alike.
    try {
      var KG = fnv1a(kBN + idx + ':' + salt.toString(16));
      var cs = new Array(enc.length), i;
      for (i = 0; i < enc.length; i++) {
        cs[i] = enc[i] ^ ((((KG >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255)));
      }
      return new Uint8Array(cs);
    } catch (e) { return null; }
  }
  function tryBoardReel8(pigment, pixelOff, salt) {""", 1)

# 3. retire the dead-end
old_fn = """  function tryBoardReel(pigment, pixelOff, vseed, tag) {
    // Unprovisioned board reel: the community player carries no board keys,
    // so the magic gate below never opens and the garden plays instead.
    var off = pixelOff + ((vseed >>> 0) % 1024);
    var m0 = pigment[off] ^ (vseed & 255);
    var m1 = pigment[off + 1] ^ ((vseed >> 8) & 255);
    var want = ((vseed >>> 16) ^ tag ^ 0x5a) & 255;
    if ((m0 ^ m1 ^ tag) !== want) throw new Error('board');
    return null;
  }
"""
assert old_fn in s, 'tryBoardReel body missing'
s = s.replace(old_fn, "", 1)

# 4. dispatch: each venue bit selects its own provisioned board
old_d = """    try { if (vbits & 16) { var b16 = tryBoardReel(pigment, pixelOff, seed ^ 0x10, 0x4D); if (b16) code = await gunzipToCode(b16); } } catch (eB16) {}
    try { if (vbits & 32) { var b32 = tryBoardReel(pigment, pixelOff, seed ^ 0x20, 0x5A); if (b32) code = await gunzipToCode(b32); } } catch (eB32) {}
    try { if (vbits & 64) { var b64 = tryBoardReel(pigment, pixelOff, seed ^ 0x40, 0x53); if (b64) code = await gunzipToCode(b64); } } catch (eB64) {}"""
new_d = """    var bIdx = (vbits & 16) ? 9 : (vbits & 32) ? 10 : (vbits & 64) ? 11 : 0;
    var bEnc = (bIdx === 9) ? '__STEGO9_BOARD9__' : (bIdx === 10) ? '__STEGO9_BOARD10__' : (bIdx === 11) ? '__STEGO9_BOARD11__' : null;
    try { if (bIdx) { var bN = tryBoardReelN(pigment, pixelOff, SALT, bIdx, bEnc); if (bN) code = await gunzipToCode(bN); } } catch (eBN) {}"""
assert old_d in s, 'dispatch block missing'
s = s.replace(old_d, new_d, 1)

assert 'tryBoardReel(' not in s.replace('tryBoardReelN(', '').replace('tryBoardReel8(', ''), 'a tryBoardReel call survived'
open(P, 'w').write(s)
print('patched %s: %d -> %d chars' % (P, len(orig), len(s)))
