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
export const googleProvider = new GoogleAuthProvider()

// Create reCAPTCHA verifier
export const createRecaptchaVerifier = () => {
  // Clear any existing reCAPTCHA
  const recaptchaContainer = document.getElementById('recaptcha-container')
  if (recaptchaContainer) {
    recaptchaContainer.innerHTML = ''
  }
  
  try {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved')
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired')
      }
    })
    
    // Render the reCAPTCHA
    recaptchaVerifier.render().then((widgetId) => {
      console.log('reCAPTCHA rendered with widget ID:', widgetId)
    }).catch((error) => {
      console.error('reCAPTCHA render error:', error)
    })
    
    return recaptchaVerifier
  } catch (error) {
    console.error('Error creating reCAPTCHA verifier:', error)
    throw error
  }
}

export default app
