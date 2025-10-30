# Gym Tracker - Quick Start Guide

## Prerequisites

- Node.js v14 or higher
- PostgreSQL (local or Render)

## Setup Steps

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server and client dependencies
npm run install-all
```

### 2. Configure PostgreSQL

**Local PostgreSQL:**

```bash
# Create database
psql postgres
CREATE DATABASE gym_tracker;
CREATE USER gym_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_user;
\q
```

**Or use Render PostgreSQL:**

1. Go to [Render](https://render.com)
2. Create PostgreSQL database (free tier)
3. Copy Internal Database URL

### 3. Set Up Environment Variables

**Server (.env in /server directory):**

```env
PORT=5000
DATABASE_URL=postgresql://gym_user:your_password@localhost:5432/gym_tracker
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=development
```

**Client (.env in /client directory):**

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run the Application

```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

### 5. Access the App

Open http://localhost:3000 in your browser

## Default Credentials

Create a new account using the Register page.

## Project Structure

```
gym-tracker/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth & Workout contexts
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API utilities
│   │   └── App.js
│   └── package.json
├── server/              # Express backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Entry point
│   └── package.json
├── package.json         # Root package
└── README.md
```

## Features

- ✅ User Authentication (JWT)
- ✅ Add/Edit/Delete Workouts
- ✅ Filter by Exercise/Date
- ✅ Mobile Responsive
- ✅ Secure Password Hashing
- ✅ Error Handling
- ✅ Input Validation

## Troubleshooting

**PostgreSQL Connection Error:**
- Verify DATABASE_URL
- Ensure PostgreSQL is running: `pg_isready`
- Check database and user exist

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Module Not Found:**
```bash
# Clear and reinstall
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install-all
```

## Support

For issues or questions, check the main README.md for full documentation.
