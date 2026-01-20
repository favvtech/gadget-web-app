import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/authStore'
import '../styles/pages/Auth.css'

const SignUp = () => {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.signUp)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    
    const result = await signUp(email, password)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Failed to create account')
    }
    
    setLoading(false)
  }
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-card"
        >
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create your HOHAN account</p>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password (min 6 characters)"
                minLength={6}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp
