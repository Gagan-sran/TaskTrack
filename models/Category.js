const db = require('../db');

/**
 * Category Model — all direct database operations for the categories table.
 * Controllers call these functions instead of writing raw SQL queries.
 */
const Category = {
  // Get all categories belonging to a user
  findAllByUser: (userId) =>
    db.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    ),

  // Get a single category — only returns it if it belongs to the given user
  findByIdAndUser: (id, userId) =>
    db.query(
      'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
      [id, userId]
    ),

  // Check for an existing category with the same name for this user (duplicate prevention)
  findByNameAndUser: (name, userId) =>
    db.query(
      'SELECT id FROM categories WHERE category_name = $1 AND user_id = $2',
      [name, userId]
    ),

  // Insert a new category row
  create: (name, userId) =>
    db.query(
      'INSERT INTO categories (category_name, user_id) VALUES ($1, $2) RETURNING *',
      [name, userId]
    ),

  // Update the category name
  update: (id, userId, name) =>
    db.query(
      'UPDATE categories SET category_name = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [name, id, userId]
    ),

  // Delete a category — tasks linked to it will have category_id set to NULL (ON DELETE SET NULL)
  delete: (id, userId) =>
    db.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )
};

module.exports = Category;
