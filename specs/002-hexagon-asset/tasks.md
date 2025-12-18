# Tasks: Hexagon Asset Grid

## Phase 1: Database & Seed
- [x] **Migration**: Create SQL migration script for `hexes` table.
- [x] **Seed Script**: Create a Python script to populate the DB with ~500 hexagons near Manaus using `h3`.

## Phase 2: Backend API
- [x] **Schema**: Define Pydantic models for `HexFeature` and `HexCollection`. (Note: Used direct SQL for performance).
- [x] **Route**: Implement `GET /api/v1/hexes` in `backend/main.py`.
- [x] **Logic**: Implement spatial filtering using SQLAlchemy/GeoAlchemy2.

## Phase 3: Frontend Map
- [x] **Zustand**: Add `selectedHex` and `setSelectedHex` to the store.
- [x] **MapLayer**: Implement the GeoJSON source and layers in `frontend/src/components/map/MapLayer.tsx`.
- [x] **Interactions**: Add click and hover handlers to the map.
- [x] **UI**: Add `AssetDetails` glass panel.

## Phase 4: Verification
- [x] **Visual Check**: Verify hexes render with correct colors.
- [x] **Interaction Check**: Verify clicking a hex highlights it and logs the data.