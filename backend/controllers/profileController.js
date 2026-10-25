const StudentProfile = require('../models/StudentProfile');
const inMemoryStore = require('../services/inMemoryStore');
const { isMongoActive } = require('../config/db');

// @desc    Get student profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    let profile;
    if (isMongoActive()) {
      profile = await StudentProfile.findOne({ user: userId });
      if (!profile) {
        profile = await StudentProfile.create({
          user: userId,
          fullName: req.user.name || '',
          completionPercentage: 15
        });
      }
    } else {
      profile = inMemoryStore.findProfileByUserId(userId);
      if (!profile) {
        profile = inMemoryStore.saveProfile(userId, {
          fullName: req.user.name || '',
          completionPercentage: 15
        });
      }
    }

    return res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const {
      fullName,
      ageRange,
      educationLevel,
      degree,
      currentYear,
      gpa,
      technicalSkills,
      softSkills,
      interests,
      favouriteSubjects,
      preferredWorkEnvironment,
      careerGoals,
      preferredLearningStyle,
      locationPreference,
      budget
    } = req.body;

    // Sanitize arrays if strings were sent
    const parseArray = (arr) => {
      if (Array.isArray(arr)) return arr.filter(Boolean);
      if (typeof arr === 'string') return arr.split(',').map(s => s.trim()).filter(Boolean);
      return [];
    };

    const updateData = {
      fullName: fullName !== undefined ? fullName.trim() : undefined,
      ageRange,
      educationLevel,
      degree: degree !== undefined ? degree.trim() : undefined,
      currentYear,
      gpa: gpa !== undefined ? gpa.trim() : undefined,
      technicalSkills: parseArray(technicalSkills),
      softSkills: parseArray(softSkills),
      interests: parseArray(interests),
      favouriteSubjects: parseArray(favouriteSubjects),
      preferredWorkEnvironment,
      careerGoals: careerGoals !== undefined ? careerGoals.trim() : undefined,
      preferredLearningStyle,
      locationPreference: locationPreference !== undefined ? locationPreference.trim() : undefined,
      budget
    };

    // Remove undefined keys
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    let updatedProfile;
    if (isMongoActive()) {
      let profile = await StudentProfile.findOne({ user: userId });
      if (!profile) {
        profile = new StudentProfile({ user: userId });
      }

      Object.assign(profile, updateData);
      profile.calculateCompletion();
      await profile.save();
      updatedProfile = profile;
    } else {
      updatedProfile = inMemoryStore.saveProfile(userId, updateData);
    }

    return res.status(200).json({
      success: true,
      message: 'Student profile updated successfully!',
      profile: updatedProfile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};
