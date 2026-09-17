'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Role } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, role, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      if (role === 'doctor') {
        router.push('/doctor');
      } else if (role === 'patient') {
        router.push('/patient');
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, role, allowedRoles, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-stone-600">
        <p className="text-sm font-medium animate-pulse">Checking credentials & loading portal...</p>
      </div>
    );
  }

  return <>{children}</>;
};
