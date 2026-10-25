const express = require('express');
const router = express.Router();
const { getActiveRoadmap, selectCareerRoadmap, updateTaskStatus } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getActiveRoadmap);
router.post('/select', selectCareerRoadmap);
router.put('/task', updateTaskStatus);

module.exports = router;
