import { OrderData } from './../../models/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

// export function useCreateMovie() {
//   const queryClient = useQueryClient()
//   return useMutation({
//     async mutationFn(data: MovieData) {
//       const res = await request.post('/api/v1/movies').send(data)
//       return res.body as { id: number }
//     },

//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ['movies'] })
//     },
//   })
// }

export function useSaveOrderDetails() {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(orderData: OrderData) {
      const res = await request.post('/api/v1/orders').send(orderData)
      return res.body
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
