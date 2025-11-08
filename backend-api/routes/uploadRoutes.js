const express = require('express');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  handleUploadError,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
      message: 'File uploaded successfully'
    });
  }
);

module.exports = router;