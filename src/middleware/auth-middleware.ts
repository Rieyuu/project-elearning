import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth-service';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Token tidak ditemukan'
    });
  }

  const decoded = AuthService.verifyAccessToken(token);
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Token tidak valid atau sudah expired'
    });
  }

  req.user = decoded;
  next();
}; 