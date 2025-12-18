from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import json
from database import get_db

app = FastAPI(title="Amazon Sentinel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Amazon Sentinel API Online 🛰️"}

@app.get("/api/v1/hexes")
async def get_hexes(
    bbox: str = Query(None, description="min_lon,min_lat,max_lon,max_lat"),
    db: AsyncSession = Depends(get_db)
):
    # Base query
    query_str = """
        SELECT jsonb_build_object(
            'type', 'FeatureCollection',
            'features', jsonb_agg(features.feature)
        )
        FROM (
            SELECT jsonb_build_object(
                'type', 'Feature',
                'id', id,
                'geometry', ST_AsGeoJSON(geom)::jsonb,
                'properties', jsonb_build_object(
                    'h3_index', h3_index,
                    'status', status,
                    'carbon_stock', carbon_stock,
                    'bio_score', bio_score
                )
            ) AS feature
            FROM hexes
    """
    
    params = {}
    if bbox:
        try:
            min_lon, min_lat, max_lon, max_lat = map(float, bbox.split(','))
            query_str += " WHERE ST_Intersects(geom, ST_MakeEnvelope(:min_lon, :min_lat, :max_lon, :max_lat, 4326))"
            params = {"min_lon": min_lon, "min_lat": min_lat, "max_lon": max_lon, "max_lat": max_lat}
        except ValueError:
            pass # Fallback to all hexes if bbox is malformed
            
    query_str += ") AS features;"
    
    result = await db.execute(text(query_str), params)
    geojson = result.scalar()
    
    return geojson or {"type": "FeatureCollection", "features": []}