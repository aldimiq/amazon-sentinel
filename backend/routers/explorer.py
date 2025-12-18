
from fastapi import APIRouter, HTTPException
from database import supabase
import logging

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/explorer", tags=["explorer"])

@router.get("/hexes")
async def get_hexes():
    try:
        response = supabase.rpc("get_hexes_with_geojson", {}).execute()
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
