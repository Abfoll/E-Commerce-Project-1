import React, { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import { getCustomers } from '../services/api'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const response = await getCustomers()
      setCustomers(response.data.data || [])
    } catch (error) {
      console.error('Error loading customers:', error)
      // Fallback data
      setCustomers([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', orders: 5, joinDate: '2023-12-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', orders: 3, joinDate: '2024-01-05' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', orders: 8, joinDate: '2023-11-15' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567893', orders: 2, joinDate: '2024-01-10' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const customerColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Total Orders', accessor: 'orders' },
    { header: 'Join Date', accessor: 'joinDate' }
  ]

  const customerActions = [
    { label: 'View Profile', type: 'primary', onClick: (customer) => console.log('View customer:', customer) },
    { label: 'Send Email', type: 'success', onClick: (customer) => console.log('Send email to:', customer) }
  ]

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>CUSTOMER MANAGEMENT</h3>
      </div>

      <div className='table-container'>
        {loading ? (
          <div>Loading customers...</div>
        ) : (
          <DataTable 
            data={customers} 
            columns={customerColumns}
            actions={customerActions}
          />
        )}
      </div>
    </main>
  )
}

export default Customers