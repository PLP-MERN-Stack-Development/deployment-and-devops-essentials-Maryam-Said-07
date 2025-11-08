import { useState, useEffect } from 'react'
import axios from 'axios'

function TaskList() {
  // State management for tasks, loading, and errors
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  // Get API URL from environment variable or use default
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${apiUrl}/api/tasks`)
      setTasks(response.data.tasks || [])
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Failed to load tasks. Please check if the API server is running.')
    } finally {
      setLoading(false)
    }
  }

  // Toggle task completion status
  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/tasks/${taskId}/complete`)
      // Update the task in local state
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ))
    } catch (err) {
      console.error('Error toggling task:', err)
      setError('Failed to update task')
    }
  }

  // Delete a task
  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await axios.delete(`${apiUrl}/api/tasks/${taskId}`)
      // Remove task from local state
      setTasks(tasks.filter(task => task._id !== taskId))
    } catch (err) {
      console.error('Error deleting task:', err)
      setError('Failed to delete task')
    }
  }

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  // Get priority badge color
  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444'
    }
    return colors[priority] || '#6b7280'
  }

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      'todo': '#6b7280',
      'in-progress': '#3b82f6',
      'completed': '#10b981'
    }
    return colors[status] || '#6b7280'
  }

  if (loading) {
    return <div className="loading">Loading tasks...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchTasks} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="task-list">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Tasks ({filteredTasks.length})</h2>
          <button onClick={fetchTasks} className="btn btn-primary">
            Refresh
          </button>
        </div>

        {/* Filter buttons */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : ''}`}
            style={filter !== 'all' ? { backgroundColor: '#e5e7eb', color: '#374151' } : {}}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`btn ${filter === 'active' ? 'btn-primary' : ''}`}
            style={filter !== 'active' ? { backgroundColor: '#e5e7eb', color: '#374151' } : {}}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`btn ${filter === 'completed' ? 'btn-primary' : ''}`}
            style={filter !== 'completed' ? { backgroundColor: '#e5e7eb', color: '#374151' } : {}}
          >
            Completed
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            No tasks found. Create your first task to get started!
          </p>
        ) : (
          <div className="tasks-container">
            {filteredTasks.map(task => (
              <div 
                key={task._id} 
                className="card"
                style={{ 
                  borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                  opacity: task.completed ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      marginBottom: '0.5rem'
                    }}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                        {task.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span 
                        style={{ 
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          backgroundColor: getStatusColor(task.status),
                          color: 'white'
                        }}
                      >
                        {task.status}
                      </span>
                      <span 
                        style={{ 
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          backgroundColor: getPriorityColor(task.priority),
                          color: 'white'
                        }}
                      >
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span 
                          style={{ 
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            backgroundColor: '#e5e7eb',
                            color: '#374151'
                          }}
                        >
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                    <button
                      onClick={() => toggleComplete(task._id)}
                      className="btn btn-success"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      {task.completed ? '↩️' : '✓'}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList
