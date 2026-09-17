import json
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
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

# ── Pydantic schemas for mutation bodies ──────────────────────────────────────

class VitalsUpdate(BaseModel):
    systolic: Optional[float] = None
    diastolic: Optional[float] = None
    pulse: Optional[float] = None
    spo2: Optional[float] = None
    temp: Optional[float] = None
    respiratoryRate: Optional[float] = None
    bloodSugarFasting: Optional[float] = None
    bloodSugarPostprandial: Optional[float] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    bmi: Optional[float] = None
    bmiCategory: Optional[str] = None

class NotesUpdate(BaseModel):
    hpi: Optional[str] = None
    generalExam: Optional[str] = None
    cvs: Optional[str] = None
    respiratory: Optional[str] = None
    abdomen: Optional[str] = None
    cns: Optional[str] = None
    doctorImpressions: Optional[str] = None

class DiagnosisItem(BaseModel):
    code: str
    description: str
    type: Optional[str] = "Primary"
    status: Optional[str] = "Active"
    onsetDate: Optional[str] = None

class DiagnosesUpdate(BaseModel):
    diagnoses: List[DiagnosisItem]

class PrescriptionItemInput(BaseModel):
    id: Optional[str] = None
    drugName: str
    genericName: Optional[str] = None
    form: Optional[str] = None
    strength: Optional[str] = None
    dosageSchedule: Optional[str] = None
    timing: Optional[str] = None
    frequency: Optional[str] = None
    duration: Optional[str] = None
    instructions: Optional[str] = None

class PrescriptionsUpdate(BaseModel):
    items: List[PrescriptionItemInput]
    rxLanguage: Optional[str] = "en"

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


# ── Vitals PATCH ──────────────────────────────────────────────────────────────

@router.patch("/{id}/vitals")
def upsert_vitals(id: str, payload: VitalsUpdate, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        raise HTTPException(status_code=404, detail="Encounter not found")

    vitals = encounter.vitals
    if vitals:
        # Update existing
        for field, value in payload.dict(exclude_none=True).items():
            setattr(vitals, field, value)
    else:
        vitals = VitalSigns(encounterId=encounter.id, **payload.dict(exclude_none=True))
        db.add(vitals)

    db.commit()
    db.refresh(vitals)

    return {"success": True, "vitals": {
        "systolic": vitals.systolic, "diastolic": vitals.diastolic,
        "pulse": vitals.pulse, "spo2": vitals.spo2, "temp": vitals.temp,
        "respiratoryRate": vitals.respiratoryRate,
        "bloodSugarFasting": vitals.bloodSugarFasting,
        "bloodSugarPostprandial": vitals.bloodSugarPostprandial,
        "height": vitals.height, "weight": vitals.weight,
        "bmi": vitals.bmi, "bmiCategory": vitals.bmiCategory,
    }}


# ── Clinical Notes PATCH ──────────────────────────────────────────────────────

@router.patch("/{id}/notes")
def upsert_clinical_notes(id: str, payload: NotesUpdate, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        raise HTTPException(status_code=404, detail="Encounter not found")

    notes = encounter.clinicalNotes
    if notes:
        for field, value in payload.dict(exclude_none=True).items():
            setattr(notes, field, value)
    else:
        notes = ClinicalNote(encounterId=encounter.id, **payload.dict(exclude_none=True))
        db.add(notes)

    db.commit()
    db.refresh(notes)

    return {"success": True, "clinicalNotes": {
        "hpi": notes.hpi, "generalExam": notes.generalExam,
        "cvs": notes.cvs, "respiratory": notes.respiratory,
        "abdomen": notes.abdomen, "cns": notes.cns,
        "doctorImpressions": notes.doctorImpressions,
    }}


# ── Diagnoses POST (full replace) ─────────────────────────────────────────────

@router.post("/{id}/diagnoses")
def save_diagnoses(id: str, payload: DiagnosesUpdate, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        raise HTTPException(status_code=404, detail="Encounter not found")

    # Delete existing diagnoses and reinsert
    db.query(Diagnosis).filter(Diagnosis.encounterId == encounter.id).delete()
    db.flush()

    for d in payload.diagnoses:
        diag = Diagnosis(
            encounterId=encounter.id,
            code=d.code,
            description=d.description,
            type=d.type,
            status=d.status,
            onsetDate=d.onsetDate,
        )
        db.add(diag)

    db.commit()

    return {"success": True, "count": len(payload.diagnoses)}


# ── Prescriptions POST (full replace) ─────────────────────────────────────────

@router.post("/{id}/prescriptions")
def save_prescriptions(id: str, payload: PrescriptionsUpdate, db: Session = Depends(get_db)):
    encounter = db.query(Encounter).filter(Encounter.id == id).first()
    if not encounter:
        raise HTTPException(status_code=404, detail="Encounter not found")

    # Upsert a single Prescription record for this encounter
    rx = db.query(Prescription).filter(Prescription.encounterId == encounter.id).first()
    if not rx:
        rx = Prescription(encounterId=encounter.id, generalAdvice="", isFinalized=False)
        db.add(rx)
        db.flush()

    # Replace all items
    db.query(PrescriptionItem).filter(PrescriptionItem.prescriptionId == rx.id).delete()
    db.flush()

    for item in payload.items:
        pi = PrescriptionItem(
            prescriptionId=rx.id,
            drugName=item.drugName,
            genericName=item.genericName,
            form=item.form,
            strength=item.strength,
            dosageSchedule=item.dosageSchedule,
            timing=item.timing,
            frequency=item.frequency,
            duration=item.duration,
            instructions=item.instructions,
        )
        db.add(pi)

    db.commit()

    return {"success": True, "prescriptionId": rx.id, "itemCount": len(payload.items)}

