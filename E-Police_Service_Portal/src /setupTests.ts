// src/setupTests.ts
/*
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start MSW
beforeAll(() => server.listen());

// Reset after each test
afterEach(() => server.resetHandlers());

// Stop server
afterAll(() => server.close());*/

// src/setupTests.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// ============================
// Mock window.matchMedia for Vitest/jsdom
// ============================
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// ============================
// Start MSW
// ============================
beforeAll(() => server.listen());

// Reset after each test
afterEach(() => server.resetHandlers());

// Stop server
afterAll(() => server.close());