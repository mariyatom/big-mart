import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import '../styles/checkoutPage.scss'
import { ChangeEvent, useState } from 'react'

const CheckoutPage = () => {
  const { cart } = useCartStore()
  const navigate = useNavigate()
  const [showSummary, setShowSummary] = useState(false)
  const [showPayment, setShowPayment] = useState(false) // New state for payment details

  // State to track form inputs
  const [customer, setCustomer] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    pickupTime: 'saturday-17-20',
  })

  // State to track payment inputs
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingFirstName: '',
    billingLastName: '',
    billingPhone: '',
    billingCountry: 'New Zealand',
    billingAddress: '',
    billingCity: '',
    billingRegion: 'Auckland',
    billingZip: '',
  })

  const calculateSubtotal = (): string => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2)
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }

  const handleContinue = () => {
    setShowSummary(true)
    setShowPayment(true)
  }

  const handlePlaceOrder = () => {
    // 1. Prepare order data
    const orderData = {
      customer,
      payment,
      cart,
    }
    // Implement order placement logic here
    console.log('Order placed:', { customer, payment, cart })
    // Navigate to order confirmation or thank you page
    navigate('/order-confirmation', { state: { customer, payment, cart } })
  }
  return (
    <div className="checkout-page">
      <a href="/" className="continue-browsing">
        Continue Browsing
      </a>

      <div className="customer-details">
        <h1>CHECKOUT</h1>
        {!showSummary ? (
          <div className="customerEnterInfo">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={customer.email}
              onChange={handleChange}
            />

            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={customer.firstName}
              onChange={handleChange}
            />

            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={customer.lastName}
              onChange={handleChange}
            />

            <label>Phone *</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={customer.phone}
              onChange={handleChange}
            />

            <label>Pick up day/time *</label>
            <select
              name="pickupTime"
              value={customer.pickupTime}
              onChange={handleChange}
            >
              <option value="saturday-17-20">Saturday (17:00-20:00)</option>
              <option value="sunday-14-18">Sunday (14:00-18:00)</option>
              <option value="friday-15-19">Friday (15:00-19:00)</option>
            </select>

            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        ) : (
          <div className="customer-info">
            <h3>Customer Details</h3>
            <p>Email: {customer.email}</p>
            <p>
              Name: {customer.firstName} {customer.lastName}
            </p>
            <p>Phone: {customer.phone}</p>
            <p>
              Pickup Time: {customer.pickupTime.replace('-', ' ').toUpperCase()}
            </p>
          </div>
        )}
        {/* Delivery Method Section */}
        <div className="delivery-method">
          <h3>Delivery Method</h3>
          <p>
            <strong>Pickup Location:</strong> 56 Galway street, Onehungaa,
            Auckland, 9658, New Zealand
          </p>
          <p>
            <strong>Available Pickup Times:</strong> Friday (17:00-20:00),
            Saturday (17:00-20:00), Sunday (12:00-17:00)
          </p>
          <p>
            <strong>Pickup Fee:</strong> Free
          </p>
          <p>
            <strong>Pickup Instructions:</strong> We will message you on the
            pick-up date, and you can inform us of the pick-up time.
          </p>
        </div>
        {showPayment && (
          <div className="payment-details">
            {/* Payment details input fields */}
            <h3>Payment Details</h3>
            <label>Card number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Enter number"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
            />
            <label>Expiration date</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM / YY"
              value={payment.expiryDate}
              onChange={handlePaymentChange}
            />
            <label>CVV/CVC</label>
            <input
              type="text"
              name="cvv"
              placeholder="3-4 digits"
              value={payment.cvv}
              onChange={handlePaymentChange}
            />
            <label>Cardholder name</label>
            <input
              type="text"
              name="cardholderName"
              placeholder="Enter full name"
              value={payment.cardholderName}
              onChange={handlePaymentChange}
            />
            <h3>Billing address</h3>
            <label>First name</label>
            <input
              type="text"
              name="billingFirstName"
              placeholder="Enter first name"
              value={payment.billingFirstName}
              onChange={handlePaymentChange}
            />
            <label>Last name</label>
            <input
              type="text"
              name="billingLastName"
              placeholder="Enter last name"
              value={payment.billingLastName}
              onChange={handlePaymentChange}
            />
            <label>Phone</label>
            <input
              type="text"
              name="billingPhone"
              placeholder="Enter phone number"
              value={payment.billingPhone}
              onChange={handlePaymentChange}
            />
            <label>Country / Region</label>
            <select
              name="billingCountry"
              value={payment.billingCountry}
              onChange={handlePaymentChange}
            >
              <option value="New Zealand">New Zealand</option>
              {/* Add more countries if needed */}
            </select>
            <label>Address</label>
            <input
              type="text"
              name="billingAddress"
              placeholder="Enter address"
              value={payment.billingAddress}
              onChange={handlePaymentChange}
            />
            <label>City</label>
            <input
              type="text"
              name="billingCity"
              placeholder="Enter city"
              value={payment.billingCity}
              onChange={handlePaymentChange}
            />
            <label>Region</label>
            <select
              name="billingRegion"
              value={payment.billingRegion}
              onChange={handlePaymentChange}
            >
              <option value="Auckland">Auckland</option>
              {/* Add more regions if needed */}
            </select>
            <label>Zip / Postal code</label>
            <input
              type="text"
              name="billingZip"
              placeholder="Enter zip/postal code"
              value={payment.billingZip}
              onChange={handlePaymentChange}
            />
            <div className="place-order-section">
              <div className="review-order-details">
                Review & place order
                <br />
                Review your details above and continue when you're ready.
              </div>
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order & Pay
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="order-summary">
        <div className="order-summary-header">
          <h3>Order summary ({cart.length})</h3>
          <a href="/cart" className="edit-cart">
            Edit Cart
          </a>
        </div>

        {cart.map((item) => (
          <div key={item.product.id} className="order-item">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="order-item-image"
            />
            <div className="order-item-details">
              <span className="product-name">{item.product.name}</span>
              <span className="quantity">Qty: {item.quantity}</span>
              <span className="price">${item.product.price.toFixed(2)}</span>
            </div>
          </div>
        ))}

        <hr />

        <p>
          Subtotal: <span>${calculateSubtotal()}</span>
        </p>
        <p>
          Pickup: <span>Free</span>
        </p>
        <p>
          GST: <span>$0.00</span>
        </p>

        <div className="total-price">
          <p>
            Total: <span>${calculateSubtotal()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
