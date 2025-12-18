
import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import supabase
from routers import auth, explorer

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
    
    # Avoid logging health checks to keep logs clean, or keep it if desired
    logger.info(f"REQ: {request.method} {request.url.path} - STATUS: {response.status_code} - {process_time:.2f}ms")
    return response

# CORS Configuration
origins = [
    "http://frontend.sentinel-apps.orb.local",
    "https://frontend.sentinel-apps.orb.local",
    "http://backend.sentinel-apps.orb.local",
    "https://backend.sentinel-apps.orb.local",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup Event
@app.on_event("startup")
async def check_supabase_connection():
    try:
        # Check connection by getting session (or just checking client init)
        # Note: get_session() checks local session state, which might be empty on server start.
        # Often just ensuring the client is initialized is enough, or making a simple query.
        # Supabase client doesn't have a simple 'ping', so we rely on init success.
        if supabase:
            logger.info("✅ Supabase client initialized.")
        else:
            logger.error("❌ Supabase client failed to initialize.")
    except Exception as e:
        logger.error(f"❌ Supabase connection error: {str(e)}")

# Include Routers
app.include_router(auth.router)
app.include_router(explorer.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Amazon Sentinel API",
        "proxy": "BFF Pattern Verified"
    }