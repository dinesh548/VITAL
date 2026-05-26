import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Pill, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  Navigation,
  Star
} from 'lucide-react';

export const MedicineChecker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockMedicines = [
    {
      name: 'Paracetamol 500mg',
      alternatives: ['Crocin 500mg', 'Dolo 650mg', 'Panadol 500mg'],
      pharmacies: [
        {
          name: 'Apollo Pharmacy',
          address: 'Sector 17, Chandigarh',
          distance: '0.8 km',
          stock: 'In Stock',
          price: '₹25',
          phone: '+91 98765 43210',
          rating: 4.5,
          available: true
        },
        {
          name: 'MedPlus',
          address: 'Model Town, Ludhiana',
          distance: '1.2 km',
          stock: 'Limited Stock',
          price: '₹23',
          phone: '+91 87654 32109',
          rating: 4.2,
          available: true
        },
        {
          name: 'Guardian Pharmacy',
          address: 'Mall Road, Amritsar',
          distance: '2.1 km',
          stock: 'Out of Stock',
          price: '₹27',
          phone: '+91 76543 21098',
          rating: 4.0,
          available: false
        }
      ]
    },
    {
      name: 'Amoxicillin 250mg',
      alternatives: ['Augmentin 250mg', 'Clavam 250mg', 'Moxikind 250mg'],
      pharmacies: [
        {
          name: 'Wellness Pharmacy',
          address: 'Civil Lines, Jalandhar',
          distance: '0.5 km',
          stock: 'In Stock',
          price: '₹85',
          phone: '+91 98765 11111',
          rating: 4.7,
          available: true
        }
      ]
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = mockMedicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.alternatives.some(alt => alt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    }
  };

  const getStockBadge = (stock: string, available: boolean) => {
    if (available && stock === 'In Stock') {
      return (
        <Badge className="bg-secondary text-secondary-foreground">
          <CheckCircle className="w-3 h-3 mr-1" />
          {stock}
        </Badge>
      );
    } else if (available && stock === 'Limited Stock') {
      return (
        <Badge className="bg-orange-500 text-white">
          <AlertCircle className="w-3 h-3 mr-1" />
          {stock}
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          {stock}
        </Badge>
      );
    }
  };

  return (
    <section className="py-12 px-4 min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-healing rounded-xl flex items-center justify-center shadow-glow">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Medicine Availability Checker</h1>
              <p className="text-xl text-muted-foreground">Find medicines at nearby pharmacies with alternatives</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Medicine
            </CardTitle>
            <CardDescription>Enter medicine name to check availability and find alternatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="e.g., Paracetamol, Amoxicillin, Crocin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-secondary hover:bg-secondary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access for Common Medicines */}
        {searchResults.length === 0 && (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle>Common Medicines</CardTitle>
              <CardDescription>Quick search for frequently needed medicines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Aspirin', 'Crocin', 'Dolo', 'Combiflam', 'Calpol'].map((medicine) => (
                  <Button
                    key={medicine}
                    variant="outline"
                    onClick={() => {
                      setSearchQuery(medicine);
                      const results = mockMedicines.filter(med => 
                        med.name.toLowerCase().includes(medicine.toLowerCase())
                      );
                      setSearchResults(results);
                    }}
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:border-secondary hover:text-secondary"
                  >
                    <Pill className="w-6 h-6" />
                    {medicine}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-8">
            {searchResults.map((medicine, medicineIndex) => (
              <div key={medicineIndex} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-foreground">{medicine.name}</h2>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchResults([]);
                      setSearchQuery('');
                    }}
                  >
                    New Search
                  </Button>
                </div>

                {/* Alternative Medicines */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Alternative Medicines</CardTitle>
                    <CardDescription>Similar medicines with same composition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {medicine.alternatives.map((alt: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-secondary hover:text-white transition-smooth"
                          onClick={() => setSearchQuery(alt)}
                        >
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pharmacy Results */}
                <div className="grid gap-6">
                  <h3 className="text-2xl font-bold text-foreground">Available at Nearby Pharmacies</h3>
                  
                  {medicine.pharmacies.map((pharmacy: any, pharmacyIndex: number) => (
                    <Card key={pharmacyIndex} className="shadow-card hover:shadow-elevated transition-smooth">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <Pill className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground">{pharmacy.name}</h4>
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{pharmacy.address}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Navigation className="w-4 h-4 text-primary" />
                                  <span className="text-foreground">{pharmacy.distance}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-foreground">{pharmacy.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStockBadge(pharmacy.stock, pharmacy.available)}
                            <p className="text-2xl font-bold text-primary mt-2">{pharmacy.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Open 24/7</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{pharmacy.phone}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Phone className="w-4 h-4" />
                              Call Pharmacy
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Navigation className="w-4 h-4" />
                              Get Directions
                            </Button>
                            {pharmacy.available && (
                              <Button 
                                size="sm"
                                className="bg-secondary hover:bg-secondary/90"
                              >
                                Reserve Medicine
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IVR Information */}
        <Card className="bg-gradient-to-r from-accent to-muted border-0 shadow-card mt-12">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Phone className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">Need Help Over Phone?</h3>
                <p className="text-muted-foreground">Call our toll-free helpline for medicine availability</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">4041893202</div>
            <p className="text-muted-foreground mb-4">Press 2 for Medicine Availability, Press 3 for Alternatives</p>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary">Punjabi</Badge>
              <Badge variant="secondary">Hindi</Badge>
              <Badge variant="secondary">English</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};