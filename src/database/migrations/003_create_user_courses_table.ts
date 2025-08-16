import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_courses', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('course_id').unsigned().references('id').inTable('courses').onDelete('CASCADE');
    table.timestamp('enrolled_at').defaultTo(knex.fn.now());
    
    // Composite unique constraint
    table.unique(['user_id', 'course_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_courses');
}
