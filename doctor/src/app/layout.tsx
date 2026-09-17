import type { Metadata } from 'next';
import './globals.css';
import { ClinicalEncounterProvider } from '@/context/ClinicalEncounterContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { A4PrescriptionModal } from '@/components/encounter/A4PrescriptionModal';

export const metadata: Metadata = {
  title: 'MediKiosk | Clinical Precision EMR',
  description: 'MediKiosk - High-throughput Outpatient Department (OPD) and Clinical Precision EMR Suite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <ClinicalEncounterProvider>
          <div className="flex min-h-screen">
            {/* Left Navigation Sidebar */}
            <div className="no-print">
              <Sidebar />
            </div>

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col pl-64">
              <div className="no-print">
                <Header />
              </div>
              <main className="flex-1 pt-14 p-6 bg-background">
                {children}
              </main>
            </div>
          </div>

          {/* Global A4 Printable Modal */}
          <A4PrescriptionModal />
        </ClinicalEncounterProvider>
      </body>
    </html>
  );
}
