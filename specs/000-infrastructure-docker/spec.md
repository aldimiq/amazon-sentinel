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

### FR-001: Service Groups
The infrastructure must be split into two decoupled groups:

1.  **Group: Auth** (`docker-compose.auth.yml`)
    *   **Content:** The entire Self-Hosted Supabase stack.
    *   **Network:** Defines an external network `sentinel-network` (or similar) for apps to join.
    *   **Port:** Kong Gateway on `8000`.

2.  **Group: Apps** (`docker-compose.yml`)
    *   **Frontend:** Next.js on port `3000`.
    *   **Backend:** FastAPI on port `8001`.
    *   **Connection:** Must join the network created by Group Auth to access the database.

### FR-002: Networking
*   **Backend -> Supabase:** Connects via `http://kong:8000` (internal Docker DNS).
*   **OrbStack:** Domains work independently for each container.

## 4. Success Criteria
*   **SC-001:** `docker-compose -f docker-compose.auth.yml up` starts Supabase.
*   **SC-002:** `docker-compose up` starts Apps and successfully connects to the running Supabase instance.

## 4. Success Criteria
*   **SC-001:** `docker-compose up` starts Next.js, FastAPI, and Supabase.
*   **SC-002:** `localhost:3000` loads Next.js homepage.
*   **SC-003:** `localhost:8000/docs` loads FastAPI Swagger.
*   **SC-004:** `localhost:3000/supabase` (or similar) loads Supabase Studio.
