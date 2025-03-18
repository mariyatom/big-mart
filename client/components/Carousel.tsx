import React, { useState } from 'react'
import '../styles/carousel.scss'

interface CarouselProps {
  images: string[]
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  return (
    <div className="carouselContainer">
      <button className="prev carousel-btn" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slide">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button className="next carousel-btn" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  )
}

export default Carousel
