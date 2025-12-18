# 📜 The Sentinel Constitution
*The Supreme Law of the Codebase*

## 1. The Design System ("Sentinel Light")
Every UI component MUST adhere to the **Sentinel Light** aesthetic.
*   **Theme:** Modern Light Theme. Clean, minimalist, and high-contrast.
*   **Surfaces:** 
    *   Primary: White (`#FFFFFF`) or Slate-50 (`#F8FAFC`).
    *   Glassmorphism: Subtle light glass for overlays. 
    *   *CSS:* `bg-white/70 backdrop-blur-md border border-slate-200/50`.
*   **Typography:** Monospace for data (`JetBrains Mono`), Sans-serif for UI (`Inter`).
*   **Colors:**
    *   Primary: Emerald 600 (`#059669`) - For "Life/Bio".
    *   Accent: Cyan 600 (`#0891B2`) - For "Tech/Data".
    *   Text: Slate-900 for primary, Slate-500 for secondary.

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
*   **Zero Trust Database:** RLS enabled on all tables in the **`public`** schema.
*   **Schema Separation:**
    *   **`auth` Schema:** Strictly reserved for Supabase Identity (GoTrue). Do not modify.
    *   **`public` Schema:** All application data (Hexes, Sightings, User Profiles) must reside here.
*   **Identity Mapping:** 
    *   Tables in `public` that are user-specific must have a `user_id` column of type `UUID` referencing `auth.users(id)`.
*   **API Fortress:** Python Backend MUST verify Supabase JWTs. Validated user context from `auth` should be used to filter queries in `public`.
