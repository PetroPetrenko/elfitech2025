// This file contains the implementation of functions for working with the database
import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

// Import knex configuration
import { default as config } from '../knexfile.js';

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