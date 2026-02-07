# Sprint 1 Completion Checklist

## Before You Start

- [ ] Node.js installed (v18 or higher)
- [ ] Git installed
- [ ] GitHub account created
- [ ] Render account created (https://render.com)
- [ ] VS Code or preferred editor installed
- [ ] Postman or Thunder Client for API testing

---

## Week 2-3: Development Phase

### Database Setup
- [ ] Render PostgreSQL database created
- [ ] External Database URL copied
- [ ] `.env` file created (from `.env.example`)
- [ ] `DATABASE_URL` added to `.env`
- [ ] `JWT_SECRET` added to `.env`
- [ ] `npm install` run successfully
- [ ] `npm run db:setup` completed
- [ ] All 3 tables created (users, tasks, categories)

### User Authentication
- [ ] User registration endpoint works (`POST /api/users/register`)
- [ ] Password is hashed (bcryptjs)
- [ ] User login endpoint works (`POST /api/users/login`)
- [ ] JWT token is generated on login
- [ ] Cannot register same email twice
- [ ] Invalid login credentials are rejected

### Authentication Middleware
- [ ] `middleware/auth.js` created
- [ ] Token verification works
- [ ] Protected routes require valid token
- [ ] Invalid/missing token returns 401 error

### Task Routes (CRUD)
- [ ] Create task endpoint works (`POST /api/tasks`)
- [ ] Get all tasks endpoint works (`GET /api/tasks`)
- [ ] Get single task endpoint works (`GET /api/tasks/:id`)
- [ ] Update task endpoint works (`PUT /api/tasks/:id`)
- [ ] Delete task endpoint works (`DELETE /api/tasks/:id`)
- [ ] Tasks are linked to correct user
- [ ] Can only access own tasks (not other users')

### Category Routes
- [ ] Create category endpoint works (`POST /api/categories`)
- [ ] Get all categories endpoint works (`GET /api/categories`)
- [ ] Delete category endpoint works (`DELETE /api/categories/:id`)
- [ ] Categories are linked to correct user
- [ ] Tasks can be assigned to categories

### Error Handling
- [ ] Missing required fields returns 400 error
- [ ] Invalid IDs return 404 error
- [ ] Server errors return 500 error
- [ ] Error messages are clear and helpful

### Code Quality
- [ ] All files properly organized (routes/, middleware/, db/)
- [ ] Code is readable and well-formatted
- [ ] Comments added where needed
- [ ] No console.log debugging statements left in
- [ ] `.gitignore` includes node_modules and .env

---

## Week 4: Deployment & Polish

### Git & GitHub
- [ ] Git repository initialized
- [ ] `.gitignore` file present
- [ ] Regular commits made (10+ commits minimum)
- [ ] Commits spread over multiple days/weeks
- [ ] Meaningful commit messages used
- [ ] Code pushed to GitHub
- [ ] Repository is public (not private)
- [ ] README.md is complete

### Render Deployment
- [ ] PostgreSQL database created on Render
- [ ] Web Service created on Render
- [ ] GitHub repository connected
- [ ] Environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Build successful
- [ ] Deployment successful
- [ ] Database tables initialized on production
- [ ] Live URL is accessible

### Testing
- [ ] Root endpoint (`/`) returns API info
- [ ] Can register user on live URL
- [ ] Can login on live URL
- [ ] Can create tasks on live URL
- [ ] Can get tasks on live URL
- [ ] Can update tasks on live URL
- [ ] Can delete tasks on live URL
- [ ] All CRUD operations work on production

### Documentation
- [ ] README.md complete with:
  - [ ] Project description
  - [ ] Setup instructions
  - [ ] API endpoints documented
  - [ ] Database schema explained
- [ ] API_TESTING.md reviewed
- [ ] DEPLOYMENT.md reviewed
- [ ] QUICKSTART.md reviewed

---

## Sprint Review Preparation

### Demo Readiness
- [ ] Know your live URL (Render deployment)
- [ ] Know your GitHub repository URL
- [ ] Server runs locally without errors
- [ ] Have test data ready (2-3 tasks, 1-2 categories)
- [ ] Postman/Thunder Client ready with saved requests
- [ ] Can demonstrate full CRUD workflow
- [ ] Understand authentication flow

### Code Navigation
- [ ] Can quickly open `server.js`
- [ ] Can quickly open `routes/tasks.js`
- [ ] Can quickly open `routes/users.js`
- [ ] Can quickly open `middleware/auth.js`
- [ ] Can explain database schema
- [ ] Can show where routes are defined

### Technical Understanding
- [ ] Understand what Express is
- [ ] Understand what RESTful API means
- [ ] Understand what CRUD stands for
- [ ] Understand how JWT authentication works
- [ ] Understand database relationships (foreign keys)
- [ ] Can explain the request flow:
  ```
  Client → Route → Middleware → Controller → Database → Response
  ```

### Questions to Prepare For
- [ ] "Show me where you defined your task routes"
- [ ] "How does authentication work in your app?"
- [ ] "What happens when a user tries to access a protected route?"
- [ ] "Explain your database schema"
- [ ] "How are tasks linked to users?"
- [ ] "What's the difference between PUT and POST?"
- [ ] "Show me how you hash passwords"

---

## Submission Requirements

### Files to Submit
- [ ] GitHub repository URL in submission folder
- [ ] Live deployment URL in submission folder
- [ ] SUBMISSION.txt file filled out

### Grading Criteria

#### Deployment & Integrity (10 points)
- [ ] Project deployed to live URL (not localhost)
- [ ] URL is accessible
- [ ] GitHub has regular commits (not 1-2 massive commits)
- [ ] Git history shows development progress

#### Sprint Completion (40 points)
- [ ] All features implemented
- [ ] Code runs without errors
- [ ] All CRUD operations work
- [ ] Authentication works

#### Technical Understanding (30 points)
- [ ] Can navigate own code
- [ ] Can explain how it works
- [ ] Can answer technical questions

#### Lab Participation (20 points)
- [ ] Attended workshop sessions
- [ ] Present for Sprint Review demo

---

## Common Mistakes to Avoid

### ❌ Don't Do This:
- Submit as ZIP file (use GitHub!)
- Only 1-2 commits
- All commits on same day
- Project not deployed (localhost only)
- .env file committed to Git
- Passwords in plain text
- No error handling
- Empty README
- Not testing before demo

### ✅ Do This:
- Regular commits over time
- Meaningful commit messages
- Test everything before submitting
- Deploy early (not last minute)
- Use .gitignore properly
- Test on production (Render)
- Review all documentation
- Practice your demo

---

## Final Pre-Submission Check

### 24 Hours Before Sprint Review:

- [ ] Pull latest code from GitHub
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test all endpoints locally
- [ ] Check live deployment still works
- [ ] Test all endpoints on production
- [ ] Review Git commit history (`git log --oneline`)
- [ ] Make sure repository is public
- [ ] Fill out SUBMISSION.txt
- [ ] Get a good night's sleep! 😴

---

## Sprint Review Day

### Bring to Class:
- [ ] Laptop fully charged
- [ ] GitHub repository open in browser
- [ ] Render dashboard open in browser
- [ ] VS Code with project open
- [ ] Postman/Thunder Client ready
- [ ] Test user credentials ready
- [ ] Confidence! 💪

### During Demo:
1. Show live URL in browser
2. Show GitHub repository
3. Demonstrate CRUD operations:
   - Register/Login
   - Create a task
   - View tasks
   - Update a task
   - Delete a task
4. Answer instructor questions
5. Navigate to code files as requested

---

## After Sprint Review

- [ ] Note any feedback from instructor
- [ ] Fix any issues mentioned
- [ ] Commit and push fixes
- [ ] Start thinking about Sprint 2 (React frontend)

---

## Success Metrics

You're ready if you can answer "YES" to all of these:

- [ ] My code runs without errors
- [ ] All CRUD operations work
- [ ] Authentication is implemented
- [ ] Project is deployed and accessible
- [ ] Git history shows regular commits
- [ ] I understand how my code works
- [ ] I can navigate my files quickly
- [ ] I've tested everything thoroughly

---

## Emergency Contacts

**If something goes wrong:**
1. Check the logs (Render dashboard or terminal)
2. Review the troubleshooting sections in docs
3. Test locally first
4. Check environment variables
5. Ask instructor for help if needed

---

## Motivation

You've built a real backend API with:
- ✅ Database (PostgreSQL)
- ✅ Authentication (JWT)
- ✅ CRUD operations
- ✅ RESTful design
- ✅ Cloud deployment

This is a professional-level skill! 🎉

**You've got this!** 💪

---

**Last Updated:** Created for Sprint 1 Review  
**Status:** Ready for submission checklist complete!
