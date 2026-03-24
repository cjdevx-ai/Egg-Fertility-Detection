# OvoScan AI - Egg Fertility Detection Platform

OvoScan AI is a high-performance platform designed for commercial hatcheries to automate egg fertility detection using deep learning and computer vision.

## Tech Stack

### Frontend
- React 19 (TypeScript)
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- Iconify (Icon Framework)
- Glassmorphism UI Design

### Backend
- Python 3.12
- FastAPI (REST API Framework)
- Uvicorn (ASGI Server)
- Static File Serving (SPA Support)

### AI and Computer Vision
- YOLO (Ultralytics)
- ONNX Runtime (High-performance Inference)
- OpenCV (Image Processing)
- Pillow (PIL)

### Deployment
- Docker (Multi-stage Build)
- Google Cloud Run Ready
- Monolith Architecture

## Project Structure

The project uses a monolithic architecture where the FastAPI backend serves both the API endpoints and the static frontend assets.

- /backend: Python source code, requirements, and AI model weights.
- /frontend: React source code and build configuration.
- /Dockerfile: Multi-stage build for producing a single deployment image.

## Getting Started

### Docker Deployment (Recommended)

To build and run the entire project as a single container:

1. Build the image:
   ```bash
   docker build -t ovoscan-ai .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 ovoscan-ai
   ```
   The application will be available at http://localhost:8080.

### Google Cloud Run

This project is configured for direct deployment to Google Cloud Run.

1. Submit to Google Cloud Build:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/ovoscan-ai
   ```

2. Deploy to Cloud Run:
   ```bash
   gcloud run deploy ovoscan-ai --image gcr.io/PROJECT_ID/ovoscan-ai --platform managed
   ```

### Local Development

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the API:
   ```bash
   python main.py
   ```
   Note: For local development, the backend listens on port 8080 by default.

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173. Ensure the backend is running for API features.

## Visual Principles

- Glassmorphism: Semi-transparent surfaces and backdrop filters for depth.
- Bioluminescent Theme: Particle systems mimicking biological life.
- Real-time Diagnostics: Sub-second inference for immediate fertility feedback.

## Technical Requirements

- Python 3.10+
- Node.js 20+
- Docker (for containerized deployment)

## License

Copyright 2024 OvoScan AI Technologies Inc. All rights reserved.
