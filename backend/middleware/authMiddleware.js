const jwt = require('jsonwebtoken');
const User = require('../models/User');
const inMemoryStore = require('../services/inMemoryStore');
const { isMongoActive } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login to access this resource.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'careercompass_super_secret_jwt_key_2026_student_guidance';
    const decoded = jwt.verify(token, secret);

    let user;
    if (isMongoActive()) {
      user = await User.findById(decoded.id).select('-password');
    } else {
      user = inMemoryStore.findUserById(decoded.id);
      if (user) {
        const { password, ...safeUser } = user;
        user = safeUser;
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.'
    });
  }
};

module.exports = {
  protect
};
