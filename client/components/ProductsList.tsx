import React, { useEffect, useState } from 'react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductsByCategory from './ProductsByCategory'
import { Product } from '../../models/product'

function ProductsList() {
  // TODO: this is the 'local' cart state.
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  console.log('first load cart', cart)

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const filterProductsByCategory = (categoryId: number) => {
    return products.filter((product) => product.category_id === categoryId)
  }
  // TODO: this addToCart will call a mutation on an existing cartData query, with react query
  // (you will need to define the query and the mutation already, ideally in the hooks folder)
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { product, quantity }]
      }
    })

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
