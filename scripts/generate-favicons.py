from pathlib import Path
from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parents[1] / "public"
SIZE = 512

def make_icon(size: int, maskable: bool = False) -> Image.Image:
    image = Image.new("RGB", (SIZE, SIZE), "#f6f1e6")
    draw = ImageDraw.Draw(image)
    inset = 68 if maskable else 42
    draw.rounded_rectangle((inset, inset, SIZE - inset, SIZE - inset), radius=88, fill="#123f36")
    scale = (SIZE - 2 * inset) / 100
    points = [(20, 20), (82, 20), (82, 35), (47, 72), (84, 72), (84, 86), (16, 86), (16, 72), (51, 35), (20, 35)]
    draw.polygon([(inset + x * scale, inset + y * scale) for x, y in points], fill="#f8f4ea")
    y = inset + 80 * scale
    draw.rounded_rectangle((inset + 13 * scale, y, inset + 87 * scale, y + 5 * scale), radius=3 * scale, fill="#c7a668")
    return image.resize((size, size), Image.Resampling.LANCZOS)

make_icon(48).save(PUBLIC / "favicon-48x48.png", optimize=True)
make_icon(180).save(PUBLIC / "apple-touch-icon.png", optimize=True)
make_icon(192).save(PUBLIC / "icon-192.png", optimize=True)
make_icon(512).save(PUBLIC / "icon-512.png", optimize=True)
make_icon(512, maskable=True).save(PUBLIC / "icon-512-maskable.png", optimize=True)
make_icon(64).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print("Favicon set generated.")
