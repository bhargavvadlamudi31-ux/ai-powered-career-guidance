const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authRateLimiter } = require('../middleware/rateLimitMiddleware');

router.post('/register', authRateLimiter, registerStudent);
router.post('/login', authRateLimiter, loginStudent);
router.get('/me', protect, getMe);

module.exports = router;
