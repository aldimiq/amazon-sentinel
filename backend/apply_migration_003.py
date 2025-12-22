import asyncio
import asyncpg
import os

# Default from .env.example
DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:sentinel@localhost:5432/postgres")

async def run_migration():
    final_db_url = DB_URL
    # asyncpg requires 'postgresql://' not 'postgresql+asyncpg://'
    if final_db_url.startswith("postgresql+asyncpg://"):
        final_db_url = final_db_url.replace("postgresql+asyncpg://", "postgresql://")

    print(f"Connecting to {final_db_url}...")
    try:
        conn = await asyncpg.connect(final_db_url)
        print("Connected.")
        
        # Adjust path for container environment where /app is the root
        migration_path = "migrations/003_add_owner_id_to_rpc.sql"
        if not os.path.exists(migration_path):
             # Fallback for local run
             migration_path = "backend/migrations/003_add_owner_id_to_rpc.sql"

        with open(migration_path, "r") as f:
            sql = f.read()
            
        print("Executing migration...")
        await conn.execute(sql)
        print("Migration applied successfully.")
        
        await conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(run_migration())
