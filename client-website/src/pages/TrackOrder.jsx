import React, { useState } from 'react'
import { FaSearch, FaShippingFast, FaCheck, FaTimes, FaInfoCircle, FaBox, FaMapMarkerAlt } from 'react-icons/fa'
import { getOrder } from '../services/api'

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setLoading(true)
    setError('')
    
    try {
      // Mock order data since backend might not be ready
      const mockOrder = {
        id: 1,
        trackingNumber: trackingNumber,
        status: 'shipped',
        orderDate: '2024-01-15T10:30:00Z',
        estimatedDelivery: '2024-01-20T23:59:59Z',
        total: 179.98,
        items: [
          {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            price: 79.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
          },
          {
            id: 2,
            name: "Phone Case",
            price: 19.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400"
          }
        ],
        customerInfo: {
          shipping: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States'
          }
        },
        shippingUpdates: [
          {
            status: 'ordered',
            description: 'Order placed',
            date: '2024-01-15T10:30:00Z',
            location: 'Online Store'
          },
          {
            status: 'confirmed',
            description: 'Order confirmed',
            date: '2024-01-15T11:15:00Z',
            location: 'Warehouse'
          },
          {
            status: 'shipped',
            description: 'Package shipped',
            date: '2024-01-16T09:20:00Z',
            location: 'Distribution Center'
          },
          {
            status: 'out-for-delivery',
            description: 'Out for delivery',
            date: '2024-01-20T08:00:00Z',
            location: 'Local Facility'
          }
        ]
      }
      
      setOrder(mockOrder)
    } catch (err) {
      setError('Order not found. Please check your tracking number.')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheck className="status-icon completed" />
      case 'shipped':
      case 'out-for-delivery':
        return <FaShippingFast className="status-icon shipped" />
      case 'cancelled':
        return <FaTimes className="status-icon cancelled" />
      default:
        return <FaInfoCircle className="status-icon pending" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#10b981'
      case 'shipped':
      case 'out-for-delivery':
        return '#3b82f6'
      case 'cancelled':
        return '#ef4444'
      default:
        return '#f59e0b'
    }
  }

  const trackingSteps = [
    { status: 'ordered', label: 'Order Placed', description: 'Your order has been received' },
    { status: 'confirmed', label: 'Order Confirmed', description: 'We are processing your order' },
    { status: 'shipped', label: 'Shipped', description: 'Your order is on the way' },
    { status: 'out-for-delivery', label: 'Out for Delivery', description: 'Your order will arrive today' },
    { status: 'delivered', label: 'Delivered', description: 'Order delivered successfully' }
  ]

  const getCurrentStep = (status) => {
    const steps = {
      'ordered': 0,
      'confirmed': 1,
      'shipped': 2,
      'out-for-delivery': 3,
      'delivered': 4
    }
    return steps[status] || 0
  }

  return (
    <div className="track-order-page">
      <div className="container">
        <div className="page-header">
          <h1>Track Your Order</h1>
          <p>Enter your tracking number to check the status of your order</p>
        </div>

        {/* Tracking Form */}
        <div className="tracking-form-section">
          <form onSubmit={handleTrackOrder} className="tracking-form">
            <div className="form-group">
              <label>Tracking Number</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter your tracking number (e.g., TRK123456)"
                  className="form-control"
                  required
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Tracking...' : <><FaSearch /> Track Order</>}
                </button>
              </div>
              {error && <div className="alert alert-error">{error}</div>}
            </div>
          </form>
        </div>

        {/* Order Details */}
        {order && (
          <div className="order-details-section">
            {/* Order Summary */}
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="order-info-grid">
                <div className="info-item">
                  <span className="label">Order Number:</span>
                  <span className="value">#{order.id}</span>
                </div>
                <div className="info-item">
                  <span className="label">Tracking Number:</span>
                  <span className="value">{order.trackingNumber}</span>
                </div>
                <div className="info-item">
                  <span className="label">Order Date:</span>
                  <span className="value">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount:</span>
                  <span className="value">${order.total}</span>
                </div>
                <div className="info-item">
                  <span className="label">Status:</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="tracking-progress">
              <h3>Order Status</h3>
              <div className="progress-steps">
                {trackingSteps.map((step, index) => {
                  const isCompleted = index <= getCurrentStep(order.status)
                  const isCurrent = index === getCurrentStep(order.status)
                  
                  return (
                    <div 
                      key={step.status} 
                      className={`progress-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className="step-icon">
                        {isCompleted ? <FaCheck /> : <span>{index + 1}</span>}
                      </div>
                      <div className="step-content">
                        <h4>{step.label}</h4>
                        <p>{step.description}</p>
                        {order.shippingUpdates[index] && (
                          <small>{new Date(order.shippingUpdates[index].date).toLocaleString()}</small>
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className="step-connector"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items-section">
              <h3>Order Items</h3>
              <div className="order-items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="shipping-info-section">
              <div className="shipping-address">
                <h3>
                  <FaMapMarkerAlt /> Shipping Address
                </h3>
                <div className="address-details">
                  <p><strong>{order.customerInfo.shipping.firstName} {order.customerInfo.shipping.lastName}</strong></p>
                  <p>{order.customerInfo.shipping.address}</p>
                  <p>{order.customerInfo.shipping.city}, {order.customerInfo.shipping.state} {order.customerInfo.shipping.zipCode}</p>
                  <p>{order.customerInfo.shipping.country}</p>
                  <p>📞 {order.customerInfo.shipping.phone}</p>
                  <p>📧 {order.customerInfo.shipping.email}</p>
                </div>
              </div>

              <div className="shipping-carrier">
                <h3>
                  <FaBox /> Shipping Carrier
                </h3>
                <div className="carrier-details">
                  <p><strong>Standard Shipping</strong></p>
                  <p>Estimated delivery: 3-5 business days</p>
                  <p>Tracking provided via email and SMS</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="help-section">
          <h3>Need Help With Your Order?</h3>
          <div className="help-options">
            <div className="help-option">
              <FaInfoCircle />
              <div>
                <h4>Can't find your tracking number?</h4>
                <p>Check your email confirmation or order confirmation page. You can also contact our support team for assistance.</p>
              </div>
            </div>
            <div className="help-option">
              <FaShippingFast />
              <div>
                <h4>Shipping delays?</h4>
                <p>Delivery times may vary based on your location and carrier. Contact us if your order is significantly delayed beyond the estimated delivery date.</p>
              </div>
            </div>
            <div className="help-option">
              <FaBox />
              <div>
                <h4>Package not received?</h4>
                <p>If you haven't received your package within 2 days of the estimated delivery date, please contact our customer support immediately.</p>
              </div>
            </div>
          </div>

          <div className="contact-support">
            <h4>Still Need Help?</h4>
            <p>Our customer support team is available 24/7 to assist you with any order-related issues.</p>
            <div className="support-actions">
              <button className="btn btn-primary">Contact Support</button>
              <button className="btn btn-secondary">View FAQ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder