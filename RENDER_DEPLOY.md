# Render Deployment Guide

## Complete Step-by-Step Deployment to Render

### Prerequisites

✅ GitHub account  
✅ Render account (sign up at <https://render.com>)  
✅ Code pushed to GitHub repository

**Note:** This guide uses Render's free PostgreSQL database (no external MongoDB needed!)

---

## Part 1: Prepare Your Code

### 1. Push to GitHub

```bash
cd "/Users/omkhodwe/Downloads/gym tracker"
git init
git add .
git commit -m "Initial commit - Gym Tracker App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gym-tracker.git
git push -u origin main
```

---

## Part 2: Create PostgreSQL Database on Render

### 1. Create Database

1. Go to <https://dashboard.render.com/>
2. Click **"New +"** → **"PostgreSQL"**
3. Configure the database:
   - **Name:** `gym-tracker-db` (or any name you prefer)
   - **Database:** `gym_tracker`
   - **User:** `gym_tracker_user` (auto-generated, you can keep default)
   - **Region:** Choose closest to you (same as backend will use)
   - **PostgreSQL Version:** 16 (or latest)
   - **Instance Type:** **Free**

4. Click **"Create Database"**
5. Wait 2-3 minutes for database creation
6. Once created, click on the database name
7. **COPY the "Internal Database URL"** (you'll need this for backend)
   - It looks like: `postgresql://user:password@host/database`
   - Use the **Internal URL** (faster, free data transfer within Render)

---

## Part 3: Deploy Backend to Render

### 1. Create Web Service

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect account"** to link your GitHub
4. Find and select your `gym-tracker` repository

### 2. Configure Backend Service

Fill in these settings:

- **Name:** `gym-tracker-backend` (or any unique name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Instance Type:** `Free`

### 3. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your PostgreSQL Internal Database URL from Part 2 |
| `JWT_SECRET` | A long random string (32+ characters) |
| `NODE_ENV` | `production` |

**Generate JWT Secret:**

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use online: https://randomkeygen.com/
```

**Database URL Example:**

```text
postgresql://gym_tracker_user:password123@dpg-xxxxx-a.oregon-postgres.render.com/gym_tracker
```

**Important:** Use the **Internal Database URL** from your Render PostgreSQL database (Step 2.7)

### 4. Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see: ✅ **Live**
4. **COPY YOUR BACKEND URL** (e.g., `https://gym-tracker-backend.onrender.com`)

---

## Part 4: Deploy Frontend to Render

### 1. Create Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select the same `gym-tracker` repository

### 2. Configure Frontend Service

Fill in these settings:

- **Name:** `gym-tracker-frontend` (or any unique name)
- **Branch:** `main`
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`

### 3. Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | Your backend URL (NO trailing slash) |

**Example:**
```
REACT_APP_API_URL=https://gym-tracker-backend.onrender.com
```

### 4. Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see: ✅ **Live**
4. Click the URL to open your app!

---

## Part 5: Verify Deployment

### Backend Health Check

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Frontend Check

Visit your frontend URL and:

1. ✅ Register a new account
2. ✅ Log in
3. ✅ Add a workout
4. ✅ View workout history
5. ✅ Edit a workout
6. ✅ Delete a workout

---

## Common Issues & Solutions

### ❌ Backend Deploy Failed

**Problem:** Build fails with "Cannot find module"

**Solution:**
1. Check `server/package.json` has all dependencies
2. Verify **Root Directory** is set to `server`
3. Check build logs for specific error

### ❌ Frontend Can't Connect to Backend

**Problem:** API calls fail, CORS errors

**Solution:**
1. Verify `REACT_APP_API_URL` is set correctly (no trailing slash)
2. Ensure backend is deployed and running
3. Check backend URL is accessible in browser

### ❌ Database Connection Failed

**Problem:** Backend logs show database connection error

**Solution:**

1. Verify `DATABASE_URL` in environment variables
2. Ensure you're using the **Internal Database URL** (not External)
3. Check database is running in Render dashboard
4. Verify database and web service are in the same region (for Internal URL to work)

### ❌ 404 on Frontend Routes

**Problem:** Refreshing page shows 404

**Solution:**
For Render Static Sites, this is automatically handled. If issues persist:
1. Verify `Publish Directory` is set to `build`
2. Check build command ran successfully

### ⚠️ Backend Slow to Respond

**Problem:** First request takes 30-60 seconds

**Solution:**
This is normal for Render free tier:
- Services "spin down" after 15 minutes of inactivity
- First request "wakes up" the service
- Subsequent requests are fast

---

## Update Your Deployed App

### Update Code

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically redeploy both services!

### Update Environment Variables

1. Go to Render Dashboard
2. Select your service
3. Click **"Environment"** in sidebar
4. Update variables
5. Service will automatically redeploy

---

## Monitor Your App

### View Logs

**Backend Logs:**
1. Dashboard → gym-tracker-backend
2. Click **"Logs"** tab
3. View real-time server logs

**Frontend Logs:**
1. Dashboard → gym-tracker-frontend
2. Click **"Logs"** tab
3. View build and deployment logs

### Check Status

Dashboard shows:
- ✅ **Live** - Service is running
- 🔄 **Deploying** - Update in progress
- ❌ **Failed** - Check logs for errors

---

## Cost & Limits

### Free Tier Limits

- **Backend (Web Service):**
  - 750 hours/month
  - Spins down after 15 minutes inactivity
  - 512 MB RAM
  - Shared CPU

- **Frontend (Static Site):**
  - 100 GB bandwidth/month
  - Always available (no spin down)

- **PostgreSQL Database:**
  - 1 GB storage
  - Expires after 90 days (free tier)
  - Automatic backups not included
  - Shared resources

### Upgrade Options

If you need more:

- **$7/month (Web Service):** Keep backend running 24/7 (no spin down)
- **$7/month (PostgreSQL):** 10 GB storage, no expiration, daily backups
- **$25/month (Web Service):** More RAM and CPU

**Recommended:** Upgrade PostgreSQL to paid plan to avoid 90-day expiration and get automatic backups.

---

## Security Best Practices

### After Deployment

1. ✅ Change JWT_SECRET to a strong random value
2. ✅ Use environment variables (never hardcode secrets)
3. ✅ Use Internal Database URL for faster connections
4. ✅ Consider upgrading PostgreSQL to paid ($7/month) to avoid 90-day expiration
5. ✅ Use HTTPS (Render provides this automatically)
6. ✅ Regularly backup your data (manual exports on free tier)

### Production Checklist

- [ ] PostgreSQL database created on Render
- [ ] Internal Database URL used (not External)
- [ ] JWT_SECRET is at least 32 random characters
- [ ] NODE_ENV set to `production`
- [ ] GitHub repository is private (if containing sensitive info)
- [ ] Environment variables are set in Render (not in code)
- [ ] Consider upgrading PostgreSQL to avoid 90-day expiration

---

## Custom Domain (Optional)

1. Purchase domain (e.g., from Namecheap, GoDaddy)
2. In Render Dashboard → Settings
3. Click **"Custom Domain"**
4. Follow instructions to add DNS records

---

## Support & Resources

- **Render Docs:** <https://render.com/docs>
- **Render Community:** <https://community.render.com/>
- **Render PostgreSQL Guide:** <https://render.com/docs/databases>

---

## Quick Reference

### Your URLs

```text
Database: Internal URL from Render PostgreSQL dashboard
Backend:  https://YOUR-BACKEND-NAME.onrender.com
Frontend: https://YOUR-FRONTEND-NAME.onrender.com
```

### Environment Variables

**Backend:**

- DATABASE_URL (PostgreSQL Internal URL)
- JWT_SECRET
- NODE_ENV=production

**Frontend:**

- REACT_APP_API_URL (backend URL, no trailing slash)

---

## Database Management

### Connect to Database

**Using psql (command line):**

```bash
# Get External Database URL from Render dashboard
psql postgresql://user:password@host/database
```

**Using GUI Tools:**

- pgAdmin: <https://www.pgadmin.org/>
- DBeaver: <https://dbeaver.io/>
- TablePlus: <https://tableplus.com/>

Use the **External Database URL** from Render for external connections.

### Backup Database (Free Tier)

Since free tier doesn't include automatic backups:

```bash
# Export database
pg_dump -Fc --no-acl --no-owner -h hostname -U username database > backup.dump

# Restore database
pg_restore -h hostname -U username -d database backup.dump
```

**Tip:** Schedule regular manual backups or upgrade to paid plan for automatic backups.

### View Database Tables

```sql
-- List all tables
\dt

-- View users table
SELECT * FROM users;

-- View workouts table  
SELECT * FROM workouts;

-- Count records
SELECT COUNT(*) FROM workouts;
```

---

## Important Notes

### Free PostgreSQL Expiration

⚠️ **Free PostgreSQL databases expire after 90 days**

**Options:**

1. **Upgrade to paid plan** ($7/month) - No expiration, backups included
2. **Recreate database** every 90 days and restore data
3. **Export data** before expiration and import to new database

**Recommended:** If this is a production app, upgrade to paid PostgreSQL plan.

### Database Limits

- **Free:** 1 GB storage, 97 connections max
- **Paid ($7/month):** 10 GB storage, 97 connections max
- **Paid ($25/month):** 100 GB storage, 200 connections max

---

## Success! 🎉

Your Gym Tracker app is now live with Render's PostgreSQL database!

**What you've deployed:**

- ✅ PostgreSQL database on Render (free tier)
- ✅ Backend API on Render
- ✅ Frontend on Render
- ✅ Everything in one platform!

Share your frontend URL with others to let them use your app.

**Pro Tips:**

- Free tier backend spins down after inactivity. Upgrade to $7/month for 24/7 availability.
- **Free PostgreSQL expires in 90 days.** Upgrade to $7/month to avoid data loss and get backups.
- Use Internal Database URL for faster connections within Render.
- Regularly export your data as backup on free tier.
