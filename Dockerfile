# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend & Final Image
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies (for OpenCV, etc.)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./

# Copy built frontend from Stage 1 to static/dist directory
RUN mkdir -p static/dist
COPY --from=frontend-builder /app/frontend/dist ./static/dist

# Expose port (Cloud Run uses PORT env var, but 8080 is a good default)
EXPOSE 8080

# Run the application using uvicorn directly
# This is more robust than calling python main.py
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
