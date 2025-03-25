import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'
import { Category, CategoryData } from '../../models/category.ts'
import { Product, ProductData } from '../../models/product.ts'
import { CustomerData } from '../../models/customer.ts'
import { PaymentData } from '../../models/payment.ts'

export async function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}

export async function getAllCategories(): Promise<Category[]> {
  return await connection('category').select('*')
}
export async function getAllProducts(): Promise<Product[]> {
  return await connection('product').select(
    'product.id',
    'product.name',
    'product.price',
    'product.currency',
    'product.image',
    'product.description',
    'product.category_id as categoryId',
    'product.location'
  )
}

export async function saveCustomers(
  customerData: CustomerData
): Promise<number> {
  const [idObj] = await connection('customer') // if we dont have [] bracket,[{id: 15}]. if we have [] ,we will get {id: 15}
    .insert({
      email: customerData.email,
      first_name: customerData.firstName,
      last_name: customerData.lastName,
      phone: customerData.phone,
      pickup_time: customerData.pickupTime,
      comment: customerData.comment,
    })
    .returning('id')
  // Return inserted ID
  return idObj.id
}

export async function savePaymentBillingDetails(
  paymentData: PaymentData
): Promise<number> {
  const [idObj] = await connection('payment')
    .insert({
      first_name: paymentData.billingFirstName,
      last_name: paymentData.billingLastName,
      phone: paymentData.billingPhone,
      country: paymentData.billingCountry,
      address: paymentData.billingAddress,
      city: paymentData.billingCity,
      region: paymentData.billingRegion,
      zip: paymentData.billingZip,
      total_amount: paymentData.totalAmount,
    })
    .returning('id')
  // Return inserted ID
  return idObj.id
}

export async function saveToCart(
  customerId: number,
  totalAmount: number
): Promise<number> {
  const [idObj] = await connection('cart')
    .insert({
      customer_id: customerId,
      total: totalAmount,
    })
    .returning('id')

  return idObj.id
}

export async function saveCartItems(
  cartId: number,
  cartItems: any[]
): Promise<void> {
  const items = cartItems.map((item) => ({
    cart_id: cartId,
    product_id: item.product.id,
    quantity: item.quantity,
  }))

  await connection('cart_item').insert(items)
}

export async function saveOrder(
  customerId: number,
  paymentId: number,
  cartId: number,
  orderEmail: string
): Promise<number> {
  const [idObj] = await connection('order')
    .insert({
      customer_id: customerId,
      payment_id: paymentId,
      cart_id: cartId,
      order_email: orderEmail,
    })
    .returning('id')

  return idObj.id
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  if (!searchTerm || searchTerm.trim().length === 0) {
    throw new Error('Search term is required')
  }
  const products = await connection('product')
    .where('name', 'like', `%${searchTerm}%`)
    .select()
  return products
}

//  for admin's content management system

export async function addNewCategory(
  categoryData: CategoryData
): Promise<number> {
  const idResult = await connection('category')
    .insert({
      categoryData,
    })
    .returning('id')
  const { id } = idResult[0]
  return id
}

export async function addNewProduct(productData: ProductData): Promise<number> {
  const [idObj] = await connection('product')
    .insert({
      name: productData.name,
      price: productData.price,
      currency: productData.currency,
      image: productData.image,
      description: productData.description,
      category_id: productData.categoryId,
      location: productData.location,
    })
    .returning('id')
  return idObj.id
}
