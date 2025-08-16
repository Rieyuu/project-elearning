const Model = require('../config/database/orm');

// Plain TS interface used across repositories/services
export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  tanggalLahir: Date;
  sudahLulus: boolean;
  skorKeseluruhan: number;
  role: string;
  avatar?: string;
}

export class User extends Model {
  static softDelete = true;
  static tableName = 'users';

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // Knex query helper
  static get knex() {
    return require('../config/database/query-builder');
  }
}
