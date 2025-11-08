const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters'
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, description, price, category, brand, stock } = req.body;

  if (!name || !description || !price || !category || !brand) {
    return res.status(400).json({
      success: false,
      error: 'Name, description, price, category, and brand are required'
    });
  }

  if (price < 0) {
    return res.status(400).json({
      success: false,
      error: 'Price cannot be negative'
    });
  }

  if (stock && stock < 0) {
    return res.status(400).json({
      success: false,
      error: 'Stock cannot be negative'
    });
  }

  next();
};

const validateOrder = (req, res, next) => {
  const { items, shippingAddress } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Order items are required'
    });
  }

  if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.address) {
    return res.status(400).json({
      success: false,
      error: 'Valid shipping address is required'
    });
  }

  // Validate each item
  for (const item of items) {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Each item must have productId and positive quantity'
      });
    }
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder
};