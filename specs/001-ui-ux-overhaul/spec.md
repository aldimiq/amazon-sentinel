# Spec 001: Sentinel Light UI/UX & Auth

## 1. Background
The user requires a modern, minimalist light-themed interface with amazing UX. Security is paramount, requiring a strict Backend-for-Frontend (BFF) architecture where the frontend never communicates directly with Supabase.

## 2. User Stories
*   **US-1: Secure Entry**
    *   **As a:** New User.
    *   **I want to:** Sign up or Login via a clean, light-themed interface.
    *   **Security:** My credentials must be proxied through the Python Backend, never sent directly to Supabase from the browser.

*   **US-2: Explorer Dashboard**
    *   **As an:** Authenticated User.
    *   **I want to:** See a map of the Amazon (OSM) and a dashboard shell.

## 3. Functional Requirements

### FR-001: Authentication Pages
*   **Login**: Email/Password fields with "Forgot Password" link.
*   **Sign Up**: Email/Password with basic validation.
*   **Forgot Password**: Triggers recovery email through the Backend.

### FR-002: Design System (Sentinel Light)
*   **Theme**: Light mode (Slate-50 background, White cards).
*   **Accents**: Emerald-600 (Life/Success), Cyan-600 (Data/Info).
*   **Components**: Clean borders, subtle shadows, high readability.

### FR-003: Architecture (BFF Proxy)
*   Frontend calls `POST /auth/login` on Python Backend.
*   Backend calls Supabase Auth and returns the session/JWT.
