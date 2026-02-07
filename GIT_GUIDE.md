# Git Commands Cheat Sheet for TaskTrack

## Initial Setup (First Time Only)

### 1. Initialize Git Repository
```bash
cd "C:\Users\jeelp\Documents\Sem_4\Prog2500 Full Stack\Friends\Gagan\TaskTrack"
git init
```

### 2. Configure Git (if not done already)
```bash
git config --global user.name "Gagandeep Singh"
git config --global user.email "your.email@example.com"
```

### 3. First Commit
```bash
git add .
git commit -m "Initial commit: TaskTrack project setup with Express and PostgreSQL"
```

### 4. Create GitHub Repository
1. Go to https://github.com
2. Click "New Repository"
3. Name: `TaskTrack`
4. Keep Public (required for free Render)
5. Don't initialize with README
6. Click "Create Repository"

### 5. Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/TaskTrack.git
git branch -M main
git push -u origin main
```

---

## Regular Development Workflow

### Check Status
```bash
git status
```
Shows what files have changed

### Stage All Changes
```bash
git add .
```
Prepares all files for commit

### Stage Specific File
```bash
git add server.js
```
Prepares only server.js

### Commit Changes
```bash
git commit -m "Add user authentication routes"
```
Saves your changes with a message

### Push to GitHub
```bash
git push
```
Uploads your commits to GitHub

### View Commit History
```bash
git log --oneline
```
Shows your commit history

---

## Good Commit Messages

### ✅ Good Examples:
```bash
git commit -m "Initial commit: Project setup"
git commit -m "Add user registration and login endpoints"
git commit -m "Implement JWT authentication middleware"
git commit -m "Create task CRUD routes"
git commit -m "Add category management"
git commit -m "Fix task update validation"
git commit -m "Update README with deployment instructions"
git commit -m "Configure PostgreSQL connection for Render"
```

### ❌ Bad Examples:
```bash
git commit -m "stuff"
git commit -m "changes"
git commit -m "update"
git commit -m "fix"
git commit -m "asdfjkl"
```

---

## Suggested Commit Timeline for Sprint 1

### Week 2 - Basic Setup
```bash
git add .
git commit -m "Initial commit: Project structure and dependencies"

git add .
git commit -m "Add Express server and basic routing"

git add .
git commit -m "Configure PostgreSQL database connection"

git add .
git commit -m "Create database schema and setup script"

git add .
git commit -m "Implement user registration endpoint"

git add .
git commit -m "Implement user login with JWT"

git add .
git commit -m "Add authentication middleware"
```

### Week 3 - CRUD Operations
```bash
git add .
git commit -m "Create task routes with CRUD operations"

git add .
git commit -m "Add task creation with validation"

git add .
git commit -m "Implement task update and delete"

git add .
git commit -m "Add category management routes"

git add .
git commit -m "Link categories to tasks"

git add .
git commit -m "Add error handling and validation"
```

### Week 4 - Polish & Deploy
```bash
git add .
git commit -m "Update README with documentation"

git add .
git commit -m "Add API testing guide"

git add .
git commit -m "Configure for Render deployment"

git add .
git commit -m "Add deployment documentation"

git add .
git commit -m "Final testing and bug fixes"

git push
```

---

## Common Git Issues & Solutions

### Issue 1: Forgot to commit before making more changes
```bash
# Stage and commit current work
git add .
git commit -m "Description of changes"
```

### Issue 2: Want to undo last commit (not pushed)
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes (CAREFUL!)
git reset --hard HEAD~1
```

### Issue 3: Accidentally committed .env file
```bash
# Remove from Git but keep locally
git rm --cached .env
git commit -m "Remove .env from version control"

# Make sure .gitignore contains .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore"
git push
```

### Issue 4: Push rejected
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Issue 5: Made changes in wrong place
```bash
# Stash your changes
git stash

# Create or switch to correct branch
git checkout -b feature-name

# Apply stashed changes
git stash pop
```

---

## Checking Your Commit History

### View all commits
```bash
git log
```

### View commits with file changes
```bash
git log --stat
```

### View last 5 commits
```bash
git log -5 --oneline
```

### View commits by date
```bash
git log --since="2 weeks ago"
```

---

## For Sprint Review

### Before the Demo - Verify Your Git History

```bash
# Should show multiple commits over time
git log --oneline

# Should show regular commits, not just 1-2
git log --graph --oneline --all

# Check that you're up to date
git status
```

### What the Instructor Looks For:
✅ Multiple commits (not just 1-2)
✅ Commits spread over weeks (not all in one day)
✅ Meaningful commit messages
✅ Regular progress shown
✅ Not suspicious (like only 2 giant commits)

### Red Flags to Avoid:
❌ Only 1-2 commits
❌ All commits on same day
❌ Commit messages like "stuff", "fix", "update"
❌ 10,000+ lines changed in one commit
❌ Submitting as ZIP file instead of Git repo

---

## Best Practices

1. **Commit Often**
   - Commit every time you complete a feature
   - Minimum 1-2 commits per day of work
   - More commits = better history

2. **Write Good Messages**
   - Start with verb (Add, Fix, Update, Remove)
   - Be specific about what changed
   - Keep under 50 characters if possible

3. **Push Regularly**
   - Push to GitHub daily
   - Don't wait until the last day
   - Ensures your work is backed up

4. **Never Commit Secrets**
   - No .env files
   - No passwords
   - No API keys
   - Use .gitignore!

5. **Review Before Committing**
   - Run `git status` first
   - Check what files changed
   - Make sure you meant to change them

---

## Emergency Commands

### Discard all uncommitted changes (CAREFUL!)
```bash
git reset --hard
```

### Remove untracked files
```bash
git clean -fd
```

### See what changed in a file
```bash
git diff server.js
```

### Revert to previous commit
```bash
git revert HEAD
```

---

## GitHub Repository Settings

### Make Repository Public (for Render)
1. Go to your repo on GitHub
2. Click "Settings"
3. Scroll to "Danger Zone"
4. Click "Change visibility"
5. Select "Public"

### Add Description
1. Go to your repo on GitHub
2. Click the gear icon next to "About"
3. Add description: "TaskTrack - Full Stack Task Management App"
4. Add tags: `nodejs`, `express`, `postgresql`, `rest-api`

---

## Quick Reference Card

```bash
# Most used commands
git status          # Check what changed
git add .           # Stage all files
git commit -m ""    # Commit with message
git push            # Upload to GitHub
git pull            # Download from GitHub
git log --oneline   # View history

# Emergency
git reset --hard    # Discard all changes
git clean -fd       # Remove untracked files
```

---

**Remember:** Good Git history shows you actually did the work over time, not all at once at the last minute! The instructor WILL check your Git history. Make it count! 🎯
