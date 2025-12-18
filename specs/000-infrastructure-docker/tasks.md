# Tasks: Infrastructure & Docker Setup

## Phase 1: Clean Slate

- [ ] **Remove Legacy**: Delete `frontend/` (Vite) folder.

- [ ] **Remove Legacy DB**: Remove old `db` service from `docker-compose.yml`.



## Phase 2: Supabase

- [ ] **Setup Supabase**: Clone official repo to `./supabase`.

- [ ] **Configure Env**: Update `.env` with Supabase keys.



## Phase 3: Frontend (Next.js)

- [ ] **Init Next.js**: Create new `frontend` app (TS, Tailwind, App Router).

- [ ] **Dockerize Frontend**: Create `frontend/Dockerfile`.



## Phase 4: Orchestration

- [ ] **Update Compose**: Rewrite `docker-compose.yml` to include Backend, Frontend, and Supabase.

- [ ] **Verify**: Run `docker-compose up` and test connections.
