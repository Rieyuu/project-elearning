const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const courseController = require('../controllers/course-controller');

// GET /api/courses - bisa diakses semua user
router.get('/', courseController.index);

// GET /api/courses/:id - bisa diakses semua user
router.get('/:id', courseController.getById);

// POST /api/courses - hanya admin
router.post('/', authenticationMiddleware, onlyAdminMiddleware, courseController.create);

// PATCH /api/courses/:id - hanya admin
router.patch('/:id', authenticationMiddleware, onlyAdminMiddleware, courseController.update);

// DELETE /api/courses/:id - hanya admin
router.delete('/:id', authenticationMiddleware, onlyAdminMiddleware, courseController.deleteById);

module.exports = router; 