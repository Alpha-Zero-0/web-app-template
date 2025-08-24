const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;
    
    // Find or create user in MongoDB
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email,
        photoURL: decodedToken.picture,
        emailVerified: decodedToken.email_verified,
        provider: decodedToken.firebase.sign_in_provider === 'google.com' ? 'google' : 'email'
      });
      await user.save();
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Alternative JWT middleware for non-Firebase routes (if needed)
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Optional middleware - works with either Firebase or JWT tokens
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Try Firebase token first
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;
    
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    if (!user) {
      user = new User({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email,
        photoURL: decodedToken.picture,
        emailVerified: decodedToken.email_verified,
        provider: decodedToken.firebase.sign_in_provider === 'google.com' ? 'google' : 'email'
      });
      await user.save();
    }
    
    req.user = user;
    next();
  } catch (firebaseError) {
    // If Firebase fails, try JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        return res.status(401).json({ message: 'User not found or inactive' });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.error('Authentication error:', { firebaseError, jwtError });
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};

module.exports = {
  verifyFirebaseToken,
  verifyJWT,
  authenticate
};
