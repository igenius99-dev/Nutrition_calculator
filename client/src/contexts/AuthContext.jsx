import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithPhoneNumber,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider, createRecaptchaVerifier } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Send OTP to phone number
  function sendOTP(phoneNumber) {
    console.log('Sending OTP to:', phoneNumber)
    const appVerifier = createRecaptchaVerifier()
    console.log('reCAPTCHA verifier created:', appVerifier)
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  }

  // Sign in with Google
  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider)
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

    return unsubscribe
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
