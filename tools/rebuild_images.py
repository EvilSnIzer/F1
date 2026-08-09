#!/usr/bin/env python3
"""Rebuild all site images as browser-safe formats:
- Liveries: RGBA PNG24 (true alpha, universally supported) -> {team}-car.png
- Driver PNGs: convert palette-mode to RGBA PNG24
- Repair any corrupt source JPEGs
Run: python3 tools/rebuild_images.py
"""
import os, sys, subprocess, glob
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from build_liveries import SRC, alpha_safe_quantize  # reuse source map + crop logic

TOL = 30
THRESH = 32

def to_rgba_png24(im, max_w=720):
    """RGBA PNG24 (truecolor+alpha). No palette, no quantization."""
    im = im.convert('RGBA')
    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, max(1, int(h * max_w / w))), Image.LANCZOS)
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.paste(im, (0, 0), im)
    return out

def flood_cut(src, tol=TOL, thresh=THRESH):
    """Run flood-fill background removal -> RGBA cutout (cropped to car)."""
    tmp = f'/tmp/liv/{os.path.basename(src)}.{os.getpid()}.png'
    subprocess.run([sys.executable, 'tools/make_transparent.py', src, tmp, str(tol)],
                   capture_output=True, check=True)
    im = Image.open(tmp).convert('RGBA')
    a = np.asarray(im.getchannel('A'))
    ys, xs = np.where(a > thresh)
    if len(ys):
        m = int(0.03 * max(im.size))
        x0, x1 = max(0, xs.min() - m), min(im.size[0], xs.max() + m)
        y0, y1 = max(0, ys.min() - m), min(im.size[1], ys.max() + m)
        im = im.crop((x0, y0, x1, y1))
    os.remove(tmp)
    return im

# ---------- 1) Liveries -> RGBA PNG24 with fresh names ----------
os.makedirs('/tmp/liv', exist_ok=True)
print("=== liveries (RGBA PNG24) ===")
for key, src in SRC.items():
    cut = flood_cut(src)
    out = to_rgba_png24(cut)
    dst = f'images/teams/{key}-car.png'
    out.save(dst, 'PNG', optimize=True)
    a = np.asarray(Image.open(dst).convert('RGBA').getchannel('A'))
    ok = a.max() == 255 and (a > 200).mean() > 0.1
    print(f"  {key:10s} {out.size} {os.path.getsize(dst)//1024:4d}KB  opaque={(a>200).mean()*100:5.1f}%  {'OK' if ok else 'CHECK'}")

# ---------- 2) Driver palette PNGs -> RGBA PNG24 ----------
print("=== drivers ===")
for p in glob.glob('images/drivers/*.png'):
    im = Image.open(p)
    if im.mode in ('P', 'LA'):
        rgba = im.convert('RGBA')
        rgba.save(p, 'PNG', optimize=True)
        v = Image.open(p)
        print(f"  converted {p} {v.mode} -> {os.path.getsize(p)//1024}KB")
    else:
        print(f"  ok {p} {im.mode}")

# ---------- 3) Repair corrupt mclaren.jpg ----------
print("=== repair ===")
mcl_srcs = glob.glob('image-search/mclaren-mcl40-2026-f1-car-livery-officia-*')
if not os.path.exists('images/teams/mclaren.jpg') or True:
    try:
        Image.open('images/teams/mclaren.jpg').verify()
        print("  mclaren.jpg OK")
    except Exception:
        if mcl_srcs:
            im = Image.open(mcl_srcs[0]).convert('RGB')
            im.save('images/teams/mclaren.jpg', 'JPEG', quality=85, optimize=True)
            print(f"  repaired mclaren.jpg from {mcl_srcs[0].split('/')[-1]}")
        else:
            print("  WARNING: no mclaren source found")
print("done")
