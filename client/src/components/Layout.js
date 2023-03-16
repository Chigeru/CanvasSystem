import React from 'react'
import { Outlet } from 'react-router-dom'
import HeadNavigation from './layout/headNavigation'

function Layout() {
  return (
    <div>
      <HeadNavigation />
      
      <Outlet />

      <footer></footer>
    </div>
  )
}

export default Layout