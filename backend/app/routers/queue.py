from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import QueueToken, Department, DepartmentDailySequence, Patient, User, Encounter, VitalSigns
from ..schemas import TokenCreateRequest

router = APIRouter(prefix="/api/queue", tags=["queue"])

@router.get("/active")
def get_active_queue(db: Session = Depends(get_db)):
    today = datetime.utcnow().strftime("%Y-%m-%d")
    
    tokens = db.query(QueueToken).filter(
        QueueToken.status.in_(["waiting", "in_consultation", "priority", "urgent"])
    ).order_by(
        QueueToken.triage.desc(),
        QueueToken.tokenNumber.asc()
    ).all()

    result = []
    for t in tokens:
        dept = db.query(Department).filter(Department.id == t.departmentId).first()
        patient = db.query(Patient).filter(Patient.id == t.patientId).first()
        encounter = db.query(Encounter).filter(Encounter.tokenId == t.id).first()
        doctor = None
        if encounter and encounter.doctorId:
            doctor = db.query(User).filter(User.id == encounter.doctorId).first()
        elif dept:
            doctor = db.query(User).filter(User.departmentId == dept.id, User.role == "DOCTOR").first()

        vitals_obj = None
        if encounter and encounter.vitals:
            vitals_obj = {
                "bp": f"{encounter.vitals.systolic or '--'}/{encounter.vitals.diastolic or '--'}",
                "pulse": f"{encounter.vitals.pulse or '--'} bpm",
                "spo2": f"{encounter.vitals.spo2 or '--'}%",
                "temp": f"{encounter.vitals.temp or '--'}°F",
            }

        result.append({
            "id": t.id,
            "tokenNumber": t.tokenNumber,
            "tokenFormatted": t.tokenFormatted,
            "departmentId": t.departmentId,
            "departmentName": dept.name if dept else "General Medicine",
            "departmentCode": dept.code if dept else "A",
            "departmentRoom": dept.room if dept else "Room 3",
            "patientId": t.patientId,
            "patientName": patient.name if patient else "Unknown Patient",
            "patientMrn": patient.mrn if patient else "",
            "patientAge": patient.age if patient else 30,
            "patientGender": patient.gender if patient else "Male",
            "patientPhone": patient.phone if patient else "",
            "date": t.date,
            "triage": t.triage,
            "status": t.status,
            "chiefComplaint": t.chiefComplaint or "",
            "doctorName": doctor.name if doctor else "Dr. Dhananjay Chavan",
            "doctorSpecialty": doctor.specialty if doctor else "General Medicine",
            "vitals": vitals_obj,
            "createdAt": t.createdAt.isoformat() if t.createdAt else None,
        })

    return {
        "success": True,
        "queue": result,
        "total": len(result),
        "waiting": sum(1 for q in result if q["status"] == "waiting"),
        "inConsultation": sum(1 for q in result if q["status"] == "in_consultation"),
    }

@router.post("/tokens")
def create_queue_token(payload: TokenCreateRequest, db: Session = Depends(get_db)):
    today = datetime.utcnow().strftime("%Y-%m-%d")
    dept_id = payload.departmentId or "gen_med"

    dept = db.query(Department).filter(Department.id == dept_id).first()
    if not dept:
        dept = db.query(Department).first()
        dept_id = dept.id if dept else "gen_med"

    # Atomic sequence increment
    seq = db.query(DepartmentDailySequence).filter(
        DepartmentDailySequence.departmentId == dept_id,
        DepartmentDailySequence.date == today
    ).with_for_update().first()

    if not seq:
        seq = DepartmentDailySequence(
            departmentId=dept_id,
            date=today,
            lastTokenNumber=101
        )
        db.add(seq)
        db.flush()
        next_number = 101
    else:
        seq.lastTokenNumber += 1
        next_number = seq.lastTokenNumber
        db.flush()

    prefix = dept.code if dept else "A"
    formatted = f"{prefix}-{next_number}"

    new_token = QueueToken(
        tokenNumber=next_number,
        tokenFormatted=formatted,
        departmentId=dept_id,
        patientId=payload.patientId,
        date=today,
        triage=payload.triage or "Routine",
        status="waiting",
        chiefComplaint=payload.chiefComplaint
    )
    db.add(new_token)
    db.commit()
    db.refresh(new_token)

    doctor = db.query(User).filter(User.departmentId == dept_id, User.role == "DOCTOR").first()

    return {
        "success": True,
        "token": {
            "id": new_token.id,
            "tokenNumber": new_token.tokenNumber,
            "tokenFormatted": new_token.tokenFormatted,
            "departmentId": new_token.departmentId,
            "departmentName": dept.name if dept else "General Medicine",
            "departmentRoom": dept.room if dept else "Room 3",
            "date": new_token.date,
            "status": new_token.status,
            "triage": new_token.triage,
            "doctorName": doctor.name if doctor else "Dr. Dhananjay Chavan",
            "createdAt": new_token.createdAt.isoformat()
        }
    }

@router.post("/tokens/{id}/call")
def call_patient_token(id: str, payload: dict = {}, db: Session = Depends(get_db)):
    token = db.query(QueueToken).filter(QueueToken.id == id).first()
    if not token:
        token = db.query(QueueToken).filter(QueueToken.tokenFormatted == id).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")

    token.status = "in_consultation"
    db.commit()

    return {
        "success": True,
        "token": {
            "id": token.id,
            "tokenFormatted": token.tokenFormatted,
            "status": token.status,
        }
    }
