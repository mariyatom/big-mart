import { Link } from 'react-router-dom'
import AboutUs from './AboutUs'
import Carousel from './Carousel'

function Layout() {
  const images = [
    '/client/assets/bmbgc2.jpg',
    '/client/assets/bmbgc1.jpg',
    '/client/assets/bmbgc4.jpg',
  ]
  return (
    <div className="main-layout">
      <div className="layout-page">
        {/* Background Image */}
        <div className="hero-image">
          <div className="overlay">
            <h1>Welcome to Big Mart</h1>
            <Link to="/ProductsList" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <Carousel images={images} />
      <AboutUs />
    </div>
  )
}

export default Layout
