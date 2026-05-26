import { Phone, Mail, MapPin, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-dark to-trust text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">TeleMed Punjab</h3>
                <p className="text-white/80 text-sm">Universal Healthcare Access</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Bridging the healthcare gap with inclusive telemedicine solutions for everyone in Punjab, 
              regardless of technology access.
            </p>
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white">Punjabi</Badge>
              <Badge className="bg-white/20 text-white">Hindi</Badge>
              <Badge className="bg-white/20 text-white">English</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Access</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-white cursor-pointer transition-smooth">Patient Portal</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Doctor Portal</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Medicine Checker</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Consultation History</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Emergency Services</li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-white cursor-pointer transition-smooth">Toll-Free IVR System</li>
              <li className="hover:text-white cursor-pointer transition-smooth">SMS Prescriptions</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Video Consultations</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Medicine Availability</li>
              <li className="hover:text-white cursor-pointer transition-smooth">Health Records</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">4041893202</p>
                  <p className="text-white/70 text-sm">24/7 Toll-Free Helpline</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">support@telemedpunjab.in</p>
                  <p className="text-white/70 text-sm">Email Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">Punjab Health Department</p>
                  <p className="text-white/70 text-sm">Sector 34, Chandigarh, Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2025 VITAL Punjab. All rights reserved. | A Government of Punjab Initiative
            </p>
            <div className="flex gap-6 text-sm text-white/70">
              <span className="hover:text-white cursor-pointer transition-smooth">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-smooth">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-smooth">Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};