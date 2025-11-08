const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
};

const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Books',
  'Toys & Games',
  'Automotive',
  'Health & Household',
  'Jewelry'
];

const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  RATING: 'rating',
  NAME: 'name'
};

module.exports = {
  ORDER_STATUS,
  PAYMENT_STATUS,
  USER_ROLES,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS
};