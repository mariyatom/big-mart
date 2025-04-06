import React, { useState } from 'react'
import { Category } from '../../../models/category'
import { useCategories, useDeleteCategory } from '../../hooks/useCategories'
import ErrorMessage from '../ErrorMessage'
import LoadingIndicator from '../LoadingIndicator'
import '../../styles/adminCategory.scss'
import { useNavigate } from 'react-router-dom'

function AdminCategory() {
  const navigate = useNavigate()
  const { data: categoriesData, isLoading, isError, error } = useCategories()
  const deleteCategory = useDeleteCategory()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isError) {
    return <ErrorMessage error={error} />
  }

  const categories = categoriesData?.categories ?? []

  const handleEdit = (id: number) => {
    // Handle edit functionality here
    navigate(`/cms/edit-category/${id}`)
  }

  const handleNew = () => {
    navigate('/cms/new-category')
  }

  const handleDelete = async (id: number) => {
    // Handle delete functionality here
    await deleteCategory.mutateAsync(id)
  }

  return (
    <div>
      <button className="new-button" onClick={() => handleNew()}>
        New
      </button>
      <h2>Categories</h2>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>Link</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item: Category, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.category}</td>
              <td>{item.link}</td>
              <td>
                <img
                  src={item.image}
                  alt="item category"
                  className="cateImage"
                />
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminCategory
