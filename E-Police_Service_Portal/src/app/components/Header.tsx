import { Shield, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface HeaderProps {
  userRole?: 'citizen' | 'police' | 'admin' | null;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ userRole, userName, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="font-bold text-xl">E-Police</h1>
              <p className="text-xs text-blue-200">Smart Service System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {!userRole ? (
              <>
                <a href="#home" className="hover:text-blue-200 transition-colors">Home</a>
                <a href="#services" className="hover:text-blue-200 transition-colors">Services</a>
                <a href="#about" className="hover:text-blue-200 transition-colors">About</a>
                <a href="#contact" className="hover:text-blue-200 transition-colors">Contact</a>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-blue-100">
                  <UserCircle className="h-5 w-5" />
                  <span>{userName}</span>
                  <span className="px-2 py-1 bg-blue-700 rounded text-xs ml-2">
                    {userRole?.toUpperCase()}
                  </span>
                </div>
                <Button 
                  onClick={onLogout}
                  variant="outline" 
                  size="sm"
                  className="border-white text-white hover:bg-blue-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-blue-800 mt-2 pt-4">
            {!userRole ? (
              <div className="flex flex-col gap-3">
                <a href="#home" className="hover:text-blue-200 transition-colors">Home</a>
                <a href="#services" className="hover:text-blue-200 transition-colors">Services</a>
                <a href="#about" className="hover:text-blue-200 transition-colors">About</a>
                <a href="#contact" className="hover:text-blue-200 transition-colors">Contact</a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span>{userName}</span>
                </div>
                <Button onClick={onLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
