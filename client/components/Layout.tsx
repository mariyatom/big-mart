import AboutUs from './AboutUs'
import Carousel from './Carousel'
import bgmain from '../assets/bg-main.png' // Adjust path as needed
import bmbgc2 from '../assets/bmb-gc2.png'
import bmbgc4 from '../assets/bmb-gc4.png'

function Layout() {
  const images = [bgmain, bmbgc2, bmbgc4]
  return (
    <div className="main-layout">
      <Carousel images={images} />
      <AboutUs />
    </div>
  )
}

export default Layout
