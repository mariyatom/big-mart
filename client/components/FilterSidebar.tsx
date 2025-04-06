import React from 'react'
import '../styles/FilterSidebar.scss'
import { useCategories } from '../hooks/useCategories'
import { Category } from '../../models/category' // ✅ Import Category type
import ErrorMessage from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'

interface FilterSidebarProps {
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  // Fetch categories
  const {
    data: categoriesData,
    isPending: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorMessage,
  } = useCategories()

  if (categoriesLoading) {
    return <LoadingIndicator />
  }

  if (categoriesError) {
    return <ErrorMessage error={categoriesErrorMessage} />
  }

  const categories = categoriesData?.categories ?? []

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="filter-sidebar">
      <h3>FILTER</h3>

      {/* Clear All Button */}
      <button className="clear-btn" onClick={clearFilters}>
        CLEAR ALL
      </button>

      {/* Category Filter */}
      <h4>Category</h4>
      {categories.map((category: Category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.category)}
            onChange={() => handleCheckboxChange(category.category)}
          />
          {category.category}
        </label>
      ))}
    </div>
  )
}

export default FilterSidebar
