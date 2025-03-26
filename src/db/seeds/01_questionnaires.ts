import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear the table before filling
  await knex('questionnaires').del();

  // Create test questionnaires
  const questionnaires = [
    {
      id: uuidv4(),
      title: 'Оценка удовлетворенности клиентов',
      description: 'Опрос для оценки качества обслуживания и удовлетворенности клиентов нашими услугами',
      status: 'published',
      time_limit: 10, // 10 minutes to complete
      questions_data: JSON.stringify([
        {
          id: uuidv4(),
          type: 'single',
          title: 'Как бы вы оценили качество нашего обслуживания?',
          description: 'Выберите один вариант, который лучше всего отражает ваше мнение',
          required: true,
          options: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо', 'Очень плохо'],
          order: 1
        },
        {
          id: uuidv4(),
          type: 'multiple',
          title: 'Какие аспекты нашего сервиса вам понравились больше всего?',
          description: 'Выберите все подходящие варианты',
          required: true,
          options: ['Скорость обслуживания', 'Качество продукта', 'Цена', 'Отзывчивость персонала', 'Удобство использования'],
          order: 2
        },
        {
          id: uuidv4(),
          type: 'text',
          title: 'Что мы могли бы улучшить в нашем сервисе?',
          description: 'Поделитесь своими идеями и предложениями',
          required: false,
          maxLength: 500,
          order: 3
        }
      ]),
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      completion_count: 24
    },
    {
      id: uuidv4(),
      title: 'Исследование рынка новых продуктов',
      description: 'Помогите нам понять ваши предпочтения для разработки новых продуктов',
      status: 'published',
      time_limit: 15, // 15 minutes to complete
      questions_data: JSON.stringify([
        {
          id: uuidv4(),
          type: 'single',
          title: 'Как часто вы пользуетесь нашими продуктами?',
          required: true,
          options: ['Ежедневно', 'Несколько раз в неделю', 'Раз в неделю', 'Несколько раз в месяц', 'Реже'],
          order: 1
        },
        {
          id: uuidv4(),
          type: 'multiple',
          title: 'Какие функции вы хотели бы видеть в новом продукте?',
          required: true,
          options: ['Интеграция с социальными сетями', 'Офлайн-режим', 'Синхронизация между устройствами', 'Расширенная аналитика', 'Персонализация'],
          order: 2
        },
        {
          id: uuidv4(),
          type: 'text',
          title: 'Опишите идеальный продукт для ваших нужд',
          required: false,
          maxLength: 1000,
          order: 3
        },
        {
          id: uuidv4(),
          type: 'single',
          title: 'Сколько вы готовы заплатить за такой продукт?',
          required: true,
          options: ['Менее 1000 руб', '1000-3000 руб', '3000-5000 руб', '5000-10000 руб', 'Более 10000 руб'],
          order: 4
        }
      ]),
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      completion_count: 42
    },
    {
      id: uuidv4(),
      title: 'Оценка работы команды',
      description: 'Внутренний опрос для оценки эффективности командной работы',
      status: 'draft',
      time_limit: null,
      questions_data: JSON.stringify([
        {
          id: uuidv4(),
          type: 'single',
          title: 'Насколько эффективно, по вашему мнению, работает ваша команда?',
          required: true,
          options: ['Очень эффективно', 'Эффективно', 'Средне', 'Неэффективно', 'Очень неэффективно'],
          order: 1
        },
        {
          id: uuidv4(),
          type: 'text',
          title: 'Какие факторы мешают эффективной работе команды?',
          required: true,
          maxLength: 500,
          order: 2
        },
        {
          id: uuidv4(),
          type: 'multiple',
          title: 'Какие аспекты командной работы нуждаются в улучшении?',
          required: true,
          options: ['Коммуникация', 'Распределение задач', 'Сроки выполнения', 'Качество результатов', 'Атмосфера в команде'],
          order: 3
        }
      ]),
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      completion_count: 0
    },
    {
      id: uuidv4(),
      title: 'Обратная связь по обучающему курсу',
      description: 'Помогите нам улучшить качество обучающих материалов',
      status: 'archived',
      time_limit: 5, // 5 minutes to complete
      questions_data: JSON.stringify([
        {
          id: uuidv4(),
          type: 'single',
          title: 'Как вы оцениваете полезность курса?',
          required: true,
          options: ['Очень полезно', 'Полезно', 'Средне', 'Не очень полезно', 'Бесполезно'],
          order: 1
        },
        {
          id: uuidv4(),
          type: 'single',
          title: 'Насколько материал был понятен?',
          required: true,
          options: ['Очень понятно', 'Понятно', 'Средне', 'Не очень понятно', 'Совсем непонятно'],
          order: 2
        },
        {
          id: uuidv4(),
          type: 'text',
          title: 'Какие темы вы хотели бы изучить в следующих курсах?',
          required: false,
          maxLength: 300,
          order: 3
        }
      ]),
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
      updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      completion_count: 156
    },
    {
      id: uuidv4(),
      title: 'Тестирование нового интерфейса',
      description: 'Оцените удобство использования нового пользовательского интерфейса',
      status: 'published',
      time_limit: 8, // 8 minutes to complete
      questions_data: JSON.stringify([
        {
          id: uuidv4(),
          type: 'single',
          title: 'Насколько интуитивно понятен новый интерфейс?',
          required: true,
          options: ['Очень понятен', 'Понятен', 'Средне', 'Не очень понятен', 'Совсем непонятен'],
          order: 1
        },
        {
          id: uuidv4(),
          type: 'multiple',
          title: 'Какие элементы интерфейса вызвали у вас затруднения?',
          required: false,
          options: ['Навигация', 'Кнопки действий', 'Формы ввода', 'Поиск', 'Фильтры', 'Уведомления'],
          order: 2
        },
        {
          id: uuidv4(),
          type: 'text',
          title: 'Ваши предложения по улучшению интерфейса',
          required: false,
          maxLength: 500,
          order: 3
        }
      ]),
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      completion_count: 18
    }
  ];

  // Insert data into the table
  await knex('questionnaires').insert(questionnaires);
}