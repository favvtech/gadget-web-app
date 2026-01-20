import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductImage } from '../../config/images'
import '../../styles/components/home/PromotionalBanners.css'

const PromotionalBanners = () => {
  const [banner1Image, setBanner1Image] = useState('')
  const [banner2Image, setBanner2Image] = useState('')
  
  useEffect(() => {
    const loadImages = async () => {
      const img1 = await getProductImage('Wireless Earbuds', 'audio')
      const img2 = await getProductImage('Smart Speaker', 'audio')
      setBanner1Image(img1)
      setBanner2Image(img2)
    }
    loadImages()
  }, [])
  
  return (
    <div className="promotional-banners">
      <div className="banners-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="promo-banner promo-banner-1"
        >
          <div className="promo-content">
            <span className="promo-label">NEW ARRIVALS</span>
            <h3 className="promo-title">BAMBOOBUDS</h3>
            <Link to="/category/audio" className="promo-button">
              Shop Now
            </Link>
          </div>
          {banner1Image && (
            <div className="promo-image-container">
              <img src={banner1Image} alt="BambooBuds" className="promo-image" />
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="promo-banner promo-banner-2"
        >
          <div className="promo-content">
            <span className="promo-label">NEW ARRIVALS</span>
            <h3 className="promo-title">HOMEPOD PRO</h3>
            <Link to="/category/audio" className="promo-button">
              Shop Now
            </Link>
          </div>
          {banner2Image && (
            <div className="promo-image-container">
              <img src={banner2Image} alt="HomePod Pro" className="promo-image" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PromotionalBanners
