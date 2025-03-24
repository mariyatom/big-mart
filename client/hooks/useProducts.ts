import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Product } from '../../models/product'

export function useProducts(searchTerm?: string) {
  return useQuery<{ products: Product[] }>({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/api/v1/products/search?searchTerm=${encodeURIComponent(searchTerm)}`
        : '/api/v1/products'
      const res = await request.get(url)
      if (!res.ok) throw new Error(res.text)
      return res.body as { products: Product[] }
    },
  })
}
