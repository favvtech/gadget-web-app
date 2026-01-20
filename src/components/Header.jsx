import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRocket, FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import useAuthStore from '../store/authStore'
import useUIStore from '../store/uiStore'
import '../styles/components/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const profileDropdownRef = useRef(null)
  
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  
  const searchExpanded = useUIStore((state) => state.searchExpanded)
  const profileDropdownOpen = useUIStore((state) => state.profileDropdownOpen)
  const mobileMenuOpen = useUIStore((state) => state.mobileMenuOpen)
  const toggleSearch = useUIStore((state) => state.toggleSearch)
  const toggleProfileDropdown = useUIStore((state) => state.toggleProfileDropdown)
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu)
  const closeProfileDropdown = useUIStore((state) => state.closeProfileDropdown)
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu)
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      if (searchExpanded) toggleSearch()
    }
  }
  
  const handleLogout = async () => {
    await logout()
    closeProfileDropdown()
    navigate('/')
  }
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        closeProfileDropdown()
      }
      // Close mobile menu when clicking outside
      const navLinks = document.querySelector('.nav-links')
      const mobileMenuButton = document.querySelector('.mobile-menu-button')
      if (mobileMenuOpen && navLinks && mobileMenuButton && 
          !navLinks.contains(event.target) && 
          !mobileMenuButton.contains(event.target)) {
        closeMobileMenu()
      }
    }
    
    // Prevent body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [closeProfileDropdown, closeMobileMenu, mobileMenuOpen])
  
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-container">
          <FaRocket className="logo-icon" />
          <span>HOHAN</span>
        </Link>
        
        <button 
          className="mobile-menu-button icon-button"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <div className={`search-container ${searchExpanded ? 'expanded' : ''}`}>
          <button 
            className="search-icon-mobile icon-button"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          
          <form onSubmit={handleSearch} className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="ENTER YOUR KEY WORD"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              SHOP NOW
            </button>
          </form>
        </div>
        
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={closeMobileMenu}
          />
        )}
        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>HOME</Link>
          <Link to="/category/all" className="nav-link" onClick={closeMobileMenu}>CATEGORIES</Link>
          <Link to="/cart" className="nav-link" onClick={closeMobileMenu}>CART</Link>
          <Link to="/wishlist" className="nav-link" onClick={closeMobileMenu}>WISHLIST</Link>
        </nav>
        
        <div className="header-icons">
            <Link to="/wishlist" className="icon-button" aria-label="Wishlist">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="icon-badge">{wishlistCount}</span>
              )}
            </Link>
            
            <Link to="/cart" className="icon-button" aria-label="Cart">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="icon-badge">{cartCount}</span>
              )}
            </Link>
            
            <div className="profile-container" ref={profileDropdownRef}>
              <button
                className="icon-button"
                onClick={toggleProfileDropdown}
                aria-label="Profile"
              >
                <FaUser />
              </button>
              
              <div className={`profile-dropdown ${profileDropdownOpen ? 'open' : ''}`}>
                {user ? (
                  <>
                    <div className="dropdown-item" style={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                      {user.email}
                    </div>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="dropdown-item" onClick={closeProfileDropdown}>
                      Sign Up
                    </Link>
                    <Link to="/login" className="dropdown-item" onClick={closeProfileDropdown}>
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header
