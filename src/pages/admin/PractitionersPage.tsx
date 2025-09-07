import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, UserCheck, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const PractitionersPage: React.FC = () => {
  const practitioners = [
    {
      id: 1,
      name: 'Dr. Michael Chen',
      email: 'mchen@therapy.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Cognitive Behavioral Therapy',
      patients: 24,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sarah Williams',
      email: 'swilliams@therapy.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Family Therapy',
      patients: 18,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      joinDate: '2023-03-10'
    },
    {
      id: 3,
      name: 'Dr. James Brown',
      email: 'jbrown@therapy.com',
      phone: '+1 (555) 345-6789',
      specialization: 'Psychodynamic Therapy',
      patients: 16,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
      joinDate: '2023-02-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-bold">Practitioners</h1>
          <p className="text-muted-foreground mt-2">
            Manage therapy practitioners and their assignments
          </p>
        </div>
        <Button className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Practitioner
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="card-medical">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search practitioners..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Practitioners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practitioners.map((practitioner) => (
          <Card key={practitioner.id} className="card-medical hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={practitioner.avatar} alt={practitioner.name} />
                    <AvatarFallback>{practitioner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{practitioner.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{practitioner.specialization}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(practitioner.status)}>
                  {practitioner.status}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  <span>{practitioner.patients} patients</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{practitioner.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{practitioner.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Joined: {new Date(practitioner.joinDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PractitionersPage;