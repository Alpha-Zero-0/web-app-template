#!/bin/bash

# Web App Template Setup Script
echo "🚀 Setting up Web App Template..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) is installed"

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
if npm install; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ../frontend
if npm install; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create environment files if they don't exist
print_status "Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    print_warning "Created backend/.env from example. Please configure your environment variables."
else
    print_success "Backend .env file already exists"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    print_warning "Created frontend/.env.local from example. Please configure your Firebase settings."
else
    print_success "Frontend .env.local file already exists"
fi

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Web App Template setup"
    print_success "Git repository initialized"
else
    print_success "Git repository already exists"
fi

echo ""
print_success "Setup complete! 🎉"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Configure your environment variables:"
echo "   - backend/.env (MongoDB URI, JWT secret, etc.)"
echo "   - frontend/.env.local (Firebase configuration)"
echo ""
echo "2. Start the development servers:"
echo "   - Backend: cd backend && npm run dev"
echo "   - Frontend: cd frontend && npm start"
echo ""
echo "3. Set up your accounts:"
echo "   - Firebase Console: https://console.firebase.google.com/"
echo "   - MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
echo "   - Vercel: https://vercel.com/"
echo "   - Render: https://render.com/"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
