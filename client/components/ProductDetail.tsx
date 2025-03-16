// components/ProductDetail.tsx
import React, { useState, ChangeEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import '../styles/productDetail.scss'
import { Product } from '../../models/product'

function ProductDetail() {
  const { productName } = useParams()
  const product: Product | undefined = products.find(
    (p) => p.name === productName
  )
  const [quantity, setQuantity] = useState<number>(1)
  const subtotal: string = product?.price
    ? (product.price * quantity).toFixed(2)
    : '0.00' //  undefined price

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1)
    setQuantity(newQuantity)
  }

  if (!product) {
    return <div>Product not found</div>
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
          <button className="add-to-cart-button">ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
