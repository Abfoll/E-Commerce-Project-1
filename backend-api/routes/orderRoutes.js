const express = require('express');
const {
  createOrder,
  getOrderByTrackingNumber,
  getUserOrders,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateOrder } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.get('/track/:trackingNumber', getOrderByTrackingNumber);

// Protected routes (Customer)
router.post('/', authenticate, validateOrder, createOrder);
router.get('/user/orders', authenticate, getUserOrders);

// Protected routes (Admin)
router.get('/', authenticate, authorize('admin'), getAllOrders);
router.put('/:id/status', authenticate, authorize('admin'), updateOrderStatus);

module.exports = router;