/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Layout from './components/Layout'
import ProductsList from './components/ProductsList'
import AboutUs from './components/AboutUs'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Layout />} />
    <Route path="/ProductsList" element={<ProductsList />} />
    <Route path="/about-us" element={<AboutUs />} />
  </Route>
)

export default routes
