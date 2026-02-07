# Quick Start Guide - TaskTrack

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd "C:\Users\jeelp\Documents\Sem_4\Prog2500 Full Stack\Friends\Gagan\TaskTrack"
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@hostname:5432/database
JWT_SECRET=my-secret-key-change-this
```

**For local development with Render PostgreSQL:**
1. Go to https://render.com
2. Create a PostgreSQL database
3. Copy the "External Database URL"
4. Paste it as `DATABASE_URL` in your `.env` file

### Step 3: Initialize Database
```bash
npm run db:setup
```

You should see:
```
✓ Users table created
✓ Categories table created
✓ Tasks table created
✅ Database setup complete!
```

### Step 4: Start the Server
```bash
npm run dev
```

You should see:
```
🚀 TaskTrack Server running on port 3000
📍 Environment: development
🔗 API: http://localhost:3000
```

### Step 5: Test the API

Open your browser: http://localhost:3000

You should see the API documentation!

---

## 📝 Quick Test Workflow

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
```

**Copy the token from the response!**

### 2. Create a Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"category_name":"Work"}'
```

### 3. Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My First Task","description":"Testing the API","due_date":"2026-02-15","category_id":1}'
```

### 4. Get All Tasks
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 For Sprint 1 Demo

### Before the Demo:
1. ✅ Server is running (`npm run dev`)
2. ✅ Database tables are created (`npm run db:setup`)
3. ✅ Have at least 2-3 test tasks created
4. ✅ Know where your route files are located
5. ✅ Understand the authentication flow

### During the Demo:
**Instructor will ask you to:**
- Show your running API
- Demonstrate CRUD operations
- Navigate to specific code files
- Explain how authentication works

**Be ready to open these files:**
- `server.js` - Main server file
- `routes/tasks.js` - Task routes
- `routes/users.js` - User routes
- `middleware/auth.js` - Authentication
- `db.js` - Database connection

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"
**Solution:** Run `npm install`

### Error: "connect ECONNREFUSED"
**Solution:** 
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL database is running on Render
- Use the "External Database URL", not Internal

### Error: "JWT_SECRET is not defined"
**Solution:** 
- Create `.env` file
- Add `JWT_SECRET=your-secret-key`

### Error: "Port 3000 is already in use"
**Solution:** 
- Kill the process using port 3000
- Or change PORT in `.env` to 3001

### Tables don't exist
**Solution:** Run `npm run db:setup`

---

## 📦 Project Structure Quick Reference

```
TaskTrack/
├── server.js              ← Start here! Main entry point
├── db.js                  ← Database connection
├── package.json           ← Dependencies
├── .env                   ← Your secrets (create this!)
├── routes/
│   ├── users.js          ← Register & Login
│   ├── tasks.js          ← Task CRUD
│   └── categories.js     ← Category CRUD
├── middleware/
│   └── auth.js           ← JWT authentication
└── db/
    └── setup.js          ← Database initialization
```

---

## 🔑 Key Concepts to Know

### 1. RESTful API
- **GET** = Read data
- **POST** = Create data
- **PUT** = Update data
- **DELETE** = Delete data

### 2. Authentication Flow
1. User registers/logs in
2. Server creates JWT token
3. Client sends token in headers for protected routes
4. Middleware verifies token
5. Access granted/denied

### 3. Database Relationships
- One User has many Tasks
- One User has many Categories
- One Task belongs to one User
- One Task belongs to one Category

---

## 📚 Files You'll Need for Submission

1. **GitHub Repository URL** - Make sure you push all code
2. **Render Deployment URL** - After deploying to Render
3. **Live Demo** - Be ready to show your running code

---

## ✨ Pro Tips

1. **Make regular commits:**
   ```bash
   git add .
   git commit -m "Add user authentication"
   git push
   ```

2. **Test everything locally first** before deploying

3. **Keep your .env file secret** - Never commit it to Git

4. **Use meaningful commit messages** - They show in your Git history

5. **Test all CRUD operations** before the demo

---

## 📞 Need Help?

- Check the `README.md` for detailed documentation
- See `API_TESTING.md` for all test cases
- Read `DEPLOYMENT.md` for Render deployment steps
- Review the rubric in the assignment folder

---

**Good luck with Sprint 1! 🎉**

You're building a real full-stack application. Take it step by step, test frequently, and you'll do great!
