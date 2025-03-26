import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

async function testDatabaseConnection() {
  try {
    // Тест подключения
    await db.raw('SELECT 1');
    console.log('✓ Подключение к SQLite успешно установлено');

    // Тест создания временной таблицы
    await db.schema.createTable('test_table', (table) => {
      table.increments('id');
      table.string('name');
    });
    console.log('✓ Создание таблицы успешно');

    // Тест вставки данных
    await db('test_table').insert({ name: 'test' });
    console.log('✓ Вставка данных успешна');

    // Тест чтения данных
    const result = await db('test_table').select('*');
    console.log('✓ Чтение данных успешно:', result);

    // Удаление тестовой таблицы
    await db.schema.dropTable('test_table');
    console.log('✓ Удаление таблицы успешно');

    console.log('\nВсе тесты SQLite успешно пройдены!');
  } catch (error) {
    console.error('Ошибка при тестировании SQLite:', error);
  } finally {
    await db.destroy();
  }
}

testDatabaseConnection();