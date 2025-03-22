import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getFruits } from '../apis/fruits.ts'

export function useFruits() {
  const query = useQuery({ queryKey: ['fruits'], queryFn: getFruits })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useFruitsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fruits'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
// const handlePlaceOrder = async () => {
//   // 1. Prepare order data
//   const orderData = {
//     customer,
//     payment,
//     cart,
//   };

//   try {
//     // 2. Save the order to the database via an API call
//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderData),
//     });

//     const result = await response.json();

//     if (result.success) {
//       // 3. Send order summary email to the customer
//       await fetch('/api/send-order-summary', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: customer.email,
//           orderDetails: orderData,
//         }),
//       });

//       // 4. Navigate to the order confirmation page
//       navigate('/order-confirmation', {
//         state: { customer, payment, cart },
//       });
//     } else {
//       // Handle database save error
//       console.error('Error saving order:', result.message);
//     }
//   } catch (error) {
//     console.error('Error placing order:', error);
//   }
// };

//// Order Summary-email  to customer  -stretch
// Subject: Order Confirmation - Order #12345

// Dear [Customer First Name],

// Thank you for your order! Here are your order details:

// Customer Info:
// - Name: [Customer Full Name]
// - Email: [Customer Email]
// - Phone: [Customer Phone]
// - Pickup Time: [Pickup Time]

// Order Items:
// [Product Name] - Qty: [Quantity] - Price: [Price]
// [Product Name] - Qty: [Quantity] - Price: [Price]

// Subtotal: [Subtotal]
// Pickup: Free
// GST: $0.00
// Total: [Total Price]

// We will contact you shortly to confirm the pickup time.

// Thank you for shopping with us!

// Best regards,
// Your Store Name
