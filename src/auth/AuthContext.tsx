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
    // Restore session from localStorage if available
    try {
      const savedUser = localStorage.getItem('medikiosk_user_session');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default guest doctor session for instant OPD usability
        setUser({
          id: 'doc-001',
          name: 'Dr. Dhananjay Chavan',
          role: 'doctor',
          department: 'Diabetology & Metabolic Care',
          roomNumber: 'Room 3',
        });
      }
    } catch (e) {
      console.error('Error loading session:', e);
    }
  }, []);

  const login = (userData: UserSession) => {
    setUser(userData);
    try {
      localStorage.setItem('medikiosk_user_session', JSON.stringify(userData));
    } catch (e) {
      console.error('Error saving session:', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('medikiosk_user_session');
    } catch (e) {
      console.error('Error clearing session:', e);
    }
  };

  const setRole = (role: Role) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, role } : { id: `user-${Date.now()}`, name: 'Guest User', role };
      try {
        localStorage.setItem('medikiosk_user_session', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
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
