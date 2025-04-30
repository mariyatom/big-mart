import { useLocation } from 'react-router-dom'
import CmsNavbar from './CmsNavbar'

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
