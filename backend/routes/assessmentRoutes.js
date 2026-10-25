const express = require('express');
const router = express.Router();
const { submitAssessment, getLatestAssessment } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', submitAssessment);
router.get('/latest', getLatestAssessment);

module.exports = router;
