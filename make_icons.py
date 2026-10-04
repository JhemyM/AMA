import os
from PIL import Image

src = r"C:\Users\virei\.gemini\antigravity-ide\brain\366a5342-a987-4dfd-bcdf-a9706cdb9a9b\agra_logo_1791110631333.jpg"
os.makedirs('icons', exist_ok=True)

img = Image.open(src)
img.resize((192, 192), Image.Resampling.LANCZOS).save('icons/icon-192.png')
img.resize((512, 512), Image.Resampling.LANCZOS).save('icons/icon-512.png')

print("Icons created successfully.")
