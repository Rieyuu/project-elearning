import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del();

  // Inserts seed entries
  await knex('courses').insert([
    {
      title: 'Introduction to JavaScript',
      slug: 'introduction-to-javascript',
      description: 'Learn the basics of JavaScript programming language. This course covers variables, functions, objects, and modern ES6+ features.',
      image: 'courses/javascript-intro.jpg',
    },
    {
      title: 'Advanced React Development',
      slug: 'advanced-react-development',
      description: 'Master React with advanced concepts including hooks, context, performance optimization, and testing.',
      image: 'courses/react-advanced.jpg',
    },
    {
      title: 'Node.js Backend Development',
      slug: 'nodejs-backend-development',
      description: 'Build scalable backend applications with Node.js, Express, and modern JavaScript practices.',
      image: 'courses/nodejs-backend.jpg',
    },
    {
      title: 'Database Design & SQL',
      slug: 'database-design-sql',
      description: 'Learn database design principles, SQL queries, and database optimization techniques.',
      image: 'courses/database-design.jpg',
    },
    {
      title: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      description: 'Complete web development course covering frontend, backend, and deployment strategies.',
      image: 'courses/full-stack.jpg',
    },
  ]);
}
