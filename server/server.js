// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Initialize Express app
const app = express();

// Security middleware - adds various HTTP headers for security
app.use(helmet());

// Enable CORS for cross-origin requests from our frontend
// Support multiple origins: production, preview, and localhost
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['https://task-manageri.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Compress responses for better performance
app.use(compression());

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging - different formats for development vs production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); // detailed logs for production
} else {
  app.use(morgan('dev')); // colorful, concise logs for development
}

// Rate limiting to prevent abuse - 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // exit if we can't connect to database
});

// Root endpoint - welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Task Manager API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
      tasks: '/api/tasks',
      users: '/api/users'
    },
    documentation: 'Visit /api for API status or /health for health check'
  });
});

// Health check endpoint - useful for monitoring services
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  res.status(200).json(healthCheck);
});

// API status endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MERN Deployment API',
    version: '1.0.0',
    status: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Import routes
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

// Register API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// 404 handler - catches requests to undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't leak error details in production
  const errorResponse = {
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };
  
  res.status(err.status || 500).json(errorResponse);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;
