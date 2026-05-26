import { useState } from 'react';
import { DoctorLogin } from '@/components/auth/DoctorLogin';
import { DoctorRegister } from '@/components/auth/DoctorRegister';
import { DoctorPortal } from './DoctorPortal';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export const DoctorPortalWrapper = () => {
  const { doctor, isAuthenticated, logout } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <DoctorLogin 
        onLoginSuccess={() => {}} 
        onSwitchToRegister={() => setAuthMode('register')} 
      />
    ) : (
      <DoctorRegister 
        onRegisterSuccess={() => {}} 
        onSwitchToLogin={() => setAuthMode('login')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logout */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Dr. {doctor?.name}</h2>
                <p className="text-sm text-gray-600">{doctor?.specialization}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main portal content */}
      <DoctorPortal />
    </div>
  );
};
