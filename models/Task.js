const db = require('../db');

/**
 * Task Model — all direct database operations for the tasks table.
 * Controllers call these functions instead of writing raw SQL queries.
 */
const Task = {
  // Get all tasks for a user, including the category name via LEFT JOIN
  findAllByUser: (userId) =>
    db.query(
      `SELECT t.*, c.category_name
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC`,
      [userId]
    ),

  // Get a single task by its ID — only returns it if it belongs to the given user
  findByIdAndUser: (id, userId) =>
    db.query(
      `SELECT t.*, c.category_name
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = $1 AND t.user_id = $2`,
      [id, userId]
    ),

  // Verify that a task exists and belongs to a user (used before update/delete)
  checkOwnership: (id, userId) =>
    db.query('SELECT id FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]),

  // Insert a new task row, defaults status to 'pending'
  create: (title, description, due_date, category_id, userId) =>
    db.query(
      `INSERT INTO tasks (title, description, due_date, category_id, user_id, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [title, description || null, due_date || null, category_id || null, userId]
    ),

  // Update task fields — only fields provided replace the existing values (COALESCE)
  update: (id, userId, title, description, due_date, status, category_id) =>
    db.query(
      `UPDATE tasks
       SET title       = COALESCE($1, title),
           description = COALESCE($2, description),
           due_date    = COALESCE($3, due_date),
           status      = COALESCE($4, status),
           category_id = COALESCE($5, category_id),
           updated_at  = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, due_date, status, category_id, id, userId]
    ),

  // Delete a task — only deletes if the task belongs to the given user
  delete: (id, userId) =>
    db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId])
};

module.exports = Task;
