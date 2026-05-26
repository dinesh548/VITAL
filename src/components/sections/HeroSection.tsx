import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Smartphone, MessageSquare, Shield, Clock, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: 'home' | 'patient' | 'doctor' | 'medicine') => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Healthcare for
            <span className="block bg-gradient-to-r from-secondary-light to-healing bg-clip-text text-transparent">
              Everyone, Everywhere
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Bridging the healthcare gap with toll-free consultations, SMS prescriptions, 
            and smartphone telemedicine in Punjabi, Hindi, and English.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-white/95 backdrop-blur shadow-elevated border-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-foreground">For Everyone</h3>
                  <p className="text-muted-foreground">No smartphone needed</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Toll-free IVR consultations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  SMS-based prescriptions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Multilingual voice support
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur shadow-elevated border-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-foreground">For Smartphone Users</h3>
                  <p className="text-muted-foreground">Enhanced digital experience</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Video consultations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Medicine availability checker
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Digital health records
                </li>
              </ul>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('patient')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg transition-bounce shadow-elevated"
            >
              Start Consultation
            </Button>
            <Button 
              size="lg" 
              //variant="outline"
              onClick={() => onNavigate('medicine')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg transition-bounce shadow-elevated"
            >
              Check Medicine Availability
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">0 Patients</h4>
              <p className="text-white/80">Served across Punjab</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">24/7 Available</h4>
              <p className="text-white/80">Round-the-clock support</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">100% Secure</h4>
              <p className="text-white/80">HIPAA compliant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};