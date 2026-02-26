const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// --- Public Routes (no token required) ---
router.post('/register', register);
router.post('/login', login);

// --- Protected Routes (JWT token required) ---
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
