import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Product } from '../../models/product'

export function useProducts() {
  return useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await request.get('/api/v1/products')
      if (!res.ok) throw new Error(res.text)
      return res.body as { products: Product[] }
    },
  })
}
