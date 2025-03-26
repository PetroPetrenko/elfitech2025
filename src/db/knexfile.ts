import { Knex } from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: path.join(__dirname, '../../database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    extension: 'ts'
  },
  pool: {
    min: 2,
    max: 10
  }
};

export default config;