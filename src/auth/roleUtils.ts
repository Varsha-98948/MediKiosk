import { Role, UserSession } from '@/types/auth';

export function getUserRole(user: UserSession | null): Role | null {
  return user?.role || null;
}

export function isDoctor(user: UserSession | null): boolean {
  return user?.role === 'doctor';
}

export function isPatient(user: UserSession | null): boolean {
  return user?.role === 'patient';
}

export function isAuthenticated(user: UserSession | null): boolean {
  return !!user;
}
