const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await User.createUser(name, email, password);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

module.exports = { getUsers, createUser };

