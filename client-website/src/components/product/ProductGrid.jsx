import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products, loading, error, usingMockData }) => {
  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="products-empty">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="products-grid">
      {usingMockData && (
        <div className="mock-data-warning">
          <p>⚠️ Using demo data - Backend server not connected</p>
        </div>
      )}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid