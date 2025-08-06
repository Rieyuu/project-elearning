import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserModel, UserData } from '../models/user-model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 menit
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 hari

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  tanggalLahir: string;
  sudahLulus: boolean;
  skorKeseluruhan: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Omit<UserData, 'password' | 'refreshToken'>;
    accessToken: string;
    refreshToken: string;
  };
}

export class AuthService {
  // Register user baru
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Cek apakah email sudah terdaftar
      const existingUser = await UserModel.getUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email sudah terdaftar'
        };
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Buat user baru
      const newUser = await UserModel.createUser({
        ...userData,
        password: hashedPassword
      });

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
      );

      const refreshToken = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
      );

      // Simpan refresh token
      const tokenExpiry = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 hari
      await UserModel.updateRefreshToken(newUser.id, refreshToken, tokenExpiry);

      // Return response tanpa password
      const { password, refreshToken: storedToken, tokenExpiry: storedExpiry, ...userWithoutPassword } = newUser;

      return {
        success: true,
        message: 'Registrasi berhasil',
        data: {
          user: userWithoutPassword,
          accessToken,
          refreshToken
        }
      };
    } catch (error) {
      console.error('Error in register:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat registrasi'
      };
    }
  }

  // Login user
  static async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      // Cari user berdasarkan email
      const user = await UserModel.getUserByEmail(loginData.email);
      if (!user) {
        return {
          success: false,
          message: 'Email atau password salah'
        };
      }

      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Email atau password salah'
        };
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
      );

      const refreshToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
      );

      // Simpan refresh token
      const tokenExpiry = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 hari
      await UserModel.updateRefreshToken(user.id, refreshToken, tokenExpiry);

      // Return response tanpa password
      const { password, refreshToken: storedToken, tokenExpiry: storedExpiry, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Login berhasil',
        data: {
          user: userWithoutPassword,
          accessToken,
          refreshToken
        }
      };
    } catch (error) {
      console.error('Error in login:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat login'
      };
    }
  }

  // Logout user
  static async logout(userId: number): Promise<AuthResponse> {
    try {
      const success = await UserModel.clearRefreshToken(userId);
      
      if (success) {
        return {
          success: true,
          message: 'Logout berhasil'
        };
      } else {
        return {
          success: false,
          message: 'User tidak ditemukan'
        };
      }
    } catch (error) {
      console.error('Error in logout:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat logout'
      };
    }
  }

  // Refresh token
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // Verifikasi refresh token
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
      
      // Cari user berdasarkan refresh token
      const user = await UserModel.getUserByRefreshToken(refreshToken);
      if (!user) {
        return {
          success: false,
          message: 'Refresh token tidak valid'
        };
      }

      // Cek apakah token sudah expired
      if (user.tokenExpiry && Date.now() > user.tokenExpiry) {
        await UserModel.clearRefreshToken(user.id);
        return {
          success: false,
          message: 'Refresh token sudah expired'
        };
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
      );

      // Return response tanpa password
      const { password, refreshToken: storedToken, tokenExpiry: storedExpiry, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Token berhasil di-refresh',
        data: {
          user: userWithoutPassword,
          accessToken: newAccessToken,
          refreshToken
        }
      };
    } catch (error) {
      console.error('Error in refresh token:', error);
      return {
        success: false,
        message: 'Refresh token tidak valid'
      };
    }
  }

  // Verifikasi access token
  static verifyAccessToken(token: string): { userId: number; email: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        userId: decoded.userId,
        email: decoded.email
      };
    } catch (error) {
      return null;
    }
  }
} 