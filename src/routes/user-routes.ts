const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const userController = require('../controllers/user-controller');

// GET /api/users
router.get('/', userController.index);

// GET /api/users/:id -> bisa diakses admin dan student (student hanya data diri sendiri)
router.get('/:id', authenticationMiddleware, userController.getById);

// PATCH /api/users
router.patch('/', authenticationMiddleware, userController.update);

// DELETE /api/users/:id -> hanya boleh oleh ADMIN
router.delete(
  '/:id',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.deleteById,
);

module.exports = router;
