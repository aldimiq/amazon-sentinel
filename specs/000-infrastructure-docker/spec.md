# Spec 000: Infrastructure & Docker Setup

## 1. Background
To ensure "The Amazon Sentinel" is reproducible and scalable, the entire development environment must be containerized. This allows any developer (or workshop participant) to spin up the full stack (Frontend, Backend, Database) with a single command.

## 2. User Stories
*   **US-1: One-Command Start**
    *   **As a:** Developer.
    *   **I want to:** Run `docker-compose up`.
    *   **So that:** I have a fully working app (Frontend on :3000, Backend on :8000, DB on :5432) without installing Python/Node locally.

*   **US-2: Database Persistence**
    *   **As a:** Developer.
    *   **I want to:** Restart my containers.
    *   **So that:** My PostGIS data (Hexagons) is not lost.

## 3. Functional Requirements

### FR-001: Container Services
The `docker-compose.yml` must define:
1.  **`db`**: `supabase/postgres` or standard `postgis/postgis`.
    *   Must expose port `5432`.
    *   Must have a volume for `pg_data`.
2.  **`backend`**: Python 3.10+ image.
    *   Must mount `./backend` volume for live reloading.
    *   Must run `uvicorn main:app --reload`.
3.  **`frontend`**: Node 20+ image.
    *   Must mount `./frontend` volume.
    *   Must run `npm run dev -- --host`.

### FR-002: Networking
*   Frontend must be able to call Backend at `http://backend:8000` (internal) or `http://localhost:8000` (browser).
*   Backend must be able to call DB at `db:5432`.

## 4. Success Criteria
*   **SC-001:** `docker-compose up` results in all 3 services healthy.
*   **SC-002:** Accessing `localhost:5173` loads the Glass UI.
*   **SC-003:** Accessing `localhost:8000/docs` loads Swagger UI.
