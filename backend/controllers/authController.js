const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const inMemoryStore = require('../services/inMemoryStore');
const { isMongoActive } = require('../config/db');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'careercompass_super_secret_jwt_key_2026_student_guidance';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const registerStudent = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email address, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isMongoActive()) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'student'
      });

      // Create initial blank student profile
      await StudentProfile.create({
        user: user._id,
        fullName: user.name,
        completionPercentage: 15
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to CareerCompass AI.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // In-Memory store fallback
      const userExists = inMemoryStore.findUserByEmail(normalizedEmail);
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = inMemoryStore.createUser({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'student'
      });

      inMemoryStore.saveProfile(newUser._id, {
        fullName: newUser.name,
        completionPercentage: 15
      });

      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to CareerCompass AI.',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate student & get token
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user;
    if (isMongoActive()) {
      user = await User.findOne({ email: normalizedEmail });
    } else {
      user = inMemoryStore.findUserByEmail(normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password. Please verify your credentials.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password. Please verify your credentials.'
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current student profile info
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getMe
};
