import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Phone, 
  Calendar, 
  FileText, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Pill
} from 'lucide-react';

export const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState<'consult' | 'history' | 'prescriptions'>('consult');

  const consultationOptions = [
    {
      type: 'video',
      title: 'Video Consultation',
      description: 'Face-to-face consultation with doctor',
      icon: Video,
      price: 'Free',
      duration: '15-20 mins',
      available: true
    },
    {
      type: 'audio',
      title: 'Audio Consultation',
      description: 'Voice call with doctor',
      icon: Phone,
      price: 'Free',
      duration: '10-15 mins',
      available: true
    },
    {
      type: 'ivr',
      title: 'Toll-Free IVR',
      description: 'Call 4041893202',
      icon: Phone,
      price: 'Free',
      duration: '5-10 mins',
      available: true
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      doctor: 'Dr. Preet Singh',
      date: '20-09-2025',
      time: '10:30 AM',
      type: 'Video',
      status: 'Completed',
      issue: 'Fever and headache'
    },
    {
      id: 2,
      doctor: 'Dr. Manjit Kaur',
      date: '20-09-2025',
      time: '2:15 PM',
      type: 'Audio',
      status: 'Completed',
      issue: 'Follow-up consultation'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Preet Singh',
      date: '20-09-2025',
      medicines: ['Paracetamol 500mg', 'Crocin 500mg (Alternative)'],
      instructions: 'Take twice daily after meals for 5 days'
    }
  ];

  return (
    <section className="py-12 px-4 min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Patient Portal</h1>
          <p className="text-xl text-muted-foreground">Your healthcare, simplified and accessible</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            variant={activeTab === 'consult' ? 'default' : 'outline'}
            onClick={() => setActiveTab('consult')}
            className="flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            New Consultation
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Consultation History
          </Button>
          <Button
            variant={activeTab === 'prescriptions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('prescriptions')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            My Prescriptions
          </Button>
        </div>

        {/* New Consultation Tab */}
        {activeTab === 'consult' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Patient Information
                </CardTitle>
                <CardDescription>Please provide your details for consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Enter age" />
                </div>
                <div>
                  <Label htmlFor="issue">Health Issue / Symptoms</Label>
                  <Textarea 
                    id="issue" 
                    placeholder="Describe your symptoms or health concerns..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Preferred Language</Label>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                      Punjabi
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                      Hindi
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                      English
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Choose Consultation Type</h3>
              {consultationOptions.map((option) => (
                <Card 
                  key={option.type} 
                  className="shadow-card hover:shadow-elevated transition-smooth cursor-pointer hover:border-primary/50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground">{option.title}</h4>
                          <p className="text-muted-foreground">{option.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">Duration: {option.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{option.price}</p>
                        {option.available ? (
                          <Badge className="bg-secondary text-secondary-foreground">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Busy
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">
                      Book {option.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-r from-accent to-muted border-0 shadow-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-lg mb-2 text-foreground">Need Immediate Help?</h4>
                  <p className="mb-4 text-muted-foreground">Call our toll-free helpline</p>
                  <div className="text-3xl font-bold text-primary mb-2">4041893202</div>
                  <p className="text-sm text-muted-foreground">Available 24/7 in Punjabi, Hindi & English</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Consultation History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Consultation History</h3>
            {recentConsultations.map((consultation) => (
              <Card key={consultation.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{consultation.doctor}</h4>
                        <p className="text-muted-foreground">{consultation.issue}</p>
                      </div>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {consultation.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{consultation.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{consultation.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">{consultation.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Download Report</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">My Prescriptions</h3>
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-trust rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground">Prescription</h4>
                        <p className="text-muted-foreground">By {prescription.doctor}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{prescription.date}</Badge>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">Medicines:</h5>
                    <ul className="space-y-1">
                      {prescription.medicines.map((medicine, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-trust rounded-full" />
                          {medicine}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-foreground"><strong>Instructions:</strong> {prescription.instructions}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Download PDF</Button>
                    <Button variant="outline" size="sm">Send SMS</Button>
                    <Button variant="outline" size="sm">Check Medicine Availability</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};