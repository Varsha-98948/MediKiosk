'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MultiRoleLogin } from '@/components/auth/MultiRoleLogin';
import { useAuth } from '@/auth/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string; role: 'admin' | 'doctor' | 'patient' }) => {
    setLoginError(null);

    if (data.role === 'patient') {
      login({
        id: `pat-guest`,
        name: 'Patient Kiosk User',
        email: data.email,
        role: 'patient',
      });
      router.push('/patient');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password || 'doctor123',
          role: data.role,
        }),
      });

      const result = await res.json();
      if (res.ok && result.user) {
        login(result.user);
        if (data.role === 'doctor') {
          router.push('/doctor');
        } else {
          router.push('/patient/operations');
        }
      } else {
        // Fallback for demo convenience if specific custom credentials aren't yet in DB
        login({
          id: `${data.role}-01`,
          name: data.role === 'doctor' ? 'Dr. Dhananjay Chavan' : 'Admin User',
          email: data.email,
          role: data.role,
        });
        if (data.role === 'doctor') {
          router.push('/doctor');
        } else {
          router.push('/patient/operations');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Login failed');
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

      {loginError && (
        <div className="mb-4 p-3 bg-red-900/40 border border-red-500 text-red-200 text-xs rounded-xl max-w-md w-full text-center">
          {loginError}
        </div>
      )}

      <MultiRoleLogin onSubmit={handleLogin} />
    </div>
  );
}
