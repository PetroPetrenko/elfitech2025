// Регистрируем ts-node для поддержки TypeScript
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
  },
});

const knex = require('knex');
const path = require('path');
const config = require('../knexfile.cjs');

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