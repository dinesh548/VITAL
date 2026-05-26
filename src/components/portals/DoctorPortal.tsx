import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Calendar, 
  Phone, 
  Video, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Pill
} from 'lucide-react';

export const DoctorPortal = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'prescriptions'>('dashboard');

  const pendingConsultations = [
    {
      id: 1,
      patient: 'Gurpreet Singh',
      phone: '+91 98765 43210',
      issue: 'Fever and headache for 2 days',
      type: 'Video',
      scheduledTime: '10:30 AM',
      language: 'Punjabi',
      urgent: false
    },
    {
      id: 2,
      patient: 'Priya Sharma',
      phone: '+91 87654 32109',
      issue: 'Stomach pain and nausea',
      type: 'IVR',
      scheduledTime: '11:00 AM',
      language: 'Hindi',
      urgent: true
    },
    {
      id: 3,
      patient: 'Rajesh Kumar',
      phone: '+91 76543 21098',
      issue: 'Follow-up for diabetes',
      type: 'Audio',
      scheduledTime: '11:30 AM',
      language: 'English',
      urgent: false
    }
  ];

  const completedConsultations = [
    {
      id: 1,
      patient: 'Simran Kaur',
      completedAt: '9:45 AM',
      issue: 'Cold and cough',
      prescribed: true,
      type: 'Video'
    },
    {
      id: 2,
      patient: 'Amit Verma',
      completedAt: '9:15 AM',
      issue: 'Blood pressure check',
      prescribed: true,
      type: 'IVR'
    }
  ];

  return (
    <section className="py-12 px-4 min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-trust rounded-xl flex items-center justify-center shadow-glow">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Doctor Portal</h1>
              <p className="text-xl text-muted-foreground">Welcome back, Dr. Singh</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">5</h3>
                <p className="text-muted-foreground">Pending Consultations</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">12</h3>
                <p className="text-muted-foreground">Completed Today</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emergency to-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2</h3>
                <p className="text-muted-foreground">Urgent Cases</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-healing rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">143</h3>
                <p className="text-muted-foreground">Total Patients</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'appointments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('appointments')}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Appointments
          </Button>
          <Button
            variant={activeTab === 'prescriptions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('prescriptions')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Prescriptions
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pending Consultations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pending Consultations
                </CardTitle>
                <CardDescription>Patients waiting for consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingConsultations.map((consultation) => (
                  <div key={consultation.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-smooth">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{consultation.patient}</h4>
                          <p className="text-sm text-muted-foreground">{consultation.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {consultation.urgent && (
                          <Badge className="bg-emergency text-emergency-foreground">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                        <Badge variant="outline">{consultation.scheduledTime}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-3">{consultation.issue}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">{consultation.type}</Badge>
                        <Badge variant="secondary">{consultation.language}</Badge>
                      </div>
                      <div className="flex gap-2">
                        {consultation.type === 'Video' && (
                          <Button size="sm" className="bg-trust hover:bg-trust/90">
                            <Video className="w-4 h-4 mr-1" />
                            Start Video
                          </Button>
                        )}
                        {consultation.type === 'Audio' && (
                          <Button size="sm" className="bg-healing hover:bg-healing/90">
                            <Phone className="w-4 h-4 mr-1" />
                            Start Call
                          </Button>
                        )}
                        {consultation.type === 'IVR' && (
                          <Button size="sm" className="bg-primary hover:bg-primary-dark">
                            <Phone className="w-4 h-4 mr-1" />
                            Connect IVR
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Completed */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Completed Today
                </CardTitle>
                <CardDescription>Recent consultations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedConsultations.map((consultation) => (
                  <div key={consultation.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-healing rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{consultation.patient}</h4>
                          <p className="text-sm text-muted-foreground">{consultation.completedAt}</p>
                        </div>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-3">{consultation.issue}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{consultation.type}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {consultation.prescribed && (
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Prescription
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Today's Schedule</h3>
              <Button className="bg-primary hover:bg-primary-dark">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </div>
            
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pendingConsultations.concat(completedConsultations.map(c => ({
                    ...c,
                    phone: '+91 XXXXX XXXXX',
                    scheduledTime: c.completedAt,
                    language: 'English' as const,
                    urgent: false
                  }))).map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="text-center min-w-[80px]">
                        <p className="font-bold text-foreground">{appointment.scheduledTime}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground">{appointment.patient}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.issue}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{appointment.language}</Badge>
                        {'prescribed' in appointment ? (
                          <Badge className="bg-secondary text-secondary-foreground">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Create Prescription</h3>
            </div>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Digital Prescription Pad
                </CardTitle>
                <CardDescription>Create prescriptions for both app and SMS delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input id="patientName" placeholder="Enter patient name" />
                  </div>
                  <div>
                    <Label htmlFor="patientPhone">Phone Number</Label>
                    <Input id="patientPhone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input id="diagnosis" placeholder="Enter diagnosis" />
                </div>
                
                <div>
                  <Label htmlFor="medicines">Medicines</Label>
                  <Textarea 
                    id="medicines" 
                    placeholder="e.g., Paracetamol 500mg - twice daily for 5 days"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="alternatives">Alternative Medicines</Label>
                  <Textarea 
                    id="alternatives" 
                    placeholder="e.g., Crocin 500mg, Dolo 650mg"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea 
                    id="instructions" 
                    placeholder="Additional instructions for the patient"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary-dark">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Prescription
                  </Button>
                  <Button variant="outline">
                    Send SMS Prescription
                  </Button>
                  <Button  
                  variant="outline">
                    Check Medicine Availability
                  </Button >
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};