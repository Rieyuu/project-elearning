import pool from '../config';
import bcrypt from 'bcrypt';

const users = [
  {
    name: 'User Pertama',
    email: 'userpertama@elearning.com',
    password: '$2b$10$tIyAxLWmdBX/x/TVDDkuIuPkrvau8kGPZTew23tu0Q90D4Mmo6aqi',
    tanggal_lahir: '2005-01-01',
    sudah_lulus: false,
    skor_keseluruhan: 90,
    role: 'admin',
  },
  {
    name: 'User Kedua',
    email: 'userkedua@elearning.com',
    password: '$2b$10$tIyAxLWmdBX/x/TVDDkuIuPkrvau8kGPZTew23tu0Q90D4Mmo6aqi',
    tanggal_lahir: '2004-01-01',
    sudah_lulus: true,
    skor_keseluruhan: 85,
    role: 'student',
  },
];

export async function seedUsers(): Promise<void> {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Seeding users...');
    
    for (const user of users) {
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [user.email]
      );
      
      if (existingUser.rows.length === 0) {
        await client.query(`
          INSERT INTO users (name, email, password, tanggal_lahir, sudah_lulus, skor_keseluruhan, role)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          user.name,
          user.email,
          user.password,
          user.tanggal_lahir,
          user.sudah_lulus,
          user.skor_keseluruhan,
          user.role
        ]);
        
        console.log(`✅ User ${user.name} seeded successfully`);
      } else {
        console.log(`⏭️  User ${user.name} already exists, skipping`);
      }
    }
    
    console.log('🎉 Users seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  } finally {
    client.release();
  }
} 