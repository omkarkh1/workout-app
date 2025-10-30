# Gym Tracker - Quick Start Guide

## Prerequisites

- Node.js v14 or higher
- MongoDB Atlas account (free tier)

## Setup Steps

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server and client dependencies
npm run install-all
```

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create a database user
4. Whitelist IP: 0.0.0.0/0 (for development)
5. Get connection string

### 3. Set Up Environment Variables

**Server (.env in /server directory):**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-tracker?retryWrites=true&w=majority
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

**MongoDB Connection Error:**
- Verify connection string
- Check IP whitelist in Atlas
- Ensure database user has correct permissions

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
