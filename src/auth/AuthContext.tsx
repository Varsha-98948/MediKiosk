'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, Role, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    // Check real backend session from HttpOnly cookie
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // Default guest doctor session for instant testing if not logged in
          setUser({
            id: 'doc-001',
            name: 'Dr. Dhananjay Chavan',
            role: 'doctor',
            department: 'Diabetology & Metabolic Care',
            roomNumber: 'Room 3',
          });
        }
      })
      .catch((err) => {
        console.error('Error verifying auth session:', err);
        setUser({
          id: 'doc-001',
          name: 'Dr. Dhananjay Chavan',
          role: 'doctor',
          department: 'Diabetology & Metabolic Care',
          roomNumber: 'Room 3',
        });
      });
  }, []);

  const login = (userData: UserSession) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setUser(null);
  };

  const setRole = (role: Role) => {
    setUser((prev) => (prev ? { ...prev, role } : { id: `user-${Date.now()}`, name: 'Guest User', role }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
