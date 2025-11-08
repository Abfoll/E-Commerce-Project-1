import React from 'react'
import { FaFilter, FaSort } from 'react-icons/fa'

const ProductFilters = ({ 
  categories, 
  filters, 
  onFilterChange, 
  onSortChange,
  totalProducts 
}) => {
  const sortOptions = [
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ]

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value })
  }

  const handleSortChange = (e) => {
    onSortChange(e.target.value)
  }

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({ minPrice: min, maxPrice: max })
  }

  return (
    <div className="products-filters">
      <div className="filters-header">
        <h3>
          <FaFilter className="filter-icon" />
          Filters
        </h3>
        <span className="products-count">{totalProducts} products</span>
      </div>

      {/* Search */}
      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="filter-input"
        />
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label>Category</label>
        <select 
          value={filters.category || 'all'} 
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name} ({category.productCount || 0})
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceRangeChange(e.target.value, filters.maxPrice)}
            className="price-input"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceRangeChange(filters.minPrice, e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="filter-group">
        <label>
          <FaSort className="sort-icon" />
          Sort By
        </label>
        <select 
          value={filters.sort || 'newest'} 
          onChange={handleSortChange}
          className="filter-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.category !== 'all' || filters.minPrice || filters.maxPrice) && (
        <button 
          onClick={() => onFilterChange({
            search: '',
            category: 'all',
            minPrice: '',
            maxPrice: '',
            sort: 'newest'
          })}
          className="btn btn-outline clear-filters-btn"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}

export default ProductFilters