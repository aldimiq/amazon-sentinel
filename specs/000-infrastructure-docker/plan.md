# Plan 000: Infrastructure & Docker Setup

## 1. Architecture

### Split Groups
1.  **Auth Layer** (`docker-compose.auth.yml`)
    *   Wraps `supabase/docker/docker-compose.yml`.
    *   Exposes `default` network as `sentinel_net`.
2.  **App Layer** (`docker-compose.yml`)
    *   `backend` + `frontend`.
    *   Uses `external: true` network `sentinel_net`.

## 3. Implementation Steps
1.  **Network Setup**: Create `docker-compose.auth.yml` that defines the bridge network.
2.  **App Setup**: Update `docker-compose.yml` to remove Supabase include and instead join the external network.
3.  **Docs**: Update README to show the 2-step startup.
