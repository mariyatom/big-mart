import { useParams } from 'react-router-dom'
import { useOrderHistoryByOrderId } from '../../hooks/useOrders'
import '../../styles/orderHistoryDetail.scss'
import ErrorMessage from '../ErrorMessage'
import LoadingIndicator from '../LoadingIndicator'

function OrderHistoryDetail() {
  const params = useParams()
  const orderId = Number(params.orderId)

  const {
    data: orderDetail,
    isPending,
    isError,
    error,
  } = useOrderHistoryByOrderId(orderId)

  if (isPending) return <LoadingIndicator />
  if (isError) return <ErrorMessage error={error} />

  if (!orderDetail) return <p className="order-message">Order not found.</p>

  return (
    <div className="order-summary-detail">
      <h2 className="order-summary-title">Order Summary</h2>

      {/* Order Information */}
      <div className="order-info">
        <p>
          <strong>Order ID:</strong> {orderDetail.orderId}
        </p>
        <p>
          <strong>Order Date:</strong>{' '}
          {new Date(orderDetail.orderDateTime).toLocaleString()}
        </p>
        {/* <p>
          <strong>Order Email:</strong> {orderDetail.orderEmail}
        </p> */}
        <p>
          <strong>Pickup Time:</strong> {orderDetail.pickupTime || 'N/A'}
        </p>
        <p>
          <strong>Comments:</strong> {orderDetail.comment || 'None'}
        </p>
      </div>

      {/* Customer Details */}
      <div className="customer-info">
        <h3 className="orderDetHead3">Customer Details</h3>
        <p>
          <strong>Name:</strong> {orderDetail.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetail.customerPhone}
        </p>
        <p>
          <strong>Email:</strong> {orderDetail.customerEmail}
        </p>
      </div>

      {/* Billing Details */}
      <div className="billing-info">
        <h3 className="orderDetHead3">Billing Information</h3>
        <p>
          <strong>Name:</strong> {orderDetail.billingName}
        </p>
        <p>
          <strong>Address:</strong> {orderDetail.billingAddress},{' '}
          {orderDetail.billingCity}, {orderDetail.billingRegion},{' '}
          {orderDetail.billingZip}, {orderDetail.billingCountry}
        </p>
        <p>
          <strong>Total Paid:</strong> ${orderDetail.totalPaid}
        </p>
      </div>

      {/* Cart Details */}
      <div className="cart-info">
        <h3 className="orderDetHead3">Cart Details</h3>
        <p>
          <strong>Cart Total:</strong> ${orderDetail.cartTotal}
        </p>
      </div>

      {/* Products Table */}
      <div className="products-info">
        <h3 className="orderDetHead3">Products</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>${product.productUnitPrice}</td>
                <td>{product.productQuantity}</td>
                <td>
                  $
                  {(product.productUnitPrice * product.productQuantity).toFixed(
                    2,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="total-amount">
        <strong>Grand Total:</strong> ${orderDetail.totalPaid}
      </p>
    </div>
  )
}

export default OrderHistoryDetail
