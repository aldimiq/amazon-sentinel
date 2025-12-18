# Plan: Hexagon Asset Grid

## 1. Database Schema (Supabase/PostGIS)
We need to create the `hexes` table as defined in the Sentinel Constitution.

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TYPE hex_status AS ENUM ('available', 'owned', 'alert');

CREATE TABLE hexes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    h3_index TEXT UNIQUE NOT NULL,
    geom GEOMETRY(POLYGON, 4326) NOT NULL,
    status hex_status DEFAULT 'available',
    carbon_stock FLOAT DEFAULT 0.0,
    bio_score INT CHECK (bio_score >= 0 AND bio_score <= 100),
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX hexes_geom_idx ON hexes USING GIST (geom);
CREATE INDEX hexes_h3_idx ON hexes (h3_index);
```

## 2. Backend Implementation (FastAPI)
- **Endpoint:** `GET /api/v1/hexes`
- **Query Params:** `bbox` (string: min_lon, min_lat, max_lon, max_lat)
- **Logic:**
    1. Parse Bounding Box.
    2. Query PostGIS: `ST_Intersects(geom, ST_MakeEnvelope(...))`.
    3. Return GeoJSON FeatureCollection.

## 3. Frontend Implementation (React + MapLibre)
- **Store:** Update Zustand to handle `selectedHex`.
- **Map Component:**
    - Add a `Source` (type: geojson) pointing to the API.
    - Add a `Layer` (type: fill) with data-driven styling for colors.
    - Add a `Layer` (type: line) for the highlight effect on hover.

## 4. Migration Strategy
Since we are in a workshop environment, we will provide a seed script to generate a cluster of hexagons around a specific coordinate in the Amazon (e.g., near Manaus).
