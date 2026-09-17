import React from 'react';
import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'MediKiosk — AI Multilingual Clinical Intake & Ayush Health Platform',
  description: 'Enterprise-grade first-mile clinical data capture layer for Ayush digital health ecosystem, ABDM, and AHMIS 2.0 interoperability.',
  keywords: ['MediKiosk', 'Ayush', 'ABDM', 'AIIA', 'Clinical Intake', 'AI Healthcare', 'FHIR R4'],
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Public+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 font-['Public_Sans'] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
