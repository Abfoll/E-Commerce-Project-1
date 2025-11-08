import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaCreditCard, FaUser, FaMapMarkerAlt } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState('shipping')
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Order Notes
    notes: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: cart.items,
        total: getCartTotal(),
        customerInfo: {
          shipping: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          billing: {
            // In a real app, you might have different billing info
            ...formData
          }
        },
        paymentMethod: 'credit_card',
        notes: formData.notes
      }

      const response = await createOrder(orderData)
      setOrderDetails(response.data.order)
      setOrderComplete(true)
      clearCart()
      
    } catch (error) {
      console.error('Error creating order:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (orderComplete && orderDetails) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">🎉</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            
            <div className="order-details">
              <div className="detail-item">
                <span>Order Number:</span>
                <strong>{orderDetails.trackingNumber}</strong>
              </div>
              <div className="detail-item">
                <span>Total Amount:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <div className="detail-item">
                <span>Estimated Delivery:</span>
                <strong>3-5 business days</strong>
              </div>
            </div>

            <div className="success-actions">
              <button 
                onClick={() => navigate('/track-order', { 
                  state: { trackingNumber: orderDetails.trackingNumber } 
                })}
                className="btn btn-primary"
              >
                Track Your Order
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="btn btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${activeStep === 'shipping' ? 'active' : ''}`}>
              <FaUser />
              <span>Shipping</span>
            </div>
            <div className={`step ${activeStep === 'payment' ? 'active' : ''}`}>
              <FaCreditCard />
              <span>Payment</span>
            </div>
            <div className={`step ${activeStep === 'review' ? 'active' : ''}`}>
              <FaLock />
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmitOrder} className="checkout-form">
            {/* Shipping Information */}
            {activeStep === 'shipping' && (
              <div className="form-section">
                <h3>
                  <FaUser className="section-icon" />
                  Shipping Information
                </h3>
                
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep('payment')}
                  className="btn btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Information */}
            {activeStep === 'payment' && (
              <div className="form-section">
                <h3>
                  <FaCreditCard className="section-icon" />
                  Payment Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Name on Card *</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setActiveStep('shipping')}
                    className="btn btn-outline"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('review')}
                    className="btn btn-primary"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review Order */}
            {activeStep === 'review' && (
              <div className="form-section">
                <h3>
                  <FaLock className="section-icon" />
                  Review Your Order
                </h3>

                <div className="order-review">
                  <div className="order-items">
                    <h4>Order Items</h4>
                    {cart.items.map(item => (
                      <div key={item.id} className="review-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h5>{item.name}</h5>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">
                    <h4>Order Summary</h4>
                    <div className="summary-row">
                      <span>Subtotal:</span>
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
                  </div>

                  <div className="shipping-info">
                    <h4>Shipping Address</h4>
                    <p>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}
                    </p>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setActiveStep('payment')}
                    className="btn btn-outline"
                  >
                    Back to Payment
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>

                <div className="security-notice">
                  <FaLock />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            )}
          </form>

          {/* Order Summary Sidebar */}
          <div className="checkout-sidebar">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cart.items.map(item => (
                  <div key={item.id} className="summary-item">
                    <span className="item-name">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout