import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
import SearchBar from './SearchBar' // Import the SearchBar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons' // Import icons

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
        <Link to={`/ProductsList`} className="nav-link">
          PRODUCTS
        </Link>
        <Link to={`/about-us`} className="nav-link">
          ABOUT US
        </Link>
        <div className="nav-right">
          <SearchBar />
          <div className="user-icon nav-item">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="cart-icon nav-item">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
