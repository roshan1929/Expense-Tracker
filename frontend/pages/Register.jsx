import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder: call API to register
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <h2>✨ Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text"
            placeholder="John Doe"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
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
        <button type="submit" className="button submit-btn">Create Account</button>
      </form>
      <div className="auth-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  )
}

export default Register
