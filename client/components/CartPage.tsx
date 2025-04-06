import { useState, ChangeEvent } from 'react'
import '../styles/cartPage.scss'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore' // Zustand store
import { FaTrash } from 'react-icons/fa'

function CartPage() {
  const { cart, addToCart, removeFromCart } = useCartStore()

  const [pickupOption, setPickupOption] = useState('PICK UP')

  // Handle Pickup Option Change
  const handlePickupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPickupOption(event.target.value)
  }

  // Initialize state for quantities
  const initialQuantities = cart.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item.product.id] = item.quantity
      return acc
    },
    {}
  )

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    initialQuantities
  )

  // Handle quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities({ ...quantities, [productId]: Math.max(1, newQuantity) })
    const product = cart.find((item) => item.product.id === productId)?.product
    if (product) {
      addToCart(product, newQuantity - (quantities[productId] || 0))
    }
  }

  // Handle item removal
  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  // Calculate subtotal
  const calculateSubtotal = (): string => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2)
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">MY CART</h1>

      {/* Notification Message */}
      <div className="cart-message">
        <p>
          <i className="fa fa-info-circle"></i> Please, hurry! Someone has
          placed an order on one of the items you have in the cart. We'll keep
          it for you for <strong>10:13</strong> minutes..
        </p>
      </div>

      {/* Cart Content: Products + Order Summary */}
      <div className="cart-content">
        {/* Left - Products List */}
        <div className="cart-items">
          <h3 className="cart-header">PRODUCTS</h3>

          {cart.map((item) => (
            <div key={item.product.id} className="cart-item">
              {/* Product Image */}
              <img
                src={item.product.image}
                alt={item.product.name}
                className="cart-item-image"
              />

              {/* Product Details */}
              <div className="cart-item-details">
                <Link to={`/products/${encodeURIComponent(item.product.name)}`}>
                  <span className="product-name">{item.product.name}</span>
                </Link>

                <div className="cart-item-row">
                  <span className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </span>

                  {/* Quantity Input */}
                  <select
                    className="quantity-dropdown"
                    value={quantities[item.product.id]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleQuantityChange(
                        item.product.id,
                        parseInt(e.target.value) || 1
                      )
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>

                  <span className="cart-item-total">
                    ${' '}
                    {(item.product.price * quantities[item.product.id]).toFixed(
                      2
                    )}
                  </span>

                  {/* Remove Button */}
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Summary */}
        <div className="order-summary">
          <h3>ORDER SUMMARY</h3>
          <p className="total-price">${calculateSubtotal()}</p>

          {/* Pickup Section */}
          <p className="pickup-label">
            Pickup <span className="pickup-price">FREE</span>
          </p>
          <p className="pickup-location">Auckland, New Zealand</p>

          {/* Pickup Dropdown */}
          <select
            className="pickup-dropdown"
            value={pickupOption}
            onChange={handlePickupChange}
          >
            <option value="PICK UP">PICK UP</option>
            <option value="DELIVERY" disabled>
              DELIVERY (Not Available)
            </option>
          </select>

          <p className="total-price">Total: ${calculateSubtotal()}</p>

          <Link
            to={cart.length > 0 ? '/checkout' : '#'}
            className={`checkout-button ${cart.length === 0 ? 'disabled' : ''}`}
            onClick={(e) => {
              if (cart.length === 0) {
                e.preventDefault()
                alert(
                  'Your cart is empty! Add items before proceeding to checkout.'
                )
              }
            }}
          >
            Proceed to Checkout
          </Link>
          <Link to="/ProductsList" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
