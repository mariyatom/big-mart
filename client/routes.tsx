/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs'
import App from './components/App'
import CartPage from './components/CartPage'
import CategoryProducts from './components/CategoryProducts'
import CheckoutPage from './components/CheckoutPage'
import AdminCategory from './components/CMS/AdminCategory'
import AdminProduct from './components/CMS/AdminProduct'
import Cms from './components/CMS/Cms'
import Layout from './components/Layout'
import OrderConfirmation from './components/OrderConfirmation'
import ProductDetail from './components/ProductDetail'
import ProductsList from './components/ProductsList'
import SearchResult from './components/SearchResult'
import EditCategory from './components/CMS/EditCategory'
import NewCategory from './components/CMS/NewCategory'
import OrderHistory from './components/CMS/OrderHistory'
import OrderHistoryDetail from './components/CMS/OrderHistoryDetail'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* Public Routes */}
    <Route index element={<Layout />} />
    <Route path="ProductsList" element={<ProductsList />} />
    <Route path="about-us" element={<AboutUs />} />
    <Route path="products/:productName" element={<ProductDetail />} />
    <Route path="category/:categoryName" element={<CategoryProducts />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="order-confirmation" element={<OrderConfirmation />} />
    <Route path="search-result" element={<SearchResult />} />

    {/* CMS Routes -admin*/}
    <Route path="cms" element={<Cms />}>
      <Route path="admin-category" element={<AdminCategory />} />
      <Route path="admin-Product" element={<AdminProduct />} />
      <Route path="edit-category/:id" element={<EditCategory />} />
      <Route path="new-category" element={<NewCategory />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="order-detail/:orderId" element={<OrderHistoryDetail />} />
    </Route>
  </Route>
)

export default routes
