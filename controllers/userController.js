const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/users/register - Register a new user (public route)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    // Reject registration if the email is already taken
    const existingUser = await User.findByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash the plain-text password with bcrypt (10 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Persist the new user — password stored as bcrypt hash, never plain text
    const result = await User.create(name, email, hashedPassword);
    const user = result.rows[0];

    // Sign a JWT token valid for 7 days
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without the password field
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// POST /api/users/login - Authenticate a user and return a JWT token (public route)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Look up the user by email
    const result = await User.findByEmail(email);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the submitted password against the stored bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Issue a new JWT token on successful login
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info without the password
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// GET /api/users - Get all registered users (protected)
const getAllUsers = async (req, res) => {
  try {
    // Password column is never selected by User.findAll()
    const result = await User.findAll();
    res.status(200).json({ users: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error fetching users' });
  }
};

// GET /api/users/:id - Get a specific user by ID (protected)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error fetching user' });
  }
};

// PUT /api/users/:id - Update own profile: name, email, or password (protected, own account only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Only the authenticated user can update their own account
    if (req.user.userId !== parseInt(id)) {
      return res.status(403).json({ error: 'Not authorized to update this user' });
    }

    // Fetch only the current password hash to preserve it if no new password is given
    const pwResult = await User.getPasswordById(id);
    if (pwResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only re-hash if a new password was provided in the request body
    let hashedPassword = pwResult.rows[0].password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await User.update(id, name, email, hashedPassword);
    res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error updating user' });
  }
};

// DELETE /api/users/:id - Delete own account (protected, own account only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only the authenticated user can delete their own account
    if (req.user.userId !== parseInt(id)) {
      return res.status(403).json({ error: 'Not authorized to delete this user' });
    }

    const result = await User.delete(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error deleting user' });
  }
};

module.exports = { register, login, getAllUsers, getUserById, updateUser, deleteUser };
