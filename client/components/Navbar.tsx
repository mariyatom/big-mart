import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import { useCartStore } from '../store/useCartStore' // Import Zustand store
import '../styles/app.scss'
import SearchBar from './SearchBar'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart) // Get cart from Zustand

  // Fetch categories dynamically
  const { data, isLoading, isError, error } = useCategories()

  // Handle Loading State
  if (isLoading) {
    return <LoadingIndicator />
  }

  // Handle Error State
  if (isError) {
    return <ErrorMessage error={error} />
  }

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
              {data?.categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.category}`}
                  className="dropdown-item"
                >
                  {category.category}
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
          <div className="cart-icon nav-item" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{totalCartQuantity}</span>
            {/* Show cart count */}
          </div>
          <div className="user-icon nav-item">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Navbar
