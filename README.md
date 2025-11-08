# MERN Stack Deployment - Production Ready Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application demonstrating production deployment best practices, CI/CD pipelines, and DevOps essentials.

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy to Vercel]
- **Backend API**: [Coming Soon - Deploy to Render]
- **API Health**: [Your Backend URL]/health

## 📋 Features

### Application Features
- ✅ Create, read, update, and delete tasks
- ✅ Task status management (todo, in-progress, completed)
- ✅ Priority levels (low, medium, high)
- ✅ Due date tracking
- ✅ Task filtering and search
- ✅ Responsive design
- ✅ Real-time API status monitoring

### DevOps Features
- ✅ Production-optimized builds
- ✅ Environment-based configuration
- ✅ Secure HTTP headers (Helmet.js)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Compression middleware
- ✅ Health check endpoints
- ✅ Error handling and logging
- ✅ CI/CD with GitHub Actions
- ✅ Automated testing pipeline

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Logging**: Morgan

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Router**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Pure CSS with CSS Variables

### DevOps
- **CI/CD**: GitHub Actions
- **Backend Hosting**: Render / Railway / Heroku
- **Frontend Hosting**: Vercel / Netlify
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
mern-deployment/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # CI/CD pipeline configuration
├── server/                     # Backend application
│   ├── models/                 # Mongoose models
│   │   ├── Task.js            # Task model with validation
│   │   └── User.js            # User model with auth
│   ├── routes/                 # API routes
│   │   ├── tasks.js           # Task CRUD operations
│   │   └── users.js           # User auth and profile
│   ├── .env.example           # Environment variable template
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server setup
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── TaskList.jsx   # Task list with filtering
│   │   │   └── TaskForm.jsx   # Create task form
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Application styles
│   │   └── main.jsx           # React entry point
│   ├── .env.example           # Frontend env template
│   ├── vite.config.js         # Vite configuration
│   ├── package.json           # Frontend dependencies
│   └── index.html             # HTML template
├── DEPLOYMENT.md              # Detailed deployment guide
├── README.md                  # This file
└── .gitignore                 # Git ignore rules

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas)
- Git
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mern-deployment
```

2. **Set up the backend**
```bash
cd server
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

3. **Set up the frontend** (in a new terminal)
```bash
cd client
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## 🔧 Environment Variables

### Backend (.env)
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tasks
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=MERN Task Manager
```

## 📚 API Documentation

### Health Check
```
GET /health
```
Response:
```json
{
  "uptime": 12345,
  "message": "OK",
  "timestamp": 1699999999999,
  "environment": "development",
  "database": "connected"
}
```

### Tasks API

- `GET /api/tasks` - Get all tasks (supports pagination, filtering)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle task completion

### Users API

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile
- `GET /api/users` - Get all users (admin)

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:

- MongoDB Atlas setup
- Backend deployment (Render/Railway/Heroku)
- Frontend deployment (Vercel/Netlify)
- CI/CD configuration
- Environment variables
- Monitoring setup
- Troubleshooting guide

### Quick Deployment Steps

1. **Database**: Set up MongoDB Atlas cluster
2. **Backend**: Deploy to Render/Railway
3. **Frontend**: Deploy to Vercel/Netlify
4. **CI/CD**: Push to GitHub (automatic deployment)

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **On Pull Request**:
   - Runs linting checks
   - Runs backend tests
   - Builds frontend
   - Checks for errors

2. **On Push to Main**:
   - Runs all tests
   - Builds application
   - Triggers deployment
   - Sends notifications

## 📊 Monitoring

### Health Monitoring
- Backend health endpoint: `/health`
- Database connection status
- Server uptime tracking

### Logging
- Request logging with Morgan
- Error logging to console
- Production vs development log formats

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Performance**: Render Metrics, Vercel Analytics

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test

# Run linting
npm run lint
```

## 🔒 Security Features

- **Helmet.js**: Secure HTTP headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **JWT Authentication**: Secure user sessions
- **Password Hashing**: Bcrypt encryption
- **Input Validation**: Express Validator
- **Environment Variables**: Sensitive data protection

## 🎯 Best Practices Implemented

- ✅ Environment-based configuration
- ✅ Error handling middleware
- ✅ Request validation
- ✅ Database connection pooling
- ✅ Graceful shutdown handling
- ✅ Code splitting (frontend)
- ✅ Compression for responses
- ✅ Security headers
- ✅ Rate limiting
- ✅ Automated testing
- ✅ CI/CD pipeline
- ✅ Health check endpoints
- ✅ Logging strategy

## 📈 Performance Optimization

### Backend
- Compression middleware
- Database indexing
- Connection pooling
- Response caching (ready to implement)

### Frontend
- Code splitting
- Lazy loading
- Production builds
- Asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Assignment Checklist

### Task 1: Preparing for Deployment ✅
- ✅ Optimized React production build
- ✅ Code splitting configured
- ✅ Environment variables setup
- ✅ Express.js production configuration
- ✅ Security headers implemented
- ✅ MongoDB Atlas ready
- ✅ Database connection pooling

### Task 2: Backend Deployment ✅
- ✅ Deployment configuration files
- ✅ Environment variables documented
- ✅ Health check endpoint
- ✅ Error handling
- ✅ Logging implemented

### Task 3: Frontend Deployment ✅
- ✅ Build configuration
- ✅ Environment variables
- ✅ Deployment ready
- ✅ API integration

### Task 4: CI/CD Pipeline ✅
- ✅ GitHub Actions workflow
- ✅ Automated testing
- ✅ Automated deployment
- ✅ Build checks

### Task 5: Monitoring ✅
- ✅ Health check endpoints
- ✅ Error logging
- ✅ Performance monitoring ready
- ✅ Documentation complete

## 📄 License

This project is created for educational purposes as part of the MERN Stack Development course.

## 🆘 Support

For issues and questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review error logs in hosting dashboard
- Open an issue in the repository

---

**Built with ❤️ using the MERN Stack**

*Last Updated: November 2025*


## CI/CD Pipeline

The assignment includes templates for setting up GitHub Actions workflows:
- `frontend-ci.yml`: Tests and builds the React application
- `backend-ci.yml`: Tests the Express.js backend
- `frontend-cd.yml`: Deploys the frontend to your chosen platform
- `backend-cd.yml`: Deploys the backend to your chosen platform

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all deployment tasks
2. Set up CI/CD pipelines with GitHub Actions
3. Deploy both frontend and backend to production
4. Document your deployment process in the README.md
5. Include screenshots of your CI/CD pipeline in action
6. Add URLs to your deployed applications

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/) 