from ultralytics import YOLO
import cv2
import numpy as np
import io
import os
from PIL import Image, ImageDraw

def load_model(model_path="model/weights/best.onnx"):
    """Loads the YOLO model (prefers ONNX for API performance)."""
    if not os.path.exists(model_path):
        # Fallback to .pt if .onnx is missing
        model_path = model_path.replace(".onnx", ".pt")
    return YOLO(model_path, task="detect")

def annotate_pil(pil_img: Image.Image, result, line_width=4, show_labels=True, show_conf=True) -> Image.Image:
    """Draws custom Cyan/Purple bounding boxes on a PIL image with better visibility."""
    annotated = pil_img.copy()
    draw = ImageDraw.Draw(annotated)
    names = result.names if hasattr(result, "names") else {}

    if result.boxes is None or len(result.boxes) == 0:
        return annotated

    boxes = result.boxes.xyxy
    clss = result.boxes.cls
    confs = result.boxes.conf

    if hasattr(boxes, 'cpu'): boxes = boxes.cpu().numpy()
    if hasattr(clss, 'cpu'): clss = clss.cpu().numpy()
    if hasattr(confs, 'cpu'): confs = confs.cpu().numpy()

    # Calculate font size relative to image height
    img_h = annotated.height
    font_size = max(18, int(img_h * 0.025))
    
    # Try to load a font, fallback to default
    try:
        from PIL import ImageFont
        # Common paths for Windows/Linux
        font_paths = ["C:\\Windows\\Fonts\\arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
        font = None
        for p in font_paths:
            if os.path.exists(p):
                font = ImageFont.truetype(p, font_size)
                break
        if not font:
            font = ImageFont.load_default()
    except:
        font = None

    for (x1, y1, x2, y2), c, p in zip(boxes, clss, confs):
        x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
        # Cyan for fertile (0), Purple for infertile (1)
        color = (6, 182, 212) if int(c) == 0 else (168, 85, 247)

        # Draw thick border
        for t in range(line_width):
            draw.rectangle([x1 - t, y1 - t, x2 + t, y2 + t], outline=color)

        if show_labels:
            label = names.get(int(c), str(int(c)))
            if show_conf:
                label = f"{label} {float(p):.2f}"

            if font:
                left, top, right, bottom = draw.textbbox((0, 0), label, font=font)
                tw, th = right - left, bottom - top
            else:
                tw, th = len(label) * 10, 20
            
            pad = 6
            y0 = max(0, y1 - th - 2 * pad)
            # Background for label
            draw.rectangle([x1, y0, x1 + tw + 2 * pad, y1], fill=color)
            # Text
            if font:
                draw.text((x1 + pad, y0 + pad), label, fill=(255, 255, 255), font=font)
            else:
                draw.text((x1 + pad, y0 + pad), label, fill=(255, 255, 255))

    return annotated

def predict_image(model, image_input, conf=0.25):
    """
    Performs inference and returns predictions + annotated PIL image.
    image_input can be PIL Image, numpy array, or path.
    """
    # Convert image for YOLO if it's a PIL image
    img_for_yolo = np.array(image_input) if isinstance(image_input, Image.Image) else image_input
    
    results = model.predict(img_for_yolo, imgsz=320, conf=conf, verbose=False)
    result = results[0]
    
    predictions = []
    for box in result.boxes:
        predictions.append({
            "bbox": box.xyxy[0].tolist(),
            "confidence": float(box.conf[0]),
            "class": int(box.cls[0]),
            "name": model.names[int(box.cls[0])]
        })
    
    # Ensure we have a PIL image for the custom annotation
    pil_image = image_input if isinstance(image_input, Image.Image) else Image.fromarray(cv2.cvtColor(image_input, cv2.COLOR_BGR2RGB))
    annotated_image = annotate_pil(pil_image, result)
    
    return predictions, annotated_image

if __name__ == "__main__":
    # Simple CLI test
    m = load_model()
    test_path = "egg_fertility_data/test/fertile/test fertile egg (1).jpg"
    if os.path.exists(test_path):
        img = Image.open(test_path)
        preds, ann = predict_image(m, img)
        ann.save("debug_result.jpg")
        print(f"Detected {len(preds)} boxes. Saved to debug_result.jpg")
    else:
        print(f"Test image not found at {test_path}")
