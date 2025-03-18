import { Link, Outlet } from 'react-router-dom'
import { useFruits } from '../hooks/useFruits.ts'

import Navbar from './Navbar.tsx'

function App() {
  //const { data } = useFruits()

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
