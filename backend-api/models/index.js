const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');
const Review = require('./Review');

// Define associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
// CHANGED: as: 'category' -> as: 'productCategory'
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'productCategory' });

// Self-referencing for sub-categories
Category.hasMany(Category, { foreignKey: 'parentId', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Category,
  Review
};