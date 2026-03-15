import { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { CitizenDashboard } from './components/Dashboard/CitizenDashboard';
import { PoliceDashboard } from './components/Dashboard/PoliceDashboard';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { Toaster } from './components/ui/sonner';

type UserRole = 'citizen' | 'police' | 'admin' | null;
type Page = 'landing' | 'login' | 'dashboard';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage('login');
  };

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = {
      citizen: { name: 'John Doe', email: 'demo@citizen.com' },
      police: { name: 'Officer Davis', email: 'officer@police.gov' },
      admin: { name: 'Admin Smith', email: 'admin@epolice.gov' }
    };

    setUser({
      //name: mockUsers[role].name,
      name: mockUsers[role as keyof typeof mockUsers].name,
      email: email,
      role: role
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentPage('landing');
  };

  const handleBackToHome = () => {
    setSelectedRole(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userRole={user?.role || null}
        userName={user?.name}
        onLogout={handleLogout}
      />

      {currentPage === 'landing' && (
        <LandingPage onLoginSelect={handleLoginSelect} />
      )}

      {currentPage === 'login' && selectedRole && (
        <LoginPage 
          role={selectedRole}
          onLogin={handleLogin}
          onBack={handleBackToHome}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <>
          {user.role === 'citizen' && (
            <CitizenDashboard userName={user.name} />
          )}
          {user.role === 'police' && (
            <PoliceDashboard userName={user.name} />
          )}
          {user.role === 'admin' && (
            <AdminDashboard userName={user.name} />
          )}
        </>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
