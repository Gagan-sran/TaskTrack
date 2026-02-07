require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'TaskTrack API',
    version: '1.0.0',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login'
      },
      tasks: {
        getAll: 'GET /api/tasks',
        getOne: 'GET /api/tasks/:id',
        create: 'POST /api/tasks',
        update: 'PUT /api/tasks/:id',
        delete: 'DELETE /api/tasks/:id'
      },
      categories: {
        getAll: 'GET /api/categories',
        create: 'POST /api/categories',
        delete: 'DELETE /api/categories/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 TaskTrack Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log('\n📖 Available endpoints:');
  console.log('   POST /api/users/register');
  console.log('   POST /api/users/login');
  console.log('   GET  /api/tasks');
  console.log('   POST /api/tasks');
  console.log('   PUT  /api/tasks/:id');
  console.log('   DELETE /api/tasks/:id');
  console.log('   GET  /api/categories');
  console.log('   POST /api/categories');
  console.log('   DELETE /api/categories/:id\n');
});
