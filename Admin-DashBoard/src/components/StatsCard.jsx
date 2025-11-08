import React from 'react'

const StatsCard = ({ title, value, icon, color, change }) => {
  return (
    <div className='card' style={{ backgroundColor: color }}>
      <div className='card-inner'>
        <h3>{title}</h3>
        {icon}
      </div>
      <h1>{value}</h1>
      {change && (
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
        </p>
      )}
    </div>
  )
}

export default StatsCard