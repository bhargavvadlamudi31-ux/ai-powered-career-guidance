const mongoose = require('mongoose');

const careerAssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    dimensionScores: {
      technical: { type: Number, default: 0 },
      problemSolving: { type: Number, default: 0 },
      creativity: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      analytical: { type: Number, default: 0 },
      leadership: { type: Number, default: 0 }
    },
    recommendedCareers: [
      {
        slug: String,
        title: String,
        category: String,
        compatibilityScore: Number,
        whyMatch: String,
        matchedSkills: [String],
        missingSkills: [String],
        typicalRoles: [String],
        approxSalary: {
          entryLevel: String,
          experienced: String,
          disclaimer: String
        }
      }
    ],
    scoringBreakdown: {
      skillsWeight: { type: String, default: '40%' },
      interestsWeight: { type: String, default: '30%' },
      workStyleWeight: { type: String, default: '20%' },
      educationWeight: { type: String, default: '10%' }
    },
    transparencyNote: {
      type: String,
      default: 'Compatibility score is calculated transparently from self-reported interest alignment, technical aptitude indicators, work style preference, and educational context. It is not a clinical or psychological diagnosis.'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CareerAssessment', careerAssessmentSchema);
