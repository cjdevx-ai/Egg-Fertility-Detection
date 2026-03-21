# OvoScan AI - Egg Fertility Detection Platform

OvoScan AI is a state-of-the-art platform designed for commercial hatcheries to automate and optimize egg fertility detection using deep learning and computer vision.

## Project Structure

The project is divided into two main components:

### Backend
A FastAPI-based REST API that serves a YOLO-based computer vision model exported to ONNX format.
- **Model:** YOLO Detection (ONNX)
- **Framework:** FastAPI
- **Inference:** Ultralytics / ONNX Runtime
- **Capabilities:**
  - REST endpoint for static image prediction.
  - MJPEG streaming for real-time video camera feed with overlaid detections.

### Frontend
A premium landing page built with modern web technologies.
- **Framework:** Tailwind CSS (via PlayCDN)
- **Language:** TypeScript
- **Design:** Glassmorphism with bioluminescent animated background effects.
- **Build Tool:** Vite

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - Windows: `.venv\Scripts\activate`
   - Linux/macOS: `source .venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the application:
   ```bash
   python main.py
   ```
   The API will be available at http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173 (or the port specified by Vite).

## Key Visual Principles

- **Glassmorphism:** Components use backdrop filters and semi-transparent backgrounds to create depth and a modern aesthetic.
- **Bioluminescent Theme:** A custom canvas-based particle system mimics cellular and biological movement, reinforcing the "life detection" theme.
- **High-Performance Inference:** The system is optimized for sub-second scanning using ONNX exports of the underlying neural network.

## Technical Requirements

- Python 3.10+
- Node.js 18+
- Webcam (for live video feed demo)

## License

Copyright 2024 OvoScan AI Technologies Inc. All rights reserved.
