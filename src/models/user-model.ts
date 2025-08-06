import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { users as initialUsers, UserData } from '../data/users';

export { UserData };

export class UserModel {
  private static dataPath = path.join(__dirname, '../data/users.json');
  private static users: UserData[] = [];

  // Inisialisasi data dengan password yang di-hash
  private static async initializeData(): Promise<void> {
    if (this.users.length === 0) {
      // Hash password untuk user default
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('password123', saltRounds);
      
      this.users = initialUsers.map(user => ({
        ...user,
        password: hashedPassword
      }));
      
      // Simpan ke file JSON untuk persistensi
      this.writeData(this.users);
    }
  }

  // Membaca data dari file
  private static readData(): UserData[] {
    try {
      if (!fs.existsSync(this.dataPath)) {
        // Jika file tidak ada, gunakan data dari users.ts
        return this.users;
      }
      
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading user data:', error);
      return this.users;
    }
  }

  // Menulis data ke file
  private static writeData(data: UserData[]): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing user data:', error);
      throw error;
    }
  }

  // GET - Mendapatkan semua users
  static async getAllUsers(): Promise<UserData[]> {
    await this.initializeData();
    return this.readData();
  }

  // GET - Mendapatkan user by ID
  static async getUserById(id: number): Promise<UserData | null> {
    await this.initializeData();
    const users = this.readData();
    return users.find(user => user.id === id) || null;
  }

  // GET - Mendapatkan user by email
  static async getUserByEmail(email: string): Promise<UserData | null> {
    await this.initializeData();
    const users = this.readData();
    return users.find(user => user.email === email) || null;
  }

  // POST - Membuat user baru
  static async createUser(userData: Omit<UserData, 'id'>): Promise<UserData> {
    await this.initializeData();
    const users = this.readData();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUser: UserData = {
      id: newId,
      ...userData
    };
    
    users.push(newUser);
    this.writeData(users);
    return newUser;
  }

  // PUT - Update user existing
  static async updateUser(id: number, userData: Partial<Omit<UserData, 'id'>>): Promise<UserData | null> {
    await this.initializeData();
    const users = this.readData();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return null;
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData
    };
    
    this.writeData(users);
    return users[userIndex];
  }

  // DELETE - Hapus user
  static async deleteUser(id: number): Promise<boolean> {
    await this.initializeData();
    const users = this.readData();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    users.splice(userIndex, 1);
    this.writeData(users);
    return true;
  }

  // GET - Jumlah users
  static async getUsersCount(): Promise<number> {
    await this.initializeData();
    return this.readData().length;
  }

  // Update refresh token
  static async updateRefreshToken(id: number, refreshToken: string, expiry: number): Promise<boolean> {
    await this.initializeData();
    const users = this.readData();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].refreshToken = refreshToken;
    users[userIndex].tokenExpiry = expiry;
    this.writeData(users);
    return true;
  }

  // Clear refresh token (logout)
  static async clearRefreshToken(id: number): Promise<boolean> {
    await this.initializeData();
    const users = this.readData();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].refreshToken = undefined;
    users[userIndex].tokenExpiry = undefined;
    this.writeData(users);
    return true;
  }

  // Get user by refresh token
  static async getUserByRefreshToken(refreshToken: string): Promise<UserData | null> {
    await this.initializeData();
    const users = this.readData();
    return users.find(user => user.refreshToken === refreshToken) || null;
  }
}
