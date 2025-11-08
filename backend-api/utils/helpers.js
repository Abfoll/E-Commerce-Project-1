const generateTrackingNumber = () => {
  return 'TRK' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
};

const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const paginate = (page, limit) => {
  const offset = (page - 1) * limit;
  return { offset, limit: parseInt(limit) };
};

const buildSearchQuery = (searchTerm) => {
  if (!searchTerm) return {};

  return {
    [Op.or]: [
      { name: { [Op.iLike]: `%${searchTerm}%` } },
      { description: { [Op.iLike]: `%${searchTerm}%` } },
      { brand: { [Op.iLike]: `%${searchTerm}%` } }
    ]
  };
};

module.exports = {
  generateTrackingNumber,
  calculateOrderTotal,
  formatCurrency,
  paginate,
  buildSearchQuery
};