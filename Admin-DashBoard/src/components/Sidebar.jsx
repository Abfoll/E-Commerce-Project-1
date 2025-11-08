import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: <BsGrid1X2Fill className='icon'/>, label: 'Dashboard' },
    { path: '/products', icon: <BsFillArchiveFill className='icon'/>, label: 'Products' },
    { path: '/orders', icon: <BsListCheck className='icon'/>, label: 'Orders' },
    { path: '/customers', icon: <BsPeopleFill className='icon'/>, label: 'Customers' },
    { path: '/settings', icon: <BsFillGearFill className='icon'/>, label: 'Settings' }
  ]

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header'/> ADMIN
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      
      <ul className='sidebar-list'>
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`sidebar-list-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path} onClick={() => window.innerWidth < 992 && OpenSidebar()}>
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar