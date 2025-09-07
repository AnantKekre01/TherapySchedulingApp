import React from 'react';
import { Calendar, Users, FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { SimpleChart } from '../../components/ui/simple-chart';

const PractitionerDashboard: React.FC = () => {
  const todayStats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      icon: Calendar,
      color: 'bg-medical-blue'
    },
    {
      title: 'Active Patients',
      value: '24',
      icon: Users,
      color: 'bg-healing-green'
    },
    {
      title: 'Pending Notes',
      value: '3',
      icon: FileText,
      color: 'bg-wellness-purple'
    },
    {
      title: 'This Week Hours',
      value: '32h',
      icon: Clock,
      color: 'bg-care-orange'
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'Sarah Mitchell',
      type: 'Cognitive Behavioral Therapy',
      duration: '50 min',
      status: 'confirmed',
      isNext: true
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Michael Rodriguez',
      type: 'Family Therapy',
      duration: '60 min',
      status: 'confirmed',
      isNext: false
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Lisa Johnson',
      type: 'Psychodynamic Therapy',
      duration: '50 min',
      status: 'pending',
      isNext: false
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'David Kim',
      type: 'Individual Counseling',
      duration: '50 min',
      status: 'confirmed',
      isNext: false
    }
  ];

  const weeklyData = [
    { name: 'Mon', sessions: 6 },
    { name: 'Tue', sessions: 8 },
    { name: 'Wed', sessions: 5 },
    { name: 'Thu', sessions: 7 },
    { name: 'Fri', sessions: 6 },
    { name: 'Sat', sessions: 2 },
    { name: 'Sun', sessions: 0 }
  ];

  const recentNotes = [
    {
      id: 1,
      patient: 'Sarah M.',
      date: '2024-01-15',
      type: 'Session Notes',
      status: 'completed'
    },
    {
      id: 2,
      patient: 'Michael R.',
      date: '2024-01-15',
      type: 'Progress Report',
      status: 'pending'
    },
    {
      id: 3,
      patient: 'Lisa J.',
      date: '2024-01-14',
      type: 'Treatment Plan',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-poppins font-bold">Good morning, Dr. Chen</h1>
          <p className="text-muted-foreground mt-2">
            You have 8 appointments scheduled for today
          </p>
        </div>
        <Button className="btn-gradient-primary">
          <Calendar className="mr-2 h-4 w-4" />
          View Full Calendar
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-stats hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="card-medical lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>
              January 15, 2024 • 8 appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    appointment.isNext 
                      ? 'border-primary bg-primary/5 hover-glow' 
                      : 'border-border bg-card hover:bg-card-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <p className="text-sm font-bold">{appointment.time}</p>
                        <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div>
                        <p className="font-semibold">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(appointment.status)}
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      {appointment.isNext && (
                        <Badge className="bg-primary text-primary-foreground">
                          Next
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weekly Sessions Chart */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>Session distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleChart
                data={weeklyData}
                type="line"
                dataKey="sessions"
                nameKey="name"
                height={200}
              />
            </CardContent>
          </Card>

          {/* Pending Notes */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Notes</span>
              </CardTitle>
              <CardDescription>Documentation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{note.patient}</p>
                      <p className="text-xs text-muted-foreground">{note.type}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(note.status)} text-xs`}>
                        {note.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PractitionerDashboard;