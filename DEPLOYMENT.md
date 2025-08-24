# Deployment Guide

This guide will walk you through deploying your web app template to production using Vercel (frontend) and Render (backend).

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- [Vercel account](https://vercel.com/)
- GitHub repository (✅ Already created!)

### Steps

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `Alpha-Zero-0/web-app-template`

2. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set Environment Variables**
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   REACT_APP_API_BASE_URL=https://your-render-backend.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be available at `https://your-app.vercel.app`

## 🔧 Backend Deployment (Render)

### Prerequisites
- [Render account](https://render.com/)
- GitHub repository (✅ Already created!)

### Steps

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Alpha-Zero-0/web-app-template`

2. **Configure Service Settings**
   - Name: `web-app-template-backend`
   - Environment: `Node`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your_super_secure_jwt_secret_here
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Your backend will be available at `https://your-app.onrender.com`

## 🍃 MongoDB Setup (MongoDB Atlas)

### Prerequisites
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)

### Steps

1. **Create Cluster**
   - Sign up/login to MongoDB Atlas
   - Create a new cluster (Free tier is fine for development)
   - Choose your preferred cloud provider and region

2. **Create Database User**
   - Go to Database Access
   - Add new database user
   - Choose username/password authentication
   - Set appropriate permissions (Read and write to any database)

3. **Configure Network Access**
   - Go to Network Access
   - Add IP address: `0.0.0.0/0` (for development)
   - For production, add your Render service IP

4. **Get Connection String**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔥 Firebase Setup

### Prerequisites
- [Firebase account](https://console.firebase.google.com/)

### Steps

1. **Create Project**
   - Go to Firebase Console
   - Create new project
   - Enable Google Analytics (optional)

2. **Setup Authentication**
   - Go to Authentication → Sign-in method
   - Enable Email/Password provider
   - Enable Google provider
   - Configure authorized domains (add your Vercel domain)

3. **Get Configuration**
   - Go to Project Settings → General
   - Add a web app to your project
   - Copy the configuration object
   - Use these values in your environment variables

4. **Optional: Setup Firebase Admin (for server)**
   - Go to Project Settings → Service accounts
   - Generate new private key
   - Download the JSON file
   - Either use the file or convert to environment variables

## 🔄 Update Frontend API URL

After your backend is deployed to Render:

1. **Update Vercel Environment Variables**
   - Go to your Vercel project settings
   - Update `REACT_APP_API_BASE_URL` to your Render URL
   - Example: `https://your-app.onrender.com/api`

2. **Update Backend CORS**
   - Update the CORS configuration in `backend/server.js`
   - Add your Vercel domain to the allowed origins
   - Example: `https://your-app.vercel.app`

## 🧪 Testing Production Deployment

1. **Test Authentication**
   - Sign up with email/password
   - Sign in with Google
   - Verify user profile updates

2. **Test API Endpoints**
   - Check if all API calls work
   - Verify data persistence in MongoDB
   - Test protected routes

3. **Monitor Logs**
   - Check Vercel deployment logs
   - Monitor Render service logs
   - Watch for any errors or warnings

## 🔐 Security Checklist

- [ ] Environment variables are set correctly
- [ ] MongoDB network access is configured properly
- [ ] Firebase authorized domains include your production domain
- [ ] CORS is configured for your frontend domain
- [ ] JWT secret is secure and unique
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced

## 📊 Monitoring & Maintenance

### Render Monitoring
- Enable health checks: `/health` endpoint
- Set up log retention
- Monitor resource usage

### Vercel Analytics
- Enable Web Analytics in project settings
- Monitor Core Web Vitals
- Track deployment frequency

### Database Monitoring
- Monitor MongoDB Atlas metrics
- Set up alerts for high usage
- Regular backups (Atlas handles this automatically)

## 🐛 Common Deployment Issues

### Build Failures
- Check environment variables are set
- Verify all dependencies are in package.json
- Check for any hardcoded localhost URLs

### CORS Errors
- Update backend CORS configuration
- Ensure frontend domain is whitelisted
- Check preflight request handling

### Database Connection Issues
- Verify MongoDB connection string
- Check IP whitelist in Atlas
- Ensure database user has correct permissions

### Authentication Issues
- Verify Firebase configuration
- Check authorized domains
- Ensure API keys are correct

## 🚀 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Vercel**: Automatically deploys on push to main branch
2. **Render**: Automatically deploys on push to main branch

To disable auto-deploy:
- Vercel: Project Settings → Git
- Render: Service Settings → Auto-Deploy

## 📝 Post-Deployment

1. **Update README**: Add links to your live application
2. **Test thoroughly**: Go through all user flows
3. **Monitor performance**: Watch for any issues
4. **Set up analytics**: Track user behavior
5. **Plan for scaling**: Monitor resource usage

## 💰 Cost Considerations

### Free Tiers Include:
- **Vercel**: 100GB bandwidth, unlimited projects
- **Render**: 750 hours/month (enough for 1 service)
- **MongoDB Atlas**: 512MB storage, shared cluster
- **Firebase**: 50K reads, 20K writes per day

### Upgrade When:
- Traffic exceeds free tier limits
- Need better performance
- Require additional features
- Need priority support
