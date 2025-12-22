import os
import random
from supabase import create_client, Client

# Use environment variables or defaults
SUPABASE_URL = os.getenv("SUPABASE_URL", "http://kong:8000")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

USER_ID = "b25df12b-d7e9-4cab-84d5-5560b2385ddc"

def seed_user_assets():
    print(f"🌱 Seeding assets for user: {USER_ID}")

    # 1. Get available hexes
    response = supabase.table("hexes").select("h3_index").eq("status", "available").limit(50).execute()
    available_hexes = response.data

    if not available_hexes:
        print("❌ No available hexes found!")
        return

    # 2. Pick 5 random ones
    to_assign = random.sample(available_hexes, min(5, len(available_hexes)))
    
    print(f"🎯 Assigning {len(to_assign)} hexes...")

    for hex_item in to_assign:
        h3 = hex_item['h3_index']
        print(f"   - Assigning {h3}")
        
        supabase.table("hexes").update({
            "owner_id": USER_ID,
            "status": "owned"
        }).eq("h3_index", h3).execute()

    print("✅ Assets assigned successfully.")

if __name__ == "__main__":
    seed_user_assets()
