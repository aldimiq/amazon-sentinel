# 📜 The Sentinel Constitution
*The Supreme Law of the Codebase*

## 1. The Design System ("Sentinel Glass")
Every UI component MUST adhere to the **Sentinel Glass** aesthetic.
*   **Theme:** Strict Dark Mode (`bg-slate-900`). No light mode allowed.
*   **Surfaces:** Glassmorphism is mandatory for all overlays (Sidebar, Modals, Cards).
    *   *CSS:* `bg-slate-900/60 backdrop-blur-xl border border-white/10`.
*   **Typography:** Monospace for data (`JetBrains Mono`), Sans-serif for UI (`Inter`).
*   **Colors:**
    *   Primary: Emerald 500 (`#10b981`) - For "Life/Bio".
    *   Accent: Cyan 500 (`#06b6d4`) - For "Tech/Data".
    *   Error/Alert: Red 500 + Pulse Animation.

## 2. The Infrastructure Standard
*   **Containerization:** All services (Frontend, Backend, DB) MUST run via `docker-compose`.
*   **Database:** PostgreSQL 15+ with PostGIS extension enabled.
*   **Backend:** Python 3.10+ (FastAPI). No Flask, No Django.
*   **Frontend:** React 18+ (Vite). No Next.js (for this workshop simplicity).

## 3. The Spec-Driven Law
*   **Zero-Code-Without-Spec:** No code is written until a `spec.md` exists in `specs/XXX-feature`.
*   **Atomic Tasks:** Implementation tasks must be granular (< 1 hour effort).
*   **Test-First:** Critical logic (pricing, geo-calculations) requires a failing test before implementation.

## 4. The Security Doctrine
*   **Zero Trust Database:** Row Level Security (RLS) MUST be enabled on all public tables.
    *   *Rule:* Never expose `public` schema without RLS policies.
*   **API Fortress:** 
    *   **Authentication:** Backend MUST verify Supabase JWTs (Bearer Token) for all protected endpoints.
    *   **CORS:** Strict allow-list for frontend domain only.
    *   **Validation:** All inputs must be validated via Pydantic models. No raw dict access.
*   **Secret Sanitation:**
    *   No hardcoded secrets (API Keys, DB URLs) in code.
    *   Use `.env` files and `pydantic-settings` for config management.
