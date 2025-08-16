import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('courses', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('slug').unique().notNullable();
    table.text('description');
    table.string('image');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('courses');
} 