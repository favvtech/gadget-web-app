import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import useAuthStore from '../store/authStore'
import '../styles/components/Layout.css'

const Layout = ({ children }) => {
  const initAuth = useAuthStore((state) => state.initAuth)
  
  useEffect(() => {
    initAuth()
  }, [initAuth])
  
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
