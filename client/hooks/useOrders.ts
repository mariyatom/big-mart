import { OrderData, OrderDetail, OrderHistory } from './../../models/order'
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

export function useOrderHistoryByOrderId(orderId: number) {
  return useQuery<OrderDetail | undefined>({
    queryKey: ['orderHist', orderId],
    queryFn: async () => {
      const orderHist = await api.getOrderDetailByOrderId(orderId)
      if (!orderHist)
        throw new Error('Order details not found for this order ID. ')
      return orderHist
    },
  })
}
