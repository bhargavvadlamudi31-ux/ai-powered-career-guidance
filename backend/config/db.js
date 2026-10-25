const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Career = require('../models/Career');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const LearningRoadmap = require('../models/LearningRoadmap');
const { SEED_CAREERS } = require('../services/seedData');

let isMongoConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careercompass';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 3000
    });

    isMongoConnected = true;
    console.log(`[Database] MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`);

    // Seed careers and demo account in MongoDB if empty
    await seedDataIfEmpty();

    return conn;
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database] Notice: MongoDB server not reachable at "${mongoURI}".`);
    console.warn(`[Database] Reason: ${error.message}`);
    console.warn(`[Database] Seamlessly activating high-reliability In-Memory Database store with pre-seeded data.`);
    return null;
  }
};

const seedDataIfEmpty = async () => {
  try {
    // 1. Seed Careers
    const careerCount = await Career.countDocuments();
    if (careerCount === 0) {
      console.log('[Database] Seeding 12 career profiles into MongoDB...');
      await Career.insertMany(SEED_CAREERS);
      console.log('[Database] MongoDB career profiles seeded successfully.');
    }

    // 2. Seed Demo User
    const demoEmail = 'demo@careercompass.ai';
    let demoUser = await User.findOne({ email: demoEmail });
    if (!demoUser) {
      console.log('[Database] Seeding demo student account into MongoDB...');
      const hashedPassword = await bcrypt.hash('demo1234', 10);
      demoUser = await User.create({
        name: 'Alex Rivera',
        email: demoEmail,
        password: hashedPassword,
        role: 'student'
      });

      // Seed Student Profile
      await StudentProfile.create({
        user: demoUser._id,
        fullName: 'Alex Rivera',
        ageRange: '21-24',
        educationLevel: 'Undergraduate / Bachelor',
        degree: 'B.Tech Computer Science',
        currentYear: '3rd Year',
        gpa: '3.7 / 4.0',
        technicalSkills: ['JavaScript', 'HTML/CSS', 'Python', 'Git', 'SQL basics'],
        softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability'],
        interests: ['Web Development', 'Cloud Computing', 'Interactive UI Design'],
        favouriteSubjects: ['Data Structures', 'Database Systems', 'Software Engineering'],
        preferredWorkEnvironment: 'Hybrid',
        careerGoals: 'Become a high-impact Full-Stack Engineer and build scalable applications for modern startups.',
        preferredLearningStyle: 'Hands-on Projects & Building',
        locationPreference: 'Flexible / Hybrid Tech Hubs',
        budget: 'Free / Open Source Resources Only',
        completionPercentage: 90
      });

      // Seed initial active roadmap
      const fullStackCareer = await Career.findOne({ slug: 'full-stack-developer' }) || SEED_CAREERS[1];
      const initialSteps = (fullStackCareer.roadmapSteps || []).map((step, idx) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        duration: step.duration || '2-4 Weeks',
        requiredSkills: step.requiredSkills || [],
        tasks: (step.tasks || []).map((taskText, tIdx) => ({
          id: `step_${step.stepNumber}_task_${tIdx}`,
          text: taskText,
          completed: idx === 0 && tIdx < 2
        })),
        resources: step.resources || [],
        isCompleted: false
      }));

      await LearningRoadmap.create({
        user: demoUser._id,
        careerSlug: 'full-stack-developer',
        careerTitle: 'Full-Stack Developer',
        currentStep: 1,
        steps: initialSteps,
        progressPercentage: 11
      });

      console.log('[Database] Demo student account and roadmap seeded into MongoDB successfully.');
    }
  } catch (err) {
    console.error('[Database] Failed to seed initial data into MongoDB:', err.message);
  }
};

const getDBStatus = () => {
  return {
    isMongoConnected,
    mode: isMongoConnected ? 'mongodb' : 'in_memory_fallback',
    message: isMongoConnected
      ? 'Connected to MongoDB database'
      : 'Using in-memory database store (MongoDB server not active locally)'
  };
};

module.exports = {
  connectDB,
  getDBStatus,
  isMongoActive: () => isMongoConnected
};
