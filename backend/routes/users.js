const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyFirebaseToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation for profile update
const validateProfileUpdate = [
  body('displayName').optional().trim().isLength({ min: 1 }).withMessage('Display name cannot be empty'),
  body('profile.bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('profile.location').optional().trim().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
  body('profile.website').optional().isURL().withMessage('Website must be a valid URL'),
  body('profile.dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date')
];

// Get current user profile
router.get('/profile', verifyFirebaseToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        provider: req.user.provider,
        emailVerified: req.user.emailVerified,
        profile: req.user.profile,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
        lastLogin: req.user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', verifyFirebaseToken, validateProfileUpdate, handleValidationErrors, async (req, res) => {
  try {
    const allowedUpdates = ['displayName', 'profile'];
    const updates = {};

    // Filter allowed updates
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'profile') {
          updates.profile = {
            ...req.user.profile,
            ...req.body.profile
          };
        } else {
          updates[field] = req.body[field];
        }
      }
    });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        photoURL: updatedUser.photoURL,
        provider: updatedUser.provider,
        emailVerified: updatedUser.emailVerified,
        profile: updatedUser.profile,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Delete user account
router.delete('/account', verifyFirebaseToken, async (req, res) => {
  try {
    // Delete from MongoDB
    await User.findByIdAndDelete(req.user._id);
    
    // Note: You might also want to delete the Firebase user
    // await admin.auth().deleteUser(req.firebaseUser.uid);
    
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Failed to delete account' });
  }
});

// Get user statistics (example of additional endpoint)
router.get('/stats', verifyFirebaseToken, async (req, res) => {
  try {
    const user = req.user;
    const accountAge = Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    res.json({
      stats: {
        accountAge: `${accountAge} days`,
        provider: user.provider,
        emailVerified: user.emailVerified,
        lastLogin: user.lastLogin,
        profileComplete: !!(user.profile?.bio && user.profile?.location)
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

module.exports = router;
