const { hashPassword, comparePassword } = require('../services/authServices');
const generateToken = require('../utils/generateToken');
// const connectDB = require('../config/db');
const User = require('../models/userModel');
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  try {
    const rows = await User.getUsers(email);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.createUser(username, hashedPassword, email);

    return res.status(200).json({
      message: 'User registered successfully',
      insertedId: user.insertId,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password} = req.body;

  if ( !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    
    const rows = await User.getUsers(email);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };
