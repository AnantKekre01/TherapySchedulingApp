import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PractitionersPage from "./pages/admin/PractitionersPage";
import PatientsPage from "./pages/admin/PatientsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SessionsPage from "./pages/admin/SessionsPage";
import PractitionerDashboard from "./pages/practitioner/PractitionerDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              {/* Admin Routes */}
              <Route path="admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="admin/practitioners" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PractitionersPage />
                </ProtectedRoute>
              } />
              <Route path="admin/patients" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PatientsPage />
                </ProtectedRoute>
              } />
              <Route path="admin/analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              <Route path="admin/sessions" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SessionsPage />
                </ProtectedRoute>
              } />
              
              {/* Practitioner Routes */}
              <Route path="practitioner" element={
                <ProtectedRoute allowedRoles={['practitioner']}>
                  <PractitionerDashboard />
                </ProtectedRoute>
              } />
              
              {/* Patient Routes */}
              <Route path="patient" element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } />
              
              {/* Common Routes */}
              <Route path="settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              {/* Default redirect based on role */}
              <Route index element={<Navigate to="/admin" replace />} />
            </Route>
            
            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
