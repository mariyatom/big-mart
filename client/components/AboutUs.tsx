import shoppingCart from '../assets/shopping.png' // Adjust path as needed
import '../styles/AboutUs.scss'

const AboutUs = () => {
  return (
    <section className="about-container">
      {/* Left - Image Section */}
      <div className="image-container">
        <div className="image-frame"></div>
        <img src={shoppingCart} alt="Shopping Cart" className="about-image" />
      </div>

      {/* Right - Text Section */}
      <div className="text-container">
        <h3 className="about-subtitle">About us</h3>
        <h2 className="about-title">
          We Provide You The <span className="highlight">Best Experience</span>
        </h2>
        <p>
          Welcome to <strong>Big Mart</strong>, your premier Indian grocery
          store in Auckland. We take great pride in bringing the authentic
          flavors of India to your kitchen. Our shelves are stocked with a
          diverse selection of spices, herbs, lentils, rice, teas, snacks, and
          sweets, all directly sourced from India.
        </p>
        <p>
          At Homeland Indian Mart, we are dedicated to ensuring you experience
          the true essence of Indian cuisine. Our knowledgeable and friendly
          staff will assist you in finding the finest ingredients for your
          recipes.
        </p>
      </div>
    </section>
  )
}

export default AboutUs
