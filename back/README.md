# Installation

```bash
cd back
uv sync
```

# Usage

```bash
cd back

# initialize the database
uv run src/db/create_db.py

# launch the backend
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```
