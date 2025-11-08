import React, { useState, useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import StatsCard from '../components/StatsCard'
import { BarChartComponent, LineChartComponent, PieChartComponent } from '../components/Chart'
import DataTable from '../components/DataTable'
import { getDashboardStats, getSalesData, getRecentOrders } from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [salesData, setSalesData] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsResponse, salesResponse, ordersResponse] = await Promise.all([
        getDashboardStats(),
        getSalesData(),
        getRecentOrders()
      ])
      
      setStats(statsResponse.data.data)
      setSalesData(salesResponse.data.data)
      setRecentOrders(ordersResponse.data.data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      // Fallback data
      setStats({
        totalRevenue: 12543.67,
        totalOrders: 324,
        totalProducts: 156,
        totalCustomers: 89
      })
      setSalesData([
        { name: 'Jan', sales: 4000, revenue: 2400 },
        { name: 'Feb', sales: 3000, revenue: 1398 },
        { name: 'Mar', sales: 2000, revenue: 9800 },
        { name: 'Apr', sales: 2780, revenue: 3908 },
        { name: 'May', sales: 1890, revenue: 4800 },
        { name: 'Jun', sales: 2390, revenue: 3800 }
      ])
      setRecentOrders([
        { id: 1, customer: 'John Doe', product: 'Wireless Headphones', amount: 79.99, status: 'completed' },
        { id: 2, customer: 'Jane Smith', product: 'Smart Watch', amount: 199.99, status: 'pending' },
        { id: 3, customer: 'Bob Johnson', product: 'Camera', amount: 899.99, status: 'completed' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Product', accessor: 'product' },
    { header: 'Amount', accessor: 'amount', format: (value) => `$${value}` },
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

  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'Clothing', value: 25 },
    { name: 'Home', value: 15 },
    { name: 'Sports', value: 10 },
    { name: 'Other', value: 5 }
  ]

  if (loading) {
    return <div className="main-container">Loading...</div>
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD OVERVIEW</h3>
      </div>

      <div className='main-cards'>
        <StatsCard
          title="TOTAL REVENUE"
          value={`$${stats?.totalRevenue?.toLocaleString() || '0'}`}
          icon={<BsFillArchiveFill className='card_icon' />}
          color="#2962ff"
          change={12.5}
        />
        <StatsCard
          title="TOTAL ORDERS"
          value={stats?.totalOrders || '0'}
          icon={<BsFillGrid3X3GapFill className='card_icon' />}
          color="#ff6d00"
          change={8.3}
        />
        <StatsCard
          title="TOTAL PRODUCTS"
          value={stats?.totalProducts || '0'}
          icon={<BsFillBellFill className='card_icon' />}
          color="#2e7d32"
          change={5.2}
        />
        <StatsCard
          title="TOTAL CUSTOMERS"
          value={stats?.totalCustomers || '0'}
          icon={<BsPeopleFill className='card_icon' />}
          color="#d50000"
          change={15.7}
        />
      </div>

      <div className='charts'>
        <div>
          <h4>Sales Overview</h4>
          <BarChartComponent 
            data={salesData} 
            dataKey1="sales" 
            dataKey2="revenue"
            color1="#8884d8"
            color2="#82ca9d"
          />
        </div>
        <div>
          <h4>Revenue Trend</h4>
          <LineChartComponent 
            data={salesData} 
            dataKey1="revenue" 
            dataKey2="sales"
            color1="#8884d8"
            color2="#82ca9d"
          />
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Product Categories</h4>
            <PieChartComponent data={categoryData} />
          </div>
          <div>
            <h4>Recent Orders</h4>
            <DataTable 
              data={recentOrders} 
              columns={orderColumns}
              actions={[
                { label: 'View', type: 'primary', onClick: (order) => console.log('View order:', order) },
                { label: 'Edit', type: 'success', onClick: (order) => console.log('Edit order:', order) }
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard