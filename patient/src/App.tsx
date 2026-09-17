'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  Hospital, 
  Sparkles, 
  Tv, 
  Play, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  Ticket, 
  RefreshCw, 
  Sliders, 
  Activity,
  Layers,
  FileCheck2,
  Lock,
  UserCheck
} from 'lucide-react';

// New Core Architectural Modules
import { LandingPage } from './components/landing/LandingPage';
import { PatientKioskFlow } from './components/patient/PatientKioskFlow';
import { GlassboxDoctorWorkspace } from './components/doctor/GlassboxDoctorWorkspace';
import { AyushIntelligenceEngine } from './components/ayush/AyushIntelligenceEngine';
import { HospitalOperationsDashboard } from './components/operations/HospitalOperationsDashboard';
import { EcosystemNavbar, EcosystemView } from './components/navigation/EcosystemNavbar';
import { AllServicesModal } from './components/navigation/AllServicesModal';
import { AccessibilityBiometricsPanel } from './components/patient/AccessibilityBiometricsPanel';
import { RedFlagAlertModal } from './components/patient/RedFlagAlertModal';
import { HospitalWaitingRoomDisplay } from './components/common/HospitalWaitingRoomDisplay';

// Previous modules for rich interactive exploration
import { MedicineExplorer } from './components/modules/MedicineExplorer';
import { HealthReels } from './components/modules/HealthReels';
import { XrayViewer } from './components/modules/XrayViewer';
import { FirstAidRedFlagCenter } from './components/modules/FirstAidRedFlagCenter';
import { DoctorAppointmentBooking } from './components/modules/DoctorAppointmentBooking';
import { HealthGuide } from './components/modules/HealthGuide';
import { MedicalFeaturesHub } from './components/common/MedicalFeaturesHub';
import { DesignSystemScreenMatrix } from './components/common/DesignSystemScreenMatrix';

import { mockPatients, mockDoctors } from './data/mockData';
import { 
  Language, 
  PatientRecord, 
  HospitalToken, 
  DoctorProfile, 
  MedicalDocument,
  PrescriptionRecord
} from './types';
import { speakText } from './utils/speech';

export type ActiveAppView = 
  | 'landing' 
  | 'kiosk' 
  | 'doctor' 
  | 'ayush_engine' 
  | 'operations'
  | 'waiting_tv'
  | 'design_system' 
  | 'features_hub' 
  | 'medicine_explorer' 
  | 'health_reels' 
  | 'xray_viewer' 
  | 'first_aid_center' 
  | 'appointment_booking' 
  | 'health_guide';

