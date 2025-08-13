import pool from '../config';

const courses = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Belajar dasar-dasar JavaScript dari nol hingga mahir',
    instructor: 'John Doe',
    duration: 120, // 2 jam
    price: 150000,
    status: 'active',
  },
  {
    title: 'React.js Advanced',
    description: 'Kursus lanjutan React.js untuk developer berpengalaman',
    instructor: 'Jane Smith',
    duration: 180, // 3 jam
    price: 250000,
    status: 'active',
  },
  {
    title: 'Node.js Backend Development',
    description: 'Membangun aplikasi backend dengan Node.js dan Express',
    instructor: 'Mike Johnson',
    duration: 240, // 4 jam
    price: 300000,
    status: 'active',
  },
];

export async function seedCourses(): Promise<void> {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Seeding courses...');
    
    for (const course of courses) {
      // Check if course already exists
      const existingCourse = await client.query(
        'SELECT id FROM courses WHERE title = $1 AND instructor = $2',
        [course.title, course.instructor]
      );
      
      if (existingCourse.rows.length === 0) {
        await client.query(`
          INSERT INTO courses (title, description, instructor, duration, price, status)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          course.title,
          course.description,
          course.instructor,
          course.duration,
          course.price,
          course.status
        ]);
        
        console.log(`✅ Course "${course.title}" seeded successfully`);
      } else {
        console.log(`⏭️  Course "${course.title}" already exists, skipping`);
      }
    }
    
    console.log('🎉 Courses seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    throw error;
  } finally {
    client.release();
  }
} 