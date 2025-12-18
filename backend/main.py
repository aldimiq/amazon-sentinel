import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("amazon-sentinel")

app = FastAPI(title="Amazon Sentinel API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client Initialization
SUPABASE_URL = os.getenv("SUPABASE_URL", "http://kong:8000")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_KEY:
    logger.error("CRITICAL: SUPABASE_SERVICE_KEY not set.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Connection Checker ---
@app.on_event("startup")
async def check_supabase_connection():
    logger.info(f"Checking Supabase connection at {SUPABASE_URL}...")
    try:
        # Simple health check query
        # We try to list buckets or just a simple auth check
        supabase.auth.get_session()
        logger.info("✅ Supabase Auth connection verified.")
    except Exception as e:
        logger.error(f"❌ Supabase connection failed: {str(e)}")

# --- Pydantic Models ---
class UserAuth(BaseModel):
    email: EmailStr
    password: str

# --- Auth Routes ---

@app.post("/auth/signup")
async def signup(user: UserAuth):
    try:
        res = supabase.auth.sign_up({
            "email": user.email, 
            "password": user.password
        })
        return {"message": "Signup successful", "user": res.user}
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/login")
async def login(user: UserAuth):
    try:
        res = supabase.auth.sign_in_with_password({
            "email": user.email, 
            "password": user.password
        })
        return {
            "access_token": res.session.access_token,
            "refresh_token": res.session.refresh_token,
            "user": res.user
        }
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/")
def read_root():
    return {"status": "Amazon Sentinel Backend is Running"}