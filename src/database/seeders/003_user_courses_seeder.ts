import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_courses').del();

  // Inserts seed entries - enrollments
  await knex('user_courses').insert([
    {
      user_id: 2, // Student User
      course_id: 1, // Introduction to JavaScript
    },
    {
      user_id: 2, // Student User
      course_id: 2, // Advanced React Development
    },
    {
      user_id: 3, // John Doe
      course_id: 1, // Introduction to JavaScript
    },
    {
      user_id: 3, // John Doe
      course_id: 3, // Node.js Backend Development
    },
    {
      user_id: 4, // Jane Smith
      course_id: 2, // Advanced React Development
    },
    {
      user_id: 4, // Jane Smith
      course_id: 4, // Database Design & SQL
    },
    {
      user_id: 4, // Jane Smith
      course_id: 5, // Full Stack Web Development
    },
  ]);
}
