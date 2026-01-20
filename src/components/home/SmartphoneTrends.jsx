import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateProducts } from '../../data/products'
import '../../styles/components/home/SmartphoneTrends.css'

const SmartphoneTrends = () => {
  const [smartphones, setSmartphones] = useState([])
  
  useEffect(() => {
    const loadSmartphones = async () => {
      const allProducts = await generateProducts()
      const phones = allProducts
        .filter(p => p.category === 'smartphone')
        .slice(0, 8)
      setSmartphones(phones)
    }
    loadSmartphones()
  }, [])
  
  return (
    <div className="smartphone-trends">
      <div className="trends-container">
        <h2 className="section-title">TOP SMARTPHONE TRENDS</h2>
        <div className="smartphones-grid">
          {smartphones.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="smartphone-card"
            >
              <Link to={`/product/${phone.id}`} className="smartphone-link">
                <div className="smartphone-image-container">
                  <img src={phone.image} alt={phone.name} className="smartphone-image" />
                </div>
                <div className="smartphone-info">
                  <h3 className="smartphone-name">{phone.name}</h3>
                  <p className="smartphone-price">${phone.price.toFixed(2)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmartphoneTrends
