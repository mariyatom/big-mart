// components/CategoryProducts.tsx
import { Link, useParams } from 'react-router-dom'
// import { categories } from '../data/categories'
// import { products } from '../data/products'
import '../styles/categoryProducts.scss'
import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts'

function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>()

  const {
    data: categoryData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories()
  const {
    data: productData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts()

  if (!categoryName) {
    return <h2 className="text-center text-red-500">Category Not Found</h2>
  }

  if (categoriesLoading || productsLoading) return <p>Loading...</p>
  if (categoriesError || productsError) return <p>Error loading data.</p>

  // Decode the category name from the URL
  const decodedCategoryName = decodeURIComponent(categoryName)

  // Find category by name (case-insensitive)
  const category = categoryData?.categories.find(
    (cat) =>
      cat.category.toLowerCase().replace(/\s+/g, '-') ===
      decodedCategoryName.toLowerCase().replace(/\s+/g, '-')
  )

  if (!category) {
    return <h2 className="text-center text-red-500">Category Not Found</h2>
  }

  // Filter products by category ID
  const filteredProducts =
    productData?.products.filter(
      (product) => product.category_id === category.id
    ) || []

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
