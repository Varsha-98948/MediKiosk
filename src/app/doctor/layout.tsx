'use client';

import React from 'react';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { ClinicalEncounterProvider } from '@/context/ClinicalEncounterContext';
import { Header } from '@/components/doctor/layout/Header';
import { Sidebar } from '@/components/doctor/layout/Sidebar';
import { A4PrescriptionModal } from '@/components/doctor/encounter/A4PrescriptionModal';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['doctor', 'admin']}>
      <ClinicalEncounterProvider>
        <div className="flex min-h-screen bg-background text-on-surface antialiased select-none">
          <div className="no-print">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col pl-64 min-w-0">
            <div className="no-print">
              <Header />
            </div>
            <main className="flex-1 pt-14 p-4 md:p-6 bg-background overflow-y-auto">
              {children}
            </main>
          </div>
          <A4PrescriptionModal />
        </div>
      </ClinicalEncounterProvider>
    </ProtectedRoute>
  );
}
