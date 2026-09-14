#!/usr/bin/env python3
# cover-gen.py — Stego-2 cover generator (v2).
# Usage: python3 cover-gen.py <gz_len> <out.bmp> [preview.png]
# Sizes the smallest ~4:3 24-bit cover (w%4==0) holding gz_len + 96KB decoy
# alloc at <=35% corruption, then renders a busy dark-red concert scene with a
# pre-grained noise floor (scattered-byte camouflage). Deterministic: SEED.
import sys, math, random
from PIL import Image, ImageDraw

SEED = 0x57E602
DECOY_ALLOC = 98304

def main():
    gz_len, out_bmp = int(sys.argv[1]), sys.argv[2]
    preview = sys.argv[3] if len(sys.argv) > 3 else None
    total = gz_len + DECOY_ALLOC + 64
    px_need = math.ceil(total / 0.35 / 3)
    best = None
    for w in range(640, 1400, 4):
        h = math.ceil(px_need / w); h += h % 2
        if w * h >= px_need and abs(w / h - 4 / 3) < 0.09:
            if best is None or w * h < best[0] * best[1]:
                best = (w, h)
    w, h = best
    cap = w * h * 3
    print(f'cover {w}x{h} cap={cap} corruption={total/cap:.1%} runner_bmp_b64~{(54+cap)*4//3} bytes')
    random.seed(SEED)
    img = Image.new('RGB', (w, h))
    d = ImageDraw.Draw(img)
    # dark-red gradient, 256 jittered bands (no banding stripes)
    for i in range(256):
        t = i / 255
        j = random.randint(-6, 6)
        d.rectangle([0, t*h, w, (i+1)/256*h + 1],
                    fill=(max(0, min(255, int(70+100*t)+j)),
                          max(0, min(255, int(10+20*t)+j)),
                          max(0, min(255, int(16+24*t)+j))))
    # light beams
    for _ in range(6):
        x0 = random.randint(0, w); spread = random.randint(30, 90)
        d.polygon([(x0, 0), (x0+spread, 0), (x0+spread+120, h), (x0+120, h)],
                  fill=(random.randint(150, 200), random.randint(40, 70), random.randint(50, 80)))
    # crowd silhouettes along the bottom
    for _ in range(160):
        x = random.randint(0, w); r = random.randint(6, 16); y = h - random.randint(0, h//5)
        d.ellipse([x-r, y-r, x+r, y+r],
                  fill=(random.randint(5, 25), random.randint(2, 10), random.randint(5, 12)))
    # confetti everywhere (busy = grain camouflage)
    pal = [(255, 80, 80), (255, 160, 60), (255, 220, 120), (255, 255, 255), (200, 60, 90), (120, 200, 255)]
    for _ in range(7000):
        x, y = random.randint(0, w-1), random.randint(0, h-1)
        c = random.choice(pal)
        if random.random() < 0.5:
            d.rectangle([x, y, x+random.randint(1, 3), y+random.randint(1, 3)], fill=c)
        else:
            d.ellipse([x, y, x+2, y+2], fill=c)
    # centered grain: blend toward noise (no brightness shift)
    nz = Image.effect_noise((w, h), 25).convert('RGB')
    img = Image.blend(img, nz, 0.15)
    img.save(out_bmp, 'BMP')
    if preview:
        img.save(preview, 'PNG')
    print(f'saved {out_bmp}' + (f' + {preview}' if preview else '') + f', seed=0x{SEED:X}')

if __name__ == '__main__':
    main()
