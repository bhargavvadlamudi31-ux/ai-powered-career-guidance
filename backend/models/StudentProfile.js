const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      trim: true,
      default: ''
    },
    ageRange: {
      type: String,
      enum: ['Under 18', '18-20', '21-24', '25-29', '30+', ''],
      default: ''
    },
    educationLevel: {
      type: String,
      enum: ['High School', 'Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma', 'Doctorate / PhD', 'Self-Taught', ''],
      default: ''
    },
    degree: {
      type: String,
      trim: true,
      default: ''
    },
    currentYear: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Recent Graduate', 'Working Professional Exploring Career Change', ''],
      default: ''
    },
    gpa: {
      type: String,
      trim: true,
      default: ''
    },
    technicalSkills: {
      type: [String],
      default: []
    },
    softSkills: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    favouriteSubjects: {
      type: [String],
      default: []
    },
    preferredWorkEnvironment: {
      type: String,
      enum: ['Remote', 'Hybrid', 'Office', 'Startup Environment', 'Enterprise / Corporate', 'Freelance / Contract', ''],
      default: ''
    },
    careerGoals: {
      type: String,
      trim: true,
      default: ''
    },
    preferredLearningStyle: {
      type: String,
      enum: ['Hands-on Projects & Building', 'Structured Video Courses', 'Reading Documentation & Books', 'Mentorship & Peer Study', 'Fast-Paced Bootcamps', ''],
      default: ''
    },
    locationPreference: {
      type: String,
      trim: true,
      default: ''
    },
    budget: {
      type: String,
      enum: ['Free / Open Source Resources Only', 'Modest ($10 - $50 / month)', 'Flexible / Premium Courses OK', ''],
      default: ''
    },
    completionPercentage: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

studentProfileSchema.methods.calculateCompletion = function () {
  const fields = [
    this.fullName,
    this.educationLevel,
    this.degree,
    this.currentYear,
    this.technicalSkills && this.technicalSkills.length > 0,
    this.softSkills && this.softSkills.length > 0,
    this.interests && this.interests.length > 0,
    this.preferredWorkEnvironment,
    this.careerGoals,
    this.preferredLearningStyle
  ];
  const completedCount = fields.filter(Boolean).length;
  this.completionPercentage = Math.round((completedCount / fields.length) * 100);
  return this.completionPercentage;
};

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
