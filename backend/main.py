from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import io
import os
import logging
from PIL import Image
import base64
from detect import load_model, predict_image

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ovoscan-ai")

# Model will be loaded globally during lifespan
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    try:
        logger.info("Starting up: Loading model...")
        # Path inside the container: /app/model/weights/best.onnx
        model_path = os.path.join(os.path.dirname(__file__), "model", "weights", "best.onnx")
        
        if not os.path.exists(model_path):
            logger.error(f"Model not found at {model_path}!")
            # Check if it might be in backend/model/...
            alt_path = os.path.join(os.path.dirname(__file__), "backend", "model", "weights", "best.onnx")
            if os.path.exists(alt_path):
                model_path = alt_path
                logger.info(f"Found model at alternative path: {model_path}")

        if os.path.exists(model_path):
            model = load_model(model_path)
            logger.info("Model loaded successfully.")
        else:
            logger.error("No model file found. Predictions will fail.")
            
    except Exception as e:
        logger.error(f"Critical error loading model: {e}")
    yield
    logger.info("Shutting down...")

app = FastAPI(title="OvoScan AI Backend", lifespan=lifespan)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    """Liveness/Readiness probe for Cloud Run."""
    if model is None:
        return {"status": "starting", "model": "loading or missing"}
    return {"status": "ok", "model": "ready"}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...), conf: float = 0.05):
    """
    Receives an image, runs YOLO detection via detect.py, 
    and returns predictions plus an annotated base64 image.
    """
    if model is None:
        return {"success": False, "error": "Model not yet initialized"}
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Call the refactored function from detect.py
        predictions, annotated_image = predict_image(model, image, conf=conf)
        logger.info(f"Inference complete: detected {len(predictions)} objects")
        
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
        logger.exception("Error during prediction")
        return {"success": False, "error": str(e)}

# Serve Static Files (Frontend)
# In Docker, we copy the frontend/dist folder to /app/static/dist
static_path = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(os.path.join(static_path, "dist")):
    static_path = os.path.join(static_path, "dist")
    logger.info(f"Serving frontend from {static_path}")

# Mount /assets specifically if it exists to ensure JS/CSS load
assets_path = os.path.join(static_path, "assets")
if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
    logger.info(f"Mounted /assets from {assets_path}")

# Catch-all for SPA (must be LAST)
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    # This ensures React Router / SPA works
    index_file = os.path.join(static_path, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    
    # Fallback for API status
    return {"status": "running", "api": "OvoScan AI", "message": "Frontend assets not found"}

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for Cloud Run, default to 8080
    port = int(os.environ.get("PORT", 8080))
    logger.info(f"Starting server on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
