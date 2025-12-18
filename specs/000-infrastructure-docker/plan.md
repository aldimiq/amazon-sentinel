# Plan 000: Infrastructure & Docker Setup

## 1. Architecture
We will use a standard 3-tier container architecture orchestrated by `docker-compose`.

### Services
1.  **`db` (PostGIS)**
    *   Image: `postgis/postgis:15-3.3` (Alpine based for size).
    *   Env Vars: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
    *   Volume: `./docker/pg_data:/var/lib/postgresql/data`.

2.  **`backend` (FastAPI)**
    *   Build: `./backend/Dockerfile`.
    *   Base Image: `python:3.11-slim`.
    *   Dependencies: `fastapi`, `uvicorn`, `asyncpg`, `geopandas`, `shapely`.
    *   Dev Mode: Mount local dir and use `--reload`.

3.  **`frontend` (React/Vite)**
    *   Build: `./frontend/Dockerfile`.
    *   Base Image: `node:20-alpine`.
    *   Dev Mode: Mount local dir and use Vite's HMR.

## 2. File Structure
```
amazon-sentinel/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   └── Dockerfile
└── .env (gitignored)
```

## 3. Implementation Steps
1.  **Backend Setup**: Create `requirements.txt` and `Dockerfile`.
2.  **Frontend Setup**: Create `Dockerfile`.
3.  **Orchestration**: Create `docker-compose.yml`.
4.  **Verification**: Test spin-up and inter-service connectivity.
