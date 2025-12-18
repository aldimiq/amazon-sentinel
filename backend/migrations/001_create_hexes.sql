-- Create PostGIS extension if not exists
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create hex_status enum
DO $$ BEGIN
    CREATE TYPE hex_status AS ENUM ('available', 'owned', 'alert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create hexes table
CREATE TABLE IF NOT EXISTS hexes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    h3_index TEXT UNIQUE NOT NULL,
    geom GEOMETRY(POLYGON, 4326) NOT NULL,
    status hex_status DEFAULT 'available',
    carbon_stock FLOAT DEFAULT 0.0,
    bio_score INT CHECK (bio_score >= 0 AND bio_score <= 100),
    owner_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS hexes_geom_idx ON hexes USING GIST (geom);
CREATE INDEX IF NOT EXISTS hexes_h3_idx ON hexes (h3_index);
