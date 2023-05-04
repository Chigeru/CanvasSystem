import React from 'react'
import { Outlet } from 'react-router-dom'
import HeadNavigation from './Front/layout/headNavigation'

function Layout() {
  return (
    <div>
      <HeadNavigation />

      <Outlet />
      

      <footer>
        <p>
          Work in progress 
        </p>
      </footer>
    </div>
  )
}

export default Layout