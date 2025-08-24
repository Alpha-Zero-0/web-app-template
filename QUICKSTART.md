# Web App Template

## Quick Start Guide

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### 1. Setup
```bash
# Make setup script executable and run it
chmod +x setup.sh
./setup.sh
```

### 2. Configure Environment Variables

#### Backend (.env)
```bash
cp backend/.env.example backend/.env
```
Then edit `backend/.env` with your actual values:
- MongoDB connection string
- JWT secret
- Firebase project ID

#### Frontend (.env.local)
```bash
cp frontend/.env.example frontend/.env.local
```
Then edit `frontend/.env.local` with your Firebase config.

### 3. Development
```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Or start separately:
npm run dev:backend  # Backend on :5000
npm run dev:frontend # Frontend on :3000
```

### 4. Testing
```bash
npm run test
```

For detailed setup instructions, see the main README.md file.
