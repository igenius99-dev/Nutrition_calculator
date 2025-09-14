#!/bin/bash

# Nutrition Planner Environment Setup Script
echo "🚀 Setting up Nutrition Planner environment..."

# Create client .env file
echo "📝 Creating client environment file..."
cat > client/.env << EOF
# Environment variables for Nutrition Planner Client
VITE_FIREBASE_API_KEY=AIzaSyCxxULhjhPwp_M13U5Yoc8SrBx7wVL8UEI
VITE_FIREBASE_AUTH_DOMAIN=menumaven-407ae.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=menumaven-407ae
VITE_FIREBASE_STORAGE_BUCKET=menumaven-407ae.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=349703818089
VITE_FIREBASE_APP_ID=1:349703818089:web:11e5585a3415db94ce4bf8
VITE_FIREBASE_MEASUREMENT_ID=G-JV5MHJENNE
EOF

# Create server .env file
echo "📝 Creating server environment file..."
cat > server/.env << EOF
# Environment variables for Nutrition Planner Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
EOF

echo "✅ Environment files created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Review and update the .env files if needed"
echo "2. Run 'npm run install-all' to install dependencies"
echo "3. Run 'npm run dev' to start development"
echo "4. Run 'npm run build' to test production build"
echo ""
echo "🔧 For production deployment:"
echo "1. Update CLIENT_URL in server/.env to your production domain"
echo "2. Set NODE_ENV=production in server/.env"
echo "3. Follow the DEPLOYMENT.md guide"
