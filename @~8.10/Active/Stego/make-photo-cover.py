#!/usr/bin/env python3
"""Stego-2 cover v3: derive from the pristine concert photo (not synthetic).

Source: Uploads/stego2-cover-source.png (618x408, the Stego-1 pristine look).
Steps: center-crop to 800:620 aspect -> LANCZOS upscale 800x620 -> subtle
film grain (masks upscale softness, matches scattered-payload grain) ->
24-bit BMP. Also renders preview + simulated-stego preview (decoy band +
30.4% scatter) so the fried look can be judged before the real build.
Deterministic (seed 0xC0FFEE).
"""
import hashlib
import random
import sys
from PIL import Image

SRC = "/home/user/JSArchive/Uploads/stego2-cover-source.png"
OUT_BMP = "/home/user/JSArchive/Uploads/stego2-cover.bmp"
OUT_PREVIEW = "/home/user/cover3-preview.png"
OUT_SIM = "/home/user/cover3-simulated.png"
W, H = 800, 620
PIX_OFF = 54
ROWB = W * 3  # 2400, no BMP padding
DECOY_BAND = 98304      # 96 KiB contiguous decoy block (Stego-1 layout)
SCATTER_N = 422346      # real payload bytes (S6 min->gzip, frozen)
CAP = W * H * 3         # 1488000

img = Image.open(SRC).convert("RGB")
print("src:", img.size)
# center-crop to 800:620 aspect (1.29032): keep full height, crop width
cw = int(img.height * W / H)
x0 = (img.width - cw) // 2
img = img.crop((x0, 0, x0 + cw, img.height))
print("cropped:", img.size)
img = img.resize((W, H), Image.LANCZOS)

# subtle film grain (deterministic)
rnd = random.Random(0xC0FFEE)
px = list(img.getdata())
g = [tuple(max(0, min(255, int(c + rnd.gauss(0, 2.2)))) for c in p) for p in px]
img.putdata(g)
img.save(OUT_BMP)
img.save(OUT_PREVIEW)
raw = open(OUT_BMP, "rb").read()
print("bmp:", len(raw), "bytes, sha256:", hashlib.sha256(raw).hexdigest())
print("budget: real %d + decoy %d = %.3f%% of %d" %
      (SCATTER_N, DECOY_BAND, 100.0 * (SCATTER_N + DECOY_BAND) / CAP, CAP))

# ---- simulated stego: decoy band + 30.4% full-random scatter ----
sim = list(img.getdata())
rnd2 = random.Random(0xDEC09)
n_pix = W * H


def set_channel(idx, val):
    yb, rem = divmod(idx, ROWB)
    x, ch = divmod(rem, 3)
    y = (H - 1) - yb  # BMP bottom-up -> PIL top-down
    p = sim[y * W + x]
    sim[y * W + x] = (val if ch == 0 else p[0],
                      val if ch == 1 else p[1],
                      val if ch == 2 else p[2])


for idx in range(DECOY_BAND):  # decoy band: bottom rows, full static
    set_channel(idx, rnd2.randrange(256))
for idx in rnd2.sample(range(DECOY_BAND, CAP), SCATTER_N):  # scatter
    set_channel(idx, rnd2.randrange(256))
img2 = Image.new("RGB", (W, H))
img2.putdata(sim)
img2.save(OUT_SIM)
print("sim saved:", OUT_SIM)
