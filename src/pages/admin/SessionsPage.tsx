import React from 'react';
import { Plus, Search, Filter, Calendar, Clock, User, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const SessionsPage: React.FC = () => {
  const sessions = [
    {
      id: 1,
      patient: 'Emily Rodriguez',
      practitioner: 'Dr. Michael Chen',
      date: '2024-01-15',
      time: '09:00 AM',
      duration: 60,
      type: 'Cognitive Behavioral',
      status: 'completed',
      notes: 'Great progress on anxiety management techniques',
      patientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b85639c4?w=400',
      practitionerAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    },
    {
      id: 2,
      patient: 'David Kim',
      practitioner: 'Dr. Sarah Williams',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: 45,
      type: 'Family Therapy',
      status: 'ongoing',
      notes: 'Working on communication strategies',
      patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      practitionerAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    },
    {
      id: 3,
      patient: 'Sarah Johnson',
      practitioner: 'Dr. James Brown',
      date: '2024-01-15',
      time: '02:00 PM',
      duration: 60,
      type: 'Psychodynamic',
      status: 'scheduled',
      notes: 'Follow-up on previous session insights',
      patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      practitionerAvatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400'
    },
    {
      id: 4,
      patient: 'Michael Torres',
      practitioner: 'Dr. Michael Chen',
      date: '2024-01-15',
      time: '03:30 PM',
      duration: 45,
      type: 'Cognitive Behavioral',
      status: 'scheduled',
      notes: 'Assessment session for treatment planning',
      patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      practitionerAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'ongoing': return 'bg-warning text-warning-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-bold">Session Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all therapy sessions across the platform
          </p>
        </div>
        <Button className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="card-medical">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search sessions..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="card-medical hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Patient Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.patientAvatar} alt={session.patient} />
                      <AvatarFallback>{session.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.patient}</p>
                      <p className="text-sm text-muted-foreground">Patient</p>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Practitioner</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={session.practitionerAvatar} alt={session.practitioner} />
                          <AvatarFallback>{session.practitioner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-muted-foreground">{session.practitioner}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Date & Time</p>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{session.time} ({session.duration}min)</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm text-muted-foreground mt-1">{session.type}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge className={`mt-1 ${getStatusColor(session.status)}`}>
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {session.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{session.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="card-stats">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Today's Sessions</p>
          </CardContent>
        </Card>
        <Card className="card-stats">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">8</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="card-stats">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-sm text-muted-foreground">Ongoing</p>
          </CardContent>
        </Card>
        <Card className="card-stats">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">2</p>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionsPage;