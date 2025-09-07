import React from 'react';
import { Heart, Calendar, TrendingUp, Clock, MessageSquare, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { SimpleChart } from '../../components/ui/simple-chart';

const PatientDashboard: React.FC = () => {
  const overviewStats = [
    {
      title: 'Sessions Completed',
      value: '12',
      total: '20',
      icon: Heart,
      color: 'bg-healing-green'
    },
    {
      title: 'Next Appointment',
      value: 'Tomorrow',
      subtitle: '2:00 PM',
      icon: Calendar,
      color: 'bg-medical-blue'
    },
    {
      title: 'Progress Score',
      value: '78%',
      subtitle: '+5% this week',
      icon: TrendingUp,
      color: 'bg-wellness-purple'
    },
    {
      title: 'Weekly Goal',
      value: '2/3',
      subtitle: 'Sessions',
      icon: Target,
      color: 'bg-care-orange'
    }
  ];

  const therapyGoals = [
    {
      id: 1,
      title: 'Manage Daily Anxiety',
      progress: 75,
      target: 'Complete 8 sessions',
      completed: 6,
      total: 8
    },
    {
      id: 2,
      title: 'Improve Sleep Quality',
      progress: 60,
      target: 'Practice techniques daily',
      completed: 18,
      total: 30
    },
    {
      id: 3,
      title: 'Social Confidence',
      progress: 45,
      target: 'Complete social exercises',
      completed: 9,
      total: 20
    }
  ];

  const progressData = [
    { name: 'Week 1', mood: 6, anxiety: 8 },
    { name: 'Week 2', mood: 7, anxiety: 7 },
    { name: 'Week 3', mood: 7, anxiety: 6 },
    { name: 'Week 4', mood: 8, anxiety: 5 },
    { name: 'Week 5', mood: 8, anxiety: 4 },
    { name: 'Week 6', mood: 9, anxiety: 3 }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: 'Tomorrow',
      time: '2:00 PM',
      practitioner: 'Dr. Sarah Johnson',
      type: 'Cognitive Behavioral Therapy',
      location: 'Room 301'
    },
    {
      id: 2,
      date: 'Friday',
      time: '10:00 AM',
      practitioner: 'Dr. Sarah Johnson',
      type: 'Follow-up Session',
      location: 'Room 301'
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      session: 'Session #12',
      date: 'Yesterday',
      rating: 5,
      comment: 'Great session! Felt really heard and understood.'
    },
    {
      id: 2,
      session: 'Session #11',
      date: '3 days ago',
      rating: 4,
      comment: 'Helpful techniques for managing anxiety.'
    }
  ];

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-poppins font-bold">Welcome back, Emily</h1>
          <p className="text-muted-foreground mt-2">
            Track your therapy progress and upcoming sessions
          </p>
        </div>
        <Button className="btn-gradient-primary">
          <MessageSquare className="mr-2 h-4 w-4" />
          Submit Feedback
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-patient hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.subtitle && (
                      <p className="text-sm text-healing-green">{stat.subtitle}</p>
                    )}
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
        {/* Progress Chart */}
        <Card className="card-medical lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Progress Tracking</span>
            </CardTitle>
            <CardDescription>
              Your mood and anxiety levels over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={progressData}
              type="line"
              dataKey="mood"
              nameKey="name"
              height={250}
            />
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-medical-blue rounded-full" />
                <span className="text-sm">Mood Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-healing-green rounded-full" />
                <span className="text-sm">Anxiety Level</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="card-appointment">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming</span>
            </CardTitle>
            <CardDescription>Your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-border rounded-lg hover:bg-card-hover transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                    <Badge variant="outline">
                      {appointment.id === 1 ? 'Tomorrow' : 'Upcoming'}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">{appointment.practitioner}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    <p className="text-xs text-muted-foreground">{appointment.location}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                View All Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Therapy Goals */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Therapy Goals</span>
            </CardTitle>
            <CardDescription>Track your progress towards recovery milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {therapyGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{goal.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {goal.completed}/{goal.total}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{goal.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Feedback</span>
            </CardTitle>
            <CardDescription>Your session reviews and comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 bg-muted/50 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">{feedback.session}</p>
                    <span className="text-warning">{getRatingStars(feedback.rating)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">"{feedback.comment}"</p>
                  <p className="text-xs text-muted-foreground">{feedback.date}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit New Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;