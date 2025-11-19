# 🔧 RENDER ENVIRONMENT VARIABLES SETUP

## ⚠️ CRITICAL: Set These on Render Dashboard

Your backend is deployed but needs environment variables configured on Render!

---

## 📍 Where to Set Environment Variables

1. Go to: https://dashboard.render.com
2. Click on your backend service: `mern-task-backend-2pj9` (or similar)
3. Click **"Environment"** tab in the left sidebar
4. Click **"Add Environment Variable"** button

---

## 🔑 REQUIRED Environment Variables

Add these **EXACT** variables on Render:

### 1. NODE_ENV
```
Key: NODE_ENV
Value: production
```
**Why:** Tells Express to run in production mode (better error handling, optimized logging)

---

### 2. PORT
```
Key: PORT
Value: (Leave empty - Render sets this automatically)
```
**Why:** Render automatically assigns a port. Don't set this manually.

---

### 3. MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mern-tasks?retryWrites=true&w=majority
```

**IMPORTANT:** Add the database name `mern-tasks` to the end!

**Why:** This connects your app to MongoDB Atlas database

---

### 4. CLIENT_URL
```
Key: CLIENT_URL
Value: https://your-vercel-app.vercel.app
```

**Replace with your actual Vercel frontend URL!**

**Why:** This sets the CORS allowed origin so your frontend can talk to the backend

**Example:**
- If your Vercel URL is: `https://mern-task-manager.vercel.app`
- Then CLIENT_URL should be: `https://mern-task-manager.vercel.app`

---

### 5. JWT_SECRET
```
Key: JWT_SECRET
Value: 0cd711d687f90a56a86cade743a1a69c5f0b6695d18108215d1b64c2af8ec97d
```

**Or generate a new one:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Why:** Used to sign JWT tokens for authentication

---

### 6. JWT_EXPIRE (Optional)
```
Key: JWT_EXPIRE
Value: 7d
```
**Why:** JWT tokens expire after 7 days

---

## 📋 Quick Copy-Paste Format

Here's the list for easy copying:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://jbkelli:katekatie2006@jbkelli.x5aauu7.mongodb.net/mern-tasks?retryWrites=true&w=majority
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=0cd711d687f90a56a86cade743a1a69c5f0b6695d18108215d1b64c2af8ec97d
JWT_EXPIRE=7d
```

**⚠️ REMEMBER:** Replace `your-vercel-app.vercel.app` with your actual Vercel URL!

---

## ✅ After Adding Variables

1. **Save** - Click "Save Changes" on Render
2. **Redeploy** - Render will automatically redeploy your app (takes 2-3 minutes)
3. **Test** - Visit your backend URL again

---

## 🧪 Test Your Backend

After setting environment variables, test these endpoints:

### 1. Root Endpoint
```
https://mern-task-backend-2pj9.onrender.com/
```
**Should return:**
```json
{
  "message": "MERN Task Manager API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "health": "/health",
    "api": "/api",
    "tasks": "/api/tasks",
    "users": "/api/users"
  }
}
```

### 2. Health Check
```
https://mern-task-backend-2pj9.onrender.com/health
```
**Should return:**
```json
{
  "uptime": 123.456,
  "message": "OK",
  "timestamp": 1699564800000,
  "environment": "production",
  "database": "connected"
}
```

### 3. API Status
```
https://mern-task-backend-2pj9.onrender.com/api
```
**Should return:**
```json
{
  "message": "MERN Deployment API",
  "version": "1.0.0",
  "status": "running",
  "database": "connected"
}
```

### 4. Tasks Endpoint
```
https://mern-task-backend-2pj9.onrender.com/api/tasks
```
**Should return:**
```json
{
  "tasks": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "pages": 0
  }
}
```

---

## 🔍 Troubleshooting

### If you see "Route not found"
- ✅ Fixed! I just added a root route handler
- Commit and push the updated code
- Render will auto-redeploy

### If you see "database": "disconnected"
- ❌ Check MONGODB_URI is correct
- ❌ Make sure it includes the database name: `/mern-tasks`
- ❌ Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### If you see CORS errors
- ❌ Check CLIENT_URL matches your Vercel URL exactly
- ❌ Make sure there's no trailing slash in CLIENT_URL
- ❌ Use `https://` not `http://`

---

## 📱 MongoDB Atlas Setup

Make sure your MongoDB Atlas is configured:

1. **Network Access**
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Add IP: `0.0.0.0/0`
   - Save

2. **Database User**
   - Go to Database Access
   - Verify user: `YOUR_USERNAME` exists
   - Password: `YOUR_PASSWORD`
   - Role: Read and write to any database

3. **Database Name**
   - Your connection string should end with: `/mern-tasks`
   - This is the database name where tasks will be stored

---

## 🔄 Next Steps After Setting Variables

1. **Commit the root route fix:**
   ```bash
   git add server/server.js
   git commit -m "Add root route endpoint"
   git push origin main
   ```

2. **Wait for Render to redeploy** (2-3 minutes)

3. **Test the endpoints** listed above

4. **Deploy your frontend to Vercel** with:
   ```
   VITE_API_URL=https://mern-task-backend-2pj9.onrender.com
   ```

5. **Update CLIENT_URL on Render** to your Vercel URL

---

## ✨ Success Checklist

After setting up environment variables, you should see:

- [ ] `/` endpoint returns API info (not "Route not found")
- [ ] `/health` shows `"database": "connected"`
- [ ] `/api` shows status "running"
- [ ] `/api/tasks` returns empty tasks array
- [ ] No CORS errors from frontend
- [ ] Can create tasks from frontend

---

**Your backend URL:** `https://mern-task-backend-2pj9.onrender.com`

**Set these variables on Render NOW, then test!** 🚀
