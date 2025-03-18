import React from 'react'
import { Category } from '../../models/category'
import { Product } from '../../models/product'
import '../styles/products.scss'
import ProductCard from './ProductCard'

interface ProductProps {
  category: Category
  filteredProducts: Product[]
  addToCart: (product: Product, quantity: number) => void
}

const ProductsByCategory = ({
  category,
  filteredProducts,
  addToCart,
}: ProductProps) => {
  return (
    <div className="product-category">
      <h2 className="category-title">{category.category}</h2>
      <div className="products-grid">
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsByCategory
