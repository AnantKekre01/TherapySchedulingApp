import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  // Mock calendar data
  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 50,
      patient: 'Sarah Mitchell',
      practitioner: 'Dr. Johnson',
      type: 'CBT',
      status: 'confirmed',
      room: 'Room 301'
    },
    {
      id: 2,
      time: '10:30',
      duration: 60,
      patient: 'Michael Rodriguez',
      practitioner: 'Dr. Chen',
      type: 'Family Therapy',
      status: 'confirmed',
      room: 'Room 205'
    },
    {
      id: 3,
      time: '14:00',
      duration: 50,
      patient: 'Lisa Johnson',
      practitioner: 'Dr. Williams',
      type: 'Psychodynamic',
      status: 'pending',
      room: 'Room 301'
    },
    {
      id: 4,
      time: '15:30',
      duration: 50,
      patient: 'David Kim',
      practitioner: 'Dr. Brown',
      type: 'Individual',
      status: 'confirmed',
      room: 'Room 102'
    }
  ];

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CBT': return 'bg-medical-blue/10 text-medical-blue border-medical-blue/20';
      case 'Family Therapy': return 'bg-healing-green/10 text-healing-green border-healing-green/20';
      case 'Psychodynamic': return 'bg-wellness-purple/10 text-wellness-purple border-wellness-purple/20';
      default: return 'bg-care-orange/10 text-care-orange border-care-orange/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-poppins font-bold">Schedule Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage appointments and therapy sessions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="btn-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-4">
          <Select value={viewMode} onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>January 15-21, 2024</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Week View</span>
          </CardTitle>
          <CardDescription>
            Drag and drop to reschedule appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {/* Time column header */}
            <div className="text-center font-semibold p-2 border-b">Time</div>
            
            {/* Day headers */}
            {days.map((day) => (
              <div key={day} className="text-center font-semibold p-2 border-b">
                {day}
                <div className="text-xs text-muted-foreground font-normal">
                  Jan {15 + days.indexOf(day)}
                </div>
              </div>
            ))}

            {/* Time slots and appointments */}
            {timeSlots.map((timeSlot) => (
              <React.Fragment key={timeSlot}>
                {/* Time label */}
                <div className="text-sm p-2 border-r border-border text-muted-foreground">
                  {timeSlot}
                </div>
                
                {/* Day columns */}
                {days.map((day, dayIndex) => (
                  <div
                    key={`${timeSlot}-${day}`}
                    className="min-h-16 p-1 border-r border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    {/* Mock appointments - in real app, this would be filtered by day and time */}
                    {dayIndex === 2 && timeSlot === '09:00' && (
                      <div className="bg-medical-blue/10 border border-medical-blue/20 rounded p-2 cursor-pointer hover:shadow-medium transition-all">
                        <div className="text-xs font-semibold">Sarah M.</div>
                        <div className="text-xs text-muted-foreground">Dr. Johnson</div>
                        <Badge className={getTypeColor('CBT')}>CBT</Badge>
                      </div>
                    )}
                    {dayIndex === 3 && timeSlot === '10:00' && (
                      <div className="bg-healing-green/10 border border-healing-green/20 rounded p-2 cursor-pointer hover:shadow-medium transition-all">
                        <div className="text-xs font-semibold">Michael R.</div>
                        <div className="text-xs text-muted-foreground">Dr. Chen</div>
                        <Badge className={getTypeColor('Family Therapy')}>Family</Badge>
                      </div>
                    )}
                    {dayIndex === 4 && timeSlot === '14:00' && (
                      <div className="bg-wellness-purple/10 border border-wellness-purple/20 rounded p-2 cursor-pointer hover:shadow-medium transition-all">
                        <div className="text-xs font-semibold">Lisa J.</div>
                        <div className="text-xs text-muted-foreground">Dr. Williams</div>
                        <Badge className={getTypeColor('Psychodynamic')}>Psycho</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Appointments List */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>
            Detailed view of today's scheduled sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold">{appointment.time}</div>
                    <div className="text-xs text-muted-foreground">{appointment.duration}min</div>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <div className="font-semibold">{appointment.patient}</div>
                    <div className="text-sm text-muted-foreground">
                      with {appointment.practitioner} • {appointment.room}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(appointment.type)}>
                    {appointment.type}
                  </Badge>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;