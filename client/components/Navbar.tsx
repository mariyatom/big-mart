import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
function Navbar() {
  return (
    <div>
      <header>
        <h1 className="bigMart-heading">BIG MART</h1>
      </header>
      <div className="navbar">
        <Link to={`/`} className="nav-link active">
          HOME
        </Link>
        <Link to={`ProductsList/`} className="nav-link">
          PRODUCTS
        </Link>
        <Link to={`about-us/`} className="nav-link">
          ABOUT US
        </Link>
      </div>
    </div>
  )
}

export default Navbar
