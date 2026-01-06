import React, { useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  const addExpense = (data) => {
    const newItem = { ...data, _id: Date.now().toString() }
    setExpenses((p) => [newItem, ...p])
  }

  const updateExpense = (data) => {
    setExpenses((p) => p.map((e) => (e._id === editing._id ? { ...e, ...data } : e)))
    setEditing(null)
  }

  const handleDelete = (id) => {
    setExpenses((p) => p.filter((e) => e._id !== id))
  }

  return (
    <div>
      <h2>💳 Manage Expenses</h2>
      
      <ExpenseForm
        onSubmit={editing ? updateExpense : addExpense}
        initialData={editing}
        isLoading={loading}
        onCancel={() => setEditing(null)}
      />

      <ExpenseList expenses={expenses} onEdit={(e) => setEditing(e)} onDelete={handleDelete} isLoading={loading} />
    </div>
  )
}

export default Expenses
