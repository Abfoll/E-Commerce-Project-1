const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  getDashboardStats
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require admin authentication
router.use(authenticate, authorize('admin'));

router.get('/', getAllUsers);
router.get('/stats', getDashboardStats);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deactivateUser);

module.exports = router;