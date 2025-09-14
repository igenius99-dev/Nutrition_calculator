# Firebase Authentication Setup Guide

## 🔥 Firebase Configuration

To complete the authentication setup, you need to configure Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `nutrition-planner` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:
   - **Phone**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's support email

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`)
4. Register your app with a nickname (e.g., "nutrition-planner-web")
5. Copy the Firebase configuration object

### 4. Update Firebase Config

Replace the placeholder values in `client/src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### 5. Set Up Domain (Optional)

1. In Authentication > Settings > Authorized domains
2. Add your production domain when ready
3. `localhost` is already included for development

## 🚀 Features Included

### Authentication Methods:

- ✅ Phone number authentication with OTP
- ✅ Google OAuth login
- ✅ Two-step verification process
- ✅ Form validation
- ✅ Error handling
- ✅ Protected routes

### UI Features:

- ✅ Modern, responsive design
- ✅ Glassmorphism effects
- ✅ Smooth animations
- ✅ Mobile-friendly
- ✅ Consistent with landing page design

## 🔧 Usage

### Routes:

- `/` - Landing page (public)
- `/login` - Sign in page
- `/signup` - Sign up page
- `/app` - Protected app page (requires authentication)

### Authentication State:

- Users are automatically redirected to login if not authenticated
- Landing page shows different content for logged-in users
- Header displays user email and logout button when authenticated

## 🛡️ Security Features

- Protected routes that require authentication
- Automatic token refresh
- Secure password requirements
- CSRF protection via Firebase
- Email verification (can be enabled in Firebase console)

## 📱 Testing

1. Start your development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Enter your phone number and verify with OTP
4. Test Google OAuth login
5. Verify protected routes redirect to login when not authenticated

## 🔄 Next Steps

1. Configure Firebase with your actual project details
2. Test all authentication flows
3. Add email verification if needed
4. Set up user profile management
5. Add password reset functionality
6. Configure production domains
