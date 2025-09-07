import React from 'react';
import { TrendingUp, Users, Calendar, Clock, BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { SimpleChart } from '../../components/ui/simple-chart';

const AnalyticsPage: React.FC = () => {
  const monthlyData = [
    { name: 'Jan', sessions: 120, patients: 45, revenue: 15600 },
    { name: 'Feb', sessions: 135, patients: 52, revenue: 17550 },
    { name: 'Mar', sessions: 145, patients: 58, revenue: 18870 },
    { name: 'Apr', sessions: 155, patients: 61, revenue: 20155 },
    { name: 'May', sessions: 168, patients: 65, revenue: 21840 },
    { name: 'Jun', sessions: 172, patients: 68, revenue: 22360 }
  ];

  const therapyTypesData = [
    { name: 'Cognitive Behavioral', value: 35, sessions: 287 },
    { name: 'Psychodynamic', value: 28, sessions: 230 },
    { name: 'Humanistic', value: 22, sessions: 181 },
    { name: 'Family Therapy', value: 15, sessions: 123 }
  ];

  const practitionerPerformance = [
    { name: 'Dr. Chen', sessions: 95, satisfaction: 4.8, utilization: 92 },
    { name: 'Dr. Williams', sessions: 87, satisfaction: 4.7, utilization: 88 },
    { name: 'Dr. Brown', sessions: 78, satisfaction: 4.6, utilization: 85 },
    { name: 'Dr. Davis', sessions: 83, satisfaction: 4.9, utilization: 91 },
    { name: 'Dr. Miller', sessions: 72, satisfaction: 4.5, utilization: 78 }
  ];

  const hourlyDistribution = [
    { hour: '8 AM', sessions: 12 },
    { hour: '9 AM', sessions: 25 },
    { hour: '10 AM', sessions: 32 },
    { hour: '11 AM', sessions: 28 },
    { hour: '12 PM', sessions: 15 },
    { hour: '1 PM', sessions: 22 },
    { hour: '2 PM', sessions: 35 },
    { hour: '3 PM', sessions: 38 },
    { hour: '4 PM', sessions: 42 },
    { hour: '5 PM', sessions: 28 },
    { hour: '6 PM', sessions: 18 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-poppins font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights into therapy operations and performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-stats hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">1,847</p>
                <p className="text-xs text-success">+12% vs last month</p>
              </div>
              <div className="p-3 rounded-lg bg-medical-blue">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stats hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-success">+8% vs last month</p>
              </div>
              <div className="p-3 rounded-lg bg-healing-green">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stats hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Session Duration</p>
                <p className="text-2xl font-bold">52min</p>
                <p className="text-xs text-success">+2min vs last month</p>
              </div>
              <div className="p-3 rounded-lg bg-wellness-purple">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stats hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction Score</p>
                <p className="text-2xl font-bold">4.7/5</p>
                <p className="text-xs text-success">+0.2 vs last month</p>
              </div>
              <div className="p-3 rounded-lg bg-care-orange">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Monthly Session Trends</span>
            </CardTitle>
            <CardDescription>Sessions and patient growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={monthlyData}
              type="line"
              dataKey="sessions"
              nameKey="name"
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Therapy Type Distribution</span>
            </CardTitle>
            <CardDescription>Breakdown of therapy modalities</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={therapyTypesData}
              type="pie"
              dataKey="value"
              nameKey="name"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Practitioner Performance</CardTitle>
            <CardDescription>Sessions completed by each practitioner</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={practitionerPerformance}
              type="bar"
              dataKey="sessions"
              nameKey="name"
              height={250}
            />
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Hourly Session Distribution</CardTitle>
            <CardDescription>Peak hours for therapy sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={hourlyDistribution}
              type="line"
              dataKey="sessions"
              nameKey="hour"
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {practitionerPerformance.map((practitioner, index) => (
              <div key={index} className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium">{practitioner.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sessions</span>
                    <span className="font-medium">{practitioner.sessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span className="font-medium">{practitioner.satisfaction}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{practitioner.utilization}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;