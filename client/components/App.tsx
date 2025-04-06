import { Outlet, useLocation } from 'react-router-dom'

import Navbar from './Navbar.tsx'

function App() {
  //const { data } = useFruits()

  const location = useLocation() //gets the current route

  /**
   * Add more paths if needed,
   * If the pathname matches or contains  /cms,
   *  <Navbar /> is not rendered*/
  const hideNavbarRoutes = ['/cms', '/order-confirmation', '/checkout']

  return (
    <>
      {/* !hideNavbarRoutes.includes(location.pathname) */}
      {!hideNavbarRoutes.some((route) => location.pathname.includes(route)) && (
        <Navbar />
      )}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
