const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'Resource' }
});

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, default: '2-4 Weeks' },
  requiredSkills: [String],
  tasks: [taskSchema],
  resources: [resourceSchema],
  isCompleted: { type: Boolean, default: false }
});

const learningRoadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    careerSlug: {
      type: String,
      required: true
    },
    careerTitle: {
      type: String,
      required: true
    },
    currentStep: {
      type: Number,
      default: 1
    },
    steps: [stepSchema],
    progressPercentage: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

learningRoadmapSchema.methods.recalculateProgress = function () {
  let totalTasks = 0;
  let completedTasks = 0;

  this.steps.forEach(step => {
    let stepCompleted = true;
    if (step.tasks && step.tasks.length > 0) {
      step.tasks.forEach(t => {
        totalTasks++;
        if (t.completed) {
          completedTasks++;
        } else {
          stepCompleted = false;
        }
      });
    } else {
      totalTasks++;
      if (step.isCompleted) completedTasks++;
      else stepCompleted = false;
    }
    step.isCompleted = stepCompleted;
  });

  this.progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return this.progressPercentage;
};

module.exports = mongoose.model('LearningRoadmap', learningRoadmapSchema);
