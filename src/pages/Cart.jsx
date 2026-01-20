import { Link } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import useCartStore from '../store/cartStore'
import '../styles/pages/Cart.css'

const Cart = () => {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)
  
  const total = getTotalPrice()
  const shipping = total > 200 ? 0 : 15
  const finalTotal = total + shipping
  
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/category/all" className="shop-button">Shop Now</Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-image-container">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Link>
                
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </Link>
                  <p className="cart-item-description">{item.description}</p>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            
            <button onClick={clearCart} className="clear-cart-button">
              Clear Cart
            </button>
          </div>
          
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            {total < 200 && (
              <div className="shipping-note">
                Add ${(200 - total).toFixed(2)} more for free shipping!
              </div>
            )}
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
            
            <Link to="/category/all" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
