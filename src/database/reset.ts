import pool from './config';

async function resetDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🗑️  Resetting database...');
    
    // Drop all tables in reverse order (due to foreign key constraints)
    await client.query('DROP TABLE IF EXISTS enrollments CASCADE;');
    console.log('✅ Enrollments table dropped');
    
    await client.query('DROP TABLE IF EXISTS courses CASCADE;');
    console.log('✅ Courses table dropped');
    
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('✅ Users table dropped');
    
    await client.query('DROP TABLE IF EXISTS migrations CASCADE;');
    console.log('✅ Migrations table dropped');
    
    console.log('🎉 Database reset completed successfully!');
    console.log('💡 Run "npm run db:migrate" to recreate tables');
    console.log('💡 Run "npm run db:seed" to populate with sample data');
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run reset if this file is executed directly
if (require.main === module) {
  resetDatabase();
} 