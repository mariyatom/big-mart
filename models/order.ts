import { CustomerData } from './customer'
import { PaymentData } from './payment'

export interface OrderData {
  customer: CustomerData
  payment: PaymentData
  cart: {
    product: {
      id: number
      name: string
      price: number
      image: string
    }
    quantity: number
  }[]
}
