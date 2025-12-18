-- Enable PostGIS if not enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create Hexes Table
CREATE TABLE IF NOT EXISTS public.hexes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    h3_index TEXT UNIQUE NOT NULL,
    geom GEOMETRY(POLYGON, 4326) NOT NULL,
    carbon_stock FLOAT DEFAULT 0.0,
    bio_score INT DEFAULT 0,
    status TEXT DEFAULT 'available', -- available, owned, alert
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for spatial queries
CREATE INDEX IF NOT EXISTS hexes_geom_idx 
ON public.hexes USING GIST (geom);

CREATE INDEX IF NOT EXISTS hexes_h3_idx 
ON public.hexes (h3_index);

-- Enable RLS
ALTER TABLE public.hexes ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read hexes"
ON public.hexes
FOR SELECT
USING (true);

-- Helper function to get GeoJSON features
CREATE OR REPLACE FUNCTION get_hexes_with_geojson()
RETURNS TABLE (
    h3_index text,
    status text,
    geom json
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        h.h3_index,
        h.status,
        ST_AsGeoJSON(h.geom)::json
    FROM public.hexes h;
END;
$$;
