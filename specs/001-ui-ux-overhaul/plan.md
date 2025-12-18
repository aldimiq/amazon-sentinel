# Plan 001: UI/UX Overhaul - "The Sentinel"

## 1. Backend Implementation (FastAPI)
*   **Auth Proxy**: Create `backend/auth.py` using `gotrue-py` (Supabase Auth Python client).
*   **Endpoints**:
    *   `POST /auth/signup`
    *   `POST /auth/login`
    *   `POST /auth/forgot-password`

## 2. Frontend Implementation (Next.js)
*   **Structure**:
    *   `app/(auth)/login/page.tsx`
    *   `app/(auth)/signup/page.tsx`
    *   `app/(dashboard)/page.tsx` (The Map)
*   **State**: Use `Zustand` for Auth State and Map selection.

## 3. Design Tokens
*   `primary`: Emerald-600
*   `surface`: White / Slate-50
*   `text`: Slate-900

