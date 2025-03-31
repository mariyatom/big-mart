import { OrderDetail, OrderHistory } from '../../models/order'
import { Category, CategoryData } from './../../models/category'
import request from 'superagent'

const rootUrl = '/api/v1'

// admin- cms
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
    throw new Error(
      'An unknown error occurred while fetching category Data by id'
    )
  }
}

//order history admin
export async function getOrderHistory(): Promise<OrderHistory[]> {
  try {
    const response = await request.get(`${rootUrl}/orders/order-history`)

    return response.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred while fetching order history')
  }
}

export async function getOrderDetailByOrderId(
  orderId: number
): Promise<OrderDetail | undefined> {
  try {
    const response = await request.get(`${rootUrl}/orders/${orderId}`)

    return response.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(
      'An unknown error occurred while fetching category Data by id'
    )
  }
}

export async function deleteOrderHistory(orderId: number) {
  try {
    const res = await request.delete(`/api/v1/orders/${orderId}`)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error(
        'An unknown error occurred while deleting the order History'
      )
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
