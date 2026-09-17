# Stego-3 G1 prototype: low-visibility quantization embedding (LSB matching).
# Embeds random payload (ciphertext stand-in) at N bits/byte over the R region,
# then reports grain metrics + renders previews. Scatter order irrelevant for looks.
import os, math, io
from PIL import Image
SRC = '/home/user/JSArchive/Uploads/stego2-cover.bmp'
PIXOFF, BAND, R = 54, 98304, 1389696
PAYLEN = 469340 + 4  # r2 real gz + u32 length
raw = open(SRC, 'rb').read()
assert len(raw) == 1488054, len(raw)
def embed(nbits):
    mask = (1 << nbits) - 1
    blob = os.urandom(PAYLEN)
    need = PAYLEN * 8
    nbytes = (need + nbits - 1) // nbits
    assert nbytes <= R, (nbytes, R)
    out = bytearray(raw)
    bi = 0
    for i in range(nbytes):
        v = 0
        for _ in range(nbits):
            if bi >= need: break
            v = (v << 1) | ((blob[bi >> 3] >> (7 - (bi & 7))) & 1)
            bi += 1
        p = PIXOFF + BAND + i
        out[p] = (out[p] & (0xFF ^ mask)) | v
    return bytes(out), nbytes
def metrics(stego):
    s = 0; m = 0; ch = 0; n = len(raw) - PIXOFF
    for i in range(PIXOFF, len(raw)):
        d = abs(stego[i] - raw[i])
        if d: ch += 1
        if d > m: m = d
        s += d * d
    mse = s / n
    return m, math.sqrt(mse), 10 * math.log10(65025 / mse), ch / n * 100
imgs = {'pristine': Image.open(SRC).convert('RGB')}
for nb in (3, 4):
    stego, nbytes = embed(nb)
    m, rmse, psnr, pct = metrics(stego)
    print(f'{nb}-bit: R-util={nbytes/R*100:.0f}% maxΔ={m} rmse={rmse:.2f} PSNR={psnr:.1f}dB bytes-changed={pct:.1f}%', flush=True)
    im = Image.open(io.BytesIO(stego)).convert('RGB')
    im.save(f'/home/user/stego3-draft-{nb}bit.png')
    imgs[f'{nb}bit'] = im
imgs['pristine'].save('/home/user/stego3-draft-pristine.png')
crop = lambda im: im.crop((200, 200, 600, 400))  # 400x200 center 1:1
strip = Image.new('RGB', (400 * 3 + 16, 200), (255, 255, 255))
for x, k in enumerate(['pristine', '3bit', '4bit']):
    strip.paste(crop(imgs[k]), (x * 408, 0))
strip.save('/home/user/stego3-draft-crops.png')
print('previews saved')
