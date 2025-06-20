import React, { useState } from 'react'
import { Product } from '../../models/product'
import { Link } from 'react-router-dom' // Import Link
import { useCartStore } from '../store/useCartStore' // Import Zustand store
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ProductCardProps {
  product: Product
  addToCart: (product: Product, quantity: number) => void
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1)
  const cart = useCartStore((state) => state.cart)

  const existingCartItem = cart.find((item) => item.product.id === product.id)
  const existingQuantity = existingCartItem ? existingCartItem.quantity : 0
  const subtotal = (product.price * (existingQuantity + quantity)).toFixed(2)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1)
    setQuantity(newQuantity)
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.name}`}>
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          <strong>
            {product.currency} {product.price}
          </strong>
        </p>
      </Link>{' '}
      <div className="quantity-container">
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          className="quantity-input"
        />
        {existingQuantity > 0 && (
          <p className="shoppingCartIcon">
            {' '}
            <FontAwesomeIcon icon={faShoppingCart} />: {existingQuantity}
          </p>
        )}
      </div>
      <p className="subtotal">
        Subtotal: {product.currency} {subtotal}
      </p>
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product, quantity)}
      >
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductCard
