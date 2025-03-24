import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

function SearchResult() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  // Fetch products
  const {
    data: productsData,
    isPending: productsLoading,
    isError: productsError,
    error: productsErrorMessage,
  } = useProducts(searchTerm)

  // Handle Loading State
  if (productsLoading) {
    return <LoadingIndicator />
  }

  // Handle Error State
  if (productsError) {
    return <ErrorMessage error={productsErrorMessage} />
  }

  // Extract data
  const products = productsData?.products ?? []

  return (
    <div className="category-products-container">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </div>
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

export default SearchResult
