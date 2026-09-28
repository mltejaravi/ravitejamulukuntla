**Optical Character Recognition (OCR)** turns pictures of text into real text you can search, store and process. **Tesseract** is a free, open-source OCR engine originally developed at HP and now maintained by Google, and it pairs beautifully with Python.

## Step 1: Install the Tesseract engine

The Python package is only a wrapper. You need the engine itself installed on your machine.

**macOS** (with Homebrew):

```bash
brew install tesseract
tesseract --version
```

**Windows:**

1. Download the installer from the [UB Mannheim Tesseract builds](https://github.com/UB-Mannheim/tesseract/wiki).
2. Install it (the default path is `C:\Program Files\Tesseract-OCR`).
3. Add that folder to your **PATH**, or point Python to it (shown below).

**Ubuntu / Debian:**

```bash
sudo apt install tesseract-ocr
```

## Step 2: Install the Python packages

```bash
pip install pytesseract pillow opencv-python
```

## Step 3: Your first OCR script

```python
from PIL import Image
import pytesseract

# Windows only, if Tesseract is not on your PATH:
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

text = pytesseract.image_to_string(Image.open("invoice.png"))
print(text)
```

That's it: five lines and you are reading text from an image.

## Step 4: Improve accuracy with preprocessing

Tesseract works best on clean, high-contrast, black-on-white text. A little OpenCV goes a long way:

```python
import cv2
import pytesseract

img = cv2.imread("invoice.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
_, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

print(pytesseract.image_to_string(thresh))
```

1. **Grayscale** removes colour noise.
2. **Upscaling** helps with small fonts.
3. **Otsu thresholding** gives crisp black-and-white text.

## Step 5: Page segmentation modes (PSM)

PSM tells Tesseract what kind of layout to expect. Choosing the right one often fixes "garbage" output instantly.

| PSM | Use it for |
|---|---|
| `3` | Fully automatic page layout (default) |
| `6` | A single uniform block of text |
| `7` | A single line of text, e.g. a number plate |
| `8` | A single word |
| `11` | Sparse text scattered across the image |

```python
config = "--oem 3 --psm 7"
plate = pytesseract.image_to_string(thresh, config=config)
```

## Step 6: Get bounding boxes

Want to know *where* each word is? Use `image_to_data`:

```python
from pytesseract import Output

data = pytesseract.image_to_data(thresh, output_type=Output.DICT)
for i, word in enumerate(data["text"]):
    if word.strip() and int(data["conf"][i]) > 60:
        x, y, w, h = data["left"][i], data["top"][i], data["width"][i], data["height"][i]
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

cv2.imwrite("boxes.png", img)
```

## What's next?

In the rest of the course we use these building blocks to build a **Number Plate Recognition** system and to **search documents with regex**. Start with Part 1 above and follow along!
