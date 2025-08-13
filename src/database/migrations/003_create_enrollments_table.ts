import pool from '../config';

export async function up(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending',
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP NULL,
        progress INTEGER DEFAULT 0,
        score INTEGER NULL,
        UNIQUE(user_id, course_id)
      );
    `);
    console.log('✅ Enrollments table created successfully');
  } catch (error) {
    console.error('❌ Error creating enrollments table:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function down(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS enrollments CASCADE;');
    console.log('✅ Enrollments table dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping enrollments table:', error);
    throw error;
  } finally {
    client.release();
  }
} 