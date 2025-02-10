const express = require('express');
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./services/logger');
const helmet = require('helmet');

const app = express();
const morganFormat = ":method :url :status :response-time ms";

app.use(cors());
app.use(express.json()); // For parsing application/json

// Morgan logging
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Dynamic rate limiter
const dynamicRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req, res) => {
    // Example: Custom rate limits based on roles or IP
    if (req.headers['x-api-key'] === 'admin-api-key') {
      return 1000; // Higher limit for admins
    } else if (req.headers['x-api-key'] === 'user-api-key') {
      return 500; // Medium limit for authenticated users
    }
    return 100; // Default limit for others
  },
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the dynamic rate limiter to all requests
app.use(dynamicRateLimiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);

// Security headers
app.use(helmet());

// Error handling middleware
app.use(errorHandler);

module.exports = app;
