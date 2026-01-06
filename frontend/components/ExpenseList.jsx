import React from 'react'

const ExpenseList = ({ expenses = [], onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="loading">⏳ Loading expenses...</div>
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <p>No expenses tracked yet. Add your first expense to get started!</p>
      </div>
    )
  }

  const totalAmount = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📋 Expense History</h3>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#6366f1' }}>
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id || e.id}>
              <td style={{ fontWeight: '500' }}>
                <span style={{ 
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#f0f9ff',
                  color: '#0369a1',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {e.category}
                </span>
              </td>
              <td style={{ fontWeight: '600', color: '#ef4444' }}>
                ${Number(e.amount).toFixed(2)}
              </td>
              <td>{e.description || '—'}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => onEdit(e)}
                  style={{
                    padding: '6px 12px',
                    marginRight: '8px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(e._id || e.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                  onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseList
