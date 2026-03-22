//src/app/components/LoginPage.tsx
import { toast } from 'sonner';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, UserCircle, ShieldAlert, Lock } from 'lucide-react';

interface LoginPageProps {
  role: 'citizen' | 'police' | 'admin';
  onLogin: (email: string, password: string, role: 'citizen' | 'police' | 'admin') => boolean | void;
  onBack: () => void;
}

export function LoginPage({ role, onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    nic: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const success = onLogin(email, password, role);
    if (success === false) {
      toast.error('Invalid email or password');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password === registerData.confirmPassword) {
      // automatically log them in for mock
      onLogin(registerData.email, registerData.password, 'citizen');
    } else {
      toast.error('Passwords do not match');
    }
  };

  const getRoleConfig = () => {
    switch (role) {
      case 'citizen':
        return {
          title: 'Citizen Portal',
          icon: <UserCircle className="h-12 w-12 text-blue-900" />,
          demoEmail: 'demo@citizen.com',
          demoPassword: 'demo123'
        };
      case 'police':
        return {
          title: 'Police Officer Login',
          icon: <Shield className="h-12 w-12 text-blue-900" />,
          demoEmail: 'officer@police.gov',
          demoPassword: 'police123'
        };
      case 'admin':
        return {
          title: 'Admin Access',
          icon: <ShieldAlert className="h-12 w-12 text-blue-900" />,
          demoEmail: 'admin@epolice.gov',
          demoPassword: 'admin123'
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          ← Back to Home
        </Button>

        {role === 'citizen' ? (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{config.icon}</div>
                  <CardTitle className="text-2xl">{config.title}</CardTitle>
                  <CardDescription>Access your citizen account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                      <Lock className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </form>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="text-blue-900 mb-1">Demo Credentials:</p>
                    <p className="text-gray-600">Email: {config.demoEmail}</p>
                    <p className="text-gray-600">Password: {config.demoPassword}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{config.icon}</div>
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <CardDescription>Register as a new citizen</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="reg-name">Full Name</Label>
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="John Doe"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="john@example.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-phone">Phone Number</Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-nic">National ID / NIC</Label>
                      <Input
                        id="reg-nic"
                        type="text"
                        placeholder="123456789V"
                        value={registerData.nic}
                        onChange={(e) => setRegisterData({...registerData, nic: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-confirm">Confirm Password</Label>
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                      Register Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">{config.icon}</div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription>Secure access for authorized personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                  <Lock className="h-4 w-4 mr-2" />
                  Secure Login
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="text-blue-900 mb-1">Demo Credentials:</p>
                <p className="text-gray-600">Email: {config.demoEmail}</p>
                <p className="text-gray-600">Password: {config.demoPassword}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
