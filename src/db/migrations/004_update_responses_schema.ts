import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('responses', (table) => {
    // Add a field for tracking time spent on completing the questionnaire
    table.integer('time_spent').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('responses', (table) => {
    table.dropColumn('time_spent');
  });
}