import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCxxULhjhPwp_M13U5Yoc8SrBx7wVL8UEI",
    authDomain: "menumaven-407ae.firebaseapp.com",
    projectId: "menumaven-407ae",
    storageBucket: "menumaven-407ae.firebasestorage.app",
    messagingSenderId: "349703818089",
    appId: "1:349703818089:web:11e5585a3415db94ce4bf8",
    measurementId: "G-JV5MHJENNE"
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
  
  return new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: (response) => {
      console.log('reCAPTCHA solved')
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired')
    }
  })
}

export default app
