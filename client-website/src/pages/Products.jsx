import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { useProducts } from '../hooks/useProducts'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  
  const initialFilters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || 1,
    limit: searchParams.get('limit') || 12
  }

  const { products, categories, loading, error, filters, updateFilters } = useProducts(initialFilters)

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value)
      }
    })
    setSearchParams(params)
  }, [filters, setSearchParams])

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
  }

  const handleSortChange = (sort) => {
    updateFilters({ sort })
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Our Products</h1>
          <p>Discover our wide range of quality products</p>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              totalProducts={products.length}
            />
          </aside>

          {/* Products Main Content */}
          <main className="products-main">
            {/* View Controls */}
            <div className="view-controls">
              <div className="view-buttons">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </button>
              </div>
              
              <div className="results-info">
                Showing {products.length} products
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`products-container ${viewMode}-view`}>
              <ProductGrid 
                products={products} 
                loading={loading}
                error={error}
              />
            </div>

            {/* Pagination would go here */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Products