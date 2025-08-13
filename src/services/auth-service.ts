import { IUserService } from '../interfaces/service.interface';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userService: IUserService) {}

  async login(email: string, password: string): Promise<{ user: any; token: string } | null> {
    const user = await this.userService.authenticateUser(email, password);
    if (!user) return null;

    const token = this.generateToken(user);
    return { user, token };
  }

  private generateToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  }

  verifyToken(token: string): any {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}
