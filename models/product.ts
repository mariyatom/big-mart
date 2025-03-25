export interface ProductData {
  name: string
  price: number
  currency: string
  image: string
  description: string
  categoryId: number
  location: string
}
export interface Product extends ProductData {
  id: number
}
