'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MultiRoleLogin } from '@/components/auth/MultiRoleLogin';
import { useAuth } from '@/auth/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (data: { email: string; password: string; role: 'admin' | 'doctor' | 'patient' }) => {
    login({
      id: `${data.role}-01`,
      name: data.role === 'doctor' ? 'Dr. Dhananjay Chavan' : data.role === 'admin' ? 'Admin User' : 'Patient User',
      email: data.email,
      role: data.role,
    });

    if (data.role === 'doctor') {
      router.push('/doctor');
    } else if (data.role === 'patient') {
      router.push('/patient');
    } else {
      router.push('/patient/operations');
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-teal-400 text-3xl">local_hospital</span>
          <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
            MediKiosk Ecosystem
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          Unified Multi-Role Portal (Patient, Doctor EMR, Hospital Admin)
        </p>
      </div>

      <MultiRoleLogin onSubmit={handleLogin} />
    </div>
  );
}
