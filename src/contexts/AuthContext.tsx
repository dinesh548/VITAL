import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  languages: string[];
  availability: string;
  rating: number;
  totalConsultations: number;
}

interface AuthContextType {
  doctor: Doctor | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (doctorData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (apiClient.isAuthenticated()) {
        try {
          const response = await apiClient.getCurrentDoctor();
          if (response.success) {
            setDoctor(response.doctor);
          } else {
            apiClient.clearToken();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          apiClient.clearToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.login(email, password);
      if (response.success) {
        setDoctor(response.doctor);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (doctorData: any): Promise<boolean> => {
    try {
      const response = await apiClient.register(doctorData);
      if (response.success) {
        setDoctor(response.doctor);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setDoctor(null);
  };

  const updateProfile = async (profileData: any): Promise<boolean> => {
    try {
      const response = await apiClient.updateProfile(profileData);
      if (response.success) {
        setDoctor(response.doctor);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    doctor,
    isAuthenticated: !!doctor,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
