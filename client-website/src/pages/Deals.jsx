import React from 'react'
import { FaFire, FaClock, FaTag } from 'react-icons/fa'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'

const Deals = () => {
  const { products, loading } = useProducts()

  // Filter products with discounts (mock data)
  const dealProducts = products.map(product => ({
    ...product,
    discount: product.id % 3 === 0 ? 30 : product.id % 2 === 0 ? 20 : 0,
    originalPrice: product.price * 1.5
  })).filter(product => product.discount > 0)

  const deals = [
    {
      icon: <FaFire />,
      title: 'Flash Sale',
      description: 'Limited time offers ending soon',
      endTime: '2024-01-20T23:59:59',
      color: 'bg-red-500'
    },
    {
      icon: <FaTag />,
      title: 'Daily Deals',
      description: 'New deals every day',
      endTime: '2024-01-19T23:59:59',
      color: 'bg-blue-500'
    },
    {
      icon: <FaClock />,
      title: 'Weekend Special',
      description: 'Special weekend discounts',
      endTime: '2024-01-21T23:59:59',
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="deals-page">
      <div className="container">
        <div className="page-header">
          <h1>Hot Deals & Offers</h1>
          <p>Don't miss out on these amazing discounts</p>
        </div>

        {/* Deal Banners */}
        <div className="deals-banner">
          {deals.map((deal, index) => (
            <div key={index} className="deal-card">
              <div className="deal-icon">
                {deal.icon}
              </div>
              <div className="deal-content">
                <h3>{deal.title}</h3>
                <p>{deal.description}</p>
                <div className="deal-timer">
                  <FaClock />
                  <span>Ends in 2 days</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Deals */}
        <div className="section-header">
          <h2>Featured Deals</h2>
          <p>Save big on these popular products</p>
        </div>

        <ProductGrid 
          products={dealProducts} 
          loading={loading}
        />

        {/* Newsletter */}
        <div className="deals-newsletter">
          <h2>Get Exclusive Deals</h2>
          <p>Subscribe to our newsletter and be the first to know about special offers</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button className="btn btn-primary">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deals