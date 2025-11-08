import React, { useState } from 'react'

function Settings() {
  const [settings, setSettings] = useState({
    storeName: 'My Store',
    email: 'admin@example.com',
    currency: 'USD',
    timezone: 'UTC',
    notifications: true,
    autoBackup: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>SETTINGS</h3>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Store Name</label>
              <input 
                type="text" 
                name="storeName" 
                value={settings.storeName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Admin Email</label>
              <input 
                type="email" 
                name="email" 
                value={settings.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select name="currency" value={settings.currency} onChange={handleChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select name="timezone" value={settings.timezone} onChange={handleChange}>
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="CET">CET</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h4>Preferences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  name="notifications" 
                  checked={settings.notifications}
                  onChange={handleChange}
                />
                Enable Email Notifications
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  name="autoBackup" 
                  checked={settings.autoBackup}
                  onChange={handleChange}
                />
                Automatic Data Backup
              </label>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Settings