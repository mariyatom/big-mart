import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'
import { Category, CategoryData } from '../../models/category.ts'
import { Product, ProductData } from '../../models/product.ts'
import { CustomerData } from '../../models/customer.ts'
import { PaymentData } from '../../models/payment.ts'
import { OrderDetail, OrderHistory } from '../../models/order.ts'

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
  const now = new Date()
  const [idObj] = await connection('cart')
    .insert({
      customer_id: customerId,
      total: totalAmount,
      created_at: now,
      updated_at: now,
    })
    .returning('id')

  return idObj.id
}

export async function saveCartItems(
  cartId: number,
  cartItems: any[]
): Promise<void> {
  const now = new Date()
  const items = cartItems.map((item) => ({
    cart_id: cartId,
    product_id: item.product.id,
    quantity: item.quantity,
    created_at: now,
    updated_at: now,
  }))

  await connection('cart_item').insert(items)
}

export async function saveOrder(
  customerId: number,
  paymentId: number,
  cartId: number,
  orderEmail: string
): Promise<number> {
  const now = new Date()

  const [idObj] = await connection('order')
    .insert({
      customer_id: customerId,
      payment_id: paymentId,
      cart_id: cartId,
      order_email: orderEmail,
      created_at: now,
      updated_at: now,
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
export async function getOrderDetails(
  orderId: number
): Promise<OrderDetail | undefined> {
  const result = await connection('order')
    .join('customer', 'order.customer_id', 'customer.id')
    .join('payment', 'order.payment_id', 'payment.id')
    .join('cart', 'order.cart_id', 'cart.id')
    .leftJoin('cart_item', 'cart.id', 'cart_item.cart_id')
    .leftJoin('product', 'cart_item.product_id', 'product.id')
    .select(
      'order.id as orderId',
      'order.created_at as orderDateTime',
      'order.order_email as orderEmail',
      connection.raw(
        "customer.first_name || ' ' || customer.last_name as customerName"
      ),
      'customer.phone as customerPhone',
      'customer.email as customerEmail',
      'customer.pickup_time as pickupTime',
      'customer.comment as comment',
      connection.raw(
        "payment.first_name || ' ' || payment.last_name as billingName"
      ),
      'payment.address as billingAddress',
      'payment.city as billingCity',
      'payment.region as billingRegion',
      'payment.zip as billingZip',
      'payment.country as billingCountry',
      'payment.total_amount as totalPaid',
      'cart.id as cartId',
      'cart.total as cartTotal',
      'cart.created_at as cartCreated',
      'cart.updated_at as cartUpdated',
      'cart_item.product_id as productId',
      'product.name as productName',
      'product.price as productUnitPrice',
      'cart_item.quantity as cartQuantity'
    )
    .where('order.id', orderId)
    .orderBy('order.id', 'desc')
    .orderBy('cart_item.id')

  if (!result.length) return undefined // Return undefined if no order is found

  const {
    orderId: id,
    orderDateTime,
    orderEmail,
    customerName,
    customerPhone,
    customerEmail,
    pickupTime,
    comment,
    billingName,
    billingAddress,
    billingCity,
    billingRegion,
    billingZip,
    billingCountry,
    totalPaid,
    cartId,
    cartTotal,
    cartCreated,
    cartUpdated,
  } = result[0]

  // Format product details
  const products = result.map((row) => ({
    productId: row.productId,
    productName: row.productName,
    productUnitPrice: row.productUnitPrice,
    productQuantity: row.cartQuantity,
  }))

  return {
    orderId: id,
    orderDateTime,
    orderEmail,
    customerName,
    customerPhone,
    customerEmail,
    pickupTime,
    comment,
    billingName,
    billingAddress,
    billingCity,
    billingRegion,
    billingZip,
    billingCountry,
    totalPaid,
    cartId,
    cartTotal,
    cartCreated,
    cartUpdated,
    products,
  }
}

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
