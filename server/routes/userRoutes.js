const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware'); // Ensure user is authenticated
const router = express.Router();

// Get User Profile
router.get('/profile', authMiddleware, getUserProfile);

// Update User Profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
