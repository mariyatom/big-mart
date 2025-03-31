import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/index.ts'
import { generateOrderEmail } from './emailTemplate.ts'
import { sendOrderEmail } from './emailService.ts'

const router = Router()

// save order

// post:   http://localhost:3002/api/v1/orders/
router.post('/', async (req, res, next) => {
  const { customer, payment, cart } = req.body
  //console.log('save order 1 terminal', customer)
  if (!customer || !payment || !cart) {
    res.sendStatus(StatusCodes.BAD_REQUEST).send('Missing required fields') //400
    return
  }

  try {
    const customerId = await db.saveCustomers(customer)
    const paymentId = await db.savePaymentBillingDetails(payment)
    if (!customerId || !paymentId) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Failed to save customer or payment')
    }

    // Save cart and cart items
    const cartId = await db.saveToCart(customerId, payment.totalAmount)
    await db.saveCartItems(cartId, cart)
    // Generate order summary content
    const orderSummary = generateOrderEmail(customer, cart, payment.totalAmount)
    // Send order confirmation email
    // await sendOrderEmail(customer.email, orderSummary)

    // Save the order
    const orderId = await db.saveOrder(
      customerId,
      paymentId,
      cartId,
      orderSummary
    )
    // console.log('cart id after db save on server', orderId)
    // console.log(orderId)

    res.status(StatusCodes.CREATED).json({ orderId })
  } catch (e) {
    next(e)
  }
})

// cms- admin order history

// http://localhost:3002/api/v1/orders/order-history/
router.get('/order-history', async (req, res, next) => {
  try {
    const ordersOverview = await db.getAllOrderOverviewWithCustomerEmail()
    res.status(StatusCodes.OK).json(ordersOverview)
  } catch (error) {
    next(error)
  }
})

// GET route for fetching order details by ID,
//http://localhost:3002/api/v1/orders/12

router.get('/:orderId', async (req, res, next) => {
  const orderId = parseInt(req.params.orderId, 10)
  if (isNaN(orderId)) {
    return res.status(StatusCodes.BAD_REQUEST).send('Invalid order ID')
  }
  try {
    const orderDetails = await db.getOrderDetails(orderId)
    res.status(StatusCodes.OK).json(orderDetails)
  } catch (error) {
    next(error)
  }
})

export default router
