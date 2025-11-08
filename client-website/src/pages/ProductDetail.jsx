import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { getProduct } from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart, getCartItem } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const cartItem = getCartItem(parseInt(id))

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await getProduct(id)
      setProduct(response.data.product)
    } catch (err) {
      setError('Product not found')
      console.error('Error loading product:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  const renderRating = (rating) => {
    return (
      <div className="product-rating">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < Math.floor(rating) ? 'star filled' : 'star'}
          />
        ))}
        <span className="rating-value">{rating}</span>
        <span className="rating-count">(125 reviews)</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <LoadingSpinner text="Loading product..." />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              <FaArrowLeft /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            {renderRating(product.rating || 4.5)}

            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="discount-badge">Save {product.discount}%</span>
              )}
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="label">Category:</span>
                <span className="value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="label">Availability:</span>
                <span className={`value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              <div className="meta-item">
                <span className="label">SKU:</span>
                <span className="value">SKU-{product.id}</span>
              </div>
            </div>

            <p className="product-short-description">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn btn-primary add-to-cart-btn"
                >
                  <FaShoppingCart />
                  {cartItem ? `Added to Cart (${cartItem.quantity})` : 'Add to Cart'}
                </button>
                
                <button className="btn btn-outline wishlist-btn">
                  <FaHeart />
                  Wishlist
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature">
                <FaTruck />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature">
                <FaShieldAlt />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'specifications' ? 'active' : ''}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Professional grade</li>
                  <li>Easy to use and maintain</li>
                  <li>Customer favorite</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <h3>Product Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Brand</td>
                      <td>ShopEasy</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>SE-{product.id}</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>2.5 lbs</td>
                    </tr>
                    <tr>
                      <td>Dimensions</td>
                      <td>10 x 8 x 6 inches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating">4.5</span>
                    {renderRating(4.5)}
                    <p>Based on 125 reviews</p>
                  </div>
                </div>
                {/* Reviews list would go here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail