const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// All category routes are protected
router.use(authMiddleware);

// GET /api/categories - Get all categories for logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await db.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json({
      categories: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

// POST /api/categories - Create a new category
router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Check if category already exists for this user
    const categoryExists = await db.query(
      'SELECT * FROM categories WHERE category_name = $1 AND user_id = $2',
      [category_name, userId]
    );

    if (categoryExists.rows.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const result = await db.query(
      'INSERT INTO categories (category_name, user_id) VALUES ($1, $2) RETURNING *',
      [category_name, userId]
    );

    res.status(201).json({
      message: 'Category created successfully',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error creating category' });
  }
});

// DELETE /api/categories/:id - Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
      message: 'Category deleted successfully',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error deleting category' });
  }
});

module.exports = router;
