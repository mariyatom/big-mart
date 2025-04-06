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

export interface OrderHistory {
  orderId: number
  orderDateTime: string
  customerName: string
  customerPhone: string
  customerEmail: string
}

export interface OrderDetail {
  orderId: number
  orderDateTime: string
  orderEmail?: string
  customerName: string
  customerPhone: string
  customerEmail: string
  pickupTime: string
  comment: string
  billingName: string
  billingAddress: string
  billingCity: string
  billingRegion: string
  billingZip: string
  billingCountry: string
  totalPaid: number
  cartId: number
  cartTotal: number
  cartCreated: string
  cartUpdated: string
  products: OrderProducts[]
}

export interface OrderProducts {
  productId: number
  productName: string
  productUnitPrice: number
  productQuantity: number
}
