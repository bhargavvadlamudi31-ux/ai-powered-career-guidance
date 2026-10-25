// In-memory data store providing 100% operational fallback when MongoDB daemon is not running
const bcrypt = require('bcryptjs');
const { SEED_CAREERS } = require('./seedData');

class InMemoryStore {
  constructor() {
    this.users = [];
    this.profiles = [];
    this.assessments = [];
    this.careers = [];
    this.roadmaps = [];
    this.chats = [];
    this.nextId = 1;

    this.initDefaultData();
  }

  generateId() {
    return 'mem_' + (this.nextId++) + '_' + Math.random().toString(36).substr(2, 9);
  }

  initDefaultData() {
    // Seed careers
    this.careers = SEED_CAREERS.map((c, idx) => ({
      ...c,
      _id: 'career_' + (idx + 1)
    }));

    // Seed a demo user for quick testing
    const demoPasswordHash = bcrypt.hashSync('demo1234', 10);
    const demoUser = {
      _id: 'user_demo_1',
      name: 'Alex Rivera',
      email: 'demo@careercompass.ai',
      password: demoPasswordHash,
      role: 'student',
      createdAt: new Date()
    };
    this.users.push(demoUser);

    // Seed demo student profile
    const demoProfile = {
      _id: 'profile_demo_1',
      user: 'user_demo_1',
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
      completionPercentage: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.profiles.push(demoProfile);

    // Seed a default active roadmap for demo student (Full-Stack Developer)
    const fullStackCareer = this.careers.find(c => c.slug === 'full-stack-developer') || this.careers[0];
    const initialSteps = fullStackCareer.roadmapSteps.map((step, idx) => ({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      duration: step.duration,
      requiredSkills: step.requiredSkills,
      tasks: step.tasks.map((taskText, tIdx) => ({
        id: `step_${step.stepNumber}_task_${tIdx}`,
        text: taskText,
        // Mark first two tasks completed for demo realistic feel
        completed: idx === 0 && tIdx < 2
      })),
      resources: step.resources,
      isCompleted: false
    }));

    const demoRoadmap = {
      _id: 'roadmap_demo_1',
      user: 'user_demo_1',
      careerSlug: fullStackCareer.slug,
      careerTitle: fullStackCareer.title,
      currentStep: 1,
      steps: initialSteps,
      progressPercentage: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.roadmaps.push(demoRoadmap);
  }

  // User operations
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findUserById(id) {
    return this.users.find(u => u._id === id.toString()) || null;
  }

  createUser(userData) {
    const user = {
      _id: this.generateId(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || 'student',
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  // Profile operations
  findProfileByUserId(userId) {
    return this.profiles.find(p => p.user.toString() === userId.toString()) || null;
  }

  saveProfile(userId, profileData) {
    let profile = this.findProfileByUserId(userId);
    if (!profile) {
      profile = {
        _id: this.generateId(),
        user: userId.toString(),
        createdAt: new Date()
      };
      this.profiles.push(profile);
    }

    Object.assign(profile, profileData, { updatedAt: new Date() });

    // Recalculate completion
    const fields = [
      profile.fullName,
      profile.educationLevel,
      profile.degree,
      profile.currentYear,
      profile.technicalSkills && profile.technicalSkills.length > 0,
      profile.softSkills && profile.softSkills.length > 0,
      profile.interests && profile.interests.length > 0,
      profile.preferredWorkEnvironment,
      profile.careerGoals,
      profile.preferredLearningStyle
    ];
    const completedCount = fields.filter(Boolean).length;
    profile.completionPercentage = Math.round((completedCount / fields.length) * 100);

    return profile;
  }

  // Careers operations
  getAllCareers() {
    return this.careers;
  }

  getCareerBySlug(slug) {
    return this.careers.find(c => c.slug === slug) || null;
  }

  // Assessment operations
  saveAssessment(userId, assessmentData) {
    const assessment = {
      _id: this.generateId(),
      user: userId.toString(),
      ...assessmentData,
      createdAt: new Date()
    };
    this.assessments.push(assessment);
    return assessment;
  }

  getLatestAssessment(userId) {
    const userAssessments = this.assessments.filter(a => a.user.toString() === userId.toString());
    if (userAssessments.length === 0) return null;
    return userAssessments[userAssessments.length - 1];
  }

  // Roadmap operations
  findRoadmapByUserId(userId) {
    const userRoadmaps = this.roadmaps.filter(r => r.user.toString() === userId.toString());
    if (userRoadmaps.length === 0) return null;
    return userRoadmaps[userRoadmaps.length - 1];
  }

  saveRoadmap(userId, roadmapData) {
    let roadmap = this.findRoadmapByUserId(userId);
    if (!roadmap || roadmap.careerSlug !== roadmapData.careerSlug) {
      roadmap = {
        _id: this.generateId(),
        user: userId.toString(),
        createdAt: new Date()
      };
      this.roadmaps.push(roadmap);
    }

    Object.assign(roadmap, roadmapData, { updatedAt: new Date() });
    this.recalculateRoadmapProgress(roadmap);
    return roadmap;
  }

  updateRoadmapTask(userId, taskId, completed) {
    const roadmap = this.findRoadmapByUserId(userId);
    if (!roadmap) return null;

    let found = false;
    for (const step of roadmap.steps) {
      const task = step.tasks ? step.tasks.find(t => t.id === taskId) : null;
      if (task) {
        task.completed = completed;
        found = true;
        break;
      }
    }

    if (found) {
      this.recalculateRoadmapProgress(roadmap);
      roadmap.updatedAt = new Date();
    }
    return roadmap;
  }

  recalculateRoadmapProgress(roadmap) {
    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.steps.forEach(step => {
      let stepDone = true;
      if (step.tasks && step.tasks.length > 0) {
        step.tasks.forEach(t => {
          totalTasks++;
          if (t.completed) completedTasks++;
          else stepDone = false;
        });
      } else {
        totalTasks++;
        if (step.isCompleted) completedTasks++;
        else stepDone = false;
      }
      step.isCompleted = stepDone;
    });

    roadmap.progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    return roadmap.progressPercentage;
  }

  // Chat operations
  findChatByUserId(userId) {
    return this.chats.find(c => c.user.toString() === userId.toString()) || null;
  }

  saveChatMessage(userId, message) {
    let chat = this.findChatByUserId(userId);
    if (!chat) {
      chat = {
        _id: this.generateId(),
        user: userId.toString(),
        messages: [],
        createdAt: new Date()
      };
      this.chats.push(chat);
    }
    chat.messages.push({
      ...message,
      timestamp: new Date()
    });
    chat.updatedAt = new Date();
    return chat;
  }
}

const memoryStore = new InMemoryStore();

module.exports = memoryStore;
