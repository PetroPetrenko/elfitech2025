#!/usr/bin/env node

// This script is designed to run TypeScript migrations and seeds
// Use dynamic import for ts-node
await import('ts-node').then(tsNode => {
  // Register ts-node for TypeScript support
  tsNode.register({
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
      target: 'es2020',
    },
  });
});

import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

async function seedDatabase() {
  try {
    // Run migrations
    console.log('Running migrations...');
    await db.migrate.latest();
    console.log('✓ Migrations successfully completed');

    // Run seeds
    console.log('\nFilling the database with test data...');
    await db.seed.run();
    console.log('✓ Test data successfully added');

    console.log('\nDatabase successfully initialized!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    // Close the database connection
    await db.destroy();
  }
}

// Run the database initialization function
seedDatabase();