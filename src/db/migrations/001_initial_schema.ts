import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create questionnaires table
  await knex.schema.createTable('questionnaires', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.enu('status', ['draft', 'published', 'archived']).defaultTo('draft');
    table.index(['status', 'created_at']);
  });

  // Create questions table
  await knex.schema.createTable('questions', (table) => {
    table.increments('id').primary();
    table.integer('questionnaire_id').unsigned().notNullable();
    table.text('question_text').notNullable();
    table.enu('question_type', ['text', 'single', 'multiple', 'image']).notNullable();
    table.json('options');
    table.boolean('required').defaultTo(true);
    table.integer('order').notNullable();
    table.foreign('questionnaire_id')
      .references('id')
      .inTable('questionnaires')
      .onDelete('CASCADE');
    table.index(['questionnaire_id', 'order']);
  });

  // Create responses table
  await knex.schema.createTable('responses', (table) => {
    table.increments('id').primary();
    table.integer('questionnaire_id').unsigned().notNullable();
    table.string('respondent_id').notNullable();
    table.timestamp('started_at').defaultTo(knex.fn.now());
    table.timestamp('completed_at');
    table.json('answers');
    table.foreign('questionnaire_id')
      .references('id')
      .inTable('questionnaires')
      .onDelete('CASCADE');
    table.index(['questionnaire_id', 'respondent_id']);
    table.index(['started_at', 'completed_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('responses');
  await knex.schema.dropTable('questions');
  await knex.schema.dropTable('questionnaires');
}