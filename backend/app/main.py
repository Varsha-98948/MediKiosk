from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from .config import settings
from .database import get_db
from .routers import auth, patients, queue, encounters, documents

app = FastAPI(
    title="MediKiosk FastAPI Backend",
    description="SIH Target Architecture Async Backend for MediKiosk Smart OPD & EMR Platform",
    version="1.0.0",
)

# Configure CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        settings.APP_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Endpoint
@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    db_connected = False
    try:
        db.execute(text("SELECT 1"))
        db_connected = True
    except Exception as e:
        db_connected = False

    return {
        "status": "ok" if db_connected else "degraded",
        "service": "medikiosk-fastapi-backend",
        "version": "1.0.0",
        "database": "connected" if db_connected else "disconnected",
        "storageBucket": settings.SUPABASE_STORAGE_BUCKET,
    }

# Mount Routers
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(queue.router)
app.include_router(encounters.router)
app.include_router(documents.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
