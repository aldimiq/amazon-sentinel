import h3
import random

# Center of Manaus, Brazil
LAT = -3.119
LNG = -60.0217
RESOLUTION = 8  # ~1km2

def generate_hexes(count=500):
    # Get the H3 index for the center
    center_h3 = h3.geo_to_h3(LAT, LNG, RESOLUTION)
    
    # Get a cluster of hexes around the center
    hexes = h3.k_ring(center_h3, 15) # 15 rings should give us plenty
    
    selected_hexes = list(hexes)[:count]
    
    sql_statements = []
    
    for h_index in selected_hexes:
        # Get coordinates for the hexagon boundary
        boundary = h3.h3_to_geo_boundary(h_index)
        # Close the polygon (last point = first point)
        boundary = list(boundary) + [boundary[0]]
        # Convert to WKT: POLYGON((lng lat, lng lat, ...))
        wkt = "POLYGON((" + ", ".join([f"{lon} {lat}" for lat, lon in boundary]) + "))"
        
        status = random.choice(['available', 'available', 'available', 'owned', 'alert'])
        carbon = round(random.uniform(100, 500), 2)
        bio = random.randint(40, 95)
        
        sql = f"INSERT INTO hexes (h3_index, geom, status, carbon_stock, bio_score) VALUES ('{h_index}', ST_GeomFromText('{wkt}', 4326), '{status}', {carbon}, {bio}) ON CONFLICT (h3_index) DO NOTHING;"
        sql_statements.append(sql)
    
    return sql_statements

if __name__ == "__main__":
    statements = generate_hexes()
    print("\n".join(statements))
