const { Category, Product } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      include: [{
        model: Product,
        as: 'products', // ADD THIS LINE - specify the alias
        attributes: ['id'],
        where: { isActive: true },
        required: false
      }]
    });

    // Add product count to each category - FIXED to use categoryName
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.count({
          where: { 
            categoryName: category.name, // CHANGED from 'category' to 'categoryName'
            isActive: true
          }
        });

        return {
          ...category.toJSON(),
          productCount
        };
      })
    );

    res.json({
      success: true,
      categories: categoriesWithCount
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [{
        model: Product,
        as: 'products', // ADD THIS LINE
        where: { isActive: true },
        required: false
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.json({
      success: true,
      category
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category'
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, parentId } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Category name is required'
      });
    }

    const category = await Category.create({
      name,
      description,
      parentId
    });

    res.status(201).json({
      success: true,
      category,
      message: 'Category created successfully'
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create category'
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    await category.update(updateData);

    res.json({
      success: true,
      category,
      message: 'Category updated successfully'
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update category'
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Check if category has products - FIXED to use categoryName
    const productCount = await Product.count({
      where: { 
        categoryName: category.name, // CHANGED from 'category' to 'categoryName'
        isActive: true
      }
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with associated products'
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete category'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};