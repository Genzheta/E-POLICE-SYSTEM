// src/mocks/handlers.js

import { http, HttpResponse } from 'msw';

// ✅ MSW v2 syntax (IMPORTANT)

export const handlers = [
  
  // Citizen login
  http.post('/api/citizen/login', async ({ request }) => {
    const body = await request.json();

    if (body.username === 'citizen' && body.password === '1234') {
      return HttpResponse.json({
        token: 'citizen-token',
        role: 'citizen',
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Police login
  http.post('/api/police/login', async ({ request }) => {
    const body = await request.json();

    if (body.username === 'police' && body.password === '1234') {
      return HttpResponse.json({
        token: 'police-token',
        role: 'police',
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Admin login
  http.post('/api/admin/login', async ({ request }) => {
    const body = await request.json();

    if (body.username === 'admin' && body.password === '1234') {
      return HttpResponse.json({
        token: 'admin-token',
        role: 'admin',
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];