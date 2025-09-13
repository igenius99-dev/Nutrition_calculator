import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Camera, Upload, X, Sparkles, Utensils, Clock, Star } from 'lucide-react'
import './App.css'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [activeTab, setActiveTab] = useState('upload')

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setIsUploading(true)
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('menuImage', file)
        
        // Upload to backend
        const response = await axios.post('/api/upload/menu', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setUploadedImage({
          file,
          preview: previewUrl,
          path: response.data.path
        })
        
        // Simulate menu analysis (replace with actual API call)
        setTimeout(() => {
          setAnalysisResult({
            restaurant: "Sample Restaurant",
            items: [
              { name: "Grilled Chicken Salad", calories: 320, healthScore: 8.5, category: "Healthy" },
              { name: "Caesar Salad", calories: 450, healthScore: 6.2, category: "Moderate" },
              { name: "Chicken Burger", calories: 680, healthScore: 4.1, category: "Indulgent" },
              { name: "Fish & Chips", calories: 850, healthScore: 3.8, category: "Indulgent" }
            ]
          })
          setIsUploading(false)
        }, 2000)
        
      } catch (error) {
        console.error('Upload error:', error)
        setIsUploading(false)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  })

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview)
    }
    setUploadedImage(null)
    setAnalysisResult(null)
  }

  const getHealthScoreColor = (score) => {
    if (score >= 8) return '#10b981' // green
    if (score >= 6) return '#f59e0b' // yellow
    if (score >= 4) return '#f97316' // orange
    return '#ef4444' // red
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Utensils className="logo-icon" />
            <h1>MenuNutri</h1>
          </div>
          <p className="tagline">Snap. Analyze. Eat Smart.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Camera size={20} />
            Upload Menu
          </button>
          <button 
            className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
            disabled={!analysisResult}
          >
            <Sparkles size={20} />
            Analysis
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === 'upload' && (
          <div className="upload-section">
            {!uploadedImage ? (
              <div 
                {...getRootProps()} 
                className={`upload-zone ${isDragActive ? 'drag-active' : ''}`}
              >
                <input {...getInputProps()} />
                <div className="upload-content">
                  <div className="upload-icon">
                    <Upload size={48} />
                  </div>
                  <h3>Upload Menu Photo</h3>
                  <p>Drag & drop a menu image here, or click to select</p>
                  <div className="upload-formats">
                    <span>Supports: JPG, PNG, WebP</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <div className="preview-header">
                  <h3>Menu Uploaded Successfully!</h3>
                  <button onClick={clearImage} className="clear-button">
                    <X size={20} />
                  </button>
                </div>
                <div className="preview-image">
                  <img src={uploadedImage.preview} alt="Menu preview" />
                  {isUploading && (
                    <div className="uploading-overlay">
                      <div className="spinner"></div>
                      <p>Analyzing menu...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analysis Section */}
        {activeTab === 'analysis' && analysisResult && (
          <div className="analysis-section">
            <div className="analysis-header">
              <h2>Menu Analysis</h2>
              <div className="restaurant-info">
                <h3>{analysisResult.restaurant}</h3>
                <div className="analysis-stats">
                  <div className="stat">
                    <Clock size={16} />
                    <span>4 items analyzed</span>
                  </div>
                  <div className="stat">
                    <Star size={16} />
                    <span>Avg Health Score: 5.7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-items">
              {analysisResult.items.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <div className="health-score" style={{ color: getHealthScoreColor(item.healthScore) }}>
                      {item.healthScore}/10
                    </div>
                  </div>
                  <div className="item-details">
                    <div className="calories">{item.calories} cal</div>
                    <div className={`category ${item.category.toLowerCase()}`}>
                      {item.category}
                    </div>
                  </div>
                  <div className="recommendation">
                    {item.healthScore >= 8 && "🥗 Great choice! Highly recommended."}
                    {item.healthScore >= 6 && item.healthScore < 8 && "👍 Good option with some considerations."}
                    {item.healthScore >= 4 && item.healthScore < 6 && "⚠️ Consider healthier alternatives."}
                    {item.healthScore < 4 && "❌ Not recommended for regular consumption."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
