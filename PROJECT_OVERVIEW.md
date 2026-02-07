# 📋 PROJECT OVERVIEW - TaskTrack

## What You Have Built

Congratulations! You now have a complete **Backend RESTful API** for a task management application.

---

## 🎯 Project Summary

**Name:** TaskTrack  
**Type:** Full-Stack Task Management Web Application  
**Student:** Gagandeep Singh (9047496)  
**Sprint:** Sprint 1 - Backend (Weeks 2-4)  
**Status:** ✅ Complete and Ready for Deployment

---

## 📁 Project Structure

```
TaskTrack/
│
├── 📄 server.js                 ← Main entry point (Express server)
├── 📄 db.js                     ← Database connection (PostgreSQL)
├── 📄 package.json              ← Dependencies and scripts
├── 📄 .env.example              ← Environment variables template
├── 📄 .gitignore                ← Git ignore rules
│
├── 📁 routes/                   ← API Endpoints
│   ├── users.js                 ← Register & Login
│   ├── tasks.js                 ← Task CRUD operations
│   └── categories.js            ← Category management
│
├── 📁 middleware/               ← Custom middleware
│   └── auth.js                  ← JWT authentication
│
├── 📁 db/                       ← Database scripts
│   └── setup.js                 ← Creates tables
│
└── 📚 Documentation/
    ├── README.md                ← Main documentation
    ├── QUICKSTART.md            ← 5-minute setup guide
    ├── API_TESTING.md           ← Test all endpoints
    ├── DEPLOYMENT.md            ← Deploy to Render
    ├── GIT_GUIDE.md             ← Git commands
    ├── CHECKLIST.md             ← Pre-submission checklist
    └── SUBMISSION.txt           ← Submission template
```

---

## 🚀 Features Implemented

### ✅ User Management
- User registration with email validation
- Secure password hashing (bcryptjs)
- User login with JWT token generation
- Token-based authentication

### ✅ Task Management (Full CRUD)
- **Create** new tasks with title, description, due date
- **Read** all tasks for logged-in user
- **Update** task details and status
- **Delete** tasks
- Link tasks to categories
- Track task status (pending/completed)

### ✅ Category Management
- Create custom categories
- View all categories
- Delete categories
- Link tasks to categories

### ✅ Security
- Password encryption
- JWT authentication
- Protected API routes
- User data isolation (users can only see their own data)

### ✅ Database
- PostgreSQL database (Render)
- 3 related tables (Users, Tasks, Categories)
- Foreign key relationships
- Cascade deletes

---

## 🔧 Technologies Used

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Runtime** | Node.js v18+ | JavaScript runtime |
| **Framework** | Express.js | Web server framework |
| **Database** | PostgreSQL | Relational database |
| **Authentication** | JWT | Token-based auth |
| **Security** | bcryptjs | Password hashing |
| **Environment** | dotenv | Environment variables |
| **CORS** | cors | Cross-origin requests |
| **Deployment** | Render | Cloud hosting |

---

## 📡 API Endpoints

### Public Routes (No Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |

### Protected Routes (Require JWT Token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all user's tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |
| DELETE | `/api/categories/:id` | Delete category |

---

