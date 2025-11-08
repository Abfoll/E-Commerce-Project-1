import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      description: 'Latest gadgets, smartphones, laptops and more',
      count: 245,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      description: 'Fashion for men, women and kids',
      count: 189,
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 3,
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      description: 'Furniture, decor and garden supplies',
      count: 156,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      description: 'Sports equipment and outdoor gear',
      count: 98,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      description: 'Skincare, makeup and personal care',
      count: 134,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 6,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      description: 'Fiction, non-fiction and educational',
      count: 87,
      gradient: 'from-yellow-500 to-amber-600'
    }
  ]

  return (
    <div className="categories-page">
      <div className="container">
        <div className="page-header">
          <h1>Shop by Category</h1>
          <p>Browse our wide range of product categories</p>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.name.toLowerCase()}`}
              className="category-card"
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="product-count">{category.count} products</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories