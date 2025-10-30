# Migration to PostgreSQL Summary

## Changes Made

Your Gym Tracker application has been successfully converted to use **PostgreSQL** (via Render) instead of MongoDB Atlas.

### What Changed

#### Backend Changes

1. **Database:** MongoDB → PostgreSQL
2. **ORM:** Mongoose → Sequelize
3. **Dependencies Updated:**
   - Removed: `mongoose`
   - Added: `pg`, `pg-hstore`, `sequelize`

#### Files Modified

**Server Side:**
- `server/package.json` - Updated dependencies
- `server/.env.example` - DATABASE_URL instead of MONGODB_URI
- `server/server.js` - Sequelize connection instead of Mongoose
- `server/config/database.js` - New file for Sequelize configuration
- `server/models/User.js` - Converted to Sequelize model
- `server/models/Workout.js` - Converted to Sequelize model
- `server/routes/auth.js` - Updated for Sequelize queries
- `server/routes/workouts.js` - Updated for Sequelize queries

**Documentation:**
- `README.md` - PostgreSQL setup instructions
- `SETUP.md` - PostgreSQL local setup
- `RENDER_DEPLOY.md` - Complete guide for Render PostgreSQL

#### Frontend Changes

**None!** The frontend remains unchanged and works exactly the same.

---

## Benefits of Using Render PostgreSQL

### ✅ Advantages

1. **Single Platform:** Everything (database, backend, frontend) on Render
2. **No External Setup:** No need for MongoDB Atlas account
3. **Free Tier Available:** 1 GB storage, good for small apps
4. **Internal URLs:** Faster connections between services
5. **SQL Database:** More familiar for many developers
6. **Relational Data:** Better for structured data

### ⚠️ Important Notes

1. **Free Tier Expiration:** PostgreSQL free tier expires after 90 days
   - **Solution:** Upgrade to $7/month for permanent storage
   
2. **No Automatic Backups:** Free tier doesn't include backups
   - **Solution:** Export data manually or upgrade to paid plan

3. **Storage Limit:** 1 GB on free tier
   - **Solution:** Upgrade to $7/month for 10 GB

---

## Deployment Steps (Quick Reference)

### 1. Create PostgreSQL Database

```text
Render Dashboard → New + → PostgreSQL → Free Tier
Copy Internal Database URL
```

### 2. Deploy Backend

```text
Root Directory: server
Environment Variable: DATABASE_URL = <Internal URL from step 1>
```

### 3. Deploy Frontend

```text
Root Directory: client
Environment Variable: REACT_APP_API_URL = <Backend URL from step 2>
```

---

## Environment Variables

### Server (.env)

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-32-char-secret-here
NODE_ENV=development
PORT=5000
```

### Client (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | Primary Key |
| name | VARCHAR(50) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| createdAt | TIMESTAMP | AUTO |
| updatedAt | TIMESTAMP | AUTO |

### Workouts Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | Primary Key |
| userId | UUID | Foreign Key → users.id |
| exerciseName | VARCHAR(100) | NOT NULL |
| sets | INTEGER | NOT NULL |
| reps | INTEGER | NOT NULL |
| weight | DECIMAL(10,2) | NOT NULL |
| date | DATE | NOT NULL |
| notes | TEXT | NULL |
| createdAt | TIMESTAMP | AUTO |
| updatedAt | TIMESTAMP | AUTO |

**Indexes:**
- users(email) - Unique
- workouts(userId, date) - Performance
- workouts(userId, exerciseName) - Performance

---

## Local Development

### Install PostgreSQL

**macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```sql
psql postgres
CREATE DATABASE gym_tracker;
CREATE USER gym_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_user;
\q
```

### Update .env

```env
DATABASE_URL=postgresql://gym_user:your_password@localhost:5432/gym_tracker
```

---

## Database Management

### Connect to Database

```bash
# Local
psql gym_tracker

# Render (use External URL)
psql postgresql://user:pass@host/database
```

### Useful Commands

```sql
-- List tables
\dt

-- View users
SELECT * FROM "Users";

-- View workouts
SELECT * FROM "Workouts" ORDER BY date DESC LIMIT 10;

-- Count records
SELECT COUNT(*) FROM "Workouts";

-- Delete all data (careful!)
TRUNCATE "Users", "Workouts" CASCADE;
```

### Backup & Restore

```bash
# Export database
pg_dump -Fc gym_tracker > backup.dump

# Restore database
pg_restore -d gym_tracker backup.dump
```

---

## Migration from MongoDB (If Needed)

If you have existing data in MongoDB and want to migrate:

### 1. Export from MongoDB

```bash
mongoexport --uri="mongodb+srv://..." --collection=users --out=users.json
mongoexport --uri="mongodb+srv://..." --collection=workouts --out=workouts.json
```

### 2. Convert to PostgreSQL

Write a migration script to:
- Convert MongoDB `_id` to PostgreSQL `id` (UUID)
- Convert date formats
- Map field names if needed

### 3. Import to PostgreSQL

Use SQL INSERT statements or a script with Sequelize.

---

## Testing

### Run Tests Locally

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Start backend
cd server && npm start

# Start frontend (in new terminal)
cd client && npm start

# Test in browser
open http://localhost:3000
```

### Test Registration

1. Go to http://localhost:3000/register
2. Create account
3. Check PostgreSQL: `SELECT * FROM "Users";`

### Test Workouts

1. Login
2. Add workout
3. Check PostgreSQL: `SELECT * FROM "Workouts";`

---

## Troubleshooting

### Connection Error

**Error:** `connection refused` or `ECONNREFUSED`

**Solutions:**
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in .env
- Ensure port 5432 is not blocked

### Authentication Error

**Error:** `password authentication failed`

**Solutions:**
- Check database user exists
- Verify password in DATABASE_URL
- Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_user;`

### Table Not Found

**Error:** `relation "Users" does not exist`

**Solutions:**
- Tables are auto-created on first run
- Check server logs for migration errors
- Manually sync: Add `{ force: true }` to `sequelize.sync()` (WARNING: deletes data)

### Render Deployment Issues

**Error:** Database connection timeout

**Solutions:**
- Use **Internal Database URL** (not External)
- Ensure backend and database are in same region
- Check DATABASE_URL environment variable is set

---

## Costs

### Free Tier

- **Web Service:** 750 hours/month (enough for one service 24/7)
- **Static Site:** Unlimited
- **PostgreSQL:** 1 GB storage, expires after 90 days

### Paid Plans

- **Web Service:** $7/month (no sleep, 24/7 uptime)
- **PostgreSQL:** $7/month (10 GB, no expiration, backups)
- **Recommended:** $14/month total for production app

---

## Next Steps

1. ✅ Install dependencies: `npm run install-all`
2. ✅ Set up PostgreSQL (local or Render)
3. ✅ Configure environment variables
4. ✅ Run locally: `npm run dev`
5. ✅ Test all features
6. ✅ Deploy to Render
7. ✅ Set up monitoring
8. ✅ Consider upgrading database for production

---

## Support

- **Sequelize Docs:** https://sequelize.org/docs/v6/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Render Docs:** https://render.com/docs/databases

For issues, check the RENDER_DEPLOY.md guide or README.md.
