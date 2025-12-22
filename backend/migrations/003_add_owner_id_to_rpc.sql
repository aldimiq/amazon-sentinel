-- Drop old function
DROP FUNCTION IF EXISTS get_hexes_with_geojson();

-- Update RPC to return owner_id
CREATE OR REPLACE FUNCTION get_hexes_with_geojson()
RETURNS TABLE (
    h3_index text,
    status text,
    carbon_stock float,
    bio_score int,
    price numeric,
    owner_id uuid,
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
        h.owner_id,
        ST_AsGeoJSON(h.geom)::json
    FROM public.hexes h;
END;
$$;
