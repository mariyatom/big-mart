import { Category, CategoryData } from './../../models/category'
import request from 'superagent'

const rootUrl = '/api/v1'

// GET /api/v1/categories/:id

export async function getCategoryDataById(
  id: number
): Promise<Category | undefined> {
  try {
    const response = await request.get(`${rootUrl}/categories/${id}`)

    return response.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function updateCategory(id: Number, category: Category) {
  try {
    const res = await request
      .patch(`${rootUrl}/categories/${id}`)
      .send(category)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while updating the category')
    }
  }
}
export async function createNewCategory(
  data: CategoryData
): Promise<number | undefined> {
  try {
    const res = await request.post(`${rootUrl}/categories`).send(data)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function deleteCategoryById(id: number) {
  try {
    const res = await request.delete(`/api/v1/categories/${id}`)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while deleting the todo')
    }
  }
}
