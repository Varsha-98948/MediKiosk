'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Stethoscope, User, Lock, Mail, ArrowRight } from 'lucide-react';
import type { Role, RoleConfig, LoginFormData, LoginFormErrors } from './types';

const ROLES: RoleConfig[] = [
  {
    id: 'admin',
    label: 'Admin',
    helperText: 'System controls & staff administration',
    emailPlaceholder: 'admin@organization.com',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    helperText: 'Clinical portal, appointments & records',
    emailPlaceholder: 'dr.smith@hospital.com',
  },
  {
    id: 'patient',
    label: 'Patient',
    helperText: 'Personal health profile & consultations',
    emailPlaceholder: 'patient@example.com',
  },
];

export interface MultiRoleLoginProps {
  defaultRole?: Role;
  onSubmit?: (data: LoginFormData & { role: Role }) => Promise<void> | void;
  onForgotPassword?: (role: Role) => void;
  onSignUpClick?: (role: Role) => void;
}

export function MultiRoleLogin({
  defaultRole = 'patient',
  onSubmit,
  onForgotPassword,
  onSignUpClick,
}: MultiRoleLoginProps) {
  const [activeRole, setActiveRole] = useState<Role>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const currentRoleConfig = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error on user input
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (onSubmit) {
        await onSubmit({ ...formData, role: activeRole });
      } else {
        console.log('Login submitted:', { ...formData, role: activeRole });
      }
    } catch (err: unknown) {
      setErrors({
        general: err instanceof Error ? err.message : 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="w-4 h-4" />;
      case 'doctor':
        return <Stethoscope className="w-4 h-4" />;
      case 'patient':
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            {currentRoleConfig.helperText}
          </p>
        </div>

        {/* 3-Way Segmented Control */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Select Role
          </label>
          <div
            role="tablist"
            aria-label="User role selection"
            className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200/80 gap-1"
          >
            {ROLES.map((role) => {
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveRole(role.id);
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {getRoleIcon(role.id)}
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={currentRoleConfig.emailPlaceholder}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-white border text-sm text-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => onForgotPassword?.(activeRole)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus-visible:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 bg-white border text-sm text-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center pt-1">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600/30 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-xs sm:text-sm text-slate-600 cursor-pointer select-none"
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Dynamic Role Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              <>
                <span>Login as {currentRoleConfig.label}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Support Info */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            {activeRole === 'patient' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => onSignUpClick?.(activeRole)}
                  className="font-medium text-blue-600 hover:text-blue-700 underline"
                >
                  Register here
                </button>
              </>
            ) : (
              <span>
                Need access credentials? Contact the{' '}
                <span className="font-medium text-slate-700">IT Helpdesk</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MultiRoleLogin;
