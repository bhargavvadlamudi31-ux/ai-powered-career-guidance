const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const careerRoutes = require('./routes/careerRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const skillGapRoutes = require('./routes/skillGapRoutes');
const chatRoutes = require('./routes/chatRoutes');
const systemRoutes = require('./routes/systemRoutes');

const app = express();

// Initialize database connection
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy: Request from origin ' + origin + ' not permitted.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'CareerCompass AI Backend Service',
    status: 'Operational',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      assessment: '/api/assessment',
      careers: '/api/careers',
      roadmap: '/api/roadmap',
      skillGap: '/api/skill-gap',
      chat: '/api/chat',
      system: '/api/system/status'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/system', systemRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🧭 CareerCompass AI Backend API running on port ${PORT}`);
  console.log(`  🔗 Local URL: http://localhost:${PORT}`);
  console.log(`  🛡️ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});

// Handle unhandled promise rejections cleanly
process.on('unhandledRejection', (err) => {
  console.error(`[Process] Unhandled Rejection: ${err.message}`);
});

module.exports = app;
