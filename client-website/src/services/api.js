import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const loginUser = (credentials) => api.post('/api/auth/login', credentials)
export const registerUser = (userData) => api.post('/api/auth/register', userData)

// Products API
export const getProducts = (params = {}) => api.get('/api/products', { params })
export const getProduct = (id) => api.get(`/api/products/${id}`)
export const getCategories = () => api.get('/api/categories')

// Orders API
export const createOrder = (orderData) => api.post('/api/orders', orderData)
export const getOrder = (trackingNumber) => api.get(`/api/orders/${trackingNumber}`)

// Health check
export const healthCheck = () => api.get('/api/health')

export default api