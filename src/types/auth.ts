export type Role = 'doctor' | 'patient' | 'receptionist' | 'admin';
export type UserRole = Role;

export interface UserSession {
  id: string;
  name: string;
  role: Role;
  email?: string;
  phone?: string;
  department?: string;
  roomNumber?: string;
}

export interface AuthContextType {
  user: UserSession | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}
