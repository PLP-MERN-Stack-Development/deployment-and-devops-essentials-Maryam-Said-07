const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  // Task title - required field
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  // Task description - optional but useful
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  
  // Status of the task
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  
  // Priority level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  // Due date for the task
  dueDate: {
    type: Date
  },
  
  // Reference to the user who created this task
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Optional for demo purposes
  },
  
  // Tags for categorization
  tags: [{
    type: String,
    trim: true
  }],
  
  // Track completion
  completed: {
    type: Boolean,
    default: false
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Index for faster queries
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ createdAt: -1 });

// Virtual field to check if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) return false;
  return new Date() > this.dueDate;
});

// Ensure virtuals are included when converting to JSON
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Pre-save hook to update completed status based on status field
taskSchema.pre('save', function(next) {
  if (this.status === 'completed') {
    this.completed = true;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
