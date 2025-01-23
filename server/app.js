const express = require('express');
const userRoutes = require('./routes/userRoutes');
 // Load environment variables from .env file
const cors=require('cors');
const app = express();
app.use(cors());
// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/users', userRoutes);

// Start the server
// const PORT = process.env.PORT || 5000;
// console.log(process.env.DB_PORT);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports = app;