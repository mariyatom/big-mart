/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'

const routes = createRoutesFromElements(<Route index element={<App />} />)

export default routes
