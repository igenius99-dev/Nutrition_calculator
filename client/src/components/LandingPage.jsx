import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Sparkles, Heart, Zap, Shield, Users, ArrowRight, Star, CheckCircle, Target, Clock, TrendingUp, Award, Smartphone, Utensils } from 'lucide-react'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/app')
  }

  const features = [
    {
      icon: <Camera size={32} />,
      title: "Smart Menu Scanning",
      description: "Snap any restaurant menu and instantly get detailed nutritional breakdowns with AI-powered analysis",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Person taking photo of restaurant menu with smartphone"
    },
    {
      icon: <Target size={32} />,
      title: "Calorie & Protein Tracking",
      description: "Set daily goals and track your intake across multiple meals to stay within your budget",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Nutrition tracking dashboard with calories and protein goals"
    },
    {
      icon: <Clock size={32} />,
      title: "Multi-Meal Planning",
      description: "Plan your entire day's meals across different restaurants to meet your nutrition goals",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Multiple restaurant meals planned for the day"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Smart Recommendations",
      description: "Get personalized suggestions based on your dietary preferences and health goals",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Healthy food recommendations and suggestions"
    },
    {
      icon: <Award size={32} />,
      title: "Health Scoring",
      description: "See nutrition grades for every menu item with our modern visual scoring system",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Nutrition grade scoring system display"
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile-First Design",
      description: "Optimized for busy lifestyles - make smart choices on the go, anywhere, anytime",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Mobile app interface for nutrition tracking"
    }
  ]

  const stats = [
    { number: "50K+", label: "Menus Analyzed" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "500+", label: "Restaurant Chains" },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fitness Enthusiast",
      content: "Finally, an app that lets me plan my entire day's meals across different restaurants while staying within my calorie goals!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Busy Professional",
      content: "The menu scanning is incredible - I can make smart choices even during hectic work days.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Health Coach",
      content: "The nutrition scoring system is so intuitive. My clients love how easy it is to understand their food choices.",
      rating: 5
    }
  ]

  const nutritionGrades = [
    { grade: "A+", color: "#10B981", description: "Excellent nutrition profile" },
    { grade: "A", color: "#34D399", description: "Great nutritional value" },
    { grade: "B+", color: "#FBBF24", description: "Good with minor concerns" },
    { grade: "B", color: "#F59E0B", description: "Decent nutritional content" },
    { grade: "C", color: "#EF4444", description: "Consider alternatives" }
  ]

  return (
    <div className="landing-page">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            <span>Revolutionary Nutrition App</span>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">MenuMaven</span>
            <br />
            Your Smart Nutrition Assistant
          </h1>
          
          <p className="hero-description">
            Take a photo of any menu and instantly get nutrition grades, calorie counts, and protein tracking. 
            Plan your entire day's meals across multiple restaurants while staying within your health goals.
          </p>
          
          <div className="hero-actions">
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started Free
              <ArrowRight size={20} />
            </button>
           
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose MenuMaven?</h2>
            <p>Experience the future of smart dining with our cutting-edge features</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-image">
                  <img 
                    src={feature.image} 
                    alt={feature.imageAlt}
                    loading="lazy"
                  />
                  <div className="feature-overlay">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Grading System */}
      <section className="grading-system">
        <div className="container">
          <div className="section-header">
            <h2>Smart Nutrition Scoring</h2>
            <p>Every menu item gets an instant nutrition grade to help you make informed decisions</p>
          </div>
          
          <div className="grading-showcase">
            <div className="grading-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="menu-item">
                    <div className="item-name">Grilled Salmon Bowl</div>
                    <div className="nutrition-grade grade-a-plus">A+</div>
                    <div className="nutrition-details">
                      <span>450 cal • 35g protein</span>
                    </div>
                  </div>
                  <div className="menu-item">
                    <div className="item-name">Caesar Salad</div>
                    <div className="nutrition-grade grade-b">B</div>
                    <div className="nutrition-details">
                      <span>320 cal • 12g protein</span>
                    </div>
                  </div>
                  <div className="menu-item">
                    <div className="item-name">Chicken Burger</div>
                    <div className="nutrition-grade grade-c">C</div>
                    <div className="nutrition-details">
                      <span>680 cal • 28g protein</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grading-legend">
              <h3>Our Grading System</h3>
              <div className="grade-list">
                {nutritionGrades.map((item, index) => (
                  <div key={index} className="grade-item">
                    <div className="grade-badge" style={{ backgroundColor: item.color }}>
                      {item.grade}
                    </div>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of people making smarter food choices every day</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to smarter dining</p>
          </div>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Take a Photo</h3>
                <p>Snap a clear photo of any restaurant menu using your phone's camera</p>
              </div>
            </div>
            
            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Our advanced AI instantly recognizes menu items and analyzes nutritional content</p>
              </div>
            </div>
            
            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Insights</h3>
                <p>Receive personalized health scores, calorie counts, and smart recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Smart Nutrition Journey</h2>
            <p>Join 50,000+ users who are making smarter food choices and achieving their health goals every day</p>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Free to start</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Works with any restaurant</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <Camera size={24} />
                <span>MenuMaven</span>
              </div>
              <p>Your smart guide to restaurant nutrition. Make healthy dining choices simple and accessible for everyone.</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#demo">Demo</a>
              </div>
              
              <div className="link-group">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#faq">FAQ</a>
              </div>
              
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 MenuMaven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
