# 📜 The Sentinel Constitution
*The Supreme Law of the Codebase*

*   **Aesthetics:** Every interface must feel like a "Digital Twin".
    *   Implement animated scan-lines (`scan-line` class).
    *   Use HUD-style corner decorations (`hud-corner`) for map overlays.
    *   **3D Content:** Real-time shaders (Three.js) must be used to represent complex biological data.

## 2. The Infrastructure Standard
*   **Containerization:** All services MUST run via `docker-compose`. 
*   **Database:** **Self-Hosted Supabase** (Cloned from official repo).
*   **Backend:** **Python 3.11+ (FastAPI)**.
    *   *Role:* The specialized calculation engine (pricing, geo-analysis).
*   **Frontend:** Next.js 14+ (App Router).

## 3. The Spec-Driven Law
*   **Zero-Code-Without-Spec:** No code is written until a `spec.md` exists.
*   **Atomic Tasks:** Granular implementation tasks.

## 4. The Security Doctrine
*   **Strict Gateway Pattern:**
    *   **Frontend:** Must **ONLY** communicate with the Python Backend. Direct calls to Supabase (Data or Auth) are **PROHIBITED**.
    *   **Backend:** Acts as the unified proxy for Auth and Data.
*   **Zero Trust Database:** RLS enabled on all tables in the **`public`** schema.
*   **Schema Separation:**
    *   **`auth` Schema:** Strictly reserved for Supabase Identity.
    *   **`public` Schema:** All application data (`hexes`, `sightings`).
