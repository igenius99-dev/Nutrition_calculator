import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import './AppPage.css'

const AppPage = () => {
  const navigate = useNavigate()

  const handleBackToLanding = () => {
    navigate('/')
  }

  return (
    <div className="app-page">
      <div className="app-header">
        <button className="back-button" onClick={handleBackToLanding}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        
        <div className="app-title">
          <Home size={24} />
          <h1>MenuMaven App</h1>
        </div>
      </div>
      
      <div className="app-content">
        <div className="coming-soon">
          <h2>Welcome to MenuMaven!</h2>
          <p>Your smart guide to restaurant nutrition. Coming soon with full functionality!</p>
          <div className="placeholder-content">
            <div className="placeholder-card">
              <h3>📸 Menu Photo Upload</h3>
              <p>Snap photos of any restaurant menu for instant analysis</p>
            </div>
            <div className="placeholder-card">
              <h3>🤖 AI Nutrition Analysis</h3>
              <p>Get detailed calorie counts, protein, and macro breakdowns</p>
            </div>
            <div className="placeholder-card">
              <h3>🎯 Goal Tracking</h3>
              <p>Track your daily nutrition goals across multiple restaurants</p>
            </div>
            <div className="placeholder-card">
              <h3>📅 Meal Planning</h3>
              <p>Plan complete days of meals across different restaurants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppPage
