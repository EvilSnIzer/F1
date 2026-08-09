#!/usr/bin/env python3
"""Build final transparent livery PNGs from official 2026 sources.
Usage: python3 tools/build_liveries.py
"""
import os, sys, subprocess, glob
import numpy as np
from PIL import Image

SRC = {
    'mercedes': 'image-search/2026-f1-livery-reveal-mercedes-w17-offic-1.jpg',
    'ferrari':  'image-search/ferrari-sf-26-2026-f1-car-livery-officia-2.webp',
    'redbull':  'image-search/2026-red-bull-rb26-full-car-side-view-la-1.webp',
    'mclaren':  'image-search/mclaren-mcl40-2026-f1-car-livery-officia-1.jpg',
    'aston':    'image-search/aston-martin-amr26-2026-side-view-green--1.webp',
    'alpine':   'image-search/alpine-a525-2026-f1-car-livery-official--1.jpg',
    'rb':       'image-search/2026-red-bull-rb26-full-car-side-view-la-2.webp',
    'haas':     'image-search/haas-vf-26-2026-reveal-studio-render-whi-2.jpg',
    'audi':     'image-search/audi-f1-2026-car-livery-official-photo-l-2.jpg',
    'williams': 'image-search/williams-fw48-2026-f1-car-livery-officia-1.webp',
    'cadillac': 'image-search/cadillac-f1-2026-car-official-render-stu-1.jpg',
}
TOL = 30
THRESH = 32   # alpha below this -> fully transparent

def alpha_safe_quantize(im, max_w=640, thresh=THRESH):
    im = im.convert('RGBA')
    # crop to opaque bounding box + 4% margin so the car fills the frame
    a_full = np.asarray(im.getchannel('A'))
    ys, xs = np.where(a_full > thresh)
    if len(ys):
        m = int(0.04 * max(im.size))
        x0, x1 = max(0, xs.min() - m), min(im.size[0], xs.max() + m)
        y0, y1 = max(0, ys.min() - m), min(im.size[1], ys.max() + m)
        im = im.crop((x0, y0, x1, y1))
    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, max(1, int(h * max_w / w))), Image.LANCZOS)
    rgb = im.convert('RGB')
    alpha = np.asarray(im.getchannel('A'))
    p = rgb.quantize(colors=255, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
    pal = np.asarray(p.getpalette()[:255 * 3]).reshape(255, 3)
    full_pal = np.vstack([pal, [0, 0, 0]]).flatten().tolist()
    idx = np.asarray(p)
    out_idx = np.where(alpha < thresh, 255, idx).astype(np.uint8)
    out = Image.fromarray(out_idx, 'P')
    out.putpalette(full_pal)
    out.info['transparency'] = bytes([0] * 255 + [255])
    return out

os.makedirs('/tmp/liv', exist_ok=True)
for key, src in SRC.items():
    tmp = f'/tmp/liv/{key}.png'
    subprocess.run([sys.executable, 'tools/make_transparent.py', src, tmp, str(TOL)],
                   capture_output=True, check=True)
    im = Image.open(tmp).convert('RGBA')
    out = alpha_safe_quantize(im)
    dst = f'images/teams/{key}-livery.png'
    out.save(dst, optimize=True)
    a = np.asarray(Image.open(dst).convert('RGBA').getchannel('A'))
    ys, xs = np.where(a > 127)
    w, h = out.size
    fill = len(ys) / (w * h) * 100 if len(ys) else 0
    print(f"{key:10s} {out.size} {os.path.getsize(dst)//1024:4d}KB transp={(a==0).mean()*100:5.1f}% car_fill={fill:4.1f}%")
print("done")
