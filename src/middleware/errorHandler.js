import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  if (err.type === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details
    });
  }

  if (err.type === 'AuthenticationError') {
    return res.status(401).json({
      error: 'Authentication Error',
      message: err.message
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred'
      : err.message
  });
}