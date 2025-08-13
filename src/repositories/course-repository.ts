import { ICourseRepository } from '../interfaces/repository.interface';
import pool from '../database/config';

export class CourseRepository implements ICourseRepository {
  async findAll(): Promise<any[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM courses ORDER BY id');
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<any | null> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM courses WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const row: any = result.rows[0];
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } finally {
      client.release();
    }
  }

  async findByCategory(category: string): Promise<any[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM courses WHERE status = $1 ORDER BY id', [category]);
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } finally {
      client.release();
    }
  }

  async findByInstructor(instructorId: number): Promise<any[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM courses WHERE instructor = $1 ORDER BY id', [instructorId]);
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } finally {
      client.release();
    }
  }

  async create(data: any): Promise<any> {
    const client = await pool.connect();
    try {
      const result = await client.query(`
        INSERT INTO courses (title, description, instructor, duration, price, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [
        data.title,
        data.description,
        data.instructor,
        data.duration,
        data.price,
        data.status || 'active'
      ]);
      
      const row: any = result.rows[0];
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } finally {
      client.release();
    }
  }

  async update(id: number, data: any): Promise<any | null> {
    const client = await pool.connect();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (data.title !== undefined) {
        fields.push(`title = $${paramCount++}`);
        values.push(data.title);
      }
      if (data.description !== undefined) {
        fields.push(`description = $${paramCount++}`);
        values.push(data.description);
      }
      if (data.instructor !== undefined) {
        fields.push(`instructor = $${paramCount++}`);
        values.push(data.instructor);
      }
      if (data.duration !== undefined) {
        fields.push(`duration = $${paramCount++}`);
        values.push(data.duration);
      }
      if (data.price !== undefined) {
        fields.push(`price = $${paramCount++}`);
        values.push(data.price);
      }
      if (data.status !== undefined) {
        fields.push(`status = $${paramCount++}`);
        values.push(data.status);
      }

      if (fields.length === 0) return this.findById(id);

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const result = await client.query(`
        UPDATE courses SET ${fields.join(', ')} WHERE id = $${paramCount}
        RETURNING *
      `, values);

      if (result.rows.length === 0) return null;

      const row: any = result.rows[0];
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        instructor: row.instructor,
        duration: row.duration,
        price: row.price,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM courses WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }
} 