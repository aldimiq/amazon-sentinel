# Spec: Hexagon Asset Grid

## 1. Overview
The core interface of Amazon Sentinel is a "Digital Twin" of the Amazon Rainforest, represented as a grid of 1km² hexagons. Each hexagon (Asset) represents a unique piece of land that can be monitored, protected, or purchased.

## 2. User Stories
- **AS A** Biodiversity Investor, **I WANT TO** view a grid of hexagons over the Amazon rainforest **SO THAT** I can see which areas are available for protection.
- **AS A** User, **I WANT TO** see different colors for hexagons based on their status (Available, Owned, Alert) **SO THAT** I can quickly identify hotspots or opportunities.
- **AS A** User, **I WANT TO** click a hexagon **SO THAT** I can see its specific Carbon Stock and Biodiversity Score.

## 3. Acceptance Criteria
- [ ] Map renders a GeoJSON layer of H3 Hexagons (Resolution 7-8).
- [ ] Hexagons are colored based on `status`:
    - `available`: Cyan-500 (60% opacity)
    - `owned`: Emerald-500 (60% opacity)
    - `alert`: Red-500 (60% opacity)
- [ ] Hovering over a hexagon highlights its border (`border-white/50`).
- [ ] Clicking a hexagon updates the global `selectedHex` state in Zustand.
- [ ] The grid must performantly render at least 1,000 hexagons within the current viewport.

## 4. Technical Constraints
- **H3 Indexing:** Must use Uber's H3 library for grid generation.
- **PostGIS:** Hexagons must be stored as `POLYGON` types in the `hexes` table.
- **MapLibre:** Use `GeoJsonLayer` for rendering.
