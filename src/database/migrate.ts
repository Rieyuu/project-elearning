import pool from './config';
import migrations from './migrations';

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('🚀 Starting migrations...\n');

    for (const migration of migrations) {
      // Check if migration already executed
      const result = await client.query(
        'SELECT id FROM migrations WHERE name = $1',
        [migration.name]
      );

      if (result.rows.length === 0) {
        console.log(`📝 Running migration: ${migration.name}`);
        
        // Run migration
        await migration.up();
        
        // Record migration as executed
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [migration.name]
        );
        
        console.log(`✅ Migration ${migration.name} completed\n`);
      } else {
        console.log(`⏭️  Migration ${migration.name} already executed, skipping\n`);
      }
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
} 