import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "The Trailblazer Backpack",
      price: "$89.99",
      rating: "⭐⭐⭐⭐⭐",
      category: "outdoor",
      image: "/images/backpack.jpg"
    },
    {
      id: 2,
      name: "HydraGlow Face Serum",
      price: "$24.99",
      rating: "⭐⭐⭐⭐",
      category: "beauty",
      image: "/images/serum.jpg"
    },
    {
      id: 3,
      name: "Artisan Throw Blanket",
      price: "$45.50",
      rating: "⭐⭐⭐⭐⭐",
      category: "home",
      image: "/images/blanket.jpg"
    },
    {
      id: 4,
      name: "Adventure Hiking Boots",
      price: "$129.99",
      rating: "⭐⭐⭐⭐⭐",
      category: "outdoor",
      image: "/images/boots.jpg"
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Outdoor & Adventure Gear",
      description: "Gear up for your next journey. Discover durable backpacks, reliable tents, and essential accessories for every explorer.",
      productCount: 98,
      icon: "🏕️",
      link: "/category/outdoor",
      bgColor: "#e8f5e8"
    },
    {
      id: 2,
      name: "Beauty & Personal Care",
      description: "Unleash your glow. Explore our collection of makeup, skincare, and grooming essentials for your daily routine.",
      productCount: 134,
      icon: "💄",
      link: "/category/beauty",
      bgColor: "#ffe8f0"
    },
    {
      id: 3,
      name: "Home & Learning",
      description: "Create your perfect space. Find everything from plush home textiles to engaging educational toys and puzzles.",
      productCount: 37,
      icon: "🏠",
      link: "/category/home",
      bgColor: "#e8f0ff"
    }
  ];

  const features = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50"
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payment",
      description: "Shop with confidence with our 100% secure payment processing"
    },
    {
      id: 3,
      icon: "💬",
      title: "24/7 Support",
      description: "Our customer support team is here to help you, day or night"
    },
    {
      id: 4,
      icon: "💰",
      title: "Best Price Guarantee",
      description: "Found it cheaper? We'll match it! Guaranteed best prices online"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section - PERFECTED */}
      <section className="hero-perfected">
        <div className="hero-background-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="hero-main-container">
          {/* Left Content - Perfectly Balanced */}
          <div className="hero-content-perfected">
            <div className="content-wrapper">
              <div className="hero-badge-perfected">
                <span className="badge-text">🎉 Summer Sale - Up to 50% Off</span>
                <div className="badge-pulse"></div>
              </div>
              
              <h1 className="hero-title-perfected">
                <span className="title-line">Style That Fits</span>
                <span className="title-line accent-line">
                  Your Life
                </span>
              </h1>
              
              <p className="hero-subtitle-perfected">
                Discover curated collections for every aspect of your life. From outdoor adventures 
                to home comfort, find quality products that deliver exceptional value and style.
              </p>
              
              <div className="hero-stats-perfected">
                <div className="stat-item-perfected">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="divider"></div>
                <div className="stat-item-perfected">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Premium Brands</div>
                </div>
                <div className="divider"></div>
                <div className="stat-item-perfected">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
              
              <div className="hero-actions-perfected">
                <Link to="/products" className="btn-primary-perfected">
                  <span className="btn-content">
                    <span className="btn-icon">🛍️</span>
                    Shop Collection
                  </span>
                  <div className="btn-shine"></div>
                </Link>
                <Link to="/sale" className="btn-secondary-perfected">
                  <span className="btn-content">
                    <span className="btn-icon">🔥</span>
                    View Sale Items
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Visual - Perfectly Balanced */}
          <div className="hero-visual-perfected">
            <div className="visual-container">
              {/* Main Featured Product */}
              <div className="featured-product-main">
                <div className="product-card-main">
                  <div className="product-image-main">
                    <div className="image-content">🎒</div>
                  </div>
                  <div className="product-info-main">
                    <h4>Trailblazer Pro</h4>
                    <div className="price">$89.99</div>
                  </div>
                  <div className="product-badge-main">Bestseller</div>
                </div>
              </div>
              
              {/* Floating Product Cards */}
              <div className="floating-product product-1">
                <div className="mini-product-card">
                  <div className="mini-image">💄</div>
                </div>
              </div>
              
              <div className="floating-product product-2">
                <div className="mini-product-card">
                  <div className="mini-image">🏠</div>
                </div>
              </div>
              
              <div className="floating-product product-3">
                <div className="mini-product-card">
                  <div className="mini-image">👟</div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="visual-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-dot-grid"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator-perfected">
          <div className="scroll-text">Explore More</div>
          <div className="scroll-arrow-perfected">
            <div className="arrow-line"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
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

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of products curated just for you</p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={category.link} 
                className="category-card"
                style={{ '--bg-color': category.bgColor }}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-footer">
                    <span className="product-count">{category.productCount} products</span>
                    <span className="category-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <p>Discover our most popular and trending items</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="image-placeholder">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="image-fallback">🛒</div>
                    )}
                  </div>
                  <div className="product-badge">Bestseller</div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-rating">{product.rating}</div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="wishlist-btn">❤️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="see-all-container">
            <Link to="/products" className="see-all-link">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Join the StyleCart Family</h2>
            <p>Subscribe to get exclusive deals, style tips, and early access to new arrivals</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <p className="newsletter-note">By subscribing, you agree to our Privacy Policy</p>
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="about-teaser">
        <div className="container">
          <div className="about-content">
            <h2>More Than Just a Store</h2>
            <p>
              At StyleCart, we believe shopping should be an experience. We carefully curate 
              each product to ensure quality, value, and style. Our mission is to help you 
              discover products that enhance your lifestyle while providing exceptional 
              customer service every step of the way.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">5★</div>
                <div className="stat-label">Rated Service</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Quality Guarantee</div>
              </div>
              <div className="stat">
                <div className="stat-number">Fast</div>
                <div className="stat-label">Delivery</div>
              </div>
            </div>
            <Link to="/about" className="learn-more-link">
              Our Story →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;