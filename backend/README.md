# MediKiosk FastAPI Backend (SIH Target Architecture)

This is the Python FastAPI backend service introduced for SIH technical alignment. It runs alongside the existing Next.js frontend and connects to the shared **Supabase PostgreSQL** database.

## Architecture

```
[ Next.js Frontend (Kiosk & Doctor UI) ]
                   │
                   ▼
       [ FastAPI Backend (Port 8000) ]
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
[ Supabase PostgreSQL ]   [ Supabase Storage ]
```

## Setup & Running

### 1. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 2. Start the FastAPI Service
```bash
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive API documentation will be available at:
* Swagger UI: `http://localhost:8000/docs`
* ReDoc: `http://localhost:8000/redoc`

## Endpoints

* `GET /health` — Health check and database connectivity verification
* `POST /api/auth/login` — Doctor/Staff login & JWT session issuance
* `GET /api/auth/me` — Current authenticated session check
* `GET /api/patients` — Search and list patients from PostgreSQL
* `POST /api/patients/identify` — Patient lookup / auto-registration
* `GET /api/patients/{id}` — Patient profile with encounters & documents
* `GET /api/queue/active` — Active live OPD queue with vitals
* `POST /api/queue/tokens` — Atomic sequence token issuance
* `POST /api/queue/tokens/{id}/call` — Call patient to consultation room
* `GET /api/encounters/{id}` — Full clinical encounter data
* `POST /api/encounters/{id}/finalize` — Finalize consultation & complete queue token
* `GET /api/patients/{id}/documents` — Retrieve patient stored document metadata
* `POST /api/documents/upload` — Record document metadata in PostgreSQL
