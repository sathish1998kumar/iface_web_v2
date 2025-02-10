const ConnectToDatabase = require('../config/db');

// Save file metadata to the database
exports.saveFile = async (fileData) => {
  const db = await ConnectToDatabase();
  const { originalName, fileName, filePath, fileSize } = fileData;
  const sql = `
    INSERT INTO image_store (original_name, file_name, file_path, file_size)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [originalName, fileName, filePath, fileSize]);
  return result.insertId; // Return the inserted file ID
};
