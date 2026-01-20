import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import '../styles/components/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>HOHAN</h3>
            <p>
              Your trusted destination for premium gadgets and electronics. 
              We bring you the latest technology with exceptional quality and service.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/category/all">Categories</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/category/smartphone">Smartphones</Link></li>
              <li><Link to="/category/computer">Computers</Link></li>
              <li><Link to="/category/audio">Audio</Link></li>
              <li><Link to="/category/game-console">Game Consoles</Link></li>
              <li><Link to="/category/tablet">Tablets</Link></li>
              <li><Link to="/category/smartwatch">Smartwatches</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <strong>Email:</strong> support@hohan.com<br />
              <strong>Phone:</strong> 0123-456-789<br />
              <strong>Address:</strong> 123 Tech Street, Digital City, DC 12345
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Support:</strong> Available 24/7<br />
              Call Us: 0123-456-789
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 HOHAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
