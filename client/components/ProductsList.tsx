import { useState } from 'react'
import { Category } from '../../models/category'
import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/useCartStore'
import ErrorMessage from './ErrorMessage'
import FilterSidebar from './FilterSidebar'
import LoadingIndicator from './LoadingIndicator'
import ProductsByCategory from './ProductsByCategory'

function ProductsList() {
  const addToCart = useCartStore((state) => state.addToCart)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]) // Store selected categories

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

  if (categoriesLoading || productsLoading) {
    return <LoadingIndicator />
  }

  if (categoriesError || productsError) {
    return (
      <ErrorMessage error={categoriesErrorMessage || productsErrorMessage} />
    )
  }

  const categories = categoriesData?.categories ?? []
  const products = productsData?.products ?? []

  //  **Filter categories based on selected checkboxes**
  const filteredCategories =
    selectedCategories.length > 0
      ? categories.filter((category) =>
          selectedCategories.includes(category.category)
        )
      : categories

  // **Filter products by selected category**
  const filterProductsByCategory = (categoryId: number) => {
    return products.filter((product) => product.categoryId === categoryId)
  }

  return (
    <div className="products-container">
      <aside className="sidebar">
        <FilterSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories} //  Pass state to FilterSidebar
        />
      </aside>
      <main className="products">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category: Category) => (
            <ProductsByCategory
              key={category.id}
              category={category}
              filteredProducts={filterProductsByCategory(category.id)}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>No products available for selected categories.</p>
        )}
      </main>
    </div>
  )
}

export default ProductsList
