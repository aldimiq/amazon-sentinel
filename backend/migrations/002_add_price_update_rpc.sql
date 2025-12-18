-- Add Price Column
ALTER TABLE public.hexes 
ADD COLUMN IF NOT EXISTS price NUMERIC DEFAULT 1000.0;

-- Populate numeric dummy data
-- formula: Base 5000 + (Bio * 100) + (Carbon * 50) + Random variation
UPDATE public.hexes 
SET price = 
    5000 + 
    (bio_score * 100) + 
    (carbon_stock * 50) + 
    (floor(random() * 1000));

-- Drop old function first because return type changes
DROP FUNCTION IF EXISTS get_hexes_with_geojson();

-- Update RPC to return filtering columns
CREATE OR REPLACE FUNCTION get_hexes_with_geojson()
RETURNS TABLE (
    h3_index text,
    status text,
    carbon_stock float,
    bio_score int,
    price numeric,
    geom json
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        h.h3_index,
        h.status,
        h.carbon_stock,
        h.bio_score,
        h.price,
        ST_AsGeoJSON(h.geom)::json
    FROM public.hexes h;
END;
$$;
