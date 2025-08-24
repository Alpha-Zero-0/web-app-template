# Troubleshooting Guide

## Common Setup Issues

### 1. Node.js Version Issues
**Problem**: "Node.js version not supported" or similar errors
**Solution**: 
- Install Node.js v16 or higher from [nodejs.org](https://nodejs.org/)
- Use nvm to manage multiple Node versions: `nvm install 18 && nvm use 18`

### 2. Permission Errors on macOS/Linux
**Problem**: "EACCES: permission denied" when running npm install
**Solution**:
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### 3. Setup Script Not Executable
**Problem**: "./setup.sh: Permission denied"
**Solution**: `chmod +x setup.sh`

## Firebase Issues

### 1. Firebase Configuration Errors
**Problem**: "Firebase configuration is invalid"
**Solution**:
- Double-check all environment variables in `.env.local`
- Ensure no trailing spaces in environment values
- Verify project ID matches your Firebase project

### 2. Firebase Authentication Not Working
**Problem**: Google sign-in popup blocked or not working
**Solution**:
- Add your domain to Firebase Auth > Settings > Authorized domains
- For localhost, ensure `localhost:3000` is in authorized domains
- Check browser popup blocker settings

### 3. Firebase Admin SDK Issues
**Problem**: "Firebase Admin SDK error" in backend
**Solution**:
- Ensure `FIREBASE_PROJECT_ID` is set correctly
- For production, consider using service account key file
- Check Firebase project permissions

## MongoDB Issues

### 1. Connection String Errors
**Problem**: "MongoServerError: bad auth"
**Solution**:
- Verify username and password in connection string
- Ensure special characters in password are URL-encoded
- Check MongoDB Atlas network access settings

### 2. Database Connection Timeout
**Problem**: "MongoTimeoutError: Server selection timed out"
**Solution**:
- Add your IP address to MongoDB Atlas whitelist (0.0.0.0/0 for development)
- Check firewall settings
- Verify connection string format

### 3. Local MongoDB Issues (Docker)
**Problem**: MongoDB container won't start
**Solution**:
```bash
# Stop and remove containers
docker-compose down -v
# Rebuild and start
docker-compose up --build
```

## Development Issues

### 1. CORS Errors
**Problem**: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution**:
- Check backend CORS configuration in `server.js`
- Ensure frontend URL is in CORS whitelist
- For development, verify proxy setting in frontend `package.json`

### 2. API Requests Failing
**Problem**: Network errors or 404s when calling API
**Solution**:
- Verify backend is running on port 5000
- Check `REACT_APP_API_BASE_URL` in frontend `.env.local`
- Ensure API routes are correctly defined

### 3. Hot Reload Not Working
**Problem**: Changes not reflected automatically
**Solution**:
- Restart development servers
- Check if files are being watched correctly
- For Docker: ensure volume mounts are configured

## Deployment Issues

### 1. Vercel Deployment Fails
**Problem**: Build errors or deployment timeout
**Solution**:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `vercel.json` configuration is correct

### 2. Render Deployment Issues
**Problem**: Backend deployment fails or crashes
**Solution**:
- Check Render logs for error details
- Verify environment variables are set correctly
- Ensure start command is `npm start`

### 3. Environment Variables Not Working
**Problem**: App works locally but not in production
**Solution**:
- Verify all required environment variables are set in deployment platforms
- Check variable names match exactly (case-sensitive)
- Ensure no local environment variables are being used in production

## Docker Issues

### 1. Docker Build Fails
**Problem**: "failed to build" errors
**Solution**:
```bash
# Clean Docker cache
docker system prune -f
# Rebuild without cache
docker-compose build --no-cache
```

### 2. Container Port Issues
**Problem**: Cannot access app on expected ports
**Solution**:
- Check port mappings in `docker-compose.yml`
- Ensure ports aren't already in use: `lsof -i :3000`

### 3. Volume Mount Issues
**Problem**: Code changes not reflected in Docker container
**Solution**:
- Verify volume mounts in `docker-compose.yml`
- On Windows, ensure drive sharing is enabled in Docker Desktop

## Performance Issues

### 1. Slow API Responses
**Problem**: Backend API taking too long to respond
**Solution**:
- Check MongoDB query optimization
- Add database indexes for frequently queried fields
- Monitor memory usage and optimize

### 2. Large Bundle Size
**Problem**: Frontend bundle too large
**Solution**:
- Use React.lazy() for code splitting
- Analyze bundle with `npm run build` and check the output
- Remove unused dependencies

## Testing Issues

### 1. Tests Failing
**Problem**: Jest tests not passing
**Solution**:
- Check test environment setup
- Ensure test database is separate from development
- Verify mock configurations

### 2. Firebase Auth Tests
**Problem**: Firebase authentication in tests
**Solution**:
- Use Firebase Admin SDK for testing
- Mock Firebase auth in test environment
- Consider using Firebase Auth Emulator

## Getting Help

If you're still experiencing issues:

1. **Check the logs**: Always check console/terminal output for error details
2. **Search existing issues**: Look through project issues on GitHub
3. **Create detailed bug reports**: Include steps to reproduce, environment details, and error logs
4. **Community support**: Ask questions in relevant Discord/Slack communities

## Useful Commands for Debugging

```bash
# Check Node.js and npm versions
node -v && npm -v

# Clear npm cache
npm cache clean --force

# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Check Docker status
docker ps
docker logs <container-id>

# Reset git repository
git reset --hard HEAD
git clean -fd

# Full cleanup and restart
rm -rf node_modules package-lock.json
npm install
```
