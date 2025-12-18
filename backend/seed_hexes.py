import os
import h3
from supabase import create_client, Client
from shapely.geometry import Polygon, mapping

SUPABASE_URL = os.getenv("SUPABASE_URL", "http://kong:8000")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def seed_amazon_hexes():
    print("🛰️ Initializing Satellite Seed...")
    
    # Coordinates for a spot in the Amazon (near Manaus)
    lat, lng = -3.4653, -62.2159
    
    # Get a ring of hexes at resolution 7 (~5km across)
    # Using res 7 for better performance in the prototype
    center_hex = h3.geo_to_h3(lat, lng, 7)
    hexes = h3.k_ring(center_hex, 10) # Get 10 rings of hexes
    
    data_to_insert = []
    
    for h_index in hexes:
        # Get coordinates for the polygon
        geo_boundary = h3.h3_to_geo_boundary(h_index)
        # Convert to GeoJSON format (lon, lat)
        geojson_poly = [[p[1], p[0]] for p in geo_boundary]
        geojson_poly.append(geojson_poly[0]) # Close the loop
        
        # Simple mock data
        carbon = round(100 + (hash(h_index) % 50), 2)
        bio = hash(h_index) % 100
        
        # PostGIS WKT format
        wkt_geom = f"POLYGON(({','.join([f'{p[0]} {p[1]}' for p in geojson_poly])}))"
        
        data_to_insert.append({
            "h3_index": h_index,
            "geom": wkt_geom,
            "carbon_stock": carbon,
            "bio_score": bio,
            "status": "available"
        })

    print(f"📦 Prepared {len(data_to_insert)} hexes. Syncing with Supabase...")
    
    # Insert in chunks
    for i in range(0, len(data_to_insert), 50):
        chunk = data_to_insert[i:i+50]
        supabase.table("hexes").upsert(chunk).execute()
        
    print("✅ Seed Complete.")

if __name__ == "__main__":
    seed_amazon_hexes()