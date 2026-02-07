# 🚀 START HERE - TaskTrack Setup Guide

Welcome to your TaskTrack project! This guide will get you up and running in **under 10 minutes**.

---

## 📖 What This Project Is

TaskTrack is a **complete backend API** for a task management application. You've got:
- ✅ User authentication (register/login)
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Category management
- ✅ PostgreSQL database
- ✅ JWT authentication
- ✅ Ready for Render deployment

**Sprint 1 is COMPLETE!** All code is written and ready to go.

---

## 🎯 Your Next Steps (In Order)

### Step 1: Read This First! ⭐
You are here! Good job. Keep reading.

### Step 2: Install Dependencies (2 minutes)
```bash
# Open terminal in this folder
cd "C:\Users\jeelp\Documents\Sem_4\Prog2500 Full Stack\Friends\Gagan\TaskTrack"

# Install all packages
npm install
```

### Step 3: Set Up Database (3 minutes)
1. Go to https://render.com and sign up (free)
2. Create a new **PostgreSQL database**
   - Name: `tasktrack-db`
   - Plan: Free
3. Copy the **External Database URL**
4. Create a `.env` file in this folder (copy from `.env.example`)
5. Paste your database URL in `.env`:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   JWT_SECRET=make-up-a-random-secret-key-here
   ```

### Step 4: Initialize Database (1 minute)
```bash
npm run db:setup
```
You should see: ✓ Users table created, ✓ Categories table created, ✓ Tasks table created

### Step 5: Run the Server (30 seconds)
```bash
npm run dev
```
Server should start at: http://localhost:3000

### Step 6: Test It Works! (2 minutes)
Open http://localhost:3000 in your browser.
You should see API documentation!

---

## 📚 Essential Files to Know

### For Quick Setup:
1. **QUICKSTART.md** ← Read this for detailed setup
2. **.env.example** ← Copy this to create your `.env` file

### For Testing:
3. **API_TESTING.md** ← How to test all endpoints
4. Use Postman or Thunder Client to test

### For Deployment:
5. **DEPLOYMENT.md** ← Deploy to Render step-by-step

### For Git:
6. **GIT_GUIDE.md** ← Git commands and workflow

### Before Submission:
7. **CHECKLIST.md** ← Make sure you haven't missed anything
8. **SUBMISSION.txt** ← Fill this out for submission

### For Understanding:
9. **README.md** ← Full project documentation
10. **PROJECT_OVERVIEW.md** ← What you built and why

---

## 🗂️ Project Structure Quick Reference

```
TaskTrack/
├── server.js              ← START HERE (main file)
├── db.js                  ← Database connection
├── package.json           ← Dependencies
├── .env                   ← YOU CREATE THIS (secrets)
│
├── routes/                ← All API endpoints
│   ├── users.js          ← Register & Login
│   ├── tasks.js          ← Task CRUD
│   └── categories.js     ← Category CRUD
│
├── middleware/
│   └── auth.js           ← JWT authentication
│
└── db/
    └── setup.js          ← Creates database tables
```

---

## 🎯 Your Mission (Sprint 1)

### This Week:
- [ ] Set up local development (Steps 1-6 above)
- [ ] Test all API endpoints
- [ ] Deploy to Render
- [ ] Push code to GitHub

### For Sprint Review (Week 4):
- [ ] Demo your working API
- [ ] Answer technical questions
- [ ] Show your code

---

## 🚨 Common Issues & Solutions

### "Cannot find module 'express'"
**Solution:** Run `npm install`

### "Database connection error"
**Solution:** 
- Check your `.env` file exists
- Verify `DATABASE_URL` is correct
- Use "External Database URL" from Render

### "Port 3000 already in use"
**Solution:**
- Close other running servers
- Or change PORT in `.env` to 3001

### "Tables don't exist"
**Solution:** Run `npm run db:setup`

---

## 🎓 What You Need to Know for Demo

### You'll be asked to show:
1. **Your running API** - Have server running locally
2. **CRUD operations** - Create, read, update, delete a task
3. **Your code** - Navigate to specific files
4. **How it works** - Explain authentication, database, etc.

### Files you should know:
- `server.js` - Main entry point
- `routes/tasks.js` - Task endpoints
- `routes/users.js` - Login/register
- `middleware/auth.js` - Authentication
- `db.js` - Database connection

---

## 📝 Testing Your API

### Quick Test (in browser):
1. Go to http://localhost:3000
2. You should see API info

### Full Test (with Postman/Thunder Client):
1. Open **API_TESTING.md**
2. Follow the test cases
3. Test all endpoints

### Example Test Flow:
```
1. Register a user → Get token
2. Login → Get token again
3. Create a category → Use token
4. Create a task → Use token
5. Get all tasks → See your task!
6. Update task status → Mark complete
7. Delete task → Gone!
```

---

## 🌐 Deployment (After Local Testing Works)

1. Push code to GitHub (see **GIT_GUIDE.md**)
2. Create Render Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy!

**Full instructions:** See **DEPLOYMENT.md**

---

## ✅ Before You Submit

Use the **CHECKLIST.md** to verify:
- [ ] All features working
- [ ] Code on GitHub with good commits
- [ ] Deployed to Render
- [ ] All endpoints tested
- [ ] Documentation reviewed
- [ ] Ready to demo!

---

## 🎉 You're All Set!

### Recommended Reading Order:
1. ✅ This file (you're here!)
2. 📖 QUICKSTART.md (detailed setup)
3. 🧪 API_TESTING.md (test everything)
4. 🚀 DEPLOYMENT.md (when ready to deploy)
5. 📋 CHECKLIST.md (before submission)

### When You're Ready:
- Start with local setup
- Test thoroughly
- Deploy to Render
- Push to GitHub
- Review before demo

---

## 💪 You've Got This!

Everything is already built for you. Your job is to:
1. **Understand** how it works
2. **Test** that it works
3. **Deploy** it to Render
4. **Demonstrate** it in Sprint Review

**All the code is done. All the docs are written. You just need to set it up and show it off!**

Good luck! 🚀

---

**Questions?** Check the documentation files - they have everything you need!

**Stuck?** Review the troubleshooting sections in each guide.

**Ready to start?** Go to **QUICKSTART.md** for detailed setup instructions!
