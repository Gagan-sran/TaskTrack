const Task = require('../models/Task');
const Category = require('../models/Category');

// Valid task status values
const VALID_STATUSES = ['pending', 'completed'];

// GET /api/tasks - Get all tasks for the authenticated user
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Model handles the JOIN with categories to include category_name
    const result = await Task.findAllByUser(userId);
    res.status(200).json({ tasks: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error fetching tasks' });
  }
};

// GET /api/tasks/:id - Get a single task by ID (must belong to the authenticated user)
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await Task.findByIdAndUser(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task: result.rows[0] });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error fetching task' });
  }
};

// POST /api/tasks - Create a new task for the authenticated user
const createTask = async (req, res) => {
  try {
    const { title, description, due_date, category_id } = req.body;
    const userId = req.user.userId;

    // title is the only required field
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    // If a category_id is provided, verify it exists and belongs to this user
    if (category_id) {
      const catResult = await Category.findByIdAndUser(category_id, userId);
      if (catResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    const result = await Task.create(title, description, due_date, category_id, userId);
    res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error creating task' });
  }
};

// PUT /api/tasks/:id - Update an existing task (only the owner can update)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status, category_id } = req.body;
    const userId = req.user.userId;

    // Confirm the task exists and belongs to this user before allowing changes
    const ownerCheck = await Task.checkOwnership(id, userId);
    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validate the status value if one is provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    // If a new category_id is provided, verify it belongs to this user
    if (category_id) {
      const catResult = await Category.findByIdAndUser(category_id, userId);
      if (catResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    const result = await Task.update(id, userId, title, description, due_date, status, category_id);
    res.status(200).json({ message: 'Task updated successfully', task: result.rows[0] });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error updating task' });
  }
};

// DELETE /api/tasks/:id - Permanently delete a task (only the owner can delete)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await Task.delete(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', task: result.rows[0] });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error deleting task' });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
