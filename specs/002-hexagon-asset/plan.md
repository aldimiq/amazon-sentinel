# Implementation Plan: Hexagon Asset Selection

## 1. Backend (Python/FastAPI)
*   **H3 Logic**: Use the `h3` library to generate hexagon boundaries.
*   **Database**: 
    *   Create a migration for the `hexes` table in Supabase.
    *   Ensure PostGIS `geom` is generated from H3 indexes.
*   **Endpoints**:
    *   `GET /api/v1/explorer/hexes`: Returns GeoJSON of hexes in a BBOX.
    *   `GET /api/v1/explorer/hexes/{h3_index}`: Returns full metadata for a specific hex.

## 2. Frontend (Next.js)
*   **Map Layer**: Add a `GeoJSON` layer to the Leaflet map.
*   **Interaction**: Implement `onEachFeature` to handle clicks and trigger the `useStore` selection.
*   **UI Component**: Create `AssetDetails.tsx` using the "Aero-SciFi" glass style.

## 3. Data Flow
1. User clicks map -> Leaflet gets H3 index.
2. Frontend calls `api.get('/explorer/hexes/{id}')`.
3. Backend calculates dynamic price based on DB stats.
4. Frontend displays data in the Glass Panel.

## 4. Constitution Check
*   [ ] Uses H3 for indexing?
*   [ ] Glasskit UI (Apple + Sci-Fi)?
*   [ ] No direct Supabase calls from FE?