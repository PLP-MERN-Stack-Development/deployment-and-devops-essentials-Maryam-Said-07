import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="card">
        <h2>Welcome to MERN Task Manager</h2>
        <p>
          This is a production-ready MERN stack application demonstrating deployment 
          best practices, CI/CD pipelines, and DevOps essentials.
        </p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Features:</h3>
          <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
            <li>Full-stack MERN application (MongoDB, Express, React, Node.js)</li>
            <li>Production-optimized build configuration</li>
            <li>Environment-based configuration</li>
            <li>Security headers and rate limiting</li>
            <li>Automated CI/CD with GitHub Actions</li>
            <li>Health check endpoints for monitoring</li>
            <li>Error tracking and logging</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Deployment Stack:</h3>
          <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
            <li><strong>Frontend:</strong> Vercel / Netlify / GitHub Pages</li>
            <li><strong>Backend:</strong> Render / Railway / Heroku</li>
            <li><strong>Database:</strong> MongoDB Atlas</li>
            <li><strong>CI/CD:</strong> GitHub Actions</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/tasks" className="btn btn-primary">
            View Tasks
          </Link>
          <Link to="/create" className="btn btn-success" style={{ marginLeft: '1rem' }}>
            Create New Task
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
