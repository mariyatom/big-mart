import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/app.scss'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCartStore } from '../store/useCartStore' // Import Zustand store

const categories = [
  'Rice & Wheat',
  'Pickles & Chutney Powders',
  'Spices & Masalas',
  'Ready to Cook & Eat',
  'Oil, Ghee & Vinegar',
  'Snacks & Bakery',
  'Dals, Lentils & Pulses',
  'Salt, Sugar & Jaggery',
  'Sweets & Chocolates',
  'Miscellaneous',
  'Frozen Items',
]

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart) // Get cart from Zustand
  // Calculate total quantity in cart
  const totalCartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const handleCartClick = () => {
    navigate('/cart')
  }
  return (
    <div>
      <header>
        <h1 className="bigMart-heading">BIG MART</h1>
      </header>
      <div className="navbar">
        <Link to={`/`} className="nav-link active">
          HOME
        </Link>

        {/* Categories Dropdown */}
        <div
          className="nav-link categories-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          CATEGORIES
          {showDropdown && (
            <div className="dropdown-menu">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category}`}
                  className="dropdown-item"
                >
                  {category}
                  <span className="dropdown-icon">›</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to={`/ProductsList`} className="nav-link">
          PRODUCTS
        </Link>
        <Link to={`/about-us`} className="nav-link">
          ABOUT US
        </Link>

        {/* Right Side Icons */}
        <div className="nav-right">
          <SearchBar />
          <div className="user-icon nav-item">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="cart-icon nav-item" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{totalCartQuantity}</span>
            {/* Show cart count */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
