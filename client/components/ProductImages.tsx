import React from 'react'
import { Product } from '../../models/product'

interface ProductImagesProps {
  product: Product
}

const ProductImages = ({ product }: ProductImagesProps) => {
  return (
    <div className="product-images">
      <div className="thumbnail-container">
        <img src={product.image} alt={product.name} className="thumbnail" />
      </div>
      <div className="main-image-container">
        <img src={product.image} alt={product.name} className="main-image" />
      </div>
    </div>
  )
}

export default ProductImages
