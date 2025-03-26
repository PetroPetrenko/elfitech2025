import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('questionnaires', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.integer('time_limit');
    table.string('status').defaultTo('draft');
    table.json('questions_data').defaultTo('[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('completion_count').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('questionnaires');
}