#!/usr/bin/env python3
"""Remove a smooth gradient (studio) background via nearest-border-color estimation
+ connected-component filter + edge feathering.
Usage: python3 make_transparent.py <input> <output> [tolerance]
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

def remove_background(src, dst, tolerance=26):
    im = Image.open(src).convert('RGB')
    arr = np.asarray(im).astype(np.float32)
    h, w = arr.shape[:2]

    # --- Background surface estimate: color of the nearest border pixel ---
    border_mask = np.zeros((h, w), dtype=bool)
    border_mask[0, :] = border_mask[-1, :] = True
    border_mask[:, 0] = border_mask[:, -1] = True
    dist, idx = ndimage.distance_transform_edt(~border_mask, return_indices=True)
    ny, nx = idx  # index of nearest border pixel for every pixel
    bg_est = arr[ny, nx]

    dist_to_bg = np.sqrt(((arr - bg_est) ** 2).sum(axis=2))

    # Candidate background: close to the local bg estimate AND far from any strong edge
    near_bg = dist_to_bg < tolerance

    # Keep only background components touching the image border
    lab, n = ndimage.label(near_bg)
    border_labels = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])
    border_labels.discard(0)
    connected = np.isin(lab, list(border_labels))

    # Feather the alpha edge
    alpha = np.where(connected, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(1.4))
    alpha = np.asarray(alpha_img)

    out = np.dstack([arr.astype(np.uint8), alpha])
    Image.fromarray(out, 'RGBA').save(dst)

    # also save a debug look at the alpha mask
    frac = connected.mean()
    return frac

if __name__ == '__main__':
    frac = remove_background(sys.argv[1], sys.argv[2],
                             float(sys.argv[3]) if len(sys.argv) > 3 else 26)
    print(f"removed {frac:.1%} of pixels as background")
