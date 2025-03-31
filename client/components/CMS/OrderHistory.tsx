import { FaInfoCircle } from 'react-icons/fa'
import { useOrderHistory } from '../../hooks/useOrders'
import ErrorMessage from '../ErrorMessage'
import LoadingIndicator from '../LoadingIndicator'
import { useNavigate } from 'react-router-dom'

function OrderHistory() {
  const navigate = useNavigate()
  const { data: orderHistory, isLoading, isError, error } = useOrderHistory()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isError) {
    return <ErrorMessage error={error} />
  }

  const handleDetail = (orderId: number) => {
    navigate(`/cms/order-detail/${orderId}`)
  }

  return (
    <div>
      <div className="order-hist-heading">
        <h2>Order History</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Order Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((orderHist, index) => (
            <tr key={orderHist.orderId}>
              <td>{index + 1}</td>

              <td> {new Date(orderHist.orderDateTime).toLocaleString()}</td>
              <td>{orderHist.customerName}</td>
              <td>{orderHist.customerPhone}</td>
              <td>{orderHist.customerEmail}</td>
              <td>
                <button
                  className="detail-button"
                  onClick={() => handleDetail(orderHist.orderId)}
                >
                  <FaInfoCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderHistory
