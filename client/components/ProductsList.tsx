import React, { useState } from 'react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductsByCategory from './ProductsByCategory'
import { Product } from '../../models/product'

function ProductsList() {
  // TODO: this is the 'local' cart state.
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  console.log('first load cart', cart)

  const filterProductsByCategory = (categoryId: number) => {
    return products.filter((product) => product.category_id === categoryId)
  }
  // TODO: this addToCart will call a mutation on an existing cartData query, with react query
  // (you will need to define the query and the mutation already, ideally in the hooks folder)
  const addToCart = (product: Product, quantity: number) => {
    setCart([...cart, { product, quantity }])
    console.log(`Added ${quantity} of ${product.name} to cart.`)
  }

  return (
    <div className="products-container">
      {categories.map((category) => (
        <ProductsByCategory
          key={category.id}
          category={category}
          filteredProducts={filterProductsByCategory(category.id)}
          addToCart={addToCart}
        />
      ))}
    </div>
  )
}

export default ProductsList
