const Career = require('../models/Career');
const StudentProfile = require('../models/StudentProfile');
const CareerAssessment = require('../models/CareerAssessment');
const inMemoryStore = require('../services/inMemoryStore');
const { SEED_CAREERS } = require('../services/seedData');
const { calculateRecommendations } = require('../services/recommendationEngine');
const { isMongoActive } = require('../config/db');

// @desc    Get all careers with optional query filters & search
// @route   GET /api/careers
// @access  Public
const getAllCareers = async (req, res, next) => {
  try {
    const { category, search, workStyle, education } = req.query;

    let careers;
    if (isMongoActive()) {
      careers = await Career.find();
      if (!careers || careers.length === 0) {
        careers = SEED_CAREERS;
      }
    } else {
      careers = inMemoryStore.getAllCareers();
    }

    let filtered = [...careers];

    // Search query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.requiredTechnicalSkills || []).some(s => s.toLowerCase().includes(q)) ||
        (c.affinityTags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(c => 
        c.categoryKey === category || 
        c.category.toLowerCase().replace(/[^a-z0-9]/g, '_') === category.toLowerCase()
      );
    }

    // Work style filter
    if (workStyle && workStyle !== 'all') {
      filtered = filtered.filter(c =>
        (c.workStyleSuitability || []).some(ws => ws.toLowerCase().includes(workStyle.toLowerCase()))
      );
    }

    // Education level filter
    if (education && education !== 'all') {
      filtered = filtered.filter(c =>
        (c.educationSuitability || []).some(ed => ed.toLowerCase().includes(education.toLowerCase()))
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      careers: filtered
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single career details by slug
// @route   GET /api/careers/:slug
// @access  Public
const getCareerBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    let career;
    if (isMongoActive()) {
      career = await Career.findOne({ slug });
    } else {
      career = inMemoryStore.getCareerBySlug(slug);
    }

    if (!career) {
      // Fallback search in seed data
      career = SEED_CAREERS.find(c => c.slug === slug);
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career with identifier "${slug}" not found in catalogue.`
      });
    }

    return res.status(200).json({
      success: true,
      career
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recommended careers for authenticated student
// @route   GET /api/recommendations
// @access  Private
const getStudentRecommendations = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    let profile;
    let latestAssessment;
    let allCareers = SEED_CAREERS;

    if (isMongoActive()) {
      profile = await StudentProfile.findOne({ user: userId });
      latestAssessment = await CareerAssessment.findOne({ user: userId }).sort({ createdAt: -1 });
      const dbCareers = await Career.find();
      if (dbCareers && dbCareers.length > 0) allCareers = dbCareers;
    } else {
      profile = inMemoryStore.findProfileByUserId(userId);
      latestAssessment = inMemoryStore.getLatestAssessment(userId);
      allCareers = inMemoryStore.getAllCareers();
    }

    // If assessment already has saved recommendations, return them
    if (latestAssessment && latestAssessment.recommendedCareers && latestAssessment.recommendedCareers.length > 0) {
      return res.status(200).json({
        success: true,
        source: 'saved_assessment',
        assessmentDate: latestAssessment.createdAt,
        dimensionScores: latestAssessment.dimensionScores,
        recommendations: latestAssessment.recommendedCareers
      });
    }

    // Otherwise calculate dynamically from profile
    const recommendations = calculateRecommendations(
      profile || {},
      {
        dimensionScores: {
          technical: 70,
          problemSolving: 75,
          creativity: 65,
          communication: 70,
          analytical: 75,
          leadership: 65
        }
      },
      allCareers
    );

    return res.status(200).json({
      success: true,
      source: 'profile_baseline',
      recommendations: recommendations.slice(0, 6)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCareers,
  getCareerBySlug,
  getStudentRecommendations
};
