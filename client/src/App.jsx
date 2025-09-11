import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFoods()
  }, [])

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/nutrition/foods')
      setFoods(response.data)
    } catch (err) {
      setError('Failed to fetch foods')
      console.error('Error fetching foods:', err)
    } finally {
      setLoading(false)
    }
  }

  const testAPI = async () => {
    try {
      const response = await axios.get('/api/health')
      alert(`API Status: ${response.data.message}`)
    } catch (err) {
      alert('API connection failed')
      console.error('API test error:', err)
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍎 Nutrition Planner</h1>
        <p>Track your nutrition and plan healthy meals</p>
        <button onClick={testAPI} className="test-button">
          Test API Connection
        </button>
      </header>

      <main className="app-main">
        <section className="foods-section">
          <h2>Available Foods</h2>
          <div className="foods-grid">
            {foods.map(food => (
              <div key={food.id} className="food-card">
                <h3>{food.name}</h3>
                <div className="nutrition-info">
                  <span>Calories: {food.calories}</span>
                  <span>Protein: {food.protein}g</span>
                  <span>Carbs: {food.carbs}g</span>
                  <span>Fat: {food.fat}g</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
