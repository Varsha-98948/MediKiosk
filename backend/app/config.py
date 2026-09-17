import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Root directory of the MediKiosk workspace
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = BASE_DIR / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/medikiosk"
    JWT_SECRET: str = "medikiosk-secure-jwt-secret-key-change-in-prod-2026"
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_STORAGE_BUCKET: str = "medical-documents"
    APP_URL: str = "http://localhost:3000"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = str(ENV_FILE)
        extra = "ignore"

settings = Settings()
