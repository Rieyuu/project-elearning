import { Router } from 'express';
import * as userController from '../controllers/user-controller';
import { authenticateToken } from '../middleware/auth-middleware';

const router = Router();

// Semua routes user memerlukan autentikasi
router.use(authenticateToken);

// GET /api/users - Mendapatkan semua users
router.get('/', userController.index);

// GET /api/users/count - Mendapatkan jumlah users
router.get('/count', userController.count);

// POST /api/users - Membuat user baru
router.post('/', userController.store);

// GET /api/users/:id - Mendapatkan user by ID
router.get('/:id', userController.show);

// PATCH /api/users/:id - Update user (partial update)
router.patch('/:id', userController.update);

// DELETE /api/users/:id - Hapus user
router.delete('/:id', userController.destroy);

export default router;
