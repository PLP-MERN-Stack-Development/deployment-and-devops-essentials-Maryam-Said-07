const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/tasks - Get all tasks
// Query params: status, priority, page, limit
router.get('/', async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    
    // Build query filter based on query parameters
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Fetch tasks with pagination
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'username email'); // include user details
    
    // Get total count for pagination metadata
    const total = await Task.countDocuments(filter);
    
    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id - Get single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('user', 'username email');
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST /api/tasks - Create a new task
router.post('/',
  [
    // Validation middleware
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in-progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format')
  ],
  validate,
  async (req, res) => {
    try {
      const { title, description, status, priority, dueDate, tags } = req.body;
      
      // Create task without user for demo purposes
      // In production, add authentication middleware and use req.user.id
      const task = new Task({
        title,
        description,
        status,
        priority,
        dueDate,
        tags
      });
      
      await task.save();
      
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task', details: error.message });
    }
  }
);

// PUT /api/tasks/:id - Update a task
router.put('/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('status').optional().isIn(['todo', 'in-progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('dueDate').optional().isISO8601()
  ],
  validate,
  async (req, res) => {
    try {
      const { title, description, status, priority, dueDate, tags, completed } = req.body;
      
      // Find and update the task
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(status && { status }),
          ...(priority && { priority }),
          ...(dueDate && { dueDate }),
          ...(tags && { tags }),
          ...(completed !== undefined && { completed })
        },
        { new: true, runValidators: true } // return updated doc and run validators
      ).populate('user', 'username email');
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// PATCH /api/tasks/:id/complete - Toggle task completion
router.patch('/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Toggle completion status
    task.completed = !task.completed;
    task.status = task.completed ? 'completed' : 'todo';
    
    await task.save();
    await task.populate('user', 'username email');
    
    res.json(task);
  } catch (error) {
    console.error('Error toggling task completion:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
