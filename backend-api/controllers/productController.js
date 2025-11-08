const { Product, Review, User } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      brand,
      sort = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 12,
      featured
    } = req.query;

    // Build where clause
    const where = { isActive: true };

    // FIXED: Changed 'category' to 'categoryName'
    if (category && category !== 'all') {
      where.categoryName = { [Op.iLike]: `%${category}%` };
    }

    if (brand && brand !== 'all') {
      where.brand = { [Op.iLike]: `%${brand}%` };
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } },
        { categoryName: { [Op.iLike]: `%${search}%` } } // Added categoryName to search
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    // Build order clause
    let orderClause = [];
    switch (sort) {
      case 'price-low':
        orderClause = [['price', 'ASC']];
        break;
      case 'price-high':
        orderClause = [['price', 'DESC']];
        break;
      case 'rating':
        orderClause = [['rating', 'DESC']];
        break;
      case 'name':
        orderClause = [['name', 'ASC']];
        break;
      default:
        orderClause = [['createdAt', 'DESC']];
    }

    // Pagination
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order: orderClause,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      success: true,
      products,
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      hasNext: offset + products.length < count,
      hasPrev: page > 1
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [{
        model: Review,
        include: [{
          model: User,
          attributes: ['id', 'name']
        }]
      }]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      categoryName, // FIXED: Using categoryName instead of category
      brand,
      stock,
      images,
      features,
      isFeatured,
      tags
    } = req.body;

    // FIXED: Updated validation to check for categoryName
    if (!name || !description || !price || !categoryName || !brand) {
      return res.status(400).json({
        success: false,
        error: "Name, description, price, categoryName, and brand are required"
      });
    }

    // Handle image upload
    if (req.file) {
      images = [`/uploads/${req.file.filename}`];
    }

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      categoryName, // FIXED: Using categoryName
      brand,
      stock: stock || 0,
      images: images || [],
      features: features || [],
      isFeatured: isFeatured || false,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      product,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      originalPrice,
      categoryName, // FIXED: Using categoryName instead of category
      brand,
      stock,
      images,
      features,
      isFeatured,
      tags
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Handle image upload
    if (req.file) {
      images = [`/uploads/${req.file.filename}`];
    }

    // FIXED: Using categoryName in update
    await product.update({
      name,
      description,
      price,
      originalPrice,
      categoryName,
      brand,
      stock,
      images,
      features,
      isFeatured,
      tags
    });

    res.json({
      success: true,
      product,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update product'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    await product.update({ isActive: false });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete product'
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        isFeatured: true,
        isActive: true
      },
      limit: 8,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      products
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured products'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
};