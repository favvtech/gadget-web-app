import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaShoppingCart, FaStar, FaChevronLeft } from 'react-icons/fa'
import { getProductById, generateProducts } from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import '../styles/pages/ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  
  const addToCart = useCartStore((state) => state.addToCart)
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const productData = await getProductById(id)
      if (productData) {
        setProduct(productData)
        const allProducts = await generateProducts()
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4)
        setRelatedProducts(related)
      }
      setLoading(false)
    }
    loadProduct()
  }, [id])
  
  if (loading) {
    return <div className="loading-container">Loading...</div>
  }
  
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/" className="back-button">Go Home</Link>
      </div>
    )
  }
  
  // Use single image instead of duplicates
  const productImages = [product.image]
  
  const handleAddToCart = () => {
    addToCart(product, quantity)
  }
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }
  
  
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaChevronLeft /> Back
        </button>
        
        <div className="product-detail-content">
          <div className="product-images-section">
            <div className="main-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="main-image"
              />
            </div>
          </div>
          
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < product.rating ? 'star filled' : 'star'}
                />
              ))}
              <span className="rating-text">({product.reviews} reviews)</span>
            </div>
            
            <div className="product-price">${product.price.toFixed(2)}</div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-specs">
              <h3>Specifications</h3>
              <ul className="specs-list">
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-button"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              
              <button 
                onClick={handleWishlistToggle}
                className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
              >
                <FaHeart />
              </button>
            </div>
            
            {!product.inStock && (
              <div className="out-of-stock">Out of Stock</div>
            )}
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="related-product-card"
                >
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="related-product-image"
                    />
                    <h3 className="related-product-name">{relatedProduct.name}</h3>
                    <p className="related-product-price">${relatedProduct.price.toFixed(2)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
