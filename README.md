# E-Police System 🚔

A comprehensive digital platform designed to modernize and streamline police-citizen interactions. The E-Police System provides a centralized portal for reporting complaints, managing fines, and facilitating administrative tasks for law enforcement officers.

## 🌟 Key Features

### 👤 Citizen Portal
- **Complaint Submission**: Securely lodge complaints online with detailed information.
- **Track Status**: Monitor the progress of submitted complaints in real-time.
- **Pay Fines**: View and pay traffic or other fines through the digital portal.

### 👮 Officer Interface
- **Case Management**: Efficiently review, update, and manage assigned cases.
- **Fine Issuance**: Generate digital fine notices for citizens.
- **Status Updates**: Communicate progress back to citizens instantly.

### 🛡️ Admin Dashboard
- **User Management**: Oversee registration and roles for officers and citizens.
- **Reporting & Analytics**: Access high-level summaries of system activity and crime statistics.
- **System Configuration**: Manage database and application-wide settings.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (built with [Vite](https://vitejs.dev/))
- **UI Libraries**: [Material UI](https://mui.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management & Routing**: [React Router](https://reactrouter.com/)
- **Testing**: [Cypress](https://www.cypress.io/), [Vitest](https://vitest.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/))
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/), [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- **Testing**: [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)

## 📁 Project Structure

```text
E-POLICE-SYSTEM/
├── E-POLICE-SERVER/           # Backend API (Node.js/Express)
│   ├── config/                # Database and other configurations
│   ├── controllers/           # Route logic
│   ├── models/                # MongoDB Schema definitions
│   ├── routes/                # API Endpoints
│   └── tests/                 # Backend unit & integration tests
├── E-Police_Service_Portal/    # Frontend Application (React/Vite)
│   ├── src/                   # Source code
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   └── services/          # API integration services
│   └── cypress/               # E2E testing
└── README.md                  # This file
```

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Altas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd E-POLICE-SERVER
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the portal directory:
   ```bash
   cd E-Police_Service_Portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file if necessary:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Backend
Run the test suite using Jest:
```bash
cd E-POLICE-SERVER
npm test
```

### Frontend
Run component tests or E2E tests:
```bash
cd E-Police_Service_Portal
npm run test          # Vitest for unit/component tests
npm run cypress:run   # Cypress for E2E tests
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
