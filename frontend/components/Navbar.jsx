import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">💰 Expense Tracker</Link>
        <nav>
          {token ? (
            <>
              <Link to="/dashboard" style={{ marginRight: 12 }}>Dashboard</Link>
              <Link to="/expenses" style={{ marginRight: 12 }}>Expenses</Link>
              <button className="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
