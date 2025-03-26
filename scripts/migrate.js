import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

db.migrate.latest()
  .then(() => {
    console.log('Migrations completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error running migrations:', error);
    process.exit(1);
  });