// Регистрируем ts-node для поддержки TypeScript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
  },
});

import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

async function seedDatabase() {
  try {
    // Запуск миграций
    console.log('Запуск миграций...');
    await db.migrate.latest();
    console.log('✓ Миграции успешно выполнены');

    // Запуск сидов
    console.log('\nЗаполнение базы данных тестовыми данными...');
    await db.seed.run();
    console.log('✓ Тестовые данные успешно добавлены');

    console.log('\nБаза данных успешно инициализирована!');
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
    process.exit(1);
  } finally {
    // Закрываем соединение с базой данных
    await db.destroy();
  }
}

// Запускаем функцию инициализации базы данных
seedDatabase();