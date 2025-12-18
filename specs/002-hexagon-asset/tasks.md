# Tasks: Hexagon Asset Selection

## Phase 1: Database & Seed
- [x] **Migration**: Create `001_create_hexes.sql` in `backend/migrations`.
- [x] **Seed Script**: Create a Python script to seed the Amazon region with initial H3 hexes.

## Phase 2: Backend API
- [x] **Spatial Router**: Implement the explorer router in FastAPI.
- [x] **GeoJSON Generator**: Logic to convert H3 indexes to GeoJSON features.
- [x] **Pricing Engine**: Implement `Price = Carbon + (Bio * Premium)`.

## Phase 3: Frontend Explorer
- [x] **Hex Layer**: Integrate GeoJSON rendering into `MapLayer.tsx`.
- [x] **Selection State**: Update Zustand store to handle `selectedHex`.
- [x] **Asset Details Component**: Build the "Aero-SciFi" floating panel for hex data.
- [x] **Interaction**: Connect map clicks to the details panel.