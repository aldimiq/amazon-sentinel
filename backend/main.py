import os
import logging
import time
from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("amazon-sentinel")

app = FastAPI(title="Amazon Sentinel API")

# Global Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    logger.info(f"REQ: {request.method} {request.url.path} - STATUS: {response.status_code} - {process_time:.2f}ms")
    return response

# CORS Configuration
origins = [
    "http://frontend.sentinel-apps.orb.local",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    logger.info(f"SIGNUP ATTEMPT: {user.email}")
    try:
        res = supabase.auth.sign_up({"email": user.email, "password": user.password})
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

@app.post("/auth/login")
async def login(user: UserAuth):
    logger.info(f"LOGIN ATTEMPT: {user.email}")
    try:
        res = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        return {
            "access_token": res.session.access_token,
            "user": res.user
        }
    except Exception as e:
        logger.error(f"Login Failed for {user.email}: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid email or password.")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Amazon Sentinel API",
        "proxy": "BFF Pattern Verified"
    }