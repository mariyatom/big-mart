import AboutUs from './AboutUs'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bmbgc2.jpg',
    '/client/assets/bmbgc4.jpg',
    '/client/assets/bgmain.WebP',
  ]
  return (
    <div className="main-layout">
      <Carousel images={images} />
      <AboutUs />
    </div>
  )
}

export default Layout
