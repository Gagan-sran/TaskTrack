const Category = require('../models/Category');

// GET /api/categories - Get all categories for the authenticated user
const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await Category.findAllByUser(userId);
    res.status(200).json({ categories: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
};

// GET /api/categories/:id - Get a single category by ID (must belong to the authenticated user)
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await Category.findByIdAndUser(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ category: result.rows[0] });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Server error fetching category' });
  }
};

// POST /api/categories - Create a new category for the authenticated user
const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const userId = req.user.userId;

    // category_name is required
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Prevent duplicate category names for the same user
    const duplicate = await Category.findByNameAndUser(category_name, userId);
    if (duplicate.rows.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const result = await Category.create(category_name, userId);
    res.status(201).json({ message: 'Category created successfully', category: result.rows[0] });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error creating category' });
  }
};

// PUT /api/categories/:id - Update a category name (only the owner can update)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const userId = req.user.userId;

    // category_name is required for an update
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Confirm the category exists and belongs to this user
    const existing = await Category.findByIdAndUser(id, userId);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const result = await Category.update(id, userId, category_name);
    res.status(200).json({ message: 'Category updated successfully', category: result.rows[0] });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Server error updating category' });
  }
};

// DELETE /api/categories/:id - Delete a category (tasks using it will have category_id set to NULL)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await Category.delete(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', category: result.rows[0] });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error deleting category' });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
