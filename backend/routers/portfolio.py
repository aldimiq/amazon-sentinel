from fastapi import APIRouter, HTTPException, Body
from database import supabase
import logging

logger = logging.getLogger("amazon-sentinel")

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.get("/assets/{user_id}")
async def get_user_assets(user_id: str):
    """
    Fetch all hexes owned by the user.
    """
    try:
        response = supabase.table("hexes").select("*").eq("owner_id", user_id).execute()
        return response.data
    except Exception as e:
        logger.error(f"Failed to fetch assets for {user_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/buy/{h3_index}")
async def buy_hex(h3_index: str, user_id: str = Body(..., embed=True)):
    """
    Simulate a purchase (mock payment).
    """
    try:
        # Check if already owned
        hex_data = supabase.table("hexes").select("status").eq("h3_index", h3_index).execute()
        if not hex_data.data:
            raise HTTPException(status_code=404, detail="Hex not found")
        
        if hex_data.data[0]["status"] != "available":
            raise HTTPException(status_code=400, detail="Hex is not available")

        # Update owner and status
        update_data = {
            "owner_id": user_id,
            "status": "owned"
        }
        res = supabase.table("hexes").update(update_data).eq("h3_index", h3_index).execute()
        
        return {"message": "Purchase successful", "asset": res.data[0]}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Purchase failed for {h3_index}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
