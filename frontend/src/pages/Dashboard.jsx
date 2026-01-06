import React, { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [stats, setStats] = useState({
    totalExpenses: 0,
    thisMonth: 0,
    categories: 0,
  })

  useEffect(() => {
    // demo data
    const demoData = [
      { name: 'Food', value: 120 },
      { name: 'Transport', value: 80 },
      { name: 'Utilities', value: 50 },
    ]
    setData(demoData)
    setStats({
      totalExpenses: demoData.reduce((sum, item) => sum + item.value, 0),
      thisMonth: demoData.reduce((sum, item) => sum + item.value, 0),
      categories: demoData.length,
    })
  }, [])

  return (
    <div>
      <h2>📊 Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Expenses</h3>
          <div className="stat-value">${stats.totalExpenses.toFixed(2)}</div>
          <div className="stat-label">All time</div>
        </div>
        
        <div className="dashboard-card">
          <h3>This Month</h3>
          <div className="stat-value">${stats.thisMonth.toFixed(2)}</div>
          <div className="stat-label">Current period</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Categories</h3>
          <div className="stat-value">{stats.categories}</div>
          <div className="stat-label">Tracked</div>
        </div>
      </div>

      <ChartCard data={data} title="💰 Expenses by Category" />
    </div>
  )
}

export default Dashboard
