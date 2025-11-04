from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from src.api.config.settings import ALLOWED_ORIGINS, API_PREFIX
from src.api.routes import profile, detection, analysis, skin_plan, timeseries
from src.db.user_profile_db import init_db
import os

app = FastAPI(
    title="Acne Tracker Analysis API",
    description="API for skin condition detection and analysis",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Include API routers
app.include_router(profile.router, prefix=API_PREFIX)
app.include_router(detection.router, prefix=API_PREFIX)
app.include_router(analysis.router, prefix=API_PREFIX)
app.include_router(skin_plan.router, prefix=API_PREFIX)
app.include_router(timeseries.router, prefix=API_PREFIX)

# Serve frontend static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


# Serve the frontend index.html at root and any other paths
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    index_path = os.path.join("frontend", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Frontend not found"}


# Optional API root endpoint
@app.get("/api")
async def root():
    return {
        "message": "Acne Tracker Analysis API is running",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
    }