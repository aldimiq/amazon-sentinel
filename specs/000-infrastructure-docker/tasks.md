# Tasks: Infrastructure & Docker Setup

## Phase 1: Backend Dockerization
- [x] **Backend Req**: Create `backend/requirements.txt` with `fastapi`, `uvicorn`, `geopandas`, `shapely`, `asyncpg`, `sqlalchemy`, `geoalchemy2`.
- [x] **Backend Dockerfile**: Create `backend/Dockerfile` (Python 3.11 slim, install system deps for GeoPandas like `gdal-bin`).

## Phase 2: Frontend Dockerization
- [x] **Frontend Dockerfile**: Create `frontend/Dockerfile` (Node 20 Alpine).

## Phase 3: Orchestration
- [x] **Docker Compose**: Create `docker-compose.yml` defining `db`, `backend`, `frontend`.
- [x] **Environment**: Create `.env.example` with DB credentials.

## Phase 4: Documentation & Test
- [x] **Update README**: Add "Running with Docker" section.
- [x] **Verify**: Run `docker-compose up` and check logs.