/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Layout from './components/Layout'
import ProductsList from './components/ProductsList'
import AboutUs from './components/AboutUs'
import ProductDetail from './components/ProductDetail'
import CategoryProducts from './components/CategoryProducts'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import OrderConfirmation from './components/OrderConfirmation'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Layout />} />
    <Route path="/ProductsList" element={<ProductsList />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/products/:productName" element={<ProductDetail />} />
    <Route path="/category/:categoryName" element={<CategoryProducts />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
    {/* Add the new route */}
  </Route>
)

export default routes
