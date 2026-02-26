# Deployment Guide - Render

## Step-by-Step Deployment Instructions

### Part 1: Set Up PostgreSQL Database on Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up or log in

2. **Create PostgreSQL Database**
   - Click "New +" button
   - Select "PostgreSQL"
   - Fill in details:
     - Name: `tasktrack-db`
     - Database: `tasktrack`
     - User: `tasktrack_user` (auto-generated)
     - Region: Choose closest to you
     - Plan: Free
   - Click "Create Database"

3. **Get Database Connection String**
   - Wait for database to be created
   - Copy the **External Database URL**
   - It looks like: `postgresql://user:password@hostname:5432/database`
   - Save this - you'll need it!

### Part 2: Push Code to GitHub

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TaskTrack backend setup"
   ```

2. **Create GitHub Repository**
   - Go to https://github.com
   - Click "New Repository"
   - Name: `TaskTrack`
   - Keep it Public (required for free Render deployment)
   - Don't initialize with README (you already have one)
   - Click "Create Repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/TaskTrack.git
   git branch -M main
   git push -u origin main
   ```

### Part 3: Deploy Web Service on Render

1. **Create Web Service**
   - In Render Dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub account (if first time)
   - Select your `TaskTrack` repository

2. **Configure Web Service**
   Fill in the following settings:
   
   - **Name:** `tasktrack-api`
   - **Region:** Same as your database
   - **Branch:** `main`
   - **Root Directory:** (leave blank)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

3. **Add Environment Variables**
   Scroll down to "Environment Variables" section and add:
   
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | (Paste your External Database URL from Part 1) |
   | `JWT_SECRET` | (Create a random string, e.g., `my-super-secret-jwt-key-2026`) |
   | `NODE_ENV` | `production` |

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Check the logs for any errors

### Part 4: Initialize Database Tables

1. **Open Render Shell**
   - In your web service dashboard, click "Shell" tab
   - Wait for shell to connect

2. **Run Database Setup**
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

### Part 5: Test Your Deployment

1. **Get Your Live URL**
   - Your API URL will be: `https://tasktrack-api.onrender.com`
   - Or check the URL shown in your Render dashboard

2. **Test the API**
   Open your browser or use curl:
   ```bash
   curl https://tasktrack-api.onrender.com
   ```
   
   You should see the API welcome message!

3. **Test User Registration**
   ```bash
   curl -X POST https://tasktrack-api.onrender.com/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

## Common Issues and Solutions

### Issue 1: Build Failed
**Error:** `npm install` fails
**Solution:** 
- Make sure `package.json` is in the root directory
- Check that all dependencies are listed correctly

### Issue 2: Database Connection Error
**Error:** "Connection refused" or "Database error"
**Solution:**
- Verify `DATABASE_URL` in environment variables
- Make sure you copied the **External Database URL**, not Internal
- Check database is running in Render dashboard

### Issue 3: App Crashes After Deploy
**Error:** Application crashes immediately
**Solution:**
- Check logs in Render dashboard
- Verify `JWT_SECRET` is set
- Make sure `NODE_ENV=production`

### Issue 4: Port Already in Use
**Error:** Port 3000 in use
**Solution:**
- This shouldn't happen on Render (uses dynamic ports)
- Make sure you're using `process.env.PORT || 3000` in server.js

## Making Updates

After making changes to your code:

1. **Commit and Push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. **Auto-Deploy**
   - Render automatically deploys when you push to GitHub
   - Watch the deployment logs in Render dashboard

## Monitoring Your App

### Check Logs
- Go to your web service in Render
- Click "Logs" tab
- See real-time server logs

### Database Access
- Go to your PostgreSQL database in Render
- Click "Connect" to get connection details
- Use a tool like pgAdmin or DBeaver to view data

## Free Tier Limitations

⚠️ **Important Notes:**
- Free tier apps spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Database has 90-day data retention on free plan
- 750 hours/month of usage (enough for this course)

## For Sprint 1 Submission

Your submission should include:

1. ✅ Live API URL: `https://tasktrack-gm4r.onrender.com`
2. ✅ GitHub Repository URL: `https://github.com/Gagan-sran/TaskTrack`
3. ✅ Regular commit history showing development progress
4. ✅ All endpoints working and tested

## Next Steps (Sprint 2 & 3)

For Sprint 2, you'll add the React frontend. Two deployment options:

1. **Option A:** Deploy frontend separately on Render (separate web service)
2. **Option B:** Serve React build from Express (single deployment)

We'll cover this in Sprint 3!

---

**Need Help?**
- Check Render documentation: https://render.com/docs
- Review server logs for errors
- Test locally first before deploying
