/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Layout from './components/Layout'
import ProductsList from './components/ProductsList'
import AboutUs from './components/AboutUs'
import ProductDetail from './components/ProductDetail'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Layout />} />
    <Route path="/ProductsList" element={<ProductsList />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/product/:productName" element={<ProductDetail />} />
    {/* Add the new route */}
  </Route>
)

export default routes
