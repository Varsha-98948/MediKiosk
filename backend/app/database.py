import os
import urllib.parse
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from .config import settings

def create_db_engine():
    raw_url = settings.DATABASE_URL
    if raw_url.startswith("postgres://"):
        raw_url = raw_url.replace("postgres://", "postgresql://", 1)
        
    parsed = urllib.parse.urlsplit(raw_url)
    user = urllib.parse.unquote(parsed.username) if parsed.username else None
    password = urllib.parse.unquote(parsed.password) if parsed.password else None
    host = parsed.hostname
    port = parsed.port or 5432
    dbname = parsed.path.lstrip('/') if parsed.path else 'postgres'

    return create_engine(
        "postgresql+psycopg2://",
        creator=lambda: psycopg2.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            dbname=dbname,
            sslmode="require" if host and "supabase" in host else "prefer",
            connect_timeout=10,
        ),
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )

engine = create_db_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
