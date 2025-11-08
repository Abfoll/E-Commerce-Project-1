const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - FIXED FOR PRODUCTION
app.use(cors({
  origin: [
    'https://e-commerce-project-1-medk.vercel.app', // Your Admin Dashboard
    'https://e-commerce-project-1-medk-1e5ktkiic-abenezer-teketels-projects.vercel.app', // Your Admin Dashboard preview
    'http://localhost:3000', // Local development
    'http://localhost:3001',
    'https://your-client-website.vercel.app' // Your Client Website - UPDATE AFTER DEPLOYMENT
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    
    res.json({
      success: true,
      message: 'Ecommerce API is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'Connected ✅',
      port: PORT
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ecommerce API is running but database connection failed',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'Disconnected ❌',
      error: error.message
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Ecommerce Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders',
      categories: '/api/categories',
      users: '/api/users',
      upload: '/api/upload'
    },
    documentation: 'Check /api/health for detailed status'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Create default admin user
const createDefaultAdmin = async () => {
  const { User } = require('./models');
  
  try {
    const adminExists = await User.findOne({ where: { email: 'admin@ecommerce.com' } });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@ecommerce.com',
        password: 'admin123', // Change this in production!
        role: 'admin',
        phone: '+1234567890'
      });
      console.log('✅ Default admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Failed to create default admin:', error.message);
  }
};

// Database connection and server start
const startServer = async () => {
  try {
    console.log('🚀 Starting Ecommerce Backend Server...');
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Database: ${process.env.DATABASE_URL ? 'Neon PostgreSQL' : 'Local PostgreSQL'}`);

    // Test database connection
    await testConnection();

    // Sync database (use { force: true } only in development to reset database)
    const syncOptions = { force: false };
    if (process.env.NODE_ENV === 'development') {
      // syncOptions.force = true; // Uncomment to reset database in development
      console.log('💡 Development mode: Database sync without force');
    } else {
      console.log('🏗️  Production mode: Safe database sync');
    }

    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized');

    // Create default admin user if not exists
    await createDefaultAdmin();

    // FIXED: Bind to 0.0.0.0 for production
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🎉 Server running on port ${PORT}`);
      console.log(`📊 Health check: /api/health`);
      console.log(`🛍️  E-commerce API ready!`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  await sequelize.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;