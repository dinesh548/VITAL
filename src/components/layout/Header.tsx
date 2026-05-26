import { Button } from '@/components/ui/button';
import { Phone, Smartphone, Stethoscope, Pill } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'patient' | 'doctor' | 'medicine';
  onNavigate: (view: 'home' | 'patient' | 'doctor' | 'medicine') => void;
}

export const Header = ({ currentView, onNavigate }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer transition-smooth hover:opacity-80"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Stethoscope className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">VITAL Punjab</h1>
            <p className="text-xs text-muted-foreground">Universal Healthcare Access</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Home
          </Button>
          <Button
            variant={currentView === 'patient' ? 'default' : 'ghost'}
            onClick={() => onNavigate('patient')}
            className="flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Patient Portal
          </Button>
          <Button
            variant={currentView === 'doctor' ? 'default' : 'ghost'}
            onClick={() => onNavigate('doctor')}
            className="flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            Doctor Portal
          </Button>
          <Button
            variant={currentView === 'medicine' ? 'default' : 'ghost'}
            onClick={() => onNavigate('medicine')}
            className="flex items-center gap-2"
          >
            <Pill className="w-4 h-4" />
            Medicine Checker
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <p className="text-foreground font-medium">4041893202</p>
            <p className="text-muted-foreground">Toll-Free Helpline</p>
          </div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </header>
  );
};