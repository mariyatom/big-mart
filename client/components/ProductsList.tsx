import { Category } from '../../models/category'
import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts' // Import useProducts hook
import { useCartStore } from '../store/useCartStore' // Zustand store
import ErrorMessage from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'
import ProductsByCategory from './ProductsByCategory'

function ProductsList() {
  const addToCart = useCartStore((state) => state.addToCart) // Zustand function

  // Fetch categories
  const {
    data: categoriesData,
    isPending: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorMessage,
  } = useCategories()

  // Fetch products
  const {
    data: productsData,
    isPending: productsLoading,
    isError: productsError,
    error: productsErrorMessage,
  } = useProducts()

  // Handle Loading State
  if (categoriesLoading || productsLoading) {
    return <LoadingIndicator />
  }

  // Handle Error State
  if (categoriesError || productsError) {
    return (
      <ErrorMessage error={categoriesErrorMessage || productsErrorMessage} />
    )
  }

  // Extract data
  const categories = categoriesData?.categories ?? []
  const products = productsData?.products ?? []

  // Filter products by category
  const filterProductsByCategory = (categoryId: number) => {
    return products.filter((product) => product.category_id === categoryId)
  }

  return (
    <div className="products-container">
      {categories.length > 0 ? (
        categories.map((category: Category) => (
          <ProductsByCategory
            key={category.id}
            category={category}
            filteredProducts={filterProductsByCategory(category.id)}
            addToCart={addToCart} // Use Zustand function
          />
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  )
}

export default ProductsList
