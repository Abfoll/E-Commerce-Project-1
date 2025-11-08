import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Dashboard API
export const getDashboardStats = () => api.get('/api/admin/dashboard/stats')
export const getSalesData = () => api.get('/api/admin/dashboard/sales')
export const getRecentOrders = () => api.get('/api/admin/orders/recent')

// Products API
export const getProducts = () => api.get('/api/admin/products')
export const createProduct = (productData) => api.post('/api/admin/products', productData)
export const updateProduct = (id, productData) => api.put(`/api/admin/products/${id}`, productData)
export const deleteProduct = (id) => api.delete(`/api/admin/products/${id}`)

// Orders API
export const getOrders = () => api.get('/api/admin/orders')
export const updateOrderStatus = (id, status) => api.patch(`/api/admin/orders/${id}`, { status })

// Customers API
export const getCustomers = () => api.get('/api/admin/customers')

export default api