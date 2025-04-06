export function generateOrderEmail(
  customer: any,
  cart: any[],
  totalAmount: number
) {
  return `
    <h2>Order Summary</h2>
    <p>Thank you for your order, ${customer.firstName}!</p>

    <h3>Customer Details</h3>
    <p>Email: ${customer.email}</p>
    <p>Name: ${customer.firstName} ${customer.lastName}</p>
    <p>Phone: ${customer.phone}</p>
    <p>Pickup Time: ${customer.pickupTime}</p>

    <h3>Order Items</h3>
    <ul>
      ${cart
        .map(
          (item) =>
            `<li>${item.product.name} - Qty: ${item.quantity} - $${item.product.price}</li>`
        )
        .join('')}
    </ul>

    <h3>Total Amount: $${totalAmount}</h3>

    <p>Billing Address: ${customer.billingAddress}</p>

    <p>Thank you for shopping with us!</p>
  `
}
