# The Amazon Sentinel Constitution

## Core Principles

### Technology Stack
*   **Frontend:** React (TypeScript) using Vite.
*   **Map Visualization:** Mapbox GL JS (or Deck.gl) for high-performance geospatial rendering.
*   **Styling:** Tailwind CSS for a utility-first styling approach.
*   **Backend:** Python 3.11+ using FastAPI for high-performance async APIs.
*   **Geospatial Processing:** GeoPandas and Shapely for server-side geometry operations.
*   **Database:** Supabase (PostgreSQL) with **PostGIS** extension enabled for geospatial queries.
*   **Authentication:** Supabase Auth (JWT).

### Code Quality and Style
*   **Frontend:**
    *   Strict TypeScript (`noImplicitAny`).
    *   ESLint + Prettier.
    *   Functional Components with Hooks.
*   **Backend:**
    *   Type hints (Pydantic models) are mandatory for all API contracts.
    *   `ruff` for linting and formatting.
    *   Follow PEP 8 style guide.
*   **Documentation:** Code must be self-documenting. Complex geospatial logic must have comments explaining the *algorithm* used (e.g., "Ray casting algorithm for point-in-polygon").

### Testing Strategy
*   **Backend (Python):** `pytest` is the standard.
    *   **Unit Tests:** For pricing logic and data transformation.
    *   **Integration Tests:** For API endpoints (using `TestClient` and a test DB).
*   **Frontend (React):** `Vitest` + `React Testing Library`.
*   **Geospatial Tests:** All geometry operations must have edge-case tests (e.g., points exactly on the boundary, invalid polygons).

### Architecture & State
*   **Single Source of Truth:** The Database (PostGIS) is the authority for all spatial data.
*   **Frontend State:** Zustand for global client state (user session, map viewport, selection).
*   **API Design:** RESTful. Endpoints returning geometry must strictly follow GeoJSON standards (RFC 7946).

### Deployment
*   **Containerization:** Docker used for consistent dev/prod environments.
*   **CI/CD:** GitHub Actions for automated linting and testing on PRs.

## Governance

This constitution governs the development of the "Amazon Sentinel" platform.

*   **Spec-Driven:** No code is written without an approved `spec.md` and `plan.md`.
*   **Constitution First:** If a spec violates this constitution, the spec is invalid.
*   **Versioning:** Semantic Versioning.

**Version**: 1.0.0 | **Ratified**: 2025-12-17
