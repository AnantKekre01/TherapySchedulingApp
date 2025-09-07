import React from 'react';
import { Users, UserCheck, Calendar, TrendingUp, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { SimpleChart } from '../../components/ui/simple-chart';

const AdminDashboard: React.FC = () => {
  // Mock data for demo
  const statsCards = [
    {
      title: 'Total Patients',
      value: '247',
      change: '+12%',
      icon: Users,
      color: 'bg-medical-blue',
      trend: 'up'
    },
    {
      title: 'Active Practitioners',
      value: '18',
      change: '+2',
      icon: UserCheck,
      color: 'bg-healing-green',
      trend: 'up'
    },
    {
      title: 'Sessions Today',
      value: '34',
      change: '+8%',
      icon: Calendar,
      color: 'bg-wellness-purple',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2%',
      icon: TrendingUp,
      color: 'bg-care-orange',
      trend: 'up'
    }
  ];

  const sessionsData = [
    { name: 'Mon', sessions: 45 },
    { name: 'Tue', sessions: 52 },
    { name: 'Wed', sessions: 48 },
    { name: 'Thu', sessions: 61 },
    { name: 'Fri', sessions: 55 },
    { name: 'Sat', sessions: 28 },
    { name: 'Sun', sessions: 22 }
  ];

  const therapyTypes = [
    { name: 'Cognitive Behavioral', value: 35 },
    { name: 'Psychodynamic', value: 28 },
    { name: 'Humanistic', value: 22 },
    { name: 'Family Therapy', value: 15 }
  ];

  const practitionerLoad = [
    { name: 'Dr. Johnson', load: 95 },
    { name: 'Dr. Chen', load: 87 },
    { name: 'Dr. Williams', load: 78 },
    { name: 'Dr. Brown', load: 92 },
    { name: 'Dr. Davis', load: 83 }
  ];

  const recentSessions = [
    {
      id: 1,
      patient: 'Sarah M.',
      practitioner: 'Dr. Johnson',
      type: 'Cognitive Behavioral',
      time: '09:00 AM',
      status: 'completed'
    },
    {
      id: 2,
      patient: 'Mike R.',
      practitioner: 'Dr. Chen',
      type: 'Family Therapy',
      time: '10:30 AM',
      status: 'ongoing'
    },
    {
      id: 3,
      patient: 'Lisa K.',
      practitioner: 'Dr. Williams',
      type: 'Psychodynamic',
      time: '11:00 AM',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'ongoing': return 'bg-warning text-warning-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-poppins font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor platform performance and manage therapy operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
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
                    <p className="text-xs text-success">
                      {stat.change} from last month
                    </p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions This Week */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Sessions This Week</span>
            </CardTitle>
            <CardDescription>
              Daily session count and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={sessionsData}
              type="bar"
              dataKey="sessions"
              nameKey="name"
              height={250}
            />
          </CardContent>
        </Card>

        {/* Therapy Types Distribution */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Therapy Types</CardTitle>
            <CardDescription>
              Distribution of therapy modalities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={therapyTypes}
              type="pie"
              dataKey="value"
              nameKey="name"
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practitioner Workload */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Practitioner Workload</CardTitle>
            <CardDescription>
              Current capacity utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={practitionerLoad}
              type="bar"
              dataKey="load"
              nameKey="name"
              height={200}
            />
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="card-medical lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Today's Sessions</span>
            </CardTitle>
            <CardDescription>
              Real-time session monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{session.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          with {session.practitioner}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{session.time}</p>
                    <p className="text-xs text-muted-foreground">{session.type}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;