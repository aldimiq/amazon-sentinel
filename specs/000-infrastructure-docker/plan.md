# Plan 000: Infrastructure & Docker Setup

## 1. Architecture

### Services
1.  **`supabase` (Data Layer)**
    *   Setup: Clone official repo to `./supabase-docker`.
    *   Execution: Use their `docker-compose.yml` as a base or `include` it.
2.  **`backend` (FastAPI)**
    *   Build: `./backend/Dockerfile`.
    *   Base: `python:3.11-slim`.
3.  **`frontend` (Next.js)**
    *   Build: `./frontend/Dockerfile`.
    *   Base: `node:20-alpine`.
    *   Command: `npm run dev`.

## 3. Implementation Steps
1.  **Clean Up**: Remove legacy `frontend` (Vite) folder.
2.  **Supabase Setup**: Clone `supabase/supabase` to `supabase-docker`.
3.  **Frontend Init**: Run `npx create-next-app@latest frontend` (TypeScript, Tailwind, App Router).
4.  **Dockerize**: Update `frontend/Dockerfile` and `docker-compose.yml`.
