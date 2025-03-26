import knex from 'knex';
import config from './knexfile';
import { logger } from '../utils/logger';

// Debug: Log database configuration
console.log('Database configuration:', {
  client: config.client,
  connection: typeof config.connection === 'string' 
    ? config.connection 
    : { ...config.connection, password: '[REDACTED]' }
});

export const db = knex(config);

// Verify database connection
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection test successful');
    logger.info('Database connection established successfully');
  })
  .catch((error) => {
    console.error('Database connection test failed:', error);
    logger.error('Database connection failed', { error });
    process.exit(1);
  });

// Add error event handler
db.on('error', (error) => {
  console.error('Database error:', error);
  logger.error('Database error event', { error });
});

// Debug: Add query logging in development
if (process.env.NODE_ENV === 'development') {
  db.on('query', (query) => {
    console.log('SQL Query:', {
      sql: query.sql,
      bindings: query.bindings,
      queryTime: query.__knexQueryUid
    });
    logger.debug('SQL Query executed', {
      sql: query.sql,
      bindings: query.bindings
    });
  });
}

export default db;