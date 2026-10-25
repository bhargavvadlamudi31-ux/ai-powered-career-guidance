const LearningRoadmap = require('../models/LearningRoadmap');
const Career = require('../models/Career');
const inMemoryStore = require('../services/inMemoryStore');
const { SEED_CAREERS } = require('../services/seedData');
const { isMongoActive } = require('../config/db');

// @desc    Get active student learning roadmap
// @route   GET /api/roadmap
// @access  Private
const getActiveRoadmap = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    let roadmap;
    if (isMongoActive()) {
      roadmap = await LearningRoadmap.findOne({ user: userId }).sort({ updatedAt: -1 });
    } else {
      roadmap = inMemoryStore.findRoadmapByUserId(userId);
    }

    if (!roadmap) {
      // Auto-initialize default roadmap with Full-Stack Developer
      return await initializeRoadmapForCareer(userId, 'full-stack-developer', res);
    }

    return res.status(200).json({
      success: true,
      roadmap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Select a career and generate/regenerate personalized roadmap
// @route   POST /api/roadmap/select
// @access  Private
const selectCareerRoadmap = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { careerSlug } = req.body;

    if (!careerSlug) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid career slug to generate roadmap.'
      });
    }

    return await initializeRoadmapForCareer(userId, careerSlug, res);
  } catch (error) {
    next(error);
  }
};

// Helper to initialize or switch roadmap
const initializeRoadmapForCareer = async (userId, careerSlug, res) => {
  let career;
  if (isMongoActive()) {
    career = await Career.findOne({ slug: careerSlug });
  } else {
    career = inMemoryStore.getCareerBySlug(careerSlug);
  }

  if (!career) {
    career = SEED_CAREERS.find(c => c.slug === careerSlug) || SEED_CAREERS[0];
  }

  const steps = (career.roadmapSteps || []).map((step) => ({
    stepNumber: step.stepNumber,
    title: step.title,
    description: step.description,
    duration: step.duration || '2-4 Weeks',
    requiredSkills: step.requiredSkills || [],
    tasks: (step.tasks || []).map((taskText, idx) => ({
      id: `step_${step.stepNumber}_task_${idx}`,
      text: taskText,
      completed: false
    })),
    resources: step.resources || [],
    isCompleted: false
  }));

  const roadmapPayload = {
    user: userId,
    careerSlug: career.slug,
    careerTitle: career.title,
    currentStep: 1,
    steps,
    progressPercentage: 0
  };

  let savedRoadmap;
  if (isMongoActive()) {
    savedRoadmap = await LearningRoadmap.findOneAndUpdate(
      { user: userId },
      roadmapPayload,
      { new: true, upsert: true }
    );
  } else {
    savedRoadmap = inMemoryStore.saveRoadmap(userId, roadmapPayload);
  }

  return res.status(200).json({
    success: true,
    message: `Active roadmap generated for ${career.title}!`,
    roadmap: savedRoadmap
  });
};

// @desc    Toggle/update completion status of a specific roadmap task
// @route   PUT /api/roadmap/task
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { taskId, completed } = req.body;

    if (!taskId || completed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide taskId and completed boolean status.'
      });
    }

    let updatedRoadmap;
    if (isMongoActive()) {
      const roadmap = await LearningRoadmap.findOne({ user: userId });
      if (!roadmap) {
        return res.status(404).json({
          success: false,
          message: 'Active roadmap not found.'
        });
      }

      let found = false;
      for (const step of roadmap.steps) {
        const task = step.tasks ? step.tasks.find(t => t.id === taskId) : null;
        if (task) {
          task.completed = completed;
          found = true;
          break;
        }
      }

      if (!found) {
        return res.status(404).json({
          success: false,
          message: `Task with ID "${taskId}" not found in current roadmap.`
        });
      }

      roadmap.recalculateProgress();
      await roadmap.save();
      updatedRoadmap = roadmap;
    } else {
      updatedRoadmap = inMemoryStore.updateRoadmapTask(userId, taskId, completed);
      if (!updatedRoadmap) {
        return res.status(404).json({
          success: false,
          message: 'Active roadmap or task not found.'
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully!',
      progressPercentage: updatedRoadmap.progressPercentage,
      roadmap: updatedRoadmap
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActiveRoadmap,
  selectCareerRoadmap,
  updateTaskStatus
};