export default function App() {
  // Master Ecosystem Navigation State (Defaults directly to Landing Page)
  const [currentApp, setCurrentApp] = useState<ActiveAppView>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [showGlobalAccessibility, setShowGlobalAccessibility] = useState(false);
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);

  // Connectivity & Queue Simulation State
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentServingToken, setCurrentServingToken] = useState('A-121');
  const [servingPatientName, setServingPatientName] = useState('Ramesh Chandra');
  const [servingRoom, setServingRoom] = useState('Room 101 (OPD Block A)');
  const [servingDoctor, setServingDoctor] = useState('Dr. Ananya Sharma');
  const [servingDepartment, setServingDepartment] = useState('General Medicine');

  // Patients State
  const [patients, setPatients] = useState<PatientRecord[]>(mockPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(mockPatients[0].id);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorProfile>(mockDoctors[0]);
  const [showRedFlagModal, setShowRedFlagModal] = useState(false);
  const [callAnnouncement, setCallAnnouncement] = useState<string | null>(null);

  // Active Patient lookup
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Handle Token Generated on Kiosk
  const handleTokenGenerated = (token: HospitalToken) => {
    const newPat: PatientRecord = {
      ...activePatient,
      id: token.patientId,
      tokenNumber: token.tokenNumber,
      name: token.patientName,
      phone: token.phone,
      age: token.age,
      gender: token.gender,
      abhaId: token.abhaId || activePatient.abhaId,
      department: token.departmentName,
      assignedDoctor: token.doctorName,
      roomNumber: token.roomNumber,
      queueStatus: 'waiting',
      priority: token.isEmergency ? 'urgent' : 'routine',
      chiefComplaint: token.reasonForVisit,
      intakeSummary: {
        ...activePatient.intakeSummary,
        chiefComplaint: token.reasonForVisit,
      },
    };

    setPatients(prev => [newPat, ...prev.filter(p => p.id !== newPat.id)]);
    setSelectedPatientId(newPat.id);
  };

  // Call Next Patient (Simulation workflow)
  const handleCallNextPatient = () => {
    const nextInLine = patients.find(p => p.tokenNumber !== currentServingToken && p.queueStatus !== 'completed') || patients[0];
    
    setCurrentServingToken(nextInLine.tokenNumber);
    setServingPatientName(nextInLine.name);
    setServingRoom(nextInLine.roomNumber || 'Room 104 (OPD A)');
    setServingDoctor(nextInLine.assignedDoctor || 'Dr. Rajeshwar Sen');
    setSelectedPatientId(nextInLine.id);

    const announcement = `Attention please. Token Number ${nextInLine.tokenNumber}, Patient ${nextInLine.name}, please proceed to ${nextInLine.roomNumber || 'Room 104'}.`;
    setCallAnnouncement(announcement);
    speakText(announcement, language);

    setTimeout(() => {
      setCallAnnouncement(null);
    }, 5000);
  };

  // Simulate Emergency Arrival
  const handleSimulateEmergency = () => {
    const emergToken = `E-911`;
    const emergPatient: PatientRecord = {
      ...mockPatients[0],
      id: `pat-emerg-${Date.now()}`,
      tokenNumber: emergToken,
      name: 'Kailash Joshi (Acute Triage)',
      age: 58,
      gender: 'male',
      priority: 'urgent',
      queueStatus: 'waiting',
      chiefComplaint: 'Acute Crushing Chest Pain radiating to jaw and left arm (ACS Alert)',
      intakeSummary: {
        ...mockPatients[0].intakeSummary,
        chiefComplaint: 'Acute Sub-sternal Pain radiating to jaw & left arm × 30 mins',
        painScore: 9,
        redFlagReason: 'Suspected Acute Coronary Syndrome / Myocardial Infarction',
      }
    };

    setPatients(prev => [emergPatient, ...prev]);
    setSelectedPatientId(emergPatient.id);
    setShowRedFlagModal(true);

    const alertSpeech = `Emergency Alert. Priority Token ${emergToken} registered with acute chest distress.`;
    speakText(alertSpeech, language);
  };

  // Toggle Offline Sync
  const handleToggleOfflineSync = () => {
    if (isOnline) {
      setIsOnline(false);
    } else {
      setIsSyncing(true);
      setTimeout(() => {
        setIsOnline(true);
        setIsSyncing(false);
      }, 1500);
    }
  };

  const mapAppToEcosystemView = (app: ActiveAppView): EcosystemView => {
    if (app === 'kiosk' || app === 'doctor' || app === 'ayush_engine' || app === 'operations') {
      return app;
    }
    return 'landing';
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-stone-900 flex flex-col font-['Outfit'] pb-20">
      
      {/* 1. Global Master Ecosystem Header */}
      <EcosystemNavbar
        currentView={mapAppToEcosystemView(currentApp)}
        onSelectView={(view) => setCurrentApp(view as ActiveAppView)}
        language={language}
        onSelectLanguage={(lang) => {
          setLanguage(lang);
          speakText(lang === 'hi' ? 'हिंदी भाषा चुनी गई है' : lang === 'mr' ? 'मराठी भाषा निवडली आहे' : 'English selected', lang);
        }}
        currentServingToken={currentServingToken}
        onCallNextToken={handleCallNextPatient}
        onSimulateEmergency={handleSimulateEmergency}
        isOnline={isOnline}
        onToggleOnline={handleToggleOfflineSync}
        onToggleAccessibility={() => setShowGlobalAccessibility(!showGlobalAccessibility)}
        onOpenAllServices={() => setShowAllServicesModal(true)}
        hasRedFlagActive={patients.some(p => p.priority === 'urgent')}
      />

      {/* 2. Audio PA Broadcast Announcement Bar - Crisp Clean Alert */}
      {callAnnouncement && (
        <div className="bg-amber-100 border-b-2 border-amber-500 text-amber-950 font-bold px-4 py-2.5 text-center text-xs sm:text-sm flex items-center justify-center gap-2">
          <span>📢 <strong>Hospital PA Announcement:</strong> {callAnnouncement}</span>
        </div>
      )}

      {/* 3. Global Accessibility Drawer Modal */}
      {showGlobalAccessibility && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-4">
          <AccessibilityBiometricsPanel
            language={language}
            onClose={() => setShowGlobalAccessibility(false)}
            onApplyBiometrics={(b) => {
              setShowGlobalAccessibility(false);
              alert(`Biometrics recorded: RHR ${b.rhr} BPM, Stress ${b.stressScore}/100.`);
            }}
          />
        </div>
      )}

      {/* 4. Main Dynamic Experience Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col justify-start">
        
        {/* VIEW 1: MASTER LANDING PAGE */}
        {currentApp === 'landing' && (
          <LandingPage
            language={language}
            onExplorePlatform={() => setCurrentApp('kiosk')}
            onOpenKiosk={() => setCurrentApp('kiosk')}
            onOpenDoctor={() => setCurrentApp('doctor')}
            onOpenAyushEngine={() => setCurrentApp('ayush_engine')}
            onOpenOperations={() => setCurrentApp('operations')}
            onOpenMedicineExplorer={() => setCurrentApp('medicine_explorer')}
            onOpenXrayViewer={() => setCurrentApp('xray_viewer')}
            onOpenFirstAid={() => setCurrentApp('first_aid_center')}
            onOpenAppointments={() => setCurrentApp('appointment_booking')}
            onOpenAllServices={() => setShowAllServicesModal(true)}
          />
        )}

        {/* VIEW 2: PATIENT KIOSK (Section 3, 4, 5, 6) */}
        {currentApp === 'kiosk' && (
          <PatientKioskFlow
            language={language}
            onSelectLanguage={(lang) => setLanguage(lang)}
            onTokenGenerated={handleTokenGenerated}
            onSwitchToDoctor={() => setCurrentApp('doctor')}
            onEmergencyAlert={handleSimulateEmergency}
          />
        )}

        {/* VIEW 3: DOCTOR GLASSBOX EMR WORKSPACE (Section 8, 9, 10, 11, 12, 13, 14, 15, 16, 17) */}
        {currentApp === 'doctor' && (
          <GlassboxDoctorWorkspace
            patients={patients}
            activePatientId={selectedPatientId}
            onSelectPatient={(id) => setSelectedPatientId(id)}
            onCallNextPatient={handleCallNextPatient}
            language={language}
            doctorProfile={currentDoctor}
          />
        )}

        {/* VIEW 4: AYUSH CLINICAL INTELLIGENCE ENGINE (Section 7) */}
        {currentApp === 'ayush_engine' && (
          <AyushIntelligenceEngine
            patient={activePatient}
            language={language}
            onNavigateToCoding={() => setCurrentApp('doctor')}
          />
        )}

        {/* VIEW 5: SMART HOSPITAL OPERATIONS & SURVEILLANCE (Section 18, 19, 20) */}
        {currentApp === 'operations' && (
          <HospitalOperationsDashboard
            patients={patients}
            currentServingToken={currentServingToken}
            onCallNextPatient={handleCallNextPatient}
            language={language}
          />
        )}

        {/* VIEW 6: WAITING HALL TV DISPLAY */}
        {currentApp === 'waiting_tv' && (
          <HospitalWaitingRoomDisplay
            language={language}
            currentServingToken={currentServingToken}
            servingRoom={servingRoom}
            servingDoctor={servingDoctor}
            servingDepartment={servingDepartment}
            servingPatientName={servingPatientName}
            waitingTokens={patients.map(p => ({
              token: p.tokenNumber,
              patientName: p.name,
              dept: p.assignedDoctor ? 'Cardiology' : 'General Medicine',
              status: p.queueStatus,
              isPriority: p.priority === 'urgent',
            }))}
            onSimulateNextToken={handleCallNextPatient}
            onBackToKiosk={() => setCurrentApp('kiosk')}
          />
        )}

        {/* OTHER SECONDARY MODULES (Explorable anytime) */}
        {currentApp === 'medicine_explorer' && (
          <MedicineExplorer language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'health_reels' && (
          <HealthReels language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'xray_viewer' && (
          <XrayViewer language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'first_aid_center' && (
          <FirstAidRedFlagCenter language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'appointment_booking' && (
          <DoctorAppointmentBooking language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'health_guide' && (
          <HealthGuide language={language} onBack={() => setCurrentApp('landing')} />
        )}
        {currentApp === 'features_hub' && (
          <MedicalFeaturesHub
            language={language}
            onNavigateToScreen={(app) => setCurrentApp(app as any)}
            onOpenModule={(mod) => setCurrentApp(mod as any)}
          />
        )}
        {currentApp === 'design_system' && (
          <DesignSystemScreenMatrix onNavigateToScreen={(app) => setCurrentApp(app as any)} />
        )}

      </main>

      {/* Red Flag Escalation Modal */}
      {showRedFlagModal && (
        <RedFlagAlertModal
          language={language}
          isOpen={showRedFlagModal}
          onContinue={() => setShowRedFlagModal(false)}
          onCallStaff={() => {
            alert('Triage Nurse alerted to Kiosk #01. Vital monitor dispatched.');
            setShowRedFlagModal(false);
          }}
        />
      )}

      {/* 5. Persistent Live Simulation Toolbar - Clean Bordered White Strip */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-stone-300 py-2.5 px-4 text-stone-900 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 font-bold text-[#166E7E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#166E7E]"></span>
            <span>Hospital Simulator:</span>
            <span className="text-stone-600 font-normal hidden sm:inline">
              Serving: <strong className="font-mono bg-stone-100 px-2 py-0.5 rounded border border-stone-300 text-stone-900">{currentServingToken}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            
            {/* Quick Switch: Landing */}
            <button
              type="button"
              onClick={() => setCurrentApp('landing')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentApp === 'landing' ? 'bg-[#166E7E] text-white border-[#0F4B56]' : 'bg-white text-stone-700 border-stone-300 hover:border-[#166E7E]'
              }`}
            >
              🏠 Landing
            </button>

            {/* Quick Switch: Kiosk - Orange */}
            <button
              type="button"
              onClick={() => setCurrentApp('kiosk')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentApp === 'kiosk' ? 'bg-[#C05C29] text-white border-[#9C4519]' : 'bg-white text-stone-700 border-stone-300 hover:border-[#C05C29]'
              }`}
            >
              🏥 1. Kiosk
            </button>

            {/* Quick Switch: Doctor - Purple */}
            <button
              type="button"
              onClick={() => setCurrentApp('doctor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentApp === 'doctor' ? 'bg-[#6355DC] text-white border-[#4E41B8]' : 'bg-white text-stone-700 border-stone-300 hover:border-[#6355DC]'
              }`}
            >
              👨‍⚕️ 2. Doctor
            </button>

            {/* Quick Switch: Ayush Engine - Gold */}
            <button
              type="button"
              onClick={() => setCurrentApp('ayush_engine')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentApp === 'ayush_engine' ? 'bg-[#C59E27] text-white border-[#9E7D1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-[#C59E27]'
              }`}
            >
              🌿 3. Ayush
            </button>

            {/* Quick Switch: Operations - Berry */}
            <button
              type="button"
              onClick={() => setCurrentApp('operations')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentApp === 'operations' ? 'bg-[#B83253] text-white border-[#8F223D]' : 'bg-white text-stone-700 border-stone-300 hover:border-[#B83253]'
              }`}
            >
              🏢 4. Ops
            </button>

            {/* Next Token Call - Teal */}
            <button
              type="button"
              onClick={handleCallNextPatient}
              className="px-3.5 py-1.5 bg-[#166E7E] hover:bg-[#0F4B56] text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer border-2 border-[#0F4B56] whitespace-nowrap btn-tactile"
              title="Advances queue and triggers vocal audio announcement"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>▶ Next Token</span>
            </button>

            {/* Emergency Triage Simulation */}
            <button
              type="button"
              onClick={handleSimulateEmergency}
              className="px-3 py-1.5 bg-red-50 text-red-800 hover:bg-red-100 border-2 border-red-600 rounded-lg font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap btn-tactile"
              title="Simulates an urgent chest pain patient arrival"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>+ Emergency</span>
            </button>

            {/* Online / Offline Toggle */}
            <button
              type="button"
              onClick={handleToggleOfflineSync}
              className={`px-2.5 py-1.5 rounded-lg font-bold border-2 transition-colors cursor-pointer whitespace-nowrap btn-tactile ${
                isOnline
                  ? 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                  : 'bg-amber-100 text-amber-900 border-amber-600'
              }`}
            >
              {isSyncing ? (
                <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Syncing...</span>
              ) : isOnline ? (
                <span>📶 Online</span>
              ) : (
                <span>📴 Offline</span>
              )}
            </button>

          </div>

        </div>
      </footer>

      {/* 6. All Services Discovery Modal */}
      <AllServicesModal
        isOpen={showAllServicesModal}
        onClose={() => setShowAllServicesModal(false)}
        language={language}
        onSelectService={(serviceId) => setCurrentApp(serviceId as ActiveAppView)}
      />

    </div>
  );
}
