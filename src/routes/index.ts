import express from 'express';
import authRoutes from './auth-routes';
import userRoutes from './user-routes';
import courseRoutes from './course-routes';
import enrollmentRoutes from './enrollment-routes';

const router = express.Router();

// Auth routes (tidak memerlukan autentikasi)
router.use('/auth', authRoutes);

// Protected routes (memerlukan autentikasi)
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);

// v2 routes removed; integrating uploads into existing routes

export default router;
