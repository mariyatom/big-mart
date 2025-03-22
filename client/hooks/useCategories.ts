import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import { Category } from '../../models/category'

export function useCategories() {
  return useQuery<{ categories: Category[] }>({
    // Define return type explicitly
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await request.get('/api/v1/categories')
      if (!res.ok) throw new Error(res.text)
      return res.body as { categories: Category[] }
    },
  })
}
