import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../lib/types';
import { mockUsers } from '../lib/mockData';
import { fetchUserByRole, updateUserData, registerUserApi, loginUserApi, RegisterPayload } from '../lib/api';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (role?: UserRole) => void;
  loginWithCredentials: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateCurrentUser: (data: Partial<User>) => Promise<User>;
  registerUser: (payload: RegisterPayload) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('client');
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers['client']);

  // Load from Backend (or localStorage / mock fallback) on role change
  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      // Check localStorage first for instant display
      const savedLocally = localStorage.getItem(`alinhava_user_${currentRole}`);
      if (savedLocally) {
        try {
          const parsed = JSON.parse(savedLocally);
          if (isMounted) setCurrentUser(parsed);
        } catch {
          // ignore parsing error
        }
      } else if (mockUsers[currentRole]) {
        if (isMounted) setCurrentUser(mockUsers[currentRole]);
      }

      // Sync with Python SQLite Backend
      try {
        const backendUser = await fetchUserByRole(currentRole);
        if (backendUser && isMounted) {
          setCurrentUser(backendUser);
          localStorage.setItem(`alinhava_user_${currentRole}`, JSON.stringify(backendUser));
        }
      } catch (err) {
        console.warn('Usando dados locais:', err);
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [currentRole]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const login = (role: UserRole = 'client') => {
    setCurrentRole(role);
  };

  const loginWithCredentials = async (email: string, password: string): Promise<User> => {
    const user = await loginUserApi(email, password);
    setCurrentRole(user.role);
    setCurrentUser(user);
    localStorage.setItem(`alinhava_user_${user.role}`, JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateCurrentUser = async (data: Partial<User>): Promise<User> => {
    if (!currentUser) throw new Error('Nenhum usuário logado');

    const updatedUser: User = {
      ...currentUser,
      ...data
    };

    // 1. Tentar salvar no Backend Python (SQLite)
    try {
      const responseUser = await updateUserData(currentUser.id, data);
      setCurrentUser(responseUser);
      localStorage.setItem(`alinhava_user_${currentRole}`, JSON.stringify(responseUser));
      return responseUser;
    } catch (err) {
      console.warn('Backend falhou, salvando no localStorage e estado local:', err);
      setCurrentUser(updatedUser);
      localStorage.setItem(`alinhava_user_${currentRole}`, JSON.stringify(updatedUser));
      return updatedUser;
    }
  };

  const registerUser = async (payload: RegisterPayload): Promise<User> => {
    const newUser = await registerUserApi(payload);
    setCurrentRole(payload.role);
    setCurrentUser(newUser);
    localStorage.setItem(`alinhava_user_${payload.role}`, JSON.stringify(newUser));
    return newUser;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: currentUser !== null,
        switchRole,
        login,
        loginWithCredentials,
        logout,
        updateCurrentUser,
        registerUser
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
