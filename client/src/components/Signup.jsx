import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import './Login.css'

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { sendOTP, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    
    if (!phoneNumber) {
      setError('Please enter your phone number')
      return
    }

    // Format phone number with country code
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`

    try {
      setError('')
      setLoading(true)
      const result = await sendOTP(formattedPhone)
      setConfirmationResult(result)
      setStep('otp')
    } catch (error) {
      console.error('OTP Error:', error)
      let errorMessage = 'Failed to send OTP. Please try again.'
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format. Please check your number.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.'
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'SMS quota exceeded. Please try again later.'
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = 'reCAPTCHA verification failed. Please refresh and try again.'
      }
      
      setError(errorMessage)
    }
    setLoading(false)
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    
    if (!otp) {
      setError('Please enter the OTP')
      return
    }

    try {
      setError('')
      setLoading(true)
      await confirmationResult.confirm(otp)
      navigate('/app')
    } catch (error) {
      setError('Invalid OTP. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      await loginWithGoogle()
      navigate('/app')
    } catch (error) {
      setError('Failed to sign up with Google')
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join MenuMaven and start your nutrition journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <Phone size={20} className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <p className="input-hint">We'll send you a verification code</p>
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
              <ArrowRight size={20} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="otp">Verification Code</label>
              <div className="input-wrapper">
                <Phone size={20} className="input-icon" />
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  required
                />
              </div>
              <p className="input-hint">Enter the code sent to {phoneNumber}</p>
            </div>

            <div className="otp-actions">
              <button 
                type="button" 
                className="auth-button secondary"
                onClick={() => setStep('phone')}
                disabled={loading}
              >
                <ArrowLeft size={20} />
                Change Number
              </button>
              <button 
                type="submit" 
                className="auth-button primary"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}

        <div className="divider">
          <span>or</span>
        </div>

        <button 
          className="auth-button google"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
      
      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default Signup
