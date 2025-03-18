// components/CategoryProducts.tsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import '../styles/categoryProducts.scss'

function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>()

  if (!categoryName) {
    return <h2 className="text-center text-red-500">Category Not Found</h2>
  }

  // Decode the category name from the URL
  const decodedCategoryName = decodeURIComponent(categoryName)

  // Log the decoded category name and each category name for debugging
  console.log('Decoded Category Name:', decodedCategoryName)
  categories.forEach((cat) => console.log('Category:', cat.category))

  // Find category by name (case-insensitive)
  const category = categories.find(
    (cat) =>
      cat.category.toLowerCase().replace(/\s+/g, '-') ===
      decodedCategoryName.toLowerCase().replace(/\s+/g, '-')
  )

  if (!category) {
    return <h2 className="text-center text-red-500">Category Not Found</h2>
  }

  // Filter products by category ID
  const filteredProducts = products.filter(
    (product) => product.category_id === category.id
  )
  return (
    <div className="category-products-container">
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">
          HOME
        </Link>
        /
        <Link to="/Categories" className="breadcrumb-link">
          CATEGORIES
        </Link>
        / {category.category.toUpperCase()}
      </div>

      <h1 className="category-title">{category.category}</h1>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                {product.currency}
                {product.price}
              </p>
              <Link
                to={`/products/${product.name}`}
                className="view-details-button"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryProducts
