# Tasks: Infrastructure & Docker Setup

## Phase 1: Clean Slate
- [x] **Remove Legacy**: Delete `frontend/` (Vite) folder.
- [x] **Remove Legacy DB**: Remove old `db` service from `docker-compose.yml`.

## Phase 2: Supabase
- [x] **Setup Supabase**: Clone official repo to `./supabase`.
- [x] **Configure Env**: Update `.env` with Supabase keys.

## Phase 3: Frontend (Next.js)
- [x] **Init Next.js**: Create new `frontend` app (TS, Tailwind, App Router).
- [x] **Dockerize Frontend**: Create `frontend/Dockerfile`.

## Phase 4: Orchestration
- [x] **Update Compose**: Rewrite `docker-compose.yml` to include Backend, Frontend, and Supabase.
- [x] **Fix Port Conflict**: Map Backend to `8001:8000`.

## Phase 5: Split Architecture (Auth vs Apps)
- [x] **Auth Compose**: Create `docker-compose.auth.yml` for Supabase stack.
- [x] **Apps Compose**: Update `docker-compose.yml` to be Apps-only and join Auth network.

## Phase 6: Troubleshooting & Fixes
- [x] **Fix Backend DB Driver**: Updated `docker-compose.yml` `DATABASE_URL` to `postgresql+asyncpg://`.
- [ ] **Fix Frontend Startup**: If `sh: next: not found` occurs, run `docker-compose build --no-cache frontend`.