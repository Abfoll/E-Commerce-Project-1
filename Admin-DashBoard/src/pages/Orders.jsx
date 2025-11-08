import React, { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import { getOrders, updateOrderStatus } from '../services/api'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const response = await getOrders()
      setOrders(response.data.data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
      // Fallback data
      setOrders([
        { id: 1, customer: 'John Doe', email: 'john@example.com', total: 179.98, status: 'completed', date: '2024-01-15' },
        { id: 2, customer: 'Jane Smith', email: 'jane@example.com', total: 299.97, status: 'pending', date: '2024-01-16' },
        { id: 3, customer: 'Bob Johnson', email: 'bob@example.com', total: 899.99, status: 'completed', date: '2024-01-14' },
        { id: 4, customer: 'Alice Brown', email: 'alice@example.com', total: 129.99, status: 'cancelled', date: '2024-01-13' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (order, newStatus) => {
    try {
      await updateOrderStatus(order.id, newStatus)
      loadOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Email', accessor: 'email' },
    { header: 'Total', accessor: 'total', format: (value) => `$${value}` },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status', 
      format: (value) => (
        <span className={`status status-${value}`}>
          {value}
        </span>
      )
    }
  ]

  const orderActions = [
    { 
      label: 'Complete', 
      type: 'success', 
      onClick: (order) => handleStatusUpdate(order, 'completed'),
      show: (order) => order.status === 'pending'
    },
    { 
      label: 'Cancel', 
      type: 'danger', 
      onClick: (order) => handleStatusUpdate(order, 'cancelled'),
      show: (order) => order.status === 'pending'
    },
    { 
      label: 'View Details', 
      type: 'primary', 
      onClick: (order) => console.log('View order details:', order)
    }
  ]

  const filteredActions = (order) => {
    return orderActions.filter(action => !action.show || action.show(order))
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>ORDER MANAGEMENT</h3>
      </div>

      <div className='table-container'>
        {loading ? (
          <div>Loading orders...</div>
        ) : (
          <DataTable 
            data={orders} 
            columns={orderColumns}
            actions={filteredActions}
          />
        )}
      </div>
    </main>
  )
}

export default Orders