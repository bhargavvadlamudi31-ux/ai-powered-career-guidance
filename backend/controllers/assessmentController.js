const CareerAssessment = require('../models/CareerAssessment');
const StudentProfile = require('../models/StudentProfile');
const Career = require('../models/Career');
const LearningRoadmap = require('../models/LearningRoadmap');
const inMemoryStore = require('../services/inMemoryStore');
const { calculateRecommendations } = require('../services/recommendationEngine');
const { SEED_CAREERS } = require('../services/seedData');
const { isMongoActive } = require('../config/db');

// @desc    Submit new career assessment questionnaire
// @route   POST /api/assessment
// @access  Private
const submitAssessment = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid assessment questionnaire answers.'
      });
    }

    // Compute transparent dimension scores (0-100 scale) based on multi-step responses
    const dimensionScores = {
      technical: Math.min(100, Math.max(25, Number(answers.technicalRating || answers.technical || 65))),
      problemSolving: Math.min(100, Math.max(25, Number(answers.problemSolvingRating || answers.problemSolving || 70))),
      creativity: Math.min(100, Math.max(25, Number(answers.creativityRating || answers.creativity || 60))),
      communication: Math.min(100, Math.max(25, Number(answers.communicationRating || answers.communication || 65))),
      analytical: Math.min(100, Math.max(25, Number(answers.analyticalRating || answers.analytical || 70))),
      leadership: Math.min(100, Math.max(25, Number(answers.leadershipRating || answers.leadership || 60)))
    };

    // Retrieve student profile for comprehensive recommendation matching
    let profile;
    let allCareers = SEED_CAREERS;

    if (isMongoActive()) {
      profile = await StudentProfile.findOne({ user: userId });
      const dbCareers = await Career.find();
      if (dbCareers && dbCareers.length > 0) {
        allCareers = dbCareers;
      }
    } else {
      profile = inMemoryStore.findProfileByUserId(userId);
      allCareers = inMemoryStore.getAllCareers();
    }

    // Merge answers into profile if new skills or preferences were specified in assessment
    if (answers.selectedInterests && Array.isArray(answers.selectedInterests) && profile) {
      const mergedInterests = Array.from(new Set([...(profile.interests || []), ...answers.selectedInterests]));
      profile.interests = mergedInterests;
    }

    // Calculate transparent career recommendations
    const recommendations = calculateRecommendations(
      profile || {},
      { dimensionScores, answers },
      allCareers
    );

    const assessmentPayload = {
      user: userId,
      answers,
      dimensionScores,
      recommendedCareers: recommendations.slice(0, 8), // top 8 recommendations
      scoringBreakdown: {
        skillsWeight: '35% (Skill overlap & prerequisite match)',
        interestsWeight: '30% (Aptitude & assessment dimension alignment)',
        workStyleWeight: '20% (Affinity tags & activity preferences)',
        educationWeight: '15% (Workplace style & academic context)'
      },
      transparencyNote: 'Compatibility score is calculated transparently from self-reported interest alignment, technical aptitude indicators, work style preference, and educational context. It is not a clinical or psychological diagnosis.'
    };

    let savedAssessment;
    if (isMongoActive()) {
      savedAssessment = await CareerAssessment.create(assessmentPayload);
    } else {
      savedAssessment = inMemoryStore.saveAssessment(userId, assessmentPayload);
    }

    // If student doesn't have an active roadmap yet, initialize one for their top-matched career!
    const topCareer = recommendations[0];
    if (topCareer) {
      if (isMongoActive()) {
        const existingRoadmap = await LearningRoadmap.findOne({ user: userId });
        if (!existingRoadmap) {
          const steps = (topCareer.roadmapSteps || []).map((step) => ({
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description,
            duration: step.duration,
            requiredSkills: step.requiredSkills,
            tasks: (step.tasks || []).map((taskText, idx) => ({
              id: `step_${step.stepNumber}_task_${idx}`,
              text: taskText,
              completed: false
            })),
            resources: step.resources || [],
            isCompleted: false
          }));

          await LearningRoadmap.create({
            user: userId,
            careerSlug: topCareer.slug,
            careerTitle: topCareer.title,
            currentStep: 1,
            steps,
            progressPercentage: 0
          });
        }
      } else {
        const existingRoadmap = inMemoryStore.findRoadmapByUserId(userId);
        if (!existingRoadmap) {
          const steps = (topCareer.roadmapSteps || []).map((step) => ({
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description,
            duration: step.duration,
            requiredSkills: step.requiredSkills,
            tasks: (step.tasks || []).map((taskText, idx) => ({
              id: `step_${step.stepNumber}_task_${idx}`,
              text: taskText,
              completed: false
            })),
            resources: step.resources || [],
            isCompleted: false
          }));

          inMemoryStore.saveRoadmap(userId, {
            careerSlug: topCareer.slug,
            careerTitle: topCareer.title,
            currentStep: 1,
            steps,
            progressPercentage: 0
          });
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Assessment completed successfully! Career recommendations updated.',
      assessment: savedAssessment,
      topCareers: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get latest assessment result
// @route   GET /api/assessment/latest
// @access  Private
const getLatestAssessment = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    let assessment;
    if (isMongoActive()) {
      assessment = await CareerAssessment.findOne({ user: userId }).sort({ createdAt: -1 });
    } else {
      assessment = inMemoryStore.getLatestAssessment(userId);
    }

    if (!assessment) {
      return res.status(200).json({
        success: true,
        hasAssessment: false,
        message: 'No career assessment on file. Start your first assessment anytime!'
      });
    }

    return res.status(200).json({
      success: true,
      hasAssessment: true,
      assessment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitAssessment,
  getLatestAssessment
};
