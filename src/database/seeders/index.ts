import pool from '../config';
import { seedUsers } from './user-seeder';
import { seedCourses } from './course-seeder';
import { seedEnrollments } from './enrollment-seeder';

async function runSeeders() {
  try {
    console.log('🚀 Starting database seeding...\n');
    
    // Run seeders in order (users first, then courses, then enrollments)
    await seedUsers();
    console.log('');
    
    await seedCourses();
    console.log('');
    
    await seedEnrollments();
    console.log('');
    
    console.log('🎉 All seeders completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run seeders if this file is executed directly
if (require.main === module) {
  runSeeders();
} 