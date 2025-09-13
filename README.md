# 📸 MenuNutri - Smart Restaurant Menu Analyzer

A revolutionary nutrition app that analyzes restaurant menus from photos! Simply snap a photo of any restaurant menu, and get instant nutritional analysis and health recommendations for each dish.

## 🚀 Features

- **📸 Photo Upload**: Drag & drop or click to upload menu photos
- **🤖 AI Analysis**: Smart menu analysis with health scoring (coming soon)
- **📊 Nutrition Insights**: Detailed calorie counts and health recommendations
- **🎨 Modern UI**: Beautiful gradient design with glassmorphism effects
- **📱 Responsive**: Mobile-friendly design for on-the-go use
- **⚡ Real-time**: Instant analysis and recommendations
- **💾 Local Storage**: Photos saved to temp_assets folder

## 📁 Project Structure

```
nutrition-planner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styling
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                # Express backend
│   ├── index.js           # Express server
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json
└── README.md             # This file
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project**

   ```bash
   cd nutrition-planner
   ```

2. **Install all dependencies**

   ```bash
   npm run install-all
   ```

3. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 5173) and Express backend (port 5000) concurrently.

### Alternative: Manual Setup

If you prefer to set up each part separately:

1. **Install root dependencies**

   ```bash
   npm install
   ```

2. **Set up backend**

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Set up frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Check if the API is running

### Nutrition

- `GET /api/nutrition/foods` - Get available foods
- `POST /api/nutrition/meals` - Create a new meal

## 🎨 Features Overview

### Current Features

- ✅ Modern React frontend with Vite
- ✅ Express.js backend with middleware
- ✅ Photo upload with drag & drop interface
- ✅ Image storage in temp_assets folder
- ✅ Beautiful glassmorphism UI design
- ✅ Menu analysis simulation
- ✅ Health scoring system
- ✅ Responsive mobile design
- ✅ Real-time upload progress
- ✅ Error handling and loading states

### Planned Features

- 🔄 AI-powered menu text recognition (OCR)
- 🔄 Real nutrition database integration
- 🔄 Restaurant-specific recommendations
- 🔄 User preferences and dietary restrictions
- 🔄 Social sharing of healthy choices
- 🔄 Offline menu analysis
- 🔄 Multi-language support

## 🛠️ Development Scripts

### Root Level

- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build the frontend for production
- `npm start` - Start production server

### Frontend (client/)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server/)

- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Vite Proxy Configuration

The frontend is configured to proxy API requests to the backend automatically. See `client/vite.config.js` for details.

## 🚀 Deployment

### Frontend

```bash
cd client
npm run build
```

The built files will be in the `dist/` directory.

### Backend

```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**

   - Change the port in the respective configuration files
   - Kill the process using the port: `lsof -ti:5000 | xargs kill -9`

2. **CORS errors**

   - Ensure the backend is running
   - Check the CORS configuration in `server/index.js`

3. **Module not found errors**

   - Run `npm run install-all` to install all dependencies
   - Clear node_modules and reinstall if needed

4. **API connection issues**
   - Verify both servers are running
   - Check the proxy configuration in `vite.config.js`

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Happy coding! 🎉
