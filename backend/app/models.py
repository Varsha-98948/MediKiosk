import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    UniqueConstraint,
    Index,
)
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, nullable=False, index=True)
    passwordHash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="DOCTOR", index=True)
    specialty = Column(String, nullable=True)
    regNo = Column(String, nullable=True)
    roomNumber = Column(String, nullable=True)
    departmentId = Column(String, ForeignKey("Department.id"), nullable=True, index=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = relationship("Department", back_populates="users")
    encounters = relationship("Encounter", back_populates="doctor")

class Department(Base):
    __tablename__ = "Department"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False)
    room = Column(String, nullable=False)

    users = relationship("User", back_populates="department")
    tokens = relationship("QueueToken", back_populates="department")
    sequences = relationship("DepartmentDailySequence", back_populates="department")

class DepartmentDailySequence(Base):
    __tablename__ = "DepartmentDailySequence"

    departmentId = Column(String, ForeignKey("Department.id"), primary_key=True)
    date = Column(String, primary_key=True)  # "YYYY-MM-DD"
    lastTokenNumber = Column(Integer, default=100)

    department = relationship("Department", back_populates="sequences")

class Patient(Base):
    __tablename__ = "Patient"

    id = Column(String, primary_key=True, default=generate_uuid)
    mrn = Column(String, unique=True, nullable=False, index=True)
    abhaId = Column(String, unique=True, nullable=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    phone = Column(String, nullable=False, index=True)
    bloodGroup = Column(String, nullable=True)
    allergies = Column(String, nullable=True)  # JSON string
    chronicConditions = Column(String, nullable=True)  # JSON string
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    tokens = relationship("QueueToken", back_populates="patient", cascade="all, delete-orphan")
    encounters = relationship("Encounter", back_populates="patient", cascade="all, delete-orphan")
    documents = relationship("PatientDocument", back_populates="patient", cascade="all, delete-orphan")

class QueueToken(Base):
    __tablename__ = "QueueToken"

    id = Column(String, primary_key=True, default=generate_uuid)
    tokenNumber = Column(Integer, nullable=False)
    tokenFormatted = Column(String, nullable=False)
    departmentId = Column(String, ForeignKey("Department.id"), nullable=False, index=True)
    patientId = Column(String, ForeignKey("Patient.id"), nullable=False)
    date = Column(String, nullable=False)
    triage = Column(String, default="Routine")
    status = Column(String, default="waiting", index=True)
    chiefComplaint = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = relationship("Department", back_populates="tokens")
    patient = relationship("Patient", back_populates="tokens")
    encounter = relationship("Encounter", back_populates="queueToken", uselist=False)

    __table_args__ = (
        UniqueConstraint("departmentId", "date", "tokenNumber", name="uq_queue_dept_date_token"),
        Index("ix_QueueToken_status_date", "status", "date"),
        Index("ix_QueueToken_departmentId_date", "departmentId", "date"),
    )

class Encounter(Base):
    __tablename__ = "Encounter"

    id = Column(String, primary_key=True, default=generate_uuid)
    patientId = Column(String, ForeignKey("Patient.id"), nullable=False, index=True)
    doctorId = Column(String, ForeignKey("User.id"), nullable=True, index=True)
    tokenId = Column(String, ForeignKey("QueueToken.id"), unique=True, nullable=True)
    status = Column(String, default="in_progress", index=True)
    intakeSummary = Column(String, nullable=True)
    startedAt = Column(DateTime, default=datetime.utcnow)
    completedAt = Column(DateTime, nullable=True)

    patient = relationship("Patient", back_populates="encounters")
    doctor = relationship("User", back_populates="encounters")
    queueToken = relationship("QueueToken", back_populates="encounter")
    vitals = relationship("VitalSigns", back_populates="encounter", uselist=False, cascade="all, delete-orphan")
    clinicalNotes = relationship("ClinicalNote", back_populates="encounter", uselist=False, cascade="all, delete-orphan")
    diagnoses = relationship("Diagnosis", back_populates="encounter", cascade="all, delete-orphan")
    prescriptions = relationship("Prescription", back_populates="encounter", cascade="all, delete-orphan")
    documents = relationship("PatientDocument", back_populates="encounter")

class PatientDocument(Base):
    __tablename__ = "PatientDocument"

    id = Column(String, primary_key=True, default=generate_uuid)
    patientId = Column(String, ForeignKey("Patient.id"), nullable=False, index=True)
    encounterId = Column(String, ForeignKey("Encounter.id"), nullable=True, index=True)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    fileUrl = Column(String, nullable=False)
    storageKey = Column(String, nullable=False)
    storageBucket = Column(String, default="medical-documents")
    mimeType = Column(String, default="image/jpeg")
    fileSizeBytes = Column(Integer, nullable=True)
    extractedData = Column(String, nullable=True)
    clinicalImpression = Column(String, nullable=True)
    confidenceScore = Column(Float, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="documents")
    encounter = relationship("Encounter", back_populates="documents")

class VitalSigns(Base):
    __tablename__ = "VitalSigns"

    id = Column(String, primary_key=True, default=generate_uuid)
    encounterId = Column(String, ForeignKey("Encounter.id"), unique=True, nullable=False)
    systolic = Column(Integer, nullable=True)
    diastolic = Column(Integer, nullable=True)
    pulse = Column(Integer, nullable=True)
    spo2 = Column(Integer, nullable=True)
    temp = Column(Float, nullable=True)
    respiratoryRate = Column(Integer, nullable=True)
    bloodSugarFasting = Column(Integer, nullable=True)
    bloodSugarPostprandial = Column(Integer, nullable=True)
    height = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    bmi = Column(Float, nullable=True)
    bmiCategory = Column(String, nullable=True)
    measuredAt = Column(DateTime, default=datetime.utcnow)

    encounter = relationship("Encounter", back_populates="vitals")

class ClinicalNote(Base):
    __tablename__ = "ClinicalNote"

    id = Column(String, primary_key=True, default=generate_uuid)
    encounterId = Column(String, ForeignKey("Encounter.id"), unique=True, nullable=False)
    hpi = Column(String, nullable=True)
    generalExam = Column(String, nullable=True)
    cvs = Column(String, nullable=True)
    respiratory = Column(String, nullable=True)
    abdomen = Column(String, nullable=True)
    cns = Column(String, nullable=True)
    doctorImpressions = Column(String, nullable=True)

    encounter = relationship("Encounter", back_populates="clinicalNotes")

class Diagnosis(Base):
    __tablename__ = "Diagnosis"

    id = Column(String, primary_key=True, default=generate_uuid)
    encounterId = Column(String, ForeignKey("Encounter.id"), nullable=False, index=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    type = Column(String, default="Primary")
    status = Column(String, default="Active")
    onsetDate = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)

    encounter = relationship("Encounter", back_populates="diagnoses")

class Prescription(Base):
    __tablename__ = "Prescription"

    id = Column(String, primary_key=True, default=generate_uuid)
    encounterId = Column(String, ForeignKey("Encounter.id"), nullable=False, index=True)
    generalAdvice = Column(String, nullable=True)
    generalAdviceTranslations = Column(String, nullable=True)
    rxLanguage = Column(String, default="en")
    isFinalized = Column(Boolean, default=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    encounter = relationship("Encounter", back_populates="prescriptions")
    items = relationship("PrescriptionItem", back_populates="prescription", cascade="all, delete-orphan")

class PrescriptionItem(Base):
    __tablename__ = "PrescriptionItem"

    id = Column(String, primary_key=True, default=generate_uuid)
    prescriptionId = Column(String, ForeignKey("Prescription.id"), nullable=False, index=True)
    drugName = Column(String, nullable=False)
    genericName = Column(String, nullable=True)
    form = Column(String, nullable=False)
    strength = Column(String, nullable=True)
    dosageSchedule = Column(String, nullable=False)
    timing = Column(String, nullable=False)
    frequency = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    instructions = Column(String, nullable=True)
    diffStatus = Column(String, default="NEW")

    prescription = relationship("Prescription", back_populates="items")
