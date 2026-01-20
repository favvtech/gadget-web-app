import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { CATEGORIES } from '../../config/constants'
import { getCategoryImage } from '../../config/images'
import '../../styles/components/home/ProductCategories.css'

const ProductCategories = () => {
  const [categories, setCategories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 8
  
  useEffect(() => {
    const loadCategoryImages = async () => {
      const categoriesWithImages = await Promise.all(
        CATEGORIES.map(async (cat) => ({
          ...cat,
          image: await getCategoryImage(cat.name)
        }))
      )
      setCategories(categoriesWithImages)
    }
    loadCategoryImages()
  }, [])
  
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= categories.length ? 0 : prev + itemsPerView
    )
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, categories.length - itemsPerView)
        : prev - itemsPerView
    )
  }
  
  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerView)
  
  return (
    <div className="product-categories">
      <div className="categories-container">
        <button className="category-nav-button category-nav-left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        
        <div className="categories-carousel">
          {visibleCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="category-item"
            >
              <Link to={`/category/${category.id}`} className="category-link">
                <div className="category-icon-container">
                  {category.image && (
                    <img src={category.image} alt={category.name} className="category-icon" />
                  )}
                </div>
                <span className="category-name">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <button className="category-nav-button category-nav-right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default ProductCategories
