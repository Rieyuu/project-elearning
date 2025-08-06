import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';

const router = Router();

// Register user baru
router.post('/register', AuthController.register);

// Login user
router.post('/login', AuthController.login);

// Logout user
router.post('/logout/:userId', AuthController.logout);

// Refresh token
router.post('/refresh-token', AuthController.refreshToken);

export default router; 