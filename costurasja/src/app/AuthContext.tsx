import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../lib/types';
import { mockUsers } from '../lib/mockData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('client');
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers['client']);

  useEffect(() => {
    if (mockUsers[currentRole]) {
      setCurrentUser(mockUsers[currentRole]);
    }
  }, [currentRole]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(mockUsers[role] || null);
  };

  const login = (role: UserRole = 'client') => {
    setCurrentRole(role);
    setCurrentUser(mockUsers[role]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: currentUser !== null,
        switchRole,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
