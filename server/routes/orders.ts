import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/index.ts'

const router = Router()

// save order
router.post('/', async (req, res, next) => {
  // console.log('save order 1 terminal', req.body)
  const { customer, payment, cart } = req.body
  console.log('save order 1 terminal', customer)
  if (!customer || !payment || !cart) {
    res.sendStatus(StatusCodes.BAD_REQUEST).send('Missing required fields') //400
    return
  }

  try {
    const customerId = await db.saveCustomers(customer)
    console.log('customer id after db save on server', customerId)
    const paymentId = await db.savePaymentBillingDetails(payment)
    console.log('payment id after db save on server', paymentId)
    if (!customerId || !paymentId) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Failed to save customer or payment')
    }

    // Save cart and cart items
    const cartId = await db.saveToCart(customerId, payment.totalAmount)
    console.log('cart id after db save on server', cartId)
    await db.saveCartItems(cartId, cart)

    const orderSummary = ''
    // // Generate order summary content
    // const orderSummary = generateOrderEmail(customer, cart, payment.totalAmount)

    // // Send order confirmation email
    // await sendOrderEmail(customer.email, orderSummary)

    // Save the order
    const orderId = await db.saveOrder(
      customerId,
      paymentId,
      cartId,
      orderSummary
    )
    console.log('cart id after db save on server', orderId)
    console.log(orderId)

    res.status(StatusCodes.CREATED).json({ orderId })
    // const id = await db.create({ title, release_year })
    // res
    //   .setHeader('Location', `/api/v1/movies/${id}`)
    //   .status(StatusCodes.CREATED)
    //   .json({ id, title, release_year })
  } catch (e) {
    next(e)
  }
})
export default router
