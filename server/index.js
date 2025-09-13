const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create temp_assets directory if it doesn't exist
const tempAssetsDir = path.join(__dirname, '../client/temp_assets');
if (!fs.existsSync(tempAssetsDir)) {
  fs.mkdirSync(tempAssetsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempAssetsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'menu-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG, WebP) are allowed!'));
    }
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'MenuMaven API is running!',
    description: 'Your smart guide to restaurant nutrition',
    timestamp: new Date().toISOString()
  });
});

// Image upload route
app.post('/api/upload/menu', upload.single('menuImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    res.json({
      message: 'Menu image uploaded successfully',
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Nutrition-related routes
app.get('/api/nutrition/foods', (req, res) => {
  // Mock data for now
  const foods = [
    { id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { id: 2, name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { id: 3, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  ];
  res.json(foods);
});

app.post('/api/nutrition/meals', (req, res) => {
  const { name, foods, date } = req.body;
  // Mock response
  res.json({
    id: Date.now(),
    name,
    foods,
    date,
    createdAt: new Date().toISOString()
  });
});

// Menu analysis route (placeholder for future AI integration)
app.post('/api/analyze/menu', (req, res) => {
  const { imagePath } = req.body;
  
  // Mock analysis response
  // In a real app, this would call an AI service to analyze the menu
  res.json({
    restaurant: "Sample Restaurant",
    items: [
      { name: "Grilled Chicken Salad", calories: 320, healthScore: 8.5, category: "Healthy" },
      { name: "Caesar Salad", calories: 450, healthScore: 6.2, category: "Moderate" },
      { name: "Chicken Burger", calories: 680, healthScore: 4.1, category: "Indulgent" },
      { name: "Fish & Chips", calories: 850, healthScore: 3.8, category: "Indulgent" }
    ],
    analysisTime: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
