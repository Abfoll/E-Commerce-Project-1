import React, { useState } from 'react'
import { FaFilter, FaSort } from 'react-icons/fa'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const { products, loading, filters, updateFilters } = useProducts()

  const categories = [
    { id: 1, name: 'All Categories', count: 120 },
    { id: 2, name: 'Electronics', count: 45 },
    { id: 3, name: 'Clothing', count: 32 },
    { id: 4, name: 'Home & Garden', count: 28 },
    { id: 5, name: 'Sports', count: 15 }
  ]

  const brands = [
    { id: 1, name: 'Nike', count: 23 },
    { id: 2, name: 'Samsung', count: 18 },
    { id: 3, name: 'Apple', count: 15 },
    { id: 4, name: 'Adidas', count: 12 },
    { id: 5, name: 'Sony', count: 10 }
  ]

  return (
    <div className="shop-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Shop All Products</h1>
          <p>Discover our complete collection of amazing products</p>
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters({ category: category.name })
                        } else {
                          updateFilters({ category: 'all' })
                        }
                      }}
                    />
                    <span>{category.name} ({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Brands</h3>
              <div className="filter-options">
                {brands.map(brand => (
                  <label key={brand.id} className="filter-option">
                    <input type="checkbox" />
                    <span>{brand.name} ({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                />
                <div className="price-labels">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{width: '100%'}}>
              Apply Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="toolbar-left">
                <span>Showing {products.length} products</span>
              </div>
              
              <div className="toolbar-right">
                <div className="view-options">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </button>
                </div>

                <div className="sort-options">
                  <FaSort />
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid 
              products={products} 
              loading={loading}
            />

            {/* Load More */}
            <div className="load-more">
              <button className="btn btn-secondary">
                Load More Products
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Shop