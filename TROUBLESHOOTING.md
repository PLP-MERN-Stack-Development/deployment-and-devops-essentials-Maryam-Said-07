# 🔴 API CONNECTION TROUBLESHOOTING

## Issue: "API: disconnected" & "Failed to load tasks"

Your frontend can't connect to your backend. Here's how to fix it:

---

## ✅ FIXES APPLIED:

1. **Created `.env` file** with correct backend URL
2. **Removed trailing slash** from URL (was causing 404s)

---

## 🔧 IMMEDIATE ACTIONS NEEDED:

### Step 1: Restart Your Development Server

The `.env` file I just created needs the dev server to restart:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it:
cd c:\Users\Kasey\Documents\Coding\PLP_academy\MERN\deployment-and-devops-essentials-jbkelli\client
npm run dev
```

**Why?** Vite only loads `.env` files when the server starts.

---

### Step 2: Verify Backend Environment Variables on Render

Your backend MUST have these environment variables set on Render:

**Go to:** https://dashboard.render.com → Your Service → Environment Tab

**Required Variables:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mern-tasks?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000
JWT_SECRET=0cd711d687f90a56a86cade743a1a69c5f0b6695d18108215d1b64c2af8ec97d
JWT_EXPIRE=7d
```

**CRITICAL:** Make sure `CLIENT_URL` allows your local development!

For now, use: `CLIENT_URL=http://localhost:3000`

Later, when you deploy frontend to Vercel, you'll update it to your Vercel URL.

---

### Step 3: Test Backend Endpoints Manually

**Open these URLs in your browser:**

#### 1. Root Endpoint
```
https://mern-task-backend-2pj9.onrender.com
```
**Should see:** API info with version and endpoints

#### 2. Health Check
```
https://mern-task-backend-2pj9.onrender.com/health
```
**Should see:** `"database": "connected"` (if MongoDB is connected)

#### 3. Tasks Endpoint
```
https://mern-task-backend-2pj9.onrender.com/api/tasks
```
**Should see:** Empty tasks array: `{"tasks":[],"pagination":{...}}`

**If ANY of these fail, your backend isn't properly configured!**

---

## 🔍 COMMON CAUSES & SOLUTIONS:

### Issue 1: CORS Error (Most Likely)
**Error in browser console:** 
```
Access to fetch at 'https://...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
1. Go to Render dashboard
2. Set `CLIENT_URL=http://localhost:3000` in environment variables
3. Save and wait for redeploy (2-3 minutes)
4. Restart your frontend dev server

---

### Issue 2: Backend Not Running
**Check Render logs:**
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for errors

**Common errors:**
- MongoDB connection failed → Check MONGODB_URI
- Port already in use → Render handles this automatically
- Missing dependencies → Redeploy

---

### Issue 3: Wrong API URL
**Check the frontend is using the right URL:**

1. Open browser console (F12)
2. Look at the Network tab
3. See what URL it's trying to fetch from
4. Should be: `https://mern-task-backend-2pj9.onrender.com/health`

**If it's using `http://localhost:5000`:**
- The `.env` file isn't being loaded
- Restart the dev server
- Check the `.env` file exists in the `client` folder

---

### Issue 4: Trailing Slash Problem
**If URLs end with `//`:**
- ✅ Fixed! I removed the trailing slash
- Restart dev server to pick up the change

---

## 🧪 HOW TO TEST:

### Test 1: Check Browser Console
```
1. Open your app: http://localhost:3000
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for errors (red text)
5. Look for "API health check failed" message
```

**What to look for:**
- ✅ No errors → Backend is reachable
- ❌ CORS error → Update CLIENT_URL on Render
- ❌ Network error → Backend is down
- ❌ 404 error → Wrong URL or backend routes not working

### Test 2: Check Network Tab
```
1. F12 → Network tab
2. Refresh the page
3. Look for request to /health
4. Click on it to see details
```

**What to check:**
- Request URL should be: `https://mern-task-backend-2pj9.onrender.com/health`
- Status should be: 200 (not 404, 500, or CORS error)
- Response should show: `{"uptime":...,"message":"OK",...}`

### Test 3: Direct Backend Access
```
Open in browser: https://mern-task-backend-2pj9.onrender.com/health
```

**If this works but your app doesn't → CORS issue!**

---

## 📋 STEP-BY-STEP FIX:

### For Local Development (localhost:3000):

1. **Backend on Render:**
   ```
   CLIENT_URL=http://localhost:3000
   ```

2. **Frontend `.env` file:**
   ```
   VITE_API_URL=https://mern-task-backend-2pj9.onrender.com
   ```

3. **Restart frontend dev server:**
   ```bash
   npm run dev
   ```

4. **Check browser console** for errors

5. **Test the app** at http://localhost:3000

---

### For Vercel Deployment (production):

1. **Deploy frontend to Vercel** with:
   ```
   VITE_API_URL=https://mern-task-backend-2pj9.onrender.com
   ```

2. **Update backend on Render:**
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```

3. **Wait for redeploy** (2-3 minutes)

4. **Test your Vercel URL**

---

## ⚡ QUICK CHECKLIST:

- [ ] `.env` file exists in `client` folder (✅ Just created)
- [ ] `.env` has correct backend URL (no trailing slash)
- [ ] Dev server restarted after creating `.env`
- [ ] Backend has `CLIENT_URL` environment variable set
- [ ] Backend is running (visit /health endpoint)
- [ ] MongoDB is connected (`"database": "connected"`)
- [ ] No CORS errors in browser console
- [ ] Network tab shows 200 status for /health request

---

## 🆘 STILL NOT WORKING?

### Check Browser Console (F12):
```javascript
// You should see this:
console.log(import.meta.env.VITE_API_URL)
// Output: https://mern-task-backend-2pj9.onrender.com
```

If it shows `undefined` → `.env` file not loaded → Restart dev server

---

### Check Render Logs:
1. Go to Render dashboard
2. Click "Logs" tab
3. Look for startup logs
4. Should see: "Connected to MongoDB"
5. Should see: "Server running on port XXX"

---

### Check MongoDB Atlas:
1. Go to MongoDB Atlas dashboard
2. Network Access → Should have 0.0.0.0/0
3. Database Access → User `YOUR_USERNAME` should exist
4. Browse Collections → See if database `mern-tasks` exists

---

## 🎯 EXPECTED BEHAVIOR:

After fixing:

1. **Visit:** http://localhost:3000
2. **See:** "API: connected" (green, top right)
3. **Click:** "Tasks" in navigation
4. **See:** Empty task list (no errors)
5. **Click:** "Create Task"
6. **Fill out form** and submit
7. **See:** Task appears in list

---

## 📱 NEXT STEPS:

1. **Restart dev server** (npm run dev)
2. **Check browser console** for errors
3. **Test /health endpoint** directly in browser
4. **If CORS error** → Update CLIENT_URL on Render
5. **If 404 error** → Check backend routes deployed
6. **If database disconnected** → Check MONGODB_URI

---

**Backend URL:** `https://mern-task-backend-2pj9.onrender.com`
**Frontend (local):** `http://localhost:3000`

**The `.env` file is created! Restart your dev server and try again!** 🚀
