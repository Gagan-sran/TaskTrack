require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

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

// Auto-initialize database tables on startup
async function initializeDatabase() {
  try {
    console.log('🔍 Checking database tables...');
    
    // Check if users table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('📋 Creating database tables...');
      
      // Create Users table
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✓ Users table created');

      // Create Categories table
      await db.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          category_name VARCHAR(100) NOT NULL,
          user_id INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
      console.log('✓ Categories table created');

      // Create Tasks table
      await db.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          due_date DATE,
          status VARCHAR(50) DEFAULT 'pending',
          user_id INTEGER NOT NULL,
          category_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
      `);
      console.log('✓ Tasks table created');
      
      console.log('✅ Database initialization complete!');
    } else {
      console.log('✅ Database tables already exist');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    // Don't exit - let the app continue, tables might already exist
  }
}

// Routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Root route — returns a map of all available endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'TaskTrack API',
    version: '1.0.0',
    status: 'Running',
    note: 'Protected routes require: Authorization: Bearer <token>',
    endpoints: {
      auth: {
        register: 'POST /api/users/register  (public)',
        login:    'POST /api/users/login     (public)'
      },
      users: {
        getAll:  'GET    /api/users      (protected)',
        getOne:  'GET    /api/users/:id  (protected)',
        update:  'PUT    /api/users/:id  (protected — own account)',
        delete:  'DELETE /api/users/:id  (protected — own account)'
      },
      tasks: {
        getAll:  'GET    /api/tasks      (protected)',
        getOne:  'GET    /api/tasks/:id  (protected)',
        create:  'POST   /api/tasks      (protected)',
        update:  'PUT    /api/tasks/:id  (protected)',
        delete:  'DELETE /api/tasks/:id  (protected)'
      },
      categories: {
        getAll:  'GET    /api/categories      (protected)',
        getOne:  'GET    /api/categories/:id  (protected)',
        create:  'POST   /api/categories      (protected)',
        update:  'PUT    /api/categories/:id  (protected)',
        delete:  'DELETE /api/categories/:id  (protected)'
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

// Start server with database initialization
async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();
    
    // Then start the server
    app.listen(PORT, () => {
      console.log(`\n🚀 TaskTrack Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${PORT}`);
      console.log('\n📖 Available endpoints:');
      console.log('   POST   /api/users/register');
      console.log('   POST   /api/users/login');
      console.log('   GET    /api/users  |  GET /api/users/:id');
      console.log('   PUT    /api/users/:id  |  DELETE /api/users/:id');
      console.log('   GET    /api/tasks  |  GET /api/tasks/:id');
      console.log('   POST   /api/tasks  |  PUT /api/tasks/:id  |  DELETE /api/tasks/:id');
      console.log('   GET    /api/categories  |  GET /api/categories/:id');
      console.log('   POST   /api/categories  |  PUT /api/categories/:id  |  DELETE /api/categories/:id\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
