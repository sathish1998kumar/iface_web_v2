const ConnectToDatabase = require('../config/db');

// Get all users

const getUsers = async () => {
    const db = await ConnectToDatabase();
  const [rows] = await db.query('SELECT * FROM user');
//   console.log(rows);
  return rows;
};

// Create a new user
const createUser = async (name, email, password) => {
    const db = await ConnectToDatabase();
  const [result] = await db.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  return result;
};

module.exports = { getUsers, createUser };
