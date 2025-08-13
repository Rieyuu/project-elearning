import { IUserService } from '../interfaces/service.interface';
import { IUserRepository } from '../interfaces/repository.interface';
import { UserData } from '../models/user-model';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<UserData[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number, currentUserId: number, currentUserRole: string): Promise<UserData | null> {
    const user = await this.userRepository.findById(id);
    
    if (!user) return null;
    
    // Jika admin, bisa akses semua user
    if (currentUserRole === 'admin') return user;
    
    // Jika student, hanya bisa akses data dirinya sendiri
    if (currentUserRole === 'student' && currentUserId === id) return user;
    
    // Jika bukan admin dan bukan data diri sendiri, return null
    return null;
  }

  async createUser(userData: Omit<UserData, 'id'>): Promise<UserData> {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = { ...userData, password: hashedPassword };
    
    return await this.userRepository.create(userWithHashedPassword);
  }

  async updateUser(id: number, userData: Partial<UserData>): Promise<UserData | null> {
    // Jika ada password baru, hash dulu
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  async authenticateUser(email: string, password: string): Promise<UserData | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
