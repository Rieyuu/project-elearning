import express from 'express';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { onlyAdminMiddleware } from '../middlewares/only-admin-middleware';
import { index, getById, create, update, deleteById } from '../controllers/course-controller';

const router = express.Router();

// Routes yang bisa diakses oleh semua user yang terautentikasi
router.get('/', authenticationMiddleware, index);
router.get('/:id', authenticationMiddleware, getById);

// Routes yang hanya bisa diakses oleh admin
router.post('/', authenticationMiddleware, onlyAdminMiddleware, create);
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, update);
router.delete('/:id', authenticationMiddleware, onlyAdminMiddleware, deleteById);

// Routes yang bisa diakses oleh student (non-admin)
router.get('/enrolled', authenticationMiddleware, getById);
router.get('/available', authenticationMiddleware, index);

export default router; 