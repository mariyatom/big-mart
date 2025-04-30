// components/ProductDetail.tsx
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../models/product'
import { useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/useCartStore' // Import Zustand store
import '../styles/productDetail.scss'
import Breadcrumbs from './Breadcrumbs'
import ErrorMessage from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'
import ProductImages from './ProductImages'

function ProductDetail() {
  const { productName } = useParams() // Get product name from URL

  const { data, isPending, isError, error } = useProducts() // Fetch products

  // Access the cart from Zustand store
  const cart = useCartStore((state) => state.cart)
  const addToCart = useCartStore((state) => state.addToCart) // Access addToCart from Zustand

  const [quantity, setQuantity] = useState<number>(1)

  // Handle loading and error states
  if (isPending) return <LoadingIndicator />
  if (isError) return <ErrorMessage error={error} />

  // Find the product based on the name from URL params
  const product: Product | undefined = data?.products.find(
    (p) => p.name === productName,
  )
  if (!product) {
    return <div>Product not found</div>
  }

  // Find the existing item in the cart
  const existingCartItem = cart.find((item) => item.product.id === product?.id)
  const existingQuantity = existingCartItem ? existingCartItem.quantity : 0

  const subtotal: string = product?.price
    ? (product.price * quantity).toFixed(2) // Only multiply by input quantity
    : '0.00'

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }
  return (
    <div className="product-detail-container">
      <Breadcrumbs productName={product.name} />
      <div className="product-content">
        <ProductImages product={product} />
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="subtotal">Subtotal: ${subtotal}</p>
          <div className="quantity-section">
            <label htmlFor="quantity">QUANTITY</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="quantity-input"
            />
          </div>
          {existingQuantity > 0 && (
            <p className="in-cart">
              <FontAwesomeIcon icon={faShoppingCart} />: {existingQuantity}
            </p>
          )}
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
