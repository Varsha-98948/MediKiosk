'use client';

import React from 'react';
import { MultiRoleLogin, type LoginFormData, type Role } from '@/src/components/auth';

export default function LoginPage() {
  const handleLogin = async (data: LoginFormData & { role: Role }) => {
    console.log('Login attempt:', data);
    // Simulate auth API call
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const handleForgotPassword = (role: Role) => {
    console.log(`Forgot password requested for role: ${role}`);
  };

  const handleSignUp = (role: Role) => {
    console.log(`Sign up clicked for role: ${role}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <MultiRoleLogin
        defaultRole="doctor"
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onSignUpClick={handleSignUp}
      />
    </main>
  );
}
