
from fastapi import APIRouter, HTTPException
from database import supabase, redis_client
import logging
import json

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/explorer", tags=["explorer"])

@router.get("/hexes")
async def get_hexes():
    try:
        # 1. Try Cache
        try:
            cached_data = await redis_client.get("all_hexes_geojson")
            if cached_data:
                logger.info("⚡ Returning hexes from Redis Cache")
                return json.loads(cached_data)
        except Exception as e:
            logger.error(f"❌ Redis Read Error: {e}")

        # 2. Fetch from DB
        response = supabase.rpc("get_hexes_with_geojson", {}).execute()
        
        # 3. Set Cache (Expire in 5 mins)
        if response.data:
            try:
                await redis_client.set("all_hexes_geojson", json.dumps(response.data), ex=300)
                logger.info("💾 Cached hexes in Redis")
            except Exception as e:
                logger.error(f"❌ Redis Write Error: {e}")
        
        return response.data
    except Exception as e:
        logger.error(f"Failed to fetch hexes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hexes/{h3_index}")
async def get_hex_details(h3_index: str):
    try:
        # Fetch single hex using Supabase client
        # We assume the 'hexes' table exists and has 'h3_index' column
        response = supabase.table("hexes").select("*").eq("h3_index", h3_index).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Hex not found")
            
        return response.data[0]
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Failed to fetch hex {h3_index}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
