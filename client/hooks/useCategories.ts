import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import * as api from '../apis/apiClient'
import { Category, CategoryData } from '../../models/category'

//client

export function useCategories() {
  return useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await request.get('/api/v1/categories')
      if (!res.ok) throw new Error(res.text)
      return res.body as { categories: Category[] }
    },
  })
}

//Admin
//getSingleCategory
export function useCategoryDataById(id: number) {
  return useQuery<Category>({
    queryKey: ['category', id],
    queryFn: async () => {
      const category = await api.getCategoryDataById(id)
      if (!category) throw new Error('Category not found')
      return category
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      category,
    }: {
      id: number
      category: Category
    }) => {
      const res = await api.updateCategory(id, category)
      return res
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CategoryData) => {
      const result = await api.createNewCategory(data)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error: Error) => {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('An unknown error occurred while creating a category')
      }
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => await api.deleteCategoryById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.error('Error deleting Category:', error)
    },
  })
}
