import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  UserCog,
  BarChart3,
  Settings,
  Heart,
  Clock,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  // Admin routes
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    roles: ['admin']
  },
  {
    label: 'Practitioners',
    icon: UserCog,
    href: '/admin/practitioners',
    roles: ['admin']
  },
  {
    label: 'Patients',
    icon: Users,
    href: '/admin/patients',
    roles: ['admin']
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    roles: ['admin']
  },
  {
    label: 'Session Management',
    icon: ClipboardList,
    href: '/admin/sessions',
    roles: ['admin']
  },
  
  // Practitioner routes
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/practitioner',
    roles: ['practitioner']
  },
  {
    label: 'My Patients',
    icon: Users,
    href: '/practitioner/patients',
    roles: ['practitioner']
  },
  {
    label: 'Appointments',
    icon: Calendar,
    href: '/practitioner/appointments',
    roles: ['practitioner']
  },
  {
    label: 'Session Notes',
    icon: FileText,
    href: '/practitioner/notes',
    roles: ['practitioner']
  },
  
  // Patient routes
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/patient',
    roles: ['patient']
  },
  {
    label: 'My Therapy',
    icon: Heart,
    href: '/patient/therapy',
    roles: ['patient']
  },
  {
    label: 'Appointments',
    icon: Calendar,
    href: '/patient/appointments',
    roles: ['patient']
  },
  {
    label: 'Progress',
    icon: BarChart3,
    href: '/patient/progress',
    roles: ['patient']
  },
  {
    label: 'Feedback',
    icon: MessageSquare,
    href: '/patient/feedback',
    roles: ['patient']
  },
  
  // Common routes
  {
    label: 'Schedule',
    icon: Clock,
    href: '/schedule',
    roles: ['admin', 'practitioner', 'patient']
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    roles: ['admin', 'practitioner', 'patient']
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className={cn(
      "w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col",
      className
    )}>
      <div className="p-6">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive: navIsActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    (isActive || navIsActive)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover-lift"
                  )
                }
              >
                <Icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive 
                    ? "text-sidebar-primary-foreground" 
                    : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                )} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;