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
1.  **`supabase`**: Self-hosted Supabase stack (Postgres, GoTrue, PostgREST, Studio).
    *   Must be initialized from the official `supabase/supabase` repository submodule or clone.
2.  **`backend`**: Python 3.11+ (FastAPI).
    *   Must mount `./backend` volume.
    *   Must connect to Supabase Postgres on port `5432`.
3.  **`frontend`**: Next.js 14+ (Node 20+).
    *   Must expose port `3000`.
    *   Must mount `./frontend` volume for HMR.

### FR-002: Networking
*   Frontend talks to Backend via `http://backend:8000`.
*   Backend talks to Supabase via `db:5432` (or service name defined in Supabase docker).

## 4. Success Criteria
*   **SC-001:** `docker-compose up` starts Next.js, FastAPI, and Supabase.
*   **SC-002:** `localhost:3000` loads Next.js homepage.
*   **SC-003:** `localhost:8000/docs` loads FastAPI Swagger.
*   **SC-004:** `localhost:3000/supabase` (or similar) loads Supabase Studio.
