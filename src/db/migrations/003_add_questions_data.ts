import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questionnaires', (table) => {
    // Add a field for storing questions in JSON format
    table.json('questions_data');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questionnaires', (table) => {
    table.dropColumn('questions_data');
  });
}