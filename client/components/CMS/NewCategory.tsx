import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import EditCategoryForm from './EditCategoryForm'
import { useCreateCategory } from '../../hooks/useCategories'
import LoadingIndicator from '../LoadingIndicator'
import ErrorMessage from '../ErrorMessage'

function NewCategory() {
  const navigate = useNavigate()
  const createCategory = useCreateCategory()

  const [formData, setFormData] = useState({
    category: '',
    link: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating new category:', formData)
    const NewFormData = {
      ...formData,
      image:
        formData.image.trim() ||
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
    }

    try {
      await createCategory.mutateAsync(NewFormData)
      setTimeout(() => navigate('/cms/admin-category'), 100)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred while creating the category.')
      }
    }
  }

  if (createCategory.isPending) return <LoadingIndicator />
  if (createCategory.isError)
    return <ErrorMessage error={createCategory.error} />

  return (
    <div>
      <h2>New Category</h2>
      <EditCategoryForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default NewCategory
