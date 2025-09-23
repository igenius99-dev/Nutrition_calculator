import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithPhoneNumber,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider, createRecaptchaVerifier, clearRecaptchaVerifier } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Send OTP to phone number
  async function sendOTP(phoneNumber) {
    try {
      console.log('Sending OTP to:', phoneNumber)
      
      // Create and render reCAPTCHA verifier
      const appVerifier = await createRecaptchaVerifier()
      console.log('reCAPTCHA verifier created and rendered:', appVerifier)
      
      // Send OTP with reCAPTCHA verification
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      console.log('OTP sent successfully')
      return result
    } catch (error) {
      console.error('Error sending OTP:', error)
      
      // Clear reCAPTCHA on error
      clearRecaptchaVerifier()
      
      // Re-throw the error with more context
      if (error.code === 'auth/captcha-check-failed') {
        throw new Error('reCAPTCHA verification failed. Please try again.')
      } else if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid phone number format.')
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many requests. Please try again later.')
      } else if (error.code === 'auth/quota-exceeded') {
        throw new Error('SMS quota exceeded. Please try again later.')
      } else {
        throw error
      }
    }
  }

  // Sign in with Google
  async function loginWithGoogle() {
    try {
      console.log('Starting Google sign-in...')
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Google sign-in successful:', result.user)
      return result
    } catch (error) {
      console.error('Google sign-in error:', error)
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.')
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by your browser. Please allow popups and try again.')
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.')
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized for Google sign-in.')
      } else {
        throw new Error(`Sign-in failed: ${error.message}`)
      }
    }
  }

  // Sign out
  function logout() {
    return signOut(auth)
  }

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Cleanup function to clear reCAPTCHA when component unmounts
    return () => {
      unsubscribe()
      clearRecaptchaVerifier()
    }
  }, [])

  const value = {
    currentUser,
    sendOTP,
    loginWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Default export for better compatibility
export default AuthProvider
