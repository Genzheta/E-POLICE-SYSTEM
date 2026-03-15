import { Shield, FileText, AlertCircle, CreditCard, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LandingPageProps {
  onLoginSelect: (role: 'citizen' | 'police' | 'admin') => void;
}

export function LandingPage({ onLoginSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-900 p-6 rounded-full">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl mb-4">
            Smart E-Police Service System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A centralized digital platform connecting citizens and police for efficient, transparent, and modern law enforcement services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-900 hover:bg-blue-800"
              onClick={() => onLoginSelect('citizen')}
            >
              Citizen Portal
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onLoginSelect('police')}
            >
              Police Login
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onLoginSelect('admin')}
            >
              Admin Access
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Pay Traffic Fines</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View and pay your traffic fines online instantly without visiting a station
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>File Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Submit complaints online with evidence and track their status in real-time
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Request Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Request police reports digitally and receive them via email
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Track Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor investigation progress and get real-time updates on your cases
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-2">Time Saving</h3>
              <p className="text-gray-600">No need to visit police stations physically. Access services 24/7 from anywhere.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-2">Transparency</h3>
              <p className="text-gray-600">Real-time tracking and updates ensure full transparency in all police services.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-2">Efficiency</h3>
              <p className="text-gray-600">Automated processes reduce errors and improve overall service delivery speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-6">About E-Police System</h2>
            <p className="text-lg text-gray-600 mb-4">
              The E-Police Service System is a comprehensive digital transformation initiative designed to modernize police services. 
              Our platform replaces manual paperwork and physical visits with a secure, centralized online system.
            </p>
            <p className="text-lg text-gray-600">
              By connecting citizens directly with police services through a user-friendly web interface, we're creating a more 
              efficient, transparent, and accessible law enforcement ecosystem for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl mb-2">10,000+</p>
              <p className="text-blue-200">Registered Citizens</p>
            </div>
            <div>
              <p className="text-4xl mb-2">5,000+</p>
              <p className="text-blue-200">Fines Processed</p>
            </div>
            <div>
              <p className="text-4xl mb-2">2,500+</p>
              <p className="text-blue-200">Cases Resolved</p>
            </div>
            <div>
              <p className="text-4xl mb-2">24/7</p>
              <p className="text-blue-200">Service Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl mb-6">Contact Us</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>Emergency Hotline: <strong>911</strong></p>
              <p>Service Support: <strong>1-800-POLICE</strong></p>
              <p>Email: <strong>support@epolice.gov</strong></p>
              <p>Address: <strong>123 Police Headquarters, Capital City</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 E-Police Service System. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Powered by Smart Digital Solutions</p>
        </div>
      </footer>
    </div>
  );
}
