from typing import List, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    specialty: Optional[str] = None
    regNo: Optional[str] = None
    roomNumber: Optional[str] = None
    departmentId: Optional[str] = None

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    phone: str
    abhaId: Optional[str] = None
    bloodGroup: Optional[str] = None
    allergies: Optional[List[str]] = []
    chronicConditions: Optional[List[str]] = []

class PatientResponse(BaseModel):
    id: str
    mrn: str
    abhaId: Optional[str] = None
    name: str
    age: int
    gender: str
    phone: str
    bloodGroup: Optional[str] = None
    allergies: Optional[str] = None
    chronicConditions: Optional[str] = None
    createdAt: datetime

    class Config:
        from_attributes = True

class QueueTokenResponse(BaseModel):
    id: str
    tokenNumber: int
    tokenFormatted: str
    departmentId: str
    departmentName: Optional[str] = None
    departmentCode: Optional[str] = None
    departmentRoom: Optional[str] = None
    patientId: str
    patientName: Optional[str] = None
    patientMrn: Optional[str] = None
    patientAge: Optional[int] = None
    patientGender: Optional[str] = None
    patientPhone: Optional[str] = None
    date: str
    triage: str
    status: str
    chiefComplaint: Optional[str] = None
    doctorName: Optional[str] = None
    createdAt: datetime

class TokenCreateRequest(BaseModel):
    patientId: str
    departmentId: Optional[str] = "gen_med"
    triage: Optional[str] = "Routine"
    chiefComplaint: Optional[str] = None

class DocumentCreateRequest(BaseModel):
    patientId: str
    encounterId: Optional[str] = None
    title: str
    type: str = "lab_report"
    fileUrl: str
    storageKey: str
    storageBucket: str = "medical-documents"
    mimeType: str = "image/jpeg"
    fileSizeBytes: Optional[int] = None
    extractedData: Optional[str] = None
    clinicalImpression: Optional[str] = None
    confidenceScore: Optional[float] = None

class DocumentResponse(BaseModel):
    id: str
    patientId: str
    encounterId: Optional[str] = None
    title: str
    type: str
    fileUrl: str
    storageKey: str
    storageBucket: str
    mimeType: str
    fileSizeBytes: Optional[int] = None
    extractedData: Optional[str] = None
    clinicalImpression: Optional[str] = None
    confidenceScore: Optional[float] = None
    createdAt: datetime

    class Config:
        from_attributes = True
