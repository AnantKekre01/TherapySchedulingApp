import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'practitioner' | 'patient';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for demo
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'admin@therapy.com',
    role: 'admin' as const,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'practitioner@therapy.com',
    role: 'practitioner' as const,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'patient@therapy.com',
    role: 'patient' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b85639c4?w=400'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in production, this would call your backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser = mockUsers.find(u => u.email === email);
      
      if (mockUser && password === 'password') {
        const mockToken = `mock-jwt-token-${mockUser.id}`;
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('authUser', JSON.stringify(mockUser));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};