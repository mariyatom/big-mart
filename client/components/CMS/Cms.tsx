import React from 'react'
import CmsNavbar from './CmsNavbar'
import { Outlet, useLocation } from 'react-router-dom'

function Cms() {
  const location = useLocation()
  const isCmsRoute = location.pathname.includes('/cms')
  return (
    <div>
      {isCmsRoute && <CmsNavbar />}
      {/* <main>
        <Outlet />
      </main> */}
    </div>
  )
}

export default Cms
