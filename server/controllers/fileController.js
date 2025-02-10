
const fileModel = require('../models/fileModel');



// Handle file upload and save metadata to DB
exports.uploadResponse = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  try {
    // Save file metadata to the database
    const fileData = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size
    };

    const fileId = await fileModel.saveFile(fileData);

    res.status(200).json({
      message: 'File uploaded and saved successfully',
      fileId,
      file: fileData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
