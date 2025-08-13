import pool from '../config';

const enrollments = [
  {
    user_email: 'userkedua@elearning.com',
    course_title: 'JavaScript Fundamentals',
    status: 'approved',
    enrolled_at: '2024-01-15',
    progress: 75,
    score: 85,
  },
  {
    user_email: 'userkedua@elearning.com',
    course_title: 'React.js Advanced',
    status: 'pending',
    enrolled_at: '2024-02-01',
    progress: 0,
  },
  {
    user_email: 'userpertama@elearning.com',
    course_title: 'Node.js Backend Development',
    status: 'completed',
    enrolled_at: '2024-01-10',
    completed_at: '2024-02-15',
    progress: 100,
    score: 95,
  },
];

export async function seedEnrollments(): Promise<void> {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Seeding enrollments...');
    
    for (const enrollment of enrollments) {
      // Get user ID
      const userResult = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [enrollment.user_email]
      );
      
      if (userResult.rows.length === 0) {
        console.log(`⚠️  User ${enrollment.user_email} not found, skipping enrollment`);
        continue;
      }
      
      // Get course ID
      const courseResult = await client.query(
        'SELECT id FROM courses WHERE title = $1',
        [enrollment.course_title]
      );
      
      if (courseResult.rows.length === 0) {
        console.log(`⚠️  Course "${enrollment.course_title}" not found, skipping enrollment`);
        continue;
      }
      
      const userId = userResult.rows[0].id;
      const courseId = courseResult.rows[0].id;
      
      // Check if enrollment already exists
      const existingEnrollment = await client.query(
        'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, courseId]
      );
      
      if (existingEnrollment.rows.length === 0) {
        const query = `
          INSERT INTO enrollments (user_id, course_id, status, enrolled_at, completed_at, progress, score)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        
        const values = [
          userId,
          courseId,
          enrollment.status,
          enrollment.enrolled_at,
          enrollment.completed_at || null,
          enrollment.progress,
          enrollment.score || null
        ];
        
        await client.query(query, values);
        
        console.log(`✅ Enrollment for ${enrollment.user_email} in "${enrollment.course_title}" seeded successfully`);
      } else {
        console.log(`⏭️  Enrollment for ${enrollment.user_email} in "${enrollment.course_title}" already exists, skipping`);
      }
    }
    
    console.log('🎉 Enrollments seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding enrollments:', error);
    throw error;
  } finally {
    client.release();
  }
} 