const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    categoryKey: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    typicalRoles: {
      type: [String],
      default: []
    },
    approxSalary: {
      entryLevel: { type: String, default: '' },
      experienced: { type: String, default: '' },
      disclaimer: { type: String, default: '' }
    },
    requiredTechnicalSkills: {
      type: [String],
      default: []
    },
    requiredSoftSkills: {
      type: [String],
      default: []
    },
    educationSuitability: {
      type: [String],
      default: []
    },
    workStyleSuitability: {
      type: [String],
      default: []
    },
    affinityTags: {
      type: [String],
      default: []
    },
    beginnerProjects: [
      {
        title: String,
        description: String,
        difficulty: String,
        technologies: [String]
      }
    ],
    roadmapSteps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
        duration: String,
        requiredSkills: [String],
        tasks: [String],
        resources: [
          {
            name: String,
            url: String,
            type: { type: String }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Career', careerSchema);
