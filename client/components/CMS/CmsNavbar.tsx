import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import {
  FaBars,
  FaBox,
  FaCog,
  FaEnvelope,
  FaListAlt,
  FaSignOutAlt,
  FaStore,
  FaThList,
  FaUser,
} from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'
import '../../styles/cmsNavbar.scss'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const CmsNavbar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout, loginWithRedirect } = useAuth0()
  const handleSignOut = () => {
    console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect()
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="vertical-nav-project">
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="project-title">CMS</div>

        <IfNotAuthenticated>
          <div className="user-actions">
            <div className="logout" onClick={handleSignIn}>
              <FaSignOutAlt /> Login
            </div>
          </div>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <div className="user-actions">
            <a href="#" className="user-info">
              {user && <p> {user?.nickname}</p>} <FaUser />
            </a>
            <div className="logout" onClick={handleSignOut}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        </IfAuthenticated>
      </nav>

      {/* sidebarCms */}
      <IfAuthenticated>
        <nav className={`sidebarCms ${collapsed ? 'collapsed' : ''}`}>
          <div className="toggle-button" onClick={toggleCollapse}>
            <FaBars />
          </div>
          <ul className="nav-links">
            <li>
              <a href="#">
                <FaListAlt /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaEnvelope /> <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaCog /> <span>Settings</span>
              </a>
            </li>
            <li>
              <Link to="/cms/admin-category">
                <FaThList /> <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/cms/admin-Product">
                <FaBox /> <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/cms/order-history">
                <FaBox /> <span>Order History</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaStore /> <span>Big Mart</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IfAuthenticated>
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <Outlet />
      </div>

      {/* Main Content */}
      {/* <main className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <h1>I am the main content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem sint
          assumenda quae aliquid voluptatibus quia, ea, ad natus magni repellat
          earum, culpa iure tempore. Enim dolor eaque minima voluptas ducimus?
        </p>
      </main> */}
    </div>
  )
}

export default CmsNavbar
