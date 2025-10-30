# Gym Exercise Tracker

A full-stack web application for tracking gym workouts with user authentication, built with React, Node.js/Express, and MongoDB.

## Features

- 🔐 User authentication (signup, login, logout) with JWT
- 📊 Dashboard with workout history
- ✍️ Add, edit, and delete workouts
- 🔍 Filter workouts by date or exercise
- 📱 Mobile-responsive design
- ☁️ Cloud-ready for MongoDB Atlas and Render deployment

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
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
- MongoDB Atlas account (free tier)
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

### Step 2: MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0)
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 3: Environment Variables

Create `.env` file in the `/server` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/gym-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Create `.env` file in the `/client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Important:** Replace the placeholder values with your actual MongoDB credentials and generate a secure JWT secret.

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
- MongoDB Atlas database (already set up above)

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/gym-tracker.git
git push -u origin main
```

### Step 2: Deploy Backend to Render

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
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secure JWT secret (generate a strong random string)
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render default, but will be overridden automatically)
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://gym-tracker-backend.onrender.com`)

### Step 3: Deploy Frontend to Render

1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the site:
   - **Name:** gym-tracker-frontend
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL from Step 2 (without trailing slash)
5. Click "Create Static Site"
6. Wait for deployment (5-10 minutes)

### Step 4: Update CORS (if needed)

If you encounter CORS errors, the backend is already configured to accept requests from any origin in production. However, for better security, you can update the CORS configuration in `server/server.js` to only allow your frontend URL.

### Important Notes for Render Free Tier

- **Backend spin-down:** Free tier backends sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.
- **Monthly hours:** Free tier has 750 hours/month limit (enough for one service running 24/7).
- **Build time:** Free tier builds can be slow. Be patient during deployment.
- **Database:** Use MongoDB Atlas free tier (M0) for database storage.

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

**MongoDB Connection Error:**
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials

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
- Ensure all dependencies are in package.json (not devDependencies for production deps)
- Verify Root Directory is set correctly

**Backend Not Responding:**
- Check if service is sleeping (free tier)
- Verify environment variables are set correctly
- Check server logs in Render dashboard

**Frontend Can't Connect to Backend:**
- Verify `REACT_APP_API_URL` is set to correct backend URL
- Check CORS configuration in server
- Ensure backend service is running

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
