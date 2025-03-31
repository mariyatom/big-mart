import AboutUs from './AboutUs'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bgmain.WebP',
    '/client/assets/bmbgc2.jpg',
    '/client/assets/bmbgc4.jpg',
  ]
  return (
    <div className="main-layout">
      <Carousel images={images} />
      <AboutUs />
    </div>
  )
}

export default Layout
