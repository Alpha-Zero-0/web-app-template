const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // Option 1: Using service account key file (recommended for production)
  // const serviceAccount = require('./firebase-service-account.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   projectId: process.env.FIREBASE_PROJECT_ID
  // });

  // Option 2: Using environment variables (for development/Render deployment)
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

module.exports = admin;
