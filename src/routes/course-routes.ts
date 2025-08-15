import express from 'express';
import multer from 'multer';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { onlyAdminMiddleware } from '../middlewares/only-admin-middleware';
import { index, getById, create, update, deleteById } from '../controllers/course-controller';
import * as filesystem from '../utilities/filesystem';

// In-line multer config (memory storage) to avoid separate config file
const upload = multer();

const router = express.Router();

// Routes yang bisa diakses oleh semua user yang terautentikasi
router.get('/', authenticationMiddleware, index);
router.get('/:id', authenticationMiddleware, getById);

// Routes yang hanya bisa diakses oleh admin
router.post('/', authenticationMiddleware, onlyAdminMiddleware, upload.single('image'), create);
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, upload.single('image'), update);
router.delete('/:id', authenticationMiddleware, onlyAdminMiddleware, deleteById);

// Routes yang bisa diakses oleh student (non-admin)
router.get('/enrolled', authenticationMiddleware, getById);
router.get('/available', authenticationMiddleware, index);

export default router; 