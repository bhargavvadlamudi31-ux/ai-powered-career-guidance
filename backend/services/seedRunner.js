// Standalone Seed Runner script for CareerCompass AI
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Career = require('../models/Career');
const { SEED_CAREERS } = require('./seedData');

const runSeed = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careercompass';
  console.log(`Connecting to MongoDB at ${mongoURI}...`);

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB.');

    console.log('Clearing old career data...');
    await Career.deleteMany({});

    console.log(`Inserting ${SEED_CAREERS.length} career records...`);
    await Career.insertMany(SEED_CAREERS);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

runSeed();
