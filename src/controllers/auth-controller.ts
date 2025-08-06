import { Request, Response } from 'express';
import { AuthService, RegisterData, LoginData } from '../services/auth-service';

export class AuthController {
  // Register user baru
  static async register(req: Request, res: Response) {
    try {
      const userData: RegisterData = req.body;

      // Validasi input
      if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, dan password diperlukan'
        });
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Format email tidak valid'
        });
      }

      // Validasi password minimal 6 karakter
      if (userData.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password minimal 6 karakter'
        });
      }

      const result = await AuthService.register(userData);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error in register controller:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan internal server'
      });
    }
  }

  // Login user
  static async login(req: Request, res: Response) {
    try {
      const loginData: LoginData = req.body;

      // Validasi input
      if (!loginData.email || !loginData.password) {
        return res.status(400).json({
          success: false,
          message: 'Email dan password diperlukan'
        });
      }

      const result = await AuthService.login(loginData);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      console.error('Error in login controller:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan internal server'
      });
    }
  }

  // Logout user
  static async logout(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId || req.body.userId);
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID diperlukan'
        });
      }

      const result = await AuthService.logout(userId);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in logout controller:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan internal server'
      });
    }
  }

  // Refresh token
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token diperlukan'
        });
      }

      const result = await AuthService.refreshToken(refreshToken);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      console.error('Error in refresh token controller:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan internal server'
      });
    }
  }
} 