const ConnectToDatabase = require('../config/db');

// Get all users

const getUsers = async (email) => {
    const db = await ConnectToDatabase();
  const [rows] = await db.query('SELECT * FROM user where email=?',[email]);
//   console.log(rows);
  return rows;
};
const getUser = async () => {
  const db = await ConnectToDatabase();
const [rows] = await db.query('SELECT * FROM user');
//   console.log(rows);
return rows;
};

// Create a new user
const createUser = async (username, hashedPassword, email) => {
    const db = await ConnectToDatabase();
  const [result] = await db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  return result;
};

const updateUser=async(name,email,age,gender,mobile,id)=>{
  const db=await ConnectToDatabase();
  const query = `
       UPDATE crud 
       SET name = ?, age = ?, email = ?, gender = ?, mobile = ?
       WHERE id = ?
     `;

    const [result] = await db.query(query, [
      name,
      age,
      email,
      gender,
      mobile,
      id,
    ]);
    return result;
}
const deleteUser=async(id)=>{
  const db=await ConnectToDatabase();
  const [delete_result]=await db.query('DELETE FROM `crud` WHERE id = ?', [id] );
  return delete_result;
}
module.exports = { getUsers, createUser ,updateUser,deleteUser,getUser};
