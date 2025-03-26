#!/usr/bin/env node

// Этот скрипт предназначен для запуска миграций TypeScript
import { register } from 'ts-node/esm';

// Регистрируем ts-node для поддержки TypeScript
register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
  },
});

import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

async function runMigrations() {
  try {
    console.log('Запуск миграций...');
    await db.migrate.latest();
    console.log('✓ Миграции успешно выполнены');
  } catch (error) {
    console.error('Ошибка при выполнении миграций:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

runMigrations();