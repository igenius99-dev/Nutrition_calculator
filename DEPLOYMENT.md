# Nutrition Planner - Deployment Guide

This guide covers deploying the Nutrition Planner application to various platforms.

## Prerequisites

- Node.js 18+ and npm 8+
- Git repository
- Firebase project configured
- Environment variables set up

## Environment Variables

### Client-side (Vite Environment Variables)

Create a `.env` file in the `client/` directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Server-side Environment Variables

Create a `.env` file in the `server/` directory:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.com
```

## Local Production Build

1. Install all dependencies:

```bash
npm run install-all
```

2. Build the client:

```bash
npm run build
```

3. Start the production server:

```bash
npm run start:prod
```

## Deployment Options

### Option 1: Heroku

1. Install Heroku CLI
2. Create a Heroku app:

```bash
heroku create your-app-name
```

3. Set environment variables:

```bash
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com
```

4. Deploy:

```bash
git add .
git commit -m "Deploy to production"
git push heroku main
```

### Option 2: Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Option 3: Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Option 4: DigitalOcean App Platform

1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build:all`
   - Run Command: `npm start`
3. Set environment variables
4. Deploy

## Firebase Configuration

1. Go to Firebase Console
2. Select your project
3. Go to Project Settings > General
4. Add your domain to authorized domains
5. Configure authentication providers as needed

## Build Optimization

The app is configured with:

- Code splitting for better performance
- Terser minification
- Static file serving in production
- Proper CORS configuration
- Security headers with Helmet

## Monitoring

- Health check endpoint: `/api/health`
- Server logs are configured for production
- Error handling with proper status codes

## Troubleshooting

### Common Issues:

1. **Build fails**: Check Node.js version (18+ required)
2. **Firebase auth not working**: Verify environment variables are set
3. **CORS errors**: Check CLIENT_URL environment variable
4. **Static files not serving**: Ensure build completed successfully

### Debug Commands:

```bash
# Check build
npm run build

# Test production locally
npm run start:prod

# Check environment variables
echo $NODE_ENV
```

## Security Notes

- Never commit `.env` files
- Use HTTPS in production
- Keep Firebase API keys secure
- Regularly update dependencies
- Monitor for security vulnerabilities

## Performance Tips

- Enable gzip compression on your server
- Use a CDN for static assets
- Monitor bundle size
- Implement caching strategies
- Use Firebase hosting for static files if needed
