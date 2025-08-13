import { IUserRepository } from '../interfaces/repository.interface';
import { UserData } from '../models/user-model';
import pool from '../database/config';

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserData[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users ORDER BY id');
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      }));
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<UserData | null> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const row: any = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      };
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) return null;
      
      const row: any = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      };
    } finally {
      client.release();
    }
  }

  async findByRole(role: string): Promise<UserData[]> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE role = $1 ORDER BY id', [role]);
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      }));
    } finally {
      client.release();
    }
  }

  async create(data: Omit<UserData, 'id'>): Promise<UserData> {
    const client = await pool.connect();
    try {
      const result = await client.query(`
        INSERT INTO users (name, email, password, tanggal_lahir, sudah_lulus, skor_keseluruhan, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [
        data.name,
        data.email,
        data.password,
        data.tanggalLahir.toISOString().split('T')[0],
        data.sudahLulus,
        data.skorKeseluruhan,
        data.role
      ]);
      
      const row: any = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      };
    } finally {
      client.release();
    }
  }

  async update(id: number, data: Partial<UserData>): Promise<UserData | null> {
    const client = await pool.connect();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (data.name !== undefined) {
        fields.push(`name = $${paramCount++}`);
        values.push(data.name);
      }
      if (data.email !== undefined) {
        fields.push(`email = $${paramCount++}`);
        values.push(data.email);
      }
      if (data.password !== undefined) {
        fields.push(`password = $${paramCount++}`);
        values.push(data.password);
      }
      if (data.tanggalLahir !== undefined) {
        fields.push(`tanggal_lahir = $${paramCount++}`);
        values.push(data.tanggalLahir.toISOString().split('T')[0]);
      }
      if (data.sudahLulus !== undefined) {
        fields.push(`sudah_lulus = $${paramCount++}`);
        values.push(data.sudahLulus);
      }
      if (data.skorKeseluruhan !== undefined) {
        fields.push(`skor_keseluruhan = $${paramCount++}`);
        values.push(data.skorKeseluruhan);
      }
      if (data.role !== undefined) {
        fields.push(`role = $${paramCount++}`);
        values.push(data.role);
      }

      if (fields.length === 0) return this.findById(id);

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const result = await client.query(`
        UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount}
        RETURNING *
      `, values);

      if (result.rows.length === 0) return null;

      const row: any = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        tanggalLahir: new Date(row.tanggal_lahir),
        sudahLulus: row.sudah_lulus,
        skorKeseluruhan: row.skor_keseluruhan,
        role: row.role,
      };
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }
} 