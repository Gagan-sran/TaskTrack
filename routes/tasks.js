const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// All task routes are protected
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await db.query(
      `SELECT t.*, c.category_name 
       FROM tasks t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = $1 
       ORDER BY t.created_at DESC`,
      [userId]
    );

    res.json({
      tasks: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error fetching tasks' });
  }
});

// GET /api/tasks/:id - Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      `SELECT t.*, c.category_name 
       FROM tasks t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.id = $1 AND t.user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task: result.rows[0] });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error fetching task' });
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, due_date, category_id } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    // If category_id is provided, verify it belongs to the user
    if (category_id) {
      const categoryCheck = await db.query(
        'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
        [category_id, userId]
      );
      if (categoryCheck.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    const result = await db.query(
      `INSERT INTO tasks (title, description, due_date, category_id, user_id, status) 
       VALUES ($1, $2, $3, $4, $5, 'pending') 
       RETURNING *`,
      [title, description || null, due_date || null, category_id || null, userId]
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error creating task' });
  }
});

// PUT /api/tasks/:id - Update an existing task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status, category_id } = req.body;
    const userId = req.user.userId;

    // Check if task exists and belongs to user
    const taskCheck = await db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // If category_id is provided, verify it belongs to the user
    if (category_id) {
      const categoryCheck = await db.query(
        'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
        [category_id, userId]
      );
      if (categoryCheck.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    const result = await db.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           due_date = COALESCE($3, due_date),
           status = COALESCE($4, status),
           category_id = COALESCE($5, category_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, due_date, status, category_id, id, userId]
    );

    res.json({
      message: 'Task updated successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error updating task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error deleting task' });
  }
});

module.exports = router;
