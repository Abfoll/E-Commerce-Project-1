import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../services/api'

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [filters])

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getProducts(filters)
      setProducts(response.data.products || [])
    } catch (err) {
      setError('Failed to load products')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(response.data.categories || [])
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    refetch: loadProducts
  }
}