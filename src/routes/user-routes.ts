import express from 'express';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { onlyAdminMiddleware } from '../middlewares/only-admin-middleware';
import { getById, update, index, create, deleteById } from '../controllers/user-controller';

const router = express.Router();

// Routes yang memerlukan autentikasi
router.get('/:id', authenticationMiddleware, getById);

// Routes yang hanya bisa diakses oleh user yang sedang login (update profile sendiri)
router.patch('/profile', authenticationMiddleware, update);

// Routes yang hanya bisa diakses oleh admin
router.get('/', authenticationMiddleware, onlyAdminMiddleware, index);
router.post('/', authenticationMiddleware, onlyAdminMiddleware, create);
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, update);
router.delete('/:id', authenticationMiddleware, onlyAdminMiddleware, deleteById);

// Routes yang bisa diakses oleh student (non-admin)
router.get('/enrollments', authenticationMiddleware, getById);

export default router;
