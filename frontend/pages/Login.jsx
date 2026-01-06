import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder: in real app call API and store token
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email }))
    navigate('/dashboard')
  }

  return (
    <div className="auth-container">
      <h2>🔐 Welcome Back</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email"
            placeholder="you@example.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="button submit-btn">Sign In</button>
      </form>
      <div className="auth-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </div>
  )
}

export default Login
