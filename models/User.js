const db = require('../db');

/**
 * User Model — all direct database operations for the users table.
 * Controllers call these functions instead of writing raw SQL queries.
 */
const User = {
  // Find a user by their email address (used for login and duplicate-email check)
  findByEmail: (email) =>
    db.query('SELECT * FROM users WHERE email = $1', [email]),

  // Find a single user by ID — password excluded for safe reading
  findById: (id) =>
    db.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]),

  // Fetch only the hashed password — used during profile updates to preserve it if unchanged
  getPasswordById: (id) =>
    db.query('SELECT password FROM users WHERE id = $1', [id]),

  // Get all users — password column is never returned
  findAll: () =>
    db.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'),

  // Insert a new user row, returns the created record (without password)
  create: (name, email, hashedPassword) =>
    db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, hashedPassword]
    ),

  // Update name, email, and/or password for a user by ID
  update: (id, name, email, hashedPassword) =>
    db.query(
      `UPDATE users
       SET name     = COALESCE($1, name),
           email    = COALESCE($2, email),
           password = $3
       WHERE id = $4
       RETURNING id, name, email, created_at`,
      [name || null, email || null, hashedPassword, id]
    ),

  // Permanently delete a user by ID — cascades to tasks and categories
  delete: (id) =>
    db.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email', [id])
};

module.exports = User;
