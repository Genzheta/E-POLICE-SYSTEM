// src/tests/App.integration.test.tsx

import App from '../app/App';

// src/tests/App.integration.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';


// Mocking window.scrollTo as it's not implemented in JSDOM
window.scrollTo = vi.fn();

describe('E-Police System Integration Tests', () => {
  
  it('should navigate from landing page to citizen login and then to citizen dashboard', async () => {
    render(<App />);

    // 1. Click Citizen Portal (Matches LandingPage.tsx exactly)
    const citizenBtn = screen.getByRole('button', { name: /citizen portal/i });
    fireEvent.click(citizenBtn);

    // 2. Verify we are on the Login page (LoginPage.tsx sets title to "Citizen Portal" for this role)
    await waitFor(() => {
      expect(screen.getByText(/citizen portal/i)).toBeInTheDocument();
    });

    // 3. Fill in login credentials (Matches LoginPage.tsx placeholders)
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    
    // Matches LoginPage.tsx: <Button>Login</Button>
    const loginBtn = screen.getByRole('button', { name: /^login$/i });

    const demoPassword = import.meta.env.VITE_CITIZEN_PASSWORD || 'demo123';
    fireEvent.change(emailInput, { target: { value: 'demo@citizen.com' } });
    fireEvent.change(passwordInput, { target: { value: demoPassword } });
    fireEvent.click(loginBtn);

    // 4. Verify navigation to Citizen Dashboard (Matches CitizenDashboard.tsx welcome text)
    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });
  });

  it('should navigate to police dashboard using officer credentials', async () => {
    render(<App />);

    // 1. Click Police Login (Matches LandingPage.tsx)
    const policeBtn = screen.getByRole('button', { name: /police login/i });
    fireEvent.click(policeBtn);

    // 2. Verify Police Login Page (LoginPage.tsx sets title to "Police Officer Login")
    await waitFor(() => {
      expect(screen.getByText(/police officer login/i)).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginBtn = screen.getByRole('button', { name: /secure login/i });

    const policePassword = import.meta.env.VITE_POLICE_PASSWORD || 'police123';
    fireEvent.change(emailInput, { target: { value: 'officer@police.gov' } });
    fireEvent.change(passwordInput, { target: { value: policePassword } });
    fireEvent.click(loginBtn);

    // 3. Verify Police Dashboard (Matches PoliceDashboard.tsx <CardTitle>)
    await waitFor(() => {
      expect(screen.getByText(/officer dashboard/i)).toBeInTheDocument();
    });
  });

  it('should navigate to admin dashboard using admin credentials', async () => {
    render(<App />);

    // 1. Click Admin Access (Matches LandingPage.tsx)
    const adminBtn = screen.getByRole('button', { name: /admin access/i });
    fireEvent.click(adminBtn);

    // 2. Verify Admin Login Page (LoginPage.tsx sets title to "Admin Access")
    await waitFor(() => {
      // "Admin Access" appears in both Header and LoginPage Title; getAll handles this
      const titles = screen.getAllByText(/admin access/i);
      expect(titles.length).toBeGreaterThan(0);
    });

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginBtn = screen.getByRole('button', { name: /secure login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@epolice.gov' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginBtn);

    // 3. Verify Admin Dashboard (Matches AdminDashboard.tsx <CardTitle>)
    await waitFor(() => {
      expect(screen.getByText(/admin control panel/i)).toBeInTheDocument();
    });
  });

  it('should display an error toast for invalid login credentials', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /citizen portal/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/citizen portal/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'wrong@email.com' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  it('should display an error toast for empty form submission', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /police login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/police officer login/i)).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    
    // Check native HTML5 validation
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();

    // Submit without filling anything by targeting the form directly to bypass jsdom HTML5 validation block
    const form = screen.getByRole('button', { name: /secure login/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it('should prevent unauthorized access to dashboard routes', () => {
    render(<App />);
    // Since access is state-controlled, the dashboard shouldn't exist in the DOM initially.
    expect(screen.queryByText(/officer dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/admin control panel/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
  });

  it('should handle the logout flow correctly', async () => {
    render(<App />);
    // 1. Login as Admin
    fireEvent.click(screen.getByRole('button', { name: /admin access/i }));
    await waitFor(() => expect(screen.getAllByText(/admin access/i).length).toBeGreaterThan(0));
    
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'admin@epolice.gov' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: adminPassword } });
    fireEvent.click(screen.getByRole('button', { name: /secure login/i }));

    // 2. Wait for Dashboard, get Logout button
    let logoutBtns: HTMLElement[] = [];
    await waitFor(() => {
      expect(screen.getByText(/admin control panel/i)).toBeInTheDocument();
      logoutBtns = screen.getAllByRole('button', { name: /logout/i });
      expect(logoutBtns.length).toBeGreaterThan(0);
    });

    // 3. Click Logout
    fireEvent.click(logoutBtns[0]);

    // 4. Verify returning to landing page
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /citizen portal/i })).toBeInTheDocument();
    });
  });
});