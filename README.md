# Web App Template

[![GitHub stars](https://img.shields.io/github/stars/Alpha-Zero-0/web-app-template?style=flat-square)](https://github.com/Alpha-Zero-0/web-app-template/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Alpha-Zero-0/web-app-template?style=flat-square)](https://github.com/Alpha-Zero-0/web-app-template/network)
[![GitHub issues](https://img.shields.io/github/issues/Alpha-Zero-0/web-app-template?style=flat-square)](https://github.com/Alpha-Zero-0/web-app-template/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A full-stack web application template with Firebase authentication, MongoDB database, and deployment configurations for Vercel (frontend) and Render (backend).

## 🏗️ Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## 🚀 Features

- **Frontend**: React.js with Firebase Authentication UI
- **Backend**: Node.js/Express API with MongoDB integration
- **Authentication**: Firebase Auth (Google OAuth + Email/Password)
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (frontend) + Render (backend)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- npm or yarn
- Git
- A Firebase account
- A MongoDB account (MongoDB Atlas recommended)
- A Vercel account
- A Render account

## 🛠️ Setup Instructions

### Option 1: Quick Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/Alpha-Zero-0/web-app-template.git
cd web-app-template

# Run the setup script
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/Alpha-Zero-0/web-app-template.git
cd web-app-template

# Install all dependencies
npm run install:all

# Or install individually:
# cd frontend && npm install
# cd ../backend && npm install
```

### Option 3: Docker Setup

```bash
# Clone the repository
git clone https://github.com/Alpha-Zero-0/web-app-template.git
cd web-app-template

# Configure environment variables in docker-compose.yml
# Then start with Docker Compose
docker-compose up --build
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google providers
4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon
   - Copy the config object

5. Create `frontend/.env.local`:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
```

### 3. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Create `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 4. Local Development

#### Using npm scripts (Recommended):
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
npm run dev:backend  # Backend on http://localhost:5000
npm run dev:frontend # Frontend on http://localhost:3000
```

#### Manual start:
#### Start Backend (Terminal 1):
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend (Terminal 2):
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

#### Using Docker:
```bash
docker-compose up
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from frontend directory:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all the `REACT_APP_*` environment variables

4. For automatic deployments, connect your GitHub repository to Vercel

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FIREBASE_PROJECT_ID`

5. Update frontend API URLs:
   - Replace `http://localhost:5000` with your Render URL in frontend code

## 🔧 Configuration Files

### Frontend Configuration
- `frontend/src/config/firebase.js` - Firebase configuration
- `frontend/src/config/api.js` - API endpoint configuration

### Backend Configuration
- `backend/config/database.js` - MongoDB connection
- `backend/config/firebase.js` - Firebase admin configuration
- `backend/middleware/auth.js` - Authentication middleware

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Frontend Components

- `LoginForm` - Email/password login
- `RegisterForm` - User registration
- `GoogleAuth` - Google OAuth button
- `Dashboard` - Protected dashboard component
- `ProtectedRoute` - Route protection component

## 📝 Next Steps

1. **Run the setup script**: `./setup.sh` (handles dependency installation and environment setup)
2. **Configure your services**:
   - Set up Firebase project and get configuration keys
   - Create MongoDB Atlas cluster and get connection string
   - Update environment variables in `.env` files
3. **Customize the UI/UX** according to your needs
4. **Add your business logic** and additional API endpoints
5. **Implement additional features** (password reset, email verification, etc.)
6. **Add proper error handling** and validation
7. **Implement comprehensive testing**
8. **Set up CI/CD pipelines**
9. **Deploy to production** using Vercel and Render

## 🐳 Docker Support

This template includes Docker support for containerized development:

```bash
# Development with hot reload
docker-compose up

# Production build
docker-compose -f docker-compose.prod.yml up --build
```

## 📊 Available Scripts

- `npm run setup` - Run the setup script
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm run test` - Run all tests
- `npm run install:all` - Install dependencies for both frontend and backend

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend is configured to accept requests from your frontend domain
2. **Firebase Auth Errors**: Check your Firebase configuration and API keys
3. **MongoDB Connection Issues**: Verify your connection string and network access settings
4. **Deployment Issues**: Check environment variables and build logs

### Environment Variables Checklist:

**Frontend (.env.local):**
- [ ] REACT_APP_FIREBASE_API_KEY
- [ ] REACT_APP_FIREBASE_AUTH_DOMAIN
- [ ] REACT_APP_FIREBASE_PROJECT_ID
- [ ] REACT_APP_FIREBASE_STORAGE_BUCKET
- [ ] REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- [ ] REACT_APP_FIREBASE_APP_ID

**Backend (.env):**
- [ ] MONGODB_URI
- [ ] PORT
- [ ] NODE_ENV
- [ ] JWT_SECRET
- [ ] FIREBASE_PROJECT_ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
