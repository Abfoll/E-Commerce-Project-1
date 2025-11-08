import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaShippingFast, 
  FaShieldAlt, 
  FaHeadset, 
  FaTag,
  FaShoppingCart  // ← ADD THIS MISSING IMPORT
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support'
    },
    {
      icon: <FaTag />,
      title: 'Best Prices',
      description: 'Guaranteed best prices online'
    }
  ]

  const footerLinks = {
    shop: [
      { label: 'All Products', path: '/products' },
      { label: 'Featured', path: '/products?featured=true' },
      { label: 'New Arrivals', path: '/products?new=true' },
      { label: 'Best Sellers', path: '/products?bestsellers=true' }
    ],
    support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'FAQ', path: '/faq' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' }
    ]
  }

  const socialLinks = [
    { icon: <FaFacebook />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaInstagram />, url: '#' },
    { icon: <FaLinkedin />, url: '#' }
  ]

  return (
    <footer className="footer">
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section">
              <div className="footer-brand">
                <FaShoppingCart className="brand-icon" /> {/* ← THIS LINE WAS CAUSING THE ERROR */}
                <span className="brand-name">ShopEasy</span>
              </div>
              <p className="footer-description">
                Your one-stop destination for all your shopping needs. 
                Quality products at affordable prices with fast delivery.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="social-link"
                    aria-label={`Follow us on ${social.icon.type.displayName}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer-section">
              <h4>Shop</h4>
              <ul className="footer-links">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-section">
              <h4>Support</h4>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h4>Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p>Subscribe to get special offers and updates</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} ShopEasy. All rights reserved.</p>
            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <span>Visa</span>
                <span>MasterCard</span>
                <span>PayPal</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer