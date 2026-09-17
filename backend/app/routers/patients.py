import json
import random
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from ..database import get_db
from ..models import Patient
from ..schemas import PatientCreate, PatientResponse

router = APIRouter(prefix="/api/patients", tags=["patients"])

def generate_mrn(db: Session) -> str:
    # Auto-generate UHID like UHID-90288
    for _ in range(10):
        candidate = f"UHID-{random.randint(90000, 99999)}"
        exists = db.query(Patient).filter(Patient.mrn == candidate).first()
        if not exists:
            return candidate
    return f"UHID-{random.randint(100000, 999999)}"

@router.get("")
def get_patients(
    query: Optional[str] = Query(None),
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db)
):
    q = db.query(Patient)
    if query:
        pattern = f"%{query}%"
        q = q.filter(
            or_(
                Patient.name.ilike(pattern),
                Patient.mrn.ilike(pattern),
                Patient.phone.ilike(pattern),
                Patient.abhaId.ilike(pattern)
            )
        )
    patients = q.order_by(Patient.createdAt.desc()).limit(limit).all()
    
    return {
        "success": True,
        "patients": [
            {
                "id": p.id,
                "mrn": p.mrn,
                "abhaId": p.abhaId,
                "name": p.name,
                "age": p.age,
                "gender": p.gender,
                "phone": p.phone,
                "bloodGroup": p.bloodGroup,
                "allergies": json.loads(p.allergies) if p.allergies else [],
                "chronicConditions": json.loads(p.chronicConditions) if p.chronicConditions else [],
                "createdAt": p.createdAt.isoformat() if p.createdAt else None
            }
            for p in patients
        ]
    }

@router.post("/identify")
def identify_patient(payload: dict, db: Session = Depends(get_db)):
    abha_id = payload.get("abhaId")
    phone = payload.get("phone")
    name = payload.get("name")
    age = payload.get("age", 30)
    gender = payload.get("gender", "Male")
    blood_group = payload.get("bloodGroup")
    allergies = payload.get("allergies", [])
    chronic_conditions = payload.get("chronicConditions", [])

    patient = None
    if abha_id:
        patient = db.query(Patient).filter(Patient.abhaId == abha_id).first()
    if not patient and phone:
        patient = db.query(Patient).filter(Patient.phone == phone).first()

    if patient:
        return {
            "success": True,
            "patient": {
                "id": patient.id,
                "mrn": patient.mrn,
                "abhaId": patient.abhaId,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "phone": patient.phone,
                "bloodGroup": patient.bloodGroup,
                "allergies": json.loads(patient.allergies) if patient.allergies else [],
                "chronicConditions": json.loads(patient.chronicConditions) if patient.chronicConditions else [],
            },
            "isNew": False
        }

    # Register new patient
    new_mrn = generate_mrn(db)
    new_abha = abha_id or f"91-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"

    new_patient = Patient(
        mrn=new_mrn,
        abhaId=new_abha,
        name=name or "Walk-in Patient",
        age=int(age),
        gender=gender,
        phone=phone or "+91 00000 00000",
        bloodGroup=blood_group,
        allergies=json.dumps(allergies) if isinstance(allergies, list) else json.dumps([]),
        chronicConditions=json.dumps(chronic_conditions) if isinstance(chronic_conditions, list) else json.dumps([]),
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return {
        "success": True,
        "patient": {
            "id": new_patient.id,
            "mrn": new_patient.mrn,
            "abhaId": new_patient.abhaId,
            "name": new_patient.name,
            "age": new_patient.age,
            "gender": new_patient.gender,
            "phone": new_patient.phone,
            "bloodGroup": new_patient.bloodGroup,
            "allergies": json.loads(new_patient.allergies) if new_patient.allergies else [],
            "chronicConditions": json.loads(new_patient.chronicConditions) if new_patient.chronicConditions else [],
        },
        "isNew": True
    }

@router.get("/{id}")
def get_patient_by_id(id: str, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        patient = db.query(Patient).filter(Patient.mrn == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    return {
        "success": True,
        "patient": {
            "id": patient.id,
            "mrn": patient.mrn,
            "abhaId": patient.abhaId,
            "name": patient.name,
            "age": patient.age,
            "gender": patient.gender,
            "phone": patient.phone,
            "bloodGroup": patient.bloodGroup,
            "allergies": json.loads(patient.allergies) if patient.allergies else [],
            "chronicConditions": json.loads(patient.chronicConditions) if patient.chronicConditions else [],
            "createdAt": patient.createdAt.isoformat() if patient.createdAt else None
        }
    }
