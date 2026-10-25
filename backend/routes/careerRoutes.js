const express = require('express');
const router = express.Router();
const { getAllCareers, getCareerBySlug, getStudentRecommendations } = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllCareers);
router.get('/recommendations', protect, getStudentRecommendations);
router.get('/:slug', getCareerBySlug);

module.exports = router;
