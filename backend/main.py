from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image
import base64
from detect import load_model, predict_image

app = FastAPI(title="OvoScan AI Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup (prefers best.onnx)
model = load_model("model/weights/best.onnx")

@app.get("/")
async def root():
    return {"message": "OvoScan AI API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), conf: float = 0.05):
    """
    Receives an image, runs YOLO detection via detect.py, 
    and returns predictions plus an annotated base64 image.
    """
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Call the refactored function from detect.py
        predictions, annotated_image = predict_image(model, image, conf=conf)
        print(f"Detected {len(predictions)} boxes")
        
        # Convert annotated PIL image to base64 for frontend display
        buffered = io.BytesIO()
        annotated_image.save(buffered, format="JPEG", quality=90)
        img_str = base64.b64encode(buffered.getvalue()).decode()
                
        return {
            "success": True,
            "predictions": predictions,
            "image": f"data:image/jpeg;base64,{img_str}"
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    # Standard port for OvoScan backend
    uvicorn.run(app, host="0.0.0.0", port=8888)
