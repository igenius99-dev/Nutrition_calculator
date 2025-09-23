import React, { useState } from 'react'
import { auth } from '../firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const PhoneTest = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)

  const initializeRecaptcha = () => {
    try {
      // Clear any existing reCAPTCHA
      const recaptchaContainer = document.getElementById('recaptcha-container')
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = ''
      }

      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response)
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired')
        }
      })

      verifier.render().then((widgetId) => {
        console.log('reCAPTCHA rendered with widget ID:', widgetId)
        setRecaptchaVerifier(verifier)
      }).catch((error) => {
        console.error('reCAPTCHA render error:', error)
        setError('reCAPTCHA failed to load: ' + error.message)
      })

    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error)
      setError('Error initializing reCAPTCHA: ' + error.message)
    }
  }

  const sendOTP = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number')
      return
    }

    if (!recaptchaVerifier) {
      setError('reCAPTCHA not initialized. Please click "Initialize reCAPTCHA" first.')
      return
    }

    try {
      setError('')
      setLoading(true)
      
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`
      console.log('Sending OTP to:', formattedPhone)
      
      const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier)
      console.log('OTP sent successfully:', result)
      setConfirmationResult(result)
      setError('OTP sent successfully! Check your phone.')
    } catch (error) {
      console.error('OTP Error:', error)
      setError(`Error: ${error.code} - ${error.message}`)
    }
    setLoading(false)
  }

  const verifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP')
      return
    }

    if (!confirmationResult) {
      setError('No confirmation result. Please send OTP first.')
      return
    }

    try {
      setError('')
      setLoading(true)
      
      const result = await confirmationResult.confirm(otp)
      console.log('OTP verified successfully:', result)
      setError('OTP verified successfully! User logged in.')
    } catch (error) {
      console.error('OTP verification error:', error)
      setError(`Verification failed: ${error.code} - ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Phone Authentication Test</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={initializeRecaptcha} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
          Initialize reCAPTCHA
        </button>
        <div id="recaptcha-container"></div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="tel"
          placeholder="Enter phone number (e.g., +1234567890)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
        />
        <button onClick={sendOTP} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </div>

      {confirmationResult && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
          />
          <button onClick={verifyOTP} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '4px',
          marginTop: '1rem',
          whiteSpace: 'pre-wrap'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <h3>Debug Info:</h3>
        <p>reCAPTCHA Verifier: {recaptchaVerifier ? 'Initialized' : 'Not initialized'}</p>
        <p>Confirmation Result: {confirmationResult ? 'Available' : 'Not available'}</p>
        <p>Auth User: {auth.currentUser ? auth.currentUser.phoneNumber : 'Not logged in'}</p>
      </div>
    </div>
  )
}

export default PhoneTest

