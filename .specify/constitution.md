# 📜 The Sentinel Constitution
*The Supreme Law of the Codebase*

## 1. The Design System ("Sentinel Glass Light")
Every UI component MUST adhere to the **Sentinel Glass** aesthetic, inspired by Apple's Glasskit.
*   **Theme:** Modern Light Theme with heavy background blur.
*   **Surfaces:** 
    *   Primary Panels: `bg-white/40 backdrop-blur-2xl border border-white/40`.
    *   Floating Cards: `bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl`.
*   **Geometry:** Large corner radii (`rounded-2xl` for components, `rounded-[2.5rem]` for main containers).
*   **Colors:**
    *   Primary: Emerald 600 (`#059669`) - For Bio.
    *   Accent: Cyan 600 (`#0891B2`) - For Data.
    *   Base: Slate-900 for text, White/Slate-50 for backgrounds.

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
