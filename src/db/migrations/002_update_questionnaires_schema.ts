import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questionnaires', (table) => {
    // Change id type to string
    table.string('id').alter();
    
    // Add new fields
    table.integer('time_limit');
    table.integer('completion_count').defaultTo(0);
    table.float('average_time_to_complete');
    
    // Update existing fields
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questionnaires', (table) => {
    table.increments('id').alter();
    table.dropColumns('time_limit', 'completion_count', 'average_time_to_complete');
  });
}