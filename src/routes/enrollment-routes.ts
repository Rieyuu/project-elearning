import express from 'express';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { onlyAdminMiddleware } from '../middlewares/only-admin-middleware';
import { index, getById, getByUserId, create, update, deleteById } from '../controllers/enrollment-controller';

const router = express.Router();

// Routes yang hanya bisa diakses oleh admin
router.get('/', authenticationMiddleware, onlyAdminMiddleware, index);
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, update);

// Routes yang bisa diakses oleh user yang terautentikasi
router.get('/:id', authenticationMiddleware, getById);

// Routes yang bisa diakses oleh student (non-admin)
router.get('/user/:userId', authenticationMiddleware, getByUserId);
router.post('/', authenticationMiddleware, create);
router.delete('/:id', authenticationMiddleware, deleteById);

export default router; 