export interface CustomerData {
  email: string
  firstName: string
  lastName: string
  phone: string
  pickupTime: string
  comment: string
}

export interface Customer extends CustomerData {
  id: number
}
