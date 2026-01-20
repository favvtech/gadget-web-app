import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getProductImage } from '../../config/images'
import '../../styles/components/home/HeroBanner.css'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  
  const slides = [
    {
      title: 'GAMING GEAR',
      subtitle: 'GAME CONTROLLER',
      description: 'Controller type Wireless controller',
      category: 'game-console',
      productName: 'Game Controller'
    },
    {
      title: 'NEW ARRIVALS',
      subtitle: 'SMARTPHONE',
      description: 'Latest technology at your fingertips',
      category: 'smartphone',
      productName: 'iPhone 15 Pro'
    },
    {
      title: 'PREMIUM AUDIO',
      subtitle: 'WIRELESS HEADPHONES',
      description: 'Experience true sound quality',
      category: 'audio',
      productName: 'Wireless Headphones'
    }
  ]
  
  useEffect(() => {
    const loadImage = async () => {
      const url = await getProductImage(slides[currentSlide].productName, slides[currentSlide].category)
      setImageUrl(url)
    }
    loadImage()
  }, [currentSlide])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  
  const currentSlideData = slides[currentSlide]
  
  return (
    <div className="hero-banner">
      <div className="hero-container">
        <button className="hero-nav-button hero-nav-left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="hero-content"
          >
            <div className="hero-text">
              <h2 className="hero-title">{currentSlideData.title}</h2>
              <h3 className="hero-subtitle">{currentSlideData.subtitle}</h3>
              <p className="hero-description">{currentSlideData.description}</p>
              <Link to={`/category/${currentSlideData.category}`} className="hero-button">
                SHOP NOW
              </Link>
            </div>
            
            <div className="hero-image-container">
              {imageUrl && (
                <img src={imageUrl} alt={currentSlideData.subtitle} className="hero-image" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button className="hero-nav-button hero-nav-right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
