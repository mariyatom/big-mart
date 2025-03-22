// components/ProductDetail.tsx
import React, { useState, ChangeEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCartStore } from '../store/useCartStore' // Import Zustand store
import '../styles/productDetail.scss'
import { Product } from '../../models/product'

function ProductDetail() {
  const { productName } = useParams()

  const product: Product | undefined = products.find(
    (p) => p.name === productName
  )
  if (!product) {
    return <div>Product not found</div>
  }
  // Access the cart from Zustand store
  const cart = useCartStore((state) => state.cart)
  const addToCart = useCartStore((state) => state.addToCart) // Access addToCart from Zustand

  // Find the existing item in the cart
  const existingCartItem = cart.find((item) => item.product.id === product?.id)
  const existingQuantity = existingCartItem ? existingCartItem.quantity : 0

  const [quantity, setQuantity] = useState<number>(1)
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
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">
          HOME
        </Link>
        /
        <Link to="/ProductsList" className="breadcrumb-link">
          PRODUCTS
        </Link>
        /{product.name.toUpperCase()}
      </div>
      <div className="product-content">
        <div className="product-images">
          <div className="thumbnail-container">
            <img src={product.image} alt={product.name} className="thumbnail" />
          </div>
          <div className="main-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="main-image"
            />
          </div>
        </div>
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
            <p className="in-cart">In Cart: {existingQuantity}</p>
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
