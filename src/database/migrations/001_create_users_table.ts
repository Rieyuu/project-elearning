import pool from '../config';

export async function up(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        tanggal_lahir DATE NOT NULL,
        sudah_lulus BOOLEAN DEFAULT FALSE,
        skor_keseluruhan INTEGER DEFAULT 0,
        role VARCHAR(50) DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created successfully');
  } catch (error) {
    console.error('❌ Error creating users table:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function down(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('✅ Users table dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping users table:', error);
    throw error;
  } finally {
    client.release();
  }
} 