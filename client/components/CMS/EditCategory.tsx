import { useNavigate, useParams } from 'react-router-dom'
import {
  useCategoryDataById,
  useUpdateCategory,
} from '../../hooks/useCategories'
import LoadingIndicator from '../LoadingIndicator'
import ErrorMessage from '../ErrorMessage'
import { useEffect, useState } from 'react'
import EditCategoryForm from './EditCategoryForm'

function EditCategory() {
  const params = useParams()
  const id = Number(params.id)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    id: 0,
    category: '',
    link: '',
    image: '',
  })

  const updateCategory = useUpdateCategory()

  const { data: category, isPending, isError, error } = useCategoryDataById(id)

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        category: category.category || '',
        link: category.link || '',
        image: category.image || '',
      })
    }
  }, [category])

  if (isPending) return <LoadingIndicator />
  if (isError) return <ErrorMessage error={error} />

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updating category form data:', formData)

    if (!updateCategory) {
      console.error('Update mutation is not available.')
      return
    }
    const updatedFormData = {
      ...formData,
      image:
        formData.image.trim() ||
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
    }

    try {
      await updateCategory.mutateAsync({ id, category: updatedFormData })
      setTimeout(() => navigate('/cms/admin-category'), 100) // Navigate after a short delay
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message) // Show error message in UI
      } else {
        alert('An unknown error occurred while updating the category.')
      }
    }
  }

  return (
    <div>
      <h2>Edit Category</h2>
      <EditCategoryForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditCategory
