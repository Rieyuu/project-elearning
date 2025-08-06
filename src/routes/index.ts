import { Router } from 'express';
import userRoutes from './user-routes';
import authRoutes from './auth-routes';

const router = Router();

// Auth routes (tidak memerlukan autentikasi)
router.use('/auth', authRoutes);

// User routes (memerlukan autentikasi)
router.use('/users', userRoutes);

export default router;
