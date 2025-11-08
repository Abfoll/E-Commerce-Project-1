import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      }
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedItems))
        return { ...state, items: updatedItems }
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { ...state, items: newItems }
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(filteredItems))
      return { ...state, items: filteredItems }
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      return { ...state, items: updatedItems }
    
    case 'CLEAR_CART':
      localStorage.removeItem('cart')
      return { ...state, items: [] }
    
    default:
      return state
  }
}

const initialState = {
  items: []
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
    }
  }, [])

  const addToCart = (product, quantity = 1) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, quantity } 
    })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartItem = (productId) => {
    return cart.items.find(item => item.id === productId)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}