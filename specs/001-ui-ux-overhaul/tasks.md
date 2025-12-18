# Tasks: UI/UX Overhaul

## Phase 1: Setup & Styling
- [ ] **Install Dependencies**: `npm install -D tailwindcss postcss autoprefixer` && `npx tailwindcss init -p`.
- [ ] **Configure Tailwind**: Update `tailwind.config.js` with "sentinel-dark" colors and `content` paths.
- [ ] **Global CSS**: Update `index.css` to remove default Vite styles and add `@tailwind` directives.
- [ ] **Install UI Libs**: `npm install lucide-react clsx tailwind-merge framer-motion`.

## Phase 2: The "Glass" Layout
- [ ] **Create Component**: `src/components/ui/GlassCard.tsx` (Base container).
- [ ] **Create Component**: `src/components/layout/Sidebar.tsx` (Left panel with icons).
- [ ] **Create Component**: `src/components/layout/TopBar.tsx` (Logo and status).
- [ ] **Assemble Layout**: Update `App.tsx` to use the new Layout structure.

## Phase 3: Map Integration
- [ ] **Install Map Libs**: `npm install react-map-gl mapbox-gl`.
- [ ] **Create Component**: `src/components/map/MapLayer.tsx`.
- [ ] **Env Setup**: Create `.env.local` for `VITE_MAPBOX_TOKEN`.
- [ ] **Integration**: Render the Map behind the Glass UI in `App.tsx`.

## Phase 4: Polish
- [ ] **Animation**: Add simple enter animations using `framer-motion`.
- [ ] **Fonts**: Import a tech-font (e.g., Google Fonts 'Rajdhani' or 'Inter').
