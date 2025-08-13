import pool from '../config';

export async function up(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        instructor VARCHAR(255) NOT NULL,
        duration INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Courses table created successfully');
  } catch (error) {
    console.error('❌ Error creating courses table:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function down(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS courses CASCADE;');
    console.log('✅ Courses table dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping courses table:', error);
    throw error;
  } finally {
    client.release();
  }
} 