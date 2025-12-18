import os
import logging
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("amazon-sentinel")

app = FastAPI(title="Amazon Sentinel API")

# CORS
app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL", "http://kong:8000")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.on_event("startup")
async def check_supabase_connection():
    try:
        supabase.auth.get_session()
        logger.info("✅ Supabase connection verified.")
    except Exception as e:
        logger.error(f"❌ Supabase connection failed: {str(e)}")

# --- Pydantic Models ---
class UserAuth(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    password: str

# --- Auth Routes ---

@app.post("/auth/signup")
async def signup(user: UserAuth):
    try:
        # Note: Local Supabase might require email confirmation unless 'ENABLE_EMAIL_AUTOCONFIRM' is true in .env
        res = supabase.auth.sign_up({"email": user.email, "password": user.password})
        
        # In Supabase, if email confirmation is on, session will be null
        if res.session:
            return {
                "message": "Signup successful", 
                "user": res.user, 
                "access_token": res.session.access_token
            }
        else:
            return {"message": "Signup successful! Please check your email to verify your account.", "user": res.user}
            
    except Exception as e:
        logger.error(f"Signup Failed: {str(e)}")
        # Handle specific error cases from Supabase
        detail = str(e)
        if "User already registered" in detail:
            detail = "This email is already registered."
        raise HTTPException(status_code=400, detail=detail)

@app.post("/auth/login")
async def login(user: UserAuth):
    try:
        res = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        return {
            "access_token": res.session.access_token,
            "user": res.user
        }
    except Exception as e:
        logger.error(f"Login Failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid email or password.")

@app.post("/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    try:
        # Sends a reset link to the user's email
        supabase.auth.reset_password_for_email(req.email)
        return {"message": "Password reset link sent to your email."}
    except Exception as e:
        logger.error(f"Forgot Password Failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/reset-password")
async def reset_password(req: ResetPasswordRequest):
    try:
        # This assumes the user is authenticated (they clicked the link which gave them a session)
        # Or you pass the access token in the header
        supabase.auth.update_user({"password": req.password})
        return {"message": "Password updated successfully."}
    except Exception as e:
        logger.error(f"Reset Password Failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "Running"}