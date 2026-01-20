import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateProducts } from '../../data/products'
import '../../styles/components/home/FeaturedProducts.css'

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  useEffect(() => {
    const loadFeatured = async () => {
      const allProducts = await generateProducts()
      const featured = [
        allProducts.find(p => p.name.includes('MacBook')),
        allProducts.find(p => p.name.includes('Smart Speaker')),
        allProducts.find(p => p.name.includes('Bamboo Speaker'))
      ].filter(Boolean)
      setFeaturedProducts(featured)
    }
    loadFeatured()
  }, [])
  
  return (
    <div className="featured-products">
      <div className="featured-container">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="featured-product-card"
          >
            <Link to={`/product/${product.id}`} className="featured-link">
              <div className="featured-image-container">
                <img src={product.image} alt={product.name} className="featured-image" />
              </div>
              <div className="featured-info">
                <h3 className="featured-name">{product.name.toUpperCase()}</h3>
                <p className="featured-description">{product.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
