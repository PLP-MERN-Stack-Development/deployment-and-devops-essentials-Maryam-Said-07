# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies (in new terminal)
cd client
npm install
```

### 2. Configure Environment

**Backend (.env):**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```bash
MONGODB_URI=mongodb://localhost:27017/mern-tasks
JWT_SECRET=my-secret-key
```

**Frontend (.env):**
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```bash
VITE_API_URL=http://localhost:5000
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 4. Access the App

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## 🎯 Test the API

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API",
    "priority": "high",
    "status": "todo"
  }'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

## 📝 Next Steps

1. Explore the app at http://localhost:3000
2. Create some tasks
3. Check the API documentation in README.md
4. Read DEPLOYMENT.md when ready to deploy

## ❓ Troubleshooting

**MongoDB Connection Error?**
- Make sure MongoDB is running locally
- Or use MongoDB Atlas and update MONGODB_URI

**Port Already in Use?**
- Change PORT in server/.env
- Update VITE_API_URL in client/.env

**Dependencies Not Installing?**
- Make sure you have Node.js 18+ installed
- Try deleting node_modules and package-lock.json
- Run `npm install` again

## 🆘 Need Help?

Check the main README.md for detailed documentation!
