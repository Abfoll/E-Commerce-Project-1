import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

const Cart = () => {
  const { cart, clearCart, getCartItemsCount } = useCart()

  if (getCartItemsCount() === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>You have {getCartItemsCount()} item(s) in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h3>Items in Cart</h3>
              <button 
                onClick={clearCart}
                className="btn btn-outline clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items">
              {cart.items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-continue-shopping">
              <Link to="/products" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-section">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart