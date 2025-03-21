// components/CartPage.tsx
import { useState, ChangeEvent } from 'react'
import '../styles/cartPage.scss'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import { Product } from '../../models/product'

interface CartItem {
  productId: string
  quantity: number
}

function CartPage() {
  // TODO: in this component, you will need to make a useQuery call for the cartData.
  const cartItems: CartItem[] = [
    {
      productId: 'ammamas_mango_pickle_500g',
      quantity: 2,
    },
  ]

  const initialQuantities = cartItems.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item.productId] = item.quantity
      return acc
    },
    {}
  )

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    initialQuantities
  )

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities({ ...quantities, [productId]: newQuantity })
  }

  const handleRemoveItem = (productId: string) => {
    console.log(`Remove item with ID: ${productId}`)
  }

  const calculateSubtotal = (): string => {
    return cartItems
      .reduce((total: number, item: CartItem) => {
        const product: Product | undefined = products.find(
          (p) => p.id === +item.productId
        )
        if (product) {
          return total + (product.price || 0) * quantities[item.productId]
        }
        return total
      }, 0)
      .toFixed(2)
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>MY CART</h1>
        <div className="cart-message">
          <p>
            <i className="fa fa-info-circle"></i> Please hurry! Someone has
            placed an order on one of the items you have in the cart. We'll keep
            it for you for 28:00 minutes.
          </p>
        </div>
      </div>
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-items-header">
            <span>PRODUCTS</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>
          {cartItems.map((item: CartItem) => {
            const product: Product | undefined = products.find(
              (p) => p.id === +item.productId
            )
            if (!product) return null
            return (
              <div className="cart-item" key={item.productId}>
                <div className="item-details">
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </div>
                <span>${product.price}</span>
                <div className="quantity-controls">
                  <input
                    type="number"
                    value={quantities[item.productId]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuantityChange(
                        item.productId,
                        parseInt(e.target.value)
                      )
                    }
                    min="1"
                  />
                </div>
                <span>
                  $
                  {((product.price || 0) * quantities[item.productId]).toFixed(
                    2
                  )}
                </span>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  X
                </button>
              </div>
            )
          })}
          <div className="additional-comments">
            <p>Additional comments</p>
            <textarea placeholder="Needed reminders for seller..." />
          </div>
        </div>
        <div className="order-summary">
          <h2>ORDER SUMMARY</h2>
          <p>${calculateSubtotal()}</p>
          <div className="coupon-code">
            <p>Coupon Code:</p>
            <input
              type="text"
              placeholder="Coupon code will be applied on the checkout page"
            />
          </div>
          <p>${calculateSubtotal()}</p>
          <Link to="/checkout" className="checkout-button">
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
