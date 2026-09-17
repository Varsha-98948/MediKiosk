import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import (
    Encounter,
    Patient,
    User,
    QueueToken,
    VitalSigns,
    ClinicalNote,
    Diagnosis,
    Prescription,
    PrescriptionItem,
)

router = APIRouter(prefix="/api/encounters", tags=["encounters"])

@router.get("/{id}")
def get_encounter_by_id(id: str, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        encounter = db.query(Encounter).filter(Encounter.patientId == id).order_by(Encounter.startedAt.desc()).first()
    if not encounter:
        encounter = db.query(Encounter).filter(Encounter.tokenId == id).first()

    # If still not found, check if it's a patient and create an initial encounter
    if not encounter:
        patient = db.query(Patient).filter(Patient.id == id).first()
        if patient:
            token = db.query(QueueToken).filter(QueueToken.patientId == patient.id).order_by(QueueToken.createdAt.desc()).first()
            encounter = Encounter(
                patientId=patient.id,
                doctorId="doc-001",
                tokenId=token.id if token else None,
                status="in_progress",
            )
            db.add(encounter)
            db.commit()
            db.refresh(encounter)
        else:
            raise HTTPException(status_code=404, detail="Encounter not found")

    patient = db.query(Patient).filter(Patient.id == encounter.patientId).first()
    doctor = db.query(User).filter(User.id == encounter.doctorId).first() if encounter.doctorId else None
    token = db.query(QueueToken).filter(QueueToken.id == encounter.tokenId).first() if encounter.tokenId else None

    # Load nested relations
    vitals = encounter.vitals
    notes = encounter.clinicalNotes
    diagnoses = encounter.diagnoses
    prescriptions = encounter.prescriptions

    return {
        "success": True,
        "encounter": {
            "id": encounter.id,
            "status": encounter.status,
            "patientId": encounter.patientId,
            "patient": {
                "id": patient.id,
                "mrn": patient.mrn,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "phone": patient.phone,
                "allergies": json.loads(patient.allergies) if patient.allergies else [],
                "chronicConditions": json.loads(patient.chronicConditions) if patient.chronicConditions else [],
            } if patient else None,
            "doctor": {
                "id": doctor.id,
                "name": doctor.name,
                "specialty": doctor.specialty,
                "regNo": doctor.regNo,
            } if doctor else None,
            "token": {
                "id": token.id,
                "tokenFormatted": token.tokenFormatted,
                "status": token.status,
            } if token else None,
            "vitals": {
                "systolic": vitals.systolic,
                "diastolic": vitals.diastolic,
                "pulse": vitals.pulse,
                "spo2": vitals.spo2,
                "temp": vitals.temp,
                "respiratoryRate": vitals.respiratoryRate,
                "bloodSugarFasting": vitals.bloodSugarFasting,
                "bloodSugarPostprandial": vitals.bloodSugarPostprandial,
                "height": vitals.height,
                "weight": vitals.weight,
                "bmi": vitals.bmi,
                "bmiCategory": vitals.bmiCategory,
            } if vitals else None,
            "clinicalNotes": {
                "hpi": notes.hpi,
                "generalExam": notes.generalExam,
                "cvs": notes.cvs,
                "respiratory": notes.respiratory,
                "abdomen": notes.abdomen,
                "cns": notes.cns,
                "doctorImpressions": notes.doctorImpressions,
            } if notes else None,
            "diagnoses": [
                {
                    "id": d.id,
                    "code": d.code,
                    "description": d.description,
                    "type": d.type,
                    "status": d.status,
                    "onsetDate": d.onsetDate,
                }
                for d in diagnoses
            ],
            "prescriptions": [
                {
                    "id": p.id,
                    "generalAdvice": p.generalAdvice,
                    "isFinalized": p.isFinalized,
                    "items": [
                        {
                            "id": i.id,
                            "drugName": i.drugName,
                            "genericName": i.genericName,
                            "form": i.form,
                            "strength": i.strength,
                            "dosageSchedule": i.dosageSchedule,
                            "timing": i.timing,
                            "frequency": i.frequency,
                            "duration": i.duration,
                            "instructions": i.instructions,
                        }
                        for i in p.items
                    ]
                }
                for p in prescriptions
            ],
            "startedAt": encounter.startedAt.isoformat() if encounter.startedAt else None,
            "completedAt": encounter.completedAt.isoformat() if encounter.completedAt else None,
        }
    }

@router.post("/{id}/finalize")
def finalize_encounter(id: str, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        encounter = db.query(Encounter).filter(Encounter.patientId == id).order_by(Encounter.startedAt.desc()).first()
    if not encounter:
        raise HTTPException(status_code=404, detail="Encounter not found")

    encounter.status = "completed"
    encounter.completedAt = datetime.utcnow()

    if encounter.tokenId:
        token = db.query(QueueToken).filter(QueueToken.id == encounter.tokenId).first()
        if token:
            token.status = "completed"

    for rx in encounter.prescriptions:
        rx.isFinalized = True

    db.commit()

    return {
        "success": True,
        "encounterId": encounter.id,
        "status": "completed",
        "completedAt": encounter.completedAt.isoformat()
    }
