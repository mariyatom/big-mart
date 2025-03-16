import React from 'react'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bigmartbgc1.jpeg',
    '/client/assets/bigmartbgc2.webp',
    '/client/assets/bigmartbgc3.webp',
  ]
  return (
    <div>
      <Carousel images={images} />
    </div>
  )
}

export default Layout
