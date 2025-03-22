import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/orderConfirmation.scss'

type Product = {
  id: string
  name: string
  price: number
}

type CartItem = {
  product: Product
  quantity: number
}

type Customer = {
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupTime: string
}

type Payment = {
  cardholderName: string
  billingAddress: string
  billingCity: string
}

type OrderState = {
  customer: Customer
  payment: Payment
  cart: CartItem[]
} | null

const OrderConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as OrderState

  if (!state) {
    return (
      <div className="order-confirmation">
        <p>Order confirmation details not found.</p>
        <button className="order-button" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    )
  }

  const { customer, payment, cart } = state

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, {customer.firstName}!</p>

      <h2>Customer Details</h2>
      <p>Email: {customer.email}</p>
      <p>
        Name: {customer.firstName} {customer.lastName}
      </p>
      <p>Phone: {customer.phone}</p>
      <p>Pickup Time: {customer.pickupTime.replace('-', ' ').toUpperCase()}</p>

      <h2>Payment Details</h2>
      <p>Cardholder: {payment.cardholderName}</p>
      <p>
        Billing Address: {payment.billingAddress}, {payment.billingCity}
      </p>

      <h2>Order Items</h2>
      <ul className="order-items">
        {cart.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - Qty: {item.quantity} - $
            {item.product.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <button className="order-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  )
}

export default OrderConfirmation
