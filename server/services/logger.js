const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(), // Adds color to the console output
    logFormat
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs errors to a file
    new transports.File({ filename: 'logs/combined.log' }) // Logs all messages to a file
  ],
});

module.exports = logger;
