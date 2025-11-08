import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartSummary = () => {
  const { getCartTotal, getCartItemsCount, cart } = useCart()

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (cart.items.length === 0) {
    return null
  }

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal ({getCartItemsCount()} items):</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="summary-row">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="free-shipping-notice">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
      </div>

      <div className="summary-actions">
        <Link to="/checkout" className="btn btn-primary checkout-btn">
          Proceed to Checkout
        </Link>
        
        <Link to="/products" className="btn btn-outline continue-shopping">
          Continue Shopping
        </Link>
      </div>

      <div className="security-notice">
        <div className="security-icon">🔒</div>
        <p>Your payment information is secure and encrypted</p>
      </div>
    </div>
  )
}

export default CartSummary