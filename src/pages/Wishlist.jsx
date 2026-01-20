import { Link } from 'react-router-dom'
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import '../styles/pages/Wishlist.css'

const Wishlist = () => {
  const items = useWishlistStore((state) => state.items)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)
  const addToCart = useCartStore((state) => state.addToCart)
  
  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }
  
  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <FaHeart className="empty-wishlist-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Start adding products you love to your wishlist</p>
            <Link to="/category/all" className="shop-button">Shop Now</Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-count">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        
        <div className="wishlist-grid">
          {items.map((item) => (
            <div key={item.id} className="wishlist-item">
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="remove-wishlist-button"
                aria-label="Remove from wishlist"
              >
                <FaTrash />
              </button>
              
              <Link to={`/product/${item.id}`} className="wishlist-item-image-container">
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                {!item.inStock && (
                  <div className="stock-badge">Out of Stock</div>
                )}
              </Link>
              
              <div className="wishlist-item-info">
                <Link to={`/product/${item.id}`}>
                  <h3 className="wishlist-item-name">{item.name}</h3>
                </Link>
                <p className="wishlist-item-description">{item.description}</p>
                <div className="wishlist-item-price">${item.price.toFixed(2)}</div>
                
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-from-wishlist"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
