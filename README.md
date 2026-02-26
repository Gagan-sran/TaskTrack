# TaskTrack - Simple Task Management Web App

A full-stack task management application built with Node.js, Express, PostgreSQL, and React.

**Student:** Gagandeep Singh (9047496)  
**Course:** PROG2500 - Full Stack Development

## Features

- ✅ User Registration & Authentication
- ✅ Create, Read, Update, Delete (CRUD) Tasks
- ✅ Task Categories
- ✅ Due Date Tracking
- ✅ Task Status Management
- ✅ RESTful API

## Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL (Render)
- JWT Authentication
- bcryptjs for password hashing

**Frontend (Sprint 2):**
- React
- React Router
- Axios

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- created_at

### Tasks Table
- id (Primary Key)
- title
- description
- due_date
- status (pending/completed)
- user_id (Foreign Key → Users)
- category_id (Foreign Key → Categories)
- created_at
- updated_at

### Categories Table
- id (Primary Key)
- category_name
- user_id (Foreign Key → Users)
- created_at

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd TaskTrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_render_postgresql_url
JWT_SECRET=your_secret_key
```

### 4. Set Up Render PostgreSQL Database

1. Go to [Render.com](https://render.com)
2. Create a new PostgreSQL database
3. Copy the **External Database URL**
4. Paste it in your `.env` file as `DATABASE_URL`

### 5. Initialize Database Tables
```bash
npm run db:setup
```

### 6. Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`
Live API URL: `https://tasktrack-gm4r.onrender.com`

## API Endpoints

### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |

### Task Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Category Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | Yes |
| POST | `/api/categories` | Create new category | Yes |
| DELETE | `/api/categories/:id` | Delete category | Yes |

## API Usage Examples

### Register a User
```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create a Task (Authenticated)
```bash
POST /api/tasks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Complete Assignment",
  "description": "Finish the full stack project",
  "due_date": "2026-02-10",
  "category_id": 1
}
```

### Update Task Status
```bash
PUT /api/tasks/1
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "status": "completed"
}
```

## Deployment to Render

### 1. Create Web Service
1. Push your code to GitHub
2. Go to Render Dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### 2. Configure Web Service
- **Name:** tasktrack-api
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 3. Add Environment Variables
Add these in Render's Environment settings:
- `DATABASE_URL` → (Auto-filled from your Render PostgreSQL)
- `JWT_SECRET` → (Your secret key)
- `NODE_ENV` → `production`

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Your API will be live at: `https://tasktrack-gm4r.onrender.com`

### 5. Initialize Database on Render
After deployment, run this command in Render Shell:
```bash
npm run db:setup
```

## Project Structure
```
TaskTrack/
├── db/
│   └── setup.js          # Database initialization
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── users.js          # User routes (register/login)
│   ├── tasks.js          # Task CRUD routes
│   └── categories.js     # Category routes
├── db.js                 # PostgreSQL connection
├── server.js             # Express app entry point
├── package.json          # Dependencies
├── .env.example          # Environment variable template
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Sprint Progress

### ✅ Sprint 1 - Backend (Weeks 2-3)
- [x] Node.js & Express setup
- [x] PostgreSQL database configuration
- [x] User authentication (register/login)
- [x] JWT token implementation
- [x] Task CRUD operations
- [x] Category management
- [x] API testing ready

### 🔄 Sprint 2 - Frontend (Weeks 9-10)
- [ ] React setup
- [ ] Login/Register pages
- [ ] Dashboard with task list
- [ ] Create/Edit task forms
- [ ] Category management UI

### 🔄 Sprint 3 - Integration (Weeks 12-13)
- [ ] Frontend-Backend integration
- [ ] API calls with Axios
- [ ] Authentication flow
- [ ] Final deployment
- [ ] Testing

## Testing the API

You can test the API using:
- **Postman** or **Insomnia**
- **Thunder Client** (VS Code extension)
- **cURL** commands

Example cURL:
```bash
# Register
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## Git Commit Guidelines

Follow these practices for good Git history:
```bash
# Initial commit
git add .
git commit -m "Initial commit: Project setup with Express and PostgreSQL"

# Feature commits
git commit -m "Add user registration and authentication"
git commit -m "Implement task CRUD operations"
git commit -m "Add category management routes"

# Regular commits during development
git commit -m "Update task validation logic"
git commit -m "Fix authentication middleware bug"
```

## License

This project is created for educational purposes as part of PROG2500 coursework.

## Author

**Gagandeep Singh**  
Student ID: 9047496  
Conestoga College

---

**Last Updated:** February 2026  
**Sprint 1 Status:** ✅ Complete
