# OvoScan AI - Egg Fertility Detection Platform

OvoScan AI is a high-performance, automated platform designed for commercial hatcheries to detect egg fertility using advanced deep learning and computer vision.

## Tech Stack Overview

### Frontend Architecture
- **React 19**: Utilizing the latest React features for a responsive and modern user interface.
- **TypeScript**: Ensuring type safety and robust code across the frontend application.
- **Vite**: Providing a lightning-fast development environment and optimized production builds.
- **Tailwind CSS**: Implementing a custom design system with a focus on Glassmorphism and modern aesthetics.
- **Lucide React & Iconify**: Integration of high-quality vector icons for a polished visual experience.
- **HTML5 Canvas**: Custom particle systems for bioluminescent background effects.

### Backend Services
- **Python 3.12**: Leveraging the latest Python version for performance and modern language features.
- **FastAPI**: A high-performance web framework for building APIs with Python, providing automatic documentation and validation.
- **Uvicorn**: An ASGI web server implementation for Python, optimized for speed.
- **Static Asset Serving**: Integrated support for serving the Single Page Application (SPA) directly from the backend.

### Artificial Intelligence & Computer Vision
- **YOLO (Ultralytics)**: State-of-the-art object detection model for real-time fertility identification.
- **ONNX Runtime**: High-performance inference engine for executing machine learning models across different hardware.
- **OpenCV**: Advanced image processing library for frame manipulation and pre-processing.
- **Pillow (PIL)**: Specialized library for high-quality image annotation and final output rendering.
- **NumPy**: Efficient numerical computations for handling multi-dimensional arrays and matrices.

### Infrastructure & Deployment
- **Docker**: Containerization using multi-stage builds to produce a single, optimized deployment image.
- **Monolith Architecture**: Combined backend and frontend for simplified deployment and reduced latency.
- **Google Cloud Run Ready**: Configured for serverless deployment with environment-based port mapping and stateless execution.

## Project Structure

- **backend/**: Contains the FastAPI application, the YOLO model weights, and the computer vision logic.
- **frontend/**: Contains the React source code, components, and styling configurations.
- **Dockerfile**: Defines the multi-stage build process for the entire application.
- **.dockerignore**: Specifies files and directories to be excluded from the Docker build context.

## Getting Started

### Docker Deployment

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
4. Start the application:
   ```bash
   python main.py
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173.

## Visual Design Principles

- **Glassmorphism**: Use of semi-transparent backgrounds and backdrop filters to create depth.
- **Bioluminescence**: A color palette and animation style inspired by biological life and advanced technology.
- **Real-time Feedback**: Minimal latency between image capture and AI-driven diagnostic results.

## Technical Requirements

- Python 3.10 or higher
- Node.js 20 or higher
- Docker (for containerized deployment)

## License

Copyright 2024 OvoScan AI Technologies Inc. All rights reserved.
