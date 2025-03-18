import React from 'react'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bmbgc2.jpg',
    '/client/assets/bmbgc1.jpg',
    '/client/assets/bmbgc4.jpg',
  ]
  return (
    <div>
      <Carousel images={images} />
    </div>
  )
}

export default Layout
