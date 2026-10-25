const express = require('express');
const router = express.Router();
const { getSkillGapAnalysis } = require('../controllers/skillGapController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/:careerSlug?', getSkillGapAnalysis);

module.exports = router;
