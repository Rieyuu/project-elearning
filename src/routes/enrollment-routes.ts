const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const enrollmentController = require('../controllers/enrollment-controller');

// GET /api/enrollments - hanya admin
router.get('/', authenticationMiddleware, onlyAdminMiddleware, enrollmentController.index);

// GET /api/enrollments/:id - bisa diakses user (dengan authorization)
router.get('/:id', authenticationMiddleware, enrollmentController.getById);

// GET /api/enrollments/user/:userId - bisa diakses user (dengan authorization)
router.get('/user/:userId', authenticationMiddleware, enrollmentController.getByUserId);

// POST /api/enrollments - bisa diakses semua user yang sudah login
router.post('/', authenticationMiddleware, enrollmentController.create);

// PATCH /api/enrollments/:id - hanya admin
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, enrollmentController.update);

// DELETE /api/enrollments/:id - bisa diakses user (dengan authorization)
router.delete('/:id', authenticationMiddleware, enrollmentController.deleteById);

module.exports = router; 