import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Types
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: string;
  practitionerId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Practitioner {
  id: string;
  name: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
  status: 'active' | 'inactive';
  maxPatients: number;
  currentPatients: number;
}

export interface TherapyPlan {
  id: string;
  patientId: string;
  practitionerId: string;
  type: string;
  goals: string[];
  duration: number;
  frequency: string;
  status: 'active' | 'completed' | 'suspended';
  startDate: string;
  endDate?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  practitionerId: string;
  datetime: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  room?: string;
}

export interface Session {
  id: string;
  appointmentId: string;
  patientId: string;
  practitionerId: string;
  datetime: string;
  duration: number;
  notes: string;
  goals: string[];
  outcomes: string[];
  rating?: number;
  feedback?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  }
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  
  updateProfile: async (data: Partial<Patient | Practitioner>) => {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  }
};

// Patients API
export const patientsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/patients');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },
  
  create: async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
    const response = await apiClient.post('/patients', patient);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Patient>) => {
    const response = await apiClient.put(`/patients/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  },
  
  getByPractitioner: async (practitionerId: string) => {
    const response = await apiClient.get(`/patients/practitioner/${practitionerId}`);
    return response.data;
  }
};

// Practitioners API
export const practitionersAPI = {
  getAll: async () => {
    const response = await apiClient.get('/practitioners');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/practitioners/${id}`);
    return response.data;
  },
  
  create: async (practitioner: Omit<Practitioner, 'id'>) => {
    const response = await apiClient.post('/practitioners', practitioner);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Practitioner>) => {
    const response = await apiClient.put(`/practitioners/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/practitioners/${id}`);
    return response.data;
  }
};

// Appointments API
export const appointmentsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },
  
  create: async (appointment: Omit<Appointment, 'id'>) => {
    const response = await apiClient.post('/appointments', appointment);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Appointment>) => {
    const response = await apiClient.put(`/appointments/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data;
  },
  
  getByPractitioner: async (practitionerId: string, date?: string) => {
    const params = date ? { date } : {};
    const response = await apiClient.get(`/appointments/practitioner/${practitionerId}`, { params });
    return response.data;
  },
  
  getByPatient: async (patientId: string) => {
    const response = await apiClient.get(`/appointments/patient/${patientId}`);
    return response.data;
  }
};

// Sessions API
export const sessionsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/sessions');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/sessions/${id}`);
    return response.data;
  },
  
  create: async (session: Omit<Session, 'id'>) => {
    const response = await apiClient.post('/sessions', session);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Session>) => {
    const response = await apiClient.put(`/sessions/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/sessions/${id}`);
    return response.data;
  },
  
  getByPatient: async (patientId: string) => {
    const response = await apiClient.get(`/sessions/patient/${patientId}`);
    return response.data;
  },
  
  getByPractitioner: async (practitionerId: string) => {
    const response = await apiClient.get(`/sessions/practitioner/${practitionerId}`);
    return response.data;
  }
};

// Therapy Plans API
export const therapyPlansAPI = {
  getAll: async () => {
    const response = await apiClient.get('/therapy-plans');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/therapy-plans/${id}`);
    return response.data;
  },
  
  create: async (plan: Omit<TherapyPlan, 'id'>) => {
    const response = await apiClient.post('/therapy-plans', plan);
    return response.data;
  },
  
  update: async (id: string, data: Partial<TherapyPlan>) => {
    const response = await apiClient.put(`/therapy-plans/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/therapy-plans/${id}`);
    return response.data;
  },
  
  getByPatient: async (patientId: string) => {
    const response = await apiClient.get(`/therapy-plans/patient/${patientId}`);
    return response.data;
  }
};

// AI Integration API
export const aiAPI = {
  getScheduleSuggestions: async (practitionerId: string, patientId: string, preferredTimes?: string[]) => {
    const response = await apiClient.post('/ai/schedule', {
      practitionerId,
      patientId,
      preferredTimes
    });
    return response.data;
  },
  
  getHistorySummary: async (patientId: string) => {
    const response = await apiClient.get(`/ai/history-summary/${patientId}`);
    return response.data;
  },
  
  getProgressInsights: async (patientId: string) => {
    const response = await apiClient.get(`/ai/progress-insights/${patientId}`);
    return response.data;
  },
  
  generateSessionNotes: async (sessionId: string, keywords: string[]) => {
    const response = await apiClient.post('/ai/session-notes', {
      sessionId,
      keywords
    });
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data;
  },
  
  getSessionTrends: async (timeRange: string) => {
    const response = await apiClient.get(`/analytics/session-trends?range=${timeRange}`);
    return response.data;
  },
  
  getPractitionerWorkload: async () => {
    const response = await apiClient.get('/analytics/practitioner-workload');
    return response.data;
  },
  
  getPatientProgress: async (patientId: string) => {
    const response = await apiClient.get(`/analytics/patient-progress/${patientId}`);
    return response.data;
  }
};

export default apiClient;