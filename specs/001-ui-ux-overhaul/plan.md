# Plan 001: UI/UX Overhaul - "The Sentinel"

## 1. Architecture Overview
We are building a Single Page Application (SPA) using React. The core visual component is the **Map** (Mapbox), which serves as the background. The **UI** (Sidebar, Navbar) will overlay the map using absolute positioning and glassmorphism effects.

### Frontend Stack
*   **Core:** React (Vite) + TypeScript.
*   **Styling:** Tailwind CSS (Utility-first).
*   **Map:** `react-map-gl` (Wrapper for Mapbox GL JS).
*   **Icons:** `lucide-react`.
*   **State:** `zustand` (for managing sidebar state and selected hex).

## 2. Implementation Strategy

### Step 1: Foundation Setup
*   Initialize Tailwind CSS with a custom "Cyber" color palette (Dark Slate, Neon Green).
*   Configure global styles (Reset, Fonts - likely 'Inter' or 'JetBrains Mono').

### Step 2: The "Glass" Layout
*   Create a `Layout` component that holds the Map (z-0) and the UI Layer (z-10).
*   Implement `Sidebar` component with `backdrop-filter: blur()`.

### Step 3: Map Integration
*   Setup `Mapbox` provider.
*   Render a dark-style map.
*   *Note:* We will need a Mapbox Public Token. For the prototype, we might use a placeholder or ask the user.

### Step 4: Component Library (Mini)
*   Create atomic "Glass" components:
    *   `GlassCard`: Container with blur and border.
    *   `GlassButton`: Interactive element with hover glow.

## 3. Data Flow
*   **Zustand Store:**
    *   `uiState`: `{ isSidebarOpen: boolean, activeTab: string }`
    *   `mapState`: `{ viewState: { latitude, longitude, zoom } }`

## 4. Verification Plan
*   **Visual Check:** Does the sidebar blur the map?
*   **Performance:** Does the map pan smoothly?
