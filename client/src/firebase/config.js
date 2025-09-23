import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})
googleProvider.addScope('email')
googleProvider.addScope('profile')

// Global reCAPTCHA verifier instance
let recaptchaVerifier = null

// Create reCAPTCHA verifier
export const createRecaptchaVerifier = () => {
  // Clear any existing reCAPTCHA
  const recaptchaContainer = document.getElementById('recaptcha-container')
  if (!recaptchaContainer) {
    console.error('reCAPTCHA container not found. Make sure element with id "recaptcha-container" exists.')
    throw new Error('reCAPTCHA container not found')
  }
  
  // Clear previous verifier
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
  
  recaptchaContainer.innerHTML = ''
  
  try {
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved successfully')
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired, user needs to solve it again')
      },
      'error-callback': (error) => {
        console.error('reCAPTCHA error:', error)
      }
    })
    
    // Render the reCAPTCHA
    return recaptchaVerifier.render().then((widgetId) => {
      console.log('reCAPTCHA rendered successfully with widget ID:', widgetId)
      return recaptchaVerifier
    }).catch((error) => {
      console.error('reCAPTCHA render error:', error)
      throw error
    })
    
  } catch (error) {
    console.error('Error creating reCAPTCHA verifier:', error)
    throw error
  }
}

// Clear reCAPTCHA verifier
export const clearRecaptchaVerifier = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
  
  const recaptchaContainer = document.getElementById('recaptcha-container')
  if (recaptchaContainer) {
    recaptchaContainer.innerHTML = ''
  }
}

export default app
