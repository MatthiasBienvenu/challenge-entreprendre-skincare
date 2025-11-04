import os
from pathlib import Path

# Base directory paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
BACK_DIR = BASE_DIR.parent

# Model paths
MODEL_WEIGHTS_PATH = os.path.join(BACK_DIR, "src", "detection", "best.pt")

# Database paths
DB_PATH = os.path.join(BACK_DIR, "tsa", "acne_tracker.db")

# API settings
ALLOWED_ORIGINS = [
    # Streamlit (si tu l'utilises)
    "http://localhost:8501",
    "http://127.0.0.1:8501",
    # TON front actuel
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    # Vite (dev)
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # Prod
    "https://192.168.152.9:8000",
    "https://192.168.152.9",
    "https://localhost",
]

# File upload settings
ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/bmp"]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Security settings
API_PREFIX = "/api/v1"