## 🗄️ Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 255 UNIQUE)
- password (VARCHAR 255) -- hashed
- created_at (TIMESTAMP)
```

### Tasks Table
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR 255)
- description (TEXT)
- due_date (DATE)
- status (VARCHAR 50) -- 'pending' or 'completed'
- user_id (INTEGER FK → users.id)
- category_id (INTEGER FK → categories.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Categories Table
```sql
- id (SERIAL PRIMARY KEY)
- category_name (VARCHAR 100)
- user_id (INTEGER FK → users.id)
- created_at (TIMESTAMP)
```

**Relationships:**
- One User → Many Tasks (one-to-many)
- One User → Many Categories (one-to-many)
- One Category → Many Tasks (one-to-many)

---

## 📚 Documentation Files

| File | What It Contains |
|------|------------------|
| **README.md** | Complete project documentation, setup instructions, API reference |
| **QUICKSTART.md** | Get started in 5 minutes - quick setup guide |
| **API_TESTING.md** | All test cases and examples for every endpoint |
| **DEPLOYMENT.md** | Step-by-step guide to deploy on Render |
| **GIT_GUIDE.md** | Git commands and best practices |
| **CHECKLIST.md** | Pre-submission checklist for Sprint 1 |
| **SUBMISSION.txt** | Submission template for the assignment |

---

## 🎓 Learning Outcomes Achieved

This project demonstrates mastery of:

✅ **CLO1:** RESTful API architecture with Node.js and Express  
✅ **CLO2:** Persistent data storage with PostgreSQL  
✅ **CLO5:** Authentication and authorization security  
✅ **CLO6:** Cloud deployment with Render

---

## 🏃 Quick Commands

### Setup
```bash
npm install              # Install dependencies
npm run db:setup         # Create database tables
```

### Development
```bash
npm run dev              # Start with auto-restart (nodemon)
npm start                # Start server
```

### Git
```bash
git add .                # Stage changes
git commit -m "message"  # Commit
git push                 # Push to GitHub
```

---

## 🌐 URLs

**Local Development:**
```
http://localhost:3000
```

**Production (Render):**
```
https://tasktrack-api.onrender.com
(Your actual URL will be different)
```

**GitHub Repository:**
```
https://github.com/YOUR_USERNAME/TaskTrack
```

---

## 📋 Sprint 1 Requirements ✅

| Requirement | Status |
|-------------|--------|
| Node.js & Express setup | ✅ Complete |
| PostgreSQL database | ✅ Complete |
| User authentication | ✅ Complete |
| JWT implementation | ✅ Complete |
| Task CRUD operations | ✅ Complete |
| Category management | ✅ Complete |
| RESTful API design | ✅ Complete |
| Error handling | ✅ Complete |
| Deployed to Render | ✅ Ready |
| GitHub with commits | ✅ Ready |
| Documentation | ✅ Complete |

---

## 🔜 Next Steps (Sprint 2 & 3)

### Sprint 2 - Frontend (Weeks 9-10)
- [ ] Set up React application
- [ ] Create Login/Register pages
- [ ] Build Dashboard with task list
- [ ] Create task form components
- [ ] Add category management UI

### Sprint 3 - Integration (Weeks 12-13)
- [ ] Connect React to Express API
- [ ] Implement authentication flow
- [ ] Add Axios for API calls
- [ ] Final deployment (frontend + backend)
- [ ] Complete testing

---

## 💡 Tips for Success

1. **Test Everything Locally First**
   - Make sure it works on your computer
   - Then deploy to Render

2. **Commit Regularly**
   - Not just once or twice
   - Show your development progress

3. **Understand Your Code**
   - You need to explain it in the demo
   - Know where everything is

4. **Keep Environment Variables Safe**
   - Never commit `.env` file
   - Use `.env.example` as template

5. **Read the Documentation**
   - All the guides are there to help you
   - Review before the Sprint Review

---

## 🆘 Getting Help

### If Something Doesn't Work:

1. **Check the error message**
   - Read what it says
   - Often tells you exactly what's wrong

2. **Check the documentation**
   - README.md for general info
   - API_TESTING.md for endpoint testing
   - DEPLOYMENT.md for deployment issues
   - QUICKSTART.md for setup

3. **Check your environment**
   - Is `.env` file created?
   - Are all variables set?
   - Did you run `npm install`?

4. **Check the logs**
   - Terminal output
   - Render deployment logs
   - Database connection errors

5. **Ask for help**
   - Instructor
   - Classmates
   - TA

---

## 🎉 You Did It!

You've built a professional-grade backend API with:
- Authentication
- Database integration
- CRUD operations
- Cloud deployment
- Security best practices

**This is real full-stack development!**

Keep this project in your portfolio - it shows you can build production-ready applications.

---

## 📞 Project Info

**Course:** PROG2500 - Full Stack Development  
**Institution:** Conestoga College  
**Semester:** Winter 2026  
**Assignment:** Sprint 1 - Backend Development  
**Due Date:** Week 4 Dev Day  
**Weight:** 10% of final grade

---

**Good luck with your Sprint Review! You've got this! 💪🚀**
