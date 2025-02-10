const { body, validationResult } = require('express-validator');
const User = require("../models/userModel");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.getUser();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Create a new user
const createUser = [
  // Validate and sanitize inputs
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  // Check if validation passes
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const result = await User.createUser(name, email, password);
      res.status(200).json({ id: result.insertId, name, email });
    } catch (err) {
      res.status(400).json({ message: "Error creating user" });
    }
  }
];

// Update a user
const updateUser = [
  // Validate and sanitize inputs
  body('name').optional().trim().escape().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Email is invalid').normalizeEmail(),
  body('age').optional().isInt().withMessage('Age must be a number'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  body('id').optional().trim().escape().notEmpty().withMessage('ID is required'),
  body('mobile')
  .isNumeric().withMessage('Mobile number must contain only digits')
  .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits'),

  // Check if validation passes
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, age, gender, mobile, id } = req.body;

    try {
      const update = await User.updateUser(name, email, age, gender, mobile, id);
      res.status(200).json({ message:"Updated Successfully",id: update.insertId, data: update });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(400).json({ message: "Error Updating user" });
    }
  }
];

// Delete a user
const deleteUser = [
  // Validate id
  body('id').isInt().withMessage('ID must be an integer'),

  // Check if validation passes
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
      const delete_user = await User.deleteUser(id);
      res.status(200).json({ message: "Deleted Successfully", id: delete_user.insertId, data: delete_user });
    } catch (err) {
      console.log("Error deleting User", err);
      res.status(400).json({ message: "Error deleting user" });
    }
  }
];

module.exports = { getUsers, createUser, updateUser, deleteUser };
