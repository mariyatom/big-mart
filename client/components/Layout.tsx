import AboutUs from './AboutUs'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bg-main.WebP',
    '/client/assets/bmb-gc2.WebP',
    '/client/assets/bmb-gc4.WebP',
  ]
  return (
    <div className="main-layout">
      <Carousel images={images} />
      <AboutUs />
    </div>
  )
}

export default Layout
