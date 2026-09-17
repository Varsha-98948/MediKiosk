export type Role = 'admin' | 'doctor' | 'patient';

export interface RoleConfig {
  id: Role;
  label: string;
  badge?: string;
  helperText: string;
  emailPlaceholder: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}
