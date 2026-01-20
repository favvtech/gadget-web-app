import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateProducts, searchProducts } from '../data/products'
import { CATEGORIES } from '../config/constants'
import '../styles/pages/Category.css'

const Category = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      let productList = []
      
      if (searchQuery) {
        productList = await searchProducts(searchQuery)
      } else if (category === 'all') {
        productList = await generateProducts()
      } else {
        productList = await generateProducts()
        productList = productList.filter(p => p.category === category)
      }
      
      setProducts(productList)
      setFilteredProducts(productList)
      setLoading(false)
    }
    loadProducts()
  }, [category, searchQuery])
  
  if (loading) {
    return <div className="loading-container">Loading products...</div>
  }
  
  const categoryName = searchQuery 
    ? `Search Results for "${searchQuery}"`
    : category === 'all'
    ? 'All Products'
    : CATEGORIES.find(c => c.id === category)?.name || category
  
  return (
    <div className="category-page">
      <div className="category-container">
        <h1 className="category-title">{categoryName}</h1>
        <p className="category-count">{filteredProducts.length} products found</p>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try adjusting your search or browse our categories</p>
            <Link to="/category/all" className="browse-button">Browse All Products</Link>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="product-card"
              >
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    {!product.inStock && (
                      <div className="stock-badge">Out of Stock</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="product-rating">⭐ {product.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
