import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaFire } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart, getCartItem } = useCart()
  const cartItem = getCartItem(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const renderRating = (rating) => {
    return (
      <div className="product-rating">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < Math.floor(rating) ? 'star filled' : 'star'}
            />
          ))}
        </div>
        <span className="rating-count">({rating})</span>
      </div>
    )
  }

  const isNew = product.id % 4 === 0
  const isOnSale = product.id % 3 === 0
  const isPopular = product.id % 5 === 0

  return (
    <div className="product-card reveal">
      <Link to={`/product/${product.id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          
          {/* Badges */}
          <div className="product-badges">
            {isNew && <span className="product-badge badge-new">New</span>}
            {isOnSale && <span className="product-badge badge-sale">Sale</span>}
            {isPopular && (
              <span className="product-badge badge-popular">
                <FaFire /> Popular
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlist}
          >
            <FaHeart />
          </button>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          
          {renderRating(product.rating || 4.5)}

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {isOnSale && (
              <>
                <span className="original-price">${(product.price * 1.5).toFixed(2)}</span>
                <span className="discount">25% OFF</span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="product-actions">
        <button
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <FaShoppingCart />
          {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
        </button>
        <button className="quick-view-btn">
          <FaEye />
        </button>
      </div>
    </div>
  )
}

export default ProductCard