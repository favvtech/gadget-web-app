import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './components/Layout'

// Get base path for GitHub Pages
const getBasePath = () => {
  // If running on GitHub Pages, extract repo name from pathname
  if (window.location.hostname.includes('github.io')) {
    const pathParts = window.location.pathname.split('/').filter(Boolean)
    if (pathParts.length > 0 && pathParts[0] !== '') {
      return `/${pathParts[0]}/`
    }
  }
  // Handle GitHub Pages 404 redirect
  if (window.location.pathname.includes('/?/')) {
    const path = window.location.pathname.split('/?/')[1]
    window.history.replaceState({}, '', path.replace(/~and~/g, '&'))
  }
  return '/'
}

function App() {
  return (
    <Router basename={getBasePath()}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
