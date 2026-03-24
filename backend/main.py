from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import io
import os
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
model_path = os.path.join(os.path.dirname(__file__), "model", "weights", "best.onnx")
model = load_model(model_path)

@app.post("/api/predict")
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

# Serve Static Files (Frontend)
# We assume the frontend/dist folder is copied to /app/static in Docker
static_path = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_path):
    app.mount("/", StaticFiles(directory=static_path, html=True), name="static")

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    # This ensures React Router / SPA works
    index_file = os.path.join(static_path, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "OvoScan AI API is running"}

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for Cloud Run, default to 8080
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
