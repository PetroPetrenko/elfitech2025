import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('questionnaires', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.integer('time_limit');
    table.enu('status', ['draft', 'published', 'archived']).defaultTo('draft');
    table.jsonb('questions_data').defaultTo('[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('completion_count').defaultTo(0);

    // Индексы для оптимизации поиска и сортировки
    table.index(['status']);
    table.index(['created_at']);
    table.index(['updated_at']);
    table.index(['title']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('questionnaires');
}