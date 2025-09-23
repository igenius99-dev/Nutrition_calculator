import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Home, 
  Camera, 
  Target, 
  Calendar, 
  User, 
  LogOut,
  Plus,
  Search,
  Star,
  Clock,
  Zap,
  Heart,
  Activity
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './ModernAppPage.css'

const ModernAppPage = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 17) setTimeOfDay('afternoon')
    else setTimeOfDay('evening')
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleBackToLanding = () => {
    navigate('/')
  }

  const quickActions = [
    { icon: Camera, label: 'Scan Menu', color: 'blue', comingSoon: true },
    { icon: Search, label: 'Find Restaurant', color: 'green', comingSoon: true },
    { icon: Target, label: 'Set Goals', color: 'purple', comingSoon: true },
    { icon: Calendar, label: 'Meal Plan', color: 'orange', comingSoon: true }
  ]

  const stats = [
    { label: 'Today\'s Calories', value: '1,247', target: '2,000', unit: 'cal', progress: 62 },
    { label: 'Protein', value: '45g', target: '120g', unit: 'g', progress: 38 },
    { label: 'Carbs', value: '156g', target: '250g', unit: 'g', progress: 62 },
    { label: 'Fat', value: '32g', target: '67g', unit: 'g', progress: 48 }
  ]

  const recentMeals = [
    { name: 'Grilled Chicken Salad', restaurant: 'Fresh & Co', calories: 320, time: '12:30 PM', rating: 4.5 },
    { name: 'Quinoa Bowl', restaurant: 'Green Kitchen', calories: 450, time: '7:45 AM', rating: 4.8 },
    { name: 'Turkey Wrap', restaurant: 'Corner Cafe', calories: 380, time: 'Yesterday', rating: 4.2 }
  ]

  return (
    <div className="modern-app-page">
      {/* Header */}
      <header className="modern-app-header">
        <div className="modern-header-left">
          <button className="modern-back-button" onClick={handleBackToLanding}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
        
        <div className="modern-header-center">
          <div className="modern-app-title">
            <h1>MenuMaven</h1>
          </div>
        </div>

        <div className="modern-header-right">
          <div className="modern-user-menu">
            <div className="modern-user-info">
              <div className="modern-user-avatar">
                <User size={20} />
              </div>
              <span className="modern-user-name">
                {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            <button className="modern-logout-button" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="modern-app-main">
        {/* Welcome Section */}
        <section className="modern-welcome-section">
          <div className="modern-welcome-content">
            <h2>
              Good {timeOfDay}, {currentUser?.displayName?.split(' ')[0] || 'Tushar'}!
            </h2>
            <p>Ready to make smarter nutrition choices today?</p>
          </div>
          <div className="modern-welcome-actions">
            <button className="modern-primary-action">
              <Camera size={20} />
              Scan Menu
            </button>
            <button className="modern-secondary-action">
              <Plus size={20} />
              Add Meal
            </button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="modern-quick-actions">
          <h3>Quick Actions</h3>
          <div className="modern-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className={`modern-action-card modern-${action.color} ${action.comingSoon ? 'modern-coming-soon' : ''}`}>
                <div className="modern-action-icon">
                  <action.icon size={24} />
                </div>
                <span className="modern-action-label">{action.label}</span>
                {action.comingSoon && <span className="modern-coming-soon-badge">Soon</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="modern-stats-section">
          <h3>Today's Nutrition</h3>
          <div className="modern-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="modern-stat-card">
                <div className="modern-stat-header">
                  <span className="modern-stat-label">{stat.label}</span>
                  <span className="modern-stat-value">{stat.value}</span>
                </div>
                <div className="modern-stat-progress">
                  <div className="modern-progress-bar">
                    <div 
                      className="modern-progress-fill" 
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                  <span className="modern-stat-target">{stat.target} {stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Meals */}
        <section className="modern-recent-meals">
          <div className="modern-section-header">
            <h3>Recent Meals</h3>
            <button className="modern-view-all-btn">View All</button>
          </div>
          <div className="modern-meals-list">
            {recentMeals.map((meal, index) => (
              <div key={index} className="modern-meal-card">
                <div className="modern-meal-info">
                  <h4>{meal.name}</h4>
                  <p className="modern-meal-restaurant">{meal.restaurant}</p>
                  <div className="modern-meal-meta">
                    <span className="modern-meal-time">
                      <Clock size={14} />
                      {meal.time}
                    </span>
                    <span className="modern-meal-rating">
                      <Star size={14} />
                      {meal.rating}
                    </span>
                  </div>
                </div>
                <div className="modern-meal-calories">
                  <span className="modern-calories-value">{meal.calories}</span>
                  <span className="modern-calories-unit">cal</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Preview */}
        <section className="modern-features-preview">
          <h3>Coming Soon</h3>
          <div className="modern-features-grid">
            <div className="modern-feature-card">
              <div className="modern-feature-icon">
                <Zap size={32} />
              </div>
              <h4>AI Menu Analysis</h4>
              <p>Instantly analyze any restaurant menu with our advanced AI technology</p>
            </div>
            <div className="modern-feature-card">
              <div className="modern-feature-icon">
                <Target size={32} />
              </div>
              <h4>Smart Goal Tracking</h4>
              <p>Set personalized nutrition goals and track your progress automatically</p>
            </div>
            <div className="modern-feature-card">
              <div className="modern-feature-icon">
                <Heart size={32} />
              </div>
              <h4>Health Insights</h4>
              <p>Get personalized recommendations based on your eating patterns</p>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="modern-development-status">
          <div className="modern-status-content">

            <div className="modern-status-text">
              <h3>Development in Progress</h3>
              <p>
                Our team is actively working on building the backend infrastructure and implementing all the exciting features you see above. 
                We're committed to delivering a world-class nutrition planning experience that will revolutionize how you make food choices.
              </p>
              <div className="modern-status-highlights">
                <div className="modern-highlight-item">
                  <div className="modern-highlight-dot"></div>
                  <span>Advanced AI menu analysis engine</span>
                </div>
                <div className="modern-highlight-item">
                  <div className="modern-highlight-dot"></div>
                  <span>Real-time nutrition tracking</span>
                </div>
                <div className="modern-highlight-item">
                  <div className="modern-highlight-dot"></div>
                  <span>Personalized meal recommendations</span>
                </div>
                <div className="modern-highlight-item">
                  <div className="modern-highlight-dot"></div>
                  <span>Comprehensive restaurant database</span>
                </div>
              </div>
              <div className="modern-status-footer">
                <p className="modern-eta-text">
                  <strong>Expected Launch:</strong> All features will be available soon! 
                  Stay tuned for updates and be among the first to experience the future of nutrition planning.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ModernAppPage
