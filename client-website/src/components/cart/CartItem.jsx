import React from 'react'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(item.id, item.quantity - 1)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  const subtotal = item.price * item.quantity

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-details">
        <Link to={`/product/${item.id}`} className="item-name">
          {item.name}
        </Link>
        <p className="item-category">{item.category}</p>
        <div className="item-price">${item.price}</div>
      </div>

      <div className="quantity-controls">
        <button 
          onClick={handleDecrease}
          className="quantity-btn"
          disabled={item.quantity <= 1}
        >
          <FaMinus />
        </button>
        
        <span className="quantity">{item.quantity}</span>
        
        <button 
          onClick={handleIncrease}
          className="quantity-btn"
        >
          <FaPlus />
        </button>
      </div>

      <div className="item-subtotal">
        ${subtotal.toFixed(2)}
      </div>

      <button 
        onClick={handleRemove}
        className="remove-btn"
        aria-label="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItem