# 🚀 Vercel Deployment - Step by Step Guide

## ✅ Your Frontend is Ready!

Everything is configured correctly for Vercel deployment. Follow these exact steps:

---

## 📋 Before You Start

**What You Need:**
1. ✅ GitHub account
2. ✅ Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
3. ✅ Your code pushed to GitHub
4. ✅ Backend deployed to Render (get the URL first!)

**Time Required:** 5-10 minutes

---

## 🎯 Step-by-Step Instructions

### Step 1: Push Your Code to GitHub

If you haven't already:

```powershell
# Navigate to your project
cd c:\Users\Kasey\Documents\Coding\PLP_academy\MERN\deployment-and-devops-essentials-jbkelli

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

---

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended - Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" (use GitHub to sign in)

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find your `deployment-and-devops-essentials-jbkelli` repository
   - Click "Import"

3. **Configure Project Settings**
   
   **IMPORTANT - Set Root Directory:**
   - Click "Edit" next to Root Directory
   - Enter: `client`
   - This tells Vercel to deploy only the frontend folder!

   **Build Settings (Vercel auto-detects from vercel.json):**
   - Framework Preset: Vite (should auto-detect)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Install Command: `npm install` (auto-filled)

4. **Set Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   Name: VITE_API_URL
   Value: https://your-backend-name.onrender.com
   ```
   
   **⚠️ IMPORTANT:** Replace `your-backend-name.onrender.com` with your actual Render backend URL!
   
   Optional (but nice to have):
   ```
   Name: VITE_APP_NAME
   Value: MERN Task Manager
   ```

5. **Deploy!**
   - Click "Deploy"
   - Vercel will build your app (takes 1-2 minutes)
   - You'll get a URL like: `https://your-project-name.vercel.app`

---

#### Option B: Using Vercel CLI (For Advanced Users)

```powershell
# Navigate to client folder
cd c:\Users\Kasey\Documents\Coding\PLP_academy\MERN\deployment-and-devops-essentials-jbkelli\client

# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? mern-task-manager (or whatever you want)
# - In which directory is your code located? ./ (current directory)
# - Want to override settings? No

# For production deployment
vercel --prod
```

---

### Step 3: Configure Environment Variables in Vercel

After deployment:

1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add the following:

```
VITE_API_URL → https://your-backend.onrender.com
```

5. Click "Save"
6. Go to "Deployments" tab
7. Click "Redeploy" on your latest deployment

---

### Step 4: Update Backend CORS Settings

**CRITICAL STEP!** Your backend needs to allow requests from your Vercel frontend.

#### On Render:

1. Go to your Render dashboard
2. Select your backend service
3. Click "Environment"
4. Find `CLIENT_URL` variable
5. Update it to your Vercel URL: `https://your-app.vercel.app`
6. Click "Save Changes"
7. Wait for automatic redeploy

---

### Step 5: Test Your Deployment

1. **Visit Your Vercel URL**
   - Open: `https://your-app.vercel.app`

2. **Check API Connection**
   - Look at the "API Status" indicator in the header
   - It should show "connected" (green)
   - If it shows "disconnected" (red), check:
     - Is your backend running on Render?
     - Did you set `VITE_API_URL` correctly?
     - Did you update `CLIENT_URL` on Render?

3. **Test the App**
   - Click "Tasks" in navigation
   - Try creating a new task
   - Check if tasks load and display

---

## 🔧 Troubleshooting

### Problem: "API: disconnected" showing in app

**Solutions:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify backend is running (visit backend `/health` endpoint)
3. Check browser console for CORS errors
4. Ensure `CLIENT_URL` on Render matches your Vercel URL

### Problem: Build fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` has all dependencies
3. Ensure `vite.config.js` exists in client folder
4. Check that Root Directory is set to `client`

### Problem: Blank page after deployment

**Solutions:**
1. Check browser console for errors
2. Verify `vercel.json` is in client folder
3. Check that `index.html` exists in client folder
4. Ensure build output is set to `dist`

### Problem: Routes not working (404 on refresh)

**Solution:** The `vercel.json` file handles this with rewrites. Make sure it exists:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📁 What You Need in Client Folder

✅ All these files are already created for you:

```
client/
├── package.json          ✅ Ready
├── vite.config.js        ✅ Ready
├── vercel.json           ✅ Ready (updated)
├── index.html            ✅ Ready
├── .env.example          ✅ Ready
└── src/
    ├── main.jsx          ✅ Ready
    ├── App.jsx           ✅ Ready
    ├── App.css           ✅ Ready
    └── components/       ✅ Ready
```

**You don't need to create ANY new files!** Everything is ready.

---

## 🎯 Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render (get URL)
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root Directory set to `client`
- [ ] `VITE_API_URL` environment variable set
- [ ] Backend `CLIENT_URL` updated to Vercel URL
- [ ] App deployed successfully
- [ ] API status shows "connected"
- [ ] Can create and view tasks

---

## 🌐 Your Deployment URLs

After deployment, you'll have:

**Frontend:** `https://your-project-name.vercel.app`
**Backend:** `https://your-backend.onrender.com`
**Database:** MongoDB Atlas cluster

---

## 🔄 Auto-Deployment

Vercel automatically redeploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys! 🚀
```

---

## 💡 Pro Tips

1. **Use Preview Deployments**
   - Every pull request gets its own preview URL
   - Test changes before merging to main

2. **Check Build Logs**
   - Always check Vercel build logs if something fails
   - Logs show exactly what went wrong

3. **Environment Variables**
   - Different variables for Production/Preview/Development
   - Use Production for live site

4. **Custom Domain**
   - Free `.vercel.app` domain included
   - Can add custom domain in Settings → Domains

---

## 📞 Need Help?

1. Check Vercel build logs in dashboard
2. Review `DEPLOYMENT.md` for detailed troubleshooting
3. Verify all environment variables are set correctly
4. Check browser console for frontend errors
5. Check Render logs for backend errors

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Vercel build completes without errors
- ✅ App loads at Vercel URL
- ✅ API status indicator shows "connected"
- ✅ You can view the task list
- ✅ You can create new tasks
- ✅ Tasks are saved to MongoDB

**That's it! Your app is live on Vercel!** 🎉

---

**Next Step:** After Vercel deployment works, set up the CI/CD pipeline following `DEPLOYMENT.md` section 4.
