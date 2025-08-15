import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      avatar: 'avatars/admin-avatar.jpg',
    },
    {
      name: 'Student User',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student',
      avatar: 'avatars/student-avatar.jpg',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'student',
      avatar: 'avatars/john-avatar.jpg',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'student',
      avatar: 'avatars/jane-avatar.jpg',
    },
  ]);
}
