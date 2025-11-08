const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
} = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validationMiddleware');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  handleUploadError,
  validateProduct,
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  handleUploadError,
  validateProduct,
  updateProduct
);

router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;