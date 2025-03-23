export interface PaymentData {
  billingFirstName: string
  billingLastName: string
  billingPhone: string
  billingCountry: string
  billingAddress: string
  billingCity: string
  billingRegion: string
  billingZip: string
  totalAmount: number
}

export interface Payment extends PaymentData {
  id: number
}
