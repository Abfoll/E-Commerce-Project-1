import { useCart } from '../context/CartContext'

export const useCartActions = () => {
  const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart()

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity)
    // You can add toast notification here
    console.log(`Added ${quantity} ${product.name} to cart`)
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
    // You can add toast notification here
    console.log('Product removed from cart')
  }

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity)
  }

  const handleClearCart = () => {
    clearCart()
    console.log('Cart cleared')
  }

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart
  }
}