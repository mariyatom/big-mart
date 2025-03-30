import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'
import { Category, CategoryData } from '../../models/category.ts'
import { Product, ProductData } from '../../models/product.ts'
import { CustomerData } from '../../models/customer.ts'
import { PaymentData } from '../../models/payment.ts'
import { OrderHistory } from '../../models/order.ts'

export async function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}

export async function getAllCategories(): Promise<Category[]> {
  return await connection('category').select('*')
}
export async function getAllProducts(): Promise<Product[]> {
  return await connection('product').select(
    'id',
    'name',
    'price',
    'currency',
    'image',
    'description',
    'category_id as categoryId',
    'location'
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
    .insert(categoryData)
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

export async function getCategoriesById(id: number): Promise<Category> {
  return await connection('category').select('*').where('id', id).first()
}

export async function updateCategory(
  id: number,
  updateCategory: Partial<CategoryData>
): Promise<number | null> {
  return await connection('category').where({ id }).update(updateCategory)
}

export async function deleteCategory(id: number): Promise<number> {
  return await connection('category').where({ id }).del()
}

//in progress for order-history
export async function getOrderDetails(orderId: number) {
  return connection('order')
    .join('customer', 'order.customer_id', 'customer.id')
    .join('payment', 'order.payment_id', 'payment.id')
    .join('cart', 'order.cart_id', 'cart.id')
    .leftJoin('cart_item', 'cart.id', 'cart_item.cart_id')
    .leftJoin('product', 'cart_item.product_id', 'product.id')
    .select(
      'order.id as order_id',
      'order.created_at as order_date_time',
      'order.order_email',
      'customer.first_name as customer_first_name',
      'customer.last_name as customer_last_name',
      'customer.phone as customer_phone',
      'customer.email as customer_email',
      'customer.pickup_time',
      'customer.comment',
      'payment.first_name as billing_first_name',
      'payment.last_name as billing_last_name',
      'payment.address as billing_address',
      'payment.city as billing_city',
      'payment.region as billing_region',
      'payment.zip as billing_zip',
      'payment.country as billing_country',
      'payment.total_amount as total_paid',
      'cart.id as cart_id',
      'cart.total as cart_total',
      'cart.created_at as cart_created_at',
      'cart.updated_at as cart_updated_at',
      'cart_item.product_id',
      'product.name as product_name',
      'product.price as product_unit_price',
      'cart_item.quantity as product_quantity'
    )
    .where('order.id', orderId)
    .orderBy('order.id')
    .orderBy('cart_item.id')
}

// inprogress 2
export async function getAllOrderOverviewWithCustomerEmail(): Promise<
  OrderHistory[]
> {
  return connection('order')
    .join('customer', 'order.customer_id', 'customer.id')
    .select(
      'order.id as orderId',
      'order.created_at as orderDateTime',
      connection.raw(
        "customer.first_name || ' ' || customer.last_name as customerName"
      ),
      'customer.phone as customerPhone',
      'customer.email as customerEmail'
    )
    .orderBy('order.created_at', 'desc')
}
