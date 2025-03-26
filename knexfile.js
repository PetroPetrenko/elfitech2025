import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  client: 'better-sqlite3',
  connection: {
    filename: path.join(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
    extension: 'ts',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds')
  },
  pool: {
    min: 2,
    max: 10
  },
  debug: process.env.NODE_ENV === 'development'
};