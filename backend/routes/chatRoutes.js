const express = require('express');
const router = express.Router();
const { sendChatMessage, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { aiRateLimiter } = require('../middleware/rateLimitMiddleware');

router.use(protect);

router.post('/', aiRateLimiter, sendChatMessage);
router.get('/history', getChatHistory);

module.exports = router;
