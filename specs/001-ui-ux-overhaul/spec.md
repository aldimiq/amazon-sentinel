# Spec 001: UI/UX Overhaul - The "Sentinel" Interface

## 1. Background & Context
The "Amazon Sentinel" requires a visual identity that conveys "High-Tech Conservation." We are moving away from standard admin dashboards to an immersive, map-first experience. The goal is to make the user feel like they are operating a sophisticated satellite monitoring system.

## 2. User Stories (The "Why")

### US-1: Immersive Map Exploration
*   **As an:** Eco-Investor.
*   **I want to:** Explore the Amazon rainforest on a full-screen, interactive 3D map.
*   **So that:** I can visually identify high-value biodiversity zones (Hexagons) without UI clutter.

### US-2: "Glass" Control Panel
*   **As an:** Analyst.
*   **I want to:** View data details (Bio-Score, Carbon Stock) in a semi-transparent, floating sidebar ("Glassmorphism").
*   **So that:** I can read the data while still keeping the map context visible underneath.

### US-3: Dark Mode Aesthetic
*   **As a:** User.
*   **I want to:** Interact with a Dark Mode interface with neon accents (Green/Cyan).
*   **So that:** The application feels modern, reduces eye strain, and mimics a "Command Center" aesthetic.

## 3. Functional Requirements (The "What")

### FR-001: Frontend Framework
*   **Constraint:** Must use React 18+ with Vite.
*   **Styling:** Must use Tailwind CSS for layout and styling.
*   **Components:** Must use a component library (e.g., shadcn/ui) customized for the "Cyber-Nature" aesthetic.

### FR-002: Map Engine
*   **Library:** Mapbox GL JS (or compatible wrapper like `react-map-gl`).
*   **Style:** Custom Mapbox Studio style (Dark/Satellite hybrid).
*   **Interactivity:** Smooth zooming, pitching (3D terrain), and rotation.

### FR-003: "Glass" UI Architecture
*   **Overlay:** UI elements (Sidebar, Navbar) must float *over* the map canvas (`z-index` > map).
*   **Effect:** UI backgrounds must use `backdrop-filter: blur(10px)` and semi-transparent colors (e.g., `bg-slate-900/80`).

## 4. Success Criteria (The "Test")

*   **SC-001:** Application loads in < 1.5s (Lighthouse Performance Score > 90).
*   **SC-002:** Map renders full-screen without scrollbars.
*   **SC-003:** Sidebar successfully blurs the map content behind it (Visual verification).
*   **SC-004:** "Dark Mode" is the default and only theme for this MVP.
