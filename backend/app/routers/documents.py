import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import PatientDocument, Patient
from ..schemas import DocumentCreateRequest, DocumentResponse
from ..config import settings

router = APIRouter(tags=["documents"])

@router.get("/api/patients/{patient_id}/documents")
def get_patient_documents(patient_id: str, db: Session = Depends(get_db)):
    documents = db.query(PatientDocument).filter(
        PatientDocument.patientId == patient_id
    ).order_by(PatientDocument.createdAt.desc()).all()

    result = []
    for doc in documents:
        extracted = {}
        if doc.extractedData:
            try:
                extracted = json.loads(doc.extractedData)
            except Exception:
                pass

        result.append({
            "id": doc.id,
            "patientId": doc.patientId,
            "encounterId": doc.encounterId,
            "title": doc.title,
            "type": doc.type,
            "fileUrl": doc.fileUrl,
            "storageKey": doc.storageKey,
            "storageBucket": doc.storageBucket,
            "mimeType": doc.mimeType,
            "fileSizeBytes": doc.fileSizeBytes,
            "clinicalImpression": doc.clinicalImpression,
            "confidenceScore": doc.confidenceScore,
            "extractedFields": extracted.get("extractedFields", []),
            "medicinesFound": extracted.get("medicinesFound", []),
            "createdAt": doc.createdAt.isoformat() if doc.createdAt else None,
        })

    return {
        "success": True,
        "documents": result
    }

@router.post("/api/documents/upload")
def upload_document(payload: DocumentCreateRequest, db: Session = Depends(get_db)):
    doc = PatientDocument(
        patientId=payload.patientId,
        encounterId=payload.encounterId,
        title=payload.title,
        type=payload.type,
        fileUrl=payload.fileUrl,
        storageKey=payload.storageKey,
        storageBucket=payload.storageBucket,
        mimeType=payload.mimeType,
        fileSizeBytes=payload.fileSizeBytes,
        extractedData=payload.extractedData,
        clinicalImpression=payload.clinicalImpression,
        confidenceScore=payload.confidenceScore,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    return {
        "success": True,
        "document": {
            "id": doc.id,
            "patientId": doc.patientId,
            "title": doc.title,
            "type": doc.type,
            "fileUrl": doc.fileUrl,
            "storageKey": doc.storageKey,
            "storageBucket": doc.storageBucket,
            "mimeType": doc.mimeType,
            "fileSizeBytes": doc.fileSizeBytes,
            "clinicalImpression": doc.clinicalImpression,
            "confidenceScore": doc.confidenceScore,
            "createdAt": doc.createdAt.isoformat() if doc.createdAt else None,
        }
    }
