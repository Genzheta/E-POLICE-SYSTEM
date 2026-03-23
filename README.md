# E-Police System

The **E-Police System** is a full-stack web application designed for law enforcement and administrative officers to manage reports, incidents, officers, and cases efficiently. This centralized system includes a robust backend server with MongoDB integration and a modern frontend service portal.

## Project Structure

This repository is organized into a monorepo setup consisting of two main directories:

- **E-POLICE-SERVER**: The Node.js Express backend API, which manages authentication, business logic, endpoints, and database connection.
- **E-Police_Service_Portal**: The React Vite frontend application for administrators and officers to interact with the system.

## Technologies Used

### Frontend (E-Police Service Portal)
- React 18, Vite, TypeScript
- Tailwind CSS, Material UI, and Radix UI components
- Vite PWA & Webpack (for bundles)
- Testing: Vitest for Unit Testing and Cypress for End-to-End (E2E) testing.

### Backend (E-Police Server)
- Node.js, Express 5
- MongoDB (Mongoose ORM)
- Authentication: JSON Web Tokens (JWT) & bcryptjs
- Testing: Jest, Supertest, MongoDB-Memory-Server for database mocks.

---

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm (Node Package Manager)
- A running MongoDB instance or connection string for the backend.

### Environment Setup

This project uses environment variables for configuration. To set these up:

1. **Backend Configuration:**
   - Navigate to the `E-POLICE-SERVER` directory.
   - Copy the `.env.example` file to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open the new `.env` file and replace the placeholder values for `MONGO_URI` and `JWT_SECRET` with your actual secure credentials.

2. **Frontend Configuration:**
   - Navigate to the `E-Police_Service_Portal` directory.
   - Copy the `.env.example` file to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Ensure `VITE_API_BASE_URL` points to your running backend (defaults to `http://localhost:4000/api`).

### 1. Backend Setup (`E-POLICE-SERVER`)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd E-POLICE-SERVER
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file from any provided `.env.example` (or configure your environment variables typically requiring `PORT`, `MONGODB_URI`, `JWT_SECRET`, etc.).
4. Start the server:
   ```bash
   npm start
   ```
   The backend will typically listen on port 3000 or the port specified in your environment variables.

### 2. Frontend Setup (`E-Police_Service_Portal`)

1. Open a new terminal tab/window and navigate to the frontend directory:
   ```bash
   cd E-Police_Service_Portal
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from any provided templates if applicable (usually to specify root API URLs like `VITE_API_BASE_URL`).
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will compile and open its development server visually in your browser.

---

## Scripts & Operations

### Backend Scripts
- `npm start`: Starts the backend Node.js server.
- `npm test`: Runs backend tests using Jest.

### Frontend Scripts
- `npm run dev`: Starts the local development server utilizing Vite.
- `npm run build`: Generates the production-ready build artifacts to the `dist/` directory.
- `npm run test`: Executes unit tests leveraging Vitest.
- `npm run cypress:open`: Opens the interactive Cypress Test Runner to interact visually directly with E2E tests.
- `npm run cypress:run`: Executes Cypress tests ephemerally in headless mode which is optimal for Continuous Integration pipelines.

---

## Testing

Comprehensive testing has been established ensuring robustness:
- **Unit and Integration**: Covered mostly by Vitest (Frontend) and Jest/Supertest (Backend).
- **End-to-End (E2E)**: Powered by Cypress to simulate real user interactions and validate whole platform features end-to-end.

## Contributing

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request
