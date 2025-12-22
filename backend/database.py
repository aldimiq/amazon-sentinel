
import os
from supabase import create_client, Client
import redis.asyncio as redis
import logging

logger = logging.getLogger("amazon-sentinel")

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL", "http://kong:8000")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")

supabase: Client = create_client(url, key)

# Initialize Redis client (Strict Mode)
redis_url = os.environ.get("REDIS_URL", "redis://redis:6379/0")
try:
    redis_client = redis.from_url(redis_url, decode_responses=True)
    logger.info(f"✅ Redis client configured at {redis_url}")
except Exception as e:
    logger.error(f"❌ Redis initialization failed: {e}")
    raise e
