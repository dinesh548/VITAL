import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MessageSquare, 
  Video, 
  Pill, 
  FileText, 
  Globe, 
  Stethoscope,
  Users,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (view: 'home' | 'patient' | 'doctor' | 'medicine') => void;
}

export const ServicesSection = ({ onNavigate }: ServicesSectionProps) => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-primary text-white">
            Complete Healthcare Solution
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            One Platform, Multiple Access Points
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you have a smartphone or not, we ensure everyone gets quality healthcare access
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* IVR Service */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">Toll-Free IVR System</CardTitle>
              <CardDescription>+4041893202</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Press 1 for Doctor Consultation</p>
                    <p className="text-sm text-muted-foreground">Connect directly with doctors</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Press 2 for Medicine Stock</p>
                    <p className="text-sm text-muted-foreground">Real-time pharmacy inventory</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Press 3 for Alternatives</p>
                    <p className="text-sm text-muted-foreground">Find substitute medicines</p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Punjabi</Badge>
                <Badge variant="secondary">Hindi</Badge>
                <Badge variant="secondary">English</Badge>
              </div>
            </CardContent>
          </Card>

          {/* SMS Service */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">SMS Prescriptions</CardTitle>
              <CardDescription>No internet required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-sm font-mono text-foreground">
                  "RX: Paracetamol 500mg - 5 days, twice daily. 
                  Alt: Crocin 500. Dr. Singh, 9:30 AM"
                </p>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Instant prescription delivery
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Alternative medicine suggestions
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Multi-language support
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Smartphone App */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-trust rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">Video Consultations</CardTitle>
              <CardDescription>Enhanced digital experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  HD video & audio calls
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Real-time captions
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Digital health records
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Offline sync capability
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate('patient')}
                className="w-full bg-trust hover:bg-trust/90"
              >
                Launch Patient Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Medicine Checker */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-healing rounded-lg flex items-center justify-center mb-4">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">Medicine Availability</CardTitle>
              <CardDescription>Real-time pharmacy stock</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Live pharmacy inventory
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Alternative medicine finder
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Price comparison
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Nearest pharmacy locator
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate('medicine')}
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                Check Medicine Stock
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Doctor Portal */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trust to-primary rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">Doctor Portal</CardTitle>
              <CardDescription>Unified patient management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  IVR & app consultations
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Digital prescription pad
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Patient history access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                  Appointment scheduling
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate('doctor')}
                variant="outline"
                className="w-full border-trust text-trust hover:bg-trust hover:text-white"
              >
                Access Doctor Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Universal Access */}
          <Card className="shadow-card hover:shadow-elevated transition-smooth border-border/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-healing to-secondary rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-foreground">Universal Access</CardTitle>
              <CardDescription>Bridging the digital divide</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Works without internet
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  No smartphone required
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Multilingual support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-healing rounded-full" />
                  Accessible to all ages
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-healing">4041893202</p>
                <p className="text-sm text-muted-foreground">Start with a simple call</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 shadow-elevated bg-gradient-to-r from-accent to-muted border-0">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-foreground">Ready to Get Started?</h3>
                <p className="text-muted-foreground">Choose your preferred way to access healthcare</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('patient')}
                className="bg-primary hover:bg-primary-dark font-semibold"
              >
                Patient Portal
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('doctor')}
                className="border-trust text-trust hover:bg-trust hover:text-white font-semibold"
              >
                Doctor Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};