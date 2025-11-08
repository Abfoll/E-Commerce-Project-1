import React, { useState, useEffect } from 'react'
import { BsPlus, BsSearch } from 'react-icons/bs'
import DataTable from '../components/DataTable'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts()
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Error loading products:', error)
      // Fallback data
      setProducts([
        { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock: 25, status: 'active' },
        { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 15, status: 'active' },
        { id: 3, name: 'Cotton T-Shirt', category: 'Clothing', price: 29.99, stock: 50, status: 'active' },
        { id: 4, name: 'Camera', category: 'Electronics', price: 899.99, stock: 8, status: 'inactive' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const productData = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      status: formData.get('status')
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
      } else {
        await createProduct(productData)
      }
      loadProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id)
        loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const productColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price', format: (value) => `$${value}` },
    { header: 'Stock', accessor: 'stock' },
    { 
      header: 'Status', 
      accessor: 'status', 
      format: (value) => (
        <span className={`status status-${value === 'active' ? 'completed' : 'cancelled'}`}>
          {value}
        </span>
      )
    }
  ]

  const productActions = [
    { label: 'Edit', type: 'primary', onClick: handleEdit },
    { label: 'Delete', type: 'danger', onClick: handleDelete }
  ]

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>PRODUCT MANAGEMENT</h3>
        <button 
          className='btn btn-primary'
          onClick={() => {
            setShowForm(true)
            setEditingProduct(null)
          }}
        >
          <BsPlus /> Add Product
        </button>
      </div>

      <div className='table-container' style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <BsSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 10px 10px 35px',
                width: '100%',
                background: '#1d2634',
                border: '1px solid #34495e',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div>Loading products...</div>
        ) : (
          <DataTable 
            data={filteredProducts} 
            columns={productColumns}
            actions={productActions}
          />
        )}
      </div>

      {showForm && (
        <div className="form-container">
          <h4>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={editingProduct?.name}
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" defaultValue={editingProduct?.category} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number" 
                name="price" 
                step="0.01"
                defaultValue={editingProduct?.price}
                required 
              />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input 
                type="number" 
                name="stock" 
                defaultValue={editingProduct?.stock}
                required 
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" defaultValue={editingProduct?.status || 'active'} required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default Products