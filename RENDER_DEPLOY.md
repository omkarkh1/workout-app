# Render Deployment Guide

## Complete Step-by-Step Deployment to Render

### Prerequisites

✅ GitHub account  
✅ Render account (sign up at https://render.com)  
✅ MongoDB Atlas database set up  
✅ Code pushed to GitHub repository

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

## Part 2: Deploy Backend to Render

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
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long random string (32+ characters) |
| `NODE_ENV` | `production` |

**Generate JWT Secret:**
```bash
# On macOS/Linux
openssl rand -base64 32

# Or use online: https://randomkeygen.com/
```

**MongoDB URI Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/gym-tracker?retryWrites=true&w=majority
```

### 4. Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see: ✅ **Live**
4. **COPY YOUR BACKEND URL** (e.g., `https://gym-tracker-backend.onrender.com`)

---

## Part 3: Deploy Frontend to Render

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

## Part 4: Verify Deployment

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

### ❌ MongoDB Connection Failed

**Problem:** Backend logs show MongoDB connection error

**Solution:**
1. Verify `MONGODB_URI` in environment variables
2. In MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0`
3. Check database user has correct permissions
4. Ensure connection string includes database name

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

### Upgrade Options

If you need more:
- $7/month: Keep backend running 24/7 (no spin down)
- $25/month: More RAM and CPU

---

## Security Best Practices

### After Deployment

1. ✅ Change JWT_SECRET to a strong random value
2. ✅ Use environment variables (never hardcode secrets)
3. ✅ Restrict MongoDB IP access (or use specific IPs)
4. ✅ Enable MongoDB authentication
5. ✅ Use HTTPS (Render provides this automatically)

### Production Checklist

- [ ] MongoDB connection string uses strong password
- [ ] JWT_SECRET is at least 32 random characters
- [ ] NODE_ENV set to `production`
- [ ] GitHub repository is private (if containing sensitive info)
- [ ] Environment variables are set in Render (not in code)

---

## Custom Domain (Optional)

1. Purchase domain (e.g., from Namecheap, GoDaddy)
2. In Render Dashboard → Settings
3. Click **"Custom Domain"**
4. Follow instructions to add DNS records

---

## Support & Resources

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com/
- **MongoDB Atlas Support:** https://www.mongodb.com/cloud/atlas/support

---

## Quick Reference

### Your URLs
```
Backend:  https://YOUR-BACKEND-NAME.onrender.com
Frontend: https://YOUR-FRONTEND-NAME.onrender.com
```

### Environment Variables

**Backend:**
- MONGODB_URI
- JWT_SECRET
- NODE_ENV=production

**Frontend:**
- REACT_APP_API_URL (backend URL, no trailing slash)

---

## Success! 🎉

Your Gym Tracker app is now live and accessible from anywhere!

Share your frontend URL with others to let them use your app.

**Pro Tip:** Free tier services spin down after inactivity. Consider upgrading to $7/month for 24/7 availability if needed.
