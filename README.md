# Gym Exercise Tracker

A full-stack web application for tracking gym workouts with user authentication, built with React, Node.js/Express, and PostgreSQL.

## Features

- 🔐 User authentication (signup, login, logout) with JWT
- 📊 Dashboard with workout history
- ✍️ Add, edit, and delete workouts
- 🔍 Filter workouts by date or exercise
- 📱 Mobile-responsive design
- ☁️ Cloud-ready for Render deployment with PostgreSQL

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js
- Express
- PostgreSQL with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
gym-tracker/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
└── README.md
```

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (local or Render)
- Git

### Step 1: Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client

# Or install all at once
npm run install-all
```

### Step 2: Database Setup

**Option A: Local PostgreSQL**

1. Install PostgreSQL locally
2. Create a database:

```sql
CREATE DATABASE gym_tracker;
CREATE USER gym_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_user;
```

**Option B: Render PostgreSQL (Recommended for deployment)**

1. Create account at [Render](https://render.com)
2. Create new PostgreSQL database (free tier available)
3. Copy the Internal Database URL

### Step 3: Environment Variables

Create `.env` file in the `/server` directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/gym_tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Create `.env` file in the `/client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Important:** Replace the DATABASE_URL with your actual PostgreSQL credentials and generate a secure JWT secret.

### Step 4: Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
# Terminal 1 - Backend (runs on http://localhost:5000)
npm run server

# Terminal 2 - Frontend (runs on http://localhost:3000)
npm run client
```

The app will be available at `http://localhost:3000`

## Deployment to Render

### Prerequisites

- GitHub account
- Render account (free tier)
- Project code pushed to GitHub

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/gym-tracker.git
git push -u origin main
```

### Step 2: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `gym-tracker-db`
   - Database: `gym_tracker`
   - Region: Choose closest
   - Plan: Free
4. Click "Create Database"
5. Copy the **Internal Database URL**

### Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** gym-tracker-backend
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL Internal Database URL from Step 2
   - `JWT_SECRET`: Your secure JWT secret (generate a strong random string)
   - `NODE_ENV`: `production`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://gym-tracker-backend.onrender.com`)

### Step 4: Deploy Frontend to Render

1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the site:
   - **Name:** gym-tracker-frontend
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL from Step 2 (without trailing slash)
6. Click "Create Static Site"
7. Wait for deployment (5-10 minutes)

### Step 5: Verify

Visit your frontend URL and test the application!

### Important Notes for Render Free Tier

- **Backend:** Spins down after 15 minutes of inactivity (30-60s wake time)
- **Database:** Free PostgreSQL expires after 90 days (upgrade to $7/month for permanent storage)
- **Storage:** 1 GB database storage on free tier

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (requires auth)

### Workouts
- `GET /api/workouts` - Get all workouts for logged-in user
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens for authentication
- Protected API routes with middleware
- Environment variables for sensitive data
- CORS configured for production
- Input validation and sanitization

## Troubleshooting

### Local Development Issues

**PostgreSQL Connection Error:**
- Check your DATABASE_URL in server/.env
- Ensure PostgreSQL is running locally
- Verify database exists and user has permissions

**Port Already in Use:**
- Change PORT in server/.env to a different number
- Kill the process using the port: `lsof -ti:5000 | xargs kill -9`

**Dependencies Installation Failed:**
- Delete `node_modules` folders and `package-lock.json` files
- Run `npm install` again
- Ensure you have Node.js v14 or higher

### Render Deployment Issues

**Build Failed:**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Root Directory is set correctly

**Database Connection Error:**
- Verify DATABASE_URL is set correctly
- Use Internal Database URL (not External)
- Ensure database and backend are in same region

**Frontend Can't Connect to Backend:**
- Verify `REACT_APP_API_URL` is set to correct backend URL
- Check CORS configuration in server
- Ensure backend service is running

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
