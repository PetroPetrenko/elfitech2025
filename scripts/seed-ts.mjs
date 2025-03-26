#!/usr/bin/env node

// Этот скрипт предназначен для запуска миграций и сидов TypeScript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { existsSync } from 'fs';

// Получаем текущую директорию скрипта
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

// Путь к JavaScript-обертке для TypeScript файла
const seedDbImplPath = join(__dirname, 'seed-db-impl.js');

// Проверяем, существует ли файл
if (!existsSync(seedDbImplPath)) {
  console.error(`Ошибка: Файл ${seedDbImplPath} не найден`);
  process.exit(1);
}

// Запускаем JavaScript-обертку, которая загрузит TypeScript файл
console.log(`Запуск ${seedDbImplPath}...`);

// Запускаем JavaScript-обертку напрямую через Node.js
const nodeProcess = spawn('node', [seedDbImplPath], {
  stdio: 'inherit',
  shell: true
});

// Обрабатываем завершение процесса
nodeProcess.on('close', (code) => {
  if (code === 0) {
    console.log('Скрипт успешно выполнен!');
  } else {
    console.error(`Скрипт завершился с кодом ошибки: ${code}`);
    process.exit(code);
  }
});

// Обрабатываем ошибки
nodeProcess.on('error', (err) => {
  console.error('Ошибка при выполнении скрипта:', err);
  process.exit(1);
});