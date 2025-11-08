# MERN Deployment Guide

## 📚 Complete Deployment Documentation

This guide covers deploying the MERN Task Manager application to production with CI/CD pipelines.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [CI/CD with GitHub Actions](#cicd-setup)
6. [Environment Variables](#environment-variables)
7. [Monitoring & Maintenance](#monitoring)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] MongoDB Atlas account (free tier available)
- [ ] Render account (for backend) or Railway/Heroku
- [ ] Vercel account (for frontend) or Netlify
- [ ] Git installed locally
- [ ] Node.js 18+ installed

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create a Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Click "Build a Database"
4. Choose "M0 Free" tier
5. Select your preferred cloud provider and region
6. Click "Create Cluster"

### Step 2: Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - In production, restrict to your server IPs
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name (e.g., `mern-tasks`)

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-tasks?retryWrites=true&w=majority
```

---

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Your Code

1. Ensure `server/package.json` has correct start script:
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. Push your code to GitHub

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `mern-task-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Set Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-generate-random
CLIENT_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

**To generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Note your backend URL: `https://your-app.onrender.com`

### Step 5: Verify Deployment

Visit `https://your-app.onrender.com/health` to check if API is running.

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Your Code

1. Ensure `client/package.json` has correct build script:
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

2. Create `client/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**Option B: Using Vercel CLI**

```bash
cd client
npm install -g vercel
vercel
```

### Step 3: Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.onrender.com
VITE_APP_NAME=MERN Task Manager
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy automatically
3. Note your frontend URL: `https://your-app.vercel.app`

### Alternative: Netlify Deployment

```bash
cd client
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## ⚙️ CI/CD Setup (GitHub Actions)

### Step 1: GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```
VITE_API_URL=https://your-backend.onrender.com
```

### Step 2: Workflow Configuration

The `.github/workflows/ci-cd.yml` file is already configured. It will:

1. **On Pull Request**: Run tests and linting
2. **On Push to Main**: Run tests, build, and trigger deployment

### Step 3: Enable Actions

1. Go to your repository → Actions tab
2. Enable GitHub Actions if not already enabled
3. Push code to trigger the workflow

### Step 4: Monitor Builds

- View workflow runs in the Actions tab
- Each push/PR will trigger the CI/CD pipeline
- Failed builds will prevent deployment

---

## 🔐 Environment Variables

### Backend (.env)

```bash
# Application
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Security
JWT_SECRET=your-super-secret-random-string
JWT_EXPIRE=7d

# CORS
CLIENT_URL=https://your-frontend.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)

```bash
# API Configuration
VITE_API_URL=https://your-backend.onrender.com

# App Configuration
VITE_APP_NAME=MERN Task Manager
VITE_APP_VERSION=1.0.0
```

---

## 📊 Monitoring & Maintenance

### Health Checks

**Backend Health Endpoint:**
```
GET https://your-backend.onrender.com/health
```

**Response:**
```json
{
  "uptime": 12345,
  "message": "OK",
  "timestamp": 1699999999999,
  "environment": "production",
  "database": "connected"
}
```

### Monitoring Tools

1. **Render Dashboard**: Monitor server metrics, logs, and deployments
2. **Vercel Analytics**: Track frontend performance and usage
3. **MongoDB Atlas**: Monitor database performance and usage

### Log Monitoring

**Render Logs:**
```bash
# View logs in Render dashboard
# or use Render CLI
render logs
```

**Application Logs:**
- All errors are logged to console
- Production uses `morgan('combined')` for request logging

### Uptime Monitoring

Set up uptime monitoring with:
- [UptimeRobot](https://uptimerobot.com/) (Free)
- [Pingdom](https://www.pingdom.com/)
- [Better Uptime](https://betteruptime.com/)

Configure to ping:
- Backend: `https://your-backend.onrender.com/health`
- Frontend: `https://your-frontend.vercel.app`

---

## 🔍 Troubleshooting

### Common Issues

**1. API Connection Failed**

**Problem**: Frontend can't connect to backend

**Solution**:
- Check `VITE_API_URL` is set correctly
- Verify CORS is configured with correct `CLIENT_URL`
- Check backend is running: visit `/health` endpoint
- Check browser console for CORS errors

**2. Database Connection Error**

**Problem**: MongoDB connection failed

**Solution**:
- Verify MongoDB Atlas connection string
- Check database user has correct permissions
- Ensure IP whitelist includes `0.0.0.0/0` or your server IP
- Check network access settings in MongoDB Atlas

**3. Build Failures**

**Problem**: Deployment build fails

**Solution**:
- Check Node.js version matches requirements (18+)
- Verify all dependencies are in `package.json`
- Run `npm install` and `npm run build` locally first
- Check build logs for specific errors

**4. Environment Variables Not Working**

**Problem**: App doesn't read environment variables

**Solution**:
- Frontend: Variables must start with `VITE_`
- Restart development server after changing .env
- In production, set variables in hosting dashboard
- Clear cache and rebuild

**5. Slow Backend Response**

**Problem**: Free tier Render spins down after inactivity

**Solution**:
- Upgrade to paid tier for 24/7 uptime
- Or use UptimeRobot to ping every 5 minutes
- Warn users of initial cold start delay

### Debug Mode

Enable verbose logging:

```bash
# Backend
NODE_ENV=development npm start

# Frontend
npm run dev
```

---

## 📝 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database setup and tested
- [ ] Code linted and formatted
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Error handling implemented

### Backend Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with permissions
- [ ] Network access configured
- [ ] Connection string obtained
- [ ] Render service created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health check endpoint verified

### Frontend Deployment

- [ ] Build process tested locally
- [ ] Environment variables configured
- [ ] Vercel project created
- [ ] API URL configured
- [ ] Deployment successful
- [ ] Site accessible

### Post-Deployment

- [ ] Frontend connects to backend
- [ ] Database operations working
- [ ] Authentication working
- [ ] Error handling working
- [ ] CI/CD pipeline configured
- [ ] Monitoring setup
- [ ] Documentation updated

---

## 🎉 Success!

Your MERN application is now deployed! 

**Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`
- Health Check: `https://your-backend.onrender.com/health`

**Next Steps:**
1. Set up custom domain (optional)
2. Configure SSL/TLS certificates
3. Implement error tracking (Sentry)
4. Set up analytics
5. Monitor performance
6. Plan for scaling

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Production Build](https://react.dev/learn/start-a-new-react-project)

---

## 🆘 Need Help?

- Check the Troubleshooting section above
- Review deployment logs in your hosting dashboard
- Search for error messages in documentation
- Open an issue in the GitHub repository

---

*Last Updated: November 2025*
