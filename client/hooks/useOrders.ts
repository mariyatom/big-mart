import { OrderData, OrderHistory } from './../../models/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import * as api from '../apis/apiClient'

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

//admin-cms

export function useOrderHistory() {
  return useQuery<OrderHistory[]>({
    queryKey: ['ordersHistory'],
    queryFn: async () => {
      const orderHist = await api.getOrderHistory()
      if (!orderHist) throw new Error('Order History not found')
      return orderHist
    },
  })
}
