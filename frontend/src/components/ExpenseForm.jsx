import React, { useState, useEffect } from 'react'

const ExpenseForm = ({ onSubmit, isLoading, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || '',
        amount: initialData.amount || '',
        description: initialData.description || '',
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    if (!initialData) {
      setFormData({
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>➕ {initialData ? 'Edit Expense' : 'Add New Expense'}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="form-group">
          <label>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="Food">🍔 Food & Dining</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Utilities">⚡ Utilities</option>
            <option value="Healthcare">🏥 Healthcare</option>
            <option value="Other">📦 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount (USD) *</label>
          <input 
            name="amount" 
            type="number" 
            placeholder="0.00"
            value={formData.amount} 
            onChange={handleChange} 
            step="0.01" 
            min="0"
            required 
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input 
            name="date" 
            type="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <input 
          name="description" 
          type="text"
          placeholder="Add notes or details (optional)"
          value={formData.description} 
          onChange={handleChange} 
        />
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: '12px' }}>
        <button className="button submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? '⏳ Saving...' : initialData ? '💾 Update Expense' : '✅ Save Expense'}
        </button>
        {onCancel && (
          <button type="button" className="button cancel-btn" onClick={onCancel}>
            ✖ Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ExpenseForm
