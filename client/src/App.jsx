import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Home from './components/Home'
import './App.css'

function App() {
  // Track API health status
  const [apiStatus, setApiStatus] = useState('checking...')

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/health`)
      
      if (response.ok) {
        setApiStatus('connected')
      } else {
        setApiStatus('error')
      }
    } catch (error) {
      console.error('API health check failed:', error)
      setApiStatus('disconnected')
    }
  }

  return (
    <Router>
      <div className="app">
        {/* Navigation Header */}
        <header className="app-header">
          <div className="container">
            <h1>MERN Task Manager</h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/tasks">Tasks</Link>
              <Link to="/create">Create Task</Link>
            </nav>
            {/* API Status Indicator */}
            <div className={`api-status ${apiStatus}`}>
              API: {apiStatus}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/create" element={<TaskForm />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2025 MERN Task Manager - Deployed with CI/CD</p>
            <p>Environment: {import.meta.env.MODE}</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
