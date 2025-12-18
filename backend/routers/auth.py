
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from database import supabase
import logging

# Configure logging
logger = logging.getLogger("amazon-sentinel")

router = APIRouter(prefix="/auth", tags=["auth"])

# --- Pydantic Models ---
class UserAuth(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    password: str

# --- Routes ---
@router.post("/signup")
async def signup(user: UserAuth):
    logger.info(f"SIGNUP ATTEMPT: {user.email}")
    try:
        res = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password
        })
        if res.session:
            return {
                "message": "Signup successful", 
                "user": res.user, 
                "access_token": res.session.access_token
            }
        else:
            return {"message": "Signup successful! Check email.", "user": res.user}
    except Exception as e:
        logger.error(f"Signup Failed for {user.email}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(user: UserAuth):
    logger.info(f"LOGIN ATTEMPT: {user.email}")
    try:
        res = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })
        return {
            "access_token": res.session.access_token,
            "user": res.user
        }
    except Exception as e:
        logger.error(f"Login Failed for {user.email}: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid email or password.")
