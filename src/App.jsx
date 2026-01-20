import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
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
